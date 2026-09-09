import React from 'react';
import { MoodType, MOOD_DEFINITIONS } from '../../types';

const MOOD_KEYS: MoodType[] = [
  'reflective',
  'joyful',
  'uncertain',
  'grateful',
  'restless',
];

interface MoodSwatchSelectorProps {
  selectedMood: MoodType;
  onSelectMood: (mood: MoodType) => void;
  disabled?: boolean;
}

export const MoodSwatchSelector: React.FC<MoodSwatchSelectorProps> = React.memo(({
  selectedMood,
  onSelectMood,
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-2.5">
        Resonant Mood Field
      </label>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
        role="radiogroup"
        aria-label="Select resonant mood field"
      >
        {MOOD_KEYS.map((moodKey) => {
          const config = MOOD_DEFINITIONS[moodKey];
          const isSelected = selectedMood === moodKey;

          return (
            <button
              key={moodKey}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectMood(moodKey)}
              disabled={disabled}
              className={`relative p-3 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                isSelected
                  ? 'border-resonance-500 bg-cream-50 shadow-light-soft scale-[1.03]'
                  : 'border-resonance-200/80 bg-cream-100/50 hover:bg-cream-100 hover:border-resonance-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-xs"
                  style={{
                    backgroundColor: config.dotColor,
                    boxShadow: isSelected ? `0 0 10px ${config.glowColor}` : 'none',
                  }}
                  aria-hidden="true"
                />
                {isSelected && <span className="w-2 h-2 rounded-full bg-resonance-500" />}
              </div>
              <div>
                <span className="block text-xs font-medium text-ink-900">{config.label}</span>
                <span className="block text-[10px] text-ink-500 font-light truncate mt-0.5">
                  {config.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

MoodSwatchSelector.displayName = 'MoodSwatchSelector';
