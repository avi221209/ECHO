import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, Compass, X } from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { CONSTELLATION_CAP } from '../../types';

interface MutualRevealModalProps {
  onOpenConstellation: () => void;
}

export const MutualRevealModal: React.FC<MutualRevealModalProps> = ({
  onOpenConstellation,
}) => {
  const {
    mutualMatchEvent,
    dismissMutualMatch,
    currentUser,
    constellation,
    setActiveThreadUser,
    setIsSlowThreadsOpen,
  } = useEcho();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismissMutualMatch();
      }
    };
    if (mutualMatchEvent) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mutualMatchEvent, dismissMutualMatch]);

  if (!mutualMatchEvent) return null;

  const { moment, user } = mutualMatchEvent;

  const handleOpenThread = () => {
    setActiveThreadUser(user);
    setIsSlowThreadsOpen(true);
    dismissMutualMatch();
  };

  const handleGoConstellation = () => {
    onOpenConstellation();
    dismissMutualMatch();
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mutual-reveal-title"
        aria-live="polite"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream-950/30 backdrop-blur-md overflow-y-auto"
      >
        {/* Luminous expanding ripple rings */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: [0.2, 1.8, 3.2], opacity: [0.7, 0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
            className="w-96 h-96 rounded-full border border-resonance-400/40 bg-resonance-200/10"
          />
          <motion.div
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: [0.2, 1.8, 3.2], opacity: [0.7, 0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
            className="w-96 h-96 rounded-full border border-resonance-500/30 bg-resonance-100/15"
          />
          <div className="absolute w-[600px] h-[600px] rounded-full bg-resonance-100/50 blur-3xl" />
        </div>

        {/* Modal Card Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl mx-auto rounded-3xl parchment-glass border-2 border-resonance-400/70 shadow-2xl p-6 sm:p-10 z-10 text-center overflow-hidden"
        >
          {/* Dismiss button */}
          <button
            type="button"
            onClick={dismissMutualMatch}
            className="absolute top-5 right-5 p-2 text-ink-400 hover:text-ink-800 hover:bg-resonance-100/60 rounded-full transition-colors z-20"
            aria-label="Dismiss mutual match reveal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Reveal Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-resonance-100 text-resonance-800 border border-resonance-300/80 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-resonance-600" />
            <span>Mutual Resonance Unveiled</span>
          </motion.div>

          {/* Harmonizing Avatars Alignment */}
          <div className="relative flex items-center justify-center my-6">
            {/* Ambient connecting resonant thread */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 140, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="absolute h-0.5 bg-gradient-to-r from-resonance-400 via-resonance-500 to-resonance-400 shadow-sm"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-resonance-500 animate-ping" />
            </motion.div>

            {/* Current User avatar drifting in from left */}
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: -45, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="p-1 rounded-full bg-cream-50 shadow-light-soft border-2 border-resonance-300">
                <AbstractAvatar seed={currentUser.avatarSeed} size={58} glow />
              </div>
              <span className="text-xs font-medium text-ink-800 mt-2">You</span>
            </motion.div>

            {/* Connected User avatar drifting in from right */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 45, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="p-1 rounded-full bg-cream-50 shadow-light-glow border-2 border-resonance-500">
                <AbstractAvatar seed={user.avatarSeed} size={58} glow />
              </div>
              <span className="text-xs font-medium text-ink-800 mt-2">
                {user.displayName}
              </span>
            </motion.div>
          </div>

          {/* Emotional Statement */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 mb-6"
          >
            <h2
              id="mutual-reveal-title"
              className="font-serif text-3xl sm:text-4xl font-light text-ink-900 leading-tight"
            >
              Two quiet paths aligned.
            </h2>
            <p className="text-sm sm:text-base text-ink-600 font-light max-w-md mx-auto leading-relaxed">
              Neither of you knew until now. In a world of broadcasts, you found each other
              through unspoken resonance.
            </p>
          </motion.div>

          {/* The Catalyst Moment Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="p-4 sm:p-5 rounded-2xl bg-cream-50/90 border border-resonance-300/60 shadow-inner text-left mb-6"
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest text-resonance-700 block mb-1">
              Resonated Moment
            </span>
            <p className="font-serif text-base sm:text-lg italic text-ink-800 leading-snug">
              “{moment.text}”
            </p>
          </motion.div>

          {/* Constellation Cap Progress & Status */}
          <div className="text-xs text-ink-500 mb-8">
            <span className="font-medium text-resonance-800">{user.displayName}</span> is now
            woven into your Constellation (
            <span className="font-semibold text-ink-900">
              {constellation.length} of {CONSTELLATION_CAP} connections
            </span>
            ).
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={handleOpenThread}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-medium text-cream-50 bg-resonance-500 hover:bg-resonance-600 shadow-light-soft hover:shadow-light-glow transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send a Slow Letter</span>
            </button>

            <button
              type="button"
              onClick={handleGoConstellation}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-medium text-ink-700 hover:text-ink-900 bg-cream-50 hover:bg-resonance-100 rounded-full border border-resonance-300/80 transition-colors flex items-center justify-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>View in Constellation</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
