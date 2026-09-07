import { Moment } from '../types';

const NOW = Date.now();
const HOUR = 1000 * 60 * 60;

export const SEED_MOMENTS: Moment[] = [
  {
    id: 'moment-1',
    text: 'Watching the morning light slant across an unmade bed. For twenty minutes, nothing needed to be optimized or announced.',
    mood: 'reflective',
    authorId: 'user-elena',
    createdAt: NOW - 2 * HOUR,
    expiresAt: NOW + 22 * HOUR,
    position: { x: 18, y: 22 },
  },
  {
    id: 'moment-2',
    text: 'Found an old handwritten grocery list tucked inside a library book from 1984: "peaches, salted butter, paraffin candles." Somebody lived there.',
    mood: 'grateful',
    authorId: 'user-ren',
    createdAt: NOW - 3.5 * HOUR,
    expiresAt: NOW + 20.5 * HOUR,
    position: { x: 38, y: 16 },
  },
  {
    id: 'moment-3',
    text: 'The sudden, unreasonable elation of a stranger holding an elevator door without once checking their wrist or their phone.',
    mood: 'joyful',
    authorId: 'user-mateo',
    createdAt: NOW - 1.2 * HOUR,
    expiresAt: NOW + 22.8 * HOUR,
    position: { x: 62, y: 25 },
  },
  {
    id: 'moment-4',
    text: 'I told someone the complete truth today instead of the polished diplomatic version. My ribs still hum with nervous adrenaline.',
    mood: 'restless',
    authorId: 'user-anouk',
    createdAt: NOW - 4 * HOUR,
    expiresAt: NOW + 20 * HOUR,
    position: { x: 80, y: 32 },
  },
  {
    id: 'moment-5',
    text: 'Standing at the edge of a new career decision. Neither path is wrong, which somehow makes it terrifying.',
    mood: 'uncertain',
    authorId: 'user-kaelen',
    createdAt: NOW - 5.5 * HOUR,
    expiresAt: NOW + 18.5 * HOUR,
    position: { x: 26, y: 44 },
  },
  {
    id: 'moment-6',
    text: 'The cedar smell of rain hitting heated asphalt in early September. That exact sensory threshold where summer lets go.',
    mood: 'reflective',
    authorId: 'user-maya',
    createdAt: NOW - 6 * HOUR,
    expiresAt: NOW + 18 * HOUR,
    position: { x: 48, y: 36 },
  },
  {
    id: 'moment-7',
    text: 'We baked three loaves of sourdough together and gave two away to the quiet neighbor who lost his dog last month. The crust was singed just right.',
    mood: 'grateful',
    authorId: 'user-clara',
    createdAt: NOW - 2.8 * HOUR,
    expiresAt: NOW + 21.2 * HOUR,
    position: { x: 70, y: 46 },
  },
  {
    id: 'moment-8',
    text: 'Sitting with someone in silence where the quiet is neither an apology nor an evasion, but an open window.',
    mood: 'reflective',
    authorId: 'user-julian',
    createdAt: NOW - 7 * HOUR,
    expiresAt: NOW + 17 * HOUR,
    position: { x: 14, y: 60 },
  },
  {
    id: 'moment-9',
    text: 'The sparrow that nests above my studio lamp returned today with twigs in her beak. She doesn’t care about our deadlines.',
    mood: 'joyful',
    authorId: 'user-soraya',
    createdAt: NOW - 8 * HOUR,
    expiresAt: NOW + 16 * HOUR,
    position: { x: 34, y: 68 },
  },
  {
    id: 'moment-10',
    text: 'I cannot tell if I am weary from doing too much or empty from doing too little that actually matters.',
    mood: 'uncertain',
    authorId: 'user-leila',
    createdAt: NOW - 9 * HOUR,
    expiresAt: NOW + 15 * HOUR,
    position: { x: 55, y: 62 },
  },
  {
    id: 'moment-11',
    text: 'Carving a mortise joint by hand. When the chisel slides true, there is a physical snap of alignment that feels like answered prayer.',
    mood: 'grateful',
    authorId: 'user-idas',
    createdAt: NOW - 10 * HOUR,
    expiresAt: NOW + 14 * HOUR,
    position: { x: 74, y: 72 },
  },
  {
    id: 'moment-12',
    text: 'At 3 AM when the harbor tide turns, you hear the buoys groaning in cadence. Solitude has a pulse if you stop talking.',
    mood: 'reflective',
    authorId: 'user-tomas',
    createdAt: NOW - 11 * HOUR,
    expiresAt: NOW + 13 * HOUR,
    position: { x: 85, y: 55 },
  },
  {
    id: 'moment-13',
    text: 'A burst of laughter so sudden and unscripted that we both knocked our glasses of water across the sketchbook.',
    mood: 'joyful',
    authorId: 'user-maya',
    createdAt: NOW - 1.8 * HOUR,
    expiresAt: NOW + 22.2 * HOUR,
    position: { x: 22, y: 76 },
  },
  {
    id: 'moment-14',
    text: 'Packing books into cardboard boxes. Each spine is an archive of an earlier version of myself who believed different answers.',
    mood: 'reflective',
    authorId: 'user-ren',
    createdAt: NOW - 13 * HOUR,
    expiresAt: NOW + 11 * HOUR,
    position: { x: 42, y: 82 },
  },
  {
    id: 'moment-15',
    text: 'The restless urge to walk until the city runs out of concrete and dissolves into marsh grass and cold wind.',
    mood: 'restless',
    authorId: 'user-mateo',
    createdAt: NOW - 4.5 * HOUR,
    expiresAt: NOW + 19.5 * HOUR,
    position: { x: 65, y: 80 },
  },
  {
    id: 'moment-16',
    text: 'Realizing that not every friendship is meant to be permanent to have been completely sacred.',
    mood: 'reflective',
    authorId: 'user-elena',
    createdAt: NOW - 14 * HOUR,
    expiresAt: NOW + 10 * HOUR,
    position: { x: 12, y: 38 },
  },
  {
    id: 'moment-17',
    text: 'Tuning the cello after three weeks away. The first low C string vibration rattled the tea tin across the room like an old greeting.',
    mood: 'joyful',
    authorId: 'user-julian',
    createdAt: NOW - 6.5 * HOUR,
    expiresAt: NOW + 17.5 * HOUR,
    position: { x: 50, y: 12 },
  },
  {
    id: 'moment-18',
    text: 'Watching a mother teach her daughter how to skip stones. The stone skipped four times; the daughter raised both arms to the sky.',
    mood: 'grateful',
    authorId: 'user-soraya',
    createdAt: NOW - 15 * HOUR,
    expiresAt: NOW + 9 * HOUR,
    position: { x: 88, y: 18 },
  },
  {
    id: 'moment-19',
    text: 'Waking up with the distinct intuition that I am grieving a future that will never happen, and letting it dissolve with tea.',
    mood: 'uncertain',
    authorId: 'user-leila',
    createdAt: NOW - 16 * HOUR,
    expiresAt: NOW + 8 * HOUR,
    position: { x: 30, y: 30 },
  },
  {
    id: 'moment-20',
    text: 'The night train crossing the river trestle. In the dark windows, twenty strangers each reflected beside their own faint lantern light.',
    mood: 'reflective',
    authorId: 'user-tomas',
    createdAt: NOW - 17 * HOUR,
    expiresAt: NOW + 7 * HOUR,
    position: { x: 68, y: 32 },
  },
  {
    id: 'moment-21',
    text: 'I didn’t check the news until sunset. The sky was unchanged; the eucalyptus leaves still tasted the fog.',
    mood: 'grateful',
    authorId: 'user-kaelen',
    createdAt: NOW - 3 * HOUR,
    expiresAt: NOW + 21 * HOUR,
    position: { x: 78, y: 65 },
  },
  {
    id: 'moment-22',
    text: 'Tearing down a wall in the old brick shed and discovering hand-forged square nails from 1912. Someone gave a full afternoon to each one.',
    mood: 'reflective',
    authorId: 'user-idas',
    createdAt: NOW - 18 * HOUR,
    expiresAt: NOW + 6 * HOUR,
    position: { x: 15, y: 84 },
  },
  {
    id: 'moment-23',
    text: 'The restlessness of having so much kindness to give and wondering why modern architecture puts three deadbolts between neighbors.',
    mood: 'restless',
    authorId: 'user-clara',
    createdAt: NOW - 5 * HOUR,
    expiresAt: NOW + 19 * HOUR,
    position: { x: 36, y: 52 },
  },
  {
    id: 'moment-24',
    text: 'Hearing a brass quintet rehearsing in a basement grating while walking home in the dusk rain. Pure gold through iron bars.',
    mood: 'joyful',
    authorId: 'user-anouk',
    createdAt: NOW - 2.2 * HOUR,
    expiresAt: NOW + 21.8 * HOUR,
    position: { x: 58, y: 48 },
  },
  {
    id: 'moment-25',
    text: 'I have stopped needing to prove that I am busy. Today I sat on the porch step and watched an earthworm cross the brickwork.',
    mood: 'grateful',
    authorId: 'user-elena',
    createdAt: NOW - 19 * HOUR,
    expiresAt: NOW + 5 * HOUR,
    position: { x: 82, y: 86 },
  },
];

/**
 * Moments where the author has ALREADY secretly resonated with you!
 * When the current user resonates with any of these, it forms an instant MUTUAL RESONANCE reveal!
 */
export const SECRET_MUTUAL_MOMENT_IDS = [
  'moment-1', // Elena Vance
  'moment-3', // Mateo Morales
  'moment-6', // Maya Lin
  'moment-17', // Julian Thorne
  'moment-24', // Anouk De Jong
];

/**
 * Initial Constellation connections to populate the graph immediately (2 initial friends, room for up to 15)
 */
export const INITIAL_CONSTELLATION_USER_IDS = [
  'user-ren',
  'user-clara',
];
