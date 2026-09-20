# Find the toy chest with five socks

## 1. Front matter

- **Entry type:** Math activity (game)
- **Catalogued entry:** [`toy-chest-with-five-socks.md`](../toy-chest-with-five-socks.md)
- **Official source:** [Khan Academy Blog — Free Kindergarten Math Games](https://blog.khanacademy.org/free-kindergarten-math-games)
- **Spec status:** v1 — first spec at template v1; mirrors `specs/count-the-ice-cream-cones.md`, not yet blind-built
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on

## 2. Overview and learning objective

The player hears and sees a target number ("Find the drawer with five socks!"), scans a toy chest whose open drawers each show a sock cluster, and taps the drawer whose cluster matches — ideally by recognizing the quantity at a glance, not by counting one sock at a time. The skill practiced is **subitizing / quantity recognition**, the number-sense step before formal counting. Age band: **4–6 (Kindergarten per the official blog)**; pre-reader rules apply. Expected session: **3–6 minutes** (all eight levels), or one to two levels in a short sitting.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Activity is subitizing: recognize quantity "without counting" | official | Blog: "quickly choose the drawer that has 5 socks—without counting" |
| O2 | Mechanic is choosing the drawer holding five socks | official | Blog heading: "Find the toy chest with five socks" |
| O3 | Subject is counting and number sense; Kindergarten | official | Blog post + catalogued entry |
| D1 | Toy chest with 3–4 vertically stacked open drawers; each shows a sock cluster | designed | Contents must be visible for the mechanic to exist; a vertical stack gives the largest tap targets |
| D2 | Quantities 1–6 laid out as dice-like patterns on a fixed 3×3 grid | designed | Deterministic, subitizable arrangements; 6 is the largest canonical pattern (blog names only 5) |
| D3 | Targets 1–6 across 8 levels; drawer quantities and target slot fixed per level table | designed | Progression needed to build; target 5 echoes the blog example at levels 4 and 8 |
| D4 | Distractors get harder: minimum gap target↔distractor shrinks 2 → 1; drawers grow 3 → 4 | designed | "Familiar with numbers" implies rising difficulty; keeps the glance-challenge real |
| D5 | Target shown as a numeral card plus spoken word | designed | Numerals are content text for pre-readers; voice carries the instruction |
| D6 | Wrong tap = gentle reveal: nudge, flash, quantity badge, "That's *N* socks. Try again!" | designed | Never punishing; the reveal teaches numeral↔quantity without removing progress |
| D7 | No fail state, no score, no time limit; 12 s idle hint replays the target | designed | Research: never punishing; audio-first for non-readers |
| D8 | Celebration, confetti, trophy, praise audio | designed | Buildability invention |
| D9 | Progress saved locally; levels unlock in order | designed | Session continuity without accounts |

## 4. Player experience / core loop

A child presses a big Play button. A paper card slides in at the top showing "2" while a friendly voice says "Find the drawer with two socks!" The wooden chest below holds three open drawers: one with four socks, one with two, one with six. The child glances, taps the middle drawer; the socks bounce, a "2" badge pops above it, and a voice cheers "You found two socks!" Confetti falls, and 2.5 s later the card slides in for level 2.

**Core loop:** hear/see the target number → recognize a matching cluster in one glance → tap that drawer → celebration → next target.

## 5. Mechanics and rules

- **FR-001** When the game loads, it shall show a title screen with a chest logo (≥96×96 CSS px) and one Play target (≥96×96 CSS px).
- **FR-002** When Play is pressed, the game shall start `playing(level = highestUnlocked)`: a target card showing the target numeral, and a chest with `drawerCount` open drawers top→bottom, each showing exactly its assigned quantity of socks in the fixed pattern for that quantity (section 8).
- **FR-003** When a level starts, the game shall pop the target card in (200 ms) and speak `vo_target_N` ("Find the drawer with *N* socks!").
- **FR-004** When the **target** drawer is tapped, the game shall, in order: cancel the idle timer, gold-highlight the drawer (200 ms), bounce its socks (200 ms), pop the target badge above the drawer, stamp a star on the target card (200 ms), burst confetti (≤40 particles, 600 ms), play `sfx_slide` + `sfx_pop` + `vo_praise_N`, save progress, and enter `celebrating`.
- **FR-005** When a **non-target** drawer is tapped, the game shall enter `retrying(level, i)`: nudge the drawer (300 ms), white-flash its interior (150 ms in / 300 ms out), pop a badge with that drawer's quantity above it (visible 1.5 s), play `sfx_soft_buzz` + `vo_count_N` ("That's *N* socks. Try again!"), and pulse the target card (300 ms). No progress is lost.
- **FR-006** When empty space is tapped, no visual or audio state shall change; the tap only resets the idle timer.
- **FR-007** While `celebrating` or `complete`, drawer taps shall be ignored; only HOME (all states) and Replay (`complete`) respond.
- **FR-008** The game shall have no fail state, no score, and no countdown: mis-taps, random taps, and idle time never remove progress, never end a level, and never lock out a drawer.
- **FR-009** When no tap (drawer or empty) has occurred for 12 s, the game shall replay `vo_target_N` and loop a bounce animation of the hint arrow over the target card; the hint repeats every 12 s of continued idleness. Any tap resets the timer.
- **FR-010** When HOME is pressed in any state, the game shall cancel any running timer (celebration 2.5 s, retry 1.5 s, idle 12 s), save, and show `title`. In `loading` HOME is inert (nothing is interactive).
- **FR-011** Edge cases:
  - Rapid double-tap on a wrong drawer → `retrying` restarts: badge visible 1.5 s from the second tap; the second voice clip cancels the first.
  - Double-tap on the target drawer → first tap enters `celebrating`; the second is ignored per FR-007.
  - Two simultaneous touches on two drawers → process sequentially in touch-down order; ties resolve top→bottom.
  - Target drawer tapped while `retrying` another drawer → FR-004 immediately; the retry badge fades out with the transition.
  - Viewport resize/rotation mid-level → reflow; pattern cells rescale; no state change.
  - Repeated empty-space taps → FR-006 each time.
  - Rapid Play double-tap on `title` → only the first press starts a level.
- **FR-012** All instructions and feedback shall be understandable without reading: voice plus pictogram/numerals. Visible text is limited to numerals (content), decorative unit icons, and the optional words "Play" and "Replay".
- **FR-013** When the title chest logo is held for 3 s, the game shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and shows a checkmark pictogram (200 ms in, 800 ms hold, 200 ms out) with `sfx_tap`. Holding Enter/Space for 3 s on the focused logo behaves identically.
- **FR-014** Every interactive element (logo/reset, Play, HOME, each drawer, Replay) shall carry an invisible accessible name (section 7); FR-012's text limit governs visible text only.

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank with soft background | initial state; preload assets |
| SC-02 | `title` | chest logo + Play target | audio unlocks on first gesture |
| SC-03 | `playing(level)` | target card + chest + HOME | main state; drawers interactive |
| SC-04 | `retrying(level, i)` | SC-03 + badge/highlight on drawer `i` | ≤1.5 s; drawers stay interactive |
| SC-05 | `celebrating(level)` | frozen level + confetti + praise | auto-exits after 2.5 s |
| SC-06 | `complete` | trophy + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: show logo + Play |
| `title` | `PLAY_PRESSED` | not transitioning | `playing(highestUnlocked)` | action: unlock audio; FR-002/003 |
| `title` | `RESET_HOLD` | hold ≥3 s on logo | `title` | action: ring fills during hold; clear save + memory; checkmark + `sfx_tap` |
| `playing` | `DRAWER_TAP(i)` | `i` = target | `celebrating(level)` | actions: FR-004; save |
| `playing` | `DRAWER_TAP(i)` | `i` ≠ target | `retrying(level, i)` | actions: FR-005 |
| `playing` | `EMPTY_TAP` | — | `playing` | action: reset idle timer only |
| `playing` | `IDLE_12S` | no tap 12 s | `playing` | actions: FR-009 hint |
| `playing` | `HOME_PRESSED` | — | `title` | action: save |
| `retrying` | `RETRY_TIMEOUT` | 1.5 s elapsed | `playing(level)` | actions: fade badge + highlight |
| `retrying` | `DRAWER_TAP(i)` | `i` = target | `celebrating(level)` | action: cancel retry timer; FR-004; save |
| `retrying` | `DRAWER_TAP(i)` | `i` ≠ target | `retrying(level, i)` | actions: FR-005; restart 1.5 s |
| `retrying` | `IDLE_12S` | no tap 12 s | `retrying` | actions: FR-009 hint |
| `retrying` | `HOME_PRESSED` | — | `title` | action: cancel retry timer; save |
| `celebrating` | `CELEBRATION_DONE` | level < 8 | `playing(level+1)` | action: layout next level; FR-003 |
| `celebrating` | `CELEBRATION_DONE` | level = 8 | `complete` | actions: `vo_complete`; save |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel 2.5 s timer; save |
| `complete` | `REPLAY_PRESSED` | — | `playing(1)` | action: fresh run; progress kept; FR-003 |
| `complete` | `HOME_PRESSED` | — | `title` | action: save |

**Tab order (v1):** `title` — logo → Play; `playing` / `retrying` — HOME → drawers top→bottom; `celebrating` — HOME; `complete` — HOME → Replay; `loading` — none.

**HOME everywhere (v1):** HOME returns to `title` in every state, cancelling celebration, retry, and idle timers and saving first; it is inert in `loading`.

## 7. Input and interaction

- **Primary input:** single pointer tap/click anywhere within a drawer's rectangle.
- **Hit areas:** each drawer ≥ **64 px tall** and full chest width (≥224 px wide at the smallest supported viewport); Play/logo ≥96×96; HOME/Replay ≥64×64, HOME top-left with a 24 px margin.
- **Mis-tap tolerance:** taps within **8 px** of a drawer edge count as that drawer. Where two 8 px halos meet in the 12 px gap, the nearer drawer wins; exact ties go to the upper drawer.
- **Drag:** none used; no drag alternative needed.
- **Keyboard:** Tab moves focus in the order above; Enter/Space activates. Focus indicator: 4 px outline, ≥3:1 contrast against the background.
- **Multi-touch:** per FR-011 (sequential, touch-down order, tie top→bottom).
- **Instructions without reading:** spoken target + numeral card + hint arrow; no text-only path.
- **Accessible names:** invisible names, e.g. Play = "Play"; logo = "Toy chest, hold three seconds to reset progress"; drawer = "Drawer 1 of 3, showing 2 socks" (quantity exposed so screen-reader users can play; designed); HOME = "Home"; Replay = "Play again".

## 8. Levels and content data

Quantities use the fixed pattern for 1–6: cells on a 3×3 grid, 1-indexed (col,row).

| Quantity | Cells | Quantity | Cells |
|---|---|---|---|
| 1 | (2,2) | 4 | (1,1),(3,1),(1,3),(3,3) |
| 2 | (1,1),(3,3) | 5 | (1,1),(3,1),(2,2),(1,3),(3,3) |
| 3 | (1,1),(2,2),(3,3) | 6 | (1,1),(3,1),(1,2),(3,2),(1,3),(3,3) |

| Level | Drawers | Target | Drawer quantities, top→bottom | Min target gap | Target slot |
|---|---|---|---|---|---|
| 1 | 3 | 2 | 4, 2, 6 | 2 | 2 |
| 2 | 3 | 1 | 5, 3, 1 | 2 | 3 |
| 3 | 3 | 3 | 3, 5, 1 | 2 | 1 |
| 4 | 3 | 5 | 2, 5, 4 | 1 | 2 |
| 5 | 4 | 2 | 3, 5, 2, 1 | 1 | 3 |
| 6 | 4 | 6 | 6, 4, 5, 2 | 1 | 1 |
| 7 | 4 | 4 | 3, 6, 5, 4 | 1 | 4 |
| 8 | 4 | 5 | 4, 6, 5, 3 | 1 | 3 |

- **Worked example (level 4):** the card shows "5"; the voice says "Find the drawer with five socks!" Drawers top→bottom show 2, 5, 4. The child taps drawer 1 (2 socks): nudge, flash, badge "2" for 1.5 s, "That's two socks. Try again!", card pulses. The child taps drawer 2: socks bounce, badge "5", star on the card, confetti, "You found five socks!", save; 2.5 s later level 5 appears with four drawers.
- **Layout numbers:** chest width = min(600, viewportWidth − 64) px, ≥256 px; chest height = max(width × 0.867, 32 + (drawers − 1) × 12 + drawers × 64) px; drawer height = (chestHeight − 32 − (drawers − 1) × 12) / drawers, ≥64 px; target card 140×140 px at width ≥900, 112×112 at 480–899, 96×96 below 480; chest top = 192 / 160 / 132 px by the same bands. Pattern grid cell = min(56, (drawerHeight − 20) / 3) px; sock glyph = 0.7 × cell. No scrolling is required down to 320×480.
- **Randomization:** none. Drawer order, quantities, target, and target slot are fixed by the level table; identical every run.
- **Progression rule:** fixed, completion-gated (tap the target drawer once). No timer, no score, no adaptive difficulty.

## 9. Feedback, rewards, and audio cues

Effect definitions (reused by the FRs): **pop** scale 0→1 over 150 ms; **pulse** scale 1→1.08→1 over 300 ms; **bounce** translateY 0→−12→0 over 200 ms; **nudge** translateX 0→−8→+8→0 twice over 300 ms; **white flash** interior overlay `#FFFFFF` at 0.2 opacity in 150 ms, out 300 ms; **gold highlight** overlay `#F2B84B` at 0.3 opacity over 200 ms; **confetti** ≤40 particles falling 600 ms in gold, green, and teal; **ring fill** SVG stroke-dashoffset 0→100% linear over 3 s; **star stamp** scale 1.4→1 with rotate −10°→0° over 200 ms.

| Event | Visual | Audio |
|---|---|---|
| Level start | target card pops in (200 ms); drawers settle staggered 80 ms top→bottom | `vo_target_N`, 1.0, one-shot |
| Target drawer tapped | gold highlight, sock bounce, badge pop, star stamp, confetti | `sfx_pop` 0.7 + `sfx_slide` 0.6 + `vo_praise_N` 1.0, one-shots |
| Wrong drawer tapped | nudge, white flash, quantity badge (1.5 s), card pulse | `sfx_soft_buzz` 0.5 + `vo_count_N` 0.9, one-shots |
| Empty tap | none | none |
| Idle 12 s | card pulse + hint-arrow bounce loop over the target card | `vo_target_N`, 0.9, one-shot |
| Level complete | confetti + all badges pulse | `sfx_chime` 0.8 + `vo_praise_N` 1.0, one-shots |
| Game complete (level 8) | trophy + full-screen confetti | `sfx_chime` 0.8 + `vo_complete` 1.0 |
| HOME / Play / Replay pressed | button depress 80 ms | `sfx_tap` 0.6 |
| Optional background | — | `music_loop` 0.15, loop |

`vo_target_N`: "Find the drawer with *N* sock(s)!" `vo_count_N`: "That's *N* sock(s). Try again!" — no negative wording. `vo_praise_N`: "You found *N* sock(s)!" `vo_complete`: "You found every sock drawer!" Timbre, language, and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first user gesture (unlocked on Play, R-006); each new voice clip cancels the previous utterance; degradation — no speech synthesis → numerals, badges, and visuals carry play (R-011); no audio context → silent; storage blocked (throws/private mode) → run unsaved in memory. Background-tab timers may fire late; on `visibilitychange` to visible the game runs any expired timer (R-014) and never loses progress.

## 10. Progress and persistence

- **Storage class:** browser local storage. No network, no accounts.
- **Key:** `spec.toyChest.v1`
- **Shape:** `{ "highestUnlocked": 1-8, "levelsCompleted": 0-8, "updatedAt": "<ISO-8601>" }`
- **Save points:** entering `celebrating` (level complete), entering `complete`, and any HOME press.
- **Timestamps:** `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play resumes at `highestUnlocked` (level 1 on first run).
- **Reset:** hold the title logo 3 s → clear the key and in-memory progress and show the checkmark (FR-013); keyboard equivalent on the focused logo.
- **Deliberately not stored:** wrong-tap counts, timings, per-level statistics, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_room` | image | soft playroom backdrop, radial gradient, subtle dots | 1024×768 SVG | static | SVG gradient + circles |
| `chest_frame` | image | wooden chest outline with 3–4 drawer slots; palette below | 600×520 SVG | static | SVG rounded rects |
| `drawer` | image | wood drawer front, lighter interior panel, centered knob | 568×154 SVG, scales | static | SVG rects |
| `sock` | image | teal sock, cream cuff and toe stripe; one style only | 24×30 SVG, scales | static | SVG path |
| `target_card` | image | cream paper note with numeral area and small sock unit icon | 140×140 SVG | pop / pulse | SVG rect |
| `hint_arrow` | image | dark rounded arrow | 48×48 SVG | bounce loop | SVG path |
| `badge` | rendered | numeral in a rounded rect, cream fill, 2 px ink border | runtime text | pop | none needed |
| `star` | image | gold five-point star | 48×48 SVG | star stamp | SVG polygon |
| `trophy` | image | gold trophy on a base | 200×200 SVG | static | SVG shapes |
| `sfx_slide` | audio | short wooden slide/whoosh | 0.2 s, ogg/mp3 | one-shot | WebAudio noise sweep |
| `sfx_pop` | audio | bubble pop | 0.15 s | one-shot | WebAudio blip |
| `sfx_soft_buzz` | audio | soft low boop (never a harsh buzzer) | 0.2 s | one-shot | WebAudio sine drop |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `sfx_tap` | audio | UI click | 0.08 s | one-shot | WebAudio blip |
| `vo_target_1..6` | audio | "Find the drawer with *N* sock(s)!" | ≤2 s each | one-shot | TTS allowed |
| `vo_count_1..6` | audio | "That's *N* sock(s). Try again!" | ≤2 s each | one-shot | TTS allowed |
| `vo_praise_1..6` | audio | "You found *N* sock(s)!" | ≤2 s each | one-shot | TTS allowed |
| `vo_complete` | audio | "You found every sock drawer!" | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop, 0.15 | may be omitted |

- **Palette tokens:** background `#FDF3E3`, wood `#B07A4B`, wood-dark `#8A5A33`, ink `#3E2C1E`, sock teal `#6FA8A0`, gold `#F2B84B`, success `#7BC47F`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); target numeral ≥96 px at 1024×768.
- **Load failure:** missing visual → draw a stub shape, log a warning, keep playing; missing audio → continue silently (R-011).

