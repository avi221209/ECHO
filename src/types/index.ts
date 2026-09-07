export const CONSTELLATION_CAP = 15;

export type MoodType = 'reflective' | 'joyful' | 'uncertain' | 'grateful' | 'restless';

export interface MoodConfig {
  type: MoodType;
  label: string;
  description: string;
  color: string; // Tailwind hex
  dotColor: string;
  glowColor: string;
  bgLight: string;
}

export interface MomentPosition {
  x: number; // 5% to 90%
  y: number; // 10% to 85%
}

export interface Moment {
  id: string;
  text: string;
  mood: MoodType;
  authorId: string;
  createdAt: number;
  expiresAt: number;
  position: MomentPosition;
  isOwn?: boolean;
}

export interface User {
  id: string;
  displayName: string;
  avatarSeed: string;
  bio: string;
  joinedAt: number;
}

export interface Resonance {
  id: string;
  momentId: string;
  fromUserId: string;
  toUserId: string;
  mutual: boolean;
  createdAt: number;
}

export interface ConstellationEntry {
  id: string;
  userId: string;
  connectedAt: number;
  resonanceMomentId: string;
  user: User;
}

export interface SlowMessage {
  id: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  createdAt: number;
  readAt: number | null;
  expiresAt: number | null;
}

export interface DailyPrompt {
  id: string;
  prompt: string;
  context: string;
  date: string;
}

export const MOOD_DEFINITIONS: Record<MoodType, MoodConfig> = {
  reflective: {
    type: 'reflective',
    label: 'Reflective',
    description: 'Quiet contemplation, memories, interior landscapes',
    color: '#8B8FA3', // Muted dusty lavender
    dotColor: '#707487',
    glowColor: 'rgba(139, 143, 163, 0.35)',
    bgLight: '#EDEEF2',
  },
  joyful: {
    type: 'joyful',
    label: 'Joyful',
    description: 'Sudden light, small wonders, luminous warmth',
    color: '#D4A857', // Amber/gold
    dotColor: '#B88B3E',
    glowColor: 'rgba(212, 168, 87, 0.45)',
    bgLight: '#FBF3DF',
  },
  uncertain: {
    type: 'uncertain',
    label: 'Uncertain',
    description: 'Thresholds, unknowing, gentle hesitation',
    color: '#9E9A8E', // Warm stone
    dotColor: '#7D796E',
    glowColor: 'rgba(158, 154, 142, 0.35)',
    bgLight: '#F3EFE6',
  },
  grateful: {
    type: 'grateful',
    label: 'Grateful',
    description: 'Grounding, gentle acknowledgment of what remains',
    color: '#7C8E7D', // Sage green
    dotColor: '#5C6D5D',
    glowColor: 'rgba(124, 142, 125, 0.35)',
    bgLight: '#EBF1EB',
  },
  restless: {
    type: 'restless',
    label: 'Restless',
    description: 'Seeking, wandering thoughts, stirring movement',
    color: '#C48B71', // Terracotta rose
    dotColor: '#A86C52',
    glowColor: 'rgba(196, 139, 113, 0.35)',
    bgLight: '#F7EDE7',
  },
};
