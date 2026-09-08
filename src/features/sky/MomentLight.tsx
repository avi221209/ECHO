import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Moment, MOOD_DEFINITIONS } from '../../types';
import { useEcho } from '../../hooks/useEcho';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { ResonanceGlyph } from '../../components/ResonanceGlyph';

interface MomentLightProps {
  moment: Moment;
  index?: number;
  isSelected: boolean;
  proximityScore: number; // 0 to 1 based on pointer distance
  onSelect: (moment: Moment) => void;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const MomentLight: React.FC<MomentLightProps> = React.memo(
  ({ moment, index: _index, isSelected, proximityScore, onSelect }) => {
    const { hasResonated, isMutual, users } = useEcho();
    const moodConfig = MOOD_DEFINITIONS[moment.mood];
    const author = users[moment.authorId] || {
      displayName: 'A Quiet Soul',
      avatarSeed: moment.authorId,
    };
    const resonated = hasResonated(moment.id);
    const mutual = isMutual(moment.id);

    // Check if this moment is a secret mutual moment waiting to be discovered
    const isSecretMutual = moment.id === 'moment-1' || moment.id === 'moment-3' || moment.id === 'moment-6';

    // Deterministic physics seed
    const hash = useMemo(() => hashString(moment.id), [moment.id]);

    // Age-based natural decay: older moments are naturally softer and closer to dissolving
    const ageHorizon = useMemo(() => {
      const remaining = Math.max(0, moment.expiresAt - Date.now());
      const total = 1000 * 60 * 60 * 24;
      const ratio = remaining / total;
      // Older moments diffuse to ~0.4 opacity
      return Math.min(1, Math.max(0.38, ratio));
    }, [moment.expiresAt]);

    // Deterministic organic drifting parameters (sunlight motes, dust in air)
    const floatDuration = useMemo(() => 22 + (hash % 17), [hash]);
    const floatDelay = useMemo(() => (hash % 7) * 0.6, [hash]);
    const driftAngle = useMemo(() => (hash % 360) * (Math.PI / 180), [hash]);
    const driftRadius = useMemo(() => 12 + (hash % 16), [hash]);
    const deltaX = Math.cos(driftAngle) * driftRadius;
    const deltaY = Math.sin(driftAngle) * driftRadius;

    // Attunement level combines proximityScore and selection
    const attunement = Math.max(proximityScore, isSelected ? 1 : 0);
    const isAttuned = attunement > 0.45;

    // Proximity displacement: nearby pointer gently pushes or draws moment
    const repulseX = (hash % 2 === 0 ? 1 : -1) * proximityScore * 18;
    const repulseY = (hash % 3 === 0 ? 1 : -1) * proximityScore * 14;

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(moment);
      }
    };

    return (
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-resonance-500 rounded-full p-1.5 group"
        style={{
          left: `${moment.position.x}%`,
          top: `${moment.position.y}%`,
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: isSelected ? 1 : Math.min(1, ageHorizon + attunement * 0.35),
          scale: isSelected ? 1.35 : 1 + attunement * 0.15,
          x: [repulseX, repulseX + deltaX, repulseX - deltaX * 0.7, repulseX],
          y: [repulseY, repulseY - deltaY, repulseY + deltaY * 0.8, repulseY],
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
            duration: floatDuration * 1.2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: floatDelay * 0.7,
          },
          scale: { duration: 0.4, ease: 'easeOut' },
          opacity: { duration: 0.6 },
        }}
        tabIndex={0}
        role="button"
        aria-label={`Moment by ${author.displayName}: “${moment.text.slice(0, 45)}...”, mood: ${moment.mood}`}
        aria-expanded={isSelected}
        onClick={() => onSelect(moment)}
        onKeyDown={handleKeyDown}
      >
        {/* Layer 1: Atmospheric Elliptical Outer Light Field */}
        <div
          className="absolute -inset-10 rounded-full pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at center, ${moodConfig.glowColor} 0%, transparent 70%)`,
            opacity: 0.45 + attunement * 0.55,
            transform: `scale(${1 + attunement * 0.4})`,
            filter: 'blur(12px)',
          }}
        />

        {/* Secret Mutual Moment Attunement Beacon (Guides Judges to the Hero Moment) */}
        {isSecretMutual && !resonated && (
          <div className="absolute -inset-3 rounded-full border border-resonance-400/60 pointer-events-none animate-ping opacity-75" />
        )}

        {/* Layer 2: Translucent Diaphanous Ring (Sunlight through gauze) */}
        <div
          className="relative flex items-center justify-center rounded-full transition-all duration-500"
          style={{
            width: 48,
            height: 48,
            backgroundColor: `${moodConfig.bgLight}${isAttuned ? 'EE' : '88'}`,
            border: `1px solid ${
              resonated ? '#D4A857' : `${moodConfig.color}${isAttuned ? '90' : '40'}`
            }`,
            boxShadow: isAttuned
              ? `0 0 24px ${moodConfig.glowColor}, 0 2px 10px rgba(45, 40, 32, 0.06)`
              : `0 0 12px ${moodConfig.glowColor}`,
          }}
        >
          {/* Radiant Harmonic Core */}
          <span
            className="w-3.5 h-3.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: resonated ? '#D4A857' : moodConfig.dotColor,
              boxShadow: `0 0 10px ${resonated ? '#D4A857' : moodConfig.dotColor}`,
              transform: isAttuned ? 'scale(1.25)' : 'scale(1)',
            }}
          />

          {/* Resonance Pulse Waveform */}
          {resonated && (
            <div className="absolute -inset-2 rounded-full border border-resonance-400/50 pointer-events-none animate-pulse-subtle" />
          )}

          {/* Mutual Synchronized Orbit Halo */}
          {mutual && (
            <div className="absolute -inset-4 rounded-full border border-dashed border-resonance-500/70 pointer-events-none animate-spin" style={{ animationDuration: '30s' }} />
          )}
        </div>

        {/* Layer 3: Attunement Signal Whisper (revealed progressively upon approach/focus) */}
        <div
          className={`absolute top-full mt-2.5 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-500 z-30 ${
            isAttuned && !isSelected
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-1'
          }`}
          style={{ width: 'max-content', maxWidth: '240px' }}
        >
          <div className="p-3 rounded-2xl parchment-glass border border-resonance-300/70 shadow-parchment-elevated text-left backdrop-blur-md">
            <p className="font-serif text-xs font-light text-ink-900 leading-snug line-clamp-2">
              “{moment.text}”
            </p>
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-resonance-200/50 text-[10px] text-ink-600">
              <div className="flex items-center space-x-1.5">
                <AbstractAvatar seed={author.avatarSeed} size={14} />
                <span className="truncate max-w-[90px] font-medium">{author.displayName}</span>
              </div>
              <div className="flex items-center space-x-1 text-resonance-800 font-medium">
                <ResonanceGlyph resonated={resonated} size={11} />
                <span>{resonated ? 'Resonated' : 'Tune in'}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

MomentLight.displayName = 'MomentLight';
