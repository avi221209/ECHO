import React, { useEffect, useMemo, useState } from 'react';
import { X, Sparkles, Clock, Compass } from 'lucide-react';
import { Moment, MOOD_DEFINITIONS } from '../../types';
import { useEcho } from '../../hooks/useEcho';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { ResonanceGlyph } from '../../components/ResonanceGlyph';

interface MomentFloatingCardProps {
  moment: Moment;
  onClose: () => void;
}

export const MomentFloatingCard: React.FC<MomentFloatingCardProps> = ({
  moment,
  onClose,
}) => {
  const modalRef = useFocusTrap<HTMLDivElement>(true);
  const { users, currentUser, resonate, hasResonated, isMutual } = useEcho();
  const [pulseActive, setPulseActive] = useState(false);

  const author = users[moment.authorId] || {
    id: moment.authorId,
    displayName: moment.isOwn ? 'You' : 'A Quiet Soul',
    avatarSeed: moment.authorId,
    bio: 'Present in the ambient light.',
    joinedAt: moment.createdAt,
  };

  const isOwn = moment.authorId === currentUser.id;
  const moodConfig = MOOD_DEFINITIONS[moment.mood];
  const resonated = hasResonated(moment.id);
  const mutual = isMutual(moment.id);

  // Approximate natural age description
  const naturalAge = useMemo(() => {
    const elapsedMs = Date.now() - moment.createdAt;
    const hours = Math.floor(elapsedMs / (1000 * 60 * 60));
    if (hours < 1) return 'Cast moments ago into the light';
    if (hours === 1) return 'Adrift for about an hour';
    if (hours < 6) return `Adrift for ${hours} hours`;
    if (hours < 18) return `Adrift since earlier today (${hours}h)`;
    return `Waning in the evening sky (${hours}h)`;
  }, [moment.createdAt]);

  const remainingHours = useMemo(() => {
    const diff = moment.expiresAt - Date.now();
    if (diff <= 0) return 'Dissolving soon';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}h before return to silence`;
  }, [moment.expiresAt]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleResonate = () => {
    if (isOwn || resonated) return;
    setPulseActive(true);
    resonate(moment.id);
    setTimeout(() => setPulseActive(false), 900);
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Moment by ${author.displayName}`}
      tabIndex={-1}
      className="relative w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-[2.5rem] bg-cream-50/95 border border-resonance-400/60 shadow-2xl backdrop-blur-2xl transition-all duration-500 animate-in fade-in zoom-in-95 focus:outline-none"
    >
      {/* Background Soft Organic Grain & Light Leak */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-resonance-200/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-ambient-100/40 blur-3xl"
        aria-hidden="true"
      />

      {/* Atmospheric Header: Author & Close */}
      <div className="relative z-10 flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <AbstractAvatar
            seed={author.avatarSeed}
            size={52}
            glow={mutual}
            className="border-2 border-resonance-300/60"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg text-ink-900 font-medium leading-none">
                {author.displayName}
              </span>
              {isOwn && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-resonance-900 bg-resonance-100 px-2.5 py-0.5 rounded-full border border-resonance-300">
                  You
                </span>
              )}
              {mutual && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-resonance-900 bg-resonance-200/90 px-2.5 py-0.5 rounded-full border border-resonance-400 flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5 text-resonance-800" />
                  <span>Mutual Connection</span>
                </span>
              )}
            </div>
            <p className="text-xs text-ink-600 font-light mt-1 max-w-sm">
              {author.bio}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-ink-600 hover:text-ink-900 hover:bg-resonance-100/80 rounded-full transition-colors"
          aria-label="Close moment card"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* The Thought: Luminous Newsreader Editorial Typography */}
      <div className="relative z-10 my-8 py-2">
        <blockquote className="font-serif text-2xl sm:text-4xl font-light text-ink-900 leading-snug tracking-normal">
          “{moment.text}”
        </blockquote>
      </div>

      {/* Meta context: Mood, Age horizon, Spatial Coordinates */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-resonance-200/60 text-xs text-ink-700">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border"
            style={{
              backgroundColor: moodConfig.bgLight,
              borderColor: `${moodConfig.color}60`,
              color: '#23201C',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: moodConfig.dotColor }}
              aria-hidden="true"
            />
            <span>{moodConfig.label}</span>
          </span>

          <span className="flex items-center space-x-1.5 text-ink-700 text-xs font-normal">
            <Clock className="w-3.5 h-3.5 text-resonance-700" />
            <span>{naturalAge}</span>
            <span className="text-ink-400">·</span>
            <span className="text-ink-500 font-light">{remainingHours}</span>
          </span>
        </div>

        <span className="flex items-center space-x-1 text-xs text-ink-500 font-mono">
          <Compass className="w-3.5 h-3.5 text-resonance-600" />
          <span>
            {moment.position.x}°E / {moment.position.y}°N
          </span>
        </span>
      </div>

      {/* Action area: Private Resonance Signal (No heart icons, no public metrics) */}
      <div className="relative z-10 mt-8 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-ink-600 font-light italic leading-relaxed max-w-sm">
          {isOwn
            ? 'Casting in stillness. Others attune and resonate privately.'
            : resonated
              ? mutual
                ? 'Your resonance was answered. A living thread now connects you in Constellation.'
                : 'Resonance sent into the atmosphere. Completely invisible unless mutual.'
              : 'Resonating sends a quiet private signal. No public counts or popularity rankings.'}
        </p>

        {!isOwn && (
          <button
            type="button"
            onClick={handleResonate}
            disabled={resonated}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center space-x-2.5 shrink-0 ${
              resonated
                ? 'bg-resonance-100 text-resonance-900 border border-resonance-400 cursor-default'
                : 'bg-resonance-500 hover:bg-resonance-600 text-cream-50 shadow-light-soft hover:shadow-light-glow'
            }`}
            aria-label={
              resonated
                ? 'You have resonated with this moment'
                : 'Resonate privately with this moment'
            }
          >
            <ResonanceGlyph
              resonated={resonated}
              mutual={mutual}
              pulsing={pulseActive}
              size={18}
            />
            <span>{resonated ? 'Resonated' : 'Resonate quietly'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
