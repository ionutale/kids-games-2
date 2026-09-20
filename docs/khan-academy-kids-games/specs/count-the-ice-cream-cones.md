# Count and tap the ice cream cones

- **Entry type:** Math activity (game)
- **Catalogued entry:** [`count-the-ice-cream-cones.md`](../count-the-ice-cream-cones.md)
- **Official source:** [Khan Academy Blog — Free Kindergarten Math Games](https://blog.khanacademy.org/free-kindergarten-math-games)
- **Spec status:** v1 — locked after the blind build test (wayfinder tickets 03/04); matches template v1
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on

## 1. Overview and learning objective

The player taps ice cream cones one by one; each tap stamps the next number above the cone it
tapped and speaks it aloud. The skill practiced is **1:1 correspondence** — one tap, one number,
in the counting sequence. Age band: **4–6 (Kindergarten per the official blog)**. Expected session:
**3–6 minutes** (all eight levels) or one to two levels in a single short sitting.

## 2. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Player taps the ice cream scoops one by one | official | Blog: "tapping the ice cream scoops one by one" |
| O2 | Each tap makes a number appear above the tapped scoop | official | Blog: "a number appears above it" |
| O3 | Purpose is 1:1 correspondence | official | Blog names 1:1 correspondence |
| O4 | Positioned for Kindergarten | official | Blog post is "Free Kindergarten Math Games" |
| D1 | Levels 1–8, level *n* shows *n* cones | designed | Progression needed to build; max 8 assumed from the blog screenshot asset name `2_tap_and_count_to_8` (see Assumptions) |
| D2 | Numbers always follow tap order (first tap = 1, …) | designed | Makes 1:1 unambiguously observable |
| D3 | All layout, colors, audio, animations, praise | designed | Buildability invention |
| D4 | Re-tapping a counted cone replays its number without penalty | designed | Research: exploratory tapping must be safe for ages 2–8 |
| D5 | No fail state; idle triggers a spoken hint | designed | Research: never punishing; audio-first for non-readers |
| D6 | Progress saved locally; levels unlock in order | designed | Session continuity without accounts |

## 3. Player experience / core loop

A child presses a big Play button. One bright cone appears. They tap it: a "1" pops above it and
a cheerful voice says "one". The cone bounces. When every cone has a number, the badges pulse and
a voice celebrates the total ("You counted five cones!") before the next level slides in with one
more cone.

**Core loop:** see cones → tap each cone → numeral + spoken count → celebrated total → next level.

## 4. Mechanics and rules

- **FR-001** When the game loads, it shall show a title screen with one Play target (≥96 CSS px).
- **FR-002** When Play is pressed, the game shall start a level: level *n* shows exactly *n* cones
  (1 ≤ n ≤ 8) in a single row, wrapping to at most 2 rows of ≤4 on narrow viewports.
- **FR-003** When an **uncounted** cone is tapped, the game shall, in order: show a numeral badge
  above that cone with the next count in sequence (first tap → 1), play a pop sound, speak the
  number, and play a short bounce animation. Counting is by tap order, not cone position.
- **FR-004** When an **already counted** cone is tapped, the game shall replay that cone's number
  (badge pulse + spoken number) and shall not change the count, the badges, or progress.
- **FR-005** When empty space is tapped, no state shall change (no sound, no count).
- **FR-006** When every cone in the level is counted, the game shall enter celebration: badges
  pulse, a confetti burst plays, and a voice celebrates with the total ("You counted *N* cones!").
- **FR-007** When celebration ends (2.5 s), the next level shall start automatically; after level
  8 the completion screen shall appear instead.
- **FR-008** The game shall have no fail state: mis-taps, random taps, and idle time never remove
  counted badges, never end a level, and never block progress.
- **FR-009** When no tap has occurred for 12 s during play, the game shall replay the instruction
  voice and show a gently bouncing arrow over an uncounted cone; the hint repeats every 12 s of
  continued idleness. Any tap, including an empty-space tap, resets the timer (v1).
- **FR-010** When HOME is pressed, the game shall return to the title screen and keep progress.
  HOME is available in every state — playing, celebrating (cancelling the 2.5 s timer), and
  complete — and always saves first (v1).
- **FR-011** Edge cases:
  - Rapid double-tap on one cone → the second tap is FR-004 (replay).
  - Two simultaneous touches on two cones → process sequentially in touch-down order; ties resolve
    left-to-right on screen.
  - Viewport resize/rotation mid-level → reflow layout; badges and count preserved.
  - Repeated empty-space tapping → treated as FR-005 each time.
- **FR-012** All instructions and feedback shall be understandable without reading; text is
  limited to numerals (the content), the single word of the title, and the Play glyph.
- **FR-013** When the title logo is held for 3 s, the game shall fill a visible progress ring for
  the hold duration; on completion it clears the save and in-memory progress and plays a shimmer
  animation plus `sfx_soft_tap`. Holding Enter/Space for 3 s on the keyboard-focused logo behaves
  identically (v1).
- **FR-014** Every interactive element (logo/reset, Play, HOME, each cone) shall carry an invisible
  accessible name; FR-012's text limit governs visible text only (v1).

## 5. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial state; preload assets |
| `title` | logo + Play target | audio is unlocked here on first user gesture |
| `playing(n, nextCount, badges)` | cones + badges + HOME | main state, n = 1…8 |
| `celebrating(n)` | frozen level + confetti + praise | auto-exits after 2.5 s |
| `complete` | trophy screen + Replay + HOME | terminal state until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: play title sting; unlock audio on next gesture |
| `title` | `PLAY_PRESSED` | audio unlocked | `playing(highestUnlocked)` | entry: speak instruction; layout level |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | entry: fill progress ring; action: clear save + in-memory progress, shimmer + `sfx_soft_tap` |
| `playing` | `CONE_TAP(uncounted)` | `nextCount ≤ n` | `playing` | actions: FR-003 badge, pop, voice, bounce |
| `playing` | `CONE_TAP(counted)` | — | `playing` | actions: FR-004 pulse + voice |
| `playing` | `EMPTY_TAP` | — | `playing` | none |
| `playing` | `ALL_COUNTED` | `nextCount > n` | `celebrating(n)` | actions: FR-006; save progress |
| `playing` | `IDLE_12S` | no tap 12 s | `playing` | actions: FR-009 hint |
| `playing` | `HOME_PRESSED` | — | `title` | action: save |
| `celebrating` | `CELEBRATION_DONE` | `n < 8` | `playing(n+1)` | action: layout next level |
| `celebrating` | `CELEBRATION_DONE` | `n = 8` | `complete` | actions: FR-007 end; save |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel timer, save |
| `complete` | `REPLAY_PRESSED` | — | `playing(1)` | action: fresh run, progress kept |
| `complete` | `HOME_PRESSED` | — | `title` | action: save |

**Tab order (v1):** title — logo → Play; playing — HOME → cones left→right; complete — HOME →
Replay.

## 6. Input and interaction

- **Primary input:** single pointer tap / click anywhere inside a cone's hit area.
- **Hit areas:** each cone ≥ **64×64 CSS px** (above the 44 px platform minimum because children
  are measurably less accurate); Play ≥96×96; HOME ≥64×64, placed top-left with a 24 px margin.
- **Drag:** none used; no drag alternatives needed.
- **Keyboard:** Tab moves focus across HOME → cones (DOM order) → Play; Enter/Space activates.
  Focus indicator: 4 px outline, ≥3:1 contrast against background.
- **Mis-tap tolerance:** taps within 12 px of a cone edge still count as that cone; only taps
  clearly in empty space are FR-005.
- **Multi-touch:** handled per FR-011 (sequential, touch-down order).
- **Instructions without reading:** spoken voice + an arrow pictogram; no text-only path.
- **Accessible names:** every interactive element carries an invisible accessible name for
  assistive technology (FR-014); visible text remains limited per FR-012.

## 7. Levels and content data

| Level | Cones | Arrangement | Scoop colors (fixed cycle) | Progression |
|---|---|---|---|---|
| 1 | 1 | centered | strawberry | complete → level 2 |
| 2 | 2 | row | strawberry, vanilla | complete → level 3 |
| 3 | 3 | row | strawberry, vanilla, chocolate | complete → level 4 |
| 4 | 4 | row (2 rows of 2 on narrow) | strawberry, vanilla, chocolate, mint | complete → level 5 |
| 5 | 5 | row (3+2 on narrow) | cycle repeats | complete → level 6 |
| 6 | 6 | row (3+3) | cycle repeats | complete → level 7 |
| 7 | 7 | row (4+3) | cycle repeats | complete → level 8 |
| 8 | 8 | row (4+4) | cycle repeats | complete → `complete` screen |

- **Worked example (level 3):** cones left→right = strawberry, vanilla, chocolate. Tap chocolate
  first → badge "1" above chocolate, voice "one". Tap strawberry → badge "2" above strawberry,
  voice "two". Tap vanilla → badge "3", voice "three". All counted → celebration: "You counted
  three cones!". 2.5 s later level 4 appears with four cones.
- **Randomization:** none. Layout, colors, and order of appearance are deterministic.
- **Progression rule:** fixed, completion-gated (finish every cone). No timer, no score gating.

## 8. Feedback, rewards, and audio cues

| Event | Visual | Audio |
|---|---|---|
| Cone counted (new) | numeral badge pops above cone (scale 0→1, 150 ms); cone bounces 100 ms | `sfx_pop` + `vo_number_N` |
| Counted cone re-tapped | badge pulses 1.1× for 120 ms | `vo_number_N` at volume 0.7 (no pop sfx) |
| Empty tap | none | none |
| Level complete | all badges pulse; confetti burst (≤40 particles) | `sfx_chime` + `vo_praise_N` |
| Game complete (level 8) | trophy + full-screen confetti | `sfx_chime` + `vo_complete` |
| Idle hint | bouncing arrow over an uncounted cone | `vo_instruction` |
| HOME / PLAY pressed | button depress 80 ms | `sfx_tap` |

`vo_praise_N` copy: "You counted *N* cone(s)!" — exact wording, voice, and language are build
freedom (must be spoken praise including the total).

**Audio rules (v1):** no audio before the first user gesture (R-006); each new voice clip cancels
the previous utterance; missing APIs degrade gracefully — no speech synthesis → visual only, no
audio context → silent, storage blocked → run unsaved. Background-tab timer throttling may delay
idle hints but never loses progress.

## 9. Progress and persistence

- **Storage class:** browser local storage. No network, no accounts.
- **Key:** `spec.iceCream.v1`
- **Shape:** `{ "highestUnlocked": 1-8, "levelsCompleted": 0-8, "updatedAt": "<ISO-8601>" }`
- **Save points:** on level completion and on HOME pressed.
- **Restore:** on load, Play resumes at `highestUnlocked`.
- **Reset:** hold the title logo 3 s → clears the key and shows a confirmation shimmer.
- **Deliberately not stored:** per-tap data, timings, audio settings, anything identifying.

## 10. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable
for the pilot build when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_parlor` | image | soft pastel backdrop, subtle dots; palette below | 1024×768 SVG | static | SVG gradient + circles |
| `cone` | image | waffle cone, warm tan, rounded linework | 120×180 SVG | static | SVG triangle + cross-hatch |
| `scoop_1..4` | image | four scoop shapes; colors: strawberry `#F7A8B8`, vanilla `#FFF3D6`, chocolate `#8B5E3C`, mint `#B7E4C7` | 120×120 SVG | static | SVG circles/swirls |
| `hint_arrow` | image | rounded arrow, dark brown `#4A3728` | 48×48 SVG | bounce loop | SVG path |
| `badge` | rendered | numeral in a rounded rect, cream fill, 2 px brown border | runtime text | pop/pulse | none needed |
| `sfx_pop` | audio | short bubble pop | 0.15 s, ogg/mp3 | one-shot | WebAudio blip |
| `sfx_soft_tap` | audio | muted tap | 0.10 s | one-shot | WebAudio blip |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `sfx_tap` | audio | UI click | 0.08 s | one-shot | WebAudio blip |
| `vo_instruction` | audio | "Tap each cone to count." | ≤2 s | one-shot | TTS allowed |
| `vo_number_1..8` | audio | spoken numbers one–eight | ≤1 s each | one-shot | TTS allowed |
| `vo_praise_1..8` | audio | "You counted *N* cone(s)!" | ≤2 s each | one-shot | TTS allowed |
| `vo_complete` | audio | "Amazing! You counted all the way to eight!" | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop, low volume | may be omitted |

- **Palette tokens:** background `#FFF6E5`, ink `#4A3728`, accent `#F4A261`, success `#7BC47F`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); numerals ≥96 px at
  1024×768; the word "Play" optional (glyph + spoken cue carry meaning).
