import React, { useState, useEffect } from 'react';
import { X, Feather, Sparkles, Clock } from 'lucide-react';
import { MoodType, MOOD_DEFINITIONS } from '../../types';
import { useEcho } from '../../hooks/useEcho';
import { cleanUserInput } from '../../utils/sanitize';

const MAX_CHARS = 180;
const MOOD_KEYS: MoodType[] = [
  'reflective',
  'joyful',
  'uncertain',
  'grateful',
  'restless',
];

export const CastMomentModal: React.FC = () => {
  const { isCastOpen, setIsCastOpen, castMoment, setSelectedMoment } = useEcho();
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType>('reflective');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCastOpen(false);
      }
    };
    if (isCastOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCastOpen, setIsCastOpen]);

  if (!isCastOpen) return null;

  const remainingChars = MAX_CHARS - text.length;
  const isValid = text.trim().length > 0 && remainingChars >= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    const sanitized = cleanUserInput(text, MAX_CHARS);

    // Cast into ambient space
    const newMoment = castMoment(sanitized, selectedMood);

    // Reset and close
    setTimeout(() => {
      setIsSubmitting(false);
      setText('');
      setIsCastOpen(false);
      // Highlight newly cast moment
      setSelectedMoment(newMoment);
    }, 300);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cast-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream-900/20 backdrop-blur-md animate-in fade-in duration-300"
    >
      {/* Click outside to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsCastOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl mx-auto rounded-3xl parchment-glass border border-resonance-300/60 shadow-parchment-elevated p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Soft atmospheric background light */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-resonance-200/40 blur-3xl"
          aria-hidden="true"
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-resonance-100/80 border border-resonance-300/60 flex items-center justify-center text-resonance-700 shadow-sm">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="cast-modal-title"
                className="font-serif text-2xl font-normal text-ink-900 leading-tight"
              >
                Cast into the Stillness
              </h2>
              <p className="text-xs text-ink-500 font-light mt-0.5">
                No audience, no follower counts. Drifts for 24 hours.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCastOpen(false)}
            className="p-1.5 text-ink-400 hover:text-ink-800 hover:bg-resonance-100/60 rounded-full transition-colors"
            aria-label="Close casting modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Moment Input Area */}
          <div>
            <label
              htmlFor="moment-text-input"
              className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-2"
            >
              Your Reflection
            </label>
            <div className="relative rounded-2xl bg-cream-50/80 border border-resonance-300/40 focus-within:border-resonance-500 focus-within:ring-2 focus-within:ring-resonance-200/50 transition-all p-3.5 shadow-inner">
              <textarea
                id="moment-text-input"
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                placeholder="What did you notice in the quiet today? A slant of morning light, an unhurried kindness, a breath held..."
                className="w-full bg-transparent border-0 resize-none font-serif text-lg text-ink-900 placeholder:text-ink-400 placeholder:font-serif placeholder:font-light focus:outline-none leading-relaxed"
                aria-describedby="char-count"
                autoFocus
              />
              <div
                id="char-count"
                className="flex items-center justify-between text-[11px] pt-2 border-t border-resonance-200/40 text-ink-400"
              >
                <span className="italic">
                  Visible to others only through quiet resonance
                </span>
                <span
                  className={`font-mono font-medium ${
                    remainingChars < 20 ? 'text-resonance-700' : 'text-ink-400'
                  }`}
                >
                  {remainingChars} left
                </span>
              </div>
            </div>
          </div>

          {/* Tactile Mood Swatch Picker (Visual, not dropdown) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-2.5">
              Select Mood Resonance
            </label>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
              role="radiogroup"
              aria-label="Select mood resonance"
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
                    onClick={() => setSelectedMood(moodKey)}
                    className={`relative p-3 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between ${
                      isSelected
                        ? 'border-resonance-500 bg-cream-50 shadow-light-soft scale-[1.02]'
                        : 'border-resonance-200/60 bg-cream-50/40 hover:bg-cream-50/80 hover:border-resonance-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-cream-50 shadow-xs"
                        style={{
                          backgroundColor: config.dotColor,
                          boxShadow: isSelected
                            ? `0 0 8px ${config.glowColor}`
                            : 'none',
                        }}
                        aria-hidden="true"
                      />
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-resonance-500" />
                      )}
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-ink-900">
                        {config.label}
                      </span>
                      <span className="block text-[10px] text-ink-500 font-light truncate mt-0.5">
                        {config.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lifespan Horizon Preview Indicator */}
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-resonance-100/40 border border-resonance-200/50 text-xs text-ink-600">
            <Clock className="w-4 h-4 text-resonance-600 shrink-0" />
            <div className="flex-1">
              <span className="font-medium text-ink-800">
                24-Hour Daylight Horizon:
              </span>{' '}
              <span className="font-light">
                This moment will gently fade in opacity as its lifespan matures,
                dissolving naturally with tomorrow's light.
              </span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCastOpen(false)}
              className="px-5 py-2 rounded-full text-xs font-medium text-ink-600 hover:text-ink-900 hover:bg-resonance-100/50 transition-colors"
            >
              Keep Private
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`px-6 py-2.5 rounded-full text-xs font-medium text-cream-50 transition-all flex items-center space-x-2 ${
                isValid && !isSubmitting
                  ? 'bg-resonance-500 hover:bg-resonance-600 shadow-light-soft hover:shadow-light-glow'
                  : 'bg-ink-400/50 cursor-not-allowed text-cream-100/70'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Casting...' : 'Cast into the Sky'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
