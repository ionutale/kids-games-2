# How many marbles?

## 1. Front matter

- **Entry type:** Math activity (game)
- **Catalogued entry:** [`how-many-marbles.md`](../how-many-marbles.md)
- **Official source:** [Khan Academy Blog — Free Kindergarten Math Games](https://blog.khanacademy.org/free-kindergarten-math-games) — "How many circles are there? kids tap each one and watch the quantity grow."
- **Spec status:** v1 — follows template v1; not yet blind-built
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; no network after load

## 2. Overview and learning objective

A tray of circles sits on screen. The player taps each circle; it rolls into a glass jar and the big
numeral above the jar grows by one and is spoken aloud. When every circle is in the jar, the game
asks and answers the title question with the total. The skill is **quantifying / cardinality** — the
last number reached *is* how many. Age band: **4–6 (Kindergarten per the official blog)**. Expected
session: **4–8 minutes** (ten levels) or one to three levels in a short sitting.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | The player taps each circle, one at a time | official | Blog: "kids tap each one" |
| O2 | The quantity visibly grows as the child counts | official | Blog: "watch the quantity grow" |
| O3 | The activity poses the question "How many circles are there?" | official | Blog framing line |
| O4 | Positioned for Kindergarten, counting and number sense | official | Catalogued entry; blog is "Free Kindergarten Math Games" |
| D1 | Circles are rendered as glossy marbles on a wooden tray | designed | Entry title says marbles, blog says circles — one concrete object needed |
| D2 | Each tapped marble rolls into a jar; a large numeral counter grows from 0 to N | designed | Makes "the quantity grows" observable and countable |
| D3 | Ten levels; level *n* shows exactly *n* marbles in a fixed arrangement | designed | Progression needed to build; max 10 chosen as the Kindergarten counting benchmark (A1) |
| D4 | Celebration asks "How many marbles?" then answers with the total | designed | Turns O3 into a spoken, observable round ending |
| D5 | No fail state; idle triggers a deterministic halo hint | designed | Research: never punishing; audio-first for non-readers |
| D6 | Progress saved locally; levels unlock in order; reset by 3 s hold | designed | Session continuity without accounts; template v1 rule |
| D7 | All art, colors, audio, and animations | designed | Buildability invention |

## 4. Player experience / core loop

A child presses Play. Three marbles sit in a tray, the jar is empty, and the numeral reads "0". They
tap a marble: it tumbles along a short path and drops into the jar with a clink; the numeral flips to
"1" and a voice says "one". Two more taps fill the jar. The jar glows and the voice asks, "How many
marbles? Three marbles!" A chime plays, and 2.5 s later the next level slides in with one more
marble.

**Core loop:** see circles → tap each one → marble rolls into jar + numeral grows + spoken count →
total celebrated as the answer → next level.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the game loads, it shall show a title screen with one Play target (≥96×96 CSS px). |
| FR-002 | When Play is pressed, the game shall start at the highest unlocked level: level *n* shows exactly *n* marbles (1 ≤ n ≤ 10) on the tray in the arrangement for *n* (section 8), an empty jar, and the numeral display reading "0". |
| FR-003 | When an **uncollected** marble is tapped, the game shall mark it collected at tap-down and then, in order: roll it (section 9) to the next free jar slot, increment the numeral to the next count in sequence (first tap → 1), play the count pop, play `sfx_marble`, and speak the counted number. Counting follows tap order, not screen position. |
| FR-004 | A collected marble shall not be interactive: it renders inside the jar with no hit area and cannot be tapped again; no replay control exists. |
| FR-005 | When empty space (background or tray) is tapped, no state shall change (no sound, no count); the idle timer resets. |
| FR-006 | When the last marble is collected, the game shall enter celebration: the jar glows, the numeral pulses, `sfx_chime` plays, and the voice asks and answers the total ("How many marbles? *N* marbles!"). |
| FR-007 | When celebration ends (2.5 s), the next level shall start automatically; after level 10 the completion screen shall appear instead. |
| FR-008 | The game shall have no fail state: mis-taps, empty taps, jar taps, and idle time never remove collected marbles, never end a level, and never block progress. |
| FR-009 | When no tap has occurred for 12 s during play, the game shall replay `vo_instruction` and show a pulsing halo (section 9) around the **first uncollected marble in reading order** (topmost row; left→right within a row); the hint repeats every 12 s of continued idleness. Any tap, including an empty-space tap, resets the timer. |
| FR-010 | When HOME is pressed, the game shall return to the title screen and keep progress. HOME is available in `playing`, `celebrating` (cancelling the 2.5 s timer), and `complete`, and always saves first (v1). On `title` and `loading` no HOME control is rendered; a HOME press there is a no-op because title is home. |
| FR-011 | Edge cases (all hold in every state): rapid double-tap on one marble → it is collected at tap-down, the second tap is a no-op (FR-004), and the count increments once. Two simultaneous touches on two marbles → sequential processing in touch-down order; ties left-to-right in reading order. Resize/rotation mid-level → reflow per section 8; collected count, numeral, and jar slots preserved. Taps during celebration other than HOME → ignored. No input at all → FR-009 after 12 s. Tab backgrounded mid-level → collection state persists; idle hints may fire late (A7). |
| FR-012 | All instructions and feedback shall be understandable without reading; visible text is limited to numerals (the content), the single word of the title, and pictograms (Play triangle, HOME house, tap-hand). |
| FR-013 | When the title logo is held for 3 s, the game shall fill a visible progress ring for the hold duration; on completion it clears the save and in-memory progress and plays a ring flash plus `sfx_soft_tap`. Holding Enter/Space for 3 s on the keyboard-focused logo behaves identically (v1). |
| FR-014 | Every interactive element (logo/reset, Play, HOME, each marble) shall carry an invisible accessible name; FR-012's text limit governs visible text only (v1). |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial state; preload assets; audio locked |
| `title` | logo + Play target | audio unlocks on first user gesture here |
| `playing(n, nextCount, collected)` | tray + marbles + jar + numeral + HOME | main state, n = 1…10 |
| `celebrating(n)` | frozen tray + glowing jar + praise | auto-exits after 2.5 s |
| `complete` | trophy + full jar + Replay + HOME | terminal state until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `playing(highestUnlocked)` | entry: unlock audio, speak `vo_instruction`, show tap-hand pictogram 2 s |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | entry: fill progress ring; action: clear save + in-memory progress, ring flash + `sfx_soft_tap` |
| `playing` | `MARBLE_TAP(uncollected)` | `nextCount ≤ n` | `playing` | actions: FR-003 roll, numeral, count pop, `sfx_marble`, `vo_number_N` |
| `playing` | `MARBLE_TAP(collected)` / `JAR_TAP` | — | `playing` | none |
| `playing` | `EMPTY_TAP` | — | `playing` | none; resets idle timer |
| `playing` | `ALL_COLLECTED` | `nextCount > n` | `celebrating(n)` | actions: FR-006; save progress |
| `playing` | `IDLE_12S` | no tap 12 s | `playing` | actions: FR-009 halo + `vo_instruction` |
| `playing` | `HOME_PRESSED` | — | `title` | action: save |
| `celebrating` | `CELEBRATION_DONE` | `n < 10` | `playing(n+1)` | action: layout next level; numeral resets to "0" |
| `celebrating` | `CELEBRATION_DONE` | `n = 10` | `complete` | action: save |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel timer, save |
| `complete` | `REPLAY_PRESSED` | — | `playing(1)` | action: fresh run, progress kept |
| `complete` | `HOME_PRESSED` | — | `title` | action: save |

**Tab order (v1):** title — logo → Play; playing — HOME → marbles in reading order (top row
left→right, then next row); complete — HOME → Replay.

## 7. Input and interaction

- **Primary input:** single pointer tap / click inside a marble's hit area.
- **Hit areas:** each marble ≥ **72×72 CSS px** at viewports ≥1024 px wide, ≥ **64×64 CSS px** at
  768–1023 px (above the 44 px platform minimum because children are measurably less accurate);
  Play ≥96×96; HOME ≥64×64, placed top-left with a 24 px margin.
- **Drag:** none used; no drag alternatives needed.
- **Keyboard:** Tab moves focus across HOME → marbles (reading order) → Play; Enter/Space
  activates. Focus indicator: 4 px outline, ≥3:1 contrast against background.
- **Mis-tap tolerance:** taps within **12 px** of a marble's edge still count as that marble.
  Overlapping hit areas: nearest center wins; exact ties resolve to the leftmost (then topmost)
  marble.
- **Multi-touch:** handled per FR-011 (sequential, touch-down order).
- **Instructions without reading:** spoken voice + tap-hand pictogram + halo; no text-only path.
- **Accessible names:** every interactive element carries an invisible accessible name for
  assistive technology (FR-014); visible text remains limited per FR-012.

## 8. Levels and content data

| Level | Marbles | Rows (top→bottom) | Marble colors (fixed 5-cycle, reading order) | Progression |
|---|---|---|---|---|
| 1 | 1 | 1 | blue | complete → level 2 |
| 2 | 2 | 2 | blue, red | complete → level 3 |
| 3 | 3 | 1+2 (triangle) | blue, red, yellow | complete → level 4 |
| 4 | 4 | 2+2 | blue, red, yellow, green | complete → level 5 |
| 5 | 5 | 2+3 | blue, red, yellow, green, purple | complete → level 6 |
| 6 | 6 | 3+3 | cycle repeats | complete → level 7 |
| 7 | 7 | 3+4 | cycle repeats | complete → level 8 |
| 8 | 8 | 4+4 | cycle repeats | complete → level 9 |
| 9 | 9 | 3+3+3 | cycle repeats | complete → level 10 |
| 10 | 10 | 5+5 | cycle repeats | complete → `complete` screen |

- **Worked example (level 4):** four marbles in a 2×2 grid. The child taps bottom-right first →
  numeral "1", voice "one", that marble rolls into jar slot 1 (bottom-left). Then top-left → "2",
  top-right → "3", bottom-left → "4". Jar holds four marbles; celebration: "How many marbles? Four
  marbles!" 2.5 s later level 5 appears (2+3).
- **Jar slots:** 10 positions inside the jar, filled in collection order: 2 columns × 5 rows,
  bottom row first, left→right within a row.
- **Randomization:** none. Layouts, colors, slot order, and level order are deterministic.
- **Progression rule:** fixed and completion-gated (fill the jar). No timer, no score gating; the
  next level starts 2.5 s after the final tap.
- **Layout breakpoints (numbers, v1):** at viewport width ≥1024 px, rows render as in the table,
  marble diameter 72 px, gap 24 px, jar 300×420 px, numeral ≥160 px. At 768–1023 px, rows wrap to
  ≤4 per row preserving reading order (level 10 → 4+4+2; level 7 stays 3+4), marble diameter 64 px,
  gap 16 px, jar 240×340 px, numeral ≥120 px. Height ≥700 px; below that, scale the whole play
  field by 0.85 and keep all hit areas ≥64 px.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Marble collected (new) | roll 200 ms; count pop 180 ms | `sfx_marble` — 0.9 — one-shot; `vo_number_N` — 1.0 — one-shot |
| Collected marble / jar tapped | none | none |
| Empty tap | none | none |
| Level complete | jar glow 1.2 s; numeral pulse 1.25× 600 ms | `sfx_chime` — 0.8 — one-shot; `vo_answer_N` — 1.0 — one-shot |
| Game complete (level 10) | trophy + sparkle burst ≤30 particles, 600 ms | `sfx_chime` — 0.8 — one-shot; `vo_complete` — 1.0 — one-shot |
| Idle hint (FR-009) | halo pulse 1 Hz on first uncollected marble | `vo_instruction` — 1.0 — one-shot |
| HOME / Play pressed | depress 80 ms | `sfx_tap` — 0.7 — one-shot |
| Reset hold completed | progress ring fills over the hold; ring flash 300 ms | `sfx_soft_tap` — 0.7 — one-shot |
| Optional background music | none | `music_loop` — 0.25 — loop |

**Effect definitions (v1, no undefined effects):** *roll* = translate a marble along a straight
200 ms path to its jar slot with 90° rotation. *Count pop* = numeral scales 1→1.15→1 over 180 ms.
*Halo* = a 6 px accent ring around one marble, scale 1.0→1.15 at 1 Hz for 3 pulses. *Jar glow* = a
warm 8 px outline around the jar fading out over 1.2 s. *Sparkle burst* = ≤30 four-point star
particles moving ≤80 px outward over 600 ms. *Ring flash* = progress-ring opacity 1→0 over 300 ms.
*Depress* = button scales 1→0.95→1 over 80 ms.

`vo_instruction` copy: "Tap each circle and count how many marbles." `vo_answer_N` copy: "How many
marbles? *N* marbles!" `vo_complete` copy: "Amazing! Ten marbles!" Exact voice, timbre, and language
are build freedom (must include the total).

**Audio rules (v1):** no audio before the first user gesture (R-006); each new voice clip cancels the
previous utterance; missing APIs degrade gracefully — no speech synthesis → visual only, no
AudioContext → silent, storage blocked → run unsaved. Background-tab timer throttling may delay idle
hints but never loses progress (A7).

## 10. Progress and persistence

- **Storage class:** browser local storage. No network, no accounts.
- **Key:** `spec.marbles.v1`
- **Shape:** `{ "highestUnlocked": 1-10, "levelsCompleted": 0-10, "updatedAt": "<ISO-8601>" }`
- **Save points:** on level completion and on HOME pressed. `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play resumes at `highestUnlocked` (level 1 on first load).
- **Reset:** hold the title logo 3 s (ring feedback) → clears the key and in-memory progress.
  Keyboard equivalent: hold Enter/Space 3 s on the focused logo.
- **Deliberately not stored:** per-tap data, timings, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable
(SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_room` | image | soft sky-blue backdrop with faint dots; palette below | 1024×768 SVG | static | SVG gradient + circles |
| `tray` | image | rounded wooden tray, warm tan | 640×480 SVG | static | SVG rounded rect + grain lines |
| `jar` | image | clear glass jar, 2×5 slot grid etched faintly | 300×420 SVG | static | SVG rounded rect + 10 slot guides |
| `marble_1..5` | image | glossy circles: blue `#6FA8DC`, red `#E06666`, yellow `#FFD966`, green `#93C47D`, purple `#8E7CC3` | 96×96 SVG each | static | SVG circle + highlight |
| `pict_tap_hand` | image | white tapping-hand pictogram | 64×64 SVG | shown 2 s at level start, then hidden | SVG path |
| `halo` | image | 6 px accent ring | 96×96 SVG | 3 pulses per hint | SVG circle stroke |
| `trophy` | image | simple gold cup | 200×200 SVG | static | SVG path |
| `sfx_marble` | audio | short glass clink | 0.15 s, ogg/mp3 | one-shot | WebAudio blip |
| `sfx_tap` | audio | UI click | 0.08 s | one-shot | WebAudio blip |
| `sfx_soft_tap` | audio | muted tap | 0.10 s | one-shot | WebAudio blip |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `vo_instruction` | audio | "Tap each circle and count how many marbles." | ≤3 s | one-shot | TTS allowed |
| `vo_number_1..10` | audio | spoken numbers one–ten | ≤1 s each | one-shot | TTS allowed |
| `vo_answer_1..10` | audio | "How many marbles? *N* marbles!" | ≤2.5 s each | one-shot | TTS allowed |
| `vo_complete` | audio | "Amazing! Ten marbles!" | ≤2 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.25 | may be omitted |

- **Palette tokens:** background `#EAF4FB`, ink `#2F4858`, accent `#6FA8DC`, warm `#F4A261`,
  success `#7BC47F`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); numerals ≥160 px at
  1024×768; the word "Play" optional (glyph + spoken cue carry meaning).
