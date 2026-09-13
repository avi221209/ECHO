import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Mail, Compass, X } from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { AbstractAvatar } from '../../components/AbstractAvatar';
import { ResonanceGlyph } from '../../components/ResonanceGlyph';
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

  const modalRef = useFocusTrap<HTMLDivElement>(Boolean(mutualMatchEvent));
  const [phase, setPhase] = useState<'converging' | 'synchronized' | 'revealed'>('converging');

  useEffect(() => {
    if (!mutualMatchEvent) {
      setPhase('converging');
      return;
    }

    // Step 1: Pulses converge (0 to 1.2s)
    const t1 = setTimeout(() => {
      setPhase('synchronized');
    }, 1200);

    // Step 2: Harmonized revelation (2.0s+)
    const t2 = setTimeout(() => {
      setPhase('revealed');
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [mutualMatchEvent]);

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

  const handleOpenThread = () => {
    if (!mutualMatchEvent) return;
    setActiveThreadUser(mutualMatchEvent.user);
    setIsSlowThreadsOpen(true);
    dismissMutualMatch();
  };

  const handleGoConstellation = () => {
    onOpenConstellation();
    dismissMutualMatch();
  };

  return (
    <AnimatePresence>
      {mutualMatchEvent && (
        <div
          role="alert"
          aria-modal="true"
          aria-labelledby="mutual-hero-title"
          aria-live="assertive"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream-950/45 backdrop-blur-xl overflow-y-auto"
        >
          {/* Living Resonant Pulse Field across the sky */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            {/* Wave 1: From left */}
            <m.div
              initial={{ x: '-40vw', scale: 0.4, opacity: 0.8 }}
              animate={{ x: 0, scale: [0.6, 1.8, 2.8], opacity: [0.8, 0.4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
              className="w-80 h-80 rounded-full border-2 border-resonance-400/40 bg-resonance-200/10"
            />
            {/* Wave 2: From right */}
            <m.div
              initial={{ x: '40vw', scale: 0.4, opacity: 0.8 }}
              animate={{ x: 0, scale: [0.6, 1.8, 2.8], opacity: [0.8, 0.4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
              className="w-80 h-80 rounded-full border-2 border-resonance-500/40 bg-resonance-100/15"
            />
            {/* Golden ambient center stillness */}
            <div className="absolute w-[650px] h-[650px] rounded-full bg-resonance-100/40 blur-3xl" />
          </div>

          {/* The Hero Revelation Chamber */}
          <m.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl mx-auto rounded-[2.5rem] bg-cream-50/95 border-2 border-resonance-400/80 shadow-2xl p-7 sm:p-12 z-10 text-center overflow-hidden focus:outline-none"
          >
            {/* Dismiss button */}
            <button
              type="button"
              onClick={dismissMutualMatch}
              className="absolute top-6 right-6 p-2 text-ink-500 hover:text-ink-900 hover:bg-resonance-100/80 rounded-full transition-colors z-20 focus-visible:ring-2 focus-visible:ring-resonance-500"
              aria-label="Dismiss mutual reveal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Harmonic Convergence Avatars */}
            <div className="relative flex items-center justify-center my-6 h-28">
              {/* Resonant Connecting Beam */}
              <m.div
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: phase === 'converging' ? 90 : 160,
                  opacity: 1,
                }}
                transition={{ duration: 0.8 }}
                className="absolute h-0.5 bg-gradient-to-r from-resonance-400 via-resonance-500 to-resonance-400"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-resonance-500 animate-ping" />
              </m.div>

              {/* Current User avatar drifting in from left */}
              <m.div
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: phase === 'converging' ? -55 : -48,
                  opacity: 1,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="p-1.5 rounded-full bg-cream-50 shadow-light-soft border-2 border-resonance-300">
                  <AbstractAvatar seed={currentUser.avatarSeed} size={58} glow />
                </div>
                <span className="text-xs font-serif font-medium text-ink-800 mt-2">You</span>
              </m.div>

              {/* Harmonic Center Glyphs */}
              <div className="relative z-20 mx-3">
                <ResonanceGlyph size={28} mutual pulsing={phase !== 'revealed'} />
              </div>

              {/* Connected User avatar drifting in from right */}
              <m.div
                initial={{ x: 100, opacity: 0 }}
                animate={{
                  x: phase === 'converging' ? 55 : 48,
                  opacity: 1,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="p-1.5 rounded-full bg-cream-50 shadow-light-glow border-2 border-resonance-500">
                  <AbstractAvatar seed={mutualMatchEvent.user.avatarSeed} size={58} glow />
                </div>
                <span className="text-xs font-serif font-medium text-ink-800 mt-2">
                  {mutualMatchEvent.user.displayName}
                </span>
              </m.div>
            </div>

            {/* Hero Poetic Revelation Statements */}
            <div className="space-y-2 mb-8">
              <m.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-semibold uppercase tracking-widest text-resonance-800 bg-resonance-100/90 px-3.5 py-1 rounded-full border border-resonance-300/80 inline-block mb-2"
              >
                Mutual Resonance
              </m.span>

              <h2
                id="mutual-hero-title"
                className="font-serif text-3xl sm:text-4xl font-light text-ink-900 leading-tight"
              >
                Something here answered back.
              </h2>

              <p className="font-serif text-lg sm:text-xl text-resonance-800 italic font-normal">
                Your resonance is mutual.
              </p>

              <p className="text-xs sm:text-sm text-ink-600 font-light max-w-md mx-auto leading-relaxed pt-2">
                Neither of you was performing for an audience. In the quiet, you both attuned
                to the same frequency.
              </p>
            </div>

            {/* The Catalyst Thought */}
            <div className="p-5 rounded-2xl bg-cream-100/80 border border-resonance-300/60 shadow-inner text-left mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-resonance-700 block mb-1">
                The Shared Catalyst
              </span>
              <p className="font-serif text-base sm:text-lg italic text-ink-900 leading-relaxed">
                “{mutualMatchEvent.moment.text}”
              </p>
            </div>

            {/* Constellation Progress */}
            <p className="text-xs text-ink-600 font-light mb-8">
              <span className="font-medium text-ink-900">{mutualMatchEvent.user.displayName}</span> is now
              woven into your Constellation Circle ({constellation.length} of {CONSTELLATION_CAP} connections).
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleOpenThread}
                className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-semibold text-cream-50 bg-resonance-500 hover:bg-resonance-600 shadow-light-soft hover:shadow-light-glow transition-all flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-resonance-500"
              >
                <Mail className="w-4 h-4" />
                <span>Send a Slow Letter</span>
              </button>

              <button
                type="button"
                onClick={handleGoConstellation}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-medium text-ink-700 hover:text-ink-900 bg-cream-100 hover:bg-resonance-100/60 rounded-full border border-resonance-300 transition-colors flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-resonance-500"
              >
                <Compass className="w-4 h-4" />
                <span>Follow the Thread in Constellation</span>
              </button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};