- **Load failure:** missing visual asset → draw stub shape, log a warning, keep playing; missing
  audio → continue silently (R-011).

## 11. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector or raster sprites and large text numerals.
- **R-002** The game shall animate scale/bounce transitions and a simple particle burst.
- **R-003** When the player taps or clicks a target, the game shall hit-test a pointer event.
- **R-004** The game shall support keyboard focus and activation for all interactive targets.
- **R-005** The game shall play concurrent one-shot audio clips (sfx + voice) and may loop one
  music track at low volume.
- **R-006** When the browser blocks audio before a user gesture, the game shall defer audio until
  the first interaction (Play) and shall not require sound to proceed.
- **R-007** The game shall persist and restore one small JSON save object in browser local storage.
- **R-008** The game shall run offline with no network requests after initial load.
- **R-009** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-010** The game shall provide hit targets ≥64 CSS px and visible focus indicators.
- **R-011** When a voice clip fails to play, the game shall continue with visual feedback only.
- **R-012** The game shall scale from 768×1024 to 1366×768 viewports without losing state.
- **R-013** The game shall expose an invisible accessible name on every interactive element.

## 12. Acceptance criteria

- **AC-01** Given a first load, When assets finish, Then the title screen shows a Play target.
- **AC-02** Given the title screen, When Play is pressed, Then play resumes at the highest
  unlocked level (level 1 on first load) with exactly that many cones, and the instruction voice
  plays (audio may only start after this gesture, per R-006).
