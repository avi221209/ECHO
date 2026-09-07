import React from 'react';

interface AbstractAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

// Deterministic simple hash function from string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const PALETTES = [
  ['#D4A857', '#FAF6EF', '#8B8FA3'],
  ['#7C8E7D', '#FBF3DF', '#B88B3E'],
  ['#C48B71', '#F5EFE6', '#D4A857'],
  ['#8B8FA3', '#EDE4D3', '#7C8E7D'],
  ['#A86C52', '#FDFBF7', '#8B8FA3'],
  ['#B88B3E', '#F3EDE2', '#C48B71'],
];

export const AbstractAvatar: React.FC<AbstractAvatarProps> = ({
  seed,
  size = 40,
  className = '',
  glow = false,
}) => {
  const hash = hashString(seed);
  const paletteIndex = hash % PALETTES.length;
  const palette = PALETTES[paletteIndex];

  const primaryColor = palette[0];
  const bgColor = palette[1];
  const accentColor = palette[2];

  // Variations in concentric shapes based on hash
  const ringCount = 2 + (hash % 3);
  const offset = (hash % 7) - 3;
  const rotation = (hash % 360);

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 ${
        glow ? 'shadow-light-glow' : 'shadow-sm'
      } ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        border: `1px solid ${primaryColor}40`,
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <circle cx="20" cy="20" r="18" fill={bgColor} />
        
        {/* Abstract geometric ripples / motes */}
        <circle
          cx={20 + offset}
          cy={20 - offset}
          r={12}
          stroke={primaryColor}
          strokeWidth="1.2"
          strokeDasharray={hash % 2 === 0 ? '2 2' : 'none'}
          opacity="0.75"
        />

        {ringCount > 2 && (
          <circle
            cx={20 - offset}
            cy={20 + offset}
            r={7}
            fill={accentColor}
            opacity="0.35"
          />
        )}

        <circle
          cx="20"
          cy="20"
          r={3.5 + (hash % 2.5)}
          fill={primaryColor}
          opacity="0.85"
        />

        {/* Delicate orbit satellite */}
        <circle
          cx={20 + Math.cos(rotation) * 11}
          cy={20 + Math.sin(rotation) * 11}
          r="1.8"
          fill={accentColor}
        />
      </svg>
    </div>
  );
};
