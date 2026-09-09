import React from 'react';
import { ConstellationEntry, User } from '../../types';
import { AbstractAvatar } from '../../components/AbstractAvatar';

export interface NodePosition {
  entry: ConstellationEntry;
  x: number;
  y: number;
  cpX: number;
  cpY: number;
  maturity: number;
}

interface ConstellationSvgCanvasProps {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  currentUser: User;
  nodePositions: NodePosition[];
  selectedEntry: ConstellationEntry | null;
  onSelectEntry: (entry: ConstellationEntry) => void;
}

export const ConstellationSvgCanvas: React.FC<ConstellationSvgCanvasProps> = React.memo(({
  width,
  height,
  centerX,
  centerY,
  currentUser,
  nodePositions,
  selectedEntry,
  onSelectEntry,
}) => {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full overflow-visible"
      aria-label={`Graph of ${nodePositions.length} mutual connections`}
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

      {/* Orbiting Constellation Connections */}
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
            onClick={() => onSelectEntry(entry)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectEntry(entry);
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
  );
});

ConstellationSvgCanvas.displayName = 'ConstellationSvgCanvas';
