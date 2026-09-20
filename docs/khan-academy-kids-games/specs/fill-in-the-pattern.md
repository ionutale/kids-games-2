# Fill in the pattern

## 1. Front matter

- **Entry type:** Math activity (game)
- **Catalogued entry:** [`fill-in-the-pattern.md`](../fill-in-the-pattern.md)
- **Official source:** [Khan Academy Blog — Free Kindergarten Math Games](https://blog.khanacademy.org/free-kindergarten-math-games) — "Fill in the pattern"
- **Spec status:** v1 — follows template v1; not yet blind-built
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; no network after load
- **Conditional sections:** 11 and 12 included; no section omitted

## 2. Overview and learning objective

A row of original shape tiles repeats in a simple pattern — circle, star, circle, star — except one tile is missing. The player hears the question ("Which one comes next?"), studies the row, and taps the matching tile from a small option tray below; the tile flies into the blank and the pattern completes. The skill practiced is **pattern recognition and completion** (finding the repeating unit), the blog's "completing patterns". Age band: **4–6 (Kindergarten per the official blog)**; pre-reader rules apply. Expected session: **2–5 minutes** (all eight levels) or one or two levels in a short sitting.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Children practice completing patterns | official | Blog: "Kids practice completing patterns by filling in the blank with the correct object." |
| O2 | The mechanic is filling **the** blank with the correct object | official | Catalogued entry: "filling in the blank with the correct object" (singular "the blank") |
| O3 | Subject is Math — patterns; Kindergarten | official | Catalogued entry; parent post is "Free Kindergarten Math Games" |
| D1 | Pattern catalog P1–P5 plus two variant re-skins (AB, AAB, ABB, ABC, size-AB) with fixed token sequences | designed | Buildability: exact patterns and sequences must exist before the game can be built |
| D2 | Exactly one blank per sequence; position fixed per level | designed | O2's "the blank" is singular; one blank keeps the choice unambiguous |
| D3 | Option tray with 2, 3, or 4 candidate tiles; distractors fixed per level | designed | Turns "fill in the blank" into a tappable pre-reader interaction |
| D4 | Eight fixed levels, completion-gated | designed | Progression needed to build; no timer, no score |
| D5 | Token vocabulary: 4 original shapes, 4 colors, 2 sizes | designed | Original assets; no Khan Academy art, characters, names, or audio |
| D6 | Wrong tap teaches: tile nudges in place in the tray, blank slot highlighted after 800 ms; two-stage idle hint (12 s blank highlight; 24 s correct-option halo) | designed | Never punishing; directs attention to the missing position and supports non-readers who stall |
| D7 | Celebration, confetti, trophy, praise audio | designed | Buildability invention |
| D8 | Local save; Play resumes highest unlocked level; 3 s hold resets | designed | Session continuity without accounts; template v1 rule |

## 4. Player experience / core loop

A child presses Play. Four tiles appear in a row: teal circle, gold star, teal circle, and a dashed empty slot. A voice asks, "Which one comes next? Fill in the blank!" Two choice tiles rise in a tray below: a teal circle and a gold star. The child taps the gold star; it flies across the screen into the blank, the row pops tile by tile, confetti falls, and the voice cheers, "You finished the pattern!" 2.5 s later a longer row pops in for level 2.

**Core loop:** hear/see the pattern row with one blank → infer the repeating unit → tap the matching option → tile flies in, celebration, next level.

## 5. Mechanics and rules

- **FR-001** When the game loads, it shall show a title screen with a pattern-puzzle logo (≥96×96 CSS px) and one Play target (≥96×96 CSS px).
- **FR-002** When Play is pressed, the game shall start `playing(level = highestUnlocked)`: the level's sequence row (L tiles including exactly one blank at position `b`) and an option tray of `n` candidate tiles in the level's tray order (section 8).
- **FR-003** When a level starts, the game shall pop the sequence tiles in left→right with a 60 ms stagger, rise the tray over 200 ms, and speak `vo_instruction` ("Which one comes next? Fill in the blank!"). No audio plays before the first user gesture (Play).
- **FR-004** When the **correct** option tile is tapped, the game shall cancel the idle timer and enter `celebrating`: fly the tile 300 ms into the blank slot, fill the slot, pop the completed row left→right (60 ms stagger), burst confetti (≤40 particles, 600 ms), play `sfx_pop` + `sfx_chime` + `vo_praise`, and save progress; 2.5 s later the next level starts (or `complete` after level 8).
- **FR-005** When a **wrong** option tile is tapped, the game shall enter `teaching(level, tile)`: nudge the tile 300 ms in its tray position, coral-flash it (150 ms in / 300 ms out), play `sfx_soft_buzz` + `vo_wrong_<token>`, leave the tile tappable, and at 800 ms after the tap gold-highlight the **blank slot** for 1.2 s; `teaching` ends at 2.0 s. No progress is lost and no tile is ever locked out.
- **FR-006** When empty space (background, row, or tray gap) is tapped, no visual or audio state shall change; the tap only resets the idle timer.
- **FR-007** When the blank slot is tapped, the game shall replay `vo_instruction` and pulse the option tray (600 ms) without changing state; the idle timer resets.
- **FR-008** While `celebrating` or `complete`, taps on tiles and the blank shall be ignored; only HOME (all states) and Replay (`complete`) respond.
- **FR-009** The game shall have no fail state, no score, and no countdown: mis-taps, random taps, and idle time never remove progress, never end a level, and never lock out a tile.
- **FR-010** When no tap has occurred for 12 s, the game shall gold-highlight the blank slot for 1.2 s and replay `vo_instruction`; if idleness reaches 24 s, it shall additionally halo the correct option tile for 3 s and play `vo_hint_2` ("Tap this one!"); the 24 s stage repeats every 12 s of continued idleness. Any tap, including an empty-space tap, resets the timer and the hint stage.
- **FR-011** When HOME is pressed in any state, the game shall cancel any running timer (teaching 2.0 s, celebration 2.5 s, idle 12 s), save, and show `title`. In `loading` HOME is inert (nothing is interactive).
- **FR-012** Edge cases:
  - Rapid double-tap on a wrong option → `teaching` restarts from the second tap: new nudge, new voice (cancelling the previous clip), blank highlight 800 ms after the second tap.
  - Double-tap on the correct option → first tap enters `celebrating`; the second is ignored per FR-008.
  - Correct option tapped while `teaching` → cancel teaching timers and enter `celebrating` immediately (FR-004).
  - Two simultaneous touches on two options → process sequentially in touch-down order; ties resolve left→right in tray order; if the first processed is correct, celebration starts and the second tap is ignored.
  - Tap in the tray but not on a tile, or repeated empty-space/blank-slot taps → empty tap (FR-006) or instruction replay (FR-007) each time; no state stacking.
  - Viewport resize/rotation mid-level → reflow with section 8 numbers; sequence, blank position, options, and hint stage unchanged.
  - Rapid Play double-tap on `title` → only the first press starts a level.
- **FR-013** All instructions and feedback shall be understandable without reading: voice plus pictograms. Visible text is limited to the optional words "Play" and "Replay"; everything else is shape glyphs, the dashed blank slot, and the trophy.
- **FR-014** When the title logo is held for 3 s, the game shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and shows a checkmark pictogram (200 ms in, 800 ms hold, 200 ms out) with `sfx_soft_tap`. Holding Enter/Space for 3 s on the focused logo behaves identically.
- **FR-015** Every interactive element (logo/reset, Play, HOME, blank slot, each option tile, Replay) shall carry an invisible accessible name (section 7); FR-013's text limit governs visible text only.

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank with soft background | initial state; preload assets; audio locked |
| SC-02 | `title` | logo + Play target | audio unlocks on first gesture |
| SC-03 | `playing(level)` | sequence row + blank slot + option tray + HOME | main state; blank and options interactive |
| SC-04 | `teaching(level, tile)` | SC-03 + nudge/flash on the wrong tile | ≤2.0 s; all options stay interactive |
| SC-05 | `celebrating(level)` | fly + completed row + confetti + praise | auto-exits after 2.5 s |
| SC-06 | `complete` | trophy + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: show logo + Play |
| `title` | `PLAY_PRESSED` | not transitioning | `playing(highestUnlocked)` | action: unlock audio; FR-002/003 |
| `title` | `RESET_HOLD` | hold ≥3 s on logo | `title` | action: ring fills during hold; clear save + memory; checkmark + `sfx_soft_tap` |
| `title` | `HOME_PRESSED` | — | `title` | no-op (title is home) |
| `playing` | `OPTION_TAP(tile)` | `tile` = correct | `celebrating(level)` | actions: FR-004; save |
| `playing` | `OPTION_TAP(tile)` | `tile` ≠ correct | `teaching(level, tile)` | actions: FR-005 |
| `playing` | `BLANK_TAP` | — | `playing` | actions: FR-007 |
| `playing` | `EMPTY_TAP` | — | `playing` | action: reset idle timer |
| `playing` | `IDLE_12S` / `IDLE_24S` | no tap | `playing` | actions: FR-010 hint stage 1 / stage 2 |
| `playing` | `HOME_PRESSED` | — | `title` | action: save |
| `teaching` | `TEACHING_DONE` | 2.0 s elapsed | `playing(level)` | action: fade blank highlight |
| `teaching` | `OPTION_TAP(tile)` | `tile` = correct | `celebrating(level)` | action: cancel teaching timers; FR-004; save |
| `teaching` | `OPTION_TAP(tile)` | `tile` ≠ correct | `teaching(level, tile)` | actions: FR-005; restart 2.0 s |
| `teaching` | `BLANK_TAP` / `EMPTY_TAP` | — | `teaching` | actions: FR-007 / reset idle timer |
| `teaching` | `IDLE_12S` / `IDLE_24S` | no tap | `teaching` | actions: FR-010 hint |
| `teaching` | `HOME_PRESSED` | — | `title` | action: cancel timers; save |
| `celebrating` | `CELEBRATION_DONE` | level < 8 | `playing(level+1)` | action: layout next level; FR-003 |
| `celebrating` | `CELEBRATION_DONE` | level = 8 | `complete` | actions: `vo_complete`; save |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel 2.5 s timer; save |
| `complete` | `REPLAY_PRESSED` | — | `playing(1)` | action: fresh run; progress kept; FR-003 |
| `complete` | `HOME_PRESSED` | — | `title` | action: save |

**Tab order (v1):** `title` — logo → Play; `playing` / `teaching` — HOME → blank slot → option tiles left→right (tray order); `celebrating` — HOME; `complete` — HOME → Replay; `loading` — none.

**HOME everywhere (v1):** HOME returns to `title` in every state, cancelling teaching, celebration, and idle timers and saving first; it is inert in `loading`.

## 7. Input and interaction

- **Primary input:** single pointer tap/click on an option tile, the blank slot, HOME, Play, Replay, or the logo.
- **Hit areas:** option tiles ≥ **64×64 CSS px** (80 px at ≥768 px wide, 72 px at 480–767 px, 64 px below 480 px); sequence tiles and the blank slot scale to ≥ **44×44 CSS px**; Play/Replay ≥96×96; HOME ≥64×64, top-left with a 24 px margin.
- **Mis-tap tolerance:** taps within **8 px** of an option tile edge count as that tile. Where two 8 px halos meet in the tray gap (≥4 px), the nearer tile center wins; exact ties go to the left tile in tray order. Taps within 8 px of the blank slot count as a blank tap; any other sequence-row tap is an empty tap (sequence tiles other than the blank are not interactive).
- **Drag:** none used; no drag alternative needed.
- **Keyboard equivalent for every action:** Tab moves focus in the order above; Enter/Space activates the focused element (option = tap, blank = instruction replay, Play/Replay/HOME = press). Hold Enter/Space 3 s on the focused logo = reset hold (FR-014). Focus indicator: 4 px outline, ≥3:1 contrast against the background.
- **Multi-touch:** per FR-012 (sequential, touch-down order, tie left→right in tray order).
- **Instructions without reading:** spoken `vo_instruction` + dashed blank slot + blank gold highlight + option halo; no text-only path.
- **Accessible names (invisible):** logo = "Pattern puzzle, hold three seconds to reset progress"; Play = "Play"; HOME = "Home"; Replay = "Play again"; blank slot = "Blank, tap to hear the instruction"; option tile = "Gold star, choice 2 of 3" (token name + tray position); the sequence row carries one group label, e.g. "Pattern: teal circle, gold star, teal circle, blank".

## 8. Levels and content data

Token shorthand (original shapes; each token has one fixed shape, color, and size; glyph sizes at the 72 px tile base; hexes in the section 11 palette):

| Codes | `ct` teal circle 54 px (`tok_circle_teal`) · `sg` gold star 54 px (`tok_star_gold`) · `qc` coral square 54 px (`tok_square_coral`) |
|---|---|
| | `tv` violet triangle 54 px (`tok_triangle_violet`) · `Vb` violet circle big 54 px (`tok_circle_violet_big`) · `Vs` violet circle small 34 px (`tok_circle_violet_small`) |

Pattern catalog (unit repeats left→right; variant rows re-skin the same unit with different tokens):

| PID | Unit | Unit length | Unit tokens | Levels |
|---|---|---|---|---|
| P1 | AB | 2 | `ct` `sg` | 1, 2 |
| P2 | AAB | 3 | `qc` `qc` `ct` | 3 |
| P3 | ABB | 3 | `sg` `tv` `tv` | 4 |
| P4 | ABC | 3 | `ct` `sg` `qc` | 5 |
| P5 | AB (size) | 2 | `Vb` `Vs` | 6 |
| P3v | ABB (variant) | 3 | `ct` `qc` `qc` | 7 |
| P4v | ABC (variant) | 3 | `qc` `tv` `ct` | 8 |

| Level | PID | Repeats | Visible sequence (▢ = blank) | L | Blank `b` | Options `n` | Correct | Distractors (generation order) | Tray order (left→right) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | P1 | 2 | `ct sg ct` ▢ | 4 | 4 | 2 | `sg` | `ct` | `ct`, `sg` |
| 2 | P1 | 3 | `ct sg ct sg ct` ▢ | 6 | 6 | 2 | `sg` | `ct` | `sg`, `ct` |
| 3 | P2 | 2 | `qc qc ct qc qc` ▢ | 6 | 6 | 3 | `ct` | `qc`, `sg` | `ct`, `qc`, `sg` |
| 4 | P3 | 2 | `sg tv tv sg` ▢ `tv` | 6 | 5 | 3 | `tv` | `sg`, `ct` | `sg`, `ct`, `tv` |
| 5 | P4 | 2 | `ct sg qc` ▢ `sg qc` | 6 | 4 | 3 | `ct` | `sg`, `qc` | `qc`, `ct`, `sg` |
| 6 | P5 | 3 | `Vb Vs Vb` ▢ `Vb Vs` | 6 | 4 | 4 | `Vs` | `Vb`, `ct`, `sg` | `ct`, `sg`, `Vs`, `Vb` |
| 7 | P3v | 2 | `ct qc` ▢ `ct qc qc` | 6 | 3 | 4 | `qc` | `ct`, `sg`, `tv` | `tv`, `qc`, `ct`, `sg` |
| 8 | P4v | 2 | ▢ `tv ct qc tv ct` | 6 | 1 | 4 | `qc` | `tv`, `ct`, `sg` | `qc`, `tv`, `ct`, `sg` |

- **Blank position and option generation rules:** exactly one blank per sequence; its 1-indexed position `b` is fixed per level and never random — the blank sits on the last tile in levels 1–3, then at positions 5, 4, 4 in levels 4–6, position 3 in level 7, and position 1 in level 8; the table is authoritative. Options: (1) the correct option is the token that lands at `b` when the unit repeats across the full sequence; (2) distractors are the pattern's **distinct** non-answer unit tokens in first-occurrence order, then outside tokens from the fixed order `ct → sg → qc → tv` skipping any token already in the sequence or already chosen, until `n` options exist; (3) the generation array `[correct, ...distractors]` is rotated left by `level mod n` positions to produce the tray order. Worked example (level 5): generation array `[ct, sg, qc]`, rotation `5 mod 3 = 2` → tray `qc, ct, sg`.
- **Worked example (level 4):** the row shows star, triangle, triangle, star, ▢, triangle. The child taps the gold star (wrong): it nudges, flashes coral, "That's a star. Try again!" plays; 800 ms later the blank slot glows gold for 1.2 s. The child taps the violet triangle: it flies into the blank over 300 ms, the row pops star→triangle→triangle→star→triangle→triangle, confetti falls, "You finished the pattern!" plays, progress saves; 2.5 s later level 5 appears with `ct sg qc ▢ sg qc`.
- **Randomization and progression:** none random (patterns, sequences, blanks, options, and tray orders are fixed by the tables; identical every run); progression is fixed and completion-gated (tap the correct option once), with no timer, score, or adaptive difficulty, and the next level starts 2.5 s after the correct tap.
- **Layout numbers:** (`W` = viewport width in CSS px.) Play field centered, max width 960 px. Sequence row top y = 200 px at width ≥900, 168 px at 480–899, 140 px below 480. `tile = clamp((W − 24) / L − 8, 44, 72)` px; `gap = clamp((W − 24 − L × tile) / (L − 1), 4, 20)` px; token glyph = 0.75 × tile centered in its tile (`Vs` glyph = 0.625 × the `Vb` glyph, preserving the 1.6:1 size contrast). Option tray top = sequence-row bottom + 48 px; tray width = `min(W − 24, 960)` px; tray padding 24 px (12 px below 480); option tiles are centered as a group within the tray padding, glyph = 0.75 × `optTile`; `optTile` = 80 px at ≥768, 72 px at 480–767, 64 px below 480; `optGap` = 24 px / 20 px / `clamp((trayInner − n × optTile) / (n − 1), 4, 12)` px, where `trayInner` = tray width − 2 × tray padding. HOME 64×64 top-left, 24 px margin. No scrolling is required down to 320×480.

## 9. Feedback, rewards, and audio cues

Effect definitions (reused by the FRs; no undefined effects): **pop** scale 0→1 over 150 ms; **pulse** scale 1→1.08→1 over 300 ms; **nudge** translateX 0→−8→+8→0 twice over 300 ms; **fly** straight-line translate from the option tile center to the blank slot center over 300 ms with scale 1→1.15→1; **tile pop-in** scale 0→1 over 150 ms staggered 60 ms left→right; **gold highlight** 6 px `#F2B84B` outline on the blank slot, opacity 0→0.8→0 over 600 ms, repeated twice (1.2 s); **coral flash** 4 px `#E2735C` outline on the wrong tile, opacity 0.6 in 150 ms, out over 300 ms; **halo** 6 px gold ring around the correct option, scale 1→1.15 at 1 Hz for 3 pulses; **tray pulse** tray outline opacity 0→0.6→0 over 600 ms; **tray rise** translateY 80→0 over 200 ms; **confetti** ≤40 particles falling 600 ms in teal, coral, gold, violet (**complete confetti**: ≤60 particles over 900 ms); **ring fill** SVG stroke-dashoffset 0→100% linear over 3 s; **depress** scale 1→0.95→1 over 80 ms.

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Level start | tiles pop in (60 ms stagger); tray rises over 200 ms | `vo_instruction` — 1.0 — one-shot |
| Correct option tapped | fly 300 ms; slot fills; completed row pops (60 ms stagger); confetti ≤40/600 ms | `sfx_pop` — 0.7 — one-shot; `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Wrong option tapped | nudge 300 ms + coral flash; blank gold-highlight 1.2 s at 800 ms | `sfx_soft_buzz` — 0.5 — one-shot; `vo_wrong_<token>` — 0.9 — one-shot |
| Blank slot tapped | tray pulse 600 ms | `vo_instruction` — 0.9 — one-shot |
| Empty tap | none | none |
| Idle 12 s (stage 1) | blank gold-highlight 1.2 s | `vo_instruction` — 0.9 — one-shot |
| Idle 24 s (stage 2) | stage 1 + halo on the correct option for 3 s | `vo_hint_2` — 0.9 — one-shot |
| Game complete (level 8) | trophy + ≤60 confetti particles over 900 ms | `sfx_chime` — 0.8 — one-shot; `vo_complete` — 1.0 — one-shot |
| HOME / Play / Replay pressed | depress 80 ms | `sfx_tap` — 0.6 — one-shot |
| Reset hold completed | ring fills during the hold; checkmark 200 ms in / 800 ms hold / 200 ms out | `sfx_soft_tap` — 0.7 — one-shot |
| Optional background | — | `music_loop` — 0.15 — loop |

`vo_instruction`: "Which one comes next? Fill in the blank!" `vo_wrong_circle`: "That's a circle. Try again!" `vo_wrong_star`: "That's a star. Try again!" `vo_wrong_square`: "That's a square. Try again!" `vo_wrong_triangle`: "That's a triangle. Try again!" `vo_wrong_big_circle`: "That's a big circle. Try again!" `vo_wrong_small_circle`: "That's a small circle. Try again!" `vo_hint_2`: "Tap this one!" `vo_praise`: "You finished the pattern!" `vo_complete`: "You finished every pattern!" No negative wording. Timbre, language, and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first user gesture (unlocked on Play, R-005); each new voice clip cancels the previous utterance; degradation — no speech synthesis → the blank gold highlight, option halo, and visuals carry play (R-010); no audio context → silent; storage blocked (throws/private mode) → run unsaved in memory. Background-tab timers may fire late; on `visibilitychange` to visible the game runs any expired timer and never loses progress (R-013).

## 10. Progress and persistence

- **Storage class:** browser local storage. No network, no accounts.
- **Key:** `spec.fillPattern.v1`
- **Shape:** `{ "highestUnlocked": 1-8, "levelsCompleted": 0-8, "updatedAt": "<ISO-8601>" }`
- **Save points:** entering `celebrating` (level complete), entering `complete`, and any HOME press; `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play resumes at `highestUnlocked` (level 1 on first run).
- **Reset:** hold the title logo 3 s → clear the key and in-memory progress and show the checkmark (FR-014); keyboard equivalent on the focused logo.
- **Deliberately not stored:** wrong-tap counts, timings, per-level statistics, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_room` | image | soft cream play backdrop, radial gradient, subtle dots | 1024×768 SVG | static | SVG gradient + circles |
| `tile_slot` | image | cream rounded square with 2 px ink border and soft shadow | 128×128 SVG, scales | static | SVG rounded rect |
| `blank_slot` | image | dashed 4 px ink outline (35% opacity) with a 28 px pale puzzle-piece glyph, centered | 128×128 SVG, scales | static | SVG path |
| `option_tray` | image | light wooden tray: rounded rect, `#F4E3C8` fill, 3 px ink border | 960×160 SVG, scales | static | SVG rounded rect |
| `tok_circle_teal` | image | teal filled circle with a small white highlight | 128×128 SVG | static | SVG circle |
| `tok_star_gold` | image | gold five-point star, rounded points | 128×128 SVG | static | SVG polygon |
| `tok_square_coral` | image | coral rounded square | 128×128 SVG | static | SVG rect |
| `tok_triangle_violet` | image | violet rounded-corner triangle | 128×128 SVG | static | SVG path |
| `tok_circle_violet_big` | image | violet circle, big size of the P5 pair | 128×128 SVG | static | SVG circle |
| `tok_circle_violet_small` | image | violet circle, small size of the P5 pair (1.6:1 vs big) | 128×128 SVG | static | SVG circle |
| `trophy` | image | gold trophy on a base | 200×200 SVG | static | SVG shapes |
| `sfx_pop` | audio | bubble pop | 0.15 s, ogg/mp3 | one-shot | WebAudio blip |
| `sfx_soft_buzz` | audio | soft low boop (never a harsh buzzer) | 0.2 s | one-shot | WebAudio sine drop |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `sfx_tap` / `sfx_soft_tap` | audio | UI click / muted tap | 0.08 s / 0.10 s | one-shot | WebAudio blip |
| `vo_instruction` | audio | "Which one comes next? Fill in the blank!" | ≤3 s | one-shot | TTS allowed |
| `vo_wrong_circle` / `_star` / `_square` / `_triangle` / `_big_circle` / `_small_circle` | audio | "That's a *shape*. Try again!" per token | ≤2 s each | one-shot | TTS allowed |
| `vo_hint_2` | audio | "Tap this one!" | ≤1.5 s | one-shot | TTS allowed |
| `vo_praise` | audio | "You finished the pattern!" | ≤2.5 s | one-shot | TTS allowed |
| `vo_complete` | audio | "You finished every pattern!" | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop, 0.15 | may be omitted |

- **Palette tokens:** background `#FDF3E3`, ink `#3E2C1E`, teal `#6FA8A0`, coral `#E2735C`, gold `#F2B84B`, violet `#8E7CC3`, success `#7BC47F`, tray `#F4E3C8`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); visible text limited to the optional words "Play" and "Replay"; every meaning is carried by glyph, motion, and voice.
- **Load failure:** missing visual → draw a stub shape, log a warning, keep playing; missing audio → continue silently (R-010).

