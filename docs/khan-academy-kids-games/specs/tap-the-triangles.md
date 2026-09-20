# Tap the triangles

## 1. Front matter

- **Entry type:** Math activity (game)
- **Catalogued entry:** [`tap-the-triangles.md`](../tap-the-triangles.md)
- **Official source:** [Khan Academy Blog — Free Kindergarten Math Games](https://blog.khanacademy.org/free-kindergarten-math-games) (accessed 2026-09-20)
- **Spec status:** v1 — follows template v1; mirrors `specs/toy-chest-with-five-socks.md`, not yet blind-built
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on

## 2. Overview and learning objective

The player hears "Tap all the triangles!" and sees a wooden toy chest holding a fixed set of shape
pieces. The player studies each piece and taps the triangles; every found triangle earns a check and
fills a pip on the prompt card, while tapping anything else gets a gentle, spoken naming of the
shape. The skill practiced is **shape recognition** — identifying a triangle regardless of size,
color, or rotation. Age band: **4–6 (Kindergarten per the official blog)**; pre-reader rules apply.
Expected session: **3–6 minutes** (all eight levels), or one or two levels in a short sitting.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Children find the triangles in a toy chest | official | Blog body: "Kids practice finding the triangles in the toy chest." |
| O2 | The activity is called "Tap the triangles" and the mechanic is tapping | official | Blog heading: "Tap the triangles" (catalogued entry notes the heading may not match the in-app name) |
| O3 | Subject is math — shapes / geometry; Kindergarten level | official | Catalogued entry + blog post "Free Kindergarten Math Games" |
| D1 | Chest has an open lid and a felt interior with a fixed slot grid of shape pieces | designed | Contents must be visible; a lid-and-interior build keeps the chest visually distinct from the socks drawers |
| D2 | Goal is to find **all** triangles per level, not one | designed | Blog says "the triangles" (plural); up to three taps give more recognition practice per round |
| D3 | Distractor set: circle, square, rectangle, oval, star; exact geometry in section 8 | designed | Canonical Kindergarten shapes; blog names only triangles |
| D4 | Rotated triangles still count; rotations in 30° steps at levels 5–8 | designed | Rotation invariance is core to shape recognition; bounded angles keep identity unambiguous |
| D5 | Distractors share the palette and slot size; every triangle's color also appears on a distractor | designed | Isolates shape as the only cue — neither color nor size can be used as a shortcut |
| D6 | 8 fixed levels; 3→8 items; 1→3 triangles; distractors introduced gradually | designed | Progression needed to build |
| D7 | Wrong tap = gentle reveal of the tapped shape's identity (wiggle, enlarged outline, spoken name) | designed | Never punishing; the reveal teaches shape names without removing progress |
| D8 | Prompt card shows a triangle pictogram plus one pip per triangle in the level | designed | Gives a non-reader a visible completion gauge without numerals |
| D9 | 12 s idle hint replays the target voice and bounces the hint arrow over the leftmost uncounted triangle | designed | Audio-first; deterministic hint target |
| D10 | Celebration, confetti, trophy, praise audio | designed | Buildability invention |
| D11 | Progress saved locally; levels unlock in order | designed | Session continuity without accounts |

## 4. Player experience / core loop

A child presses a big Play button. A wooden chest with its lid open slides in, holding three shapes:
a gold circle, a teal triangle, and a teal square. A card at the top shows a triangle pictogram with
one empty pip, and a voice says "Tap all the triangles!" The child taps the triangle; a gold outline
flashes, the piece lifts, a check pops above it, the pip fills, and the voice says "One triangle!"
Confetti falls and a voice cheers "You found all the triangles!" 2.5 s later the chest refills with
four pieces for level 2.

**Core loop:** hear/see the triangle prompt → scan the chest → tap every triangle → name-reveal on
misses → all found → celebration → next, fuller chest.

## 5. Mechanics and rules

- **FR-001** When the game loads, it shall show a title screen with a chest logo (≥96×96 CSS px) and one Play target (≥96×96 CSS px).
- **FR-002** When Play is pressed, the game shall start `playing(level = highestUnlocked)`: a prompt card (triangle pictogram + one pip per triangle, pips empty) and a chest containing exactly the items for that level in slot order (section 8).
- **FR-003** When a level starts, the game shall pop the prompt card in (150 ms) and speak `vo_target` ("Tap all the triangles!").
- **FR-004** When an **unfound triangle** is tapped, the game shall, in order: cancel the idle timer, flash the gold outline (200 ms), lift the piece (200 ms), stamp a check badge above it (200 ms), fill one pip on the card (150 ms), play `sfx_pop` + `vo_found_N` ("One triangle!" / "Two triangles!" / "Three triangles!"), and count the find. When that find is the last triangle, the game shall enter `celebrating`.
- **FR-005** When a **distractor** is tapped, the game shall enter `retrying(level, i)`: wiggle the piece (300 ms), white-flash it (150 ms in / 300 ms out), enlarge its outline to 1.4× for 1.5 s, play `sfx_soft_buzz` + `vo_wrong_shape` ("That's a circle. Look for triangles!"), and pulse the prompt card (300 ms). No progress is lost.
- **FR-006** When empty space is tapped — including the background, chest frame, and prompt card — no visual or audio state shall change; the tap only resets the idle timer.
- **FR-007** While `celebrating` or `complete`, shape taps shall be ignored; only HOME (all states) and Replay (`complete`) respond.
- **FR-008** The game shall have no fail state, no score, and no countdown: mis-taps, random taps, and idle time never remove a found triangle, never end a level, and never lock out a piece.
- **FR-009** When no tap (shape or empty) has occurred for 12 s, the game shall replay `vo_target` and loop a bounce animation of the hint arrow over the **leftmost uncounted triangle** (lowest slot row, then leftmost slot; ties impossible). The hint repeats every 12 s of continued idleness; any tap resets the timer.
- **FR-010** When HOME is pressed in any state, the game shall cancel any running timer (celebration 2.5 s, retry 1.5 s, idle 12 s), save, and show `title`. In `loading` HOME is inert (nothing is interactive).
- **FR-011** Edge cases:
  - Tapping an **already-found** triangle → found feedback replays at lower intensity (`vo_found_N` at 0.7, check badge pulses 300 ms); the find count and pips do not change.
  - Rapid double-tap on a distractor → `retrying` restarts; the reveal outline is visible 1.5 s from the second tap; the second voice clip cancels the first.
  - Double-tap on the last triangle → the first tap enters `celebrating`; the second is ignored per FR-007.
  - Two simultaneous touches → process sequentially in touch-down order; ties resolve to the leftmost shape, then the topmost.
  - Unfound triangle tapped while `retrying` another shape → FR-004 immediately; the retry outline fades out with the transition.
  - Viewport resize/rotation mid-level → reflow; slot boxes and hit areas rescale; found state preserved.
  - Repeated empty-space taps → FR-006 each time.
  - Rapid Play double-tap on `title` → only the first press starts a level.
- **FR-012** All instructions and feedback shall be understandable without reading: voice plus pictograms (triangle card, pips, check badges, hint arrow). Visible text is limited to the optional single words "Play" and "Replay".
- **FR-013** When the title chest logo is held for 3 s, the game shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and shows a checkmark pictogram (200 ms in, 800 ms hold, 200 ms out) with `sfx_tap`. Holding Enter/Space for 3 s on the focused logo behaves identically.
- **FR-014** Every interactive element (logo/reset, Play, HOME, each shape, Replay) shall carry an invisible accessible name (section 7); FR-012's text limit governs visible text only.

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank with soft background | initial state; preload assets |
| SC-02 | `title` | chest logo + Play target | audio unlocks on first gesture |
| SC-03 | `playing(level, found)` | prompt card + chest + HOME | main state; shapes interactive |
| SC-04 | `retrying(level, i, found)` | SC-03 + reveal outline on shape `i` | ≤1.5 s; shapes stay interactive |
| SC-05 | `celebrating(level)` | frozen chest + confetti + praise | auto-exits after 2.5 s |
| SC-06 | `complete` | trophy + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: show logo + Play |
| `title` | `PLAY_PRESSED` | not transitioning | `playing(highestUnlocked, 0)` | action: unlock audio; FR-002/003 |
| `title` | `RESET_HOLD` | hold ≥3 s on logo | `title` | action: ring fills during hold; clear save + memory; checkmark + `sfx_tap` |
| `playing` | `TRIANGLE_TAP(i)` | `i` not found | `playing(level, found+1)` | actions: FR-004; if last triangle, enter `celebrating` and save |
| `playing` | `SHAPE_TAP(i)` | `i` distractor | `retrying(level, i, found)` | actions: FR-005 |
| `playing` | `SHAPE_TAP(i)` | `i` already found | `playing(level, found)` | action: FR-011 replay; no count change |
| `playing` | `EMPTY_TAP` | — | `playing` | action: reset idle timer only |
| `playing` | `IDLE_12S` | no tap 12 s | `playing` | actions: FR-009 hint |
| `playing` | `HOME_PRESSED` | — | `title` | action: save |
| `retrying` | `RETRY_TIMEOUT` | 1.5 s elapsed | `playing(level, found)` | actions: fade outline + card pulse |
| `retrying` | `TRIANGLE_TAP(i)` | `i` not found | `playing(level, found+1)` | action: cancel retry timer; FR-004; maybe `celebrating` |
| `retrying` | `SHAPE_TAP(i)` | `i` distractor | `retrying(level, i, found)` | actions: FR-005; restart 1.5 s |
| `retrying` | `SHAPE_TAP(i)` | `i` already found | `retrying(level, i, found)` | action: FR-011 replay; no count change |
| `retrying` | `EMPTY_TAP` | — | `retrying` | action: reset idle timer only |
| `retrying` | `IDLE_12S` | no tap 12 s | `retrying` | actions: FR-009 hint |
| `retrying` | `HOME_PRESSED` | — | `title` | action: cancel retry timer; save |
| `celebrating` | `CELEBRATION_DONE` | level < 8 | `playing(level+1, 0)` | action: layout next level; FR-003 |
| `celebrating` | `CELEBRATION_DONE` | level = 8 | `complete` | actions: `vo_complete`; save |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel 2.5 s timer; save |
| `complete` | `REPLAY_PRESSED` | — | `playing(1, 0)` | action: fresh run; progress kept; FR-003 |
| `complete` | `HOME_PRESSED` | — | `title` | action: save |

**Tab order (v1):** `title` — logo → Play; `playing` / `retrying` — HOME → shapes in slot order 1→N (left→right, top→bottom); `celebrating` — HOME; `complete` — HOME → Replay; `loading` — none.

**HOME everywhere (v1):** HOME returns to `title` in every state, cancelling celebration, retry, and idle timers and saving first; it is inert in `loading`.

## 7. Input and interaction

- **Primary input:** single pointer tap/click anywhere inside a shape's hit area.
- **Hit areas:** a shape's hit area is the axis-aligned bounding box (AABB) of its rendered glyph — including any rotation — inflated by `max(12 × shapeScale, 8)` px per side and expanded symmetrically about its center to at least 64×64 CSS px (above the 44 px platform baseline because children are less accurate). Play/logo ≥96×96; HOME/Replay ≥64×64, HOME top-left with a 24 px margin.
- **Mis-tap tolerance:** taps within the inflation ring count as that shape. Where two hit areas overlap, the shape whose hit-area center is nearer to the tap wins; exact ties go to the leftmost shape, then the topmost.
- **Drag:** none used; no drag alternative needed.
- **Keyboard:** Tab moves focus in the order above; Enter/Space activates. Focus indicator: 4 px outline, ≥3:1 contrast against the felt interior.
- **Multi-touch:** per FR-011 (sequential, touch-down order, ties leftmost then topmost).
- **Instructions without reading:** spoken target + triangle pictogram card + pips; no text-only path.
- **Accessible names:** invisible names, e.g. Play = "Play"; logo = "Toy chest, hold three seconds to reset progress"; shape = "Triangle, slot 2 of 3, not found" / "Circle, slot 1 of 3" (shape name exposed so screen-reader users can play the recognition game; designed); prompt card = not interactive; HOME = "Home"; Replay = "Play again".

## 8. Levels and content data

Each shape renders centered in a slot box of 112×112 CSS px at `shapeScale` 1. Geometry:

| Shape | Rendered geometry (CSS px, at shapeScale 1) |
|---|---|
| Triangle (target) | equilateral, side 90, 6 px rounded corners, circumscribed circle ⌀104; keeps identity at any rotation |
| Circle | ⌀96 |
| Square | side 88, 6 px rounded corners |
| Rectangle | 104×68, 6 px rounded corners |
| Oval | 104×72 |
| Star | 5-point, outer radius 50, inner radius 20 |

- Rounded corners (6 px) do not change shape identity (designed). Distractors never rotate. Slots are numbered row-major 1→N, 3 columns (2 below 480 px viewport width), centered in the chest interior.

| Level | Items | Triangles (slot:rotation) | Distractors (slot:shape) | Fill colors, slot 1→N |
|---|---|---|---|---|
| 1 | 3 | 2:0° | 1 circle, 3 square | gold, teal, teal |
| 2 | 4 | 4:0° | 1 circle, 2 square, 3 rectangle | teal, gold, teal, gold |
| 3 | 4 | 1:0°, 4:0° | 2 circle, 3 square | coral, teal, coral, teal |
| 4 | 5 | 3:0°, 4:0° | 1 circle, 2 rectangle, 5 oval | teal, gold, coral, gold, coral |
| 5 | 5 | 2:30°, 5:330° | 1 star, 3 oval, 4 square | teal, gold, teal, gold, gold |
| 6 | 6 | 1:90°, 3:210°, 5:150° | 2 star, 4 circle, 6 rectangle | teal, gold, teal, teal, coral, coral |
| 7 | 7 | 2:60°, 5:300°, 7:120° | 1 oval, 3 square, 4 star, 6 circle | teal, gold, gold, coral, coral, blue, blue |
| 8 | 8 | 4:180°, 6:240°, 7:30° | 1 star, 2 rectangle, 3 circle, 5 oval, 8 square | teal, gold, coral, gold, teal, teal, coral, gold |

- **Rotation rule:** levels 1–4 triangles are upright (0°); levels 5–8 use the table's rotations in 30° multiples. A rotated triangle is tapped and counted exactly like an upright one. Rotations are about the slot-box center; the AABB used for hit-testing rotates with the glyph.
- **Color rule:** colors come from the fixed palette `teal`, `gold`, `coral`, `blue`, `green`. Within each level, every triangle's fill color also appears on at least one distractor, so color never cues the answer (levels 1–8 above).
- **Worked example (level 3):** the card shows a triangle pictogram and 2 empty pips; the voice says "Tap all the triangles!" The chest holds: slot 1 coral triangle 0°, slot 2 teal circle, slot 3 coral square, slot 4 teal triangle 0°. The child taps slot 2 (circle): wiggle, enlarged outline 1.5 s, "That's a circle. Look for triangles!", card pulses. The child taps slot 1: gold outline, lift, check badge, pip 1 fills, "One triangle!". The child taps slot 4: pip 2 fills, "Two triangles!", then celebration "You found all the triangles!" with confetti; 2.5 s later level 4 appears with five pieces.
- **Layout numbers:** top bar 144 px (HOME 64×64 at a 24 px margin; prompt card 120×120 centered). Chest width = min(640, viewportWidth − 64) px, ≥256 px. `columns` = 3 if viewportWidth ≥480, else 2. `columnPitch` = (chestWidth − 48 − (columns − 1) × 16) / columns. `rows` = ceil(items / columns). `shapeScale` = max(0.5, min(1, columnPitch / 112, (viewportHeight − 320) / (rows × 128))). Slot box = 112 × shapeScale px; row gap = 16 × shapeScale px; lid = 56 px. Glyphs scale with `shapeScale`. No scrolling is required at ≥320×480.
- **Randomization:** none. Item order, slots, shapes, rotations, and colors are fixed by the level table; identical every run.
- **Progression rule:** fixed, completion-gated (find every triangle in the level). No timer, no score, no adaptive difficulty.

## 9. Feedback, rewards, and audio cues

Effect definitions (reused by the FRs): **pop** scale 0→1 over 150 ms; **pulse** scale 1→1.08→1 over 300 ms; **lift** translateY 0→−8→0 over 200 ms; **wiggle** rotate 0→−6°→+6°→0 twice over 300 ms; **white flash** glyph overlay `#FFFFFF` at 0.2 opacity, in 150 ms / out 300 ms; **gold outline** a 6 px `#F2B84B` stroke at 0.9 opacity, fading over 200 ms; **outline enlarge** the glyph's white outline (4 px `#FFFFFF` stroke at 0.9 opacity) scaling 1→1.4 over 200 ms, hold 1.1 s, back over 200 ms (1.5 s total); **confetti** ≤40 particles falling over 600 ms in gold, teal, and coral; **check stamp** scale 1.4→1 with rotate −10°→0° over 200 ms; **pip fill** mini triangle scale 0→1 over 150 ms; **ring fill** SVG stroke-dashoffset 0→100% linear over 3 s; **bounce loop** translateY 0→−12→0 over 600 ms, repeating; **depress** scale 0.94 over 80 ms.

| Event | Visual | Audio |
|---|---|---|
| Level start | prompt card pops in (150 ms); pieces pop in staggered 60 ms left→right | `vo_target`, 1.0, one-shot |
| Triangle found | gold outline, lift, check stamp, pip fill | `sfx_pop` 0.7 + `vo_found_N` 1.0, one-shots |
| Found triangle re-tapped | check badge pulses (300 ms) | `vo_found_N` 0.7, one-shot |
| Distractor tapped | wiggle, white flash, outline enlarge (1.5 s), card pulse | `sfx_soft_buzz` 0.5 + `vo_wrong_shape` 0.9, one-shots |
| Empty tap | none | none |
| Idle 12 s | prompt card pulse + hint-arrow bounce loop over the leftmost unfound triangle | `vo_target`, 0.9, one-shot |
| Level complete | confetti + all found checks pulse | `sfx_chime` 0.8 + `vo_praise` 1.0, one-shots |
| Game complete (level 8) | trophy + full-screen confetti | `sfx_chime` 0.8 + `vo_complete` 1.0, one-shots |
| HOME / Play / Replay pressed | button depress 80 ms | `sfx_tap` 0.6, one-shot |
| Optional background | — | `music_loop` 0.15, loop |

Voice copy: `vo_target`: "Tap all the triangles!" `vo_found_1..3`: "One triangle!" / "Two triangles!" / "Three triangles!" `vo_wrong_shape` (one per distractor): "That's a circle. Look for triangles!" (square, rectangle, oval, star analogous) `vo_praise`: "You found all the triangles!" `vo_complete`: "You found every triangle in the toy chest!" No negative wording. Timbre, language, and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first user gesture (unlocked on Play, R-006); each new voice clip cancels the previous utterance; degradation — no speech synthesis → the enlarged outline, check badges, and pips carry play (R-011); no audio context → silent; storage blocked (throws/private mode) → run unsaved in memory. Background-tab timers may fire late; on `visibilitychange` to visible the game runs any expired timer (R-014) and never loses progress.

## 10. Progress and persistence

- **Storage class:** browser local storage. No network, no accounts.
- **Key:** `spec.triangles.v1`
- **Shape:** `{ "highestUnlocked": 1-8, "levelsCompleted": 0-8, "updatedAt": "<ISO-8601>" }`
- **Save points:** entering `celebrating` (level complete), entering `complete`, and any HOME press.
- **Unlock rule:** finishing level *n* saves `highestUnlocked = min(8, n + 1)` and `levelsCompleted = max(levelsCompleted, n)`; saved values never decrease.
- **Timestamps:** `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play resumes at `highestUnlocked` (level 1 on first run).
- **Reset:** hold the title logo 3 s → clear the key and in-memory progress and show the checkmark (FR-013); keyboard equivalent on the focused logo.
- **Deliberately not stored:** wrong-tap counts, per-level statistics, timings, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable when the row says so. The chest is a rounded-lid chest with a felt interior — distinct from the socks chest in lid, interior, and palette.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_room` | image | soft mint playroom backdrop, radial gradient, subtle dots | 1024×768 SVG | static | SVG gradient + circles |
| `chest_frame` | image | rounded-lid toy chest with open lid and teal felt interior panel | 640×520 SVG | static | SVG rounded rects |
| `shape_triangle` | image | equilateral triangle, side 90, 6 px rounded corners, flat fill | 112×112 SVG, scales | static, rotates | SVG polygon |
| `shape_circle` | image | circle, ⌀96 | 112×112 SVG | static | SVG circle |
| `shape_square` | image | square, side 88, 6 px rounded corners | 112×112 SVG | static | SVG rect |
| `shape_rectangle` | image | rectangle 104×68, 6 px rounded corners | 112×112 SVG | static | SVG rect |
| `shape_oval` | image | oval 104×72 | 112×112 SVG | static | SVG ellipse |
| `shape_star` | image | 5-point star, outer radius 50, inner radius 20 | 112×112 SVG | static | SVG polygon |
| `prompt_card` | image | cream card with triangle pictogram area and a pip row | 120×120 SVG | pop / pulse | SVG rect + polygon |
| `hint_arrow` | image | dark rounded arrow | 48×48 SVG | bounce loop | SVG path |
| `check` | image | green rounded check | 40×40 SVG | check stamp | SVG path |
| `trophy` | image | gold trophy on a base | 200×200 SVG | static | SVG shapes |
| `sfx_pop` | audio | bubble pop | 0.15 s, ogg/mp3 | one-shot | WebAudio blip |
| `sfx_soft_buzz` | audio | soft low boop (never a harsh buzzer) | 0.2 s | one-shot | WebAudio sine drop |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `sfx_tap` | audio | UI click | 0.08 s | one-shot | WebAudio blip |
| `vo_target` | audio | "Tap all the triangles!" | ≤2 s | one-shot | TTS allowed |
| `vo_found_1..3` | audio | "One triangle!" / "Two triangles!" / "Three triangles!" | ≤1.5 s each | one-shot | TTS allowed |
| `vo_wrong_circle..star` | audio | 5 clips: "That's a *shape*. Look for triangles!" | ≤2 s each | one-shot | TTS allowed |
| `vo_praise` | audio | "You found all the triangles!" | ≤2 s | one-shot | TTS allowed |
| `vo_complete` | audio | "You found every triangle in the toy chest!" | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop, 0.15 | may be omitted |

- **Palette tokens:** background `#EAF6F1`, wood `#C08A5A`, wood-dark `#96683F`, felt `#5D8A7A`, ink `#3E2C1E`, shape teal `#6FA8A0`, gold `#F2B84B`, coral `#E8804C`, blue `#6C9BD2`, green `#7BC47F`, success `#7BC47F`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); visible text optional ("Play", "Replay" only).
- **Load failure:** missing visual → draw a stub shape, log a warning, keep playing; missing audio → continue silently (R-011).

