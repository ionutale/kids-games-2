# Camp Khan Kids

*Catalog name, kept for traceability only; it appears nowhere on screen or in audio.*

## 1. Front matter

- **Entry type:** Interactive player — seasonal collection browser (4 weekly-theme shelves, 16 original items, one 4000 ms preview per item)
- **Catalogued entry:** [`camp-khan-kids.md`](../camp-khan-kids.md)
- **Official source:** [Camp Khan Kids official page](https://www.khanacademy.org/kids/camp); [App Store listing — version history](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); catalog lines 251–254
- **Spec status:** v1 — first seasonal-collection spec; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-021); no network after load
- **Provenance constraint:** the catalogued title is retained at the head of this document for traceability only. The on-screen name is the original phrase **"Summer Camp!"**; no Khan Academy character, art, voice, audio, or copy is reproduced, and the string "Khan" appears nowhere on screen, in audio, or in an accessible name (D1, FR-024).
- **Collection-browser substitutions (declared):** four weekly-theme shelves replace levels; each item's 4000 ms preview replaces a round; a "camp complete" moment replaces a win condition; there is no scoring, no fail state, and no terminal state (HOME always returns to the title).

## 2. Overview and learning objective

A child presses Play on the title card and a summer-camp map opens: a tent, a sun, trees, and four wooden
signposts — arts & crafts, animals, friendship, and water & sun — each holding four small activities. The
child taps a signpost, four picture tiles settle in a grid, and tapping one plays a 4000 ms original demo
moment: three in-app activity steps animate in place, or a paper sheet slides in and numbers three
screen-free steps to try away from the screen. A warm voice names every item, a check pops at the end, and
a chime rings; the child can replay, step between items, go back, or go home at any time, and the
collection strip counts what they have seen — 16 all together. The skill is **independent choice-making
and screen-free follow-through** — "I can pick a camp activity, and some of them happen away from the
screen" — plus seasonal-vocabulary and step-following exposure for the youngest. Age band: **2–8 library
audience** (designed targeting); this entry serves **2–5 pre-readers** first, with 6–8 early readers
following the spoken names. Expected session: **2–5 minutes** (two to four previews); a full browse of all
16 items spans several sessions.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Camp is an **annual free virtual summer camp** with **in-app and screen-free activities** | official | Catalogued entry; catalog lines 251–254; [Camp page](https://www.khanacademy.org/kids/camp) |
| O2 | It is **organized around weekly themes** such as **arts & crafts, animals, and friendship** | official | Catalogued entry; catalog lines 251–254 |
| O3 | It is **seasonal and time-limited**; themes and dates vary by year | official | Catalogued entry Notes; catalog lines 251–254 |
| O4 | Official sources publish **no individual item titles, counts, art, audio, mechanics, or dates** for Camp | official (about the source's limits) | Catalogued entry Notes; absence verified across the cited sources |
| D1 | The on-screen name is the original phrase **"Summer Camp!"**, the frame is an original tent/sun/trees map, and the catalogued title is traceability only — no KA character, art, voice, or audio | designed | IP rule; the on-screen name is an original phrase (section 1) |
| D2 | Exactly **16 items across 4 themed shelves** (4 per shelf: **3 `activity` + 1 `screenFree`**) | designed | Concrete, buildable instantiation of the unpublished item set (O4); per-shelf counts are invented |
| D3 | The fourth weekly theme is **water & sun**; the three named themes are examples ("such as") so a fourth original theme is legitimate | designed | O2 says "such as"; 4 shelves × 4 items needs a fourth theme |
| D4 | Collection browsing: title → home map → shelf grid → 4000 ms item preview → camp-complete moment | designed | The shared seasonal-collection session shape; shelves replace levels, previews replace rounds |
| D5 | Each preview is one automatic, non-interactive demo beat (activity: three animated steps; screen-free: paper sheet + 3 numbered steps) — never another spec's game or activity | designed | Keeps every moment original and small; the previews are not the camp's real activities |
| D6 | Chrome (Play, HOME, back, prev/next, Replay, reset logo), 1200 ms lead-in, 12 s idle hints, 3 s reset hold, save/restore rings, audio rules, degradation, no fail state | designed | Template v1 and the seasonal family conventions |
| D7 | All item titles, art, voice copy, layout, animation timing, and the completion moment | designed | IP rule: all assets original (section 11) |
| D8 | No calendar, availability, lock, or countdown state exists although Camp is time-limited in reality; every item is always openable | designed | The player models the collection, not the annual schedule (O3) |

## 4. Player experience / core loop

A child presses Play. The map fades in over 200 ms and four signposts settle one after another; a voice
says "Welcome to summer camp! Tap a signpost to pick a week." The child taps the arts & crafts signpost —
"Arts and crafts week." — and four tiles appear: a paper crown, a leaf rubbing, a clothespin butterfly,
and a paper sheet. They tap the crown: the card grows in, "Paper crown." plays, then three steps animate —
a strip folds, points are cut, dots appear — with a little pop each, while the voice says "Fold, cut, and
decorate." A check pops, the chime rings, and Replay pulses; the child taps it and watches again. They
tap Next: the leaf rubbing plays. Later they tap the paper sheet — "Screen-free pinecone hunt." — and a
sheet slides in with three numbered pictures that light up one by one: find, gather, sort. On HOME the map
returns and the strip shows a campfire, "3 / 16", and a check. On the next visit the arts & crafts signpost
and the paper-sheet tile wear small accent rings, so they can pick up where they left off.

**Core loop:** home map → pick a signpost shelf → pick an item → watch or replay its 4000 ms demo →
step to the next item or go back → keep browsing until all 16 are seen ("camp complete").

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading` (prepare assets per section 11; audio locked; no focusables), then `title`: a soft sky backdrop and a themed summer-camp card (tent, sun, trees) carrying the visible name "Summer Camp!" (content), a Play target ≥96×96 CSS px, and a reset logo ≥64×64 CSS px at a 24 px top-left margin (FR-016). No audio shall play before the first pointer or key input (FR-020). The catalogued title and the string "Khan" shall appear nowhere on screen, in audio, or in an accessible name (FR-024). |
| FR-002 | When Play is pressed, the player shall unlock audio and run a 1200 ms themed reveal: the frame fades in over 200 ms and the four shelf cards settle (fade 300 ms + translate ≤16 px, stagger 30 ms — the grid-settle effect). Any pointer or key input during the reveal shall finish it instantly (that input is consumed — it opens nothing); HOME during it cancels to `title`. The reveal ends in `home(idle)`; `vo_welcome` (1.0, one-shot, ≤3.0 s) plays at 1200 ms on the first Play of the run, and, when a save exists, the saved shelf card soft-pulses once (1→1.04→1 over 400 ms) beginning when the reveal completes (1200 ms). |
| FR-003 | The `home` state shall show: the summer-camp map frame (tent, sun, trees — decorative, never a target), the four signpost shelf cards in fixed order (`crafts`, `animals`, `friendship`, `water`), each with its theme pictogram and a visible numeral badge "4", a collection strip (campfire pictogram 32×32, visited numeral, "/", total numeral "16", 32×32 check), and HOME ≥64×64 (FR-011). The check renders at 40 % opacity until every item is visited and at full opacity from then on; when the save lists all 16 ids it renders as the 32×32 star (FR-019). Every item shall always be openable: no calendar, availability, lock, download, or countdown state exists, and no shelf card or tile is ever disabled. The player shall make no network request at any time after load (FR-025). |
| FR-004 | When a shelf card is tapped, the player shall open `grid(shelf)`, play a 300 ms tile depress, `sfx_open` (0.6, one-shot, 0.12 s), speak `vo_shelf_{shelfId}` (1.0, one-shot, ≤1.5 s), fade the tiles in over 200 ms, and save (FR-018: writes `lastShelf`, sets `lastItemId: null`, keeps `visitedIds`). Shelf taps share one 500 ms throttle: a second shelf tap inside 500 ms shall not open a second shelf. |
| FR-005 | `grid(shelf)` shall show the shelf's four item tiles in the section 8 grid — 3 columns × 2 rows (three tiles in row 1, one in row 2) in item-index order left→right then down — plus the shelf's pictogram (48×48; 32×32 at 320–767) in the top chrome row and a back control ≥64×64. Shelves hold four items, so no paging exists in this family: no page dots and no chevrons are rendered. Every layout shall fit the viewport with no scrolling from 320×480 up (section 8). |
| FR-006 | When an item tile is tapped, the player shall open `preview(item, playing)`, play a 300 ms tile depress, speak `vo_item_{id}` (1.0, one-shot, ≤1.8 s), start the item's 4000 ms sample from 0 (FR-007), and save (`lastItemId` set; the id joins `visitedIds` once, FR-018). Item taps share one 500 ms throttle. |
| FR-007 | Each preview sample shall run one accumulated 4000 ms clock (never wall-clock) on the section 8 skeleton: 0–400 card fade-in (200 ms); 400–3400 the kind's main beat; 3400–3700 hold; 3700–4000 check pop (scale 0→1.15→1 over 300 ms); `sfx_chime` (0.8, one-shot, 0.8 s) at 4000 ms; then `preview(item, ended)` holds the final frame and the Replay control pulses (replay pulse: 3 × 1→1.15→1 over 200 ms each). `activity` items animate three steps in place at 400/1400/2400 ms, each step's shapes popping (300 ms) and sliding into place (translate 40 px→0 over 200 ms) with `sfx_pop` (0.6, one-shot) per step; `screenFree` items slide in a paper sheet at 400 ms and highlight three numbered pictogram steps at 400/1400/2400 ms, each gaining the accent ring (static 3 px `#F2994A` outline) with `sfx_tick` (0.5, one-shot, 0.06 s) per step, while the previous step's ring fades (200 ms) and a small check pops (300 ms) beside it. Every item's beat line `vo_item_{id}b` (1.0, one-shot, ≤1.8 s) starts at 2000 ms. Samples are automatic and non-interactive: no tap is needed, and there is no right/wrong, scoring, round logic, or another spec's game or activity. |
| FR-008 | When the card or the Replay control (≥64×64) is tapped in `preview(item, ended)` or during a sample, or R is pressed, the player shall cancel the current voice and sample audio and restart the sample and its `vo_item` line from 0. Replay is throttled to one restart per 500 ms; a double-tap inside 500 ms restarts once. |
| FR-009 | When Next or Previous (each ≥64×64) is tapped, or ArrowRight/ArrowLeft is pressed in `preview`, the player shall open the next/previous item of the same shelf, cancel the current voice and sample audio, speak that item's line, play its sample from 0, and save. At the first or last item of the shelf the control is a no-op (no visual or audio change; no wrap). Prev and Next share one 300 ms throttle (separate from Replay's 500 ms). |
| FR-010 | When the back control (≥64×64) is tapped or Backspace is pressed, the player shall cancel voice and sample audio and go up one level: from `preview` to `grid(shelf)` (also dismissing the completion panel), from `grid` to `home`. Back is throttled to one return per 300 ms and is not a save point. |
| FR-011 | HOME (≥64×64 CSS px, at the top-left of each state's chrome row: a 24 px margin at ≥1024 px wide, 16 px at 768–1023, 8 px at 320–767) shall be rendered in `home`, `grid`, and `preview`; pressing it shall cancel any voice, sample clock, and idle timer, save, and return to `title`. On `title` (the player's home) no HOME control is rendered and a HOME input (Escape) is a no-op; on `loading` no control is rendered and any input is a no-op. HOME is throttled to one press per 300 ms. |
| FR-012 | Hit-testing shall expand every control's rectangle by 12 px on all sides. A tap inside more than one expanded rectangle shall resolve to the nearest control center, then the leftmost, then the topmost. A tap more than 12 px from every control is an empty tap — no state change, no sound — and resets the idle timer (FR-015). A tap that starts inside a control never falls through to the frame, the strip, or the card beneath it. |
| FR-013 | The player shall track only the first pointer: a pointer-down inside a control (12 px-expanded) acquires it; pointer-up within 24 px of the down point activates it; a pointer that moves more than 24 px before release cancels that gesture with no state change (no drag gestures exist, so no drag alternative is required); additional simultaneous pointers are ignored until all pointers are released. On a same-millisecond tie between two pointers the leftmost wins. |
| FR-014 | Rapid or repeated taps shall never double-apply: taps inside a shared throttle produce exactly one judged event; taps inside a throttle keep their visual depress but play no second voice or sfx; a double-tap yields one shelf open, one preview, one replay, one step, or one HOME. Throttles: shelf taps, item taps, and Replay 500 ms each; back, prev, next, and HOME 300 ms. |
| FR-015 | When no pointer or key input has occurred for 12,000 ms, the player shall hint-pulse the state's deterministic target for 3,000 ms (hint pulse: 1→1.12→1 per 500 ms cycle): `title` → Play; `home` → the leftmost shelf with an unvisited item, else the leftmost shelf; `grid` → the first unvisited tile in index order, else the leftmost tile; `preview` → Replay. After the first gesture of the run the hint shall also speak the state's hint line (1.0, one-shot, ≤2.5 s); before it, the hint is visual-only. No hint shall fire while a sample is playing (the moving sample is its own cue). The hint repeats every 12,000 ms of continued idleness; any input, including an empty tap, resets the timer. |
| FR-016 | When the title logo is held for 3,000 ms, the player shall fill a visible progress ring (4 px accent stroke) for the hold duration; releasing early resets the ring to 0 with no action; on completion it shall clear the storage key and in-memory progress (`lastShelf`, `lastItemId`, `visitedIds`) and play a ring flash (opacity 1→0 over 300 ms) plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3,000 ms on the keyboard-focused logo is the equivalent. A hidden tab cancels the hold. |
| FR-017 | The player shall have no fail state: no wrong answer, score, star count, streak, timer, lock, deduction, or comparison exists; empty taps, rapid taps, multi-touch, going back, and idle time never remove progress, never close the collection, and never lose the visited set. |
| FR-018 | The player shall persist one small JSON object in browser local storage under `spec.seasonalCollections.camp.v1`: `{ "lastShelf": "crafts"\|"animals"\|"friendship"\|"water"\|null, "lastItemId": 0-15\|null, "visitedIds": [0-15 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`. Save points: shelf open (writes `lastShelf`, sets `lastItemId: null`, keeps `visitedIds`), preview entry (sets `lastItemId`; the item joins `visitedIds` once), completion, and HOME; every save refreshes `updatedAt` and never removes a visited id. Restore: `home` shows the saved shelf card with the accent ring (3 px `#F2994A`) and its single soft pulse (FR-002); inside that shelf the saved item tile shows the same ring when `lastItemId` is not null; nothing auto-opens and Play always starts at `title`. A run with no save shows no rings. Storage blocked → the run is unsaved per FR-021. |
| FR-019 | When the last unvisited item's sample ends and `visitedIds.length` reaches 16, that preview shall play the camp-complete moment at 4000 ms: confetti (≤40 rect particles moving ≤120 px over 2500 ms), one `sfx_chime` (0.8, one-shot — the sample-end chime at 4000 ms serves both events; no second chime plays), and `vo_complete` (1.0, one-shot, ≤3.5 s); at 6500 ms the completion panel (end panel ≤360×280, fade 250 ms) appears centered over the card with the preview's HOME (≥64×64) and Replay (≥96×96) drawn on it, while back, prev, and next stay in their places (the preview keeps exactly five controls and its tab order). The strip's check becomes a 32×32 star (star pop: scale 0→1.15→1 over 300 ms) the next time `home` renders, and stays a star whenever the save lists all 16 ids; a save that already lists all 16 renders the star statically, with no pop. After the moment, a card or Replay tap hides the panel (fade 200 ms) and restarts the sample from 0 with its audio and check sequence and no second confetti; the panel does not re-show because the moment fires once per run. Nothing unlocks or closes, and every item stays openable. |
| FR-020 | No audio shall play before the first pointer or key input of a run (FR-001); that input unlocks audio. Exactly one voice clip at a time — any new voice (welcome, shelf, item, beat, hint, complete) cancels the previous utterance immediately; sfx may overlap each other and the voice. All sfx are one-shot at the section 9 volumes; every voice is one-shot at 1.0. `music_title` may loop at 0.15 on `title` only and shall stop at Play. |
| FR-021 | Degradation: no speech synthesis → all voices silent, samples and pulses run unchanged, every state stays navigable by pictogram + numeral, and a muted-speaker pictogram (48×48) shows for 5,000 ms after the first Play; no AudioContext → all audio silent, behavior otherwise identical; storage blocked → the run is unsaved (the visited set, the strip, and the completion moment work in memory; the reset ring still shows); a missing visual asset draws a stub shape and play continues; a missing audio clip is skipped. |
| FR-022 | When the tab becomes hidden while a sample is playing, the player shall freeze the sample clock (frame held) and cancel pending audio; on return the sample stays paused and the card holds, and the Replay control plays the replay pulse repeating every 600 ms for 3,000 ms with no voice; a replay input restarts the sample from 0 (FR-008). Hidden time pauses the idle timer; idle time counts visible time only; throttled timers may delay the lead-in or hints but never lose progress (A7). |
| FR-023 | Resize or rotation shall reflow per section 8 and preserve the state, shelf, item, and a running sample's clock (no restart). When the viewport height is below the width band's requirement for that state (≥1024: home 560 / grid 512 / preview 608; 768–1023: 440 / 392 / 472), that band's compact layout shall apply so the page still fits without scrolling: at 1024×480 the ≥1024 compact layout applies and fits (home/grid 424, preview 458); at 768×480 the 768–1023 normal layout applies and fits (440 / 392 / 472 ≤ 480); the 768–1023 compact layout (home/grid 348, preview 412) fits whenever the height is below the band's requirement. 320–767 has no compact layout; below 480 px height the field scales by 0.9 as a best effort, keeping every target's section 8 minimum. From 320×480 to 1366×768 no page shall scroll. |
| FR-024 | No reading shall be required: visible text is limited to content — the title card's name "Summer Camp!", each shelf card's numeral badge "4", the strip's numerals (visited, "/", 16), and the screen-free steps' numerals 1–3 — while every instruction and feedback reaches non-readers by voice + pictogram. Every interactive element carries an invisible accessible name (section 7). The string "Khan" and the catalogued title shall appear nowhere on screen, in audio, or in an accessible name. |
| FR-025 | The player shall run fully offline: no network request, connectivity check, download state, or cloud affordance at any time after load; no camera, microphone, or other permission shall ever be requested. |
| FR-026 | Unknown events, inputs, and unbound keys shall be ignored (no state change, no sound). Shelf order, item order, samples, and layouts are fixed and deterministic; there is no randomization, unlock, adaptive difficulty, or timer that gates progress, and no calendar, availability, lock, or countdown state exists (D8). |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | soft sky backdrop | initial; prepare assets; audio locked; no focusables |
| `title` | backdrop + themed card "Summer Camp!" + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `home(revealing\|idle)` | camp map frame + 4 signpost shelf cards + strip + HOME | `revealing` lasts 1200 ms; the main hub |
| `grid(shelf)` | 4 item tiles in 3×2 + shelf pictogram + back + HOME | one page per shelf; no paging exists |
| `preview(item, sample)` | item card + Replay + prev/next + back + HOME | `sample` ∈ {playing, paused, ended}; one 4000 ms clock; the completion panel (HOME + Replay on it) shows after the camp-complete moment |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `home(revealing)` → `home(idle)` | actions: unlock audio; 1200 ms reveal; `vo_welcome` at 1200 ms on the first Play; saved shelf card soft-pulses (FR-002) |
| `title` | `HOME_PRESSED` / Escape | — | `title` | no-op (the title is home) |
| `title` | `RESET_HOLD` | hold 3,000 ms on the logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `title` | `IDLE_12S` | — | `title` | actions: FR-015 hint on Play |
| `home(revealing)` | `ANY_INPUT` | pointer or key | `home(idle)` | action: finish the reveal instantly (input consumed) |
| `home(revealing)` | `HOME_PRESSED` / Escape | — | `title` | action: cancel the reveal; save |
| `home(idle)` | `SHELF_TAP(s)` | outside the 500 ms shelf throttle | `grid(s)` | actions: FR-004; save `lastShelf` |
| `home(idle)` | `IDLE_12S` | — | `home(idle)` | actions: FR-015 hint |
| `grid(s)` | `ITEM_TAP(i)` | outside the 500 ms item throttle | `preview(i, playing)` | entry: sample from 0; actions: FR-006; save |
| `grid(s)` | `BACK` / Backspace | outside the 300 ms back throttle | `home(idle)` | action: cancel voice; no save |
| `grid(s)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `grid(s)` | `IDLE_12S` | — | `grid(s)` | actions: FR-015 hint |
| `preview(i, playing)` | `SAMPLE_END` | sampleMs = 4000 | `preview(i, ended)` | actions: check pop 3700–4000 + `sfx_chime` at 4000; Replay replay-pulses; camp-complete moment if the 16th distinct item (FR-019), its panel at 6500 ms |
| `preview(i, *)` | `CARD_TAP` / `REPLAY` / R | outside the 500 ms replay throttle | `preview(i, playing)` | actions: cancel voice/audio; hide the panel; sample from 0 |
| `preview(i, *)` | `NEXT` / ArrowRight | outside the 300 ms prev/next throttle, not last in shelf | `preview(i+1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `PREV` / ArrowLeft | outside the 300 ms prev/next throttle, not first in shelf | `preview(i−1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `BACK` / Backspace | outside the 300 ms back throttle | `grid(shelf)` | actions: cancel voice/sample; dismiss the completion panel if shown |
| `preview(i, *)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers/sample; save |
| `preview(i, playing)` | `TAB_HIDDEN` | — | `preview(i, paused)` | actions: freeze sample clock; cancel audio (FR-022) |
| `preview(i, paused)` | `TAB_VISIBLE` | — | `preview(i, paused)` | actions: Replay plays the replay pulse every 600 ms for 3,000 ms with no voice; the sample stays paused (FR-022) |
| `preview(i, *)` | `IDLE_12S` | sample ≠ playing | `preview(i, *)` | actions: FR-015 hint on Replay |

Events not listed for a state are ignored (no state change, no sound); tab visibility outside `preview` only pauses and resumes the idle timer (FR-022).

**Tab order (per state).** `title` — reset logo → Play. `home` — HOME → shelf cards in order (crafts, animals, friendship, water). `grid` — HOME → back → item tiles in index order, row-major. `preview` — HOME → back → prev → next → Replay (the completion panel's HOME and Replay are these same two controls, redrawn on the panel). `loading` — no focusables. Keyboard: Tab/Shift+Tab move focus in that order; Enter/Space activates; Escape = HOME; Backspace = back; ArrowLeft/ArrowRight = prev/next in `preview` (no wrap; unbound elsewhere); R = Replay.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Start camp | tap Play | Tab to Play + Enter/Space |
| Pick a week | tap a signpost card | Tab to it + Enter/Space |
| Open a preview | tap an item tile | Tab to it + Enter/Space |
| Replay the sample | tap the card or Replay | R, or Enter/Space on the focused Replay |
| Step items | tap Next / Previous | ArrowRight / ArrowLeft, or Enter/Space on the focused control |
| Go back one level | tap back | Backspace, or Enter/Space on the focused back |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play ≥96×96 CSS px; reset logo, HOME, back, prev, next, Replay ≥64×64; shelf cards 180/136/88 px and item tiles 160/120/88 px per section 8; the completion panel's Replay ≥96×96. All ≥44 px platform minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Tolerance and mis-taps:** 12 px expansion per FR-012; nearest center wins, then leftmost, then topmost; >12 px from everything is an empty tap (nothing changes; the idle timer resets).
- **Pointer semantics:** first pointer only; activation on release within 24 px of the down point; a >24 px move cancels that gesture; extra simultaneous pointers are ignored until release (FR-013). No drag gestures exist, so no drag alternative is offered.
- **Instructions without reading:** every state is voice + pictogram; the title name and numerals are content; chrome is pictogram + invisible name (FR-024).
- **Accessible names (invisible, examples):** "Play", "Reset saved progress (hold 3 seconds)", "Home", "Arts & crafts week, 4 activities", "Animal week, 4 activities", "Friendship week, 4 activities", "Water and sun week, 4 activities", "Back to the collection", "Back to the week", "Paper crown, camp activity", "Screen-free pinecone hunt", "Previous item", "Next item", "Replay preview", "Play again", "5 of 16 items seen" (strip, non-interactive label; "16 of 16 items seen" when complete).
- **Resize:** viewport resize or rotation reflows per section 8 and preserves shelf, item, and a running sample's clock (FR-023).

## 8. Levels and content data

**Shelves — four weekly themes (ids in shelf order; 4 items each; 16 total).** All titles, copy, and art are original (D2, D3, D7).

| Shelf | id | Items (ids) | Count | Card pictogram | Entry voice (`vo_shelf_*`, 1.0, ≤1.5 s) |
|---|---|---|---|---|---|
| Arts & crafts week | `crafts` | 0–3 | 4 | scissors over a paper sheet | "Arts and crafts week." |
| Animal week | `animals` | 4–7 | 4 | a paw print | "Animal week." |
| Friendship week | `friendship` | 8–11 | 4 | two hands around a heart | "Friendship week." |
| Water & sun week | `water` | 12–15 | 4 | a sun over a wave | "Water and sun week." |

**Items (ids 0–15, shelf order, row-major).** Within each shelf the first three items are `activity` and the fourth is `screenFree` (12 + 4). Each item = one tile + one `vo_item_{id}` name line + one 4000 ms sample (FR-007).

| id | Shelf | Kind | Art | Steps at 400/1400/2400 ms | `vo_item_{id}` (≤1.8 s) | Beat line `vo_item_{id}b` at 2000 ms (≤1.8 s) |
|---|---|---|---|---|---|---|
| 0 | crafts | activity | paper crown | fold a strip; cut the points; add the dots | "Paper crown." | "Fold, cut, and decorate." |
| 1 | crafts | activity | leaf rubbing | place a leaf; rub with a crayon; lift the paper | "Leaf rubbing." | "Place, rub, and lift." |
| 2 | crafts | activity | clothespin butterfly | clip two wings; dot the wings; flutter them | "Clothespin butterfly." | "Clip, dot, and flutter." |
| 3 | crafts | screenFree | pinecone sheet | find one; gather a few; sort by size | "Screen-free pinecone hunt." | "Find, gather, and sort — no screen needed." |
| 4 | animals | activity | bird feeder | fill a pinecone with seeds; hang it; a bird lands | "Bird feeder." | "Fill, hang, and watch." |
| 5 | animals | activity | frog hop game | crouch like a frog; hop to a lily pad; splash | "Frog hop game." | "Crouch, hop, and splash." |
| 6 | animals | activity | animal shadow match | a shadow appears; an animal pops in; they match | "Animal shadow match." | "Look, match, and cheer." |
| 7 | animals | screenFree | animal charade cards | pick a card; act it out; guess together | "Screen-free animal charades." | "Pick, act, and guess — no screen needed." |
| 8 | friendship | activity | friendship bracelet | pick three colors; braid them; tie it on | "Friendship bracelet." | "Pick, braid, and tie." |
| 9 | friendship | activity | kindness cards | fold a card; draw a heart; give it away | "Kindness cards." | "Fold, draw, and give." |
| 10 | friendship | activity | share a snack | count the crackers; split two piles; share them | "Share a snack." | "Count, split, and share." |
| 11 | friendship | screenFree | kindness jar | decorate a jar; note kind acts; pick one | "Screen-free kindness jar." | "Decorate, write, and pick — no screen needed." |
| 12 | water | activity | sprinkler course | run through; jump a puddle; splash | "Sprinkler course." | "Run, jump, and splash." |
| 13 | water | activity | ice cube paint | freeze colored water; paint a picture; watch it melt | "Ice cube paint." | "Freeze, paint, and melt." |
| 14 | water | activity | paper boat race | fold a boat; float it; blow it across | "Paper boat race." | "Fold, float, and blow." |
| 15 | water | screenFree | cloud watch sheet | find a shady spot; look up; name a shape | "Screen-free cloud watch." | "Lie back, look up, and name a shape." |

**Sample timelines (exact; both kinds end with the check pop, the chime, and the Replay pulse).** One 4000 ms clock per preview.

| Kind | 0–400 | 400–3400 (main beat) | 3400–3700 | 3700–4000 | At 4000 |
|---|---|---|---|---|---|
| `activity` | card fades in 200 ms | step k animates at 400 + (k−1)×1000 ms for k = 1–3, each ≤600 ms (pop 300 ms + slide 200 ms) with `sfx_pop` per step; finished item soft-pulses once at 3000 (400 ms) | hold | check pop 300 ms | `sfx_chime`; card holds (`ended`) |
| `screenFree` | card fades in 200 ms | paper sheet slides in at 400 (200 ms); step k pops and gains the 3 px accent ring at 400 + (k−1)×1000 ms; the previous step's ring fades (200 ms) and its check pops (300 ms); `sfx_tick` per step; sheet soft-pulses once at 3000 | hold | check pop 300 ms | `sfx_chime`; card holds (`ended`) |

**Layouts (numbers; single page everywhere, nothing scrolls, from 320×480 up).** Shelf cards 3 columns × up to 2 rows; item tiles 3 columns × up to 2 rows.

| Element / field height | ≥1024 px | 768–1023 px | 320–767 px |
|---|---|---|---|
| Play / reset logo | ≥96×96 / ≥64×64 | same | same |
| HOME, back, prev, next, Replay | ≥64×64 | ≥64×64 | ≥64×64 |
| Shelf cards | 180×180, gap 24 | 136×136, gap 16 | 88×88, gap 12 |
| Item tiles | 160×160, gap 24 | 120×120, gap 16 | 88×88, gap 12 |
| Preview card (art) | 640×480 (art ≥320×320) | 480×360 (art ≥240×240) | 280×200 (art ≥160×160) |
| Normal field heights (home / grid / preview) | 560 / 512 / 608 | 440 / 392 / 472 | 288 / 288 / 300 |

- **Composition:** `home` = 24 px top margin (16 at 768–1023, 8 at 320–767) + 64 px chrome row (HOME left) + 12 px gap (8 at 768–1023, 4 at 320–767) + the shelf grid + 12 px gap (8 / 4) + the strip (48 px row at ≥768; at 320–767 the strip sits right-aligned inside the 64 px chrome row) + bottom margin. `grid` = the same chrome row (HOME left, shelf pictogram centered, back right) + the item grid + bottom margin. `preview` = HOME at the top-left and back at the top-right in the side margins, the card centered, prev/next at the card's side edges vertically centered, and Replay centered under the card at ≥768 (at 320–767 HOME and back sit at the card's top corners, prev/next are 64×64 chips at the card's side edges, and Replay sits centered 8 px above the field's bottom with the card's bottom 32 px above the field's bottom, so the Replay chip overlaps only the card's art-free lower 40 px band: the card's art is 160×160, top-aligned, leaving that band clear, and the chrome overlaps at most the art's outer edge (≤8 px per side at 320 px width)). The strip is a non-interactive label; the frame is decorative.
- **Compact layouts** (when the viewport is shorter than the band's requirement for that state): ≥1024 — shelf 120×120 gap 16, item tiles 120×120 gap 16, preview card 440×330 (art ≥240×240), chrome 64 (fits 1024×480: home/grid 424, preview 458); 768–1023 — shelf 100×100 gap 12, item tiles 100×100 gap 12, preview card 400×300 (art ≥200×200), chrome 64 (fits 768×480: home/grid 348, preview 412). 320–767 has no compact layout. Below 480 px height, scale the field by 0.9 best-effort, keeping every target's minimum.
- **Worked example (water & sun week at 320×480):** the `water` signpost is tapped; "Water and sun week." plays and four 88×88 tiles settle (items 12–15). Tile 15 opens `preview(15, playing)`: "Screen-free cloud watch." plays, the sheet slides in at 400 ms, steps 1/2/3 highlight at 400/1400/2400 ms with `sfx_tick` each, "Lie back, look up, and name a shape." starts at 2000, the check pops at 3700, and `sfx_chime` rings at 4000; the save records `lastShelf:"water"`, `lastItemId:15`, `visitedIds` gaining 15 once. Back returns to the water grid with tile 15 wearing its accent ring; back again returns home, where the strip reads "1 / 16".
- **Randomization:** none. Shelf order, item order, samples, and layouts are fixed and deterministic; no seed or backfill exists.
- **Progression rule:** none. Every item is reachable at every moment; the only accumulations are `visitedIds` (drives the strip, the resume rings, and the one-time camp-complete moment) and the shelf/item position of the current run.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Play / HOME / back | depress 80 ms | `sfx_tap` — 0.5 — one-shot, 0.08 s |
| Lead-in reveal | frame fade 200 ms; shelf cards settle (grid settle) | `vo_welcome` — 1.0 — one-shot (first Play only) |
| Shelf opened | tile depress 300 ms; tiles fade in 200 ms | `sfx_open` — 0.6 — one-shot, 0.12 s; `vo_shelf_*` — 1.0 — one-shot |
| Item opened | tile depress 300 ms; card fade in 200 ms | `vo_item_{id}` — 1.0 — one-shot |
| Activity step | step shapes pop 300 ms + slide 200 ms | `sfx_pop` — 0.6 — one-shot per step |
| Screen-free step | step pops 300 ms, gains the accent ring; previous step's ring fades 200 ms + check pops 300 ms | `sfx_tick` — 0.5 — one-shot per step |
| Beat voice | — | `vo_item_{id}b` — 1.0 — one-shot, starts at 2000 ms |
| Sample end (both kinds) | check pops 3700–4000; Replay replay-pulses | `sfx_chime` — 0.8 — one-shot, 0.8 s at 4000 ms |
| Prev / Next | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Camp complete (FR-019) | confetti ≤40 particles, 2500 ms; panel fades in 250 ms at 6500 ms; strip check → star (pops on the next `home`) | `sfx_chime` (the 4000 ms chime serves both events); `vo_complete` — 1.0 — one-shot |
| Idle hint (FR-015) | deterministic target hint-pulses 3,000 ms | `vo_hint_*` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| Strip count increases | the visited numeral plays the item pop (1→1.15→1 over 200 ms) on the next `home` render | none |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after the first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only; stops at Play |

**Effect definitions (no undefined effects):** *depress* = scale 1→0.95→1 over 80 ms (tile 300 ms). *pop* = scale 0→1 over 300 ms. *item pop* = scale 1→1.15→1 over 200 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 per 500 ms cycle for 3,000 ms. *replay pulse* = 3 × (1→1.15→1) over 200 ms each. *confetti* = ≤40 rect particles moving ≤120 px over 2500 ms. *fade* = opacity 0→1 or 1→0 over 200 ms. *grid settle* = tile fade 300 ms + translate ≤16 px, stagger 30 ms inside the 1,200 ms lead-in. *slide* = translate 40 px→0 over 200 ms. *accent ring* = static 3 px `#F2994A` outline. *check pop* / *star pop* = scale 0→1.15→1 over 300 ms. *ring fill* = 4 px accent stroke fills over exactly the 3,000 ms hold. *ring flash* = opacity 1→0 over 300 ms. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fade 250 ms.

**Copy (fixed, original):** `vo_welcome` = "Welcome to summer camp! Tap a signpost to pick a week." (≤3.0 s). Hint lines — `vo_hint_title` = "Tap the button to start camp."; `vo_hint_home` = "Tap a signpost to pick a week."; `vo_hint_grid` = "Tap a picture to see it move."; `vo_hint_preview` = "Tap the card to play it again." (each ≤2.5 s). `vo_complete` = "You tried every camp activity — all sixteen!" (≤3.5 s). Item and beat lines are in section 8. Voice timbre and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first gesture (FR-020); one voice at a time, each new voice cancels the previous; sfx may overlap; `music_title` optional at 0.15 on `title` only. Degradation per FR-021; background-tab behavior per FR-022 (A7).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.seasonalCollections.camp.v1`.
- **Shape:** `{ "lastShelf": "crafts"|"animals"|"friendship"|"water"|null, "lastItemId": 0-15|null, "visitedIds": [0-15 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`.
- **Save points:** shelf open (writes `lastShelf`, sets `lastItemId: null`, keeps `visitedIds`), preview entry (sets `lastItemId`; the item joins `visitedIds` once), completion, and HOME; every save writes all four keys and `updatedAt` refreshes on every save. Back is not a save point; stepping to another item saves as a preview entry (FR-009, FR-018).
- **Restore:** on `home` the saved shelf card shows a 3 px accent ring and soft-pulses once after the reveal; inside that shelf the saved item tile shows the same ring when `lastItemId` is not null; nothing auto-opens, and Play always starts at `title`.
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; keyboard equivalent: hold Enter/Space 3 s on the focused logo (FR-016).
- **Deliberately not stored:** sample clock or playhead, visit order, page or focus position, completion-panel visible flag, audio settings, language, tap data, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended; handled by FR-022. Storage blocked → run unsaved (FR-021).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy character, art, voice, or audio appears. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_title` | image | soft sky-and-grass backdrop | 1024×768 SVG | static | SVG gradient + circles |
| `card_title` | image | themed title card: tent, sun, trees, the name "Summer Camp!" | 640×400 SVG | static | SVG shapes + text |
| `frame_camp` | image | summer-camp map frame: tent, sun, trees, rolling ground — decorative | 1280×720 SVG | static | SVG shapes |
| `sign_{crafts,animals,friendship,water}` | image | four wooden signpost cards with their section 8 pictograms | 240×240 SVG each | static; settle during the lead-in | SVG shapes |
| `pict_strip_camp` | image | campfire | 32×32 SVG | static | SVG paths |
| `pict_play` / `pict_home` / `pict_back` / `pict_prev` / `pict_next` / `pict_replay` | image | triangle; house; return arrow; chevrons; circular restart arrow | 64×64 SVG each (Play drawn at 96×96) | static | SVG paths |
| `mark_reset` / `ring` | image | inconspicuous logo mark; 4 px accent progress ring | ≥96×96; 96×96 SVG | hold ring | SVG shapes |
| `check_strip` / `star_strip` | image | rounded check; rosette star | 32×32 SVG each | check pop; star replaces the check when all 16 are visited | SVG paths |
| `pict_muted` | image | speaker with a slash | 48×48 SVG | shown 5 s after the first Play when speech is missing | SVG path |
| `item_{0-15}` | rendered | each item's card art and its three step poses per section 8 (crown, leaf, butterfly, pinecone sheet, feeder, frog, shadows, charade cards, bracelet, cards, snack, jar, sprinkler, ice, boat, clouds) | runtime SVG, art ≥320×320 | steps pop/slide; finished item soft-pulses; check at 3700 | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` / `sfx_open` / `sfx_pop` / `sfx_tick` / `sfx_chime` | audio | click 0.08 s; muted tap 0.10 s; latch clack 0.12 s; pop 0.15 s; tick 0.06 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips / arpeggio |
| `vo_welcome` / `vo_shelf_{4}` | audio | copy in section 9 | ≤3.0 s / ≤1.5 s each | one-shot | TTS allowed |
| `vo_item_{0-15}` / `vo_item_{0-15}b` | audio | the 16 name lines and 16 beat lines in section 8 | ≤1.8 s each | one-shot | TTS allowed |
| `vo_hint_{title,home,grid,preview}` / `vo_complete` | audio | copy in section 9 | ≤2.5 s each / ≤3.5 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** sky `#CDEEF6`, ground `#8FCB7A`, tent `#E4572E`, sun `#F2B33D`, water `#6FB7D9`, ink `#3A2E24`, paper `#FFFDF6`, chrome `#FFFDF7`, accent `#F2994A`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); the title name 48 px at ≥768 px wide (32 px at 320–767); badge and strip numerals 40 px at ≥768 (20 px at 320–767); screen-free step numerals 24 px.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → skip that clip, behavior unchanged (FR-021).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Shelf` | `id: enum {crafts, animals, friendship, water}`; `pict: string`; `count: int` (4); `items: int[]` (4 ids in order) |
| `Item` | `id: int 0-15`; `shelf: ShelfId`; `kind: enum {activity, screenFree}`; `artKey: string`; `voiceKey/voiceCopy: string`; `beatKey/beatCopy: string`; `data: Activity \| ScreenFree` |
| `Activity` | `steps: Step[3]` (in-place animations, offsets 400/1400/2400 ms) |
| `ScreenFree` | `steps: Step[3]` (numbered pictograms 1–3; sheet slide at 400 ms) |
| `Step` | `artKey: string`; `pictKey: string` |
| `Save` (persisted) | `lastShelf: ShelfId \| null`; `lastItemId: int 0-15 \| null`; `visitedIds: int[]` (unique, ascending); `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, home, grid, preview}`; `revealing: bool`; `shelf: ShelfId`; `itemId: int`; `sample: enum {playing, paused, ended}`; `sampleMs: int 0-4000`; `celebrated: bool`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Shelf`, `Item`, and the kind data records are static; each sample timeline is computed from `sampleMs` and never from wall-clock time. Judgment, scoring, unlocks, and calendar state do not exist.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, pictograms, per-tile hit rects, and large numerals and short text runs as content.
- **R-002** The player shall animate the section 9 effects: fade, grid settle, depress, pop, item pop, soft pulse, hint pulse, replay pulse, slide, accent ring, check pop, star pop, ring fill, ring flash, confetti, end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input with the FR-012/FR-013 hit rules; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all controls, with the section 6 tab order, Escape = HOME, Backspace = back, ArrowLeft/Right = prev/next in `preview`, and R = Replay.
- **R-005** The player shall play concurrent one-shot audio (sfx + voice; voices at 1.0, optional music loop ≤0.15) and shall cancel the previous utterance whenever a new voice starts.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall voice clips via recorded audio or speech synthesis with the FR-021 no-speech fallback, and shall continue with visual-only feedback when any voice or audio asset fails.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-021), and make no network requests after initial load (FR-025).
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during samples, confetti, and the lead-in reveal.
- **R-010** The player shall scale from 320×480 to 1366×768 without losing state, shelf, item, or a running sample's clock (FR-023).
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-024).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: freeze the sample on hide (FR-022), lose no progress, and allow hints to fire late.
- **R-013** Each preview shall be renderable at runtime from its `Item` record and the section 8 timeline; no per-item code is required.
- **R-014** The player shall request no camera, microphone, or network access at runtime.
- **R-015** The player shall keep every page free of scrolling at 320×480 and above by applying the section 8 compact-fit rule whenever the viewport is shorter than the width band's requirement, with the section 8 target minimums.

## 14. Acceptance criteria

| AC | Covers | Given | When | Then |
|---|---|---|---|---|
| AC-01 | FR-001 | a first load | assets finish | `title` shows Play (≥96 px), the reset logo (≥64 px) at a 24 px margin, and the "Summer Camp!" card; no audio has played; no screen text contains "Khan" |
| AC-02 | FR-002 | `title`, no save | Play is pressed | the 1200 ms reveal runs (frame fade 200 ms; shelf cards fade 300 ms, translate ≤16 px, stagger 30 ms), `home` is idle, and `vo_welcome` plays at 1200 ms only after the gesture |
| AC-03 | FR-002, FR-018 | `title` with a save whose `lastShelf` is `friendship` | Play is pressed | `home` shows the friendship card with its accent ring, which soft-pulses once (400 ms) at 1200 ms |
| AC-04 | FR-002 | the reveal running | a shelf is tapped at 600 ms | the reveal finishes instantly, the tap opens nothing, and `home` is idle |
| AC-05 | FR-003, FR-026 | `home` | it is inspected | the four signposts show in order (crafts, animals, friendship, water), each with its pictogram and a "4" badge; the strip shows the campfire, "0", "/", "16", and a 40 % check; no lock, calendar, or countdown appears |
| AC-06 | FR-004, FR-014 | `home` | the crafts card is tapped twice within 500 ms | exactly one open, one `sfx_open`, one "Arts and crafts week.", and the save records `lastShelf:"crafts"` with `lastItemId: null` and `visitedIds` unchanged |
| AC-07 | FR-005, FR-023 | a 320×480 viewport | the crafts grid opens | four 88×88 tiles sit in 3 columns × 2 rows with 12 px gaps, the shelf pictogram, back (≥64), and HOME show, no dots or chevrons exist, and nothing scrolls; at 1024×768 the tiles are 160×160 |
| AC-08 | FR-006, FR-018 | the crafts grid | tile 0 is tapped | `preview` opens, "Paper crown." plays, the sample starts at 0, and the save sets `lastItemId: 0` with `visitedIds:[0]` |
| AC-09 | FR-007 | preview item 0 (`activity`) | the sample runs | step 1 animates at 400 ms, step 2 at 1400, step 3 at 2400 with `sfx_pop` each; the beat line starts at 2000; the check pops 3700–4000; `sfx_chime` plays at 4000; Replay pulses 3 × 200 ms |
| AC-10 | FR-007 | preview item 3 (`screenFree`) | the sample runs | the paper sheet slides in at 400 ms and steps 1/2/3 highlight at 400/1400/2400 ms with `sfx_tick` each and the 3 px accent ring moving on |
| AC-11 | FR-008, FR-014 | a sample that has ended | the card is tapped twice within 500 ms | exactly one restart from 0 with its voice plays, and the check/chime sequence runs again |
| AC-12 | FR-009 | preview item 0 | Next is tapped twice within 300 ms, then Prev is tapped at item 0 | exactly one step to item 1 with its line and sample; Next at item 3 and Prev at item 0 are no-ops with no sound |
| AC-13 | FR-010 | preview item 6 opened from the animals grid | back is tapped | the animals grid returns with item 6's accent ring; back again returns to `home`; Backspace does the same |
| AC-14 | FR-011 | `home`, `grid`, or `preview` | HOME is pressed | `title` appears and the save was written; on `title`, Escape changes nothing |
| AC-15 | FR-012 | any state | a tap >12 px from every target is made | nothing changes on screen or in audio and the idle timer resets |
| AC-16 | FR-013 | `home` | two fingers land on two cards, and separately one pointer drags >24 px before release | only the first pointer's card reacts; the second shows nothing; the drag opens nothing |
| AC-17 | FR-015 | `home`, `grid`, and `preview` after a first gesture | 12 s pass with no input in each | the deterministic target hint-pulses 3,000 ms and the matching hint line plays; on `title` before any gesture it is visual-only; no hint fires while a sample plays; any tap resets |
| AC-18 | FR-016 | `title` | the logo is held 3,000 ms | the 4 px ring fills visibly, the save and memory clear, the ring flashes 300 ms with `sfx_soft_tap`; after reload `home` shows no rings; the focused-logo keyboard hold behaves the same |
| AC-19 | FR-017 | any state | random taps, empty taps, idle time, and back-and-forth navigation occur | nothing is lost or locked, no score appears, and all 16 items stay openable |
| AC-20 | FR-018 | item 5 previewed, then HOME, reload, Play | `home` appears | Play started at `title`; the animals card wears its accent ring and soft-pulses; inside, tile 5 wears the ring; the save holds `lastShelf`, `lastItemId`, `visitedIds`, and a refreshed `updatedAt` |
| AC-21 | FR-019 | 15 items visited | the 16th item's sample ends | confetti (≤40, 2500 ms), `sfx_chime`, and `vo_complete` play at 4000 ms; at 6500 ms the end panel (≤360×280, fade 250 ms) shows Replay ≥96 and HOME ≥64; on the next `home` the strip's check is a 32×32 star (pop 300 ms); replaying plays no second confetti |
| AC-22 | FR-019, FR-018 | a save listing all 16 ids | the page reloads | `home` renders the star statically (no pop), no completion moment fires, and every item still opens |
| AC-23 | FR-020 | a fresh load | Play, then a shelf card, are pressed while `vo_welcome` still speaks | no audio played before the first gesture, and the welcome line stops when the shelf line begins |
| AC-24 | FR-021 | speech synthesis unavailable / no AudioContext / storage blocked | the collection is browsed in each case | visual-only with the muted pictogram for 5 s / fully silent but otherwise identical / fully usable unsaved with the reset ring still showing |
| AC-25 | FR-022 | a sample playing | the tab is hidden, then shown | the clock froze mid-sample and pending audio was cancelled; on return the card holds, Replay pulses every 600 ms for 3,000 ms with no voice, and a replay restarts from 0 with no progress lost |
| AC-26 | FR-023 | `grid` at 1024×768 | the viewport is resized to 320×480 | the shelf and item are preserved, tiles reflow to 88×88 in 3×2 (288 ≤ 480, so no compact layout), targets stay ≥64 px, and nothing scrolls |
| AC-27 | FR-023 | `preview` item 0 at 1024×768 with its sample at 2000 ms | the viewport is resized to 1024×480 | the sample's clock is preserved (no restart), the ≥1024 compact layout applies (card 440×330 with art ≥240×240, chrome 64, Replay ≥64), and nothing scrolls |
| AC-28 | FR-024, FR-025 | any state | the screen is reviewed with assistive technology and the network panel is watched | every interactive element announces an invisible name; visible text is only "Summer Camp!", numerals, and pictograms; the catalogued title and "Khan" appear nowhere; no network request, permission prompt, or cloud state occurs |
| AC-29 | R-004; section 6 tab order | any state | Tab, Enter/Space, R, ArrowLeft/Right, Backspace, and Escape are used | focus follows the section 6 order, each control activates, items step without wrapping, back goes up one level, and Escape returns HOME |
| AC-30 | FR-026 | any state | an unbound key (e.g. `A`) is pressed or an unknown event fires | nothing changes on screen or in audio and play continues; no calendar, availability, or countdown state exists anywhere |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The map opens, four signposts and all 16 item tiles exist with the section 8 samples, and every layout fits without scrolling at 320×480, 1024×480 (compact), and 1024×768.
3. Browsing, replay, stepping, back, HOME, the resume rings, and the reset hold behave as specified.
4. The save survives a reload; the camp-complete moment fires once when the 16th distinct item is seen; the strip's star persists.
5. No-speech, no-AudioContext, and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 16 items across 4 shelves (3 `activity` + 1 `screenFree` each) is a designed instantiation of the unpublished item set; per-item titles and counts are invented (O4) | designed (D2) |
| A2 | The fourth weekly theme `water` (water & sun) is designed because the official themes are examples ("such as"); the three named themes are used as shelves | designed (D3) |
| A3 | The on-screen name "Summer Camp!" and every item title, art, voice line, layout, and timing are original; the catalogued title is traceability only | designed (D1, D7) |
| A4 | Previews are 4000 ms original demo moments with no game logic, right/wrong, or scoring; they are not the camp's real activities and never another spec's game | designed (D5) |
| A5 | No calendar, availability, lock, or countdown state exists; every item is always openable, and the time-limited fact lives only in section 3 | designed (D8, FR-026) |
| A6 | Browsers block autoplay until the first gesture; background-tab timers may be throttled and speech suspended | platform facts; handled by FR-020/FR-022 |
| A7 | Pause-on-hide for samples, with no auto-restart on return, is a designed choice | designed (FR-022) |
| A8 | 320×480 is supported; the section 8 layout and compact numbers were chosen to fit 320×480, 1024×480, and 768×480 without scrolling | designed (FR-023) |
| A9 | No drag gestures exist in this player; taps and keyboard only | designed (FR-013) |
| A10 | Age band 2–8 with a 2–5 pre-reader focus is a designed targeting choice; 6–8 early readers follow the spoken names | designed |
| A11 | Recorded or TTS-synthesized voices are both acceptable; copy is fixed in sections 8–9 | designed |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the four shelves and their order; the 16 items, ids, kinds, titles, and sample timelines; the 3-activity + 1-screen-free split per shelf; grid, layout, and compact numbers; hit tolerance, pointer, throttle, and idle rules; the chrome set and keyboard map; the save key and shape; no network, no fail state, no scoring, no calendar state; asset provenance; acceptance criteria.
- **Free:** exact composition within the section 8 guidance, easing curves, particle look, voice timbre/TTS engine, optional title music, tile corner radius, decorative frame details beyond tent/sun/trees.
- **Not in this spec:** the app shell or Library navigation, profiles, parental controls, the camp's real in-app activities or screen-free printables (no re-implementation), the annual schedule or availability of Camp, localization, analytics, teacher tooling, or any Khan Academy character, art, voice, or audio.
