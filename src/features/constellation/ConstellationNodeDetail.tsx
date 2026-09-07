import React from 'react';
import { X, Mail, UserMinus, Calendar } from 'lucide-react';
import { ConstellationEntry } from '../../types';
import { useEcho } from '../../hooks/useEcho';
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
      role="dialog"
      aria-label={`Connection story with ${entry.user.displayName}`}
      className="relative w-full max-w-lg mx-auto p-7 sm:p-9 rounded-[2rem] bg-cream-50/95 border-2 border-resonance-400/80 shadow-2xl backdrop-blur-2xl z-30 animate-in fade-in zoom-in-95 duration-200"
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
      <div className="space-y-3 mb-6 p-4 rounded-2xl bg-cream-100/80 border border-resonance-300/50 shadow-inner">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-resonance-800">
          <ResonanceGlyph size={14} mutual />
          <span>The Memory Thread</span>
        </div>

        {catalystMoment ? (
          <div className="pt-1">
            <p className="font-serif text-base sm:text-lg italic text-ink-900 leading-snug">
              “{catalystMoment.text}”
            </p>
            <span className="block text-[11px] text-ink-500 font-light mt-2">
              The unspoken thought that sparked your mutual resonance.
            </span>
          </div>
        ) : (
          <p className="font-serif text-sm italic text-ink-700">
            Connected through shared stillness.
          </p>
        )}

        <div className="flex items-center space-x-2 text-xs text-ink-600 pt-2 border-t border-resonance-200/50">
          <Calendar className="w-3.5 h-3.5 text-resonance-700" />
          <span>Walking together since {connectedDate}</span>
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
