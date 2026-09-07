import { User } from '../types';

export const CURRENT_USER: User = {
  id: 'user-self',
  displayName: 'You',
  avatarSeed: 'morning-sun-echo-self',
  bio: 'Listening to the resonance of ordinary days.',
  joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 30, // 30 days ago
};

export const SEED_USERS: Record<string, User> = {
  'user-elena': {
    id: 'user-elena',
    displayName: 'Elena Vance',
    avatarSeed: 'elena-vance-seed-33',
    bio: 'Cartographer of quiet corners, morning runner, collector of linen paper.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
  },
  'user-kaelen': {
    id: 'user-kaelen',
    displayName: 'Kaelen Mori',
    avatarSeed: 'kaelen-mori-seed-89',
    bio: 'Observing solar wind oscillations and the way dusk settles on rooftops.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
  },
  'user-maya': {
    id: 'user-maya',
    displayName: 'Maya Lin',
    avatarSeed: 'maya-lin-seed-12',
    bio: 'Botanical ink painter, tea drinker, learning to stay still.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
  },
  'user-julian': {
    id: 'user-julian',
    displayName: 'Julian Thorne',
    avatarSeed: 'julian-thorne-seed-71',
    bio: 'Cellist exploring open fifths, acoustics, and handwritten letters.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 90,
  },
  'user-soraya': {
    id: 'user-soraya',
    displayName: 'Soraya Chen',
    avatarSeed: 'soraya-chen-seed-54',
    bio: 'Architect thinking about natural ventilation and uncurated public plazas.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
  },
  'user-ren': {
    id: 'user-ren',
    displayName: 'Ren Sato',
    avatarSeed: 'ren-sato-seed-42',
    bio: 'Bookbinder in Kyoto, finding repair in damaged edges and beeswax.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 35,
  },
  'user-anouk': {
    id: 'user-anouk',
    displayName: 'Anouk De Jong',
    avatarSeed: 'anouk-dejong-seed-67',
    bio: 'Typographer searching for punctuation marks that represent held breath.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 18,
  },
  'user-mateo': {
    id: 'user-mateo',
    displayName: 'Mateo Morales',
    avatarSeed: 'mateo-morales-seed-91',
    bio: 'Ecologist recording bird frequencies in riparian wetlands.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 50,
  },
  'user-clara': {
    id: 'user-clara',
    displayName: 'Clara Oswald',
    avatarSeed: 'clara-oswald-seed-08',
    bio: 'Baker, yeast shepherd, admirer of morning sunlight across dough.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 28,
  },
  'user-idas': {
    id: 'user-idas',
    displayName: 'Idas Lindqvist',
    avatarSeed: 'idas-lindqvist-seed-25',
    bio: 'Carpenter working with reclaimed oak, observing rain on wood grain.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 40,
  },
  'user-leila': {
    id: 'user-leila',
    displayName: 'Leila Farhan',
    avatarSeed: 'leila-farhan-seed-78',
    bio: 'Philosopher of technology, wandering orchard gardens at dusk.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
  'user-tomas': {
    id: 'user-tomas',
    displayName: 'Tomas Lind',
    avatarSeed: 'tomas-lind-seed-99',
    bio: 'Maritime sailor, keeping watch when the horizon dissolves into fog.',
    joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 70,
  },
};
