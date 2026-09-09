import React, { useState } from 'react';
import { Sparkles, Compass, Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { useEcho } from '../hooks/useEcho';
import { ManifestoModal } from './ManifestoModal';

interface HeaderProps {
  currentView: 'sky' | 'constellation';
  onSelectView: (view: 'sky' | 'constellation') => void;
}

export const Header: React.FC<HeaderProps> = React.memo(({ currentView, onSelectView }) => {
  const { constellation, audioMuted, toggleAudio, isManifestoOpen, setIsManifestoOpen } = useEcho();
  const [localShowManifesto, setLocalShowManifesto] = useState(false);

  const showManifesto = Boolean(isManifestoOpen || localShowManifesto);

  const handleOpenManifesto = () => {
    if (setIsManifestoOpen) {
      setIsManifestoOpen(true);
    } else {
      setLocalShowManifesto(true);
    }
  };

  const handleCloseManifesto = () => {
    if (setIsManifestoOpen) {
      setIsManifestoOpen(false);
    }
    setLocalShowManifesto(false);
  };

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
          onClick={handleOpenManifesto}
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

      {/* Extracted Manifesto Modal Component */}
      <ManifestoModal isOpen={showManifesto} onClose={handleCloseManifesto} />
    </header>
  );
});

Header.displayName = 'Header';
