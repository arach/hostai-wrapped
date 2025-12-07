'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocalPoint } from '@/lib/types';

interface LocalMapProps {
  center: [number, number]; // [lon, lat]
  localPoints?: LocalPoint[];
  className?: string;
  interactive?: boolean;
}

export const LocalMap: React.FC<LocalMapProps> = ({ center, localPoints = [], className = '', interactive = false }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Create map
    const map = L.map(mapRef.current, {
      center: [center[1], center[0]], // Leaflet uses [lat, lon]
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      dragging: interactive,
      scrollWheelZoom: interactive,
      doubleClickZoom: interactive,
      touchZoom: interactive,
    });

    leafletMapRef.current = map;

    // Dark map tiles from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Custom icon for property (red)
    const propertyIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 24px;
        height: 24px;
        background: #ef4444;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 20px rgba(239,68,68,0.6), 0 4px 12px rgba(0,0,0,0.4);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add property marker
    L.marker([center[1], center[0]], { icon: propertyIcon }).addTo(map);

    // Custom icons for coffee (amber) and business (cyan)
    const createPointIcon = (color: string, shadowColor: string) => L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 12px;
        height: 12px;
        background: ${color};
        border: 2px solid rgba(255,255,255,0.5);
        border-radius: 50%;
        box-shadow: 0 0 10px ${shadowColor};
      "></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    const coffeeIcon = createPointIcon('#fbbf24', 'rgba(251,191,36,0.4)');
    const businessIcon = createPointIcon('#22d3ee', 'rgba(34,211,238,0.4)');

    // Add local points
    localPoints.forEach(point => {
      // coffee = amber, everything else (business, restaurant, attraction) = cyan
      const icon = point.type === 'coffee' ? coffeeIcon : businessIcon;
      L.marker([point.coordinates[1], point.coordinates[0]], { icon }).addTo(map);
    });

    // Add radius circles
    L.circle([center[1], center[0]], {
      radius: 400,
      color: 'rgba(255,255,255,0.15)',
      fillColor: 'transparent',
      weight: 1,
      dashArray: '8 4',
    }).addTo(map);

    L.circle([center[1], center[0]], {
      radius: 200,
      color: 'rgba(255,255,255,0.1)',
      fillColor: 'transparent',
      weight: 1,
      dashArray: '4 4',
    }).addTo(map);

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, [center, localPoints, interactive]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="absolute inset-0" />
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)' }} />
    </div>
  );
};
