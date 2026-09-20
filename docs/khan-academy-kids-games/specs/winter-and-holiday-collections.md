# Winter and holiday collections

*(The catalogued title is retained for traceability only; it appears nowhere on screen or in audio, and no Khan Academy name, character, art, voice, or audio is reproduced. Precedent: `character-rooms-and-collections.md` line 5.)*

## 1. Front matter

- **Entry type:** Interactive player — collection browser (six seasonal shelves; each item opens one 4000 ms preview)
- **Catalogued entry:** [`winter-and-holiday-collections.md`](../winter-and-holiday-collections.md)
- **Official source:** [App Store listing — version history](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); repo wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 260–262
- **Spec status:** v1 — follows template v1; one of the four seasonal-collection specs; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-021); no network after load
- **Player substitutions (declared):** the six shelves replace levels, the 24 item previews replace rounds, and the completion moment (confetti + end panel) replaces a win condition; there is no scoring, no fail state, and no terminal state — HOME always returns to `title`
- **Provenance constraint:** the entry groups four officially named seasonal collections; this spec turns them into one original six-shelf player. All items, titles, art, voice, and copy are original (section 3, section 11)

## 2. Overview and learning objective

A child presses Play and a cozy snowy window ledge appears with six shelf cards: Winter, Kindness Month, Valentine's, National Reading Month, Recommended Reads, and Winter sports. Tapping a shelf lays out its four items — seasonal books, videos, and coloring pages — as a 3×2 grid that always fits without scrolling; tapping an item plays one 4000 ms original sample (a book cover flips to an interior page, a three-beat animated video moment, or a coloring outline with two crayon fills). A voice names each shelf and item, a strip counts how many items have been seen, and the frame marks what was already visited. The skills are **independent choice-making and one-hop exposure to each documented seasonal content type** — "I can pick what I like, and hear it named". Age band: **2–8 across the library**; this entry targets the **2–5 pre-reader** first, with 6–8 early readers able to read the book titles as content. Expected session: **1–4 minutes** (two to six previews); a full browse of all 24 items spans several sessions.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Official update notes name several seasonal collections: **Winter**, **Kindness Month**, **Valentine's**, and **National Reading Month** | official | Catalogued entry; catalog lines 260–262 |
| O2 | The collections add **seasonal books, videos, and coloring pages** | official | Catalogued entry |
| O3 | Official materials also name **"Recommended Reads" and winter-sports book shelves** | official | Catalogued entry |
| O4 | **Each collection is time-limited** and may not be available outside its season | official | Catalogued entry Notes |
| O5 | The file **groups several distinct seasonal collections** because official sources describe them only briefly | official | Catalogued entry Notes |
| O6 | Official sources publish **no individual item titles, counts, art, audio, mechanics, or dates** for these collections | official (about the source's limits) | Catalogued entry; catalog lines 260–262 |
| O7 | The app is officially for children ages 2–8 | official | `khan-academy-kids-games.md` §5 |
| D1 | One player presents the grouped entry as **six shelves in one frame**: winter, kindness month, Valentine's, national reading month, recommended reads, winter sports | designed | O5 groups four collections; a single browse surface is the minimal buildable player (D5); shelf order is fixed |
| D2 | Exactly **24 items**: 16 books (2+2+2+2 on the first four shelves, 4+4 on the two book shelves), 4 videos, 4 coloring pages (1 in each of the first four shelves) | designed | O6: counts unpublished; 4 per shelf keeps every shelf inside the family's 3–6 item rule and one 3×2 grid |
| D3 | All item titles, art, voice lines, and copy are original; the shelf themes are generic and usable | designed | IP rule: no KA characters, art, voice, or audio (section 11) |
| D4 | **No calendar, availability, lock, or countdown state**: every item is always openable; the time-limited fact lives only in this section and A3 | designed | O4 is a distribution fact; the player models no season gate so nothing can ever be missing |
| D5 | Collection-browser session shape: `loading` → `title` → `home` → `grid(shelf)` → `preview(item)`, one 4000 ms sample per item, completion moment, end panel | designed | The four seasonal specs' shared brief; replaces levels/rounds/win with shelves/previews/completion |
| D6 | Player chrome (Play, HOME, back, prev/next, Replay, reset logo), 1200 ms lead-in, 12 s idle hints, 3 s reset hold, save/resume rings, audio rules, degradation, layouts | designed | Template v1 and family conventions (`offline-library-kodis-suitcase.md`, `book-basics-book-cover.md`) |
| D7 | Home frame: a **cozy snowy window ledge with string lights**; strip shows visited/total with a check that becomes a star | designed | Gives the seasonal theme a frame per the shared brief ("theme frames home") |

## 4. Player experience / core loop

A child presses Play. The window ledge fades in and six shelf cards settle one after another; a voice says "Cozy season! Pick a shelf to look inside." They tap the Winter shelf — four item cards appear and the voice says "Winter." They tap the book card: the voice says "A book: The Very First Snow.", the cover fades in, flips at 2000 ms, and an interior page appears as the voice says "Snow at last!"; a check pops and a chime rings at 4000 ms. They tap the card again — the same little story, again. They step to the next card: a coloring page draws its outline and two crayon fills appear. Later they tap HOME; the ledge returns to the title. On the next visit the Winter shelf card and the saved item wear small accent rings, so they can pick up where they left off; after all 24 samples the strip's check becomes a star.

**Core loop:** press Play → pick a shelf → pick an item → watch or replay its 4000 ms sample → step to the next item or go back → keep browsing until every item has been seen.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading` (prepare assets per section 11; audio locked; no focusables), then `title`: a soft snowy backdrop with a themed card, one Play target ≥96×96 CSS px, and a reset logo ≥64×64 CSS px at the top-left with a 24 px margin (FR-016). No audio shall play before the first pointer or key input (FR-020). The catalogued title and every Khan Academy name, character, art, voice, and audio shall appear nowhere on screen, in audio, or in an accessible name (FR-024). |
| FR-002 | When Play is pressed, the player shall unlock audio and run a **1200 ms lead-in**: the home frame `fade`s in (200 ms) and the six shelf cards settle (`grid settle`: fade 300 ms, translate ≤16 px, stagger 30 ms). Any pointer or key input during the 1200 ms shall finish it instantly (that input is consumed and opens nothing); HOME during it shall cancel to `title`. On the first Play after load, `vo_welcome` (1.0, one-shot, ≤3.0 s) plays at 1200 ms; when a save exists, the saved shelf card `soft pulse`s once (400 ms) beginning when the lead-in completes (1200 ms). On completion the player shall enter `home`. |
| FR-003 | `home` shall show the cozy snowy window ledge frame with **string lights**, the six shelf cards in **3 columns × 2 rows** at the section 8 sizes, each card carrying its category pictogram and a count numeral "4", and the collection strip: theme pictogram (snowflake), visited numeral, "/" separator pictogram, total numeral "24", and a 32×32 check. The frame, its string lights, and the theme pictogram are decorative — never targets except the shelf cards and controls. HOME (≥64×64; 24 px top-left margin at ≥1024 px, 16 px at 768–1023, 12 px at 320–767) shall be rendered. Every item shall always be openable: no lock, calendar, availability, download, or connectivity state exists, and no shelf or tile is ever disabled. |
| FR-004 | When a shelf card is tapped, the player shall open `grid(shelf)`, play a 300 ms card depress, speak `vo_shelf_{shelf}` (1.0, one-shot, ≤1.5 s), play `sfx_open` (0.6, one-shot, 0.12 s), fade the four tiles in 200 ms (`fade`), and save (FR-018; writes `lastShelf`, `lastItemId: null`, keeps `visitedIds`). Shelf taps share one 500 ms throttle. `grid` shall show the shelf's four item tiles in a single 3×2 grid (row-major: 3 in the first row, 1 centered in the second), the shelf pictogram ≥64×64, back ≥64×64 top-right, and HOME; **no paging, dots, or chevrons exist** because every shelf holds 4 items, and every grid fits the viewport with no scrolling from 320×480 up (section 8). |
| FR-005 | When an item tile is tapped, the player shall open `preview(item, playing)`, play a 300 ms tile depress, speak `vo_item_{id}` (1.0, one-shot, ≤1.8 s) at entry, start the sample from 0 (FR-006), and save (FR-018; sets `lastItemId`, adds the item to `visitedIds` once, keeps `lastShelf`). Item taps share one 500 ms throttle. |
| FR-006 | Each preview shall run **one accumulated 4000 ms sample clock** (advanced per frame only while `playing` and the tab is visible; never wall-clock) on the fixed skeleton: **0–400** card fade-in (`fade`, 200 ms); **400–3400** the item type's main beat per section 8 — `book`: cover holds, 500 ms `flip` at 2000–2500 with `sfx_page` at 2000, interior page `fade`s in 2500–2700, `vo_page_{id}` (1.0, one-shot, ≤0.9 s) at 2500; `video`: three beats `pop` (0→1, 300 ms each) at 400/1400/2400 with `sfx_pop` (0.6, one-shot) per beat; `coloring`: outline `stroke reveal` 400–1600 with `sfx_draw` (0.4, one-shot, 0.2 s) at 400, then two crayon fills `fade` in (200 ms each) at 1600–1800 and 1800–2000; **3400–3700** hold; **3700–4000** `check pop` (0→1.15→1, 300 ms) with `sfx_chime` (0.8, one-shot, 0.8 s) at 4000. Any beat voice starts ≥2000 ms. Samples are automatic and non-interactive: no right/wrong, no scoring, no round logic, and never another spec's game or activity. |
| FR-007 | At 4000 ms the player shall enter `preview(item, ended)`: the card holds its final frame and the Replay control `replay pulse`s 3×(1→1.15→1) over 200 ms each. The card then stays in `ended` until an input; nothing auto-advances. |
| FR-008 | When the preview card or Replay (≥64×64) is tapped in `ended` or during a sample, the player shall cancel the current voice and sample audio and restart the sample and `vo_item_{id}` from 0. Card taps and Replay share one 500 ms throttle; a double-tap restarts once. |
| FR-009 | When Next or Previous (each ≥64×64) is tapped, the player shall open the previous/next item of the same shelf in index order (cancel audio, speak the new `vo_item`, start its sample from 0, save). At the first or last item of the shelf the control is a no-op (no visual or audio change). Prev/next share one 300 ms throttle. |
| FR-010 | When back (≥64×64) is tapped, the player shall cancel voice and sample audio and go up one level: from `preview` to `grid(shelf)`; from `grid` to `home`. Back is throttled to one return per 300 ms and is not a save point (preview entry already saved). |
| FR-011 | HOME (≥64×64; 24 px top-left margin at ≥1024 px, 16 px at 768–1023, 12 px at 320–767) shall be rendered in `home`, `grid`, and `preview`; pressing it shall cancel any voice, the sample clock, and the idle timer, save, and return to `title`. On `title` (the player's home) no HOME control is rendered and a HOME input (Escape) is a no-op; on `loading` no control is rendered and any input is a no-op. HOME is throttled to one press per 300 ms. |
| FR-012 | Hit-testing shall expand every control's rectangle by **12 px** on all sides. A tap inside more than one expanded rectangle shall resolve to the nearest control center, then the leftmost, then the topmost. A tap more than 12 px from every control is an empty tap — no state change, no sound — and resets the idle timer (FR-015). A tap that starts inside a control never falls through to the scene beneath it. |
| FR-013 | The player shall track only the first pointer: a pointer-down inside a control (12 px-expanded) acquires it; pointer-up within **24 px** of the down point activates it; a pointer that moves more than 24 px before release cancels that gesture with no state change (no drag gestures exist); additional simultaneous pointers are ignored until all pointers are released. On a same-millisecond tie between two pointers the leftmost wins. |
| FR-014 | Rapid or repeated taps shall never double-apply: taps inside a shared throttle (FR-004, FR-005, FR-008, FR-009, FR-010, FR-011) produce exactly one judged event; taps inside a throttle keep their visual depress but play no second voice; a double-tap yields one shelf open, one preview, one replay, one step, or one HOME. |
| FR-015 | When no pointer or key input has occurred for **12,000 ms**, the player shall `hint pulse` the deterministic target for 3,000 ms: `title` → Play; `home` → the leftmost shelf with an unvisited item, else the leftmost shelf; `grid` → the first unvisited tile in index order, else the leftmost tile; `preview` → Replay. After the first gesture of the run the hint shall also speak the state's `vo_hint_*` line (1.0, one-shot, ≤2.5 s); before it, the hint is visual-only. The hint repeats every 12,000 ms of continued idleness; any input, including an empty tap, resets the timer. No hint fires while a sample is playing. |
| FR-016 | When the title logo is held for **3,000 ms**, the player shall fill a visible 4 px progress ring for the hold duration (`ring fill`); releasing early resets the ring to 0 with no action; on completion it shall clear the storage key and in-memory progress (`lastShelf`, `lastItemId`, `visitedIds`, the run's completion flag) and play `ring flash` (300 ms) plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3,000 ms on the keyboard-focused logo is the equivalent; a hidden tab cancels the hold. |
| FR-017 | The player shall have no fail state: no wrong answer, score, streak, timer, lock, deduction, or comparison exists; empty taps, rapid taps, multi-touch, going back, and idle time never lose progress, never close the player, and never lose the visited set. Every item is always openable. |
| FR-018 | The player shall persist one small JSON object in browser local storage under `spec.seasonalCollections.winterHoliday.v1` (section 10): `{ "lastShelf": "<shelfId>"\|null, "lastItemId": 0–23\|null, "visitedIds": [0–23 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`. Save points: shelf open (writes `lastShelf`, sets `lastItemId: null`, keeps `visitedIds`), preview entry (sets `lastItemId`, adds the item once), completion, and HOME; every save writes all four keys and refreshes `updatedAt`, and no save ever removes a visited id. Restore: the saved shelf card wears the 3 px accent ring and `soft pulse`s once beginning when the lead-in completes (FR-002); inside that shelf the saved item tile wears the same ring; nothing auto-opens; Play always starts at `title`. Storage blocked → unsaved run (FR-021). |
| FR-019 | When the last unvisited item's sample ends (`visitedIds.length` reaches 24), that preview shall play the completion moment: confetti (≤40 rect particles moving ≤120 px over 2500 ms), `sfx_chime` (0.8, one-shot), and `vo_complete` (1.0, one-shot, ≤3.5 s); then, at 6500 ms, a completion panel (`end panel` ≤360×280, `fade` 250 ms) shall appear over the card with Replay ≥96×96 and HOME ≥64×64. The strip's check shall become a 32×32 star (`star pop`, 300 ms) for the rest of the run and, while the save lists all 24 ids, after reload too. A panel Replay or a card tap shall hide the panel (`fade` 200 ms) and restart the sample from 0 (FR-008); the completion moment fires once per run and does not re-fire; the panel does not re-show. Nothing unlocks, closes, or gates. |
| FR-020 | Audio: no audio shall play before the first pointer or key input of a run (FR-001); that input unlocks audio. Exactly one voice at a time — any new voice (welcome, shelf, item, page, hint, complete) cancels the previous utterance immediately; sfx may overlap each other and the voice. `music_title` may loop at 0.15 on `title` only and shall stop at Play. Every cue's volume and behavior is stated in section 9. |
| FR-021 | Degradation: no speech synthesis → all voices silent, samples and pulses run unchanged, every state stays navigable by pictogram + numeral, and a muted-speaker pictogram (48×48) shows for 5,000 ms after the first Play; no AudioContext → all audio silent, behavior otherwise identical; storage blocked → the run is unsaved (all behavior and the visited set work in memory; the reset ring still shows); a missing visual asset draws a stub shape; a missing audio clip is skipped. |
| FR-022 | When the tab becomes hidden while a sample is playing, the player shall freeze the sample clock (frame held) and cancel pending audio; on return the sample stays paused, the card holds, and Replay `replay pulse`s for 3,000 ms (one 200 ms pulse every 600 ms, no voice) until a replay restarts the sample from 0 (FR-008). Hidden time pauses the idle timer; idle time counts visible time only; throttled timers may delay the lead-in or a hint but never lose progress (A6). |
| FR-023 | Resize or rotation shall reflow per section 8 and preserve the state, shelf, item, and a running sample's clock (no restart), with every target at the section 8 minimums and no scrolling. When the viewport height is below the width band's requirement for the current state (home 560 / grid 512 / preview 608 at ≥1024 px; home 440 / grid 392 / preview 472 at 768–1023 px; home/grid 288 / preview 300 at 320–767 px), that band's compact layout shall apply (≥1024 and 768–1023 only). Below 480 px height the field scales by 0.9 as a best effort, keeping every target's minimum. From 320×480 to 1366×768 nothing scrolls. |
| FR-024 | No reading shall be required: visible text is content only — numerals (shelf counts, strip), book titles on covers and interior page art. Every instruction and feedback reaches non-readers by voice + pictogram. Every interactive element carries an invisible accessible name (section 7), and the catalogued title and any Khan Academy name appear nowhere on screen, in audio, or in an accessible name. |
| FR-025 | The player shall run fully offline: no network request, connectivity check, download state, or cloud affordance at any time after load; every item is always openable; camera, microphone, and network permissions shall never be requested. |
| FR-026 | Unknown events, inputs, and unbound keys shall be ignored (no state change, no sound). Shelf order, item order, samples, and layouts are fixed and deterministic; there is no randomization, unlock, adaptive difficulty, or timer that gates progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | soft themed backdrop | initial; prepare assets; audio locked; no interactive elements |
| `title` | soft snowy backdrop + themed card + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `home` | snowy window ledge frame + string lights + 6 shelf cards + strip + HOME | the collection home; lead-in runs on Play |
| `grid(shelf)` | one shelf's 4 item tiles in a 3×2 grid + shelf pictogram + back + HOME | no paging; tiles in item index order |
| `preview(item, sample)` | preview card + Replay + prev/next + back + HOME | `sample` ∈ {playing, paused, ended}; one 4000 ms clock; the completion panel (FR-019) is the only endcard |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `home` after the 1200 ms lead-in | actions: unlock audio; `vo_welcome` on first Play at 1200 ms; saved shelf card `soft pulse` at 1200 ms (FR-002) |
| `title` | `HOME_PRESSED` / Escape | — | `title` | no-op (the title is home); Escape is a no-op here |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: `ring fill`; clear save + memory; `ring flash` + `sfx_soft_tap` |
| `title` | `IDLE_12S` | — | `title` | actions: FR-015 hint on Play |
| `home` | `LEAD_IN_INPUT` | during the 1200 ms lead-in | `home` | action: finish the lead-in instantly (the input is consumed and opens nothing) |
| `home` | `HOME_PRESSED` / Escape | during the 1200 ms lead-in | `title` | action: cancel the lead-in; save |
| `home` | `SHELF_TAP(s)` | outside the 500 ms shelf throttle | `grid(s)` | actions: FR-004; save `lastShelf` |
| `home` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `home` | `IDLE_12S` | — | `home` | actions: FR-015 hint |
| `grid(s)` | `ITEM_TAP(i)` | outside the 500 ms item throttle | `preview(i, playing)` | entry: sample from 0; actions: FR-005; save |
| `grid(s)` | `BACK` / Backspace | throttle clear | `home` | action: cancel voice; no save |
| `grid(s)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `grid(s)` | `IDLE_12S` | — | `grid(s)` | actions: FR-015 hint |
| `preview(i, playing)` | `SAMPLE_END` | sampleMs = 4000 | `preview(i, ended)` | actions: `check pop` 3700–4000; `sfx_chime` at 4000; Replay `replay pulse`s; completion if the 24th (FR-019) |
| `preview(i, *)` | `CARD_TAP` / `REPLAY` / R | outside the 500 ms replay throttle | `preview(i, playing)` | actions: cancel voice/audio; hide the panel; sample from 0 |
| `preview(i, *)` | `NEXT` / ArrowRight | throttle clear, not last in shelf | `preview(i+1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `PREV` / ArrowLeft | throttle clear, not first in shelf | `preview(i−1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `BACK` / Backspace | throttle clear | `grid(shelf of i)` | actions: cancel voice/sample; no save |
| `preview(i, *)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers/sample; save |
| `preview(i, playing)` | `TAB_HIDDEN` | — | `preview(i, paused)` | actions: freeze sample clock; cancel audio (FR-022) |
| `preview(i, paused)` | `TAB_VISIBLE` | — | `preview(i, paused)` | actions: Replay `replay pulse`s 3,000 ms with no voice; the sample stays paused (FR-022) |
| `preview(i, *)` | `IDLE_12S` | sample ≠ playing | `preview(i, *)` | actions: FR-015 hint on Replay |

Events not listed for a state are ignored (no state change, no sound); tab visibility outside `preview` only pauses and resumes the idle timer (FR-022).

**Tab order (per state).** `title` — reset logo → Play. `home` — HOME → shelf cards in shelf order (winter, kindness, valentine, reading, recReads, winterSports). `grid` — HOME → back → tiles in index order, row-major. `preview` — HOME → back → prev → next → Replay (the completion panel's HOME and Replay are these same two controls, redrawn on the panel). `loading` — no focusables. Keyboard: Tab/Shift+Tab move focus in that order; Enter/Space activates; Escape = HOME; Backspace = back; ArrowLeft/ArrowRight = prev/next in `preview` (no wrap; unbound elsewhere); R = Replay.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Start from the title | tap Play | Tab to Play + Enter/Space |
| Open a shelf | tap a shelf card | Tab to it + Enter/Space |
| Open an item preview | tap an item tile | Tab to it + Enter/Space |
| Replay the sample | tap the card or Replay | R, or Enter/Space on the focused Replay |
| Step items | tap Next / Previous | ArrowRight / ArrowLeft, or Enter/Space on the focused control |
| Go back one level | tap back | Backspace, or Enter/Space on the focused back |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and the completion-panel Replay ≥96×96 CSS px; the reset logo, HOME, back, prev, next, and Replay ≥64×64; shelf cards and item tiles per the section 8 table (88×88 at 320–767 up to 180×180 / 160×160 at ≥1024). All ≥44 px platform minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Tolerance and mis-taps:** 12 px expansion per FR-012; nearest center wins, then leftmost, then topmost; >12 px from everything is an empty tap (nothing changes; the idle timer resets).
- **Pointer semantics:** first pointer only; activation on release within 24 px of the down point; a >24 px move cancels that gesture; extra simultaneous pointers are ignored until release (FR-013). No drag gestures exist, so no drag alternative is offered.
- **Instructions without reading:** every state is voice + pictogram; numerals and the book titles/pages inside preview cards are content; chrome is pictogram + invisible name (FR-024).
- **Accessible names (invisible, examples):** "Play", "Reset saved progress (hold 3 seconds)", "Home", "Winter shelf, 4 items", "Kindness Month shelf, 4 items", "Valentine's shelf, 4 items", "National Reading Month shelf, 4 items", "Recommended Reads shelf, 4 books", "Winter sports shelf, 4 books", "Book: The Very First Snow", "Video: Snowfall", "Coloring: the snowman", "Back to the collection", "Back to the shelf", "Previous item", "Next item", "Replay preview", "7 of 24 items seen" (strip, non-interactive label).
- **Resize:** viewport resize or rotation reflows per section 8 and preserves shelf, item, and a running sample's clock (FR-023).

## 8. Levels and content data

**The item set — 24 items (ids 0–23), six shelves of 4.** All titles, art, voice lines, and copy below are original (D2, D3).

| Shelf | id | Shelf pictogram | Items (ids in order) |
|---|---|---|---|
| `winter` Winter | 0–3 | snowflake | 0 book, 1 book, 2 video, 3 coloring |
| `kindness` Kindness Month | 4–7 | two hands with a heart | 4 book, 5 book, 6 video, 7 coloring |
| `valentine` Valentine's | 8–11 | heart | 8 book, 9 book, 10 video, 11 coloring |
| `reading` National Reading Month | 12–15 | open book with a flag | 12 book, 13 book, 14 video, 15 coloring |
| `recReads` Recommended Reads | 16–19 | book stack with a star | 16–19 books |
| `winterSports` Winter sports | 20–23 | ice skate | 20–23 books |

| Id | Shelf | Type | Item (title / art) | Sample parameters | `vo_item_{id}` (1.0, ≤1.8 s) | Beat voice (starts ≥2000 ms) |
|---|---|---|---|---|---|---|
| 0 | winter | book | "The Very First Snow" — yard turning white, footprints | `book` | "A book: The Very First Snow." | "Snow at last!" (`vo_page_0`, ≤0.9 s) |
| 1 | winter | book | "Mittens for Two" — two knit mittens on a string | `book` | "A book: Mittens for Two." | "One for you." (`vo_page_1`) |
| 2 | winter | video | "Snowfall" — cloud, flakes, snow pile | `video` 3 beats | "A video: Snowfall." | — |
| 3 | winter | coloring | snowman outline; fills: scarf red, nose orange | `coloring` 2 fills | "Coloring page: a snowman." | — |
| 4 | kindness | book | "A Hand to Hold" — two small hands | `book` | "A book: A Hand to Hold." | "Hold my hand." (`vo_page_4`) |
| 5 | kindness | book | "The Sharing Stone" — two open hands and a stone | `book` | "A book: The Sharing Stone." | "Take a turn." (`vo_page_5`) |
| 6 | kindness | video | "Helping Hands" — three beats | `video` 3 beats | "A video: Helping Hands." | — |
| 7 | kindness | coloring | helping hands outline; fills: hands tan, heart red | `coloring` 2 fills | "Coloring page: helping hands." | — |
| 8 | valentine | book | "The Heart Card" — a card with a heart | `book` | "A book: The Heart Card." | "For you!" (`vo_page_8`) |
| 9 | valentine | book | "One Little Heart" — one heart among dots | `book` | "A book: One Little Heart." | "Find the heart." (`vo_page_9`) |
| 10 | valentine | video | "Heart Patterns" — three beats | `video` 3 beats | "A video: Heart Patterns." | — |
| 11 | valentine | coloring | heart outline; fills: heart pink, dots purple | `coloring` 2 fills | "Coloring page: a heart." | — |
| 12 | reading | book | "The Reading Fort" — pillow fort with an open book | `book` | "A book: The Reading Fort." | "Read with me." (`vo_page_12`) |
| 13 | reading | book | "Books Take You Places" — open book with a tiny boat | `book` | "A book: Books Take You Places." | "Off we go!" (`vo_page_13`) |
| 14 | reading | video | "Book Time" — three beats | `video` 3 beats | "A video: Book Time." | — |
| 15 | reading | coloring | open book outline; fills: cover teal, bookmark yellow | `coloring` 2 fills | "Coloring page: an open book." | — |
| 16 | recReads | book | "The Paper Boat" — paper boat on a puddle | `book` | "A book: The Paper Boat." | "It floats!" (`vo_page_16`) |
| 17 | recReads | book | "Ten Little Snowflakes" — ten snowflake dots | `book` | "A book: Ten Little Snowflakes." | "Count with me." (`vo_page_17`) |
| 18 | recReads | book | "The Quiet Owl" — owl on a branch | `book` | "A book: The Quiet Owl." | "Hoot!" (`vo_page_18`) |
| 19 | recReads | book | "Soup on a Cold Day" — steaming pot | `book` | "A book: Soup on a Cold Day." | "Warm and good." (`vo_page_19`) |
| 20 | winterSports | book | "Lace Up Your Skates" — skates with laces | `book` | "A book: Lace Up Your Skates." | "Ready, set." (`vo_page_20`) |
| 21 | winterSports | book | "The Sledding Hill" — sled on a hill | `book` | "A book: The Sledding Hill." | "Down we go!" (`vo_page_21`) |
| 22 | winterSports | book | "First Time on Skis" — skis in snow | `book` | "A book: First Time on Skis." | "Slow and steady." (`vo_page_22`) |
| 23 | winterSports | book | "Snowshoe Trail" — snowshoes and tracks | `book` | "A book: Snowshoe Trail." | "Follow the tracks." (`vo_page_23`) |

**Sample timeline (one accumulated 4000 ms clock; every type ends with the check pop and chime).**

| Type | 0–400 | 400–2000 | 2000–3400 | At 4000 |
|---|---|---|---|---|
| `book` | card `fade` in 200 ms; `vo_item` at 0 | cover holds; cover `soft pulse` once (400 ms) at 1200 | `flip` 2000–2500 + `sfx_page` at 2000; page `fade` 2500–2700; `vo_page` at 2500 | `check pop` 3700–4000; `sfx_chime` 0.8 |
| `video` | card `fade` in 200 ms; `vo_item` at 0 | beat 1 `pop` at 400 + `sfx_pop`; beat 2 `pop` at 1400 + `sfx_pop` | beat 3 `pop` at 2400 + `sfx_pop` | `check pop` 3700–4000; `sfx_chime` 0.8 |
| `coloring` | card `fade` in 200 ms; `vo_item` at 0 | `stroke reveal` 400–1600 + `sfx_draw` at 400; fill 1 `fade` 1600–1800; fill 2 `fade` 1800–2000 | art `soft pulse` once (400 ms) at 2600 | `check pop` 3700–4000; `sfx_chime` 0.8 |

**Layout numbers (normal; single page everywhere, nothing scrolls, 320×480 up).** Shelf cards: 3 columns × 2 rows. Item tiles: 3 columns × up to 2 rows (4 tiles = 3 + 1 centered).

| Viewport width | Shelf cards | Item tiles | Preview card (art) | Required heights home / grid / preview |
|---|---|---|---|---|
| ≥1024 px | 180×180, gap 24 | 160×160, gap 24 | 640×480 (art ≥320×320) | 560 / 512 / 608 |
| 768–1023 px | 136×136, gap 16 | 120×120, gap 16 | 480×360 (art ≥240×240) | 440 / 392 / 472 |
| 320–767 px | 88×88, gap 12 | 88×88, gap 12 | 280×200 (art ≥160×160) | 288 / 288 / 300 |

**Compact layouts** (apply when the viewport is shorter than the band's requirement for the current state): ≥1024 — shelf 120×120 gap 16, tiles 120×120 gap 16, preview card 440×330 (art ≥240×240), chrome 64 (fits 1024×480: home/grid 424, preview 458); 768–1023 — shelf 100×100 gap 12, tiles 100×100 gap 12, preview card 400×300 (art ≥200×200), chrome 64 (fits 768×480: home/grid 348, preview 412). 320–767 has **no** compact layout. Below 480 px height the field scales by 0.9 best-effort, keeping every target's minimum.

- **Field geometry.** Home: ≥1024 — 24 top; bar 96 with HOME 64 at (24,24) and the strip 24 from the right; shelf rows at y=144 and y=348; 32 bottom; total 560. 768–1023 — 16 top; bar 88 with HOME 64 at (16,16) and the strip 16 from the right; rows y=120 and y=272; 32 bottom; total 440. 320–767 — 12 top; bar 64 with HOME 64 at (12,12) and the strip 12 from the right; rows y=84 and y=184; 16 bottom; total 288. Compact ≥1024 — rows y=144 and y=280; 24 bottom; total 424. Compact 768–1023 — rows y=120 and y=232; 16 bottom; total 348. Grid: the same top bar plus the shelf pictogram 64 centered in it and back 64 top-right; ≥1024 rows y=144 and y=328, 24 bottom; 768–1023 rows y=120 and y=256, 16 bottom; 320–767 rows y=84 and y=184, 16 bottom; compact rows y=144/280 and y=120/232. Preview: ≥1024 — card 640×480 at y=24 centered, HOME and back 64 overlay the card's top corners at 24 px margins, prev/next 64 at the card's side edges vertically centered, Replay 64 centered at y=512, 32 bottom; 768–1023 — card 480×360 at y=16, overlay margins 16, prev at the card left − 76, Replay at y=384, 24 bottom; 320–767 — card 280×200 at y=12, HOME/back overlay at 12 px margins, prev, Replay, and next 64×64 in one centered bottom row at y=220 with 16 px gaps, 16 bottom; compact ≥1024 — card 440×330 at y=24, Replay at y=362, 32 bottom; compact 768–1023 — card 400×300 at y=16, Replay at y=324, 24 bottom. All rows are centered horizontally.
- **Strip:** theme pictogram 48×48 (32×32 at 768–1023 and 320–767), visited numeral 40 px (32 / 28), "/" separator 16×32 (12×24 / 10×20), total numeral "24" 40 px (32 / 28), check 32×32 in every band; the strip is non-interactive and not focusable.
- **Worked example (item 1 at 320×480):** `home` shows 6 shelf cards (2 rows of 3, 88×88, gap 12) and the strip with the visited numeral and "24". Tapping the winter card opens `grid(winter)` with "Winter." spoken and 4 tiles (row 1: items 0, 1, 2; row 2: item 3 centered). Tapping item 1 opens `preview(1, playing)`: "A book: Mittens for Two." plays at 0; the cover flips 2000–2500 with `sfx_page`; the interior page fades in 2500–2700 and "One for you." plays at 2500; the check pops 3700–4000 and `sfx_chime` rings at 4000; Replay pulses 3×. The save records `lastShelf:"winter"`, `lastItemId:1`, `visitedIds` gaining 1 once.
- **Randomization:** none. Shelf order, item order, samples, and layouts are fixed and deterministic; no seed or backfill exists.
- **Progression rule:** none. Every item is reachable at every moment; the only accumulations are `visitedIds` (drives the resume rings and the one-time completion moment) and the run's current shelf/item.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Play / Replay / HOME / back / prev / next | depress 80 ms | `sfx_tap` — 0.5 — one-shot, 0.08 s |
| Shelf opened | card depress 300 ms; 4 tiles `fade` in 200 ms | `sfx_open` — 0.6 — one-shot, 0.12 s; `vo_shelf_*` — 1.0 — one-shot, ≤1.5 s |
| Item opened | tile depress 300 ms; card `fade` in 200 ms | `vo_item_{id}` — 1.0 — one-shot, ≤1.8 s |
| Book sample | `flip` 500 ms at 2000; page `fade` 200 ms | `sfx_page` — 0.6 — one-shot, 0.15 s; `vo_page_{id}` — 1.0 — one-shot, ≤0.9 s |
| Video sample | three `pop`s at 400/1400/2400 | `sfx_pop` — 0.6 — one-shot per beat |
| Coloring sample | `stroke reveal` 400–1600; two fills `fade` | `sfx_draw` — 0.4 — one-shot, 0.2 s |
| Sample end (every type) | `check pop` 3700–4000; Replay `replay pulse`s 3× | `sfx_chime` — 0.8 — one-shot, 0.8 s |
| Completion (FR-019) | confetti ≤40 particles, 2500 ms; check becomes a 32×32 star (`star pop` 300 ms); `end panel` `fade` 250 ms | `sfx_chime` — 0.8 — one-shot; `vo_complete` — 1.0 — one-shot, ≤3.5 s |
| Idle hint (FR-015) | deterministic target `hint pulse`s 3 s | `vo_hint_*` — 1.0 — one-shot, ≤2.5 s (visual-only before the first gesture) |
| Reset hold completed | `ring fill` during hold; `ring flash` 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after the first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only; stops at Play |

**Effect definitions (no undefined effects; every effect used is listed here).** *depress* = scale 1→0.95→1 over 80 ms (tile: 300 ms). *fade* = opacity 0→1 or 1→0 over 200 ms. *grid settle* = tile fade 300 ms + translate ≤16 px, stagger 30 ms inside the 1,200 ms lead-in. *pop* = scale 0→1 over 300 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 per 500 ms cycle for 3,000 ms. *replay pulse* = 3×(1→1.15→1) over 200 ms each. *check pop* = scale 0→1.15→1 over 300 ms. *star pop* = scale 0→1.15→1 over 300 ms. *confetti* = ≤40 rect particles moving ≤120 px over 2500 ms. *ring fill* = 4 px accent stroke fills over exactly the 3 s hold; *ring flash* = opacity 1→0 over 300 ms. *accent ring* = static 3 px `#F2994A` outline. *flip* = cover rotates about its spine 0→180° over 500 ms. *stroke reveal* = SVG stroke-dashoffset over ≤1600 ms. *end panel* = centered card ≤360×280, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fade 250 ms.

**Copy (fixed, original).** `vo_welcome` = "Cozy season! Pick a shelf to look inside." (≤3.0 s). `vo_shelf_winter` = "Winter."; `vo_shelf_kindness` = "Kindness Month."; `vo_shelf_valentine` = "Valentine's."; `vo_shelf_reading` = "National Reading Month."; `vo_shelf_recReads` = "Recommended Reads."; `vo_shelf_winterSports` = "Winter sports." (each ≤1.5 s). `vo_item_{0-23}` and `vo_page_{0,1,4,5,8,9,12,13,16,17,18,19,20,21,22,23}` are in section 8. Hints: `vo_hint_title` = "Tap the button to start."; `vo_hint_home` = "Tap a shelf to look inside."; `vo_hint_grid` = "Tap a picture to see it."; `vo_hint_preview` = "Tap the card to see it again." (each ≤2.5 s). `vo_complete` = "You saw everything! What a cozy season." (≤3.5 s). No negative wording. Voice timbre, language, and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first gesture (FR-020); one voice at a time, each new voice cancels the previous utterance; sfx may overlap; `music_title` optional at 0.15 on `title` only. Degradation per FR-021; background-tab behavior per FR-022 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.seasonalCollections.winterHoliday.v1`.
- **Shape:** `{ "lastShelf": "<shelfId>"|null, "lastItemId": 0–23|null, "visitedIds": [0–23 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`; `<shelfId>` ∈ `winter`, `kindness`, `valentine`, `reading`, `recReads`, `winterSports`.
- **Save points:** shelf open (writes `lastShelf`, sets `lastItemId: null`, keeps `visitedIds`), preview entry (sets `lastItemId`, adds the item once), completion, and HOME; every save writes all four keys, refreshes `updatedAt`, and never removes a visited id.
- **Restore:** the saved shelf card wears the 3 px accent ring and `soft pulse`s once beginning when the lead-in completes (FR-002); inside that shelf the saved item tile wears the same ring when `lastItemId` is not null; nothing auto-opens; Play always starts at `title`; a run with no save shows no rings.
- **No shared kernel:** one key only; no profiles, accounts, or cross-entry storage.
- **Reset:** hold the title logo 3 s (`ring fill`) → clears the key and in-memory progress (`lastShelf`, `lastItemId`, `visitedIds`, the run's completion flag); keyboard equivalent: hold Enter/Space 3 s on the focused logo (FR-016).
- **Deliberately not stored:** sample clock or playhead, visit order, the run's live screen state, audio settings, language, tap data, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended; handled by FR-022. Storage blocked → run unsaved (FR-021).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no KA name, character, art, voice, or audio appears. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_title` | image | soft dusk-snow gradient backdrop | 1024×768 SVG | static | SVG gradient |
| `frame_home` | image | cozy snowy window ledge with string lights (warm wood, snow outside, 6 light dots) | 1280×720 SVG | static | SVG shapes |
| `scene_title_card` | image | round-themed card with a snowflake and a small window | 480×360 SVG | static | SVG shapes |
| `pict_play` / `pict_home` / `pict_back` / `pict_prev` / `pict_next` / `pict_replay` | image | triangle; house; return arrow; chevrons; circular restart arrow | 64×64 SVG each (Play and completion Replay drawn at 96×96) | static | SVG paths |
| `mark_reset` / `ring` | image | inconspicuous logo mark; 4 px accent progress ring | ≥96×96; 96×96 SVG | hold `ring fill` | SVG shapes |
| `pict_theme` / `check_strip` / `star_strip` | image | snowflake; rounded check; rosette star | 48×48 / 32×32 / 32×32 SVG | static; check `check pop`s; star replaces check when all 24 visited | SVG paths |
| `pict_muted` | image | speaker with a slash | 48×48 SVG | static; shown 5,000 ms after the first Play when speech is missing | SVG path |
| `pict_shelf_{winter,kindness,valentine,reading,recReads,winterSports}` | image | snowflake; two hands with a heart; heart; open book with a flag; book stack with a star; ice skate | 128×128 SVG each | static | SVG shapes |
| `cover_{0,1,4,5,8,9,12,13,16,17,18,19,20,21,22,23}` / `page_{…}` | image | 16 original book covers (title text is content) and 16 interior page arts per section 8 | 320×240 SVG each | static; cover `flip` 500 ms; page `fade` | SVG shapes + text |
| `vid_{2,6,10,14}` | animated | four three-beat original animated moments (no footage) per section 8 | runtime 640×480 | beats `pop` at 400/1400/2400 | runtime SVG animation |
| `line_{3,7,11,15}` | rendered | four coloring outlines as SVG paths (100×100 unit box, 8-unit round-capped stroke) with two fill regions each | runtime | `stroke reveal` 400–1600; fills `fade` | SVG paths |
| `sfx_tap` / `sfx_soft_tap` / `sfx_open` / `sfx_page` / `sfx_pop` / `sfx_draw` / `sfx_chime` | audio | UI click 0.08 s; muted tap 0.10 s; shelf latch 0.12 s; paper flip 0.15 s; pop 0.15 s; soft scribble 0.2 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips / arpeggio |
| `vo_welcome` / `vo_shelf_{6}` | audio | copy in section 9 | ≤3.0 s / ≤1.5 s each | one-shot | TTS allowed |
| `vo_item_{0-23}` / `vo_page_{0,1,4,5,8,9,12,13,16,17,18,19,20,21,22,23}` | audio | the lines in section 8 | ≤1.8 s / ≤0.9 s each | one-shot | TTS allowed |
| `vo_hint_{title,home,grid,preview}` / `vo_complete` | audio | copy in section 9 | ≤2.5 s / ≤3.5 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** backdrop `#EAF2F8`, snow `#FFFFFF`, wood `#8B5A2B`, light gold `#F2B33D`, accent `#F2994A`, ink `#3A2E24`, chrome `#FFFDF6`, evergreen `#4F7A57`, heart `#E4572E`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); numerals ≥40 px on the strip (28 px at 320–767), book titles ≥28 px on covers (content).
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → skip that clip, behavior unchanged (FR-021).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Shelf` | `id: enum {winter, kindness, valentine, reading, recReads, winterSports}`; `name: string`; `pict: string`; `count: 4`; `items: int[]` (item ids in order) |
| `Item` | `id: int 0–23`; `shelf: ShelfId`; `kind: enum {book, video, coloring}`; `artKey: string`; `voiceKey/voiceCopy: string`; `data: Book \| Video \| Coloring` |
| `Book` | `title: string` (content); `coverKey: string`; `pageKey: string`; `pageLineKey/voiceCopy: string` |
| `Video` | `beats: string[]` (3 art keys); `beatSfx: "sfx_pop"` |
| `Coloring` | `outlinePath: string`; `fills: { regionId: string; color: "#RRGGBB" }[]` (exactly 2) |
| `Save` (persisted) | `lastShelf: ShelfId \| null`; `lastItemId: int 0–23 \| null`; `visitedIds: int[]`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, home, grid, preview}`; `shelf: ShelfId`; `itemId: int`; `sample: enum {playing, paused, ended}`; `sampleMs: int 0–4000`; `completionFired: bool`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Shelf`, `Item`, and the kind data records are static; the sample timeline is computed from `sampleMs` and never from wall-clock time. Judgment, scoring, and unlocks do not exist.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, pictograms, per-tile hit rects, large numerals, and short text runs as content.
- **R-002** The player shall animate the section 9 effects: depress, fade, grid settle, pop, soft pulse, hint pulse, replay pulse, check pop, star pop, confetti, ring fill/flash, flip, stroke reveal, end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input with the FR-012/FR-013 hit rules; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all controls, with the section 6 tab order, Escape = HOME, Backspace = back, ArrowLeft/Right = prev/next, R = Replay.
- **R-005** The player shall play concurrent one-shot sfx and at most one voice at a time (voice 1.0, optional music loop ≤0.15), cancelling the previous utterance when a new voice starts.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall voice clips via recorded audio or speech synthesis with the FR-021 no-speech fallback, and shall continue with visual-only feedback when any voice or audio asset fails.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage (section 10), tolerate blocked storage (FR-021), and make no network requests after initial load (FR-025).
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during samples, confetti, and the lead-in.
- **R-010** The player shall scale from 320×480 to 1366×768 without losing state, shelf, item, or a running sample's clock (FR-023).
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-024).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: freeze the sample on hide (FR-022), lose no progress, and allow hints to fire late.
- **R-013** Each preview sample shall be renderable at runtime from its `Item` record and the section 8 timeline; no per-item code is required.
- **R-014** The player shall request no camera, microphone, or network access at runtime, and shall keep every state free of scrolling at 320×480 and above by applying the section 8 compact rule (FR-023, FR-025).

## 14. Acceptance criteria

| AC | Covers | Given | When | Then |
|---|---|---|---|---|
| AC-01 | FR-001 | a first load | assets finish | `title` shows Play (≥96 px) and the reset logo (≥64 px, 24 px margin), and no audio has played |
| AC-02 | FR-002 | `title`, no save | Play is pressed | the 1200 ms lead-in runs with the six shelf cards settling (30 ms stagger), `vo_welcome` plays at 1200 ms, and `home` appears; with a save, the saved shelf card soft-pulses once (400 ms) at 1200 ms |
| AC-03 | FR-003 | `home` | it is inspected | six shelf cards (3×2) show their pictograms and "4" numerals, the strip shows the visited numeral, "/", "24", and a 32×32 check, and every shelf opens |
| AC-04 | FR-004 | `home` | the Winter card is tapped, then tapped again within 500 ms | exactly one open occurs, "Winter." plays once, `sfx_open` plays, and `grid(winter)` shows 4 tiles (3 + 1) with no paging or chevrons |
| AC-05 | FR-005 | `grid(winter)` | item 1 is tapped | `preview(1, playing)` opens, "A book: Mittens for Two." plays, the sample starts at 0, and the save records `lastItemId:1` and adds 1 to `visitedIds` once |
| AC-06 | FR-006 | `preview` item 1 | the sample runs | the cover flips at 2000–2500 with `sfx_page`, the page fades in 2500–2700, "One for you." starts at 2500 (≥2000), the check pops 3700–4000, and `sfx_chime` plays at 4000 |
| AC-07 | FR-006 | `preview` item 2 and item 3 | each sample runs | item 2 pops three beats at 400/1400/2400 with `sfx_pop` each; item 3 draws its outline 400–1600 with `sfx_draw` then fades two fills at 1600–1800 and 1800–2000 |
| AC-08 | FR-007 | a sample that has ended | the card is inspected | it holds its final frame and Replay pulses 3×(1→1.15→1) over 200 ms each, with nothing auto-advancing |
| AC-09 | FR-008 | a sample that has ended | the card is tapped twice within 500 ms | exactly one replay starts from 0 with its `vo_item` line, and the check/chime sequence plays again |
| AC-10 | FR-009 | `preview` item 1 of `winter` | Next is tapped (twice within 300 ms) | exactly one step to item 2 with its line and sample; at item 3 Next does nothing and plays no sound; at item 0 Prev does nothing |
| AC-11 | FR-010 | a preview opened from `grid(reading)` | back is tapped | `grid(reading)` returns with the item's ring; back again returns to `home` |
| AC-12 | FR-011 | `home`, `grid`, or `preview` | HOME is pressed | `title` appears and the save was written; on `title`, Escape changes nothing |
| AC-13 | FR-012 | any state | a tap >12 px from every target is made | nothing changes on screen or in audio and the idle timer resets |
| AC-14 | FR-013 | `home` | two fingers land on two shelf cards, and separately one pointer drags >24 px before release | only the first pointer's shelf opens; the second shows no feedback until release; the drag opens nothing |
| AC-15 | FR-014 | any state | a control is double-tapped | exactly one judged event occurs (one shelf open, preview, replay, step, or HOME) |
| AC-16 | FR-015 | `home`, `grid`, and `preview`, with a gesture already made | 12 s pass with no input in each | the deterministic target pulses 3 s and the matching `vo_hint_*` plays; on `title` before any gesture it is visual-only; any tap resets |
| AC-17 | FR-016 | `title` | the logo is held 3 s | the ring fills visibly during the hold, the save clears, the ring flashes with `sfx_soft_tap`, and after reload no rings appear; the focused-logo keyboard hold behaves the same |
| AC-18 | FR-017 | any state | random taps, empty taps, idle time, and back-and-forth navigation occur | nothing is lost or locked, no score appears, and every item stays openable |
| AC-19 | FR-018 | item 1 previewed, then HOME, reload, Play | `home` appears | the winter card wears its accent ring and soft-pulses once (400 ms); inside it item 1 wears the ring; shelf-open saves preserve the visited list |
| AC-20 | FR-019 | 23 items visited | the 24th distinct item's sample ends | confetti (≤40, 2500 ms), `sfx_chime`, and "You saw everything! What a cozy season." play; the end panel appears with Replay (≥96 px) and HOME; the strip check becomes a 32×32 star, the star also shows after reload while the save lists 24 ids, and a replay afterwards fires no second confetti |
| AC-21 | FR-020 | a fresh load | Play and then a shelf are pressed while the welcome line is still speaking | no audio played before the first gesture, and the welcome line stops when "Winter." begins (one voice at a time) |
| AC-22 | FR-021 | no speech synthesis / no AudioContext / storage blocked | the player is browsed in each case | visual-only with the muted pictogram for 5 s / silent / fully usable unsaved, and the reset ring still shows |
| AC-23 | FR-022 | a sample playing | the tab is hidden and then shown | the card is held mid-sample, Replay pulses 3,000 ms (600 ms repeat, no voice), and a replay restarts from 0 with no progress lost |
| AC-24 | FR-023 | `preview` at 1024×768 | the viewport is resized to 320×480 | the shelf and item are preserved, the card reflows to 280×200 with a 64 px bottom control row, nothing scrolls, and targets stay ≥64 px |
| AC-25 | FR-023 | `home` and `preview` at 1024×480 (height below the band requirement) | the states are shown | the ≥1024 compact layout applies: home fits 424 px, preview fits 458 px, shelf cards are 120×120, the card is 440×330, and chrome is 64 px |
| AC-26 | FR-024 | any state | the screen is reviewed with assistive technology and scanned for visible text | every interactive element announces an invisible name; visible text is only numerals and book titles/page art; the catalogued title and any Khan Academy name appear nowhere |
| AC-27 | FR-025 | after load | the player is browsed and the network panel/camera/microphone are watched | no network request, permission prompt, or download state occurs, and every item opens |
| AC-28 | FR-026 | any state | the `A` key is pressed or an unknown event fires | nothing changes on screen or in audio and play continues normally |
| AC-29 | R-004; section 6 tab order; FR-011 | any state | Tab is pressed repeatedly, then Enter/Space, R, arrows, Backspace, Escape are used | focus follows the section 6 order, each control activates, prev/next step without wrapping, back goes up one level, and Escape returns HOME |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The lead-in, six shelves, and all 24 item cards exist with the section 8 samples, and every screen fits without scrolling at 320×480, 1024×480 (compact layout), and 1024×768.
3. Browsing, replay, stepping, back, HOME, the resume rings, and the reset hold behave as specified.
4. The save survives a reload; the completion moment fires once at 24 distinct visits and the star persists.
5. No-speech, no-AudioContext, and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 24 items across the documented types (16 books, 4 videos, 4 coloring pages) is a designed instantiation; official sources publish no counts | designed (D2, O6) |
| A2 | All 24 item titles, the `vo_page` lines, art, and samples are original; the seasonal themes (winter, kindness, Valentine's, reading month, winter sports) are generic and used without KA characters, art, voice, or audio | designed (D3, IP rule) |
| A3 | The four documented collections are time-limited in reality; this player models no calendar, availability, lock, or countdown state, so every item is always openable and the time-limited fact lives only in section 3 and here | designed (D4) |
| A4 | Presenting four collections as six shelves (the two book shelves split out per O3) is a designed grouping of a grouped entry | designed (D1) |
| A5 | Age band 2–8 with a 2–5 pre-reader focus is a targeting choice inside the app's official 2–8 range | designed (O7) |
| A6 | Browsers block autoplay until the first gesture; background-tab timers may be throttled and speech suspended | platform facts; handled by FR-020/FR-022 |
| A7 | Preview samples are original 4000 ms moments with no game logic, right/wrong, or scoring; they are never another entry's activity | designed (D5, FR-006) |
| A8 | No drag gestures exist in this player; taps and keyboard only | designed (FR-013) |
| A9 | 320×480 is supported (below the family's 768-wide baseline); the section 8 numbers were chosen to fit it without scrolling | designed (FR-023) |
| A10 | Recorded or TTS-synthesized voices are both acceptable; the copy is fixed in section 9 | designed |
| A11 | Visit order, per-item timings, and the current run's shelf/item are never persisted; only `lastShelf`, `lastItemId`, `visitedIds`, and `updatedAt` are | designed (section 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the six shelves and their order; the 24 items, ids, types, and per-shelf order (2+2+2+2+4+4 books, 1 video and 1 coloring on each of the first four shelves); item titles, sample timelines, and voice copy; grid and layout numbers; hit tolerance, pointer, throttle, and step rules; chrome set and keyboard map; target minimums; the save key and shape; no network, no fail state, no scoring; asset provenance; acceptance criteria.
- **Free:** exact composition within the section 8 guidance, easing curves, the exact look of the window ledge, string lights, and shelf pictograms within the palette, particle look, voice timbre/TTS engine, optional title music, tile corner radius.
- **Not in this spec:** the app shell or Library navigation, profiles, parental controls, season scheduling, availability windows, or download mechanics, the real app's collections or books (no re-implementation), localization, analytics, teacher tooling, or any Khan Academy name, character, art, voice, or audio.
