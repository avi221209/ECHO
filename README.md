# ECHO — Social by Resonance, Not Reach

> *A frontend-only ambient social space built to reimagine human connection beyond broadcast feeds, metric vanity, and algorithmic engagement.*

---

## 🌅 Overview

**ECHO** is an exploration in slow, intentional, ambient social architecture. In conventional social platforms, human presence is flattened into reach, metrics, and algorithmic competition. ECHO replaces broadcasting with **ambient spatial presence**, public counters with **invisible resonance**, follower lists with an intimate **15-person Constellation**, and permanent surveillance archives with **ephemeral Slow Threads**.

Every interaction in ECHO is designed around a singular question:  
*What if social technology cultivated quiet depth rather than noisy expanse?*

---

## 💡 Problem & Solution

| Conventional Social Pattern | Why It Fails Human Connection | ECHO’s Reimagined Paradigm |
| :--- | :--- | :--- |
| **Algorithmic Feed & Infinite Scroll** | Maximizes dopamine capture, creates passive consumption, and prioritizes conflict or outrage. | **The Sky (Ambient Spatial Canvas)**: Exploration is spatial, non-linear, and unhurried. Moments drift like sunlight motes on linen. |
| **Public Likes, Counts & Upvotes** | Turns vulnerability into a popularity contest; breeds performative anxiety and metric obsession. | **Invisible Private Resonance**: Resonating with a moment is completely invisible to the author and the public—unless it becomes **mutual**. |
| **Follower Hoarding & Social Graph Bloat** | Encourages shallow networks where users accumulate thousands of strangers they never speak to. | **The Constellation (Hard Capped at 15)**: You can hold at most 15 connections. When full, it is framed not as a restriction, but as a deliberate state of intentional intimacy. |
| **Permanent Archiving & Digital Hoarding** | Traps people in static digital identities and past records. | **24-Hour Daylight Lifespan**: Moments naturally mature, fade in opacity, and dissolve with the morning light. |
| **Instant Chat Spam & Persistent Logs** | Creates artificial urgency, "seen" anxiety, and an archive of fragmented chatter. | **Slow Threads (Ephemeral Letters)**: Incoming letters dissolve into memory 45 seconds after being read. Presence is prioritized over archiving. |
| **Profile Photos & Aesthetic Vanity** | Anchors interaction in physical appearance and curated personal branding. | **Abstract Generative Avatars**: Deterministic harmonic SVG geometries based on seeds, reflecting interior coordinates rather than physical selfies. |

---

## ✨ Core Features

### 1. The Sky (Ambient Home Canvas)
- **Spatial Exploration**: Moments float organically across the viewport using Framer Motion with multi-axis easing and unique per-element floating durations (18s–32s).
- **Morning Light Dust Motes**: Soft translucent circular lights that breathe and react to touch and keyboard focus.
- **Shared Daily Prompt**: An ambient anchor banner at the top (e.g., *"What stillness did you encounter before the world woke up?"*) that can be gently whispered or rotated.
- **Spectrum Mood Filter**: Filter moments across five human moods (`Reflective`, `Joyful`, `Uncertain`, `Grateful`, `Restless`) without leaving the canvas.

### 2. Casting a Moment
- **Mindful Composing**: 180-character maximum with client-side sanitization preventing HTML injection.
- **Tactile Mood Selector**: Interactive physical watercolor/linen swatches rather than generic form dropdowns.
- **Visible Lifespan Horizon**: Previewing the 24-hour decay ring where moments softly fade in opacity as their lifespan matures.

### 3. Resonance Mechanic & Mutual Reveal
- **Private Heart Action**: Tapping "Resonate" is completely private. No visible counts are broadcast.
- **The Mutual Match Reveal**: When mutual resonance occurs (pre-seeded with authors like Elena Vance, Mateo Morales, and Maya Lin), the app triggers an emotional, luminous celebration:
  - Ambient golden light bloom and expanding water-ripple rings.
  - Generative abstract avatars drift from the horizon to align into a resonant orbit.
  - A real-time harmonic chord chime synthesized via the **Web Audio API**.
  - Immediate invitation into the Constellation and Slow Threads.

### 4. Personal Constellation Graph (Strict 15 Cap)
- **Interactive SVG Node-Graph**: Visualizes mutual connections orbiting around the user with glowing amber connecting threads (`#D4A857`).
- **Connection Story**: Inspect any node to view which moment catalyzed your mutual resonance and how long you have walked together.
- **Deliberate 15-Connection Completion State**: When at capacity (15), ECHO presents an intentional message:  
  *“Fifteen souls held in quiet focus. Depth chosen over infinite expanse.”*
- **Evaluator Tool**: Includes a one-click simulation button for hackathon evaluators to instantly experience the 15/15 cap state.

