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
| **Algorithmic Feed & Infinite Scroll** | Maximizes dopamine capture, creates passive consumption, and prioritizes conflict or outrage. | **The Sky (Ambient Spatial Field)**: Exploration is spatial, non-linear, and unhurried. Moments drift like sunlight motes on linen. |
| **Public Likes, Counts & Upvotes** | Turns vulnerability into a popularity contest; breeds performative anxiety and metric obsession. | **Invisible Private Resonance**: Resonating with a moment is completely invisible to the author and the public—unless it becomes **mutual**. |
| **Follower Hoarding & Social Graph Bloat** | Encourages shallow networks where users accumulate thousands of strangers they never speak to. | **The Constellation (Hard Capped at 15)**: You can hold at most 15 connections. When full, it is framed not as a restriction, but as a deliberate state of intentional intimacy. |
| **Permanent Archiving & Digital Hoarding** | Traps people in static digital identities and past records. | **24-Hour Daylight Lifespan**: Moments naturally mature, fade in opacity, and dissolve with the morning light. |
| **Instant Chat Spam & Persistent Logs** | Creates artificial urgency, "seen" anxiety, and an archive of fragmented chatter. | **Slow Threads (Ephemeral Letters)**: Incoming letters dissolve into memory 45 seconds after being read. Presence is prioritized over archiving. |
| **Profile Photos & Aesthetic Vanity** | Anchors interaction in physical appearance and curated personal branding. | **Abstract Generative Avatars**: Deterministic harmonic SVG geometries based on seeds, reflecting interior coordinates rather than physical selfies. |

---

## ✨ Core Features

### 1. The Sky (Ambient Spatial Field)
- **Ambient Light Field**: Moments are rendered not as flat circles, but as layered translucent elliptical glows with subtle particle drift and deterministic behavior based on their unique ID (drift direction, speed, scale, opacity, orbit tendency).
- **Resonance Distance Physics**: Moments respond to pointer proximity with gentle physical repulsion and attraction, communicating social proximity without displaying numbers, likes, or counters.
- **Attunement Interaction**: Replaces click-to-open with a gradual attunement progression (pointer approach → clarity → moment text legible → author identity manifests → secondary actions emerge).
- **Shared Daily Prompt**: An ambient anchor banner at the top (e.g., *"What stillness did you encounter before the world woke up?"*) that can be gently whispered or rotated.
- **Spectrum Mood Filter**: Filter moments across five human moods (`Reflective`, `Joyful`, `Uncertain`, `Grateful`, `Restless`) without leaving the canvas.

### 2. Casting a Thought (Physical Release)
- **Mindful Composing**: 180-character maximum with client-side sanitization preventing HTML injection.
- **Tactile Mood Selector**: Interactive physical watercolor/linen swatches; the ambient environment subtly inherits the selected mood's hue.
- **Physical Release Sequence**: The composition lifts from the card, compresses into a luminous parchment signal, travels into The Sky, and gently settles into its drifting coordinates.

### 3. Resonance Mechanic & Hero Mutual Resonance
- **Custom Resonance Glyph**: Replaces conventional heart/like icons with dual harmonic opposing arcs creating an acoustic field.
- **Private Signal**: Resonating sends an invisible signal into the atmosphere with zero public counters.
- **Hero State Transition**: When mutual resonance occurs, the interface enters a hushed, cinematic multi-phase sequence:
  - Selected moment releases a warm pulse.
  - A second pulse travels across the sky from the responding author.
  - Both pulses converge, ambient particles align, and the two abstract avatars synchronize into orbit.
  - Displays: *“Something here answered back.”* → *“Your resonance is mutual.”*
  - Harmonic chord chime synthesized via the native **Web Audio API** (with silent fallback and `prefers-reduced-motion` compliance).

### 4. Personal Constellation (Relationship Memory Field)
- **Living Curved Threads**: Living undulating threads connecting each soul, with intensity reflecting connection maturity rather than popularity.
- **Memory Narrative**: Selecting a connection highlights their thread and traces it back visually to the catalyst Moment that sparked the bond.
- **Philosophical 15-Cap Experience**: When full, the outer perimeter illuminates into a completed orbital circle, displaying:  
  *“Fifteen people can stay close here. Depth has a boundary.”*

### 5. Slow Threads (Letter Fragments on Paper)
- Direct letters reserved exclusively for mutual Constellation connections.
- **Visual Ink Dissolution**: Incoming letters dissolve into memory **45 seconds** after being opened. The timer is communicated visually through opacity, soft blur, and ink dispersion rather than a noisy countdown badge.
- Leaves a gentle memory trace: *“That moment has passed into memory.”*

### 6. Evaluator Quick Suite (`Ctrl + Shift + E`)
- A discreet testing dashboard for hackathon evaluators to test complex states instantly:
  - Trigger Mutual Resonance Reveal with Elena Vance
  - Simulate Full Constellation (15/15)
  - Trigger Dissolving Letter Demo
  - Reset to Seed Prototype State

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
   - Click **Resonate quietly**.
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
