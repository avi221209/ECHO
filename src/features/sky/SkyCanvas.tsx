import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { useEcho } from '../../hooks/useEcho';
import { MomentLight } from './MomentLight';
import { MomentFloatingCard } from './MomentFloatingCard';
import { DailyPromptBanner } from './DailyPromptBanner';
import { MoodFilterBar } from './MoodFilterBar';
import { EmptySkyState } from './EmptySkyState';

export const SkyCanvas: React.FC = () => {
  const {
    moments,
    activeMoodFilter,
    selectedMoment,
    setSelectedMoment,
    setIsCastOpen,
  } = useEcho();

  // Pointer position in percentage coordinates for proximity physics
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

  // Throttled pointer move over the spatial light field via requestAnimationFrame
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const currentTarget = e.currentTarget;

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
      aria-label="The Sky - Ambient Canvas of Drifting Moments"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Shared Ambient Daily Prompt Banner */}
      <DailyPromptBanner />

      {/* Mood Spectrum Filter Pills */}
      <MoodFilterBar />

      {/* Ambient Living Light Field Canvas */}
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
      <div className="relative z-20 px-8 py-3 flex items-center justify-between text-[11px] text-ink-600 border-t border-resonance-200/40 bg-cream-100/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-resonance-500 animate-pulse-subtle" />
          <span className="tracking-wide">
            {filteredMoments.length} moments present in the ambient field
          </span>
        </div>
        <p className="hidden sm:block text-ink-500 italic font-serif">
          Move near a light to attune · Press Tab &amp; Enter to reveal
        </p>
      </div>
    </div>
  );
};