## 12. State and data shapes

| Name | Field | Type | Notes |
|---|---|---|---|
| `LevelConfig` | `level` | 1–8 | index into the section 8 table |
| | `items` | `{ slot: 1–8; shape: 'triangle' \| 'circle' \| 'square' \| 'rectangle' \| 'oval' \| 'star'; rotation: 0–330 in 30° steps; color: token; isTriangle: boolean }[]` | fixed order; 3–8 entries, of which 1–3 have `isTriangle` |
| | `triangleCount` | 1–3 | equals the pip count on the card |
| `SaveState` | `highestUnlocked` | 1–8 | resume point for Play |
| | `levelsCompleted` | 0–8 | max level completed |
| | `updatedAt` | string | ISO-8601, refreshed each save |
| `SessionState` (memory) | `state` | `loading \| title \| playing \| retrying \| celebrating \| complete` | section 6 |
| | `level`, `found`, `retryingSlot` | number, number, number? | current level; finds so far; retry target |
| | `idleTimer`, `retryTimer`, `celebrationTimer`, `hintLoop` | timer ids | cleared on HOME and transitions |

## 13. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector or raster sprites and rotate glyphs by arbitrary angles.
- **R-002** The game shall animate slides, scale pops, pulses, lifts, a nudge/wiggle, an outline flash, and a ≤40-particle burst.
- **R-003** When the player taps or clicks a target, the game shall hit-test the pointer event against shape AABBs that follow rotation, with ≥8 px edge inflation.
- **R-004** The game shall support keyboard focus and activation for all interactive targets, with a visible focus indicator.
- **R-005** The game shall play concurrent one-shot audio clips (sfx + voice) and may loop one music track at volume 0.15.
- **R-006** When the browser blocks audio before a user gesture, the game shall defer audio until the first interaction (Play) and shall not require sound to proceed.
- **R-007** The game shall persist and restore one small JSON save object in browser local storage, and shall run unsaved when storage is unavailable.
- **R-008** The game shall run offline with no network requests after initial load.
- **R-009** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-010** The game shall provide hit targets ≥64 CSS px and visible focus indicators.
- **R-011** When a voice clip or audio API fails, the game shall continue with visual feedback only.
- **R-012** The game shall scale from 768×1024 to 1366×768 viewports without losing state; no scrolling down to 320×480.
- **R-013** The game shall expose an invisible accessible name on every interactive element.
- **R-014** When the tab is backgrounded and timers are throttled, the game shall run any expired timer once visibility is restored and shall not lose progress.

