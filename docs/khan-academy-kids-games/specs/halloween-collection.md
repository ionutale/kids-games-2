# Halloween collection

## 1. Front matter

- **Title:** Halloween collection (catalogued title; traceability only — it appears in this heading and front matter and nowhere on screen or in audio; the collection's on-screen name is the original phrase **"Moonlight Street!"**, carried by the welcome line and accessible names)
- **Entry type:** Interactive player — seasonal collection browser (themed home frame → shelves → per-item preview cards). No levels, no score, no fail state.
- **Catalogued entry:** [`halloween-collection.md`](../halloween-collection.md)
- **Official source:** [App Store listing — version history (v8.1)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); catalog lines 257–259
- **Spec status:** v1 — follows template v1 and the seasonal-collections shared brief; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-021); no network after load
- **Provenance constraint:** original content only — no Khan Academy character, name, art, voice, audio, or footage, and no reproduction or imitation of any catalogued item. "Halloween" is a generic public theme; no app branding appears anywhere, and the string "Khan" appears in no visible text or spoken line (FR-023).
- **Interactive-player substitutions (declared):** five shelves replace levels; 20 item previews (one 4000 ms original sample each) replace rounds; the completion moment replaces a win condition; there is no terminal state — HOME always returns to `title`.
- **Time-limited (official) not modelled (designed):** official sources call seasonal collections time-limited; this player has no calendar, availability, lock, or countdown state, and every item is always openable (D5, A2).

## 2. Overview and learning objective

