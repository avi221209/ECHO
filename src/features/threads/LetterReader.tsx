import React from 'react';
import { Feather, Eye } from 'lucide-react';
import { SlowMessage, User } from '../../types';

interface LetterReaderProps {
  currentThreadLetters: SlowMessage[];
  currentUser: User;
  onUnfoldLetter: (msgId: string) => void;
}

export const LetterReader: React.FC<LetterReaderProps> = React.memo(({
  currentThreadLetters,
  currentUser,
  onUnfoldLetter,
}) => {
  if (currentThreadLetters.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center p-8">
        <Feather className="w-8 h-8 text-resonance-400 mb-3 stroke-[1.2]" />
        <p className="font-serif text-2xl font-light text-ink-800">
          All words have dissolved into quiet memory.
        </p>
        <p className="text-xs text-ink-500 font-light mt-2 max-w-sm leading-relaxed">
          Pen an unhurried note below. Once opened, it will remain visible for 45
          seconds before softly departing.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6">
      {currentThreadLetters.map((msg: SlowMessage) => {
        const isFromSelf = msg.fromUserId === currentUser.id;
        const isRead = Boolean(msg.readAt);

        // Compute remaining seconds and visual ink decay
        const remainingSec = msg.expiresAt
          ? Math.max(0, Math.ceil((msg.expiresAt - Date.now()) / 1000))
          : null;

        // Calculate subtle ink dispersion based on age
        const opacityRatio = remainingSec !== null ? Math.max(0.12, remainingSec / 45) : 1;
        const blurPx = remainingSec !== null && remainingSec < 10 ? (10 - remainingSec) * 0.45 : 0;
        const letterSpacing = remainingSec !== null && remainingSec < 8 ? `${(8 - remainingSec) * 0.02}em` : 'normal';

        const isDissolvingSoon = remainingSec !== null && remainingSec <= 6;

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isFromSelf ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`relative max-w-lg p-7 sm:p-9 rounded-[2rem] transition-all duration-700 shadow-sm border ${
                isRead ? 'animate-unfold-paper' : ''
              } ${
                isFromSelf
                  ? 'bg-resonance-100/70 border-resonance-300/80 text-ink-900'
                  : isRead
                    ? 'bg-cream-50/95 border-resonance-300/60 text-ink-900 paper-surface'
                    : 'bg-cream-50 border-resonance-500/80 text-ink-900 shadow-light-soft'
              }`}
              style={{
                opacity: opacityRatio,
                filter: blurPx > 0 ? `blur(${blurPx}px)` : 'none',
                letterSpacing,
              }}
            >
              <blockquote className="font-serif text-xl sm:text-2xl font-light leading-relaxed">
                “{msg.text}”
              </blockquote>

              {/* Letter Footer */}
              <div className="flex items-center justify-between gap-4 text-xs text-ink-500 mt-5 pt-3 border-t border-resonance-200/50">
                <span className="font-light">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>

                {!isFromSelf && (
                  <div>
                    {!isRead ? (
                      <button
                        type="button"
                        onClick={() => onUnfoldLetter(msg.id)}
                        className="px-3.5 py-1.5 bg-resonance-500 hover:bg-resonance-600 text-cream-50 rounded-full font-medium transition-colors flex items-center space-x-1.5 shadow-xs text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Unfold Letter</span>
                      </button>
                    ) : isDissolvingSoon ? (
                      <span className="text-resonance-900 italic font-serif text-xs font-medium animate-pulse">
                        That moment has passed...
                      </span>
                    ) : (
                      <span className="text-resonance-800 italic font-serif text-xs">
                        Ink softly dispersing into mist...
                      </span>
                    )}
                  </div>
                )}

                {isFromSelf && (
                  <span className="italic text-ink-400 font-serif">Penned by you</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

LetterReader.displayName = 'LetterReader';
