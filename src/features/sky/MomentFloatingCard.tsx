import React, { useEffect, useMemo } from 'react';
import { X, Heart, Sparkles, Clock, Compass } from 'lucide-react';
import { Moment, MOOD_DEFINITIONS } from '../../types';
import { useEcho } from '../../hooks/useEcho';
import { AbstractAvatar } from '../../components/AbstractAvatar';

interface MomentFloatingCardProps {
  moment: Moment;
  onClose: () => void;
}

export const MomentFloatingCard: React.FC<MomentFloatingCardProps> = ({
  moment,
  onClose,
}) => {
  const { users, currentUser, resonate, hasResonated, isMutual } = useEcho();
  const author = users[moment.authorId] || {
    id: moment.authorId,
    displayName: moment.isOwn ? 'You' : 'A Quiet Soul',
    avatarSeed: moment.authorId,
    bio: 'Present in the ambient sky.',
    joinedAt: moment.createdAt,
  };

  const isOwn = moment.authorId === currentUser.id;
  const moodConfig = MOOD_DEFINITIONS[moment.mood];
  const resonated = hasResonated(moment.id);
  const mutual = isMutual(moment.id);

  // Remaining lifespan calculation
  const remainingHours = useMemo(() => {
    const diff = moment.expiresAt - Date.now();
    if (diff <= 0) return 'Expiring soon';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${hours}h ${minutes}m in the sky`;
    return `${minutes}m in the sky`;
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
    if (isOwn) return;
    resonate(moment.id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Moment by ${author.displayName}`}
      className="relative w-full max-w-lg mx-auto p-6 sm:p-7 rounded-3xl parchment-glass border border-resonance-400/50 shadow-parchment-elevated backdrop-blur-xl transition-all duration-300 animate-in fade-in zoom-in-95"
    >
      {/* Soft warm ambient corner light */}
      <div
        className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-resonance-200/30 blur-2xl"
        aria-hidden="true"
      />

      {/* Header with Author and Close */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center space-x-3">
          <AbstractAvatar
            seed={author.avatarSeed}
            size={44}
            glow={mutual}
            className="border border-resonance-400/40"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span
                id="moment-card-author"
                className="font-medium text-ink-900 text-sm"
              >
                {author.displayName}
              </span>
              {isOwn && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-resonance-900 bg-resonance-100 px-2 py-0.5 rounded-full border border-resonance-300">
                  You
                </span>
              )}
              {mutual && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-resonance-900 bg-resonance-200/90 px-2 py-0.5 rounded-full border border-resonance-400 flex items-center space-x-1">
                  <Sparkles className="w-2.5 h-2.5 inline mr-0.5 text-resonance-800" />
                  <span>Mutual Connection</span>
                </span>
              )}
            </div>
            <p className="text-xs text-ink-700 font-normal truncate max-w-[220px] mt-0.5">
              {author.bio}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-ink-600 hover:text-ink-900 hover:bg-resonance-100/80 rounded-full transition-colors"
          aria-label="Close moment card"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Moment Text in distinctive Newsreader serif */}
      <div className="my-5">
        <p className="font-serif text-xl sm:text-2xl font-light text-ink-900 leading-relaxed tracking-normal">
          “{moment.text}”
        </p>
      </div>

      {/* Meta details: Mood badge and Lifespan */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-resonance-200/60 text-xs text-ink-700">
        <div className="flex items-center space-x-3">
          <span
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
            style={{
              backgroundColor: moodConfig.bgLight,
              borderColor: `${moodConfig.color}60`,
              color: '#23201C',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: moodConfig.dotColor }}
              aria-hidden="true"
            />
            <span>{moodConfig.label}</span>
          </span>

          <span className="flex items-center space-x-1 text-ink-700 text-[11px] font-medium">
            <Clock className="w-3.5 h-3.5 text-resonance-700" />
            <span>{remainingHours}</span>
          </span>
        </div>

        {/* Spatial anchor coordinates tag */}
        <span className="flex items-center space-x-1 text-[11px] text-ink-700 font-medium">
          <Compass className="w-3.5 h-3.5 text-resonance-700" />
          <span>
            {moment.position.x}°E · {moment.position.y}°N
          </span>
        </span>
      </div>

      {/* Action area: Private Resonance */}
      <div className="mt-5 pt-4 flex items-center justify-between gap-3">
        <p className="text-[11px] text-ink-700 font-normal italic leading-tight">
          {isOwn
            ? 'Casting into the stillness. Others resonate silently.'
            : resonated
              ? mutual
                ? 'Mutual connection formed in your Constellation.'
                : 'Resonance sent in quiet privacy. Invisible unless mutual.'
              : 'Resonance is completely private. No counters, no public metrics.'}
        </p>

        {!isOwn && (
          <button
            type="button"
            onClick={handleResonate}
            disabled={resonated}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center space-x-2 shrink-0 ${
              resonated
                ? 'bg-resonance-100 text-resonance-900 border border-resonance-400 cursor-default'
                : 'bg-resonance-500 hover:bg-resonance-600 text-cream-50 shadow-sm hover:shadow-light-glow'
            }`}
            aria-label={
              resonated
                ? 'You have resonated with this moment'
                : 'Resonate privately with this moment'
            }
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                resonated
                  ? 'fill-resonance-600 text-resonance-700 scale-110'
                  : 'text-cream-50 group-hover:scale-110'
              }`}
            />
            <span>{resonated ? 'Resonated' : 'Resonate'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
