import React, { useEffect } from 'react';
import { Sparkles, Compass, Feather, Shield, X } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manifesto-modal-title"
      className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream-950/40 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-xl bg-cream-50 rounded-[2.5rem] border-2 border-resonance-400/80 shadow-2xl p-6 sm:p-9 text-ink-900 focus:outline-none max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-resonance-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-resonance-100 flex items-center justify-center border border-resonance-300">
              <Sparkles className="w-3.5 h-3.5 text-resonance-700" />
            </div>
            <div>
              <h2 id="manifesto-modal-title" className="font-serif text-xl font-medium leading-none">
                ECHO: Reimagined Social Model
              </h2>
              <p className="text-[11px] font-mono text-resonance-800 uppercase tracking-widest mt-1">
                Official Challenge Alignment
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-ink-500 hover:text-ink-900 rounded-full hover:bg-resonance-100 transition-colors"
            aria-label="Close philosophy guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-xs sm:text-sm text-ink-700 font-light leading-relaxed">
          <div className="p-4 rounded-2xl bg-resonance-100/70 border border-resonance-300/80">
            <h3 className="font-serif text-base font-medium text-ink-900 flex items-center space-x-2 mb-1">
              <Compass className="w-4 h-4 text-resonance-700" />
              <span>1. What is ECHO?</span>
            </h3>
            <p>
              ECHO is an ambient spatial social field where human thoughts drift as light motes in stillness. There are no feeds, algorithms, follower counts, or public like metrics.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cream-100 border border-resonance-200">
            <h3 className="font-serif text-base font-medium text-ink-900 flex items-center space-x-2 mb-1">
              <Feather className="w-4 h-4 text-resonance-700" />
              <span>2. What do I do here?</span>
            </h3>
            <p>
              Drift through <strong>The Sky</strong> to listen to quiet moments. Cast your own authentic thought into the light, or explore your <strong>Constellation</strong> of living relationship threads.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cream-100 border border-resonance-200">
            <h3 className="font-serif text-base font-medium text-ink-900 flex items-center space-x-2 mb-1">
              <Sparkles className="w-4 h-4 text-resonance-700" />
              <span>3. How do I interact with another person?</span>
            </h3>
            <p>
              Hover or tap a light mote to attune. Click <em>“Resonate quietly”</em> to send a private signal. If both souls attune to each other, a <strong>Mutual Resonance Hero Moment</strong> reveals your connection and weaves a living thread into your Constellation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cream-100 border border-resonance-200">
            <h3 className="font-serif text-base font-medium text-ink-900 flex items-center space-x-2 mb-1">
              <Shield className="w-4 h-4 text-resonance-700" />
              <span>4. What makes this different from a normal social network?</span>
            </h3>
            <p>
              <strong>Depth over reach</strong>. Your Constellation Circle is hard-capped at 15 connections (<em>“Depth has a boundary”</em>). Communication happens through slow, dissolving paper letters (<em>Slow Threads</em>) rather than instant noise.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-resonance-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-cream-50 bg-resonance-500 hover:bg-resonance-600 shadow-sm transition-all"
          >
            Experience ECHO
          </button>
        </div>
      </div>
    </div>
  );
};
