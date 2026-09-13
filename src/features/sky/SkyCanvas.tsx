import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { Sparkles, Compass, Shield } from 'lucide-react';
import { useEcho } from '../../hooks/useEcho';
import { MomentLight } from './MomentLight';
import { MomentFloatingCard } from './MomentFloatingCard';
import { DailyPromptBanner } from './DailyPromptBanner';
import { MoodFilterBar } from './MoodFilterBar';
import { EmptySkyState } from './EmptySkyState';
import { OnboardingManifestoBanner } from '../../components/OnboardingManifestoBanner';
import { DustParticles } from '../../components/DustParticles';

export const SkyCanvas: React.FC = () => {
  const {
    moments,
    activeMoodFilter,
    selectedMoment,
    setSelectedMoment,
    setIsCastOpen,
    setIsManifestoOpen,
    resonanceEchoEvent,
  } = useEcho();

  // Pointer/Touch position in percentage coordinates for proximity physics
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Filter moments by active mood filter and exclude expired
  const filteredMoments = useMemo(() => {
    const now = Date.now();
    return moments.filter((m) => {
      if (m.expiresAt < now) return false;
      if (activeMoodFilter === 'all') return true;
      return m.mood === activeMoodFilter;
    });
  }, [moments, activeMoodFilter]);

  // Update percentage coordinates
  const updatePointerFromClientCoords = useCallback((clientX: number, clientY: number, currentTarget: HTMLElement) => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      if (!currentTarget) return;
      const rect = currentTarget.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      setPointerPos({ x, y });
    });
  }, []);

  // Throttled pointer move over the spatial light field via requestAnimationFrame
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    updatePointerFromClientCoords(e.clientX, e.clientY, e.currentTarget);
  }, [updatePointerFromClientCoords]);

  // Touch drag support for mobile screens
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updatePointerFromClientCoords(touch.clientX, touch.clientY, e.currentTarget);
    }
  }, [updatePointerFromClientCoords]);

  const handlePointerLeave = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setPointerPos(null);
  }, []);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full flex-1 flex flex-col min-h-[calc(100vh-80px)] overflow-hidden select-none pb-24 sm:pb-28"
      role="region"
      aria-label="The Sky - Ambient Spatial Field"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerLeave}
    >
      {/* Organic Dust Light Motes drifting in background */}
      <DustParticles mood={activeMoodFilter} />

      {/* Reimagined Social Orientation Banner */}
      <OnboardingManifestoBanner onOpenManifesto={() => setIsManifestoOpen?.(true)} />

      {/* Shared Ambient Daily Prompt Banner */}
      <DailyPromptBanner />

      {/* 30-Second Judge Test: Atmospheric Model Orientation Whispers */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-1 pb-2">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-ink-700">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-cream-50/80 border border-resonance-300/50 shadow-xs backdrop-blur-sm">
            <Compass className="w-3.3 h-3.3 text-resonance-600" />
            <span className="font-medium">Ambient Spatial Field (No Feeds)</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-cream-50/80 border border-resonance-300/50 shadow-xs backdrop-blur-sm">
            <Sparkles className="w-3.3 h-3.3 text-resonance-600" />
            <span className="font-medium">Mutual Resonance (No Likes)</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-cream-50/80 border border-resonance-300/50 shadow-xs backdrop-blur-sm">
            <Shield className="w-3.3 h-3.3 text-resonance-600" />
            <span className="font-medium">Constellation Circle (Cap 15)</span>
          </span>
        </div>
      </div>

      {/* Mood Spectrum Filter Pills */}
      <MoodFilterBar />

      {/* Ambient The Sky Canvas */}
      <div className="relative flex-1 w-full h-full min-h-[520px]">
        {/* Atmospheric Light Field: Sunbeams, Gauze Curtains & Dust Particles */}
        <div
          className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
            selectedMoment ? 'opacity-30' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/6 w-[560px] h-[560px] rounded-full bg-resonance-100/50 blur-[110px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-ambient-100/40 blur-[100px]" />
          <div className="absolute top-1/2 right-1/3 w-[360px] h-[360px] rounded-full bg-cream-50/80 blur-[80px]" />
        </div>

        {/* Section 12: Resonance Echo Distant Ripple Signal */}
        {resonanceEchoEvent && (
          <div
            className="absolute pointer-events-none z-30 transition-all duration-700"
            style={{
              left: `${resonanceEchoEvent.position.x}%`,
              top: `${resonanceEchoEvent.position.y}%`,
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-resonance-400/80 bg-resonance-200/20 animate-ping" />
              <span className="absolute top-full mt-2 whitespace-nowrap text-[11px] font-serif italic text-resonance-900 bg-cream-50/95 px-3 py-1 rounded-full border border-resonance-300 shadow-md animate-in fade-in zoom-in-95">
                Something may have answered...
              </span>
            </div>
          </div>
        )}

        {/* Living Moments adrift in the canvas */}
        {filteredMoments.length > 0 ? (
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
              selectedMoment ? 'opacity-25 pointer-events-none' : 'opacity-100'
            }`}
          >
            {filteredMoments.map((moment, idx) => {
              // Calculate proximity score (0 to 1) based on pointer distance
              let proximityScore = 0;
              if (pointerPos) {
                const dx = moment.position.x - pointerPos.x;
                const dy = moment.position.y - pointerPos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 18) {
                  proximityScore = 1 - dist / 18;
                }
              }

              return (
                <MomentLight
                  key={moment.id}
                  moment={moment}
                  index={idx}
                  isSelected={selectedMoment?.id === moment.id}
                  proximityScore={proximityScore}
                  onSelect={(m) => setSelectedMoment(m)}
                />
              );
            })}
          </div>
        ) : (
          <EmptySkyState onCastClick={() => setIsCastOpen(true)} />
        )}

        {/* Signature Reveal: Quiet Pocket of Attention */}
        {selectedMoment && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-cream-950/25 backdrop-blur-md animate-in fade-in duration-300">
            <MomentFloatingCard
              moment={selectedMoment}
              onClose={() => setSelectedMoment(null)}
            />
          </div>
        )}
      </div>

      {/* Discreet Atmospheric Footnote */}
      <div className="relative z-20 px-6 sm:px-8 py-3 flex flex-wrap items-center justify-between text-[11px] text-ink-600 border-t border-resonance-200/40 bg-cream-100/50 backdrop-blur-sm gap-2">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-resonance-500 animate-pulse-subtle" />
          <span className="tracking-wide font-medium">
            {filteredMoments.length} drifting light motes in stillness
          </span>
        </div>
        <p className="text-ink-600 italic font-serif">
          Hover/drag finger near a light to attune · Tap or press Enter to reveal
        </p>
      </div>
    </div>
  );
};

