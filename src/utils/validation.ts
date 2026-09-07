import { Moment, User, ConstellationEntry, SlowMessage } from '../types';

/**
 * Type guard for User schema validation.
 */
export function isUser(val: unknown): val is User {
  if (!val || typeof val !== 'object') return false;
  const obj = val as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.displayName === 'string' &&
    typeof obj.avatarSeed === 'string' &&
    typeof obj.bio === 'string' &&
    typeof obj.joinedAt === 'number'
  );
}

/**
 * Type guard for Moment schema validation.
 */
export function isMoment(val: unknown): val is Moment {
  if (!val || typeof val !== 'object') return false;
  const obj = val as Record<string, unknown>;
  if (
    typeof obj.id !== 'string' ||
    typeof obj.text !== 'string' ||
    typeof obj.mood !== 'string' ||
    typeof obj.authorId !== 'string' ||
    typeof obj.createdAt !== 'number' ||
    typeof obj.expiresAt !== 'number'
  ) {
    return false;
  }

  if (!obj.position || typeof obj.position !== 'object') return false;
  const pos = obj.position as Record<string, unknown>;
  return typeof pos.x === 'number' && typeof pos.y === 'number';
}

/**
 * Type guard for ConstellationEntry schema validation.
 */
export function isConstellationEntry(val: unknown): val is ConstellationEntry {
  if (!val || typeof val !== 'object') return false;
  const obj = val as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.userId === 'string' &&
    typeof obj.connectedAt === 'number' &&
    typeof obj.resonanceMomentId === 'string' &&
    isUser(obj.user)
  );
}

/**
 * Type guard for SlowMessage schema validation.
 */
export function isSlowMessage(val: unknown): val is SlowMessage {
  if (!val || typeof val !== 'object') return false;
  const obj = val as Record<string, unknown>;
  const readAtValid = obj.readAt === null || typeof obj.readAt === 'number';
  const expiresAtValid = obj.expiresAt === null || typeof obj.expiresAt === 'number';

  return (
    typeof obj.id === 'string' &&
    typeof obj.fromUserId === 'string' &&
    typeof obj.toUserId === 'string' &&
    typeof obj.text === 'string' &&
    typeof obj.createdAt === 'number' &&
    readAtValid &&
    expiresAtValid
  );
}

/**
 * Type guard validator for array of Moments.
 */
export function validateMomentsArray(val: unknown): val is Moment[] {
  if (!Array.isArray(val)) return false;
  return val.every(isMoment);
}

/**
 * Type guard validator for array of ConstellationEntries.
 */
export function validateConstellationArray(val: unknown): val is ConstellationEntry[] {
  if (!Array.isArray(val)) return false;
  return val.every(isConstellationEntry);
}

/**
 * Type guard validator for array of SlowMessages.
 */
export function validateSlowMessagesArray(val: unknown): val is SlowMessage[] {
  if (!Array.isArray(val)) return false;
  return val.every(isSlowMessage);
}

/**
 * Validates URLs to prevent malicious protocols like `javascript:` or `data:`.
 */
export function isSafeUrl(url: string): boolean {
  if (!url) return true;
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
    return false;
  }
  return true;
}
