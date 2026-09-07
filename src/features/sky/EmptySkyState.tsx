import React from 'react';
import { Sun, Plus } from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';

interface EmptySkyStateProps {
  onCastClick: () => void;
}

export const EmptySkyState: React.FC<EmptySkyStateProps> = ({ onCastClick }) => {
  const { activeMoodFilter, setActiveMoodFilter } = useEcho();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-auto">
      <div className="w-20 h-20 rounded-full bg-resonance-100/60 border border-resonance-300/40 flex items-center justify-center mb-6 shadow-light-soft animate-pulse-subtle">
        <Sun className="w-9 h-9 text-resonance-600 stroke-[1.5]" />
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl font-light text-ink-900 mb-2">
        {activeMoodFilter === 'all'
          ? 'The morning sky is clear and still'
          : `No moments currently adrift in ${activeMoodFilter}`}
      </h3>

      <p className="text-sm text-ink-600 max-w-md font-light leading-relaxed mb-6">
        {activeMoodFilter === 'all'
          ? 'Quiet holds this space. Cast the first moment of reflection into the daylight.'
          : 'Switch back to all spectrum moods or cast a moment to anchor this mood.'}
      </p>

      <div className="flex items-center space-x-3">
        {activeMoodFilter !== 'all' && (
          <button
            type="button"
            onClick={() => setActiveMoodFilter('all')}
            className="px-4 py-2 text-xs font-medium text-ink-700 bg-cream-50 hover:bg-resonance-100 rounded-full border border-resonance-200 transition-colors"
          >
            Show All Spectrum
          </button>
        )}
        <button
          type="button"
          onClick={onCastClick}
          className="px-5 py-2.5 text-xs font-medium text-cream-50 bg-resonance-500 hover:bg-resonance-600 rounded-full shadow-light-soft hover:shadow-light-glow transition-all flex items-center space-x-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Cast a Moment</span>
        </button>
      </div>
    </div>
  );
};