- **Load failure:** missing visual asset → draw stub shape, log a warning, keep playing; missing
  audio → continue silently (R-011).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `LevelConfig` | `level: int 1-10`; `marbles: int` (= level); `rows: int[]`; `colors: string[5]` (fixed cycle); `jarSlots: {x: int, y: int}[10]` (precomputed, collection order) |
| `Save` (persisted) | `highestUnlocked: int 1-10`; `levelsCompleted: int 0-10`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, playing, celebrating, complete}`; `level: int`; `nextCount: int`; `collectedIds: int[]`; `hintTimer: id`; `celebrateTimer: id` |

## 13. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector or raster sprites and large text numerals.
- **R-002** The game shall animate translate/rotate/scale transitions and a simple particle burst.
- **R-003** When the player taps or clicks a target, the game shall hit-test a pointer event.
- **R-004** The game shall support keyboard focus and activation for all interactive targets.
- **R-005** The game shall play concurrent one-shot audio clips (sfx + voice) and may loop one music
  track at ≤0.25 volume.
- **R-006** When the browser blocks audio before a user gesture, the game shall defer all audio until
  the first interaction (Play) and shall not require sound to proceed.
- **R-007** The game shall persist and restore one small JSON save object in browser local storage.
- **R-008** The game shall run offline with no network requests after initial load.
- **R-009** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-010** The game shall provide hit targets ≥64 CSS px and visible focus indicators.
- **R-011** When a voice clip fails to play, the game shall continue with visual feedback only.
- **R-012** The game shall scale from 768×1024 to 1366×768 viewports without losing state.
- **R-013** The game shall expose an invisible accessible name on every interactive element.
- **R-014** While the tab is backgrounded, the game shall tolerate throttled timers and shall resume
  with all collected state intact.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the title screen shows a Play target |
| AC-02 | the title screen | Play is pressed | play resumes at the highest unlocked level (level 1 on first load) with exactly that many marbles, the numeral reading "0", and the instruction voice plays (audio may only start after this gesture, per R-006) |
| AC-03 | level 1 | the marble is tapped | it rolls into jar slot 1 within 300 ms, the numeral reads "1", and "one" is spoken |
| AC-04 | level 3 | the marbles are tapped right→left | the numeral counts 1, 2, 3 in tap order and the jar slots fill in that same order regardless of screen position |
| AC-05 | empty space or the jar | it is tapped | nothing on screen changes |
| AC-06 | an uncollected marble | it is double-tapped rapidly | the count increases exactly once and the second tap produces no additional visual or audio feedback |
| AC-07 | two simultaneous touches on two marbles | they land together | both are collected sequentially in touch-down order (left-to-right on ties) |
| AC-08 | the last uncollected marble | it is collected | the jar glows, the voice says "How many marbles? *N* marbles!", and 2.5 s later the next level appears with the numeral back at "0" |
| AC-09 | level 10 completion | celebration ends | the completion screen appears and progress is saved |
| AC-10 | saved progress | the page reloads and Play is pressed | play resumes at the highest unlocked level |
| AC-11 | 12 s without a tap | idleness continues | the instruction voice replays and a halo pulses on the first uncollected marble in reading order, with no progress lost |
| AC-12 | keyboard focus | Tab reaches a marble and Enter is pressed | it is collected exactly as a tap would |
| AC-13 | the celebration is playing | HOME is pressed | the auto-advance timer is cancelled, progress is saved, and the title screen appears |
| AC-14 | the title screen | the logo is held for 3 s | a progress ring is visible during the hold and the save is cleared when it completes; the keyboard equivalent behaves the same |
| AC-15 | a mid-level viewport resize (e.g. 1024×768 → 800×1000) | the layout reflows | the numeral and collected marbles are unchanged and every uncollected marble still has a ≥64 px hit target |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. One full level can be completed end-to-end, with roll animations, correct numeral growth, spoken
   numbers, and the "How many marbles?" celebration.
3. Levels 1–10 run; progress survives a reload.
4. No fail state exists; every edge case in FR-011 behaves as specified.
5. Runs offline in a browser at both tested viewport sizes.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Maximum count is 10 | assumption — official text does not state a maximum; 10 chosen as the Kindergarten counting benchmark |
| A2 | "Circles" (blog) are rendered as marbles (entry title) | designed resolution of the naming mismatch |
| A3 | Voice wording beyond section 9, timbre, and language | build freedom within the stated copy |
| A4 | TTS-generated voice clips are acceptable | designed |
| A5 | Browsers block autoplay until the first gesture | platform fact; handled by R-006 |
| A6 | Marble colors follow the fixed 5-cycle | designed (section 8) |
| A7 | Background-tab timers may be throttled; idle hints fire late, never lost | known platform behavior (v1) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** marble counts and arrangements per level, tap-order counting, jar slot order, running
  numeral, no fail state, hit-target minimums, save key and shape, asset provenance rule, acceptance
  criteria.
- **Free:** exact composition within the layout rule, easing curves, particle specifics, voice
  timbre/TTS engine, optional music, whether Play shows a glyph or the word.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics,
  scoring beyond completion, teacher tooling.
