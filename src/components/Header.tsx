import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Volume2, VolumeX, HelpCircle, X, Feather, Shield } from 'lucide-react';
import { useEcho } from '../hooks/useEcho';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface HeaderProps {
  currentView: 'sky' | 'constellation';
  onSelectView: (view: 'sky' | 'constellation') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView }) => {
  const { constellation, audioMuted, toggleAudio } = useEcho();
  const [showManifesto, setShowManifesto] = useState(false);
  const modalRef = useFocusTrap<HTMLDivElement>(showManifesto);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showManifesto) {
        setShowManifesto(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showManifesto]);

  return (
    <header className="relative z-30 w-full px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-none">
      {/* Top Left: Minimal ECHO Wordmark */}
      <div className="pointer-events-auto flex items-center space-x-3.5">
        <button
          type="button"
          onClick={() => onSelectView('sky')}
          className="flex items-center space-x-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-resonance-500 rounded-lg p-0.5"
          aria-label="ECHO Home - The Ambient Sky"
        >
          <div className="w-8 h-8 rounded-full border border-resonance-400/50 flex items-center justify-center bg-cream-50/90 shadow-sm group-hover:border-resonance-500 transition-colors">
            <span className="w-2 h-2 rounded-full bg-resonance-500 animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <h1 className="font-serif text-2xl font-light tracking-tight text-ink-900 leading-none">
                ECHO
              </h1>
              <span className="text-[10px] font-medium tracking-widest uppercase text-ink-500">
                Resonance
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Top Center: Contextual Mode Indicator */}
      <div className="pointer-events-auto hidden md:flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cream-50/80 border border-resonance-300/40 shadow-xs backdrop-blur-md text-xs text-ink-700">
        {currentView === 'sky' ? (
          <>
            <Compass className="w-3.5 h-3.5 text-resonance-600" />
            <span className="font-medium text-ink-800">The Sky</span>
            <span className="text-resonance-400">·</span>
            <span className="text-ink-500 font-light">Ambient Spatial Field</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-resonance-600" />
            <span className="font-medium text-ink-800">Constellation</span>
            <span className="text-resonance-400">·</span>
            <span className="text-ink-500 font-light">
              {constellation.length} Living Connections
            </span>
          </>
        )}
      </div>

      {/* Top Right: Manifesto / Sound Toggle & Quote */}
      <div className="pointer-events-auto flex items-center space-x-2.5 sm:space-x-3 text-right">
        {/* What is ECHO? Manifesto Trigger */}
        <button
          type="button"
          onClick={() => setShowManifesto(true)}
          className="px-2.5 py-1.5 rounded-full bg-resonance-100/80 hover:bg-resonance-200/90 text-resonance-900 border border-resonance-300 shadow-xs transition-all flex items-center space-x-1.5 text-xs font-medium focus-visible:ring-2 focus-visible:ring-resonance-500"
          aria-label="What is ECHO? Read project manifesto and mechanics"
          title="What is ECHO? (30-Second Guide)"
        >
          <HelpCircle className="w-3.5 h-3.5 text-resonance-700" />
          <span className="hidden xs:inline">What is ECHO?</span>
        </button>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={toggleAudio}
          className="p-1.5 px-2.5 rounded-full bg-cream-50/80 hover:bg-cream-100 text-ink-600 hover:text-ink-900 border border-resonance-300/60 shadow-xs transition-colors flex items-center space-x-1.5 text-xs focus-visible:ring-2 focus-visible:ring-resonance-500"
          aria-label={audioMuted ? 'Unmute ambient harmonic audio' : 'Mute ambient harmonic audio'}
          title={audioMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {audioMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-ink-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-resonance-600" />
          )}
          <span className="hidden sm:inline font-light text-[11px]">
            {audioMuted ? 'Muted' : 'Sound On'}
          </span>
        </button>

        <p className="text-[11px] font-serif italic text-ink-500 hidden lg:block">
          “Social should feel discovered, not consumed.”
        </p>
      </div>

      {/* Manifesto / 30-Second Judge Philosophy Modal */}
      {showManifesto && (
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
                onClick={() => setShowManifesto(false)}
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
                onClick={() => setShowManifesto(false)}
                className="px-6 py-2.5 rounded-full text-xs font-semibold text-cream-50 bg-resonance-500 hover:bg-resonance-600 shadow-sm transition-all"
              >
                Experience ECHO
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

