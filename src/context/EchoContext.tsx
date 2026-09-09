import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import {
  playHarmonicChime,
  isAudioMuted,
  toggleAudioMuted,
} from '../utils/audio';
import { cleanUserInput } from '../utils/sanitize';
import {
  validateMomentsArray,
  validateConstellationArray,
  validateSlowMessagesArray,
} from '../utils/validation';
import { EchoContext, MutualMatchEvent } from './echoContextInstance';

export const EchoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Defensive storage with runtime type-guard schema validators
  const [moments, setMoments] = useLocalStorage<Moment[]>(
    'echo_moments_v1',
    SEED_MOMENTS,
    validateMomentsArray
  );

  const [userResonances, setUserResonances] = useLocalStorage<Record<string, boolean>>(
    'echo_user_resonances_v1',
    {}
  );

  const [mutualResonances, setMutualResonances] = useLocalStorage<Record<string, boolean>>(
    'echo_mutual_resonances_v1',
    {}
  );

  const initialConstellation: ConstellationEntry[] = useMemo(
    () =>
      INITIAL_CONSTELLATION_USER_IDS.map((userId, idx) => ({
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
      })),
    []
  );

  const [constellation, setConstellation] = useLocalStorage<ConstellationEntry[]>(
    'echo_constellation_v1',
    initialConstellation,
    validateConstellationArray
  );

  const initialSlowMessages: SlowMessage[] = useMemo(
    () => [
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
    ],
    []
  );

  const [slowMessages, setSlowMessages] = useLocalStorage<SlowMessage[]>(
    'echo_slow_messages_v1',
    initialSlowMessages,
    validateSlowMessagesArray
  );

  const [promptIndex, setPromptIndex] = useLocalStorage<number>('echo_prompt_idx_v1', 0);
  const dailyPrompt = DAILY_PROMPTS[promptIndex % DAILY_PROMPTS.length];

  // Audio State
  const [audioMutedState, setAudioMutedState] = useState<boolean>(isAudioMuted());

  // UI state
  const [activeMoodFilter, setActiveMoodFilter] = useState<MoodType | 'all'>('all');
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const [isCastOpen, setIsCastOpen] = useState<boolean>(false);
  const [isConstellationOpen, setIsConstellationOpen] = useState<boolean>(false);
  const [isSlowThreadsOpen, setIsSlowThreadsOpen] = useState<boolean>(false);
  const [activeThreadUser, setActiveThreadUser] = useState<User | null>(null);
  const [mutualMatchEvent, setMutualMatchEvent] = useState<MutualMatchEvent | null>(null);

  const [isManifestoOpen, setIsManifestoOpen] = useState<boolean>(false);

  // Clean expired slow messages periodically without triggering re-renders unless messages expired
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setSlowMessages((prev) => {
        const hasExpired = prev.some((msg) => msg.expiresAt && now > msg.expiresAt);
        if (!hasExpired) return prev;
        return prev.filter((msg) => !(msg.expiresAt && now > msg.expiresAt));
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [setSlowMessages]);

  const toggleAudio = useCallback((): boolean => {
    const nextState = toggleAudioMuted();
    setAudioMutedState(nextState);
    return nextState;
  }, []);

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

      setUserResonances((prev) => ({ ...prev, [momentId]: true }));

      const moment = moments.find((m) => m.id === momentId);
      if (!moment || moment.authorId === CURRENT_USER.id) {
        return { isMutual: false };
      }

      const author = SEED_USERS[moment.authorId];
      const isSecretMutual =
        SECRET_MUTUAL_MOMENT_IDS.includes(momentId) ||
        (author && constellation.length < CONSTELLATION_CAP && Math.random() < 0.35);

      if (isSecretMutual && author) {
        setMutualResonances((prev) => ({ ...prev, [momentId]: true }));
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

          playHarmonicChime();
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

  const fillConstellationToCap = useCallback(() => {
    const existingIds = new Set(constellation.map((c) => c.userId));
    const candidateUsers = Object.values(SEED_USERS).filter(
      (u) => !existingIds.has(u.id) && u.id !== CURRENT_USER.id
    );

    const needed = CONSTELLATION_CAP - constellation.length;
    if (needed <= 0) return;

    const newEntries: ConstellationEntry[] = candidateUsers.slice(0, needed).map((user, i) => {
      const randomMoment = moments[i % moments.length];
      return {
        id: `constellation-${user.id}-${Date.now() + i}`,
        userId: user.id,
        connectedAt: Date.now() - (i + 1) * 1000 * 60 * 60 * 24,
        resonanceMomentId: randomMoment ? randomMoment.id : 'moment-1',
        user,
      };
    });

    setConstellation((prev) => [...prev, ...newEntries]);
  }, [constellation, moments, setConstellation]);

  const triggerMutualRevealDemo = useCallback(() => {
    const elenaMoment = moments.find((m) => m.id === 'moment-1') || moments[0];
    setSelectedMoment(elenaMoment);
    resonate(elenaMoment.id);
  }, [moments, resonate]);

  const resetToDefaults = useCallback(() => {
    setMoments(SEED_MOMENTS);
    setUserResonances({});
    setMutualResonances({});
    setConstellation(initialConstellation);
    setSlowMessages(initialSlowMessages);
    setPromptIndex(0);
    setSelectedMoment(null);
    setMutualMatchEvent(null);
  }, [
    setMoments,
    setUserResonances,
    setMutualResonances,
    setConstellation,
    setSlowMessages,
    setPromptIndex,
    initialConstellation,
    initialSlowMessages,
  ]);

  const contextValue = useMemo(
    () => ({
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
      isManifestoOpen,
      audioMuted: audioMutedState,
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
      setIsManifestoOpen,
      dismissMutualMatch,
      rotatePrompt,
      resetToDefaults,
      fillConstellationToCap,
      triggerMutualRevealDemo,
      toggleAudio,
    }),
    [
      moments,
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
      isManifestoOpen,
      audioMutedState,
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
      setIsManifestoOpen,
      dismissMutualMatch,
      rotatePrompt,
      resetToDefaults,
      fillConstellationToCap,
      triggerMutualRevealDemo,
      toggleAudio,
    ]
  );

  return (
    <EchoContext.Provider value={contextValue}>
      {children}
    </EchoContext.Provider>
  );
};
