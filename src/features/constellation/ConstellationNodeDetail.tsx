import React, { useEffect } from 'react';
import { X, Mail, UserMinus, Calendar } from 'lucide-react';
import { ConstellationEntry } from '../../types';
import { useEcho } from '../../hooks/useEcho';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { ResonanceGlyph } from '../../components/ResonanceGlyph';

interface ConstellationNodeDetailProps {
  entry: ConstellationEntry;
  onClose: () => void;
}

export const ConstellationNodeDetail: React.FC<ConstellationNodeDetailProps> = ({
  entry,
  onClose,
}) => {
  const modalRef = useFocusTrap<HTMLDivElement>(true);
  const {
    moments,
    removeConstellationEntry,
    setActiveThreadUser,
    setIsSlowThreadsOpen,
  } = useEcho();

  const connectedDate = new Date(entry.connectedAt).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const catalystMoment = moments.find((m) => m.id === entry.resonanceMomentId);

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

  const handleOpenThread = () => {
    setActiveThreadUser(entry.user);
    setIsSlowThreadsOpen(true);
    onClose();
  };

  const handleRelease = () => {
    removeConstellationEntry(entry.userId);
    onClose();
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Connection story with ${entry.user.displayName}`}
      tabIndex={-1}
      className="relative w-full max-w-lg mx-auto p-7 sm:p-9 rounded-[2rem] bg-cream-50/95 border-2 border-resonance-400/80 shadow-2xl backdrop-blur-2xl z-30 animate-in fade-in zoom-in-95 duration-200 focus:outline-none"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-ink-500 hover:text-ink-900 hover:bg-resonance-100/80 rounded-full transition-colors"
        aria-label="Close relationship story"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header Profile */}
      <div className="flex items-center space-x-4 mb-6">
        <AbstractAvatar seed={entry.user.avatarSeed} size={54} glow />
        <div>
          <h3 className="font-serif text-2xl font-light text-ink-900 leading-tight">
            {entry.user.displayName}
          </h3>
          <p className="text-xs text-ink-600 font-light mt-0.5 max-w-xs">
            {entry.user.bio}
          </p>
        </div>
      </div>

      {/* Visual Narrative: The Relationship Memory Thread */}
      <div className="space-y-3 mb-6 p-5 rounded-2xl bg-cream-100/90 border border-resonance-300/60 shadow-inner">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-resonance-800 pb-2 border-b border-resonance-200/50">
          <ResonanceGlyph size={14} mutual />
          <span>The Relationship Origin Story</span>
        </div>

        {/* 4-Step Story Trace */}
        <div className="space-y-2.5 pt-1 text-left text-xs">
          {/* Step 1: Catalyst Moment */}
          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-resonance-200 text-resonance-900 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <span className="font-semibold uppercase text-[10px] tracking-wider text-resonance-800 block">
                Catalyst Moment
              </span>
              {catalystMoment ? (
                <p className="font-serif text-sm italic text-ink-900 leading-snug mt-0.5">
                  “{catalystMoment.text}”
                </p>
              ) : (
                <p className="font-serif text-sm italic text-ink-700 mt-0.5">
                  A quiet thought shared in the morning light.
                </p>
              )}
            </div>
          </div>

          {/* Step 2: Resonance */}
          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-resonance-200 text-resonance-900 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <span className="font-semibold uppercase text-[10px] tracking-wider text-resonance-800 block">
                Resonance
              </span>
              <p className="text-ink-600 font-light text-[11px]">
                A quiet signal sent into stillness without public metrics.
              </p>
            </div>
          </div>

          {/* Step 3: Mutuality */}
          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-resonance-200 text-resonance-900 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <span className="font-semibold uppercase text-[10px] tracking-wider text-resonance-800 block">
                Mutuality
              </span>
              <p className="text-ink-600 font-light text-[11px]">
                Both attuned to the same frequency without broadcast or feeds.
              </p>
            </div>
          </div>

          {/* Step 4: Connection */}
          <div className="flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-resonance-500 text-cream-50 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              4
            </span>
            <div>
              <span className="font-semibold uppercase text-[10px] tracking-wider text-resonance-900 block">
                Connection
              </span>
              <div className="flex items-center space-x-1.5 text-ink-700 text-[11px] font-medium mt-0.5">
                <Calendar className="w-3 h-3 text-resonance-700" />
                <span>Woven into Constellation on {connectedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleRelease}
          className="px-4 py-2 text-xs font-light text-ink-500 hover:text-ink-800 hover:bg-cream-200/50 rounded-full transition-colors flex items-center space-x-1.5"
          title="Gently release this living thread back into the ambient sky"
        >
          <UserMinus className="w-3.5 h-3.5" />
          <span>Gently Release</span>
        </button>

        <button
          type="button"
          onClick={handleOpenThread}
          className="px-6 py-2.5 rounded-full text-xs font-semibold text-cream-50 bg-resonance-500 hover:bg-resonance-600 shadow-light-soft hover:shadow-light-glow transition-all flex items-center space-x-2"
        >
          <Mail className="w-4 h-4" />
          <span>Write a Slow Letter</span>
        </button>
      </div>
    </div>
  );
};
