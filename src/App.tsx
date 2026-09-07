import React, { useState, Suspense, lazy } from 'react';
import { EchoProvider } from './context/EchoContext';
import { Header } from './components/Header';
import { SkyCanvas } from './features/sky/SkyCanvas';
import { AmbientLoader } from './components/AmbientLoader';

// Code-split route-level and modal features for performance optimization
const ConstellationGraph = lazy(() =>
  import('./features/constellation/ConstellationGraph').then((m) => ({
    default: m.ConstellationGraph,
  }))
);

const CastMomentModal = lazy(() =>
  import('./features/cast/CastMomentModal').then((m) => ({
    default: m.CastMomentModal,
  }))
);

const MutualRevealModal = lazy(() =>
  import('./features/resonance/MutualRevealModal').then((m) => ({
    default: m.MutualRevealModal,
  }))
);

const SlowThreadsModal = lazy(() =>
  import('./features/threads/SlowThreadsModal').then((m) => ({
    default: m.SlowThreadsModal,
  }))
);

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

      {/* Main View Area with Suspense Code Splitting */}
      <main className="relative z-10 flex-1 flex flex-col w-full">
        <Suspense fallback={<AmbientLoader message="Gathering morning light..." />}>
          {currentView === 'sky' && <SkyCanvas />}
          {currentView === 'constellation' && <ConstellationGraph />}
        </Suspense>
      </main>

      {/* Lazy Modals with Suspense */}
      <Suspense fallback={null}>
        <CastMomentModal />
        <MutualRevealModal onOpenConstellation={() => setCurrentView('constellation')} />
        <SlowThreadsModal />
      </Suspense>
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
