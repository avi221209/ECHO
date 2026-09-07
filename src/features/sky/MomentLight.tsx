import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Moment, MOOD_DEFINITIONS } from '../../types';
import { useEcho } from '../../hooks/useEcho';

interface MomentLightProps {
  moment: Moment;
  index: number;
  isSelected: boolean;
  onSelect: (moment: Moment) => void;
}

export const MomentLight: React.FC<MomentLightProps> = React.memo(
  ({ moment, index, isSelected, onSelect }) => {
    const { hasResonated, isMutual, users } = useEcho();
    const moodConfig = MOOD_DEFINITIONS[moment.mood];
    const author = users[moment.authorId] || { displayName: 'A Quiet Soul' };
    const resonated = hasResonated(moment.id);
    const mutual = isMutual(moment.id);

    // Lifespan remaining calculation (subtle opacity fading)
    const lifespanRatio = useMemo(() => {
      const remaining = Math.max(0, moment.expiresAt - Date.now());
      const total = 1000 * 60 * 60 * 24;
      return Math.min(1, Math.max(0.4, remaining / total));
    }, [moment.expiresAt]);

    // Unique organic drifting animation parameters per light
    const floatDuration = useMemo(() => 18 + (index * 3.7) % 14, [index]);
    const floatDelay = useMemo(() => (index * 0.5) % 4, [index]);
    const deltaX = useMemo(() => 10 + (index % 5) * 3, [index]);
    const deltaY = useMemo(() => 12 + (index % 4) * 3, [index]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(moment);
      }
    };

    return (
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 focus:outline-none"
        style={{
          left: `${moment.position.x}%`,
          top: `${moment.position.y}%`,
          opacity: lifespanRatio,
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: lifespanRatio,
          scale: isSelected ? 1.25 : 1,
          x: [0, deltaX, -deltaX * 0.8, deltaX * 0.5, 0],
          y: [0, -deltaY, deltaY * 0.7, -deltaY * 0.6, 0],
        }}
        transition={{
          x: {
            duration: floatDuration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: floatDelay,
          },
          y: {
            duration: floatDuration * 1.15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: floatDelay * 0.8,
          },
          scale: { duration: 0.3 },
          opacity: { duration: 0.8 },
        }}
        tabIndex={0}
        role="button"
        aria-label={`Moment by ${author.displayName}: “${moment.text.slice(0, 45)}...”, mood: ${moment.mood}`}
        aria-expanded={isSelected}
        onClick={() => onSelect(moment)}
        onKeyDown={handleKeyDown}
      >
        {/* Outer sunbeam halo / dust mote aura */}
        <div
          className={`relative flex items-center justify-center transition-transform duration-500 rounded-full group ${
            isSelected ? 'scale-125' : 'hover:scale-115'
          }`}
          style={{ width: 44, height: 44 }}
        >
          {/* Subtle outer soft light ripple */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: moodConfig.glowColor,
              filter: 'blur(6px)',
              transform: isSelected ? 'scale(1.5)' : 'scale(1)',
            }}
          />

          {/* Golden resonance halo if resonated */}
          {resonated && (
            <div
              className="absolute -inset-1.5 rounded-full border border-resonance-400/60 pointer-events-none animate-pulse-subtle"
              style={{
                boxShadow: '0 0 12px rgba(212, 168, 87, 0.35)',
              }}
            />
          )}

          {/* Mutual resonance dual celestial aura */}
          {mutual && (
            <div
              className="absolute -inset-3 rounded-full border border-dashed border-resonance-500/80 pointer-events-none"
              style={{
                boxShadow: '0 0 20px rgba(212, 168, 87, 0.45)',
              }}
            />
          )}

          {/* Translucent gauze/linen disc */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border transition-all duration-300 backdrop-blur-sm"
            style={{
              backgroundColor: isSelected ? '#FAF6EF' : `${moodConfig.bgLight}DD`,
              borderColor: isSelected
                ? '#D4A857'
                : resonated
                  ? '#D4A85788'
                  : `${moodConfig.color}40`,
            }}
          >
            {/* Inner radiant sunlight core */}
            <span
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: isSelected
                  ? '#D4A857'
                  : resonated
                    ? '#D4A857'
                    : moodConfig.dotColor,
                boxShadow: `0 0 8px ${moodConfig.dotColor}88`,
              }}
            />
          </div>

          {/* Gentle tooltip indicator on hover */}
          <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 z-30 whitespace-nowrap">
            <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-cream-50/95 text-ink-700 shadow-sm border border-resonance-200/50">
              {moodConfig.label}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
);

MomentLight.displayName = 'MomentLight';
