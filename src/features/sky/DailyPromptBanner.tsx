import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';

export const DailyPromptBanner: React.FC = () => {
  const { dailyPrompt, rotatePrompt } = useEcho();

  return (
    <div className="relative z-20 w-full max-w-2xl mx-auto px-4 pt-3 pb-1">
      <div className="relative overflow-hidden rounded-2xl parchment-glass p-4 sm:p-5 card-shadow transition-all duration-500 border border-resonance-300/30">
        {/* Soft background warm gradient streak */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 rounded-full bg-resonance-200/35 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 w-7 h-7 rounded-full bg-resonance-100 flex items-center justify-center text-resonance-600 border border-resonance-300/50 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-resonance-700">
                  Shared Ambient Context
                </span>
                <span className="w-1 h-1 rounded-full bg-resonance-400" />
                <span className="text-[11px] text-ink-500">{dailyPrompt.date}</span>
              </div>
              <p className="font-serif text-lg sm:text-xl font-normal text-ink-900 mt-1 leading-snug">
                “{dailyPrompt.prompt}”
              </p>
              <p className="text-xs text-ink-500 font-light mt-1">
                {dailyPrompt.context}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={rotatePrompt}
            className="p-2 text-ink-500 hover:text-resonance-700 hover:bg-resonance-100/60 rounded-full transition-colors shrink-0"
            aria-label="Whisper another prompt"
            title="Whisper another prompt"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
