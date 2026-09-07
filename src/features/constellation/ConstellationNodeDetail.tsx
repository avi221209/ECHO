import React from 'react';
import { X, MessageCircle, UserMinus, Calendar, Sparkles } from 'lucide-react';
import { ConstellationEntry } from '../../types';
import { useEcho } from '../../hooks/useEcho';
import { AbstractAvatar } from '../../components/AbstractAvatar';

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
    month: 'short',
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
      aria-label={`Connection details for ${entry.user.displayName}`}
      className="relative w-full max-w-md mx-auto p-6 sm:p-7 rounded-3xl parchment-glass border border-resonance-400/60 shadow-parchment-elevated backdrop-blur-xl z-30 animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center space-x-3.5">
          <AbstractAvatar seed={entry.user.avatarSeed} size={48} glow />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif text-xl font-normal text-ink-900 leading-tight">
                {entry.user.displayName}
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-resonance-500" />
            </div>
            <p className="text-xs text-ink-500 font-light mt-0.5 max-w-[220px]">
              {entry.user.bio}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-ink-400 hover:text-ink-800 hover:bg-resonance-100/60 rounded-full transition-colors"
          aria-label="Close connection details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Connected timestamp */}
      <div className="flex items-center space-x-2 text-xs text-ink-600 mb-4 bg-resonance-100/40 px-3 py-1.5 rounded-full border border-resonance-200/50 w-fit">
        <Calendar className="w-3.5 h-3.5 text-resonance-600" />
        <span>Connected since {connectedDate}</span>
      </div>

      {/* Catalyst moment quote */}
      {catalystMoment && (
        <div className="p-4 rounded-2xl bg-cream-50/80 border border-resonance-300/40 shadow-inner mb-6 text-left">
          <div className="flex items-center space-x-1.5 text-[10px] font-semibold uppercase tracking-wider text-resonance-700 mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Resonant Catalyst</span>
          </div>
          <p className="font-serif text-sm sm:text-base italic text-ink-800 leading-relaxed">
            “{catalystMoment.text}”
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleRelease}
          className="px-3.5 py-2 text-xs font-light text-ink-400 hover:text-ink-700 hover:bg-cream-200/50 rounded-full transition-colors flex items-center space-x-1.5"
          title="Gently release this connection to make space in your constellation"
        >
          <UserMinus className="w-3.5 h-3.5" />
          <span>Gently Release</span>
        </button>

        <button
          type="button"
          onClick={handleOpenThread}
          className="px-5 py-2.5 rounded-full text-xs font-medium text-cream-50 bg-resonance-500 hover:bg-resonance-600 shadow-light-soft hover:shadow-light-glow transition-all flex items-center space-x-2"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Open Slow Thread</span>
        </button>
      </div>
    </div>
  );
};
