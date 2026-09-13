import React, { useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { EchoProvider } from './context/EchoContext';
import { Header } from './components/Header';
import { SkyCanvas } from './features/sky/SkyCanvas';
import { NavigationDock } from './components/NavigationDock';
import { EvaluatorMode } from './components/EvaluatorMode';
import { AtmosphericGrain } from './components/AtmosphericGrain';
import { ConstellationGraph } from './features/constellation/ConstellationGraph';
import { CastMomentModal } from './features/cast/CastMomentModal';
import { MutualRevealModal } from './features/resonance/MutualRevealModal';
import { SlowThreadsModal } from './features/threads/SlowThreadsModal';

const MainAppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'sky' | 'constellation'>('sky');

  return (
    <div className="relative min-h-screen bg-cream-100 flex flex-col font-sans selection:bg-resonance-200">
      {/* Tactile Linen & Paper Texture Grain */}
      <AtmosphericGrain />

      {/* Ambient background light fields */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-resonance-100/60 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-ambient-100/50 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-resonance-50/80 blur-3xl" />
      </div>

      {/* Embedded Ambient Header */}
      <Header currentView={currentView} onSelectView={setCurrentView} />

      {/* Main Viewport Area */}
      <main className="relative z-10 flex-1 flex flex-col w-full">
        {currentView === 'sky' && <SkyCanvas />}
        {currentView === 'constellation' && <ConstellationGraph />}
      </main>

      {/* Floating Spatial Navigation Dock */}
      <NavigationDock currentView={currentView} onSelectView={setCurrentView} />

      {/* Hidden Evaluator Suite (Ctrl+Shift+E) */}
      <EvaluatorMode />

      {/* Feature Modals */}
      <CastMomentModal />
      <MutualRevealModal onOpenConstellation={() => setCurrentView('constellation')} />
      <SlowThreadsModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <EchoProvider>
        <MainAppContent />
      </EchoProvider>
    </LazyMotion>
  );
};

export default App;
