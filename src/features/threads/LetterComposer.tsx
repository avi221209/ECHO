import React from 'react';
import { Send } from 'lucide-react';
import { User } from '../../types';

interface LetterComposerProps {
  selectedUser: User;
  letterText: string;
  maxChars: number;
  isSending: boolean;
  onTextChange: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LetterComposer: React.FC<LetterComposerProps> = React.memo(({
  selectedUser,
  letterText,
  maxChars,
  isSending,
  onTextChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="p-5 sm:p-6 border-t border-resonance-200/60 bg-cream-50/80"
    >
      <div className="relative rounded-2xl bg-cream-100 border border-resonance-300/70 focus-within:border-resonance-500 focus-within:ring-2 focus-within:ring-resonance-200/50 p-4 transition-all shadow-inner">
        <textarea
          rows={2}
          value={letterText}
          onChange={(e) => onTextChange(e.target.value.slice(0, maxChars))}
          placeholder={`Compose an unhurried letter to ${selectedUser.displayName}...`}
          className="w-full bg-transparent border-0 resize-none font-serif text-lg text-ink-900 placeholder:text-ink-400 focus:outline-none leading-relaxed"
        />
        <div className="flex items-center justify-between pt-2 border-t border-resonance-200/50 text-xs text-ink-500">
          <span className="italic font-light">
            Ephemeral · Words dissolve into quietness after reading
          </span>
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[11px]">
              {maxChars - letterText.length} left
            </span>
            <button
              type="submit"
              disabled={!letterText.trim() || isSending}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                letterText.trim() && !isSending
                  ? 'bg-resonance-500 text-cream-50 hover:bg-resonance-600 shadow-sm'
                  : 'bg-ink-300/40 text-cream-50/70 cursor-not-allowed'
              }`}
              aria-label="Send Slow Letter"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
});

LetterComposer.displayName = 'LetterComposer';
