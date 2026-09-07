/**
 * Native Web Audio API Synthesizer for ECHO.
 * Synthesizes soft, warm acoustic feedback (harmonic chimes, attunement whispers,
 * letter unfolding rustle) with zero external audio dependencies.
 * Respects user preferences and mute state.
 */

let audioMuted = false;

export function isAudioMuted(): boolean {
  return audioMuted;
}

export function setAudioMuted(muted: boolean): void {
  audioMuted = muted;
}

export function toggleAudioMuted(): boolean {
  audioMuted = !audioMuted;
  return audioMuted;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || audioMuted) return null;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  } catch {
    return null;
  }
}

/**
 * Synthesizes a soft, warm harmonic chime for the Mutual Resonance reveal.
 */
export function playHarmonicChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Harmonic chord frequencies (A4, C#5, E5, G#5, B5 - major 9th warm bloom)
    const frequencies = [440, 554.37, 659.25, 830.61, 987.77];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      const startTime = now + idx * 0.08;
      const duration = 2.4;

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.08 / (idx + 1), startTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    });
  } catch {
    // Fail silently
  }
}

/**
 * Synthesizes a subtle soft tone when attuning to a drifting moment.
 */
export function playAttunementTone(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.03, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  } catch {
    // Fail silently
  }
}

/**
 * Synthesizes a soft parchment rustle tone when opening an ephemeral Slow Letter.
 */
export function playLetterUnfoldSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(659.25, now); // E5

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.04, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.65);
    osc2.stop(now + 0.65);
  } catch {
    // Fail silently
  }
}
