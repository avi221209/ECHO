import React from 'react';

export const AmbientLoader: React.FC<{ message?: string }> = ({
  message = 'Gathering morning light...',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex-1 flex flex-col items-center justify-center p-12 text-center select-none"
    >
      <div className="relative flex items-center justify-center mb-5">
        <div className="w-12 h-12 rounded-full border border-resonance-300/40 bg-resonance-100/30 animate-ping" />
        <div className="absolute w-7 h-7 rounded-full border border-resonance-500 bg-cream-50 shadow-light-soft flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-resonance-500 animate-pulse-subtle" />
        </div>
      </div>
      <p className="font-serif text-lg font-normal text-ink-800 tracking-wide">
        {message}
      </p>
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
};