## 12. State and data shapes

| Name | Field | Type | Notes |
|---|---|---|---|
| `LevelConfig` | `level` | 1–8 | index into the section 8 table |
| | `drawerCount` | `3 \| 4` | top→bottom order |
| | `target` | 1–6 | spoken and shown on the card |
| | `drawers` | `{ quantity: 1–6; isTarget: boolean }[]` | fixed order; exactly one `isTarget` |
| `SaveState` | `highestUnlocked` | 1–8 | resume point for Play |
| | `levelsCompleted` | 0–8 | max level completed |
| | `updatedAt` | string | ISO-8601, refreshed each save |
| `SessionState` (memory) | `state` | `loading \| title \| playing \| retrying \| celebrating \| complete` | section 6 |
| | `level`, `retryingDrawer` | number, number? | current level; drawer index during retry |
| | `idleTimer`, `retryTimer`, `celebrationTimer` | timer ids | cleared on HOME and transitions |

## 13. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector or raster sprites and large text numerals.
- **R-002** The game shall animate slides, scale pops, pulses, bounces, a nudge wobble, and a ≤40-particle burst.
- **R-003** When the player taps or clicks a target, the game shall hit-test a pointer event against drawer rectangles with an 8 px edge tolerance.
- **R-004** The game shall support keyboard focus and activation for all interactive targets.
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
- **AC-02** Given a first load, When Play is pressed, Then level 1 starts with a card showing "2", the voice says "Find the drawer with two socks!", and the three drawers show 4, 2, 6 socks (no audio may play before this gesture).
- **AC-03** Given saved progress at level 5, When Play is pressed, Then level 5 starts with four drawers (Play resumes at the highest unlocked level).
- **AC-04** Given level 4, When drawer 1 (2 socks) is tapped, Then the drawer nudges, a "2" badge shows for 1.5 s, "That's two socks. Try again!" plays, the target card pulses, and level 4 remains playable.
- **AC-05** Given level 4, When the target drawer (5 socks) is tapped, Then its socks bounce, a "5" badge appears, a star stamps the card, confetti falls, "You found five socks!" plays, and 2.5 s later level 5 appears.
- **AC-06** Given a wrong drawer tapped twice within 1 s, When the second tap lands, Then the badge stays visible 1.5 s from the second tap and only one voice clip is audible at a time.
- **AC-07** Given simultaneous touches on the target drawer and a distractor, When the target touch lands first, Then celebration starts and the second tap changes nothing.
- **AC-08** Given level 1, When empty space is tapped, Then nothing on screen changes and no sound plays.
- **AC-09** Given 12 s with no tap, When idleness continues, Then the target voice replays, the arrow bounces over the target card, and no progress is lost; any tap resets the timer.
- **AC-10** Given keyboard focus, When Tab reaches a drawer and Enter is pressed, Then it behaves exactly as a tap.
- **AC-11** Given the celebration is playing, When HOME is pressed, Then the 2.5 s timer is cancelled, the save is written, and the title screen appears.
- **AC-12** Given level 8 completion, When celebration ends, Then the trophy screen appears and progress is saved.
- **AC-13** Given a saved game, When the page reloads and Play is pressed, Then play resumes at the highest unlocked level with the correct target and drawers.
- **AC-14** Given the title screen, When the logo is held 3 s, Then a progress ring is visible during the hold and the save is cleared on completion; the keyboard equivalent behaves the same.
- **AC-15** Given a mid-level resize from 1024×768 to 768×1024, When the viewport changes, Then the drawers reflow with ≥64 px height and the level state is unchanged.
- **AC-16** Given five wrong taps in a row on level 1, When each lands, Then no score, loss, or level change occurs and the target drawer remains tappable.
- **AC-17** Given speech synthesis is unavailable, When any level plays, Then all feedback is still visible on screen and the game remains completable.

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. One full level completes end-to-end: card, drawers, wrong-tap retry, correct tap, celebration, auto-advance.
3. Levels 1–8 run with the exact table values; progress survives a reload and resets via the 3 s hold.
4. No fail state exists; every edge case in FR-011 behaves as specified.
5. Runs offline in a browser at 1024×768 and 768×1024.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Maximum quantity is 6, using dice-like patterns | designed — the blog names only 5; 6 is the largest canonical subitizable pattern |
| A2 | Eight levels, one round each | designed |
| A3 | All socks share one visual style so quantity is the only cue | designed |
| A4 | The target is shown as a numeral (content text) plus voice | designed — numerals are allowed pre-reader content |
| A5 | TTS-generated voice clips are acceptable for the build | designed |
| A6 | Browsers block autoplay until the first gesture | platform fact — handled by R-006 |
| A7 | Background-tab timers may be throttled; hints and auto-advance fire late | known platform behavior — handled by R-014 |
| A8 | Storage may be unavailable (private mode); the game runs unsaved | platform fact — handled by R-007 |
| A9 | `speechSynthesis` voices may load asynchronously; the first clip may be delayed | platform fact — visual feedback is independent |
| A10 | The in-app activity name may differ from the blog heading | catalogued entry note |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** level table values, dice patterns, correct/wrong feedback semantics, no fail state, hit-target minimums, save key and shape, original-asset rule, acceptance criteria.
- **Free:** exact composition within the layout numbers, easing curves, particle specifics, voice timbre/TTS engine, optional music, whether Play/Replay show words or glyphs, drawer decoration within palette tokens.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics, scoring or adaptive difficulty, teacher tooling.
