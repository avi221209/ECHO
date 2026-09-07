import { describe, it, expect } from 'vitest';
import {
  isUser,
  isMoment,
  isConstellationEntry,
  isSlowMessage,
  validateMomentsArray,
  validateConstellationArray,
  validateSlowMessagesArray,
  isSafeUrl,
} from '../../utils/validation';
import { isAudioMuted, toggleAudioMuted, setAudioMuted } from '../../utils/audio';

describe('Runtime Validation & Data Integrity Suite', () => {
  describe('Schema Type Guards', () => {
    it('validates authentic User objects and rejects corrupt data', () => {
      const validUser = {
        id: 'user-1',
        displayName: 'Elena Vance',
        avatarSeed: 'elena',
        bio: 'In the quiet',
        joinedAt: Date.now(),
      };
      const invalidUser = { id: 123, displayName: null };

      expect(isUser(validUser)).toBe(true);
      expect(isUser(invalidUser)).toBe(false);
      expect(isUser(null)).toBe(false);
    });

    it('validates Moment schema and moments array accurately', () => {
      const validMoment = {
        id: 'moment-1',
        text: 'Morning light on linen',
        mood: 'reflective',
        authorId: 'user-1',
        createdAt: Date.now(),
        expiresAt: Date.now() + 86400000,
        position: { x: 50, y: 50 },
      };
      const corruptPosition = { ...validMoment, position: 'not an object' };

      expect(isMoment(validMoment)).toBe(true);
      expect(isMoment(corruptPosition)).toBe(false);
      expect(validateMomentsArray([validMoment])).toBe(true);
      expect(validateMomentsArray([corruptPosition])).toBe(false);
    });

    it('validates Constellation entries and array schema', () => {
      const validEntry = {
        id: 'c-1',
        userId: 'user-1',
        connectedAt: Date.now(),
        resonanceMomentId: 'm-1',
        user: {
          id: 'user-1',
          displayName: 'Elena',
          avatarSeed: 'elena',
          bio: 'Bio',
          joinedAt: Date.now(),
        },
      };

      expect(isConstellationEntry(validEntry)).toBe(true);
      expect(validateConstellationArray([validEntry])).toBe(true);
      expect(validateConstellationArray([{ invalid: true }])).toBe(false);
    });

    it('validates SlowMessage schema', () => {
      const validMsg = {
        id: 'msg-1',
        fromUserId: 'u1',
        toUserId: 'u2',
        text: 'Hello from quietness',
        createdAt: Date.now(),
        readAt: null,
        expiresAt: null,
      };

      expect(isSlowMessage(validMsg)).toBe(true);
      expect(validateSlowMessagesArray([validMsg])).toBe(true);
      expect(validateSlowMessagesArray('not an array')).toBe(false);
    });
  });

  describe('URL Safety & Protocol Verification', () => {
    it('allows standard safe URLs and text', () => {
      expect(isSafeUrl('https://example.com')).toBe(true);
      expect(isSafeUrl('mailto:soul@echo.ambient')).toBe(true);
      expect(isSafeUrl('')).toBe(true);
    });

    it('blocks malicious script and data protocol URLs', () => {
      expect(isSafeUrl('javascript:alert(1)')).toBe(false);
      expect(isSafeUrl('JAVASCRIPT:console.log("xss")')).toBe(false);
      expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    });
  });

  describe('Audio Engine Mute Controls', () => {
    it('manages audio mute toggle state reliably', () => {
      setAudioMuted(false);
      expect(isAudioMuted()).toBe(false);

      const toggled = toggleAudioMuted();
      expect(toggled).toBe(true);
      expect(isAudioMuted()).toBe(true);

      setAudioMuted(false);
    });
  });
});