## 12. State and data shapes

| Shape | Field | Type | Notes |
|---|---|---|---|
| `LevelConfig` | `level` | `1-8` | index into the section 8 table; fixes `patternId` |
| | `unit` | `TokenCode[]` | one repeating unit, left→right |
| | `sequence` | `TokenCode[L]` | `L = unit.length × repeats` (repeats 2 or 3); exactly one blank |
| | `blankIndex` | `1..L` | 1-indexed; fixed by the level table |
| | `options` | `{ token: TokenCode; isCorrect: boolean }[]` | tray order; exactly one `isCorrect` |
| `SaveState` | `highestUnlocked` | `1-8` | resume point for Play |
| | `levelsCompleted` | `0-8` | max level completed |
| | `updatedAt` | string | ISO-8601, refreshed each save |
| `SessionState` (memory) | `state` | `loading \| title \| playing \| teaching \| celebrating \| complete` | section 6 |
| | `level`, `wrongTileIndex` | number, number? | current level; option index during teaching |
| | `idleStage`, `idleTimer`, `teachingTimer`, `celebrationTimer` | number, timer ids | `idleStage` 0/1/2; all timers cleared on HOME and transitions |

`TokenCode` = `ct \| sg \| qc \| tv \| Vb \| Vs`; `patternId` ∈ `P1 \| P2 \| P3 \| P4 \| P5 \| P3v \| P4v` (section 8).

