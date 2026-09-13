import React from 'react';

/**
 * Organic SVG Noise Grain Overlay
 * Gives the entire ECHO workspace a subtle linen/paper tactile texture.
 */
export const AtmosphericGrain: React.FC = React.memo(() => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-multiply overflow-hidden"
      aria-hidden="true"
    >
      <svg className="w-full h-full">
        <filter id="echo-linen-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#echo-linen-grain)" />
      </svg>
    </div>
  );
});

AtmosphericGrain.displayName = 'AtmosphericGrain';
