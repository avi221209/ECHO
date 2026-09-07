import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';
import { ConstellationEntry, CONSTELLATION_CAP } from '../../types';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { ConstellationNodeDetail } from './ConstellationNodeDetail';

export const ConstellationGraph: React.FC = () => {
  const { constellation, currentUser } = useEcho();
  const [selectedEntry, setSelectedEntry] = useState<ConstellationEntry | null>(null);

  const isAtCap = constellation.length >= CONSTELLATION_CAP;

  // SVG dimensions
  const width = 900;
  const height = 650;
  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate orbital positions for living threads
  const nodePositions = useMemo(() => {
    const total = constellation.length;
    return constellation.map((entry, idx) => {
      let radius = 195;
      let angle = (2 * Math.PI * idx) / Math.max(1, total) - Math.PI / 2;

      if (total > 6) {
        const isOuter = idx % 2 === 1;
        radius = isOuter ? 280 : 180;
        angle = (2 * Math.PI * idx) / total - Math.PI / 2 + (isOuter ? 0.22 : -0.22);
      }

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Calculate an organic control point for a living curved thread
      const midX = (centerX + x) / 2;
      const midY = (centerY + y) / 2;
      const curvature = 24 * (idx % 2 === 0 ? 1 : -1);
      const cpX = midX - Math.sin(angle) * curvature;
      const cpY = midY + Math.cos(angle) * curvature;

      // Thread intensity based on connection maturity (days connected)
      const ageDays = Math.max(1, Math.floor((Date.now() - entry.connectedAt) / (1000 * 60 * 60 * 24)));
      const maturity = Math.min(1, 0.4 + ageDays * 0.04);

      return {
        entry,
        x,
        y,
        cpX,
        cpY,
        maturity,
      };
    });
  }, [constellation, centerX, centerY]);

  return (
    <div
      className="relative w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-8 select-none min-h-[calc(100vh-80px)] overflow-hidden pb-24"
      role="region"
      aria-label="Constellation - Relationship Memory Field"
    >
      {/* Background celestial orbit rings & ambient haze */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-[380px] h-[380px] rounded-full border border-resonance-200/40 opacity-70" />
        <div className="w-[580px] h-[580px] rounded-full border border-dashed border-resonance-300/35 opacity-60" />
        <div className="w-[760px] h-[760px] rounded-full border border-resonance-200/25 opacity-40" />
        <div className="absolute w-[560px] h-[560px] rounded-full bg-resonance-100/40 blur-[120px]" />
      </div>

      {/* Top Cap & Harmony Status Banner */}
      <div className="relative z-20 w-full max-w-xl mx-auto text-center mb-2">
        {isAtCap ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-[2rem] bg-resonance-100/80 border border-resonance-400/80 shadow-light-soft text-center mt-2"
          >
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-resonance-900 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-resonance-700" />
              <span>Your Circle is Full</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink-900 font-light leading-snug">
              Fifteen people can stay close here.
            </h2>
            <p className="font-serif text-base text-resonance-900 italic font-normal mt-1">
              “Depth has a boundary.”
            </p>
            <p className="text-xs text-ink-600 font-light mt-2 max-w-md mx-auto leading-relaxed">
              In ECHO, connection is preserved through sacred focus. Every soul orbiting here
              is held in presence without infinite feeds or crowd distraction.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cream-50/90 border border-resonance-300/60 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-resonance-600" />
              <span className="text-xs font-medium text-ink-800">
                Living Memory Field:{' '}
                <span className="font-semibold text-resonance-800">
                  {constellation.length} of {CONSTELLATION_CAP} Souls
                </span>
              </span>
            </div>
            <p className="text-xs text-ink-500 font-light max-w-md mx-auto pt-1">
              Select any star to retrace the spark that formed your connection.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Node Graph Canvas */}
      <div className="relative z-10 w-full max-w-4xl aspect-[4/3] max-h-[640px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          aria-label={`Graph of ${constellation.length} mutual connections`}
        >
          {/* Living Curved Resonance Threads */}
          <g className="living-threads">
            {nodePositions.map(({ entry, x, y, cpX, cpY, maturity }) => {
              const isSelected = selectedEntry?.id === entry.id;

              return (
                <g key={`thread-${entry.id}`}>
                  {/* Outer soft ambient aura line */}
                  <path
                    d={`M ${centerX} ${centerY} Q ${cpX} ${cpY} ${x} ${y}`}
                    fill="none"
                    stroke="#D4A857"
                    strokeWidth={isSelected ? '6' : '3'}
                    strokeOpacity={isSelected ? '0.4' : '0.12'}
                    className="transition-all duration-500"
                  />
                  {/* Living Core Thread */}
                  <path
                    d={`M ${centerX} ${centerY} Q ${cpX} ${cpY} ${x} ${y}`}
                    fill="none"
                    stroke="#D4A857"
                    strokeWidth={isSelected ? '2.4' : '1.4'}
                    strokeDasharray={isSelected ? 'none' : '3 4'}
                    strokeOpacity={isSelected ? '1' : `${maturity}`}
                    className="transition-all duration-500"
                  />
                  {/* Traveling Pulse Beacon along curve */}
                  <circle
                    cx={(centerX + 2 * cpX + x) / 4}
                    cy={(centerY + 2 * cpY + y) / 4}
                    r={isSelected ? '3.5' : '2'}
                    fill="#D4A857"
                    className="animate-pulse-subtle"
                  />
                </g>
              );
            })}
          </g>

          {/* Center User Node ("You") */}
          <g
            transform={`translate(${centerX}, ${centerY})`}
            className="cursor-default"
            aria-label="Center Node: You"
          >
            <circle r="46" fill="rgba(212, 168, 87, 0.12)" />
            <circle
              r="34"
              fill="#FAF6EF"
              stroke="#D4A857"
              strokeWidth="2"
              filter="drop-shadow(0 4px 14px rgba(212, 168, 87, 0.28))"
            />
            <foreignObject x="-24" y="-24" width="48" height="48">
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <AbstractAvatar seed={currentUser.avatarSeed} size={48} glow />
              </div>
            </foreignObject>
            <text
              y="48"
              textAnchor="middle"
              className="text-[12px] font-medium fill-ink-900 tracking-wider uppercase font-sans"
            >
              You
            </text>
          </g>

          {/* Orbiting Satellite Souls */}
          {nodePositions.map(({ entry, x, y }) => {
            const isSelected = selectedEntry?.id === entry.id;

            return (
              <g
                key={`node-${entry.id}`}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer focus:outline-none group"
                tabIndex={0}
                role="button"
                aria-label={`Connection: ${entry.user.displayName}. Retrace story.`}
                onClick={() => setSelectedEntry(entry)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedEntry(entry);
                  }
                }}
              >
                <circle
                  r={isSelected ? 34 : 28}
                  fill="rgba(212, 168, 87, 0.2)"
                  className="transition-all duration-300 group-hover:scale-125"
                />
                <circle
                  r="24"
                  fill="#FAF6EF"
                  stroke={isSelected ? '#D4A857' : '#D4A85785'}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  filter="drop-shadow(0 3px 10px rgba(45, 40, 32, 0.08))"
                  className="transition-all duration-300 group-hover:stroke-resonance-500"
                />
                <foreignObject x="-20" y="-20" width="40" height="40">
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <AbstractAvatar seed={entry.user.avatarSeed} size={40} glow={isSelected} />
                  </div>
                </foreignObject>
                <text
                  y="36"
                  textAnchor="middle"
                  className="text-[11px] font-normal fill-ink-800 tracking-normal group-hover:fill-resonance-800 transition-colors"
                >
                  {entry.user.displayName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Connection Narrative Overlay */}
        {selectedEntry && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-cream-100/50 backdrop-blur-md animate-in fade-in duration-200">
            <ConstellationNodeDetail
              entry={selectedEntry}
              onClose={() => setSelectedEntry(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
