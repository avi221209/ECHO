import React from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { useEcho } from '../hooks/useEcho';

interface HeaderProps {
  currentView: 'sky' | 'constellation';
  onSelectView: (view: 'sky' | 'constellation') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView }) => {
  const { constellation } = useEcho();

  return (
    <header className="relative z-30 w-full px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-none">
      {/* Top Left: Minimal ECHO Wordmark */}
      <div className="pointer-events-auto flex items-center space-x-3.5">
        <button
          type="button"
          onClick={() => onSelectView('sky')}
          className="flex items-center space-x-3 text-left group focus:outline-none"
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
            <Compass className="w-3 h-3 text-resonance-600" />
            <span className="font-medium text-ink-800">The Sky</span>
            <span className="text-resonance-400">·</span>
            <span className="text-ink-500 font-light">Living Light Field</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3 h-3 text-resonance-600" />
            <span className="font-medium text-ink-800">Constellation</span>
            <span className="text-resonance-400">·</span>
            <span className="text-ink-500 font-light">
              {constellation.length} Living Relationship Threads
            </span>
          </>
        )}
      </div>

      {/* Top Right: Ambient Philosophy Whisper */}
      <div className="pointer-events-auto text-right">
        <p className="text-[11px] font-serif italic text-ink-500 hidden sm:block">
          “Social should feel discovered, not consumed.”
        </p>
      </div>
    </header>
  );
};