## 14. Acceptance criteria

- **AC-01** Given a first load, When assets finish, Then the title screen shows a chest logo and a Play target.
- **AC-02** Given a first load, When Play is pressed, Then level 1 starts with a prompt card showing a triangle pictogram and 1 empty pip, a chest showing a gold circle (slot 1), a teal triangle (slot 2), and a teal square (slot 3), and the voice saying "Tap all the triangles!" (no audio may play before this gesture).
- **AC-03** Given saved progress at level 5, When Play is pressed, Then level 5 starts with 5 pieces including triangles rotated 30° and 330° in slots 2 and 5 (Play resumes at the highest unlocked level).
- **AC-04** Given level 1, When the circle is tapped, Then it wiggles, an enlarged outline shows for 1.5 s, "That's a circle. Look for triangles!" plays, the prompt card pulses, and level 1 remains playable.
- **AC-05** Given level 1, When the triangle is tapped, Then a gold outline flashes, the piece lifts, a check appears, the pip fills, "One triangle!" plays, confetti falls with "You found all the triangles!", and 2.5 s later level 2 appears.
- **AC-06** Given level 5, When the 30°-rotated triangle is tapped, Then it is counted as found exactly like an upright triangle.
- **AC-07** Given a found triangle, When it is tapped again, Then the find count and pips do not change and only one voice clip is audible at a time.
- **AC-08** Given a distractor tapped twice within 1 s, When the second tap lands, Then the enlarged outline stays visible 1.5 s from the second tap and the second voice clip cancels the first.
- **AC-09** Given simultaneous touches on a triangle and a distractor, When they land together, Then they are processed in touch-down order; on an exact tie the leftmost shape wins.
- **AC-10** Given level 1, When empty space is tapped, Then nothing on screen changes, no sound plays, and the idle timer resets.
- **AC-11** Given 12 s with no tap, When idleness continues, Then `vo_target` replays and the arrow bounces over the leftmost unfound triangle, any tap resets the timer, and no progress is lost.
- **AC-12** Given keyboard focus, When Tab reaches a shape and Enter is pressed, Then it behaves exactly as a tap.
- **AC-13** Given the celebration is playing, When HOME is pressed, Then the 2.5 s timer is cancelled, the save is written, and the title screen appears.
- **AC-14** Given level 8 completion, When celebration ends, Then the trophy screen appears and progress is saved.
- **AC-15** Given a saved game, When the page reloads and Play is pressed, Then play resumes at the highest unlocked level with the correct pieces.
- **AC-16** Given the title screen, When the logo is held 3 s, Then a progress ring is visible during the hold and the save is cleared on completion; the keyboard equivalent behaves the same.
- **AC-17** Given a mid-level resize from 1024×768 to 768×1024, When the viewport changes, Then the chest reflows, every shape's hit area stays ≥64×64 px, and found state is unchanged.
- **AC-18** Given a 320×480 viewport, When any level plays, Then no scrolling is needed and every shape remains tappable.
- **AC-19** Given five distractor taps in a row on level 1, When each lands, Then no score, loss, or level change occurs and the triangle remains tappable.
- **AC-20** Given speech synthesis is unavailable, When any level plays, Then the reveal outline, check badges, and pips still communicate all feedback and the game remains completable.
- **AC-21** Given the last unfound triangle in a level, When it is tapped twice quickly, Then the first tap enters the celebration and the second tap changes nothing on screen or in audio.
- **AC-22** Given the `complete` screen, When the chest area is tapped, Then nothing changes and only Replay and HOME respond.
- **AC-23** Given a screen reader, When focus moves to each interactive element in any state, Then it is announced by its invisible accessible name (names per section 7).

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. One full level completes end-to-end: card, chest, wrong-tap reveal, correct taps, pip fill, celebration, auto-advance.
3. Levels 1–8 run with the exact table values including rotations and colors; progress survives a reload and resets via the 3 s hold.
4. No fail state exists; every edge case in FR-011 behaves as specified.
5. Runs offline in a browser at 1024×768, 768×1024, and 320×480.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 8 levels; 3–8 pieces; 1–3 triangles | designed — official text states none of these |
| A2 | Rotated triangles count; 30° steps at levels 5–8 | designed |
| A3 | Rounded corners (6 px) do not change shape identity | designed |
| A4 | No distractor is congruent to a triangle (a congruent copy is itself a triangle and therefore a target); distractors match triangle size and share colors instead | designed |
| A5 | Accessible names expose shape names so screen-reader users can play | designed |
| A6 | TTS-generated voice clips are acceptable for the build | designed |
| A7 | Browsers block autoplay until the first gesture | platform fact — handled by R-006 |
| A8 | Background-tab timers may be throttled; hints and auto-advance fire late | known platform behavior — handled by R-014 |
| A9 | Storage may be unavailable (private mode); the game runs unsaved | platform fact — handled by R-007 |
| A10 | `speechSynthesis` voices may load asynchronously; the first clip may be delayed | platform fact — visual feedback is independent |
| A11 | The blog heading may differ from the in-app activity name | catalogued entry note |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** level table values (slots, shapes, rotations, colors), shape geometry, rotation-counts rule, color-never-cues rule, correct/wrong feedback semantics, no fail state, hit-target minimums, save key and shape, original-asset rule, acceptance criteria.
- **Free:** exact composition within the layout numbers, easing curves, particle specifics, voice timbre/TTS engine, optional music, whether Play/Replay show words or glyphs, felt texture, chest decoration within palette tokens.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics, scoring or adaptive difficulty, teacher tooling.
- **Conditional sections:** 6 (screens and states), 11 (assets), and 12 (state and data shapes) are included; none omitted.
