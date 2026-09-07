import React, { useMemo } from 'react';
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

  // Filter moments by active mood filter and exclude expired
  const filteredMoments = useMemo(() => {
    const now = Date.now();
    return moments.filter((m) => {
      if (m.expiresAt < now) return false;
      if (activeMoodFilter === 'all') return true;
      return m.mood === activeMoodFilter;
    });
  }, [moments, activeMoodFilter]);

  return (
    <div
      className="relative w-full flex-1 flex flex-col min-h-[calc(100vh-80px)] overflow-hidden select-none"
      role="region"
      aria-label="The Sky - Ambient Canvas of Drifting Moments"
    >
      {/* Shared Ambient Daily Prompt Banner */}
      <DailyPromptBanner />

      {/* Mood Spectrum Filter Pills */}
      <MoodFilterBar />

      {/* Ambient Spatial Canvas Area */}
      <div className="relative flex-1 w-full h-full min-h-[500px]">
        {/* Soft atmospheric sunbeams & gauze gradients */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-resonance-100/45 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-ambient-100/50 blur-[90px]" />
          <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] rounded-full bg-cream-50/70 blur-[80px]" />
        </div>

        {/* Ambient Moments adrift in the canvas */}
        {filteredMoments.length > 0 ? (
          <div className="absolute inset-0 w-full h-full">
            {filteredMoments.map((moment, idx) => (
              <MomentLight
                key={moment.id}
                moment={moment}
                index={idx}
                isSelected={selectedMoment?.id === moment.id}
                onSelect={(m) => setSelectedMoment(m)}
              />
            ))}
          </div>
        ) : (
          <EmptySkyState onCastClick={() => setIsCastOpen(true)} />
        )}

        {/* Floating Moment Detail Overlay */}
        {selectedMoment && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-cream-100/40 backdrop-blur-sm animate-in fade-in duration-200">
            <MomentFloatingCard
              moment={selectedMoment}
              onClose={() => setSelectedMoment(null)}
            />
          </div>
        )}
      </div>

      {/* Subtle Spatial Compass Footer Note */}
      <div className="relative z-20 px-6 py-3 flex items-center justify-between text-[11px] text-ink-500 border-t border-resonance-200/40 bg-cream-100/60 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-resonance-500 animate-pulse-subtle" />
          <span>
            {filteredMoments.length} moments drifting in the morning sky
          </span>
        </div>
        <p className="hidden sm:block text-ink-400 italic">
          Spatial exploration · Press Tab to navigate · Space or Enter to reveal
        </p>
      </div>
    </div>
  );
};