A child presses Play, the title card dissolves into a friendly night street — a moon, a porch with a warm
light, and a grinning jack-o'-lantern — and a voice says "Welcome to Moonlight Street! Pick a shelf."
Five shelf cards settle in (Books; Videos & songs; Letters & reading; Math & logic; Create), each with a
pictogram and its item count. Tapping a shelf lays out its four item tiles in a single 3×2 grid that
always fits without scrolling; tapping a tile opens a 4000 ms original sample — a book cover flip with
one spoken page line, a three-beat animated moment, a four-note song, a three-beat teaching demo
(letters, sounds, counting, patterns, shapes, positions), an outline that draws and fills itself, one
automatic matching demo, or three shapes that pop into a scene — while a warm voice names the item. The
child can replay, step through items, go back, or go home at any time, and the strip counts what they
have already seen. The skills are **independent choice-making and one-hop exposure to each documented
collection type** — "I can pick what I want, and watch it my way." Age band: **2–8 across the library**;
this entry targets the **2–5 pre-reader** first, with 6–8 early readers reading book titles and lesson
words as content. Expected session: **2–4 minutes** (three to six previews); a full browse of all 20
items spans several sessions.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | A Halloween-themed update added a **themed home screen, themed books, videos, and songs** | official | Catalogued entry Description; catalog lines 257–259 |
| O2 | The update added **Halloween-inspired lessons across Letters, Reading, Math, Logic+, and Create, including coloring pages, matching games, and scene creation** | official | Catalogued entry Description; catalog lines 257–259 |
| O3 | Seasonal collections are **time-limited** and may not be available outside their season | official | Catalogued entry Notes; catalog line 249 ("Seasonal / limited-time collections") |
| O4 | Official sources publish **no individual item titles, counts, art, audio, mechanics, sample durations, or dates** for this collection | official (about the source's limits) | Entry file and catalog carry only the type-level description |
| O5 | The app is officially for children ages 2–8 | official | `khan-academy-kids-games.md` §5 |
| D1 | The themed home screen is realized as the original night-street frame "Moonlight Street!" (moon, porch, jack-o'-lantern, paper lights); the collection's spoken name is an original phrase; the catalogued title is traceability only and appears in no visible text, spoken line, accessible name, shelf name, item title, or asset key | designed | IP rule; "Halloween" is a generic public theme, but no Khan Academy media or marking is used |
| D2 | Five shelves — Books; Videos & songs; Letters & reading; Math & logic; Create — group the official type list, 4 items each; 20 items total: 4 `book`; 2 `video` + 2 `song`; 4 `lesson`; 4 `lesson`; 2 `coloring` + 1 `matching` + 1 `create` | designed | Makes the official type list concrete and buildable; counts are unpublished (O4) |
| D3 | Per-item **preview cards**: one automatic 4000 ms original sample per item, never a re-implementation of another spec's game or activity, with no right/wrong, scoring, or round logic | designed | Shared preview rule; O4 (no mechanics published) |
| D4 | The **collection strip** (theme pictogram, visited/total numerals, check → star) and its one-time completion moment | designed | A small, honest progress cue; no unlock, score, or comparison |
| D5 | **No calendar, availability, lock, or countdown state**: the official time-limited fact lives only here and in A2; every item is always openable | designed | Keeps the player verifiable and never punishing |
| D6 | Player chrome (Play, HOME, back, prev/next, Replay, reset logo), 1200 ms lead-in, 12 s idle hints, 3 s reset hold, save/resume rings, audio rules, degradation, background-tab behavior | designed | Template v1, the shared brief, and the offline-library player model |
| D7 | All art, voice, copy, layout, animation timing, and the completion moment | designed | IP rule: all assets original (section 11) |

## 4. Player experience / core loop

A child presses Play. The night street fades in over 200 ms and five shelf cards settle with a 30 ms
stagger; "Welcome to Moonlight Street! Pick a shelf." plays at 1200 ms. The strip reads 0 / 20. The child
taps Books; four tiles appear and a voice says "Books." They tap the first tile: "A book: The Moon Hat."
The cover fades in; at 2000 ms it flips over 500 ms with a paper sound; at 2500 ms a voice reads the
page — "A moon hat for the cat." A sparkle pops, then the check pops at 3700 ms and a chime rings at
4000 ms; Replay pulses three times. The child taps Replay — the same little story again. They step Next,
then Back, then HOME; the street returns to the title. On the next visit the Books card wears a small
accent ring and pulses once, so they can pick up where they left off. When the last of the 20 items has
been seen, confetti falls, the voice says "You saw everything on Moonlight Street — what a night!", and
the strip's check becomes a star.

**Core loop:** press Play → pick a shelf → pick an item → watch or replay its 4 s sample → step to the
next item or go back → keep browsing until the strip's check becomes a star (20 of 20).

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading` (prepare assets per section 11; audio locked), then `title`: a soft night backdrop, a themed card (moon + jack-o'-lantern pictogram), one Play target ≥96×96 CSS px, and a reset logo ≥64×64 CSS px with a 24 px margin (FR-016). No audio shall play before the first pointer or key input (FR-020). The catalogued title, the string "Khan", and every Khan Academy character, name, art, voice, and sound shall appear nowhere on screen or in audio (FR-023). |
| FR-002 | When Play is pressed, the player shall unlock audio and run the 1200 ms themed reveal: the frame fades in over 200 ms and the five shelf cards settle (fade 300 ms, translate ≤16 px, stagger 30 ms — card *i* starting at 30×*i* ms, all inside 1200 ms), then `home`. On the first Play after load, `vo_welcome` (1.0, one-shot, ≤3.0 s) shall play at 1200 ms; when a save exists, the saved shelf card shall soft-pulse once (1→1.04→1 over 400 ms) at 1200 ms. Any pointer or key input during the 1200 ms shall finish it instantly (that input is consumed and opens nothing); HOME during it shall cancel to `title`. |
| FR-003 | `home` shall show the themed night-street frame, exactly five shelf cards in a 3-column × up-to-2-row grid (row 1: books, songs, letters; row 2: math, create, centered), each with its category pictogram and a numeral badge of its item count (4 each), plus the collection strip (48×48 theme pictogram, visited numeral, total numeral "20", 32×32 check) and HOME (≥64×64). Shelf-card sizes per section 8. Every item shall always be openable: no lock, calendar, countdown, availability, or download state exists, and no card or tile is ever disabled. The player shall make no network request at any time after load (FR-024). |
| FR-004 | When a shelf card is tapped, the player shall open `grid(shelf)`, play a 300 ms tile depress, play `sfx_open` (0.6, one-shot, 0.12 s), speak `vo_shelf_{shelfId}` (1.0, one-shot, ≤1.5 s), and save (FR-018: writes `lastShelf`, sets `lastItemId: null`, keeps `visitedIds`). Shelf taps share one 500 ms throttle: a second shelf tap inside 500 ms shall not open a second shelf. |
| FR-005 | `grid(shelf)` shall show that shelf's four item tiles in a single 3×2 grid — never more than one page; no paging, dots, or chevrons exist in this family — with the shelf pictogram (64×64 at ≥768 px, 48×48 at 320–767) beside HOME and a back control (≥64×64) 24 px from the top-right corner. Tile sizes and gaps per section 8. Every grid shall fit the viewport with no scrolling from 320×480 up; when the viewport is shorter than the band's requirement, the band's compact layout applies (section 8). |
| FR-006 | When an item tile is tapped, the player shall open `preview(item)`, play a 300 ms tile depress, speak `vo_item_{id}` (1.0, one-shot, ≤1.8 s), start the item's 4000 ms sample from 0 (FR-007), and save (`lastItemId` set; the item joins `visitedIds` once). Item taps share one 500 ms throttle. |
| FR-007 | Each preview sample shall run one accumulated 4000 ms clock (advanced only while `sample` is `playing` and the tab is visible; never wall-clock) on the shared skeleton: 0–400 in (card fades 200 ms; art slides 40 px→0 over 200 ms); 400–3400 the type's main beat per the section 8 timeline; 3400–3700 hold; 3700–4000 check pop (0→1.15→1 over 300 ms); `sfx_chime` (0.8, one-shot, 0.8 s) at 4000. At 4000 the player shall enter `preview(item, ended)`: the card holds its last frame and the Replay control pulses 3×(1→1.15→1) over 200 ms each. Samples are automatic and non-interactive: no right/wrong answer, no scoring, no round logic, and never another spec's game or activity — one demo beat of this item only. `vo_item_{id}` names the item at entry; a beat voice (`vo_beat_{id}`, 1.0, one-shot, ≤1.8 s) exists only for the types listed in section 8 and starts at ≥2000 ms. |
| FR-008 | When the card or the Replay control (≥64×64) is tapped in `preview(item, ended)` or during a sample, the player shall cancel the current voice and sample audio and restart the sample (and its `vo_item` line) from 0. Replay is throttled to one restart per 500 ms; a double-tap inside 500 ms restarts once. |
| FR-009 | When Next or Previous (each ≥64×64) is tapped, the player shall open the next/previous item of the same shelf (`preview(item±1)`, never wrapping), cancel audio, speak that item's line, play its sample from 0, and save. At the first or last item of the shelf the control is a no-op (no visual or audio change). Prev and Next are throttled to one step per 300 ms, sharing the throttle. |
| FR-010 | When the back control (≥64×64) is tapped, the player shall cancel voice and sample audio and go up one level — `preview` → `grid(shelf)`, `grid` → `home` — saving nothing new (the entry-point saves already hold the state). Back is throttled to one return per 300 ms. |
| FR-011 | HOME (≥64×64; 24 px top-left margin at ≥768 px, 12 px at 320–767) shall be rendered in `home`, `grid`, and `preview`; pressing it shall cancel any voice, sample clock, and idle timer, save, and return to `title`. On `title` (the player's home) no HOME control is rendered and a HOME input (Escape) is a no-op; on `loading` no control is rendered and any input is a no-op. HOME is throttled to one press per 300 ms. |
| FR-012 | Hit-testing shall expand every control's rectangle by 12 px on all sides. A tap inside more than one expanded rectangle shall resolve to the control with the nearest center, then the leftmost, then the topmost. A tap more than 12 px from every control is an empty tap — no state change, no sound — and resets the idle timer (FR-015). A tap that starts inside a control never falls through to the art beneath it. |
| FR-013 | The player shall track only the first pointer: a pointer-down inside a control (12 px-expanded) acquires it; pointer-up within 24 px of the down point activates it; a pointer that moves more than 24 px before release cancels that gesture with no state change (no drag gestures exist); additional simultaneous pointers are ignored until all pointers are released. On a same-millisecond tie between two pointers, the leftmost wins. |
| FR-014 | Rapid or repeated taps shall never double-apply: taps inside a shared throttle (FR-004 500 ms; FR-006 500 ms; FR-008 500 ms; FR-009 300 ms; FR-010 300 ms; FR-011 300 ms) produce exactly one judged event; taps inside a throttle keep their visual depress but play no second voice; a double-tap yields one shelf open, one preview, one replay, one step, one back, or one HOME. |
| FR-015 | When no pointer or key input has occurred for 12,000 ms, the player shall hint-pulse the deterministic target for 3,000 ms (1→1.12→1 per 500 ms cycle) and, after the first gesture of the run, speak the state's hint line (1.0, one-shot, ≤2.5 s); before the first gesture the hint is visual-only. Targets: `title` → Play; `home` → the leftmost shelf with an unvisited item, else the leftmost shelf; `grid` → the first unvisited tile in index order, else the leftmost tile; `preview` → Replay. The hint repeats every 12,000 ms of continued idleness; any input, including an empty tap, resets the timer. No hint fires while a sample is playing. |
| FR-016 | When the title logo is held for 3,000 ms, the player shall fill a visible 4 px accent ring for the hold duration; releasing early resets the ring to 0 with no action; on completion it shall clear the storage key and in-memory progress (`lastShelf`, `lastItemId`, `visitedIds`) and play a ring flash (opacity 1→0 over 300 ms) plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3,000 ms on the keyboard-focused logo is the equivalent; a hidden tab cancels the hold. |
| FR-017 | The player shall have no fail state: no wrong answer, score, streak, timer, lock, deduction, or comparison exists; empty taps, rapid taps, multi-touch, going back, and idle time never remove progress, never close the collection, and never lose the visited set. |
| FR-018 | The player shall persist one small JSON object in browser local storage under `spec.seasonalCollections.halloween.v1`: `{ "lastShelf": "books"\|"songs"\|"letters"\|"math"\|"create"\|null, "lastItemId": 0-19\|null, "visitedIds": [0-19 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`. Save points: shelf open (writes `lastShelf`, sets `lastItemId: null`, keeps `visitedIds`), preview entry (sets `lastItemId`, adds the item once), completion (FR-019), and HOME; every save writes all four keys, refreshes `updatedAt`, and never removes a visited id. Restore: the saved shelf card wears a static 3 px `#F2994A` accent ring and soft-pulses once after the lead-in (FR-002); inside that shelf, the saved item tile wears the same ring when `lastItemId` is not null; nothing auto-opens; Play always starts at `title`. A run with no save shows no rings. Storage blocked → the run is unsaved per FR-021. |
| FR-019 | When the last unvisited item's sample ends while `visitedIds.length` reaches 20 and the moment has not yet fired in this run, the player shall play the completion moment at 4000 ms: confetti (≤40 rect particles moving ≤120 px over 2500 ms), `sfx_chime` (0.8, one-shot), `vo_complete` (1.0, one-shot, ≤3.5 s), and the strip's check shall become a 32×32 star (star pop 0→1.15→1 over 300 ms). At 6500 ms a completion panel (end panel: ≤360×280, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fade 250 ms) shall appear over the held card with Replay ≥96×96 and HOME ≥64×64 (the panel carries the preview's HOME and Replay; back, prev, and next stay in place and the preview keeps its five controls and tab order); the panel's Replay pulses 3×200 ms on entry. The moment fires at most once per run — at the end of the first sample that ends while `visitedIds.length` is 20; a cancelled sample never fires it. Nothing unlocks or closes. A card or panel Replay restarts the sample from 0 (FR-008) and fades the panel out over 200 ms; the moment does not re-fire. With 20 ids in the save, the star (not the check) shows on `home` after reload, statically. |
| FR-020 | Audio: no audio shall play before the first pointer or key input of a run (FR-001); that input unlocks audio. One voice clip at a time — any new voice (welcome, shelf, item, beat, hint, completion) cancels the previous utterance immediately; sfx may overlap each other and the voice. `music_title` may loop at 0.15 on `title` only and shall stop at Play. Every cue's volume and behavior is stated in section 9. |
| FR-021 | Degradation: no speech synthesis → all voices silent, visuals and pictograms carry every step, samples and pulses run unchanged, and a muted-speaker pictogram (48×48) shows for 5,000 ms after the first Play; no AudioContext → all audio silent, behavior otherwise identical; storage blocked → the run is unsaved (everything, including the visited set, works in memory; the reset ring still shows). A missing visual asset draws a stub shape and play continues; a missing audio clip is skipped. |
| FR-022 | Resize or rotation shall reflow per section 8 and preserve the state, shelf, item, and a running sample's clock (no restart), with targets at the section 8 minimums and no scrolling. When the tab becomes hidden while a sample is playing, the player shall freeze the sample clock (frame held) and cancel pending audio; on return the sample stays paused, the card holds, and the Replay control plays the replay pulse repeating every 600 ms for 3,000 ms with no voice until a replay input restarts the sample from 0. Hidden time pauses the idle timer; idle time counts visible time only; throttled timers may delay the lead-in or hints but never lose progress. |
| FR-023 | No reading shall be required: visible text is limited to content — numerals (item-count badges, strip counts), book titles, and letters or words inside lesson moments; every instruction and feedback reaches non-readers by voice + pictogram. Every interactive element carries an invisible accessible name (section 7). Accessible names, shelf names, item titles, and asset keys contain neither the catalogued title nor any Khan Academy name; the collection's spoken name is the original phrase "Moonlight Street!". |
| FR-024 | The player shall run fully offline: no network request, connectivity check, download state, or cloud affordance at any time after load; camera, microphone, and network permissions shall never be requested. Every item is always openable (FR-003) — the official time-limited fact creates no availability state. |
| FR-025 | Unknown events, inputs, and unbound keys shall be ignored (no state change, no sound). Shelf order, item order, samples, and layouts are fixed and deterministic; there is no randomization, unlock, adaptive difficulty, or timer that gates progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | soft night backdrop | initial; prepare assets; audio locked; no focusables |
| `title` | night backdrop + themed card + Play + reset logo | the player's home; no HOME control; Escape is a no-op; audio unlocks on the first gesture |
| `home` | themed frame + 5 shelf cards + collection strip + HOME | the collection home; the 1200 ms lead-in runs here after Play |
| `grid(shelf)` | one shelf's 4 item tiles in one 3×2 grid + shelf pictogram + back + HOME | shelves hold 3–6 items, so no paging, dots, or chevrons exist |
| `preview(item, sample)` | preview card + Replay + prev/next + back + HOME | `sample` ∈ {playing, paused, ended}; one accumulated 4000 ms clock |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before the first gesture |
| `title` | `PLAY_PRESSED` | — | `home` | entry: unlock audio; 1200 ms lead-in (FR-002); `vo_welcome` at 1200 ms on the first Play; saved shelf card soft-pulses once at 1200 ms |
| `title` | `HOME_PRESSED` / Escape | — | `title` | no-op (the title is home) |
| `title` | `RESET_HOLD` | hold 3,000 ms on the logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `title` | `IDLE_12S` | — | `title` | actions: FR-015 hint on Play |
| `home` | `LEAD_IN_INPUT` | during the 1200 ms | `home` | action: finish the lead-in instantly (input consumed) |
| `home` | `HOME_PRESSED` / Escape | during the lead-in | `title` | action: cancel the lead-in; save |
| `home` | `SHELF_TAP(s)` | outside the 500 ms shelf throttle | `grid(s)` | actions: FR-004; `sfx_open`; `vo_shelf_{s}`; save `lastShelf` |
| `home` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `home` | `IDLE_12S` | — | `home` | actions: FR-015 hint |
| `grid(s)` | `ITEM_TAP(i)` | outside the 500 ms item throttle | `preview(i, playing)` | entry: sample from 0; actions: FR-006; save |
| `grid(s)` | `BACK` / Backspace | throttle clear | `home` | action: cancel voice; no save |
| `grid(s)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `grid(s)` | `IDLE_12S` | — | `grid(s)` | actions: FR-015 hint |
| `preview(i, playing)` | `SAMPLE_END` | sampleMs = 4000 | `preview(i, ended)` | actions: check pop 3700–4000 + `sfx_chime` at 4000; Replay pulses 3×; completion if 20th distinct visit (FR-019) |
| `preview(i, *)` | `CARD_TAP` / `REPLAY` / R | throttle clear | `preview(i, playing)` | actions: cancel voice/audio; sample and `vo_item` from 0 |
| `preview(i, *)` | `NEXT` / ArrowRight | throttle clear; not last in shelf | `preview(i+1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `PREV` / ArrowLeft | throttle clear; not first in shelf | `preview(i−1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `BACK` / Backspace | throttle clear | `grid(shelf)` | actions: cancel voice/sample; no save |
| `preview(i, *)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers/sample; save |
| `preview(i, playing)` | `TAB_HIDDEN` | — | `preview(i, paused)` | actions: freeze the sample clock; cancel audio (FR-022) |
| `preview(i, paused)` | `TAB_VISIBLE` | — | `preview(i, paused)` | actions: Replay plays the replay pulse repeating every 600 ms for 3,000 ms with no voice; the sample stays paused (FR-022) |
| `preview(i, *)` | `IDLE_12S` | sample ≠ playing | `preview(i, *)` | actions: FR-015 hint on Replay |

Events not listed for a state are ignored (no state change, no sound); tab visibility outside `preview` only
pauses and resumes the idle timer (FR-022).

**Tab order (per state).** `title` — reset logo → Play. `home` — HOME → shelf cards in shelf order
(books, songs, letters, math, create). `grid` — HOME → back → item tiles in index order, row-major.
`preview` — HOME → back → prev → next → Replay. `loading` — no focusables. Keyboard: Tab/Shift+Tab move
focus in that order; Enter/Space activates; Escape = HOME (a no-op on `title`); Backspace = back;
ArrowLeft/ArrowRight = prev/next in `preview` (no wrap; unbound elsewhere); R = Replay.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play | tap the Play target | Tab to Play + Enter/Space |
| Pick a shelf | tap a shelf card | Tab to it + Enter/Space |
| Open a preview | tap an item tile | Tab to it + Enter/Space |
| Replay the sample | tap the card or Replay | R, or Enter/Space on the focused Replay |
| Step items | tap prev / next | ArrowLeft / ArrowRight, or Enter/Space on the focused control |
| Go back one level | tap back | Backspace, or Enter/Space on the focused back |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play ≥96×96 CSS px; reset logo and every control (HOME, back, prev, next, Replay) ≥64×64; shelf cards 180×180 / 136×136 / 88×88 and item tiles 160×160 / 120×120 / 88×88 per the section 8 bands. All ≥44 px platform minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Tolerance and mis-taps:** 12 px expansion per FR-012; nearest center wins, then leftmost, then topmost; >12 px from everything is an empty tap (nothing changes; the idle timer resets).
- **Pointer semantics:** first pointer only; activation on release within 24 px of the down point; a >24 px move cancels that gesture; extra simultaneous pointers are ignored until release (FR-013). No drag gestures exist, so no drag alternative is offered.
- **Instructions without reading:** every state is voice + pictogram; numerals, book titles, and the letters/words inside lesson moments are content; chrome is pictogram + invisible name (FR-023).
- **Accessible names (invisible, examples):** "Play", "Reset saved progress (hold 3 seconds)", "Home", "Moonlight Street", "Books shelf, 4 items", "Videos and songs shelf, 4 items", "Letters and reading shelf, 4 items", "Math and logic shelf, 4 items", "Create shelf, 4 items", "Back to the shelves", "Back to the collection", "Book: The Moon Hat", "Video: Moonrise Street", "Song: Bats on the Roof", "Lesson: the letter B", "Coloring: the jack-o'-lantern", "Matching: two little ghosts", "Create: pumpkin house", "Previous item", "Next item", "Replay preview", "12 of 20 items seen" (strip label).
- **Resize:** viewport resize or rotation reflows per section 8 and preserves shelf, item, and a running sample's clock (FR-022).

## 8. Levels and content data

**The item set — 20 items (ids 0–19), five shelves, four items each.** All titles, copy, art, and voice
lines below are original (D2, D7). Ids run in shelf order, then row-major.

| Id | Shelf | Type | Item title (content) | Sample beat (within 400–3400 ms) | Voice: `vo_item_{id}` / `vo_beat_{id}` (1.0, ≤1.8 s) |
|---|---|---|---|---|---|
| 0 | books | `book` | The Moon Hat | cover: cat in a crescent-moon hat; flip at 2000; page: cat on a fence under the moon | "A book: The Moon Hat." / "A moon hat for the cat." (2500) |
| 1 | books | `book` | Ten Little Leaves | cover: ten leaves; page: leaves tumbling down the street | "A book: Ten Leaves." / "Ten leaves dance down." (2500) |
| 2 | books | `book` | The Brave Bat | cover: a bat over the porch; page: the bat beside the porch light | "A book: The Brave Bat." / "The bat is not scared." (2500) |
| 3 | books | `book` | Pumpkin's Light | cover: a jack-o'-lantern; page: a candle glowing inside | "A book: Pumpkin's Light." / "A warm light for Pumpkin." (2500) |
| 4 | songs | `video` | Moonrise Street | three beats: moon rises over rooftops (400); porch light turns on (1400); jack-o'-lantern grins (2400) | "A video: Moonrise Street." / "The moon is up!" (2400) |
| 5 | songs | `video` | Owl's Flight | three beats: owl leaves the oak (400); glides over the fence (1400); lands on the porch rail (2400) | "A video: Owl's Flight." / "The owl flies home." (2400) |
| 6 | songs | `song` | Bats on the Roof | 4 bat pictograms; notes at 400/700/1000/1300; color-shifted repeat at 1900/2200/2500/2800 | "A song: Bats on the Roof." / — |
| 7 | songs | `song` | Rake the Leaves | 4 leaf pictograms; note map as item 6 | "A song: Rake the Leaves." / — |
| 8 | letters | `lesson` | The Letter B | pops: "B" glyph (400); a bat (1400); a ball (2400) | "Letters: the letter B." / "B is for bat." (2400) |
| 9 | letters | `lesson` | The Letter M | pops: "M" glyph (400); the moon (1400); a mitten (2400) | "Letters: the letter M." / "M is for moon." (2400) |
| 10 | letters | `lesson` | Rhyme Time | pops: a cat (400); a bat (1400); a hat (2400) | "Rhyming: cat, bat, hat." / "Cat and bat rhyme!" (2400) |
| 11 | letters | `lesson` | First Sound P | pops: a pumpkin (400); a pie (1400); the "P" glyph (2400) | "Reading: first sound P." / "P is for pumpkin!" (2400) |
| 12 | math | `lesson` | Count the Candy | pops: 1 candy (400); 2 candies (1400); 3 candies (2400) | "Numbers: count the candy." / "One, two, three candies!" (2400) |
| 13 | math | `lesson` | Make a Pattern | pops: a pumpkin (400); a leaf (1400); a pumpkin (2400) | "Patterns: pumpkin, leaf." / "Pumpkin, leaf, pumpkin!" (2400) |
| 14 | math | `lesson` | Shapes at Night | pops: the moon-circle (400); a roof-triangle (1400); a window-square (2400) | "Shapes: moon, roof, window." / "Circle, triangle, square!" (2400) |
| 15 | math | `lesson` | Where Is Mouse? | pops: Mouse under the porch (400); Mouse on the chair (1400); Mouse in the basket (2400) | "Logic: where is Mouse?" / "Under, on, in!" (2400) |
| 16 | create | `coloring` | Color the Jack-o'-Lantern | outline stroke-reveals 400–2000; fills: pumpkin orange at 2200, warm glow at 2600; soft pulse at 3000 | "Coloring: jack-o'-lantern." / — |
| 17 | create | `coloring` | Color the Bat | outline stroke-reveals 400–2000; fills: violet wings at 2200, moon glow at 2600; soft pulse at 3000 | "Coloring: the bat." / — |
| 18 | create | `matching` | Twins: Two Little Ghosts | pair fades in at 400; both pictures slide 40 px to meet at 1600; sparkle ≤6 at 1800; the pair item-pops at 2400 | "Matching: two ghosts." / "Two little ghosts match!" (2400) |
| 19 | create | `create` | Build a Pumpkin House | pops: round pumpkin body (400); a little door (1400); two lit windows (2400) | "Create: pumpkin house." / "Pumpkin house, lit up!" (2400) |

**Sample timelines (exact; shared skeleton: 0–400 in, 400–3400 main beat, 3400–3700 hold, 3700–4000 check, chime at 4000).**

| Type | 400–3400 main beat | Audio inside the beat |
|---|---|---|
| `book` | cover holds; flip 2000–2500 (500 ms); interior page shown; sparkle ≤6 at 2600 | `sfx_page` 0.6 at 2000; `vo_beat` at 2500 |
| `video` | three beats pop in at 400 / 1400 / 2400 (pop 0→1 over 300 ms each); beats hold | `sfx_pop` 0.6 per beat; `vo_beat` at 2400 |
| `song` | notes 1–4 item-pop at 400 / 700 / 1000 / 1300; color-shifted repeat notes 5–8 at 1900 / 2200 / 2500 / 2800 | `sfx_tick` 0.5 (0.06 s) per note |
| `coloring` | outline stroke-reveals 400–2000 (≤1600 ms); crayon fill 1 slides 40 px in at 2200; fill 2 at 2600; finished art soft-pulses once at 3000 (400 ms) | `sfx_draw` 0.4 at 400, 2200, 2600 |
| `lesson` | three objects pop in at 400 / 1400 / 2400 (pop 0→1 over 300 ms each) | `sfx_pop` 0.6 per object; `vo_beat` at 2400 |
| `matching` | pair fades in at 400; both pictures slide 40 px toward each other at 1600 (200 ms); sparkle ≤6 at 1800; pair item-pops at 2400 (200 ms) | `sfx_pop` 0.6 at 1800; `vo_beat` at 2400 |
| `create` | three scene shapes pop into place at 400 / 1400 / 2400 (pop 0→1 over 300 ms each) | `sfx_pop` 0.6 per shape; `vo_beat` at 2400 |

**Layout numbers (normal; single page everywhere, nothing scrolls, 320×480 up).**

| Element | ≥1024 px | 768–1023 px | 320–767 px |
|---|---|---|---|
| Shelf cards | 3 cols × 2 rows: 180×180, gap 24 (block 384; row 2 centered) | 136×136, gap 16 (block 288) | 88×88, gap 12 (block 188) |
| `home` height | 560 = 24 + 64 chrome + 44 + 384 + 44 | 440 = 24 + 64 + 32 + 288 + 32 | 288 = 12 + 64 + 12 + 188 + 12 |
| Item tiles | 160×160, gap 24 (block 344) | 120×120, gap 16 (block 256) | 88×88, gap 12 (block 188) |
| `grid` height | 512 = 24 + 64 + 40 + 344 + 40 | 392 = 24 + 64 + 24 + 256 + 24 | 288 = 12 + 64 + 12 + 188 + 12 |
| Preview card | 640×480 (art ≥320×320) | 480×360 (art ≥240×240) | 280×200 (art ≥160×160) |
| `preview` height | 608 = 24 + 480 + 24 + 64 + 16 | 472 = 16 + 360 + 16 + 64 + 16 | 300 = 16 + 200 + 12 + 64 + 8 |

- **Chrome rows:** the 64 px top row holds HOME (left) and, on `home`, the 48 px strip (right-aligned to the same margin); on `grid` it holds HOME, the shelf pictogram, and back at the top-right. In `preview` at ≥768 px: HOME top-left, back top-right, prev at the left card edge, next at the right card edge, Replay under the card — all ≥64×64; at 320–767 px, one centered bottom row of five 64×64 controls (HOME, back, prev, next, Replay, left to right) with 8 px gaps, compressing to 0 px at 320 px wide.
- **Compact layouts** (apply per screen when the viewport is shorter than that screen's band height — 560/512/608 px at ≥1024 px, 440/392/472 px at 768–1023 px):

| Band | Shelf cards | Item tiles | Preview card | Chrome | Fits (home / grid / preview) |
|---|---|---|---|---|---|
| ≥1024 px | 120×120, gap 16 (block 256) | 120×120, gap 16 (block 256) | 440×330 (art ≥240×240) | 64 | 424 / 424 / 458 in 1024×480 |
| 768–1023 px | 100×100, gap 12 (block 212) | 100×100, gap 12 (block 212) | 400×300 (art ≥200×200) | 64 | 348 / 348 / 412 in 768×480 |
| 320–767 px | none — normal 88×88 | none — normal 88×88 | none — normal 280×200 | 64 | 288 / 288 / 300 ≤ 480 |

  Below 480 px height, scale the field by 0.9 best-effort, keeping every target's minimum.
- **Worked example (home at 320×480, then a book):** the five shelf cards render 3 + 2 at 88×88 (gap 12)
  and the strip reads 0 / 20. Tapping `books` opens `grid(books)` (3 + 1 tiles) with "Books." spoken and
  `{lastShelf:"books", lastItemId:null, visitedIds:[]}` saved. Tapping item 0 opens its preview — card
  280×200; cover fade 200 ms; flip 2000–2500 with `sfx_page`; "A moon hat for the cat." at 2500; sparkle
  at 2600; check pop 3700–4000; `sfx_chime` at 4000; the save becomes `{… lastItemId:0, visitedIds:[0]}`
  and the strip reads 1 / 20.
- **Randomization:** none. Shelf order, item order, samples, and layouts are fixed and deterministic; no
  seed or backfill exists.
- **Progression rule:** none. Every item is reachable at every moment; the only accumulations are
  `visitedIds` (drives the resume rings, the strip count, and the one-time completion moment) and the
  current shelf and item.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Play / HOME / back / prev / next | depress 80 ms | `sfx_tap` — 0.5 — one-shot, 0.08 s |
| Shelf opened | tile depress 300 ms; 4 tiles fade in 200 ms | `sfx_open` — 0.6 — one-shot, 0.12 s; `vo_shelf_*` — 1.0 — one-shot |
| Item opened | tile depress 300 ms; card fades in 200 ms; art slides 40 px | `vo_item_{id}` — 1.0 — one-shot |
| Book sample | flip 500 ms; sparkle ≤6 at 2600 | `sfx_page` — 0.6 — one-shot, 0.15 s; `vo_beat` — 1.0 — one-shot |
| Video / lesson / create sample | three beats pop at 400 / 1400 / 2400 | `sfx_pop` — 0.6 — one-shot per beat; `vo_beat` — 1.0 — one-shot |
| Song sample | notes and pictograms item-pop per note | `sfx_tick` — 0.5 — one-shot, 0.06 s per note |
| Coloring sample | stroke reveal; two fills slide in; soft pulse | `sfx_draw` — 0.4 — one-shot, 0.2 s (×3) |
| Matching sample | slide at 1600; sparkle at 1800 | `sfx_pop` — 0.6 — one-shot; `vo_beat` — 1.0 — one-shot |
| Sample end (every type) | check pops 3700–4000; Replay pulses 3× 200 ms | `sfx_chime` — 0.8 — one-shot, 0.8 s |
| Completion (FR-019) | confetti ≤40 particles, 2500 ms; check becomes a star (300 ms); panel at 6500 (fade 250 ms) | `sfx_chime` — 0.8 — one-shot; `vo_complete` — 1.0 — one-shot |
| Idle hint (FR-015) | deterministic target hint-pulses 3,000 ms | `vo_hint_*` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during the hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after the first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only; stops at Play |

**Effect definitions (closed list — every effect used is defined here):** *depress* = scale 1→0.95→1 over 80 ms (tile: 300 ms). *pop* = scale 0→1 over 300 ms. *item pop* = scale 1→1.15→1 over 200 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 per 500 ms cycle for 3,000 ms. *replay pulse* = 3×(scale 1→1.15→1) over 200 ms each. *sparkle* = ≤6 particles ≤40 px flying ≤80 px over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px over 2500 ms. *fade* = opacity 0→1 or 1→0 over 200 ms. *grid settle* = card fade 300 ms + translate ≤16 px, stagger 30 ms inside the 1,200 ms lead-in. *ring fill* = 4 px accent stroke fills over exactly the 3 s hold; *ring flash* = opacity 1→0 over 300 ms. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fade 250 ms. *check pop* / *star pop* = scale 0→1.15→1 over 300 ms. *accent ring* = static 3 px `#F2994A` outline. *flip* = cover rotates about its spine 0→180° over 500 ms. *stroke reveal* = SVG stroke-dashoffset over ≤1600 ms. *slide* = translate 40 px→0 over 200 ms.

**Copy (fixed, original):** `vo_welcome` = "Welcome to Moonlight Street! Pick a shelf." (≤3.0 s). Shelf voices: `vo_shelf_books` "Books."; `vo_shelf_songs` "Videos and songs."; `vo_shelf_letters` "Letters and reading."; `vo_shelf_math` "Math and logic."; `vo_shelf_create` "Create." (each ≤1.5 s). Hint lines: `vo_hint_title` "Tap the button to start."; `vo_hint_home` "Tap a shelf to look inside."; `vo_hint_grid` "Tap a picture to see it."; `vo_hint_preview` "Tap the card to see it again." (each ≤2.5 s). `vo_complete` = "You saw everything on Moonlight Street — what a night!" (≤3.5 s). Item and beat lines are in section 8. Voice timbre and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first gesture (FR-020); one voice at a time, each new voice cancels the previous utterance; sfx may overlap; `music_title` optional at 0.15 on `title` only. Degradation per FR-021; background-tab behavior per FR-022 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key
  `spec.seasonalCollections.halloween.v1`.
- **Shape:** `{ "lastShelf": "books"|"songs"|"letters"|"math"|"create"|null, "lastItemId": 0-19|null,
  "visitedIds": [0-19 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`.
- **Save points:** shelf open (writes `lastShelf`, sets `lastItemId: null`, keeps `visitedIds`), preview
  entry (sets `lastItemId`; the item joins `visitedIds` once), completion (FR-019), and HOME; every save
  writes all four keys, refreshes `updatedAt`, and never removes a visited id.
- **Restore:** the saved shelf card wears the 3 px accent ring and soft-pulses once after the lead-in; inside that shelf the saved item tile wears the same ring when `lastItemId` is not null; nothing auto-opens and Play always starts at `title`. With 20 ids in the save the strip shows the star.
- **No shared kernel:** one key only; no profiles, accounts, or cross-entry storage.
- **Reset:** hold the title logo 3 s (filling 4 px ring) → clears the key and in-memory progress; keyboard equivalent: hold Enter/Space 3 s on the focused logo (FR-016).
- **Deliberately not stored:** sample clock or playhead, visit order, strip animation state, audio settings, language, tap data, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended; handled by FR-022. Storage blocked → run unsaved (FR-021).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy character, art,
voice, or audio appears. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row
says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_title` | image | soft night sky, quiet rooftops, a low moon | 1024×768 SVG | static | SVG gradient + circles |
| `frame_street` | image | the home frame: friendly night street — moon, porch with warm light, grinning jack-o'-lantern, fence, paper lights; decorative, never a target except its cards and controls | 1280×720 SVG | static; fades in 200 ms | SVG shapes |
| `pict_play` / `pict_home` / `pict_back` / `pict_prev` / `pict_next` / `pict_replay` | image | triangle; house; return arrow; chevrons; circular restart arrow | 64×64 SVG each (Play drawn at 96×96) | static | SVG paths |
| `mark_reset` / `ring` | image | inconspicuous logo mark; 4 px accent progress ring | ≥64×64; 64×64 SVG | hold ring | SVG shapes |
| `glyph_shelf_{books,songs,letters,math,create}` | image | open book; play triangle + note; two letter tiles; numeral 4 with shapes; crayon + star | 64×64 SVG each | static | SVG shapes |
| `glyph_theme` / `check_strip` / `star_strip` | image | jack-o'-lantern face (strip pictogram); rounded check; rosette star | 48×48 / 32×32 / 32×32 SVG | check pops; star replaces it at completion | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after the first Play when speech is missing | SVG path |
| `art_item_{0-19}` | image / animated | each item's section 8 beat: book covers and pages (0–3), three-beat moments (4–5), song scenes (6–7), lesson pops (8–15), coloring outlines (16–17), matching pair (18), scene shapes (19) | 320×240 SVG each (preview art ≥320×320 at ≥1024 px) | runtime animation per the section 8 timeline | SVG shapes + font glyphs |
| `sfx_tap` / `sfx_soft_tap` / `sfx_open` / `sfx_page` / `sfx_pop` / `sfx_draw` / `sfx_tick` / `sfx_chime` | audio | click 0.08 s; muted tap 0.10 s; door-creak 0.12 s; paper flip 0.15 s; pop 0.15 s; soft scribble 0.2 s; tick 0.06 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips / arpeggio |
| `vo_welcome` / `vo_shelf_{5}` | audio | copy in section 9 | ≤3.0 s / ≤1.5 s each | one-shot | TTS allowed |
| `vo_item_{0-19}` / `vo_beat_{id}` | audio | the lines in section 8; beat voices exist for ids 0–5, 8–15, 18–19 (16 of 20 items) | ≤1.8 s each | one-shot | TTS allowed |
| `vo_hint_{title,home,grid,preview}` / `vo_complete` | audio | copy in section 9 | ≤2.5 s / ≤3.5 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** night `#22304F`, moon cream `#F7EFD2`, amber `#F2994A`, leaf `#C96F4A`, friendly
  green `#7FB069`, chrome `#FFFDF7`, ink `#3A2E24`, star gold `#F2B33D`. **Typography:** system rounded
  stack (`ui-rounded`, fallback `system-ui`); strip and badge numerals ≥40 px, lesson content glyphs
  ≥96 px at ≥1024 px (≥72 px at 768–1023, ≥56 px at 320–767), book titles ≥28 px on covers (content).
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio →
  skip that clip, behavior unchanged (FR-021).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Shelf` | `id: enum {books, songs, letters, math, create}`; `pict: string`; `count: int` (4); `items: int[]` (ids in order) |
| `Item` | `id: int 0-19`; `shelf: ShelfId`; `kind: enum {book, video, song, lesson, coloring, matching, create}`; `artKey: string`; `voiceKey/voiceCopy: string`; `beatKey/beatCopy: string\|null`; `data: Book \| Video \| Song \| Lesson \| Coloring \| Matching \| Create` |
| `Book` | `title: string` (content); `pageArtKey: string`; `pageLine: string` |
| `Video` | `beats: string[3]` (art keys, popped at 400/1400/2400) |
| `Song` | `notes: [400,700,1000,1300]`; `repeat: [1900,2200,2500,2800]`; `pictKeys: string[4]`; `repeatTint: string` |
| `Lesson` | `subject: enum {letters, reading, math, logic}`; `pops: {artKey, at: 400\|1400\|2400}` (3 pops) |
| `Coloring` | `outlineKey: string`; `fills: [{key, at: 2200}, {key, at: 2600}]` |
| `Matching` | `pairArtKey: string`; `pair: {aKey, bKey}` (like pictures) |
| `Create` | `shapes: string[3]` (popped at 400/1400/2400) |
| `Save` (persisted) | `lastShelf: ShelfId\|null`; `lastItemId: int 0-19\|null`; `visitedIds: int[]`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, home, grid, preview}`; `leadIn: bool`; `shelf: ShelfId`; `itemId: int`; `sample: enum {playing, paused, ended}`; `sampleMs: int 0-4000`; `completionFired: bool`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Shelf`, `Item`, and the kind records are static; the sample timeline is computed from `sampleMs` and never
from wall-clock time. Judgment, scoring, unlocks, and comparisons do not exist.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, pictograms, per-tile hit rects, large numerals, and short text runs as content.
- **R-002** The player shall animate the section 9 effects: depress, pop, item pop, soft pulse, hint pulse, replay pulse, sparkle, confetti, fade, grid settle, ring fill/flash, check/star pop, accent ring, flip, stroke reveal, slide, end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input with the FR-012/FR-013 hit rules; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all controls, with the section 6 tab order, Escape = HOME, Backspace = back, ArrowLeft/Right = prev/next, R = Replay.
- **R-005** The player shall play one voice clip at a time (each new voice cancels the previous utterance), one-shot sfx that may overlap the voice, and an optional music loop at ≤0.15 on `title` only.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall voice clips via recorded audio or speech synthesis with the FR-021 no-speech fallback, and shall continue with visual-only feedback when any voice or audio asset fails.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage (FR-018), tolerate blocked storage (FR-021), and make no network requests after initial load (FR-024).
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during samples, confetti, and the lead-in.
- **R-010** The player shall scale from 320×480 to 1366×768 without losing state, shelf, item, or a running sample's clock (FR-022).
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-023).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: freeze the sample on hide (FR-022), lose no progress, and allow lead-in or hints to fire late.
- **R-013** Each preview sample shall be renderable at runtime from its `Item` record and the section 8 timeline; no per-item code is required.
- **R-014** The player shall request no camera, microphone, or network access at runtime.
- **R-015** The player shall keep every screen free of scrolling at 320×480 and above by applying the section 8 compact rule whenever the viewport is shorter than the width band's height requirement, with every target at the section 8 minimums.

## 14. Acceptance criteria

| AC | Covers | Given | When | Then |
|---|---|---|---|---|
| AC-01 | FR-001 | a first load | assets finish | `title` shows Play (≥96 px), the reset logo (≥64 px, 24 px margin), and the night backdrop, and no audio has played |
| AC-02 | FR-002 | `title`, no save | Play is pressed | the frame fades in 200 ms, the five shelf cards settle with a 30 ms stagger inside 1200 ms, and "Welcome to Moonlight Street! Pick a shelf." plays at 1200 ms |
| AC-03 | FR-002 | `title`, a save `{lastShelf:"books"}` | Play is pressed | after the lead-in the Books card soft-pulses once (1→1.04→1 over 400 ms) and wears the accent ring; tapping anywhere during the lead-in finishes it instantly and opens nothing; HOME during it cancels to `title` |
| AC-04 | FR-003 | `home` | it is inspected | five shelf cards show counts 4/4/4/4/4, the strip shows the theme pictogram, "0", "20", and a check; every card opens and nothing is locked |
| AC-05 | FR-004 | `home` | the Create card is tapped twice within 500 ms | exactly one open occurs, "Create." is spoken once, `sfx_open` plays, and the save records `lastShelf:"create"` with `lastItemId:null` and the prior `visitedIds` kept |
| AC-06 | FR-005 | a 320×480 viewport / 1024×768 viewport | a shelf opens | four tiles render 3 + 1 at 88×88 / 160×160 with the shelf pictogram, back, and HOME, no paging controls exist, and nothing scrolls |
| AC-07 | FR-006 | the books grid | tile 0 is tapped | the preview opens, "A book: The Moon Hat." plays, the sample starts at 0, and the save adds id 0 to `visitedIds` once; a double-tap yields one preview |
| AC-08 | FR-007 | `preview` item 0 | the sample runs | the cover fades in by 400 ms, flips 2000–2500 with `sfx_page`, the page line plays at 2500, sparkle ≤6 at 2600, the check pops 3700–4000, `sfx_chime` plays at 4000, and Replay pulses 3× over 600 ms |
| AC-09 | FR-007 | `preview` items 4, 6, 14, 16, 18, 19 | each sample runs | video/lesson/create beats pop at 400/1400/2400; song notes item-pop at 400/700/1000/1300 with a repeated phrase at 1900–2800; coloring stroke-reveals to 2000 and fills at 2200/2600; matching glides at 1600 and sparkles at 1800 — all ending with the check and 4000 ms chime |
| AC-10 | FR-007, FR-017 | any sample | the screen is inspected and random taps land during it | no right/wrong, score, streak, or round logic exists; taps only replay (FR-008) and never deduct or lose progress |
| AC-11 | FR-008 | a sample that has ended | the card is tapped twice within 500 ms | exactly one replay starts from 0 with its voice, and the check/chime sequence plays again |
| AC-12 | FR-009 | `preview` item 0 of books | Next is tapped twice within 300 ms; separately, Prev is tapped at item 0 and Next at item 3 | exactly one step occurs on the double-tap to item 1 with its line and sample; the separate Prev at item 0 and Next at item 3 are no-ops with no sound; stepping never wraps to another shelf |
| AC-13 | FR-010 | a preview opened from the create shelf | back is tapped, then back again | the create grid returns with all four tiles, then `home` returns; audio is cancelled at each step |
| AC-14 | FR-011 | `home`, `grid`, or `preview` | HOME is pressed | the title appears and the save was written; on `title` Escape changes nothing; on `loading` there is no control |
| AC-15 | FR-012 | any state | a tap >12 px from every target is made | nothing changes on screen or in audio and the idle timer resets |
| AC-16 | FR-013 | `home` | two fingers land on two cards, and separately one pointer drags >24 px before release | only the first pointer's card opens; the second shows no feedback until release; the drag opens nothing |
| AC-17 | FR-014 | any state | each control is double-tapped | exactly one judged event occurs (one open, preview, replay, step, back, or HOME) with no second voice |
| AC-18 | FR-015 | `home`, `grid`, and `preview` (sample ended or paused), with a gesture already made | 12 s pass with no input in each | the deterministic target hint-pulses 3 s and the matching hint line plays; on `title` before any gesture it is visual-only; no hint fires while a sample plays; any tap resets the timer |
| AC-19 | FR-016 | `title` | the logo is held 3 s | the 4 px ring fills visibly, the save clears, the ring flashes with `sfx_soft_tap`, and after reload the strip reads 0 / 20 with no rings; the focused-logo keyboard hold behaves the same |
| AC-20 | FR-017 | any state | random taps, empty taps, idle time, and back-and-forth navigation occur | nothing is lost or locked, no score appears, and every item stays openable |
| AC-21 | FR-018 | item 7 previewed, then HOME, reload, Play | `home` appears | the songs card wears the accent ring and soft-pulses once; its grid shows tile 7 with the ring; the save holds `lastShelf:"songs"`, `lastItemId:7`, and `visitedIds` containing 7 |
| AC-22 | FR-019 | 19 items visited | the 20th distinct item's sample ends | confetti ≤40 particles over 2500 ms, `sfx_chime`, and "You saw everything on Moonlight Street — what a night!" play; at 6500 ms the panel fades in with Replay ≥96 px and HOME ≥64 px; the strip's check becomes a star (300 ms) and the star persists after reload; Replay fades the panel and restarts the sample without re-firing the moment |
| AC-23 | FR-020 | a fresh load | Play and then a shelf are pressed while the welcome line is still speaking | no audio played before the first gesture, and the welcome stops when the shelf voice begins (one voice at a time) |
| AC-24 | FR-021 | speech synthesis unavailable / no AudioContext / storage blocked | the collection is browsed in each case | visual-only with the muted pictogram for 5 s / silent / fully usable unsaved; the reset ring still shows |
| AC-25 | FR-022 | a sample playing | the tab is hidden and then shown, and separately the viewport is resized mid-sample | the card is held with the clock frozen, Replay pulses 3,000 ms (600 ms repeat, no voice), and a replay restarts from 0; resize keeps the shelf, item, and clock with no scrolling |
| AC-26 | FR-004, FR-023 | any state | Tab is pressed repeatedly, then Enter/Space, R, arrows, Backspace, and Escape are used | focus follows the section 6 order, each control activates, items step, back goes up one level, and Escape returns HOME; every interactive element announces an invisible name; visible text is content only; neither the catalogued title nor "Khan" appears on screen or in audio |
| AC-27 | FR-024 | after load | the player is browsed and the network panel, camera, and microphone are watched | no network request, permission prompt, or download state occurs, and every item opens at any time with no calendar or lock state |
| AC-28 | FR-025 | any state | an unbound key (e.g. `A`) is pressed or an unknown event fires | nothing changes on screen or in audio and play continues normally |
| AC-29 | FR-005, FR-015, R-015 | `home`, `grid`, and `preview` at 1024×480 | the screens are shown | the ≥1024 compact layout applies (cards 120×120, preview 440×330, chrome 64, heights 424/424/458) with no scrolling and every target ≥64; at 320×480 the normal layouts (288/288/300) apply; at 768×480 the normal layouts (440/392/472) apply |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. Pressing Play reveals the five shelves with 20 tiles, and every sample runs the section 8 timeline and
   ends with the check and the 4000 ms chime.
3. Browsing, replay, stepping, back, HOME, the resume rings, and the reset hold behave as specified.
4. The save survives a reload; the completion moment fires once at 20 distinct visits and its star persists.
5. No-speech, no-AudioContext, and blocked-storage runs behave as specified, and no network, camera, or
   microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 20 items across five designed shelves is a designed instantiation of the officially described type list; item titles, counts, and samples are unpublished (O4) | designed (D2, D3) |
| A2 | The official "time-limited" fact is not modelled: no calendar, availability, lock, or countdown state exists, and every item is always openable | designed (D5, FR-003, FR-024) |
| A3 | Preview samples are original 4000 ms moments with no game logic, right/wrong, or scoring; they are never the app's real lessons or games | designed (FR-007) |
| A4 | "Halloween" is a generic public theme; all art, copy, and voice are original, and no Khan Academy character, art, voice, or audio is used anywhere; the catalogued title is traceability only | designed (D1, D7) |
| A5 | Recorded or TTS-synthesized voices are both acceptable; copy is fixed in section 9 and the section 8 lines stay within their caps | designed |
| A6 | Browsers block autoplay until the first gesture; background-tab timers may be throttled and speech suspended | platform facts; handled by FR-020/FR-022 |
| A7 | Pause-on-hide for samples, with no auto-restart on return, is a designed choice | designed (FR-022) |
| A8 | 320×480 is supported (below the family's 768-wide baseline); the section 8 numbers were chosen so the normal layouts fit it and the compact layouts fit 1024×480 and 768×480 without scrolling | designed (FR-015, R-015) |
| A9 | No drag gestures exist in this player; taps and keyboard only | designed (FR-013) |
| A10 | Age band 2–8 with a 2–5 pre-reader focus is a targeting choice inside the app's official 2–8 range | designed (O5) |
| A11 | The saved shelf card's resume cue is one soft pulse (1→1.04→1 over 400 ms) — the shared brief's defined resume cue, drawn from the closed effect list | designed (FR-002, FR-018) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the five shelves and their item counts (4/4/4/4/4 = 20); item ids, types, titles, and sample timelines; the lead-in and preview skeletons; all shared numbers (target sizes, layout bands, compact layouts, throttles, idle and reset timings); hit tolerance and pointer rules; chrome set and keyboard map; the save key, shape, and save points; the completion moment; no fail state, no scoring, no comparisons, no calendar; asset provenance; acceptance criteria.
- **Free:** exact composition of the night-street frame and each item's art within the section 8 guidance, easing curves, particle look, voice timbre/TTS engine, optional title music, tile corner radius, glyph geometry beyond the worked examples.
- **Not in this spec:** the app shell or home-screen navigation, the other seasonal collections, profiles, parental controls, localization, analytics, teacher tooling, real seasonal availability or download mechanics, the app's actual lessons, books, videos, or songs (no re-implementation), and any Khan Academy character, art, voice, or audio.
