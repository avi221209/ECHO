import React, { useState, useEffect, useCallback } from 'react';
import {
  Moment,
  User,
  ConstellationEntry,
  SlowMessage,
  MoodType,
  CONSTELLATION_CAP,
} from '../types';
import { SEED_USERS, CURRENT_USER } from '../data/seedUsers';
import {
  SEED_MOMENTS,
  SECRET_MUTUAL_MOMENT_IDS,
  INITIAL_CONSTELLATION_USER_IDS,
} from '../data/seedMoments';
import { DAILY_PROMPTS } from '../data/seedPrompts';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { playHarmonicChime } from '../utils/audio';
import { cleanUserInput } from '../utils/sanitize';
import { EchoContext, MutualMatchEvent } from './echoContextInstance';

export const EchoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Moments storage
  const [moments, setMoments] = useLocalStorage<Moment[]>(
    'echo_moments_v1',
    SEED_MOMENTS
  );

  // User resonances tracking (momentId -> boolean)
  const [userResonances, setUserResonances] = useLocalStorage<Record<string, boolean>>(
    'echo_user_resonances_v1',
    {}
  );

  // Mutual resonances tracking (momentId -> boolean)
  const [mutualResonances, setMutualResonances] = useLocalStorage<Record<string, boolean>>(
    'echo_mutual_resonances_v1',
    {}
  );

  // Constellation connections (max 15)
  const initialConstellation: ConstellationEntry[] = INITIAL_CONSTELLATION_USER_IDS.map(
    (userId, idx) => ({
      id: `constellation-${userId}`,
      userId,
      connectedAt: Date.now() - (idx + 1) * 1000 * 60 * 60 * 24 * 3,
      resonanceMomentId: idx === 0 ? 'moment-2' : 'moment-7',
      user: SEED_USERS[userId] || {
        id: userId,
        displayName: 'A Quiet Friend',
        avatarSeed: userId,
        bio: 'Connected through mutual stillness.',
        joinedAt: Date.now(),
      },
    })
  );

  const [constellation, setConstellation] = useLocalStorage<ConstellationEntry[]>(
    'echo_constellation_v1',
    initialConstellation
  );

  // Slow Messages
  const [slowMessages, setSlowMessages] = useLocalStorage<SlowMessage[]>(
    'echo_slow_messages_v1',
    [
      {
        id: 'msg-initial-1',
        fromUserId: 'user-ren',
        toUserId: CURRENT_USER.id,
        text: 'The paper we chose for your note holds morning ink with extraordinary patience.',
        createdAt: Date.now() - 1000 * 60 * 30, // 30m ago
        readAt: null,
        expiresAt: null,
      },
      {
        id: 'msg-initial-2',
        fromUserId: 'user-clara',
        toUserId: CURRENT_USER.id,
        text: 'Saved the heel of the sunflower loaf for you by the studio sill.',
        createdAt: Date.now() - 1000 * 60 * 15, // 15m ago
        readAt: null,
        expiresAt: null,
      },
    ]
  );

  // Daily prompt rotation
  const [promptIndex, setPromptIndex] = useLocalStorage<number>('echo_prompt_idx_v1', 0);
  const dailyPrompt = DAILY_PROMPTS[promptIndex % DAILY_PROMPTS.length];

  // UI state
  const [activeMoodFilter, setActiveMoodFilter] = useState<MoodType | 'all'>('all');
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const [isCastOpen, setIsCastOpen] = useState<boolean>(false);
  const [isConstellationOpen, setIsConstellationOpen] = useState<boolean>(false);
  const [isSlowThreadsOpen, setIsSlowThreadsOpen] = useState<boolean>(false);
  const [activeThreadUser, setActiveThreadUser] = useState<User | null>(null);
  const [mutualMatchEvent, setMutualMatchEvent] = useState<MutualMatchEvent | null>(null);

  // Clean expired slow messages periodically
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setSlowMessages((prev) =>
        prev.filter((msg) => {
          if (msg.expiresAt && now > msg.expiresAt) {
            return false;
          }
          return true;
        })
      );
    }, 2000);

    return () => clearInterval(timer);
  }, [setSlowMessages]);

  const hasResonated = useCallback(
    (momentId: string): boolean => {
      return Boolean(userResonances[momentId]);
    },
    [userResonances]
  );

  const isMutual = useCallback(
    (momentId: string): boolean => {
      return Boolean(mutualResonances[momentId]);
    },
    [mutualResonances]
  );

  // Cast a new moment into the Sky
  const castMoment = useCallback(
    (rawText: string, mood: MoodType): Moment => {
      const sanitized = cleanUserInput(rawText, 240);
      const now = Date.now();

      // Distributed position on canvas (between 12% and 86%)
      const x = Math.floor(Math.random() * 70) + 14;
      const y = Math.floor(Math.random() * 65) + 16;

      const newMoment: Moment = {
        id: `moment-user-${now}`,
        text: sanitized,
        mood,
        authorId: CURRENT_USER.id,
        createdAt: now,
        expiresAt: now + 1000 * 60 * 60 * 24, // 24-hour lifespan
        position: { x, y },
        isOwn: true,
      };

      setMoments((prev) => [newMoment, ...prev]);
      return newMoment;
    },
    [setMoments]
  );

  // Resonate with a moment
  const resonate = useCallback(
    (momentId: string): { isMutual: boolean; connectionUser?: User } => {
      if (userResonances[momentId]) {
        return { isMutual: Boolean(mutualResonances[momentId]) };
      }

      // Record user resonance privately
      setUserResonances((prev) => ({ ...prev, [momentId]: true }));

      const moment = moments.find((m) => m.id === momentId);
      if (!moment || moment.authorId === CURRENT_USER.id) {
        return { isMutual: false };
      }

      // Check if this moment is seeded for mutual connection
      const author = SEED_USERS[moment.authorId];
      const isSecretMutual =
        SECRET_MUTUAL_MOMENT_IDS.includes(momentId) ||
        (author && constellation.length < CONSTELLATION_CAP && Math.random() < 0.35);

      if (isSecretMutual && author) {
        // Record mutual resonance
        setMutualResonances((prev) => ({ ...prev, [momentId]: true }));

        // Check if author is already in constellation
        const alreadyConnected = constellation.some((c) => c.userId === author.id);

        if (!alreadyConnected && constellation.length < CONSTELLATION_CAP) {
          const newEntry: ConstellationEntry = {
            id: `constellation-${author.id}-${Date.now()}`,
            userId: author.id,
            connectedAt: Date.now(),
            resonanceMomentId: momentId,
            user: author,
          };

          setConstellation((prev) => {
            if (prev.length >= CONSTELLATION_CAP) return prev;
            return [...prev, newEntry];
          });

          // Play warm harmonic chime sound
          playHarmonicChime();

          // Trigger mutual match modal event
          setMutualMatchEvent({ moment, user: author });

          return { isMutual: true, connectionUser: author };
        }

        return { isMutual: true, connectionUser: author };
      }

      return { isMutual: false };
    },
    [
      userResonances,
      mutualResonances,
      moments,
      constellation,
      setUserResonances,
      setMutualResonances,
      setConstellation,
    ]
  );

  // Send a Slow Message
  const sendSlowMessage = useCallback(
    (toUserId: string, rawText: string): SlowMessage | null => {
      const sanitized = cleanUserInput(rawText, 300);
      if (!sanitized) return null;

      const newMsg: SlowMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        fromUserId: CURRENT_USER.id,
        toUserId,
        text: sanitized,
        createdAt: Date.now(),
        readAt: null,
        expiresAt: null,
      };

      setSlowMessages((prev) => [...prev, newMsg]);
      return newMsg;
    },
    [setSlowMessages]
  );

  // Mark message as read and schedule its dissolution (45-second contemplation window)
  const markMessageRead = useCallback(
    (messageId: string) => {
      setSlowMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === messageId && !msg.readAt) {
            const now = Date.now();
            return {
              ...msg,
              readAt: now,
              expiresAt: now + 45 * 1000,
            };
          }
          return msg;
        })
      );
    },
    [setSlowMessages]
  );

  // Remove / unfurl a connection gently from constellation
  const removeConstellationEntry = useCallback(
    (userId: string) => {
      setConstellation((prev) => prev.filter((entry) => entry.userId !== userId));
    },
    [setConstellation]
  );

  const dismissMutualMatch = useCallback(() => {
    setMutualMatchEvent(null);
  }, []);

  const rotatePrompt = useCallback(() => {
    setPromptIndex((prev) => (prev + 1) % DAILY_PROMPTS.length);
  }, [setPromptIndex]);

  const resetToDefaults = useCallback(() => {
    setMoments(SEED_MOMENTS);
    setUserResonances({});
    setMutualResonances({});
    setConstellation(initialConstellation);
    setSlowMessages([]);
    setPromptIndex(0);
    setSelectedMoment(null);
  }, [
    setMoments,
    setUserResonances,
    setMutualResonances,
    setConstellation,
    setSlowMessages,
    setPromptIndex,
    initialConstellation,
  ]);

  return (
    <EchoContext.Provider
      value={{
        moments,
        users: SEED_USERS,
        currentUser: CURRENT_USER,
        userResonances,
        mutualResonances,
        constellation,
        slowMessages,
        dailyPrompt,
        activeMoodFilter,
        selectedMoment,
        isCastOpen,
        isConstellationOpen,
        isSlowThreadsOpen,
        activeThreadUser,
        mutualMatchEvent,
        castMoment,
        resonate,
        hasResonated,
        isMutual,
        sendSlowMessage,
        markMessageRead,
        removeConstellationEntry,
        setSelectedMoment,
        setActiveMoodFilter,
        setIsCastOpen,
        setIsConstellationOpen,
        setIsSlowThreadsOpen,
        setActiveThreadUser,
        dismissMutualMatch,
        rotatePrompt,
        resetToDefaults,
      }}
    >
      {children}
    </EchoContext.Provider>
  );
};
