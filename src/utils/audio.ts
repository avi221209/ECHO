/**
 * Synthesizes a soft, warm harmonic chime for the Mutual Resonance reveal
 * using the Web Audio API. Safe, zero-dependency, and elegant.
 */
export function playHarmonicChime(): void {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Harmonic chord frequencies (A4, C#5, E5, G#5, B5 - major 9th warm bloom)
    const frequencies = [440, 554.37, 659.25, 830.61, 987.77];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      // Gentle envelope: soft attack and lingering warm decay
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
    // Audio contexts may be blocked by autoplay policies; fail silently
  }
}
