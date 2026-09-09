import React from 'react';
import { Compass, Sparkles, Feather, Mail } from 'lucide-react';
import { useEcho } from '../hooks/useEcho';
import { CONSTELLATION_CAP } from '../types';

interface NavigationDockProps {
  currentView: 'sky' | 'constellation';
  onSelectView: (view: 'sky' | 'constellation') => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = React.memo(({
  currentView,
  onSelectView,
}) => {
  const {
    constellation,
    slowMessages,
    currentUser,
    setIsCastOpen,
    setIsSlowThreadsOpen,
  } = useEcho();

  // Unread messages count
  const unreadCount = slowMessages.filter(
    (m) => m.toUserId === currentUser.id && !m.readAt
  ).length;

  return (
    <nav
      aria-label="Atmospheric Environmental Navigation"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full parchment-glass border border-resonance-300/80 shadow-parchment-elevated backdrop-blur-xl flex items-center space-x-1.5 sm:space-x-3 transition-all duration-300 max-w-[96vw] overflow-x-auto shrink-0"
    >
      {/* View: The Sky */}
      <button
        type="button"
        onClick={() => onSelectView('sky')}
        className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center space-x-2 ${
          currentView === 'sky'
            ? 'bg-resonance-500 text-cream-50 shadow-sm scale-105'
            : 'text-ink-700 hover:text-ink-900 hover:bg-resonance-100/60'
        }`}
        aria-current={currentView === 'sky' ? 'page' : undefined}
      >
        <Compass className="w-3.5 h-3.5" />
        <span className="tracking-wide">The Sky</span>
      </button>

      {/* View: Constellation */}
      <button
        type="button"
        onClick={() => onSelectView('constellation')}
        className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center space-x-2 ${
          currentView === 'constellation'
            ? 'bg-resonance-500 text-cream-50 shadow-sm scale-105'
            : 'text-ink-700 hover:text-ink-900 hover:bg-resonance-100/60'
        }`}
        aria-current={currentView === 'constellation' ? 'page' : undefined}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span className="tracking-wide">Constellation</span>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
            currentView === 'constellation'
              ? 'bg-resonance-600 text-cream-50'
              : 'bg-resonance-100 text-resonance-900'
          }`}
        >
          {constellation.length}/{CONSTELLATION_CAP}
        </span>
      </button>

      {/* View: Slow Threads (Ephemeral Paper Letters) */}
      <button
        type="button"
        onClick={() => setIsSlowThreadsOpen(true)}
        className="relative px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium text-ink-700 hover:text-ink-900 hover:bg-resonance-100/60 transition-all flex items-center space-x-2"
        aria-label={`Open Slow Threads${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
      >
        <Mail className="w-3.5 h-3.5" />
        <span className="tracking-wide">Slow Threads</span>
        {unreadCount > 0 && (
          <span
            className="w-2 h-2 rounded-full bg-resonance-500 animate-ping absolute top-1.5 right-2"
            aria-hidden="true"
          />
        )}
      </button>

      {/* Vertical subtle divider */}
      <div className="h-5 w-px bg-resonance-300/50" aria-hidden="true" />

      {/* Primary Cast Action */}
      <button
        type="button"
        onClick={() => setIsCastOpen(true)}
        className="px-4 py-2 rounded-full text-xs font-semibold text-cream-50 bg-resonance-500 hover:bg-resonance-600 shadow-light-soft hover:shadow-light-glow transition-all flex items-center space-x-1.5 group"
        aria-label="Cast a Moment into the stillness"
      >
        <Feather className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        <span>Cast</span>
      </button>
    </nav>
  );
});

NavigationDock.displayName = 'NavigationDock';
