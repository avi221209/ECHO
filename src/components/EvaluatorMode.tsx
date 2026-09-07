import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  Users,
  Clock,
  Zap,
  X,
  EyeOff,
  Sliders,
} from 'lucide-react';
import { useEcho } from '../hooks/useEcho';
import { useFocusTrap } from '../hooks/useFocusTrap';

export const EvaluatorMode: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);
  const {
    resetToDefaults,
    fillConstellationToCap,
    triggerMutualRevealDemo,
    constellation,
    sendSlowMessage,
    markMessageRead,
    setIsSlowThreadsOpen,
  } = useEcho();

  // Keyboard shortcut: Ctrl + Shift + E or Cmd + Shift + E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-3 right-3 z-40 p-1.5 rounded-full bg-cream-50/50 hover:bg-cream-100 text-ink-400 hover:text-ink-700 border border-resonance-200/40 text-[10px] opacity-40 hover:opacity-100 transition-all flex items-center space-x-1"
        aria-label="Toggle Evaluator Mode (Ctrl+Shift+E)"
        title="Evaluator Suite (Ctrl+Shift+E)"
      >
        <Sliders className="w-3 h-3 text-resonance-600" />
        <span className="hidden sm:inline font-mono">⌘⇧E</span>
      </button>
    );
  }

  // Quick action: Fill constellation to 15 cleanly via context
  const handleFillConstellation = () => {
    fillConstellationToCap();
    setIsOpen(false);
  };

  // Quick action: trigger the mutual match reveal instantly via context
  const handleTriggerMutualReveal = () => {
    triggerMutualRevealDemo();
    setIsOpen(false);
  };

  // Quick action: create an expiring thread for demonstration
  const handleCreateExpiringThread = () => {
    if (constellation.length > 0) {
      const friend = constellation[0].user;
      const msg = sendSlowMessage(
        friend.id,
        'This letter is dissolving into quiet mist. Notice how the ink softens with each passing second.'
      );
      if (msg) {
        markMessageRead(msg.id);
      }
    }
    setIsSlowThreadsOpen(true);
    setIsOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evaluator-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream-950/40 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-cream-50 rounded-3xl border-2 border-resonance-400/80 shadow-2xl p-6 text-ink-900 focus:outline-none"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between pb-3 border-b border-resonance-200">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-resonance-600" />
            <h3 id="evaluator-modal-title" className="font-serif text-lg font-medium">
              Evaluator Quick Suite
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 text-ink-400 hover:text-ink-800 rounded-full"
            aria-label="Close Evaluator Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-ink-600 font-light mt-2 mb-4 leading-relaxed">
          Convenience tools for judges to test deep interaction states instantly without manual setup. (Toggle via <kbd className="px-1.5 py-0.5 rounded bg-cream-200 font-mono text-[10px]">Ctrl+Shift+E</kbd>).
        </p>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleTriggerMutualReveal}
            className="w-full p-2.5 rounded-xl bg-resonance-100/80 hover:bg-resonance-200/90 text-resonance-900 border border-resonance-300 text-xs font-medium flex items-center space-x-2.5 transition-colors text-left"
          >
            <Zap className="w-4 h-4 text-resonance-700 shrink-0" />
            <div>
              <span className="block font-semibold">Trigger Mutual Resonance Reveal</span>
              <span className="block text-[10px] text-resonance-800 font-light">
                Fires the 2-4s synchronized pulse &amp; harmonic chime with Elena Vance
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleFillConstellation}
            className="w-full p-2.5 rounded-xl bg-cream-100 hover:bg-resonance-100/60 text-ink-800 border border-resonance-200 text-xs font-medium flex items-center space-x-2.5 transition-colors text-left"
          >
            <Users className="w-4 h-4 text-resonance-600 shrink-0" />
            <div>
              <span className="block font-semibold">Simulate Full Constellation (15/15)</span>
              <span className="block text-[10px] text-ink-500 font-light">
                Inspects the intentional "Depth has a boundary" completion state
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleCreateExpiringThread}
            className="w-full p-2.5 rounded-xl bg-cream-100 hover:bg-resonance-100/60 text-ink-800 border border-resonance-200 text-xs font-medium flex items-center space-x-2.5 transition-colors text-left"
          >
            <Clock className="w-4 h-4 text-resonance-600 shrink-0" />
            <div>
              <span className="block font-semibold">Trigger Dissolving Letter Demo</span>
              <span className="block text-[10px] text-ink-500 font-light">
                Opens an active Slow Thread letter in its final dissolution state
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              resetToDefaults();
              setIsOpen(false);
            }}
            className="w-full p-2.5 rounded-xl bg-cream-100 hover:bg-rose-50 text-ink-700 hover:text-rose-800 border border-resonance-200 text-xs font-medium flex items-center space-x-2.5 transition-colors text-left"
          >
            <RotateCcw className="w-4 h-4 text-ink-500 shrink-0" />
            <div>
              <span className="block font-semibold">Reset to Seed Prototype State</span>
              <span className="block text-[10px] text-ink-500 font-light">
                Clears localStorage and restores initial 25 moments &amp; seed connections
              </span>
            </div>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-resonance-200 flex items-center justify-between text-[11px] text-ink-500">
          <span className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-resonance-600" />
            <span>Hidden from regular users</span>
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-xs font-medium text-resonance-800 hover:underline flex items-center space-x-1"
          >
            <EyeOff className="w-3 h-3" />
            <span>Dismiss</span>
          </button>
        </div>
      </div>
    </div>
  );
};
