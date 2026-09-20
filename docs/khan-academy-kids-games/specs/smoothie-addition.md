# Make smoothies by adding

## 1. Front matter

- **Entry type:** Math activity (game)
- **Catalogued entry:** [`smoothie-addition.md`](../smoothie-addition.md)
- **Official source:** [Khan Academy Blog — Free Kindergarten Math Games](https://blog.khanacademy.org/free-kindergarten-math-games) — "Make smoothies by adding"; body: "Adding is fun when you're making a smoothie! the bear in the corner tells kids to drag 2 oranges and one strawberry into the blender"; catalogued entry: "An early addition activity: the bear in the corner tells kids to drag 2 oranges and one strawberry into the blender to make a smoothie."
- **Spec status:** v1 — follows template v1; not yet blind-built
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; no network after load

## 2. Overview and learning objective

A helper bear speaks a recipe ("Add 2 oranges and 1 strawberry!"). The player finds those fruits on a shelf (from level 2, among distractor fruits) and adds them to a blender by dragging — or by tapping the fruit, then the blender. Each fruit lands with a pop as its ingredient row counts up; when the recipe is complete the blender blends, pours a smoothie, and the card reveals the total ("2 oranges and 1 strawberry make 3 fruits!"). The skill is **early addition**: two groups combined into one total. Age band: **4–6 (Kindergarten per the official blog)**; pre-reader rules apply. Expected session: **4–8 minutes** (eight levels), or one to two levels in a short sitting.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Early addition: two groups of fruit, one result | official | Blog heading "Make smoothies by adding"; body "the bear in the corner tells kids to drag 2 oranges and one strawberry into the blender" |
| O2 | The instruction says drag **2 oranges and one strawberry** into the blender | official | Catalogued entry's blog description |
| O3 | A bear in the corner gives the instruction | official | Catalogued entry: "the bear in the corner tells kids" |
| O4 | The result is a smoothie | official | Entry heading "Make smoothies by adding" |
| O5 | Positioned for Kindergarten | official | Blog post is "Free Kindergarten Math Games" |
| D1 | The helper is an **original chef-hatted generic bear** (original art, no Khan Academy name or look); the blog says only "a bear in the corner" | designed | KA characters must not be copied |
| D2 | Two ingredient groups (oranges, strawberries) every level; 8 levels with sums 2→6 | designed | Progression needed to build; the blog names only 2+1 |
| D3 | Recipe card: two numeral + pictogram rows, a "+", an "=" shown at completion, and a total badge reading "?" until then | designed | Makes the addition observable; numerals are content |
| D4 | Shelf holds exactly the recipe's fruit plus 0–2 distractors (banana, blueberry) | designed | Enables wrong-fruit teaching; exact stock makes over-adding impossible |
| D5 | Drag numbers: 8 px drag threshold, 24 px drop tolerance, 200 ms return | designed | Template v1 requires numeric tolerances |
| D6 | Tap-to-place alternative: tap fruit, tap blender | designed | Accessibility; single-pointer equivalent of the official drag |
| D7 | Blend 1.2 s + pour 0.8 s + sum reveal + 2.5 s hold = 4.5 s celebration | designed | Turns the recipe into a visible, audible round ending |
| D8 | No fail state; 12 s idle hint on the needed fruit first in shelf reading order | designed | Never punishing; audio-first for non-readers |
| D9 | Progress saved locally; levels unlock in order; reset by 3 s hold | designed | Session continuity without accounts; template v1 rule |
| D10 | All art, palette, audio, animations, layout | designed | Buildability invention |

## 4. Player experience / core loop

A child presses Play. Level 1 shows a card: "2" beside an orange, "1" beside a strawberry, "?" at the bottom. The bear waves: "Add two oranges and one strawberry!" The shelf holds exactly two oranges and one strawberry; the blender is empty. The child drags an orange in: it flies to the blender, the orange row count badge pops showing "1", and a voice says "one orange". A second orange → "two oranges". The strawberry → "one strawberry". Both rows are full: blades spin, a smoothie pours into a cup, the "?" flips to "3", and the voice says, "Two oranges and one strawberry make three fruits!" Confetti falls, and 2.5 s later level 2 slides in with a banana on the shelf.

**Core loop:** hear the recipe → find the right fruit on the shelf → drag or tap it into the blender → watch the ingredient count grow → see the total revealed → next recipe.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the game loads, it shall show a title screen with a blender logo (≥96×96 CSS px) and one Play target (≥96×96 CSS px). |
| FR-002 | When Play is pressed, the game shall start `playing(level = highestUnlocked)`: the recipe card for the level (two rows of ingredient pictogram + addend numeral + slot dots, a row count badge shown after that row's first placement, a "+", and a total badge reading "?"), a shelf holding exactly the level's fruit plus distractors in slot order (section 8), an empty blender, and the helper bear bottom-left; then it shall speak `vo_recipe_N` and wave the helper (section 9). |
| FR-003 | When the player presses a shelf fruit and moves ≥8 CSS px, the game shall start a drag: the fruit follows the pointer 1:1 with a 16 px vertical lift, scales to 1.15, and plays `sfx_pick`. Only one drag may be active at a time (FR-014). |
| FR-004 | When a dragged fruit is released with its center inside the blender drop rectangle (the blender body expanded by 24 CSS px), the game shall place it (FR-006); otherwise the fruit shall return to its shelf slot over 200 ms with `sfx_soft_tap` and no penalty. |
| FR-005 | When a shelf fruit is tapped (pointer released <8 px from press), the game shall hold it: 4 px accent ring, bob (section 9), `sfx_pick`; tapping the blender then places the held fruit (FR-006; a held distractor instead triggers the FR-009 teaching); tapping another shelf fruit swaps the hold; tapping the held fruit or empty space releases it to its slot over 200 ms. |
| FR-006 | When a fruit is placed, the game shall, in order: fly it 200 ms to the next free blender slot (slots fill bottom row left→right, then the row above), remove it from the shelf, pop its ingredient row count badge (180 ms), play `sfx_drop`, and speak the row's new count (`vo_count_*`, section 9). |
| FR-007 | When placed counts equal the recipe (both rows full), the game shall enter `celebrating`: 0–1.2 s blade spin + `sfx_blend`; 1.2–2.0 s pour into a cup + `sfx_pour`; at 2.0 s an "=" appears before the total badge, the badge flips "?"→sum, `sfx_chime` + `vo_sum_N` play, and confetti bursts (≤40 particles, 600 ms); the level advances 2.5 s later (4.5 s total). |
| FR-008 | When celebration ends, the next level shall start automatically; after level 8 the completion screen shall appear instead. |
| FR-009 | When a distractor fruit (banana, blueberry) is placed or dropped on the blender, the game shall enter `teaching(level, slot)` for 1.8 s: nudge the fruit 300 ms, show a badge above it with the fruit pictogram for 1.5 s, pulse the card 300 ms, play `sfx_soft_buzz` + `vo_wrong_<fruit>`, and return the fruit to the shelf slot it came from over 200 ms. No count changes; no progress is lost. |
| FR-010 | When the blender, a placed fruit, or empty space is tapped with nothing held, no state shall change (no sound, no count); any tap resets the idle timer. While `celebrating` or `complete`, shelf-fruit, blender, and empty taps are ignored (no drag, hold, or sound); only HOME (and Replay in `complete`) responds. |
| FR-011 | The game shall have no fail state: mis-taps, distractor drops, repeated taps, and idle time never remove placed fruit, never end a level, and never block progress. |
| FR-012 | When no tap has occurred for 12 s during `playing` or `teaching`, the game shall replay `vo_recipe_N` and show a pulsing halo (section 9) around the needed fruit first in shelf reading order (top row left→right, then next row); the hint repeats every 12 s of continued idleness. Any tap, including an empty-space tap, resets the timer. |
| FR-013 | When HOME is pressed, the game shall cancel all running timers (celebration 4.5 s, teaching 1.8 s, idle 12 s), return any held or dragged fruit to its shelf slot, save, and show `title`. HOME is rendered in `playing`, `teaching`, `celebrating`, and `complete`; on `title` it is a no-op (title is home); it is inert in `loading`. |
| FR-014 | Edge cases. Rapid double-tap on a shelf fruit → first tap holds, second releases; no count change. Rapid double-tap on Play → only the first press starts a level. Second simultaneous touch while a fruit is held or dragged → ignored until that gesture ends; two simultaneous touches with none active → the first in touch-down order wins (ties: leftmost, then topmost shelf slot) and the other is ignored. Rapid repeated taps → each processed in order; placed counts can never exceed the recipe (the shelf holds exactly the recipe stock). Resize/rotation mid-level → reflow per section 8; placed counts, numerals, and blender contents preserved; a held or dragged fruit returns to its slot. Tab backgrounded mid-level → state persists; idle hints may fire late (A8). No input → FR-012 after 12 s. |
| FR-015 | All instructions and feedback shall be understandable without reading: helper voice + pictograms + numerals. Visible text is limited to numerals (content), the glyphs "+" and "=", and the optional words "Play" and "Replay". |
| FR-016 | When the title blender logo is held for 3 s, the game shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and shows a checkmark (200 ms in, 800 ms hold, 200 ms out) plus `sfx_soft_tap`. Holding Enter/Space for 3 s on the keyboard-focused logo behaves identically. |
| FR-017 | Every interactive element (logo/reset, Play, HOME, each shelf fruit, blender, Replay) shall carry an invisible accessible name; FR-015's text limit governs visible text only. |

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank with soft background | initial state; preload assets; audio locked |
| SC-02 | `title` | blender logo + Play target | audio unlocks on first user gesture |
| SC-03 | `playing(level, placed)` | recipe card + shelf + blender + helper + HOME | main state; `placed = {oranges, strawberries}` |
| SC-04 | `teaching(level, slot)` | SC-03 + badge/nudge at shelf slot `slot` | ≤1.8 s; shelf and blender stay interactive |
| SC-05 | `celebrating(level)` | frozen level + blade spin + pour + sum + confetti | 4.5 s total |
| SC-06 | `complete` | trophy + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `playing(highestUnlocked)` | entry: unlock audio; FR-002 |
| `title` | `RESET_HOLD` | hold ≥3 s on logo | `title` | action: ring fills during hold; clear save + memory; checkmark + `sfx_soft_tap` |
| `playing` | `FRUIT_DRAG_START` / `FRUIT_HOLD` | — | `playing` | actions: FR-003 / FR-005 |
| `playing` | `FRUIT_PLACED` | correct fruit | `playing` or `celebrating` | actions: FR-006; if recipe complete FR-007 + save |
| `playing` | `FRUIT_REJECTED` | distractor | `teaching(level, slot)` | actions: FR-009 |
| `playing` | `EMPTY_TAP` / `BLENDER_TAP` | nothing held | `playing` | none; resets idle timer |
| `playing` | `IDLE_12S` | no tap 12 s | `playing` | actions: FR-012 halo + `vo_recipe_N` |
| `playing` | `HOME_PRESSED` | — | `title` | action: cancel drag/hold, save |
| `teaching` | `TEACHING_DONE` | 1.8 s elapsed | `playing(level)` | action: badge opacity 1→0 over 200 ms |
| `teaching` | `FRUIT_REJECTED` | distractor | `teaching(level, slot)` | actions: FR-009; restart 1.8 s; new voice cancels prior |
| `teaching` | `FRUIT_PLACED` | correct fruit | `playing` or `celebrating` | action: cancel teaching timer; FR-006/007 |
| `teaching` | `HOME_PRESSED` | — | `title` | action: cancel timer, save |
| `celebrating` | `CELEBRATION_DONE` | level < 8 | `playing(level+1)` | action: layout next level; FR-002 |
| `celebrating` | `CELEBRATION_DONE` | level = 8 | `complete` | action: save |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel 4.5 s timers, save |
| `complete` | `REPLAY_PRESSED` | — | `playing(1)` | action: fresh run, progress kept |
| `complete` | `HOME_PRESSED` | — | `title` | action: save |

**Tab order (v1):** `title` — logo → Play; `playing` / `teaching` — HOME → shelf fruits in slot order 1–8 (placed fruits leave the shelf and the tab order) → blender; `celebrating` — HOME; `complete` — HOME → Replay; `loading` — none. **HOME everywhere (v1):** HOME returns to `title` in every state, cancelling celebration, teaching, and idle timers and any held or dragged fruit, and saving first; it is inert in `loading`.

## 7. Input and interaction

- **Primary input:** drag-and-drop (the official mechanic) with a single-pointer tap-to-place alternative (FR-005); both work with touch, mouse, and keyboard.
- **Hit areas:** each shelf slot ≥ **96×96 CSS px** at viewports ≥1024 px wide, ≥ **64×64 CSS px** at 768–1023 px (above the 44 px platform minimum because children are measurably less accurate). The blender body is ≥280×360 px at ≥1024 and ≥220×300 at 768–1023; its mouth zone (200×60 px, 160×48 at 768–1023) is the 4 px outline drawn while a drag is active. Play ≥96×96; HOME/Replay ≥64×64, HOME top-left with a 24 px margin.
- **Drag model and drop tolerance:** press + move ≥8 px starts the drag; the fruit follows the pointer 1:1 with a 16 px vertical lift and 1.15 scale. A release with the fruit center inside the blender body expanded by 24 px places the fruit; a release 20 px below the body's bottom edge is placed, 30 px below returns to the slot over 200 ms. Only the blender accepts drops, so the drop test has no tie.
- **Tap model:** tap fruit → hold (4 px ring + bob); tap blender → place; tap another fruit → swap hold; tap the held fruit or empty space → release.
- **Mis-tap tolerance:** taps within **12 px** of a fruit slot's edge count as that slot. Overlapping halos: nearest slot center wins; exact ties resolve to the leftmost, then topmost slot.
- **Keyboard:** Enter/Space on a focused fruit picks it up (hold; on another fruit it swaps the hold, matching FR-005); Enter/Space on the focused blender places the held fruit; Enter/Space on the blender with nothing held is a no-op; Escape releases a held fruit. This is the keyboard equivalent of the drag. Focus indicator: 4 px outline, ≥3:1 contrast against the background.
- **Multi-touch:** one held/dragged fruit at a time; sequential processing per FR-014.
- **Instructions without reading:** helper voice + recipe card pictograms/numerals + halo; no text-only path.
- **Accessible names (invisible):** Play = "Play"; logo = "Blender, hold three seconds to reset progress"; shelf fruit = "Shelf slot 2, orange"; blender = "Blender, needs 2 oranges and 1 strawberry"; helper = "Helper chef bear"; HOME = "Home"; Replay = "Play again".

## 8. Levels and content data

| Level | Oranges | Strawberries | Sum | Distractors | Shelf slots 1–8, reading order |
|---|---|---|---|---|---|
| 1 | 2 | 1 | 3 | 0 | O, O, S |
| 2 | 1 | 1 | 2 | 1 banana | O, S, N |
| 3 | 2 | 2 | 4 | 1 banana | O, O, S, S, N |
| 4 | 1 | 3 | 4 | 1 banana, 1 blueberry | O, S, S, S, N, B |
| 5 | 3 | 2 | 5 | 1 blueberry, 1 banana | O, O, O, S, S, N, B |
| 6 | 4 | 1 | 5 | 1 banana, 1 blueberry | O, O, O, O, S, N, B |
| 7 | 4 | 2 | 6 | 1 banana, 1 blueberry | O, O, O, O, S, S, N, B |
| 8 | 3 | 3 | 6 | 1 banana, 1 blueberry | O, O, O, S, S, S, N, B |

Legend: O = orange, S = strawberry, N = banana, B = blueberry. Slots 1–4 = top row left→right, 5–8 = bottom row. Fill rule: oranges first, then strawberries, then distractors (banana before blueberry) — deterministic, no randomization.

- **Progression:** fixed and completion-gated (counts equal recipe). Level 1 mirrors the blog's 2+1 example; the remaining sums run 2, 4, 4, 5, 5, 6, 6 (range 2–6); levels 3/4, 5/6, and 7/8 share a sum with different addends, so the child sees one total built two ways. The next level starts 2.5 s after the pour finishes. No timer, no score, no adaptive difficulty.
- **Worked example (level 4):** recipe 1 orange + 3 strawberries; shelf slots 1–6 = O, S, S, S, N, B. The child drags the strawberry from slot 2 → strawberry row reads "1", "one strawberry". The child drops the banana (slot 5) → banana nudges, a banana badge shows 1.5 s, "That's a banana. This recipe needs oranges and strawberries!", the banana returns to slot 5. The child taps the strawberry at slot 4, taps the blender → "2 strawberries"; slot 3 → "3 strawberries"; the orange → "1 orange". Both rows full → blend 1.2 s, pour 0.8 s, "=" and "4" appear, "One orange and three strawberries make four fruits!", confetti; 2.5 s later level 5 appears (3 oranges + 2 strawberries).
- **Blender slots:** 6 positions, 2 columns × 3 rows, bottom row first, left→right. Maximum fruit per level is 6.
- **Layout numbers:** at width ≥1024 px — recipe card 160×200 px, top-center, y=32; shelf slots 96×96, gap 24, two rows starting x=48, y=288; fruit glyph 72 px inside its slot; blender 280×360, right margin 48, y=240; helper 180×180, bottom-left, 24 px margins. At 768–1023 px — card 128×160 at y=24; slots 64×64, gap 16, starting x=32, y=240; fruit glyph 48 px inside its slot (the whole 64 px slot is the hit area); blender 220×300, right margin 32, y=200; helper 140×140, 16 px margins. At height <700 px — card y=16 and vertical gaps 24→12; never scale below the 64 px hit-target floor. No scrolling is required from 768×1024 to 1366×768.

## 9. Feedback, rewards, and audio cues

Effect definitions: **pop** scale 0→1 over 150 ms. **Badge pop** numeral scale 1→1.15→1 over 180 ms. **Badge flip** badge scaleX 1→0→1 over 200 ms with the numeral swapping at the midpoint. **Slot dot fill** an empty recipe-row dot fills solid in its row's fruit color over 150 ms. **Bob** translateY 0→−8→0 over 1 s while held. **Halo** 6 px accent ring, scale 1.0→1.15 at 1 Hz for 3 pulses. **Nudge** translateX 0→−8→+8→0 twice over 300 ms. **Card pulse** scale 1→1.08→1 over 300 ms. **Fly** translate release point→destination over 200 ms along a 12 px arc. **Blade spin** rotate 0→720° over 1.2 s. **Blender glow** warm 8 px outline fading over 1.2 s. **Pour** a 24 px `#F2A47C` liquid stream from the spout into the cup over 0.8 s, cup fill 0→100%. **Confetti** ≤40 particles falling 600 ms in orange, red, teal. **Ring fill** progress ring stroke 0→100% linear over 3 s. **Checkmark** two-stroke tick, in 200 ms, hold 800 ms, out 200 ms. **Wave** helper arm rotates ±20° twice over 600 ms. **Depress** button scale 1→0.95→1 over 80 ms.

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Level start (FR-002) | card pops in 150 ms; helper waves 600 ms; tap-hand pictogram 2 s | `vo_recipe_N` — 1.0 — one-shot |
| Fruit picked up (drag or hold) | scale 1.15 (drag) or 4 px ring + bob (hold) | `sfx_pick` — 0.6 — one-shot |
| Fruit placed (correct) | fly 200 ms; slot dot fills; row badge pops 180 ms | `sfx_drop` — 0.7 — one-shot; `vo_count_*` — 1.0 — one-shot |
| Drop outside tolerance / hold released | fruit returns 200 ms | `sfx_soft_tap` — 0.4 — one-shot |
| Distractor placed (FR-009) | nudge 300 ms; badge 1.5 s; card pulse 300 ms | `sfx_soft_buzz` — 0.5 — one-shot; `vo_wrong_<fruit>` — 0.9 — one-shot |
| Blender tapped with nothing held / placed fruit tapped / empty tap | none | none |
| Blend phase (0–1.2 s) | blade spin 1.2 s; blender glow 1.2 s | `sfx_blend` — 0.7 — one-shot |
| Pour phase (1.2–2.0 s) | pour 0.8 s; cup fill 0→100% | `sfx_pour` — 0.6 — one-shot |
| Sum reveal (at 2.0 s) | "=" appears; badge flips "?"→sum; confetti 600 ms | `sfx_chime` — 0.8 — one-shot; `vo_sum_N` — 1.0 — one-shot |
| Level complete auto-advance | — | none (2.5 s silent hold) |
| Game complete (level 8) | trophy + full-screen confetti 600 ms | `sfx_chime` — 0.8 — one-shot; `vo_complete` — 1.0 — one-shot |
| Idle hint (FR-012) | halo pulses around the needed fruit | `vo_recipe_N` — 1.0 — one-shot |
| HOME / Play / Replay pressed | depress 80 ms | `sfx_tap` — 0.6 — one-shot |
| Reset hold completed | ring fills over the hold; checkmark 200/800/200 | `sfx_soft_tap` — 0.7 — one-shot |
| Optional background music | none | `music_loop` — 0.15 — loop |

`vo_recipe_N`: "Add *o* orange(s) and *s* strawberry/strawberries to the blender!" (level 1: "Add 2 oranges and 1 strawberry!"); `vo_count_oranges_1..4`: "one orange"…"four oranges"; `vo_count_strawberries_1..3`: "one strawberry"…"three strawberries"; `vo_wrong_banana`: "That's a banana. This recipe needs oranges and strawberries!"; `vo_wrong_blueberry`: same with "blueberry"; `vo_sum_N`: "*o* orange(s) and *s* strawberry/strawberries make *sum* fruits!"; `vo_complete`: "You made every smoothie!" Timbre, language, and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first user gesture (unlocked on Play, R-006); each new voice clip cancels the previous utterance; missing APIs degrade gracefully — no speech synthesis → visual only (pictograms, numerals, badges carry play), no AudioContext → silent, storage blocked → run unsaved. Background-tab timer throttling may delay idle hints but never loses progress (A8); on `visibilitychange` to visible the game runs any expired timer once (R-014).

## 10. Progress and persistence

- **Storage class:** browser local storage. No network, no accounts.
- **Key:** `spec.smoothie.v1`
- **Shape:** `{ "highestUnlocked": 1-8, "levelsCompleted": 0-8, "updatedAt": "<ISO-8601>" }`
- **Save points:** entering `celebrating` (recipe complete), entering `complete`, and any HOME press. `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play resumes at `highestUnlocked` (level 1 on first load).
- **Reset:** hold the title logo 3 s (ring feedback) → clears the key and in-memory progress and shows the checkmark (FR-016); keyboard equivalent on the focused logo.
- **Deliberately not stored:** placed counts, held/dragged state, per-tap data, timings, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. The helper bear is a generic chef-hatted bear deliberately unlike any Khan Academy character and carries no Khan Academy name. Programmatic stubs are acceptable when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_kitchen` | image | soft mint kitchen backdrop, faint dots; palette below | 1024×768 SVG | static | SVG gradient + circles |
| `helper_bear` | image | round brown bear `#B07A4B` in chef hat and apron, 2 poses (idle, wave); generic original design | 240×240 SVG | wave 600 ms at level start | SVG shapes |
| `shelf` | image | light wooden shelf, 2×4 slot recesses | 480×240 SVG | static | SVG rects |
| `fruit_orange` / `fruit_strawberry` / `fruit_banana` / `fruit_blueberry` | image | original fruit glyphs: orange circle + leaf, red seeded berry, yellow crescent, purple crowned circle | 96×96 SVG each | drag / hold / fly / return | SVG paths |
| `blender` | image | teal glass jug, 6-slot guide, blade, spout; mouth zone 200×60 | 320×400 SVG | blade spin / glow / pour | SVG shapes |
| `recipe_card` | image | cream card: two rows (pictogram + numeral + slot dots), "+", total badge | 160×200 SVG | pop / pulse / badge flip | SVG rects |
| `cup` | image | clear glass with fill area | 120×160 SVG | fill 0→100% on pour | SVG rects |
| `hint_halo` | image | 6 px accent ring | 96×96 SVG | 3 pulses per hint | SVG circle stroke |
| `pict_tap_hand` | image | white tapping-hand pictogram | 64×64 SVG | shown 2 s at level start | SVG path |
| `trophy` | image | simple gold cup | 200×200 SVG | static | SVG path |
| `badge` | rendered | numeral in a rounded rect, cream fill, 2 px ink border | runtime text | pop / flip | none needed |
| `sfx_pick` / `sfx_drop` / `sfx_soft_tap` / `sfx_tap` | audio | short pluck, plop, muted tap, UI click | 0.08–0.15 s each | one-shot | WebAudio blips |
| `sfx_soft_buzz` / `sfx_blend` / `sfx_pour` / `sfx_chime` | audio | soft boop (never harsh), blender whir 1.2 s, pour glug 0.8 s, 3-note chime 0.8 s | ≤1.2 s each | one-shot | WebAudio synth/noise |
| `vo_recipe_1..8` | audio | "Add *o* orange(s) and *s* strawberry/strawberries!" | ≤3 s each | one-shot | TTS allowed |
| `vo_count_oranges_1..4` / `vo_count_strawberries_1..3` | audio | spoken counts: "one orange"…"four oranges", "one strawberry"…"three strawberries" | ≤1 s each | one-shot | TTS allowed |
| `vo_wrong_banana` / `vo_wrong_blueberry` | audio | "That's a banana/blueberry. This recipe needs oranges and strawberries!" | ≤2.5 s each | one-shot | TTS allowed |
| `vo_sum_1..8` | audio | "*o* orange(s) and *s* strawberry/strawberries make *sum* fruits!" | ≤3 s each | one-shot | TTS allowed |
| `vo_complete` | audio | "You made every smoothie!" | ≤2 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 | may be omitted |

- **Palette tokens:** background `#EAF7F2`, ink `#2F4858`, orange `#F4A261`, strawberry `#E06666`, banana `#FFD966`, blueberry `#8E7CC3`, blender teal `#6FA8A0`, blended liquid `#F2A47C`, success `#7BC47F`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); recipe numerals ≥96 px at 1024×768; the words "Play"/"Replay" optional (the glyph carries the meaning; no reading is required).
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → continue silently (R-011).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `LevelConfig` | `level: int 1-8`; `recipe: { oranges: int 1-4; strawberries: int 1-3 }`; `sum: int 2-6`; `shelf: { type: orange\|strawberry\|banana\|blueberry; slot: int 1-8 }[]`; `blenderSlots: { x: int; y: int }[6]` (precomputed, fill order) |
| `Save` (persisted) | `highestUnlocked: int 1-8`; `levelsCompleted: int 0-8`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, playing, teaching, celebrating, complete}`; `level: int`; `placed: { oranges: int; strawberries: int }`; `heldFruitId: id?`; `dragFruitId: id?`; `idleTimer`; `teachingTimer`; `celebrationTimer` |

## 13. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector or raster sprites and large text numerals.
- **R-002** The game shall animate drag, hold, fly-to-slot, scale/bounce, blade rotation, liquid pour, progress rings, and a ≤40-particle burst.
- **R-003** When the player drags, taps, or clicks a fruit or the blender, the game shall hit-test a pointer event with an 8 px drag threshold and a 24 px drop tolerance.
- **R-004** The game shall support keyboard focus and activation for every interactive target, including pick-up and place as the equivalent of dragging.
- **R-005** The game shall play concurrent one-shot audio clips (sfx + voice) and may loop one music track at ≤0.15 volume.
- **R-006** When the browser blocks audio before a user gesture, the game shall defer audio until the first interaction (Play) and shall not require sound to proceed.
- **R-007** The game shall persist and restore one small JSON save object in browser local storage, and shall run unsaved when storage is unavailable.
- **R-008** The game shall run offline with no network requests after initial load.
- **R-009** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-010** The game shall provide hit targets ≥64 CSS px and visible focus indicators.
- **R-011** When a voice clip or audio API fails, the game shall continue with visual feedback only.
- **R-012** The game shall scale from 768×1024 to 1366×768 viewports without losing state.
- **R-013** The game shall expose an invisible accessible name on every interactive element.
- **R-014** When the tab is backgrounded and timers are throttled, the game shall run any expired timer once visibility is restored and shall not lose progress.
- **R-015** The game shall generate all levels deterministically from the section 8 table, with no runtime randomness.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the title screen shows a blender logo and a Play target |
| AC-02 | the title screen | Play is pressed | level 1 starts with a card showing "2", "1", and "?", three fruit on the shelf, an empty blender, and `vo_recipe_1` plays (audio may only start after this gesture, per R-006) |
| AC-03 | level 1 | an orange is dragged ≥8 px and released with its center inside the blender drop rectangle | it flies into the blender within 200 ms, the orange row badge reads "1", and "one orange" is spoken |
| AC-04 | level 1 | an orange is tapped, then the blender is tapped | the orange is placed exactly as in AC-03 (tap-to-place) |
| AC-05 | a dragged orange | it is released 20 px below the blender body's bottom edge | it is placed; released 30 px below, it returns to its shelf slot within 200 ms with no count change |
| AC-06 | level 2 | the banana is dropped on the blender | it nudges, a banana badge shows for 1.5 s, `vo_wrong_banana` plays, the banana returns to its slot, the card pulses, and the recipe counts are unchanged |
| AC-07 | a shelf strawberry | it is double-tapped rapidly | the first tap shows the hold ring, the second returns it to its slot within 200 ms, and no count changes |
| AC-08 | level 1 with 2 oranges and 1 strawberry placed | the recipe completes | blades spin 1.2 s, the smoothie pours 0.8 s, "=" appears, the badge flips "?"→"3", `vo_sum_1` plays, confetti falls, and 2.5 s later level 2 appears |
| AC-09 | the playing state | empty space or the blender with nothing held is tapped repeatedly | nothing on screen changes and no sound plays |
| AC-10 | rapid repeated taps and drops | the shelf holds only recipe stock | placed counts never exceed the recipe and extra gestures are no-ops |
| AC-11 | two shelf fruits touched simultaneously with none active | the touches land together | exactly one fruit is held, chosen by touch-down order (left→right, then top→bottom on ties), and the other touch is ignored |
| AC-12 | 12 s without a tap | idleness continues | `vo_recipe_N` replays and the halo pulses around the needed fruit first in shelf reading order, with no progress lost; any tap resets the timer |
| AC-13 | keyboard focus | Tab reaches an orange, Enter is pressed, Tab reaches the blender, Enter is pressed | the orange is placed exactly as a drag would place it |
| AC-14 | the celebration is playing | HOME is pressed | the 4.5 s timer is cancelled, the save is written, and the title screen appears |
| AC-15 | level 8 completion | celebration ends | the trophy screen appears and progress is saved |
| AC-16 | saved progress | the page reloads and Play is pressed | play resumes at the highest unlocked level with the correct recipe and shelf |
| AC-17 | the title screen | the logo is held for 3 s | a progress ring is visible during the hold and the save is cleared on completion; the keyboard equivalent behaves the same |
| AC-18 | a mid-level resize from 1024×768 to 768×1024 | the viewport changes | placed counts and numerals are unchanged and every shelf slot still has a ≥64 px hit target |
| AC-19 | speech synthesis is unavailable | any level plays | all feedback remains visible (pictograms, numerals, badges) and the level is completable |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. One full level completes end-to-end: recipe voice, drag and tap-to-place, row counts, distractor teaching, blend, pour, sum reveal, auto-advance.
3. Levels 1–8 run with the exact table values; progress survives a reload and resets via the 3 s hold.
4. No fail state exists; every edge case in FR-014 behaves as specified.
5. Runs offline in a browser at 1024×768 and 768×1024.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Maximum sum is 6 over 8 levels; sums 4, 5, and 6 each appear twice with different addends | designed — the blog gives only the 2+1 example |
| A2 | The helper is an original generic chef-hatted bear; no Khan Academy character name, look, or audio is used | designed — required by the original-assets rule |
| A3 | Distractor fruit are bananas and blueberries, 0–2 per level | designed |
| A4 | The shelf holds exactly the recipe stock, so over-adding is impossible | designed — removes an overflow branch |
| A5 | Addends are numerals on the recipe card; the sum is hidden until completion | designed — numerals are content, not instruction |
| A6 | TTS-generated voice clips are acceptable | designed |
| A7 | Browsers block autoplay until the first gesture | platform fact — handled by R-006 |
| A8 | Background-tab timers may be throttled; hints and auto-advance fire late | known platform behavior — handled by R-014 |
| A9 | Storage may be unavailable (private mode); the game runs unsaved | platform fact — handled by R-007 |
| A10 | Speech synthesis voices may load asynchronously; the first clip may be delayed | platform fact — visual feedback is independent |
| A11 | The in-app activity name may differ from the blog heading | catalogued entry note |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** level table values, recipe/addend pairs, drag tolerances (8 px / 24 px), tap-to-place equivalence, distractor teaching semantics, no fail state, hit-target minimums, save key and shape, original-asset rule, acceptance criteria.
- **Free:** exact composition within the layout numbers, easing curves, particle specifics, voice timbre/TTS engine, optional music, whether Play/Replay show words or glyphs, helper decoration within palette tokens (never resembling a Khan Academy character).
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics, scoring beyond completion, teacher tooling.

**Conditional sections:** none omitted — sections 6, 11, and 12 are all present and numbered.
