import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Feather, Clock } from 'lucide-react';
import { MoodType, MOOD_DEFINITIONS } from '../../types';
import { useEcho } from '../../hooks/useEcho';
import { cleanUserInput } from '../../utils/sanitize';
import { ResonanceGlyph } from '../../components/ResonanceGlyph';

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
  const [isReleasing, setIsReleasing] = useState(false);

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

  const moodConfig = MOOD_DEFINITIONS[selectedMood];
  const remainingChars = MAX_CHARS - text.length;
  const isValid = text.trim().length > 0 && remainingChars >= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isReleasing) return;

    // Trigger physical release sequence
    setIsReleasing(true);
    const sanitized = cleanUserInput(text, MAX_CHARS);

    // Sequence: Lift -> Compress into luminous signal -> Release into Sky -> Settle
    setTimeout(() => {
      const newMoment = castMoment(sanitized, selectedMood);

      setTimeout(() => {
        setIsReleasing(false);
        setText('');
        setIsCastOpen(false);
        setSelectedMoment(newMoment);
      }, 700);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cast-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cream-950/35 backdrop-blur-lg animate-in fade-in duration-300"
    >
      {/* Dynamic ambient backdrop inheriting the selected mood's hue */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700 overflow-hidden"
        style={{
          background: `radial-gradient(circle at center, ${moodConfig.glowColor} 0%, transparent 65%)`,
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Click outside to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => !isReleasing && setIsCastOpen(false)}
        aria-hidden="true"
      />

      {/* The Physical Composition Sheet */}
      <AnimatePresence>
        <motion.div
          animate={
            isReleasing
              ? {
                  scale: [1, 0.85, 0.12],
                  y: [0, -60, -280],
                  opacity: [1, 0.9, 0],
                  borderRadius: ['28px', '40px', '9999px'],
                  filter: ['blur(0px)', 'blur(1px)', 'blur(4px)'],
                }
              : { scale: 1, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl mx-auto rounded-[2rem] bg-cream-50/95 border-2 border-resonance-400/70 shadow-2xl p-7 sm:p-10 z-10 overflow-hidden"
        >
          {/* Luminous release particle beacon */}
          {isReleasing && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 2.5, 4], opacity: [0.9, 0.5, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-resonance-400 blur-xl pointer-events-none"
            />
          )}

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border transition-colors duration-500"
                style={{
                  backgroundColor: moodConfig.bgLight,
                  borderColor: moodConfig.color,
                  color: moodConfig.dotColor,
                }}
              >
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <h2
                  id="cast-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-light text-ink-900 leading-tight"
                >
                  Cast a Thought
                </h2>
                <p className="text-xs text-ink-600 font-light mt-0.5">
                  Released into the room. Invisible unless someone resonates.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCastOpen(false)}
              disabled={isReleasing}
              className="p-2 text-ink-500 hover:text-ink-900 hover:bg-resonance-100/80 rounded-full transition-colors"
              aria-label="Close casting window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thought Texture Container */}
            <div>
              <label
                htmlFor="moment-text-input"
                className="block text-xs font-semibold uppercase tracking-wider text-ink-700 mb-2"
              >
                Words to Release
              </label>
              <div className="relative rounded-2xl bg-cream-100/90 border border-resonance-300/60 focus-within:border-resonance-500 focus-within:ring-2 focus-within:ring-resonance-200/50 p-4 transition-all shadow-inner">
                <textarea
                  id="moment-text-input"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                  placeholder="What became visible in your quiet today? A slant of morning light, a hesitation, an unhurried grace..."
                  className="w-full bg-transparent border-0 resize-none font-serif text-xl sm:text-2xl text-ink-900 placeholder:text-ink-400 placeholder:font-light focus:outline-none leading-relaxed"
                  aria-describedby="char-count"
                  autoFocus
                  disabled={isReleasing}
                />
                <div
                  id="char-count"
                  className="flex items-center justify-between text-xs pt-3 border-t border-resonance-200/50 text-ink-500"
                >
                  <span className="italic font-light">
                    Drifts as an ambient light for 24 hours
                  </span>
                  <span
                    className={`font-mono font-medium ${
                      remainingChars < 20 ? 'text-resonance-800' : 'text-ink-600'
                    }`}
                  >
                    {remainingChars} left
                  </span>
                </div>
              </div>
            </div>

            {/* Tactile Mood Field Swatches */}
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
                      onClick={() => setSelectedMood(moodKey)}
                      disabled={isReleasing}
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
                            boxShadow: isSelected
                              ? `0 0 10px ${config.glowColor}`
                              : 'none',
                          }}
                          aria-hidden="true"
                        />
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-resonance-500" />
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

            {/* Natural Lifespan Horizon */}
            <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-resonance-100/50 border border-resonance-300/60 text-xs text-ink-700">
              <Clock className="w-4 h-4 text-resonance-700 shrink-0" />
              <div>
                <span className="font-semibold text-ink-900">
                  Daylight Horizon:
                </span>{' '}
                <span className="font-light">
                  This thought will gently wane in opacity and dissolve back into silence
                  tomorrow morning.
                </span>
              </div>
            </div>

            {/* Release Actions */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCastOpen(false)}
                disabled={isReleasing}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-ink-700 hover:text-ink-900 hover:bg-resonance-100/60 transition-colors"
              >
                Keep Silent
              </button>

              <button
                type="submit"
                disabled={!isValid || isReleasing}
                className={`px-7 py-3 rounded-full text-xs font-semibold text-cream-50 transition-all duration-300 flex items-center space-x-2.5 ${
                  isValid && !isReleasing
                    ? 'bg-resonance-500 hover:bg-resonance-600 shadow-light-soft hover:shadow-light-glow scale-100 hover:scale-105'
                    : 'bg-ink-400/50 cursor-not-allowed text-cream-100/70'
                }`}
              >
                <ResonanceGlyph size={14} />
                <span>{isReleasing ? 'Releasing...' : 'Release into the Sky'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
