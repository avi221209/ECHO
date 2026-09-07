import React, { useState } from 'react';
import { EchoProvider } from './context/EchoContext';
import { Header } from './components/Header';
import { SkyCanvas } from './features/sky/SkyCanvas';
import { CastMomentModal } from './features/cast/CastMomentModal';
import { MutualRevealModal } from './features/resonance/MutualRevealModal';

const MainAppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'sky' | 'constellation'>('sky');

  return (
    <div className="relative min-h-screen bg-cream-100 flex flex-col font-sans selection:bg-resonance-200">
      {/* Soft atmospheric background lights */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-resonance-100/60 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-ambient-100/50 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-resonance-50/80 blur-3xl" />
      </div>

      {/* Header Navigation */}
      <Header currentView={currentView} onSelectView={setCurrentView} />

      {/* Main View Area */}
      <main className="relative z-10 flex-1 flex flex-col w-full">
        {currentView === 'sky' && <SkyCanvas />}
        {currentView === 'constellation' && (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-ink-600">
            <p className="font-serif text-xl">Constellation node-graph view will render here.</p>
          </div>
        )}
      </main>

      {/* Casting Flow Modal */}
      <CastMomentModal />

      {/* Mutual Match Resonance Reveal */}
      <MutualRevealModal onOpenConstellation={() => setCurrentView('constellation')} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <EchoProvider>
      <MainAppContent />
    </EchoProvider>
  );
};

export default App;
