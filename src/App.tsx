import React from 'react';
import { EchoProvider } from './context/EchoContext';

export const App: React.FC = () => {
  return (
    <EchoProvider>
      <div className="relative min-h-screen bg-cream-100 flex flex-col font-sans selection:bg-resonance-200">
      {/* Soft atmospheric background lights */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-resonance-100/70 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-ambient-100/60 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-resonance-50/90 blur-3xl" />
      </div>

      {/* Main Scaffold Header */}
      <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between border-b border-resonance-200/40 backdrop-blur-sm bg-cream-100/60">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-resonance-500/60 flex items-center justify-center bg-cream-50 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-resonance-500 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-medium tracking-tight text-ink-900 leading-none">
              ECHO
            </h1>
            <p className="text-[11px] font-medium uppercase tracking-widest text-ink-500 mt-0.5">
              Social by Resonance, Not Reach
            </p>
          </div>
        </div>
      </header>

      {/* Hero Welcome Canvas Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-resonance-600 bg-resonance-100/60 px-3 py-1 rounded-full border border-resonance-200/50 mb-6">
          Morning Light Design Identity
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-light text-ink-900 leading-tight mb-4">
          Presence over performance.
          <br />
          <span className="italic font-normal text-resonance-600">Depth over reach.</span>
        </h2>
        <p className="text-ink-600 text-base sm:text-lg leading-relaxed font-light max-w-lg">
          No broadcast feeds. No follower counts. Cast quiet moments into the ambient sky,
          and discover connection only when resonance is mutual.
        </p>
      </main>
    </div>
    </EchoProvider>
  );
};

export default App;
