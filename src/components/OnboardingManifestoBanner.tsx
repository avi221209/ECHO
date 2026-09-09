import React, { useState } from 'react';
import { Sparkles, Compass, Shield, Feather, X, ChevronDown, ChevronUp } from 'lucide-react';

interface OnboardingManifestoBannerProps {
  onOpenManifesto: () => void;
}

export const OnboardingManifestoBanner: React.FC<OnboardingManifestoBannerProps> = ({
  onOpenManifesto,
}) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('echo_dismissed_onboarding_v1') === 'true';
    } catch {
      return false;
    }
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem('echo_dismissed_onboarding_v1', 'true');
    } catch {
      // Ignore storage write errors
    }
  };

  if (isDismissed) return null;

  return (
    <div
      role="region"
      aria-label="ECHO Reimagined Social Orientation"
      className="w-full max-w-4xl mx-auto px-4 pt-3 pb-1 relative z-20 animate-in fade-in slide-in-from-top-3 duration-500"
    >
      <div className="rounded-3xl bg-cream-50/90 border border-resonance-300/80 shadow-light-soft backdrop-blur-md overflow-hidden transition-all duration-300">
        {/* Banner Top Header */}
        <div className="px-4 sm:px-6 py-3 bg-resonance-100/60 border-b border-resonance-200/60 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-6 h-6 rounded-full bg-resonance-500/15 flex items-center justify-center border border-resonance-400/40 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-resonance-700" />
            </div>
            <div className="flex items-baseline space-x-2 truncate">
              <h2 className="font-serif text-sm font-medium text-ink-900 truncate">
                Welcome to ECHO — Social by Resonance, Not Reach
              </h2>
              <span className="text-[10px] font-mono text-resonance-800 uppercase tracking-widest hidden sm:inline">
                Reimagined Social Model
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenManifesto}
              className="px-2.5 py-1 rounded-full bg-resonance-200/80 hover:bg-resonance-300/80 text-resonance-950 text-[11px] font-medium transition-colors flex items-center space-x-1 border border-resonance-300"
              title="Read full philosophy and challenge alignment"
            >
              <span>30s Guide</span>
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-ink-500 hover:text-ink-900 rounded-full hover:bg-cream-200/60 transition-colors"
              aria-label={isExpanded ? 'Collapse orientation details' : 'Expand orientation details'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 text-ink-400 hover:text-ink-800 rounded-full hover:bg-cream-200/60 transition-colors"
              aria-label="Dismiss welcome orientation banner"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Paradigm Shift Grid */}
        {isExpanded && (
          <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-cream-100/70 border border-resonance-200/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-resonance-800 font-medium mb-1">
                  <Compass className="w-3.5 h-3.5 text-resonance-600 shrink-0" />
                  <span>1. The Sky Field</span>
                </div>
                <p className="text-ink-600 font-light text-[11px] leading-relaxed">
                  Spatial, unhurried exploration. No feeds, algorithms, or infinite scroll.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-cream-100/70 border border-resonance-200/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-resonance-800 font-medium mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-resonance-600 shrink-0" />
                  <span>2. Private Signal</span>
                </div>
                <p className="text-ink-600 font-light text-[11px] leading-relaxed">
                  Resonating is 100% invisible to the public. Zero likes, upvotes, or counts.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-cream-100/70 border border-resonance-200/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-resonance-800 font-medium mb-1">
                  <Shield className="w-3.5 h-3.5 text-resonance-600 shrink-0" />
                  <span>3. Cap-15 Circle</span>
                </div>
                <p className="text-ink-600 font-light text-[11px] leading-relaxed">
                  Connections are hard-capped at 15. Real social depth requires a boundary.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-cream-100/70 border border-resonance-200/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-resonance-800 font-medium mb-1">
                  <Feather className="w-3.5 h-3.5 text-resonance-600 shrink-0" />
                  <span>4. Ephemeral Letters</span>
                </div>
                <p className="text-ink-600 font-light text-[11px] leading-relaxed">
                  Slow Thread notes dissolve into memory 45s after reading. Presence over logs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
