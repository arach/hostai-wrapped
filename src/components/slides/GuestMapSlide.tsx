'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { HostData, Audience } from '@/lib/types';
import * as topojson from 'topojson-client';

// -----------------------------------------------------------------------------
// SETTINGS
// -----------------------------------------------------------------------------
const MAP_CONSTANTS = {
  rotationSpeed: 0.2, // Degrees per tick
  maxArcs: 100, // Limit number of flight paths
  colors: {
    land: "rgba(255, 255, 255, 0.15)",
    landBorder: "rgba(255, 255, 255, 0.05)",
    ocean: "transparent",
    arc: "#fbbf24", // amber-400
    userArc: "#22d3ee", // cyan-400 for specific guest
    hostMarker: "#ef4444", // red-500
    guestMarker: "#fbbf24",
    ripple: "#ef4444"
  },
  months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
};

interface GuestMapSlideProps {
  data: HostData;
  viewMode: 'GLOBE' | 'MAP' | 'LOCAL';
  isPlaying: boolean;
  audience?: Audience;
  hideHeader?: boolean;
  className?: string;
}

interface ArcData {
  type: string;
  coordinates: [number, number][];
  launchMonth: number;
  isUser: boolean;
}

export const GuestMapSlide: React.FC<GuestMapSlideProps> = ({
  data,
  viewMode,
  isPlaying,
  audience,
  hideHeader = false,
  className = ""
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [worldData, setWorldData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Ref to access latest state inside D3 timer
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  // Animation State Refs
  const rotationRef = useRef<[number, number, number]>([-data.homeCoordinates[0], -20, 0]);

  // DC-specific local points of interest (real locations around Dupont Circle/Capitol Hill)
  const localPoints = useMemo(() => {
    // These are actual DC coffee shops and local businesses near the property area
    return [
      // Coffee Shops
      { coordinates: [-77.0428, 38.9096], type: 'coffee', name: 'Compass Coffee' },
      { coordinates: [-77.0312, 38.9048], type: 'coffee', name: 'Peregrine Espresso' },
      { coordinates: [-77.0455, 38.9134], type: 'coffee', name: 'Filter Coffeehouse' },
      { coordinates: [-77.0267, 38.9002], type: 'coffee', name: 'Swings Coffee' },
      { coordinates: [-77.0398, 38.9167], type: 'coffee', name: 'The Coffee Bar' },
      { coordinates: [-77.0489, 38.9045], type: 'coffee', name: 'Emissary' },
      // Local Businesses / Restaurants
      { coordinates: [-77.0341, 38.9078], type: 'business', name: 'Eastern Market' },
      { coordinates: [-77.0423, 38.9112], type: 'business', name: 'Le Diplomate' },
      { coordinates: [-77.0356, 38.9021], type: 'business', name: 'Rose\'s Luxury' },
      { coordinates: [-77.0478, 38.9089], type: 'business', name: 'Founding Farmers' },
      { coordinates: [-77.0289, 38.9056], type: 'business', name: 'Ted\'s Bulletin' },
      { coordinates: [-77.0512, 38.9023], type: 'business', name: 'Commissary DC' },
      { coordinates: [-77.0334, 38.9134], type: 'business', name: 'Union Market' },
      { coordinates: [-77.0456, 38.8987], type: 'business', name: 'The Smith' },
    ];
  }, []);

  // 1. Fetch Topology Data Once (Only needed for Globe/Map)
  useEffect(() => {
    if (viewMode === 'LOCAL') {
      setLoading(false);
      return;
    }

    setLoading(true);
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((world: any) => {
        setWorldData(world);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load map data", err);
        setLoading(false);
      });
  }, [viewMode]);

  // 2. D3 Render Loop
  useEffect(() => {
    // If LOCAL, we don't need worldData. If GLOBE/MAP, we do.
    const readyToRender = svgRef.current && containerRef.current && (viewMode === 'LOCAL' || worldData);
    if (!readyToRender) return;

    const width = containerRef.current!.clientWidth;
    const height = containerRef.current!.clientHeight;

    // Clear previous render
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("overflow", "visible");

    // --- PROJECTION SETUP ---
    let projection: d3.GeoProjection;

    if (viewMode === 'GLOBE') {
      projection = d3.geoOrthographic()
        .scale(Math.min(width, height) / 2.4)
        .translate([width / 2, height / 2])
        .clipAngle(90)
        .rotate(rotationRef.current);
    } else if (viewMode === 'MAP') {
      projection = d3.geoEquirectangular()
        .scale(width / 6.5)
        .translate([width / 2, height / 2])
        .rotate([-10, 0, 0]);
    } else { // LOCAL
      projection = d3.geoMercator()
        .center(data.homeCoordinates as [number, number])
        .scale(850000) // Neighborhood level zoom (~2-3 mile radius visible)
        .translate([width / 2, height / 2]);
    }

    const path = d3.geoPath().projection(projection);

    // Prepare Data
    const targetOrigins = data.topGuestOrigins.slice(0, MAP_CONSTANTS.maxArcs);
    const hostPoint = { type: "Point", coordinates: data.homeCoordinates };

    const arcsData: ArcData[] = targetOrigins.map((o, i) => ({
      type: "LineString",
      coordinates: [o.coordinates, data.homeCoordinates],
      launchMonth: Math.floor((i / targetOrigins.length) * 12),
      isUser: false
    }));

    if (audience === 'GUEST' && data.userOrigin) {
      arcsData.push({
        type: "LineString",
        coordinates: [data.userOrigin.coordinates, data.homeCoordinates],
        launchMonth: 0,
        isUser: true
      });
    }

    // --- LAYERS ---
    const globeGroup = svg.append("g");

    if (viewMode === 'GLOBE') {
      globeGroup.append("path")
        .datum({ type: "Sphere" })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("d", path as any)
        .attr("fill", MAP_CONSTANTS.colors.ocean)
        .attr("stroke", "rgba(255,255,255,0.1)")
        .attr("stroke-width", 1);

      const defs = svg.append("defs");
      const gradient = defs.append("radialGradient")
        .attr("id", "atmosphere")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");
      gradient.append("stop").attr("offset", "80%").attr("stop-color", "rgba(37,99,235,0)");
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "rgba(37,99,235,0.2)");

      globeGroup.append("path")
        .datum({ type: "Sphere" })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("d", path as any)
        .attr("fill", "url(#atmosphere)")
        .style("pointer-events", "none");
    }

    // Only draw land in GLOBE/MAP mode
    if (viewMode !== 'LOCAL' && worldData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const countries = topojson.feature(worldData, worldData.objects.countries) as any;
      globeGroup.selectAll("path.land")
        .data(countries.features)
        .enter().append("path")
        .attr("class", "land")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("d", path as any)
        .attr("fill", MAP_CONSTANTS.colors.land)
        .attr("stroke", MAP_CONSTANTS.colors.landBorder)
        .attr("stroke-width", 0.5);
    } else if (viewMode === 'LOCAL') {
      // In local mode, add glow effects for markers
      const defs = svg.append("defs");

      // Glow filter for property marker
      const glowFilter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
      glowFilter.append("feGaussianBlur")
        .attr("stdDeviation", "3")
        .attr("result", "coloredBlur");
      const feMerge = glowFilter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "coloredBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    }

    // Arcs Group (Hidden in LOCAL)
    const arcGroup = svg.append("g");

    // Markers Group
    const markersGroup = svg.append("g");

    // Host Dot
    markersGroup.append("path")
      .datum(hostPoint)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("d", path as any)
      .attr("fill", MAP_CONSTANTS.colors.hostMarker)
      .attr("stroke", "white")
      .attr("stroke-width", viewMode === 'LOCAL' ? 4 : 2);

    // --- LOCAL MODE VISUALS ---
    if (viewMode === 'LOCAL') {
      const center = projection(data.homeCoordinates as [number, number]);
      if (center) {
        // Outer radius ring (neighborhood boundary)
        markersGroup.append("circle")
          .attr("cx", center[0])
          .attr("cy", center[1])
          .attr("r", 120)
          .attr("fill", "none")
          .attr("stroke", "rgba(255,255,255,0.15)")
          .attr("stroke-dasharray", "8 4")
          .attr("stroke-width", 1);

        // Inner radius ring
        markersGroup.append("circle")
          .attr("cx", center[0])
          .attr("cy", center[1])
          .attr("r", 60)
          .attr("fill", "none")
          .attr("stroke", "rgba(255,255,255,0.1)")
          .attr("stroke-dasharray", "4 4")
          .attr("stroke-width", 1);

        // Property marker with glow (larger, more prominent)
        markersGroup.append("circle")
          .attr("cx", center[0])
          .attr("cy", center[1])
          .attr("r", 12)
          .attr("fill", MAP_CONSTANTS.colors.hostMarker)
          .attr("stroke", "white")
          .attr("stroke-width", 3)
          .style("filter", "url(#glow)");

        // Property label
        markersGroup.append("text")
          .attr("x", center[0])
          .attr("y", center[1] - 24)
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .attr("font-family", "system-ui, sans-serif")
          .attr("font-size", "11px")
          .attr("font-weight", "600")
          .attr("letter-spacing", "0.5px")
          .text("YOUR STAY");

        // Local Points (Coffee, Shops) - animate in with stagger
        localPoints.forEach((pt, i) => {
          const ptCoords = projection(pt.coordinates as [number, number]);
          if (ptCoords) {
            // Only show points within visible radius
            const dist = Math.sqrt(Math.pow(ptCoords[0] - center[0], 2) + Math.pow(ptCoords[1] - center[1], 2));
            if (dist < 200) {
              markersGroup.append("circle")
                .attr("cx", ptCoords[0])
                .attr("cy", ptCoords[1])
                .attr("r", 0)
                .attr("fill", pt.type === 'coffee' ? '#fbbf24' : '#22d3ee')
                .attr("stroke", "rgba(255,255,255,0.3)")
                .attr("stroke-width", 1.5)
                .attr("opacity", 0)
                .transition()
                .delay(500 + i * 80)
                .duration(600)
                .ease(d3.easeBackOut)
                .attr("r", 6)
                .attr("opacity", 0.9);
            }
          }
        });

        // Subtle pulse animation on property marker
        const pulse = markersGroup.append("circle")
          .attr("cx", center[0])
          .attr("cy", center[1])
          .attr("r", 12)
          .attr("fill", "none")
          .attr("stroke", MAP_CONSTANTS.colors.hostMarker)
          .attr("stroke-width", 2)
          .attr("opacity", 0.8);

        const animatePulse = () => {
          pulse
            .attr("r", 12)
            .attr("opacity", 0.8)
            .transition()
            .duration(2000)
            .ease(d3.easeCircleOut)
            .attr("r", 50)
            .attr("opacity", 0)
            .on("end", animatePulse);
        };
        animatePulse();
      }
    }

    // Ripple Circle for GLOBE view
    const ripple = markersGroup.append("circle")
      .attr("r", 0)
      .attr("fill", "none")
      .attr("stroke", MAP_CONSTANTS.colors.ripple)
      .attr("stroke-width", 2)
      .attr("opacity", 0)
      .style("pointer-events", "none");

    const triggerRipple = () => {
      const coords = projection(data.homeCoordinates as [number, number]);
      if (!coords) return;

      ripple
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 2)
        .attr("opacity", 1)
        .attr("stroke-width", 3)
        .transition()
        .duration(800)
        .ease(d3.easeCircleOut)
        .attr("r", 20)
        .attr("opacity", 0)
        .attr("stroke-width", 0);
    };

    const drawnArcs = new Set<number>();

    // --- ANIMATION LOOP ---
    const timer = d3.timer((elapsed) => {

      // Rotation (Globe only)
      if (viewMode === 'GLOBE' && isPlayingRef.current) {
        const currentRot = projection.rotate();
        const k = MAP_CONSTANTS.rotationSpeed;
        const newRot: [number, number, number] = [currentRot[0] + k, currentRot[1], currentRot[2]];
        projection.rotate(newRot);
        rotationRef.current = newRot;
      }

      // Global Arc Animation (Only in Globe/Map view)
      if (viewMode !== 'LOCAL') {
        const monthDuration = 800;
        const currentMonth = Math.floor((elapsed % (12 * monthDuration)) / monthDuration);

        arcsData.forEach((d, i) => {
          const shouldLaunch = d.launchMonth <= currentMonth;
          if (shouldLaunch && !drawnArcs.has(i)) {
            drawnArcs.add(i);
            const pathEl = arcGroup.append("path")
              .datum(d)
              .attr("class", "arc")
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .attr("d", path as any)
              .attr("fill", "none")
              .attr("stroke", d.isUser ? MAP_CONSTANTS.colors.userArc : MAP_CONSTANTS.colors.arc)
              .attr("stroke-width", d.isUser ? 3 : 1.5)
              .attr("stroke-linecap", "round")
              .attr("stroke-opacity", d.isUser ? 1 : 0.8)
              .attr("stroke-dasharray", function (this: SVGPathElement) { return this.getTotalLength() + " " + this.getTotalLength(); })
              .attr("stroke-dashoffset", function (this: SVGPathElement) { return this.getTotalLength(); });

            if (d.isUser) {
              pathEl.style("filter", "drop-shadow(0 0 4px rgba(34,211,238,0.8))");
            }

            pathEl.transition()
              .duration(d.isUser ? 2000 : 1000)
              .ease(d3.easeCubicOut)
              .attr("stroke-dashoffset", 0)
              .on("end", () => triggerRipple());
          }
        });
      }

      // Update paths
      if ((viewMode === 'GLOBE' && isPlayingRef.current)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        globeGroup.selectAll("path").attr("d", path as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        arcGroup.selectAll("path").attr("d", path as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        markersGroup.selectAll("path").attr("d", path as any);

        const center = projection(data.homeCoordinates as [number, number]);
        if (center) {
          ripple.attr("cx", center[0]).attr("cy", center[1]);
        }
      }

      // Sync Ticker UI
      if (viewMode !== 'LOCAL') {
        const monthDuration = 800;
        const currentMonth = Math.floor((elapsed % (12 * monthDuration)) / monthDuration);
        const tickerEls = document.querySelectorAll('.month-ticker-item');
        tickerEls.forEach((el, idx) => {
          if (idx === currentMonth) {
            el.classList.add('text-white', 'scale-125', 'font-bold');
            el.classList.remove('text-white/30', 'scale-100', 'font-normal');
          } else {
            el.classList.remove('text-white', 'scale-125', 'font-bold');
            el.classList.add('text-white/30', 'scale-100', 'font-normal');
          }
        });
      }

    });

    return () => {
      timer.stop();
    };

  }, [worldData, data, viewMode, audience, localPoints]);

  return (
    <div className={`flex flex-col h-full ${hideHeader ? '' : 'pt-16 px-6'} relative overflow-hidden ${className}`}>

      {/* LOCAL MODE BACKGROUND MAP LAYER - DC Neighborhood */}
      {viewMode === 'LOCAL' && (
        <div className="absolute inset-0 z-0">
          {/* Dark-themed map tile from CartoDB/Stamen centered on DC */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url("https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${data.homeCoordinates[0]},${data.homeCoordinates[1]},13,0/800x1200@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw")`,
              transform: 'scale(1.2)',
            }}
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
          {/* Subtle vignette */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }}></div>
        </div>
      )}

      {/* Header */}
      {!hideHeader && (
        <div className="flex flex-col items-center mb-4 z-20 animate-fade-in relative pointer-events-none">
          <div className="bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-6 backdrop-blur-md shadow-lg">
            <span className="text-[10px] font-bold font-sans tracking-[0.2em] uppercase text-white">
              {audience === 'HOSTAI' ? 'Global Network' : (viewMode === 'LOCAL' ? 'Neighborhood' : 'Global Reach')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center leading-tight drop-shadow-md whitespace-pre-line">
            {viewMode === 'LOCAL' ? 'Local Impact \n & Vibe.' : (audience === 'HOSTAI' ? 'Connecting \n the world.' : 'The world came \n to stay.')}
          </h2>
        </div>
      )}

      {/* Map Container */}
      <div ref={containerRef} className="flex-1 w-full relative flex items-center justify-center z-10">
        {loading && viewMode !== 'LOCAL' && (
          <div className="absolute text-white/50 animate-pulse font-mono text-xs tracking-widest uppercase">
            Calibrating Geodata...
          </div>
        )}
        <svg ref={svgRef} className="w-full h-full drop-shadow-2xl" />

        {/* Local Legend Overlay */}
        {viewMode === 'LOCAL' && !loading && !hideHeader && (
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-lg p-4 rounded-2xl border border-white/10 text-[10px] font-sans animate-fade-in shadow-xl">
            <div className="text-[8px] uppercase tracking-widest text-white/40 mb-3 font-medium">Neighborhood</div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-lg shadow-red-500/30"></div>
              <span className="text-white/80 font-medium">Your Stay</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-[#fbbf24] shadow-lg shadow-amber-500/30"></div>
              <span className="text-white/80 font-medium">Coffee Shops</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#22d3ee] shadow-lg shadow-cyan-500/30"></div>
              <span className="text-white/80 font-medium">Local Spots</span>
            </div>
          </div>
        )}
      </div>

      {/* Month Ticker (Hidden in LOCAL) */}
      {!hideHeader && (
        <div className={`mb-24 z-20 relative w-full overflow-hidden transition-opacity duration-500 ${viewMode === 'LOCAL' ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex justify-between px-2">
            {MAP_CONSTANTS.months.map((m) => (
              <div key={m} className="month-ticker-item text-[8px] md:text-[10px] font-mono tracking-widest text-white/30 transition-all duration-300">
                {m}
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] bg-white/10 mt-2 relative">
            <div className="absolute top-0 left-0 h-full bg-amber-400/50 w-full animate-progress-linear origin-left scale-x-0" style={{ animationDuration: '10s' }}></div>
          </div>
        </div>
      )}

    </div>
  );
};
