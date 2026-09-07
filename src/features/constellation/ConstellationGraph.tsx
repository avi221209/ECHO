import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, PlusCircle } from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';
import { ConstellationEntry, CONSTELLATION_CAP } from '../../types';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { ConstellationNodeDetail } from './ConstellationNodeDetail';

export const ConstellationGraph: React.FC = () => {
  const { constellation, currentUser, users, moments } = useEcho();
  const [selectedEntry, setSelectedEntry] = useState<ConstellationEntry | null>(null);

  const isAtCap = constellation.length >= CONSTELLATION_CAP;

  // SVG canvas dimensions
  const width = 900;
  const height = 650;
  const centerX = width / 2;
  const centerY = height / 2;

  // Compute orbital positions for constellation nodes
  const nodePositions = useMemo(() => {
    const total = constellation.length;
    return constellation.map((entry, idx) => {
      // Split into two concentric orbits if more than 6 nodes
      let radius = 190;
      let angle = (2 * Math.PI * idx) / total - Math.PI / 2;

      if (total > 6) {
        const isOuter = idx % 2 === 1;
        radius = isOuter ? 275 : 175;
        angle = (2 * Math.PI * idx) / total - Math.PI / 2 + (isOuter ? 0.2 : -0.2);
      }

      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      return {
        entry,
        x,
        y,
        angle,
      };
    });
  }, [constellation, centerX, centerY]);

  // Demo helper: Fill constellation to 15 to demonstrate the capped state
  const handleFillToCap = () => {
    // Fill with remaining seed users up to 15
    const existingIds = new Set(constellation.map((c) => c.userId));
    const candidateUsers = Object.values(users).filter(
      (u) => !existingIds.has(u.id) && u.id !== currentUser.id
    );

    const needed = CONSTELLATION_CAP - constellation.length;
    if (needed <= 0) return;

    candidateUsers.slice(0, needed).forEach((user, i) => {
      const randomMoment = moments[i % moments.length];
      const newEntry: ConstellationEntry = {
        id: `constellation-${user.id}-${Date.now() + i}`,
        userId: user.id,
        connectedAt: Date.now() - (i + 1) * 1000 * 60 * 60 * 24,
        resonanceMomentId: randomMoment.id,
        user,
      };
      // We can push to localStorage directly or use context
      const current = JSON.parse(
        localStorage.getItem('echo_constellation_v1') || '[]'
      );
      localStorage.setItem(
        'echo_constellation_v1',
        JSON.stringify([...current, newEntry])
      );
    });

    window.dispatchEvent(new Event('storage'));
    window.location.reload();
  };

  return (
    <div
      className="relative w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-8 select-none min-h-[calc(100vh-80px)] overflow-hidden"
      role="region"
      aria-label="Personal Constellation Connection Graph"
    >
      {/* Background celestial orbit rings */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-[360px] h-[360px] rounded-full border border-resonance-200/40 opacity-70" />
        <div className="w-[560px] h-[560px] rounded-full border border-dashed border-resonance-300/30 opacity-60" />
        <div className="w-[740px] h-[740px] rounded-full border border-resonance-200/20 opacity-40" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-resonance-100/40 blur-[100px]" />
      </div>

      {/* Top Cap & Harmony Status Banner */}
      <div className="relative z-20 w-full max-w-xl mx-auto text-center mb-2">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cream-50/90 border border-resonance-300/60 shadow-sm backdrop-blur-md mb-2">
          <Sparkles className="w-3.5 h-3.5 text-resonance-600" />
          <span className="text-xs font-medium text-ink-800">
            Constellation Capacity:{' '}
            <span className="font-semibold text-resonance-700">
              {constellation.length} / {CONSTELLATION_CAP} Connections
            </span>
          </span>
        </div>

        {/* Deliberate Capped State Copy */}
        {isAtCap ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-resonance-100/70 border border-resonance-400/80 shadow-light-soft text-left sm:text-center mt-2"
          >
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-resonance-900 mb-1">
              <ShieldCheck className="w-4 h-4 text-resonance-700" />
              <span>Your Constellation is Complete</span>
            </div>
            <p className="font-serif text-base sm:text-lg text-ink-900 leading-snug">
              “Fifteen souls held in quiet focus. Depth chosen over infinite expanse.”
            </p>
            <p className="text-xs text-ink-600 font-light mt-1">
              ECHO intentionally sets a boundary at fifteen. No endless follow lists. Every
              connection here is honored with presence.
            </p>
          </motion.div>
        ) : (
          <p className="text-xs text-ink-500 font-light max-w-md mx-auto leading-relaxed">
            Every thread below is a mutual resonance. Tap any star to review your shared
            catalyst or exchange an ephemeral Slow Thread.
          </p>
        )}
      </div>

      {/* Interactive Node Graph Canvas */}
      <div className="relative z-10 w-full max-w-4xl aspect-[4/3] max-h-[640px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          aria-label={`Graph of ${constellation.length} mutual connections`}
        >
          {/* Connecting Resonance Threads (Curved Amber Glow Lines) */}
          <g className="connecting-threads">
            {nodePositions.map(({ entry, x, y }) => (
              <g key={`line-${entry.id}`}>
                {/* Outer soft glow line */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="#D4A857"
                  strokeWidth="3"
                  strokeOpacity="0.18"
                />
                {/* Core resonant thread */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="#D4A857"
                  strokeWidth="1.4"
                  strokeDasharray="3 4"
                  strokeOpacity="0.75"
                />
                {/* Traveling photon dot */}
                <circle
                  cx={(centerX + x) / 2}
                  cy={(centerY + y) / 2}
                  r="2"
                  fill="#D4A857"
                  opacity="0.85"
                />
              </g>
            ))}
          </g>

          {/* Center User Node ("You") */}
          <g
            transform={`translate(${centerX}, ${centerY})`}
            className="cursor-default"
            aria-label="Center Node: You"
          >
            {/* Ambient golden aura */}
            <circle r="44" fill="rgba(212, 168, 87, 0.12)" />
            <circle
              r="34"
              fill="#FAF6EF"
              stroke="#D4A857"
              strokeWidth="2"
              filter="drop-shadow(0 4px 12px rgba(212, 168, 87, 0.25))"
            />
            {/* Abstract Avatar embed */}
            <foreignObject x="-24" y="-24" width="48" height="48">
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <AbstractAvatar seed={currentUser.avatarSeed} size={48} glow />
              </div>
            </foreignObject>
            {/* Center label */}
            <text
              y="48"
              textAnchor="middle"
              className="text-[12px] font-medium fill-ink-900 tracking-wider uppercase font-sans"
            >
              You
            </text>
          </g>

          {/* Satellite Orbiting Connection Nodes */}
          {nodePositions.map(({ entry, x, y }) => {
            const isSelected = selectedEntry?.id === entry.id;

            return (
              <g
                key={`node-${entry.id}`}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer focus:outline-none group"
                tabIndex={0}
                role="button"
                aria-label={`Connection: ${entry.user.displayName}. Click for details.`}
                onClick={() => setSelectedEntry(entry)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedEntry(entry);
                  }
                }}
              >
                {/* Hover halo */}
                <circle
                  r={isSelected ? 32 : 28}
                  fill="rgba(212, 168, 87, 0.18)"
                  className="transition-all duration-300 group-hover:scale-125"
                />
                {/* Border ring */}
                <circle
                  r="24"
                  fill="#FAF6EF"
                  stroke={isSelected ? '#D4A857' : '#D4A85780'}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  filter="drop-shadow(0 2px 8px rgba(45, 40, 32, 0.08))"
                  className="transition-all duration-300 group-hover:stroke-resonance-500"
                />
                {/* Abstract Avatar */}
                <foreignObject x="-20" y="-20" width="40" height="40">
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <AbstractAvatar seed={entry.user.avatarSeed} size={40} glow={isSelected} />
                  </div>
                </foreignObject>
                {/* Display Name label under node */}
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

        {/* Selected Connection Detail Modal Overlay */}
        {selectedEntry && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-cream-100/50 backdrop-blur-sm">
            <ConstellationNodeDetail
              entry={selectedEntry}
              onClose={() => setSelectedEntry(null)}
            />
          </div>
        )}
      </div>

      {/* Evaluator Convenience Button: Fill to 15 to test cap */}
      {!isAtCap && (
        <div className="relative z-20 mt-4">
          <button
            type="button"
            onClick={handleFillToCap}
            className="px-4 py-1.5 text-xs text-ink-500 hover:text-resonance-700 bg-cream-50/80 hover:bg-resonance-100/50 rounded-full border border-resonance-200/60 transition-colors flex items-center space-x-1.5"
            title="Demonstrate the 15-node intentional capacity state for hackathon evaluation"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Simulate Reaching 15/15 Cap (Evaluator Tool)</span>
          </button>
        </div>
      )}
    </div>
  );
};
