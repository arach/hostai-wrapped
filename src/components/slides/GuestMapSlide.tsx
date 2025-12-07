'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  viewMode: 'GLOBE' | 'MAP';
  isPlaying: boolean;
  audience?: Audience;
}

interface ArcData {
  type: string;
  coordinates: [number, number][];
  launchMonth: number;
  isUser: boolean;
}

export const GuestMapSlide: React.FC<GuestMapSlideProps> = ({ data, viewMode, isPlaying, audience }) => {
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

  // 1. Fetch Topology Data Once
  useEffect(() => {
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
  }, []);

  // 2. D3 Render Loop
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !worldData) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

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
    } else {
      projection = d3.geoEquirectangular()
        .scale(width / 6.5)
        .translate([width / 2, height / 2])
        .rotate([-10, 0, 0]);
    }

    const path = d3.geoPath().projection(projection);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countries = topojson.feature(worldData, worldData.objects.countries) as any;

    // Prepare Data
    // We slice to maxArcs, then distribute them evenly across 12 months for animation trigger
    const targetOrigins = data.topGuestOrigins.slice(0, MAP_CONSTANTS.maxArcs);

    const hostPoint = { type: "Point", coordinates: data.homeCoordinates };

    const arcsData: ArcData[] = targetOrigins.map((o, i) => ({
      type: "LineString",
      coordinates: [o.coordinates, data.homeCoordinates],
      // Distribute launch month evenly based on index (0 to 11)
      launchMonth: Math.floor((i / targetOrigins.length) * 12),
      isUser: false
    }));

    // If Audience is Guest, add specific User Arc
    if (audience === 'GUEST' && data.userOrigin) {
        arcsData.push({
            type: "LineString",
            coordinates: [data.userOrigin.coordinates, data.homeCoordinates],
            launchMonth: 0, // Launch early
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

    globeGroup.selectAll("path.land")
      .data(countries.features)
      .enter().append("path")
      .attr("class", "land")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("d", path as any)
      .attr("fill", MAP_CONSTANTS.colors.land)
      .attr("stroke", MAP_CONSTANTS.colors.landBorder)
      .attr("stroke-width", 0.5);

    // Arcs Group
    const arcGroup = svg.append("g");

    // Host Marker & Ripples
    const markersGroup = svg.append("g");

    // Host Dot
    markersGroup.append("path")
        .datum(hostPoint)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr("d", path as any)
        .attr("fill", MAP_CONSTANTS.colors.hostMarker)
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    // Ripple Circle (initially hidden)
    const ripple = markersGroup.append("circle")
        .attr("r", 0)
        .attr("fill", "none")
        .attr("stroke", MAP_CONSTANTS.colors.ripple)
        .attr("stroke-width", 2)
        .attr("opacity", 0)
        .style("pointer-events", "none");

    // Function to trigger a ripple at host location (projected)
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

    // State for drawn arcs to avoid re-drawing
    const drawnArcs = new Set<number>();

    // --- ANIMATION LOOP ---
    const timer = d3.timer((elapsed) => {

      // 1. Rotation Logic
      if (viewMode === 'GLOBE' && isPlayingRef.current) {
        const currentRot = projection.rotate();
        const k = MAP_CONSTANTS.rotationSpeed;
        const newRot: [number, number, number] = [currentRot[0] + k, currentRot[1], currentRot[2]];

        projection.rotate(newRot);
        rotationRef.current = newRot;
      }

      // 2. Month Progression Logic
      // Increment month every ~0.8 second
      const monthDuration = 800;
      const totalMonths = 12;
      const currentMonth = Math.floor((elapsed % (totalMonths * monthDuration)) / monthDuration);

      // 3. Trigger Arcs based on Month
      arcsData.forEach((d, i) => {
          // Trigger if current time has passed the launch month for this arc
          const shouldLaunch = d.launchMonth <= currentMonth;

          if (shouldLaunch && !drawnArcs.has(i)) {
              drawnArcs.add(i);

              // Draw this specific arc
              const pathEl = arcGroup.append("path")
                  .datum(d)
                  .attr("class", "arc")
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .attr("d", path as any)
                  .attr("fill", "none")
                  .attr("stroke", d.isUser ? MAP_CONSTANTS.colors.userArc : MAP_CONSTANTS.colors.arc)
                  .attr("stroke-width", d.isUser ? 3 : 1.5) // User arc is thicker
                  .attr("stroke-linecap", "round")
                  .attr("stroke-opacity", d.isUser ? 1 : 0.8)
                  .attr("stroke-dasharray", function(this: SVGPathElement) { return this.getTotalLength() + " " + this.getTotalLength(); })
                  .attr("stroke-dashoffset", function(this: SVGPathElement) { return this.getTotalLength(); });

               if (d.isUser) {
                   pathEl.style("filter", "drop-shadow(0 0 4px rgba(34,211,238,0.8))"); // Glow for user
               }

               pathEl.transition()
                   .duration(d.isUser ? 2000 : 1000) // Slower animation for user
                   .ease(d3.easeCubicOut)
                   .attr("stroke-dashoffset", 0)
                   .on("end", () => triggerRipple());
          }
      });

      // Update paths based on projection (for rotation)
      if (viewMode === 'GLOBE' && isPlayingRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        globeGroup.selectAll("path").attr("d", path as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        arcGroup.selectAll("path").attr("d", path as any);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        markersGroup.selectAll("path").attr("d", path as any);

        // Update ripple center if rotating
        const center = projection(data.homeCoordinates as [number, number]);
        if (center) {
            ripple.attr("cx", center[0]).attr("cy", center[1]);
        }
      }

      // Sync Ticker UI
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

    });

    return () => {
      timer.stop();
    };

  }, [worldData, data, viewMode, audience]);

  return (
    <div className="flex flex-col h-full pt-16 px-6 relative overflow-hidden">

      {/* Header */}
      <div className="flex flex-col items-center mb-4 z-20 animate-fade-in relative pointer-events-none">
        <div className="bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-6 backdrop-blur-md shadow-lg">
          <span className="text-[10px] font-bold font-sans tracking-[0.2em] uppercase text-white">
            {audience === 'HOSTAI' ? 'Global Network' : 'Global Reach'}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center leading-tight drop-shadow-md whitespace-pre-line">
           {audience === 'HOSTAI' ? 'Connecting \n the world.' : 'The world came \n to stay.'}
        </h2>
      </div>

      {/* Map Container */}
      <div ref={containerRef} className="flex-1 w-full relative flex items-center justify-center z-10">
         {loading && (
             <div className="absolute text-white/50 animate-pulse font-mono text-xs tracking-widest uppercase">
                 Calibrating Geodata...
             </div>
         )}
         <svg ref={svgRef} className="w-full h-full drop-shadow-2xl" />
      </div>

      {/* Month Ticker */}
      <div className="mb-24 z-20 relative w-full overflow-hidden">
        <div className="flex justify-between px-2">
            {MAP_CONSTANTS.months.map((m) => (
                <div key={m} className="month-ticker-item text-[8px] md:text-[10px] font-mono tracking-widest text-white/30 transition-all duration-300">
                    {m}
                </div>
            ))}
        </div>
        {/* Progress line */}
        <div className="w-full h-[1px] bg-white/10 mt-2 relative">
             <div className="absolute top-0 left-0 h-full bg-amber-400/50 w-full animate-progress-linear origin-left scale-x-0" style={{ animationDuration: '10s' }}></div>
        </div>
      </div>

    </div>
  );
};