- **AC-03** Given level 1, When the cone is tapped, Then a badge "1" appears above it within
  150 ms and "one" is spoken.
- **AC-04** Given level 3, When cones are tapped in the order chocolate → strawberry → vanilla,
  Then badges read 1, 2, 3 above those cones respectively.
- **AC-05** Given a counted cone, When it is tapped again, Then no new badge appears, the badge
  pulses, and its number is spoken again.
- **AC-06** Given empty space, When it is tapped, Then nothing on screen changes.
- **AC-07** Given two simultaneous touches on two cones, When they land together, Then both are
  counted sequentially in touch-down order (left-to-right on ties).
- **AC-08** Given the last uncounted cone, When it is counted, Then celebration plays with the
  total spoken, and 2.5 s later the next level appears.
- **AC-09** Given level 8 completion, When celebration ends, Then the completion screen appears
  and progress is saved.
- **AC-10** Given saved progress, When the page reloads and Play is pressed, Then play resumes at
  the highest unlocked level.
- **AC-11** Given 12 s without a tap, When idleness continues, Then the instruction voice replays
  and an arrow bounces over an uncounted cone, with no progress lost.
- **AC-12** Given keyboard focus, When Tab reaches a cone and Enter is pressed, Then the cone
  counts exactly as a tap would.
