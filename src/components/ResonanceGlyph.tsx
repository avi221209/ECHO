import React from 'react';

interface ResonanceGlyphProps {
  resonated?: boolean;
  mutual?: boolean;
  size?: number;
  className?: string;
  pulsing?: boolean;
}

/**
 * Custom ECHO Resonance Glyph: Two harmonic opposing arcs creating an acoustic field.
 * Replaces conventional like/heart icons with an ambient resonance symbol.
 */
export const ResonanceGlyph: React.FC<ResonanceGlyphProps> = ({
  resonated = false,
  mutual = false,
  size = 20,
  className = '',
  pulsing = false,
}) => {
  const primaryColor = mutual ? '#B88B3E' : resonated ? '#D4A857' : 'currentColor';

  return (
    <span
      className={`inline-flex items-center justify-center relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-500 ${pulsing ? 'animate-ping opacity-60' : ''}`}
      >
        {/* Outer Left Harmonic Arc */}
        <path
          d="M6.5 4.5C4.2 6.8 3 9.8 3 13C3 16.2 4.2 19.2 6.5 21.5"
          stroke={primaryColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={resonated ? '1' : '0.45'}
          className="transition-opacity duration-300"
        />

        {/* Inner Left Arc */}
        <path
          d="M9.5 8C8.2 9.3 7.5 11.1 7.5 13C7.5 14.9 8.2 16.7 9.5 18"
          stroke={primaryColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={resonated ? '1' : '0.65'}
          className="transition-opacity duration-300"
        />

        {/* Center Resonant Core */}
        <circle
          cx="12"
          cy="13"
          r={resonated ? '2.5' : '2'}
          fill={primaryColor}
          opacity={resonated ? '1' : '0.8'}
          className="transition-all duration-300"
        />

        {/* Inner Right Arc */}
        <path
          d="M14.5 8C15.8 9.3 16.5 11.1 16.5 13C16.5 14.9 15.8 16.7 14.5 18"
          stroke={primaryColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={resonated ? '1' : '0.65'}
          className="transition-opacity duration-300"
        />

        {/* Outer Right Harmonic Arc */}
        <path
          d="M17.5 4.5C19.8 6.8 21 9.8 21 13C21 16.2 19.8 19.2 17.5 21.5"
          stroke={primaryColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={resonated ? '1' : '0.45'}
          className="transition-opacity duration-300"
        />

        {/* Mutual Connection Halo */}
        {mutual && (
          <circle
            cx="12"
            cy="13"
            r="10.5"
            stroke="#D4A857"
            strokeWidth="0.9"
            strokeDasharray="2 3"
            opacity="0.8"
          />
        )}
      </svg>
    </span>
  );
};
