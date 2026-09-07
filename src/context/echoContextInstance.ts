import { createContext } from 'react';
import {
  Moment,
  User,
  ConstellationEntry,
  SlowMessage,
  DailyPrompt,
  MoodType,
} from '../types';

export interface MutualMatchEvent {
  moment: Moment;
  user: User;
}

export interface EchoContextType {
  moments: Moment[];
  users: Record<string, User>;
  currentUser: User;
  userResonances: Record<string, boolean>;
  mutualResonances: Record<string, boolean>;
  constellation: ConstellationEntry[];
  slowMessages: SlowMessage[];
  dailyPrompt: DailyPrompt;
  activeMoodFilter: MoodType | 'all';
  selectedMoment: Moment | null;
  isCastOpen: boolean;
  isConstellationOpen: boolean;
  isSlowThreadsOpen: boolean;
  activeThreadUser: User | null;
  mutualMatchEvent: MutualMatchEvent | null;
  audioMuted: boolean;
  
  // Actions
  castMoment: (text: string, mood: MoodType) => Moment;
  resonate: (momentId: string) => { isMutual: boolean; connectionUser?: User };
  hasResonated: (momentId: string) => boolean;
  isMutual: (momentId: string) => boolean;
  sendSlowMessage: (toUserId: string, text: string) => SlowMessage | null;
  markMessageRead: (messageId: string) => void;
  removeConstellationEntry: (userId: string) => void;
  setSelectedMoment: (moment: Moment | null) => void;
  setActiveMoodFilter: (filter: MoodType | 'all') => void;
  setIsCastOpen: (open: boolean) => void;
  setIsConstellationOpen: (open: boolean) => void;
  setIsSlowThreadsOpen: (open: boolean) => void;
  setActiveThreadUser: (user: User | null) => void;
  dismissMutualMatch: () => void;
  rotatePrompt: () => void;
  resetToDefaults: () => void;
  fillConstellationToCap: () => void;
  triggerMutualRevealDemo: () => void;
  toggleAudio: () => boolean;
}

export const EchoContext = createContext<EchoContextType | undefined>(undefined);
