'use client';

import React, { useState, useMemo } from 'react';
import { typography } from '@/lib/design-system';
import { SAMPLE_HOST_UUIDS } from '@/lib/hash';

type HostConfig = typeof SAMPLE_HOST_UUIDS[number];

interface AdminSidebarProps {
  // All available hosts
  allHosts: readonly HostConfig[];
  // Active working set
  activeHosts: HostConfig[];
  setActiveHosts: (hosts: HostConfig[]) => void;
  // Currently selected
  selectedHostIndex: number;
  setSelectedHostIndex: (index: number) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  allHosts,
  activeHosts,
  setActiveHosts,
  selectedHostIndex,
  setSelectedHostIndex,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter hosts based on search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allHosts.filter(
      host =>
        !activeHosts.some(h => h.uuid === host.uuid) &&
        (host.name.toLowerCase().includes(query) ||
         host.location.toLowerCase().includes(query))
    );
  }, [searchQuery, allHosts, activeHosts]);

  const addToActive = (host: HostConfig) => {
    setActiveHosts([...activeHosts, host]);
    setSearchQuery('');
    setIsSearchOpen(false);
    // Select the newly added host
    setSelectedHostIndex(activeHosts.length);
  };

  const removeFromActive = (hostToRemove: HostConfig) => {
    const newActive = activeHosts.filter(h => h.uuid !== hostToRemove.uuid);
    setActiveHosts(newActive);
    // Adjust selection if needed
    if (selectedHostIndex >= newActive.length) {
      setSelectedHostIndex(Math.max(0, newActive.length - 1));
    }
  };

  return (
    <div className="relative z-40 w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <img src="https://gethostai.com/images/hostai-logo-light.svg" alt="HostAI" className="h-4" />
          <span className={`${typography.mono} text-zinc-500 text-[10px]`}>WRAPPED</span>
        </div>
      </div>

      {/* Search to Add */}
      <div className="p-3 border-b border-zinc-800">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Search hosts..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* Search Results Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
              {searchResults.map((host) => (
                <button
                  key={host.uuid}
                  onClick={() => addToActive(host)}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-800 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="text-sm text-zinc-300">{host.name}</div>
                  <div className="text-[10px] text-zinc-500">{host.location}</div>
                </button>
              ))}
            </div>
          )}

          {isSearchOpen && searchQuery && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 px-3 py-2">
              <span className="text-xs text-zinc-500">No properties found</span>
            </div>
          )}
        </div>

        {/* Click outside to close */}
        {isSearchOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsSearchOpen(false)}
          />
        )}
      </div>

      {/* All Hosts - Always visible */}
      <div className="flex-1 overflow-y-auto py-3 pr-3">
        <div className="flex items-center justify-between mb-3 pl-3 pr-1">
          <h3 className={`${typography.mono} text-zinc-500 text-[10px] uppercase tracking-widest`}>
            Hosts ({allHosts.length})
          </h3>
        </div>

        <div className="space-y-0.5">
          {allHosts.map((host) => {
            // Find if this host is in activeHosts and get its index
            const activeIndex = activeHosts.findIndex(h => h.uuid === host.uuid);
            const isActive = activeIndex !== -1;
            const isSelected = isActive && activeIndex === selectedHostIndex;

            return (
              <button
                key={host.uuid}
                onClick={() => {
                  if (isActive) {
                    // Already in active list, just select it
                    setSelectedHostIndex(activeIndex);
                  } else {
                    // Add to active list and select it
                    addToActive(host);
                  }
                }}
                className={`w-full text-left py-2 transition-colors ${
                  isSelected
                    ? 'bg-blue-500/10 border-l-2 border-l-blue-400 pl-[10px] pr-3'
                    : 'pl-3 pr-3 hover:bg-zinc-800/40'
                }`}
              >
                <div className={`text-[13px] ${
                  isSelected ? 'text-white font-medium' : 'text-zinc-400'
                }`}>
                  {host.name}
                </div>
                <div className={`${typography.mono} text-[10px] ${
                  isSelected ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {host.location}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
