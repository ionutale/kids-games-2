# Stack decision — how the games get built

Decided 2026-09-21 (wayfinder ticket 15, two grilling rounds). Evidence base: the platform
requirements digest at `../../.scratch/kids-games-specs/research/platform-requirements-digest.md`
(535 requirement entries extracted from all 38 specs). Scope: the **per-game runtime only** — the
platform/app shell (navigation, profiles, parental controls, offline packaging) stays out of scope.

## The decision

1. **Rendering — DOM + inline SVG + CSS/WAAPI; canvas only for ink.** Games render as DOM
   documents with inline SVG art; animation runs on CSS transitions/keyframes and the Web
   Animations API. Freehand ink (drawing-and-coloring, storytelling, letter-tracing,
   trace-the-number-six) renders on a `<canvas>` layer in the spec's artwork units (1024×768) with
   an inverse transform for input. No WebGL, no game engine.
2. **Audio — Web Audio API + `speechSynthesis`.** Sfx, capped music loops, runtime melody
   synthesis, ducking, and the numeric mix all run on Web Audio. Voices use `speechSynthesis`
   (one utterance per line; word-boundary events where the specs need highlighting — read-to-me,
   sight-words — with the specs' fallback pacing); provided clip files remain an optional
   override. Degradation is exactly as specced: skip a failed clip, visual-only without speech,
   silent without an AudioContext.
3. **Language and build — vanilla ES modules, static files, no build step, no dependencies.**
   Each game is `<script type="module">` + plain CSS + SVG, served statically (ES modules require
   a static server, not `file://`).
4. **Input — Pointer Events + Keyboard.** `pointerdown/move/up/cancel`, `getCoalescedEvents` for
   ink, keyboard bindings per spec; the per-spec arbitration rules (first-pointer-wins, holds,
   throttles, empty-tap behavior) are implemented as written.
5. **Persistence — per-spec localStorage JSON keys** (`spec.*.v1`) exactly as specced, with
   `updatedAt`, blocked-storage degradation to an in-memory run, and no network after load.
   IndexedDB is used only by storytelling for audio blobs (52 clips / 14 MB).
6. **Progress — per-spec models, no cross-game state.** Each spec owns its key and its resume
   behavior; there is no shared path/mastery layer.
7. **Packaging — one self-contained directory per game:**
   `games/<slug>/{index.html, styles.css, game.js, assets/}`. No cross-game imports; assets are
   local to the game.

## Alternatives considered and trade-offs

| Area | Chosen | Alternatives | Why / accepted trade-off |
|---|---|---|---|
| Rendering | DOM + SVG, canvas for ink | Canvas 2D everywhere; game engine; WebGL | 38/38 specs require focus + invisible accessible names on every element — native in DOM, hand-built on canvas. SVG covers vector art; the canvas layer covers only strokes. Cost: two rendering paths in ~4 specs. |
| Audio | Web Audio + `speechSynthesis` | Pre-rendered voice clips only; synthesis without boundary sync | One runtime for all 38; boundary sync preserved where specced. Cost: TTS voice varies by platform — accepted as build freedom in every spec. |
| Language/build | Vanilla ES modules, no build | TypeScript + Vite; light framework | Matches the pilot and the specs' LLM-buildability. Cost: no type checking; conventions are duplicated per game by design. |
| Input | Pointer Events + Keyboard | Touch events + mouse fallback | One unified model for touch/mouse/pen; coalesced events serve the ink specs. |
| Progress | Per-spec keys only | Unified cross-game layer | Respects the charted no-shared-kernel settlement; no spec describes a unified model. Cost: no cross-game mastery view (a shell-scoped decision if ever wanted). |
| Packaging | Self-contained dir per game | Shared helper folder | Keeps each spec independently buildable and deployable. Cost: small utilities are duplicated per game. |

## Spec ↔ stack mapping

| Spec requirement (from the digest) | Stack answer |
|---|---|
| 2D vector scene/art foundation (38/38) | Inline SVG + DOM |
| Particles/confetti/sparkles (28/38) | DOM/SVG elements animated with WAAPI, caps per spec |
| Rendered text/numerals (28/38) | DOM text; invisible accessible names where text must not be visible |
| Data-driven stages/timelines, one clock per spec (18/38) | JS data records + the spec's clock; no per-item code |
| Freehand ink + 2048×1536 PNG export (drawing, storytelling) | Canvas layer; download / Web Share file sheet; export forbidden in earth-day |
| Drag/stroke/swipe with coalesced events (7/38) | Pointer Events with capture + `getCoalescedEvents` |
| Pointer-concurrency arbitration (9/38) | Per-spec rules (first/earliest wins, ignore extra contacts) |
| Microphone capture + playback + IndexedDB blobs (storytelling) | `getUserMedia`/`MediaRecorder` + IndexedDB; the only permission in the library |
| Runtime melody synthesis from note data (songs×3) | Web Audio scheduling; ducking envelope |
| TTS word-boundary sync + fallback pacing (read-to-me, sight-words) | `speechSynthesis` boundary events; fallback when unavailable |
| Card flips, pose figures, pacers, stroke reveals | CSS transforms/keyframes; SVG path animation |
| Deterministic content (7/38) | Fixed data records; no `Math.random` in those specs |
| 320×480 support / no-scroll layouts (15/38) | CSS layout per each spec's breakpoints |
| 3 s continuous holds with ring feedback (7/38 + reset in all) | Pointer/keyboard timing per spec |
| Numeric volumes, caps 0.15–0.25, ducking (24/38 music; 11/38 ducking) | Web Audio gain nodes and envelopes |
| Pictogram-only UI (3/38) | Art + voice; DOM accessible names carry meaning |
| No fail state / no scoring (design-universal) | Design rule carried through every build |
| ≥30 fps, target 60 at 1024×768 (38/38) | DOM/SVG + WAAPI meets this; canvas confined to ink specs |
| Offline after load, no accounts (38/38) | Static assets; per-spec localStorage only |

## Conformance and fog resolutions

- **Conformance pass:** not needed as a ticket. The stack matches the specs' existing Requirements
  language and covers every named exception; the mapping above is the binding record. The 38 specs
  are unchanged.
- **Cross-game leveling/progress unification:** resolved — per-spec keys only; revisit only if an
  app shell is ever planned (then it becomes a shell-scoped decision).
- **The pilot** (`games/count-the-ice-cream-cones/`) already conforms (vanilla, no build,
  DOM/CSS/JS) and is not retro-bound.

## Consequences for future builds

- Each spec is buildable to one static directory with no toolchain — an LLM can build from the
  spec plus this document alone.
- There is no shared runtime to version; duplicated conventions across games are expected and
  accepted.
- Browser target: current evergreen browsers with Pointer Events, Web Audio, `speechSynthesis`,
  `localStorage`, and (storytelling only) `getUserMedia`/IndexedDB.
