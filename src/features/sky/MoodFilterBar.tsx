import React from 'react';
import { MoodType, MOOD_DEFINITIONS } from '../../types';
import { useEcho } from '../../hooks/useEcho';

const MOODS: (MoodType | 'all')[] = [
  'all',
  'reflective',
  'joyful',
  'uncertain',
  'grateful',
  'restless',
];

export const MoodFilterBar: React.FC = () => {
  const { activeMoodFilter, setActiveMoodFilter } = useEcho();

  return (
    <nav
      className="relative z-20 flex items-center justify-center px-4 py-2"
      aria-label="Filter moments by mood spectrum"
    >
      <div className="flex items-center space-x-1.5 p-1 rounded-full bg-cream-50/80 backdrop-blur-md border border-resonance-200/50 shadow-sm overflow-x-auto max-w-full">
        {MOODS.map((mood) => {
          const isActive = activeMoodFilter === mood;
          const label =
            mood === 'all' ? 'All Spectrum' : MOOD_DEFINITIONS[mood].label;
          const moodConfig = mood !== 'all' ? MOOD_DEFINITIONS[mood] : null;

          return (
            <button
              key={mood}
              type="button"
              onClick={() => setActiveMoodFilter(mood)}
              className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-300 flex items-center space-x-1.5 whitespace-nowrap ${
                isActive
                  ? 'bg-resonance-500 text-cream-50 shadow-sm'
                  : 'text-ink-600 hover:text-ink-900 hover:bg-resonance-100/50'
              }`}
              aria-pressed={isActive}
            >
              {moodConfig && (
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{
                    backgroundColor: isActive ? '#FAF6EF' : moodConfig.dotColor,
                  }}
                  aria-hidden="true"
                />
              )}
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
