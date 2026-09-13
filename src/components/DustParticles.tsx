import React, { useMemo } from 'react';
import { m } from 'framer-motion';
import { MoodType } from '../types';

interface DustParticlesProps {
  mood?: MoodType | 'all';
}

interface Mote {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
}

export const DustParticles: React.FC<DustParticlesProps> = React.memo(({ mood = 'all' }) => {
  const motes: Mote[] = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const seed = (i * 37 + 13) % 100;
      return {
        id: i,
        x: (seed * 9.7) % 94 + 3,
        y: ((seed * 13.3) % 90) + 5,
        size: (i % 3) * 1.2 + 2,
        opacity: (i % 4 === 0 ? 0.45 : 0.25),
        duration: 18 + (i % 7) * 4,
        delay: (i % 5) * 1.2,
        dx: ((i % 2 === 0 ? 1 : -1) * (15 + (i % 6) * 5)),
        dy: - (20 + (i % 5) * 8),
      };
    });
  }, []);

  // Speed multiplier based on mood
  const speedMult = mood === 'restless' ? 0.7 : mood === 'reflective' ? 1.4 : 1.0;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {motes.map((mote) => (
        <m.span
          key={mote.id}
          className="absolute rounded-full bg-resonance-400/60 blur-[0.5px]"
          style={{
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: mote.size,
            height: mote.size,
          }}
          animate={{
            x: [0, mote.dx, 0],
            y: [0, mote.dy, 0],
            opacity: [mote.opacity * 0.4, mote.opacity, mote.opacity * 0.2],
            scale: [0.9, 1.3, 0.9],
          }}
          transition={{
            duration: mote.duration * speedMult,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: mote.delay,
          }}
        />
      ))}
    </div>
  );
});

DustParticles.displayName = 'DustParticles';