### 5. Slow Threads (Ephemeral Messaging)
- Direct communication reserved exclusively for mutual Constellation connections.
- **Ephemeral Mist Dissolution**: Incoming letters dissolve into memory **45 seconds** after being opened.
- Includes a live dissolution countdown and soft blur fading as words return to quiet stillness.
- Mindful 300-character letter length.

---

## 🎨 Design Identity: "Morning Light"

ECHO deliberately avoids the generic dark-mode "neon dots on black space" cliché typical of tech demos. Instead, it locks in the **Morning Light** aesthetic:

- **Theme Palette**:
  - **Base Background**: Soft warm linen and cream (`#FAF6EF`, `#F4ECE0`), echoing natural paper in morning daylight.
  - **Warm Resonance Accent**: Luminous amber/gold (`#D4A857`) representing mutual light and connection.
  - **Ambient Secondary**: Muted dusty lavender and sage (`#8B8FA3`, `#7C8E7D`) for quiet states.
  - **Ink Contrast**: Deep charcoal (`#23201C`, `#4A443D`) delivering **14.8:1 contrast ratio**, well exceeding WCAG AAA standards.
- **Typography Pairing**:
  - **Display / Moments**: **Newsreader** — a warm, editorial, literary serif with delicate italics that gives moments the gravity of literature.
  - **Interface / Body**: **Plus Jakarta Sans** — a clean, humanist geometric sans-serif ensuring crisp legibility.
- **Handcrafted Texture**:
  - Embedded SVG fractal noise overlay simulating organic paper grain.
  - Layered light glow shadows (`shadow-light-soft`, `shadow-parchment-elevated`) ensuring the design feels tangible and hand-crafted rather than flat template UI.

---

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS with custom Morning Light design tokens
- **Animations**: Framer Motion (multi-axis organic physics)
- **Icons**: Lucide React
- **Audio Engine**: Native Web Audio API harmonic chord synthesizer
- **State & Persistence**: Defensive `useLocalStorage` with schema validation and fallback error boundaries
- **Testing**: Vitest + React Testing Library + JSDOM
- **Quality**: ESLint + Prettier (zero warnings tolerance)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24.14)
- npm 9+

### Installation
```bash
# Clone or enter project directory
cd ECHO

# Install dependencies
npm install
```

### Environment Configuration
**Zero environment variables or backend configurations required.** ECHO is fully self-contained, using client-side mock engines and persistent localStorage.

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Verification & Testing
```bash
# Run unit and component test suite
npm test

# Run TypeScript typecheck
npx tsc --noEmit

# Run ESLint (zero-warning tolerance)
npm run lint

# Build production bundle
npm run build
```

---

## 🌐 Deployment

### Netlify
1. The repository includes `public/_redirects` with `/* /index.html 200` to support SPA routing.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel / Static Hosting
Works out of the box with Vite defaults. Set build command to `npm run build` and output directory to `dist`.

---

## 🧭 Evaluator Walkthrough

1. **Explore the Sky**:
   - Notice the soft sunlight motes drifting at varied speeds.
   - Filter by mood pills (`Reflective`, `Joyful`, etc.).
   - Press **Tab** on your keyboard to navigate between moments and hit **Enter** to open the floating parchment card.
2. **Trigger Mutual Resonance**:
   - Open the moment by **Elena Vance** (*"Watching the morning light slant across an unmade bed..."*).
   - Click **Resonate**.
   - Witness the **Mutual Resonance Reveal**: the harmonic chord chime sounds, avatars align into orbit, and Elena is welcomed into your Constellation!
3. **Inspect the Constellation**:
   - Switch to the **Constellation** view in the top navigation.
   - Observe the node graph with glowing amber connecting threads.
   - Click **Simulate Reaching 15/15 Cap (Evaluator Tool)** to inspect the intentional "Constellation Complete" state.
4. **Exchange a Slow Letter**:
   - Open **Slow Threads** from the header or from any connection node.
   - Open an incoming letter from **Ren Sato** or **Clara Oswald**.
   - Watch the 45-second countdown timer dissolve the letter into memory.
5. **Cast Your Own Moment**:
   - Click **Cast a Moment** in the header.
   - Type a short reflection, select a tactile mood swatch, and cast it into the ambient sky.

---

## 📜 Staged Commit History

All 10 required stages have been developed and committed sequentially:

1. `chore: project scaffold with design identity — Morning Light theme`
2. `feat: data model, types, and seeded mock content`
3. `feat: ambient Sky canvas with drifting moments`
4. `feat: cast a moment flow with mood selection and lifespan`
5. `feat: resonance mechanic with mutual-match reveal`
6. `feat: Constellation node-graph view for mutual connections`
7. `feat: Slow Threads ephemeral messaging between connections`
8. `a11y+perf: keyboard navigation, ARIA labels, contrast fixes, code splitting`
9. `test: unit and component test suite`
10. `docs: complete README with design rationale and deployment config`