- **AC-13** Given the celebration is playing, When HOME is pressed, Then the auto-advance timer is
  cancelled, progress is saved, and the title screen appears.
- **AC-14** Given the title screen, When the logo is held for 3 s, Then a progress ring is visible
  during the hold and the save is cleared when it completes; the keyboard equivalent behaves the
  same.

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. One full level can be completed end-to-end, with correct badges, spoken numbers, and
   celebration.
3. Levels 1–8 run; progress survives a reload.
4. No fail state exists; every edge case in FR-011 behaves as specified.
5. Runs offline in a browser at both tested viewport sizes.

## 13. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Maximum count is 8 | assumption — official text does not state it; inferred from the blog screenshot asset name `2_tap_and_count_to_8` |
| A2 | One round per level; no repeats | designed |
| A3 | Praise wording, voice timbre, and language | build freedom within the copy in section 8 |
| A4 | TTS-generated voice clips are acceptable for the pilot | designed |
| A5 | Browsers block autoplay until the first gesture | platform fact; handled by R-006 |
| A6 | Scoop colors cycle the fixed sequence | designed (section 7) |
| A7 | Background-tab timers may be throttled; idle hints fire late, never lost | known platform behavior (v1) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 14. Out of scope / build freedom

- **Fixed:** cone counts per level, tap-order counting, no fail state, hit-target minimums,
  save key and shape, asset provenance rule, acceptance criteria.
- **Free:** exact composition within the layout rule, easing curves, particle specifics, voice
  timbre/TTS engine, optional music, whether Play shows a glyph or the word.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics,
  scoring beyond completion, teacher tooling.
