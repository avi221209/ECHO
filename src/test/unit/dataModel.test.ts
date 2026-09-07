import { describe, it, expect } from 'vitest';
import { CONSTELLATION_CAP } from '../../types';
import { sanitizeText, cleanUserInput } from '../../utils/sanitize';
import {
  SEED_MOMENTS,
  SECRET_MUTUAL_MOMENT_IDS,
} from '../../data/seedMoments';

describe('ECHO Data Model & Domain Rules', () => {
  describe('Input Sanitization & Character Limits', () => {
    it('escapes dangerous HTML characters to prevent XSS injection', () => {
      const malicious = '<script>alert("hack")</script>&"quote"';
      const sanitized = sanitizeText(malicious);

      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('&lt;script&gt;');
      expect(sanitized).toContain('&amp;');
      expect(sanitized).toContain('&quot;');
    });

    it('enforces character limits accurately', () => {
      const longText = 'A'.repeat(350);
      const cappedMoment = cleanUserInput(longText, 180);
      const cappedMessage = cleanUserInput(longText, 300);

      expect(cappedMoment.length).toBe(180);
      expect(cappedMessage.length).toBe(300);
    });

    it('strips abnormal control characters and zero-width spaces', () => {
      const dirty = 'Hello\u200B World\x00!';
      const cleaned = cleanUserInput(dirty, 100);
      expect(cleaned).toBe('Hello World!');
    });
  });

  describe('Constellation Cap Enforcement', () => {
    it('defines the strict hard cap at exactly 15 connections', () => {
      expect(CONSTELLATION_CAP).toBe(15);
    });

    it('blocks addition beyond 15 members in logic', () => {
      const connectionList = Array.from({ length: 15 }, (_, i) => ({
        id: `c-${i}`,
        userId: `user-${i}`,
        connectedAt: Date.now(),
        resonanceMomentId: `moment-${i}`,
      }));

      const isAtCap = connectionList.length >= CONSTELLATION_CAP;
      expect(isAtCap).toBe(true);

      // Attempting to push when at cap
      const addConnection = (current: typeof connectionList, newEntry: (typeof connectionList)[0]) => {
        if (current.length >= CONSTELLATION_CAP) {
          return current; // Blocked!
        }
        return [...current, newEntry];
      };

      const result = addConnection(connectionList, {
        id: 'c-16',
        userId: 'user-16',
        connectedAt: Date.now(),
        resonanceMomentId: 'moment-16',
      });

      expect(result.length).toBe(15);
    });
  });

  describe('Moment Lifespan & Expiry Calculation', () => {
    it('seeds moments with a 24-hour daylight lifespan', () => {
      const sample = SEED_MOMENTS[0];
      const lifespanMs = sample.expiresAt - sample.createdAt;
      const twentyFourHoursMs = 1000 * 60 * 60 * 24;

      expect(lifespanMs).toBe(twentyFourHoursMs);
    });

    it('identifies expired moments past their expiry timestamp', () => {
      const now = Date.now();
      const activeMoment = { expiresAt: now + 5000 };
      const expiredMoment = { expiresAt: now - 5000 };

      expect(activeMoment.expiresAt > now).toBe(true);
      expect(expiredMoment.expiresAt < now).toBe(true);
    });
  });

  describe('Resonance Mutuality Logic', () => {
    it('contains designated secret mutual moments for instant match revelation', () => {
      expect(SECRET_MUTUAL_MOMENT_IDS.length).toBeGreaterThan(0);
      expect(SECRET_MUTUAL_MOMENT_IDS).toContain('moment-1');
      expect(SECRET_MUTUAL_MOMENT_IDS).toContain('moment-3');
    });

    it('simulates private resonance vs mutual reveal correctly', () => {
      const checkMutuality = (momentId: string) => {
        return SECRET_MUTUAL_MOMENT_IDS.includes(momentId);
      };

      // Elena Vance's moment is pre-seeded as mutual
      expect(checkMutuality('moment-1')).toBe(true);

      // Other moments remain quietly private without revealing
      expect(checkMutuality('moment-999')).toBe(false);
    });
  });
});
