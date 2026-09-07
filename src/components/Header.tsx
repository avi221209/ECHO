import React from 'react';
import { Sparkles, MessageCircle, Feather, Compass, RotateCcw } from 'lucide-react';
import { useEcho } from '../hooks/useEcho';
import { CONSTELLATION_CAP } from '../types';

interface HeaderProps {
  currentView: 'sky' | 'constellation';
  onSelectView: (view: 'sky' | 'constellation') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView }) => {
  const {
    constellation,
    slowMessages,
    currentUser,
    setIsCastOpen,
    setIsSlowThreadsOpen,
    resetToDefaults,
  } = useEcho();

  // Count unread slow messages for current user
  const unreadCount = slowMessages.filter(
    (m) => m.toUserId === currentUser.id && !m.readAt
  ).length;

  return (
    <header className="relative z-30 w-full px-4 sm:px-8 py-4 flex items-center justify-between border-b border-resonance-200/50 backdrop-blur-md bg-cream-100/85 transition-all">
      {/* Brand & Concept Identity */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onSelectView('sky')}
          className="flex items-center space-x-3 text-left group focus:outline-none"
          aria-label="ECHO Home - Go to Sky"
        >
          <div className="w-9 h-9 rounded-full border border-resonance-400/60 flex items-center justify-center bg-cream-50 shadow-sm group-hover:border-resonance-500 transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-resonance-500 animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-normal tracking-tight text-ink-900 leading-none">
                ECHO
              </span>
              <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-resonance-100 text-resonance-800 border border-resonance-200">
                Morning Light
              </span>
            </div>
            <p className="text-[11px] font-medium tracking-wider uppercase text-ink-500 mt-0.5 hidden sm:block">
              Social by Resonance, Not Reach
            </p>
          </div>
        </button>
      </div>

      {/* Main Navigation Views */}
      <nav
        className="flex items-center space-x-1 sm:space-x-2 bg-cream-50/90 p-1 rounded-full border border-resonance-200/60 shadow-sm"
        aria-label="Main Application Views"
      >
        <button
          type="button"
          onClick={() => onSelectView('sky')}
          className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center space-x-1.5 ${
            currentView === 'sky'
              ? 'bg-resonance-500 text-cream-50 shadow-sm'
              : 'text-ink-600 hover:text-ink-900 hover:bg-resonance-100/50'
          }`}
          aria-current={currentView === 'sky' ? 'page' : undefined}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>The Sky</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectView('constellation')}
          className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center space-x-1.5 ${
            currentView === 'constellation'
              ? 'bg-resonance-500 text-cream-50 shadow-sm'
              : 'text-ink-600 hover:text-ink-900 hover:bg-resonance-100/50'
          }`}
          aria-current={currentView === 'constellation' ? 'page' : undefined}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Constellation</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ml-1 ${
              currentView === 'constellation'
                ? 'bg-resonance-600 text-cream-50'
                : 'bg-resonance-100 text-resonance-800'
            }`}
          >
            {constellation.length}/{CONSTELLATION_CAP}
          </span>
        </button>
      </nav>

      {/* Actions: Slow Threads, Cast Moment & Reset */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Slow Threads trigger */}
        <button
          type="button"
          onClick={() => setIsSlowThreadsOpen(true)}
          className="relative p-2.5 rounded-full text-ink-700 hover:text-ink-900 bg-cream-50 hover:bg-resonance-100/60 border border-resonance-200/70 transition-all shadow-sm"
          aria-label={`Slow Threads Ephemeral Messaging${
            unreadCount > 0 ? `, ${unreadCount} unread message` : ''
          }`}
          title="Slow Threads (Ephemeral Letters)"
        >
          <MessageCircle className="w-4 h-4" />
          {unreadCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-resonance-500 rounded-full border-2 border-cream-100 animate-pulse"
              aria-hidden="true"
            />
          )}
        </button>

        {/* Reset mock data helper */}
        <button
          type="button"
          onClick={resetToDefaults}
          className="p-2.5 rounded-full text-ink-400 hover:text-ink-700 hover:bg-resonance-100/50 transition-colors hidden md:block"
          aria-label="Reset simulation to default state"
          title="Reset simulation to defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Cast a Moment Primary Button */}
        <button
          type="button"
          onClick={() => setIsCastOpen(true)}
          className="px-4 py-2 rounded-full text-xs font-medium text-cream-50 bg-resonance-500 hover:bg-resonance-600 shadow-light-soft hover:shadow-light-glow transition-all flex items-center space-x-2"
          aria-label="Cast a Moment into the Sky"
        >
          <Feather className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cast a Moment</span>
          <span className="sm:hidden">Cast</span>
        </button>
      </div>
    </header>
  );
};