## 13. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector or raster sprites, rounded tiles, one horizontal sequence row, and all defined animations (pops, nudge, 300 ms fly, outline opacity highlights, ≤40-particle confetti).
- **R-002** The game shall hit-test pointer input against option-tile and blank-slot rectangles with an 8 px edge tolerance and the section 7 tie rule.
- **R-003** The game shall support keyboard focus and activation for every interactive target, including the 3 s hold reset.
- **R-004** The game shall play concurrent one-shot audio clips (sfx + voice) and may loop one music track at volume 0.15.
- **R-005** When the browser blocks audio before a user gesture, the game shall defer audio until the first interaction (Play) and shall not require sound to proceed.
- **R-006** The game shall persist and restore one small JSON save object in browser local storage, and shall run unsaved in memory when storage is unavailable.
- **R-007** The game shall run offline with no network requests after initial load.
- **R-008** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-009** The game shall provide hit targets ≥64 CSS px for options and ≥44 CSS px for the sequence row and blank slot, with visible focus indicators.
- **R-010** When a voice clip or audio API fails, the game shall continue with visual feedback only.
- **R-011** The game shall scale from 768×1024 to 1366×768 viewports without losing state; no scrolling down to 320×480.
- **R-012** The game shall expose an invisible accessible name on every interactive element.
- **R-013** When the tab is backgrounded and timers are throttled, the game shall run any expired timer once visibility is restored and shall not lose progress.
- **R-014** The game shall generate all level content deterministically from the section 8 tables with no runtime randomness.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the title screen shows a logo and a Play target |
| AC-02 | a first load | Play is pressed | level 1 starts with the row `ct sg ct` ▢, the tray `ct, sg`, and "Which one comes next? Fill in the blank!" (no audio may play before this gesture) |
| AC-03 | saved progress at level 5 | Play is pressed | level 5 starts with the row `ct sg qc` ▢ `sg qc` and the tray `qc, ct, sg` (Play resumes at the highest unlocked level) |
| AC-04 | level 1 | the gold star (`sg`) is tapped | it flies into the blank within 300 ms, the completed row pops left→right, confetti falls, "You finished the pattern!" plays, and 2.5 s later level 2 appears |
| AC-05 | level 4 | the gold star (`sg`) is tapped | the tile nudges, flashes coral, "That's a star. Try again!" plays, the tile stays in the tray, the blank slot gold-highlights 1.2 s starting 800 ms after the tap, and level 4 remains playable |
| AC-06 | level 4 | a wrong tile is tapped twice within 2 s | teaching restarts from the second tap (new nudge and voice), only one voice clip is audible at a time, and the blank highlight is timed from the second tap |
| AC-07 | level 4 in teaching | the violet triangle (`tv`) is tapped | celebration starts immediately and the teaching timers produce no further feedback |
| AC-08 | any level | empty space is tapped | nothing on screen changes and no sound plays; the idle timer resets |
| AC-09 | 12 s with no tap | idleness continues | the instruction voice replays and the blank slot gold-highlights for 1.2 s; at 24 s the correct option halos and "Tap this one!" plays; any tap resets both |
| AC-10 | keyboard focus | Tab reaches an option and Enter is pressed | it behaves exactly as a tap, and the tab order is HOME → blank slot → options left→right |
| AC-11 | any level | the correct option is double-tapped rapidly | exactly one celebration occurs and the second tap produces no additional feedback |
| AC-12 | two simultaneous touches on two options | they land together | they process sequentially in touch-down order (left→right on ties); if the correct option is processed first, celebration starts and the second tap is ignored |
| AC-13 | the celebration is playing | HOME is pressed | the 2.5 s timer is cancelled, the save is written, and the title screen appears |
| AC-14 | level 8 completion | celebration ends | the trophy screen appears and progress is saved |
| AC-15 | a saved game | the page reloads and Play is pressed | play resumes at the highest unlocked level with the correct row, blank position, and tray order |
| AC-16 | the title screen | the logo is held 3 s | a progress ring is visible during the hold and the save is cleared on completion; the keyboard equivalent behaves the same |
| AC-17 | a mid-level resize from 1024×768 to 768×1024 | the viewport changes | the row and tray reflow per the section 8 formulas with no state change, options ≥64 px, and sequence tiles ≥44 px |
| AC-18 | speech synthesis is unavailable | any level plays | all feedback is still visible on screen (blank highlight, halo, fly, confetti) and the game remains completable; with no audio context the game is silent but fully playable |
| AC-19 | storage is blocked (private mode) | a level is completed | the game continues to the next level without error and the save is kept in memory only |
| AC-20 | level 1 | five wrong taps land in a row | no score, loss, or level change occurs and every option (including the correct one) remains tappable and solvable |
| AC-21 | any level | the blank slot is tapped (touch, click, or keyboard) | `vo_instruction` replays, the option tray pulses for 600 ms, and the row, blank, and options are unchanged |
| AC-22 | a screen reader is active | the title, playing, and complete screens are navigated | every interactive element announces an invisible name (e.g., the blank slot announces "Blank, tap to hear the instruction"), and visible text stays limited to "Play"/"Replay" |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked, and one full level completes end-to-end: row + blank, wrong-tap teaching with delayed blank highlight, correct-tap fly, celebration, auto-advance.
2. Levels 1–8 run with the exact table values (sequences, blanks, options, tray orders); progress survives a reload and resets via the 3 s hold.
3. No fail state exists; every edge case in FR-012 behaves as specified.
4. Runs offline in a browser at 1024×768 and 768×1024, and down to 320×480 without scrolling.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Pattern catalog P1–P5 plus two variant re-skins covers Kindergarten pattern completion | designed — the blog names no pattern types; AB, AAB, ABB, ABC, and an AB size pattern are the canonical pre-K/K sequence types |
| A2 | One blank per sequence; eight fixed levels; 2/3/4 options by level; token vocabulary of four shapes, four colors, two sizes | designed — original assets only |
| A3 | Naming the tapped shape in the wrong-tap voice teaches vocabulary without requiring reading | designed |
| A4 | TTS-generated voice clips are acceptable for the build | designed |
| A5 | Browsers block autoplay until the first gesture | platform fact — handled by R-005 |
| A6 | Background-tab timers may be throttled; hints and auto-advance fire late | known platform behavior — handled by R-013 |
| A7 | Storage may be unavailable (private mode); the game runs unsaved | platform fact — handled by R-006 |
| A8 | `speechSynthesis` voices may load asynchronously; the first clip may be delayed | platform fact — visual feedback is independent |
| A9 | The in-app activity name may differ from the blog heading | catalogued entry note |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** pattern catalog, level table values (sequences, blank positions, option counts, tray orders), option-generation and rotation rules, correct/wrong feedback semantics, no fail state, hit-target minimums, save key and shape, original-asset rule, acceptance criteria.
- **Free:** exact composition within the layout numbers, easing curves, particle specifics, voice timbre/TTS engine, optional music, whether Play/Replay show words or glyphs, tray and tile decoration within palette tokens.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics, scoring or adaptive difficulty, teacher tooling.
