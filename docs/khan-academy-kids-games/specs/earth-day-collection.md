# Earth Day collection

## 1. Front matter

- **Title:** Earth Day collection (catalog name, kept for traceability only; it appears nowhere on screen or in audio)
- **Entry type:** Interactive player — seasonal collection browser (themed videos, coloring pages, and books). No levels, no score, no fail state, no terminal state.
- **Catalogued entry:** [`earth-day-collection.md`](../earth-day-collection.md) — seasonal / limited-time collections
- **Official source:** [App Store listing — version history](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); repo wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 255–256
- **Spec status:** v1 — first Earth Day spec; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-023); no network after load
- **IP constraint:** all content is original. No Khan Academy character, name, art, voice, audio, or footage is reproduced, and the string "Khan" appears nowhere on screen, in audio, or in an accessible name. "Earth Day" is a generic public theme and may be used on screen and in voice lines (A2). Programmatic SVG / WebAudio / speechSynthesis stubs are acceptable (section 11); no real footage or recording is needed.
- **Interactive-player substitutions (declared):** the entry's collection is realized as this player's own surface — a 1200 ms themed reveal replaces an app transition; three theme **stations** replace levels; **shelf grids and 4000 ms item previews** replace rounds; the completion moment replaces a win condition; there is no fail state and no terminal state (HOME always returns to `title`). The officially documented **printable** coloring pages are represented **on screen only**: the player triggers no print dialog, download, file save, or share sheet (designed, A4).
- **Conditional sections:** all 16 included; section 8 carries shelves, items, and preview timelines instead of levels.

## 2. Overview and learning objective

A child presses Play and the meadow wakes up: a rounded globe rises over the pond and three stations settle in — a screen for videos, an easel for coloring pages, and a bookshelf for books — while a warm voice welcomes them. Tapping a station lays out its four item tiles; tapping a tile plays that item's 4000 ms original moment: a three-beat animated video moment (a seed, rain, a sprout), a coloring page whose outline draws itself and whose two colors sweep in, or a book cover that flips open to one interior page and one spoken line. A strip counts how many of the 12 items have been seen; when the last one is seen, confetti falls and the check becomes a star. The skill is **independent choice-making plus one-hop exposure to the collection's three documented content types**, with early nature vocabulary (seed, pond, tree, recycling) carried by voice and pictures. Age band: **2–8 across the library** (A10); this entry targets the **2–5 pre-reader** first, with 6–8 early readers able to read the four book-cover titles as content. Expected session: **1–3 minutes** (three to six previews); a full browse of all 12 items spans one to three sessions.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | The app had a limited-time Earth Day collection: themed videos, printable coloring pages, and a themed book collection | official | Catalogued entry description; catalog lines 255–256; App Store version history |
| O2 | Seasonal collections are time-limited and may not be available outside their season | official | Catalogued entry Notes; catalog line 256 |
| O3 | Official sources publish no individual item titles, counts, art, audio, mechanics, or dates for the collection; its contents are documented by type only | official (about the source's limits) | Catalogued entry Notes; absence verified across the cited source |
| D1 | The catalogued title is traceability only; no Khan Academy character, name, art, voice, or audio appears; all 12 items, titles, art, and voice copy are original; "Earth Day" is used as a generic theme | designed | IP rule (section 1, A2) |
| D2 | Exactly **12 items**: 4 videos + 4 coloring pages + 4 books, four per shelf | designed | Makes the three documented types concrete; per-type counts unpublished (O3) |
| D3 | The three shelves are the three documented types, in the order videos → coloring pages → books; each shelf shows its 4 items in one 3×2 grid | designed | O1's types are the categories; shelf order follows the official wording; 4 items per shelf keeps every grid single-page (3–6-item family rule) |
| D4 | Per-item previews: one automatic, non-interactive 4000 ms moment per type — a three-beat video moment, a self-drawing coloring page with two crayon fills, a book cover flip with one interior page and one line | designed | Shared family preview rule; previews are not the collection's real media and contain no game logic, right/wrong, or scoring (O3, A3) |
| D5 | Printable handling: the coloring pages are represented on screen only; the player triggers no print dialog, download, file save, or share sheet; printing is out of scope | designed | A browser player with no network and no file affordances cannot honestly model a print flow; the page content still appears (A4, FR-027) |
| D6 | No calendar, availability, lock, or countdown state: every item is always openable, and the time-limited fact lives only in O2 and the assumptions | designed | Shared family rule; nothing in the player can depend on a real-world season |
| D7 | The home frame (meadow + pond + rounded globe), the three station cards, the collection strip (globe pictogram, visited numeral, total numeral 12, check → star), the title backdrop, and the 1200 ms themed reveal | designed | The minimal themed surface the collection promises; frame is decorative (section 6) |
| D8 | Chrome (Play, reset logo, HOME, back, prev/next, Replay, completion panel), save/resume rings, idle hints, reset hold, audio rules, degradation, layouts, accessible names, no fail state | designed | Template v1 and the seasonal-collections shared brief's family conventions |

## 4. Player experience / core loop

A child presses Play. Over 1200 ms the meadow fades in and three station cards settle: the video screen, the coloring easel, the little bookshelf, each with a "4". "Welcome! Pick a station and see what's growing." The child taps the easel: four tiles fade in, "Coloring pages." They tap *The Pond*: "Coloring: The Pond." The card fades in, the pond outline draws itself over 1600 ms with a soft scribble, the water sweeps blue at 2100 ms and the lily pad sweeps green at 2600 ms, the finished page soft-pulses, a check pops at 3700 ms and a chime rings at 4000 ms. The child taps Replay — the little page draws itself again. They step to the next item, go back, and later press HOME; the collection strip now reads "1" of "12". On the next visit the saved station wears an accent ring and soft-pulses once, and inside it the last-seen tile wears the same ring. When the twelfth item is seen, confetti falls, the check becomes a star, and a panel offers Play again or HOME.

**Core loop:** Play → the meadow reveal → tap a station → tap an item tile → watch or replay its 4000 ms moment → step between items or go back → keep browsing until the strip's check becomes a star.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading` (prepare the section 11 assets; audio locked; no focusables), then `title`: the themed backdrop and card (meadow, pond, rounded globe), one Play target ≥96×96 CSS px, and a reset logo ≥64×64 CSS px at a 24 px top-left margin (FR-019). No audio shall play before the first pointer or key input (FR-022). The catalogued title, the string "Khan", and every Khan Academy character, name, art, voice, and audio shall appear nowhere on screen or in audio (FR-026). |
| FR-002 | When Play is pressed, the player shall unlock audio and run the **1200 ms** themed reveal: the frame fades in over 200 ms and the three station cards settle in shelf order (fade 300 ms each, translate ≤16 px, staggered 30 ms). Any pointer or key input during the 1200 ms shall finish the reveal instantly (the input is consumed — it opens nothing), and HOME/Escape shall cancel to `title`. On completion the player shall enter `home`; on the **first Play of the load** it shall speak `vo_welcome` (1.0, one-shot, ≤3.0 s) at 1200 ms. When a save exists, the saved station card shall wear the accent ring from `home` entry and soft-pulse once (1→1.04→1 over 400 ms) beginning when the reveal completes (1200 ms). Every later Play of the load runs the same 1200 ms reveal without the welcome. |
| FR-003 | `home` shall show the theme frame (meadow, pond, rounded globe; decorative — never a target except its cards and controls), the three station cards in fixed order (videos, coloring pages, books) at the section 8 sizes with the station pictogram and a count numeral 4, the collection strip (globe pictogram, visited numeral, total numeral 12, check; sizes in section 8), and HOME ≥64×64 at a 24 px top-left margin. Every item shall always be openable: no calendar, availability, lock, countdown, download, or print state exists, and the player shall make no network request, trigger no print dialog or download, and request no camera or microphone permission at any time after load (FR-027). |
| FR-004 | When a station card is tapped, the player shall open `grid(shelf)`, play a 300 ms card depress, play `sfx_open` (0.6, one-shot, 0.12 s), speak `vo_shelf_{shelf}` (1.0, one-shot, ≤1.5 s), and save (`lastShelf` written, `lastItemId: null`, `visitedIds` kept; FR-020). Station taps share one 500 ms throttle: a second tap inside 500 ms shall not open a second shelf. |
| FR-005 | `grid(shelf)` shall show the shelf's four item tiles in one 3×2 grid (section 8 sizes: row 1 holds the first three tiles row-major, row 2 holds the fourth centered), the shelf pictogram 64×64 (48×48 at 320–767) 24 px right of HOME, a back control ≥64×64 at the top-right 24 px margin, and HOME ≥64×64. Tiles shall fade in together over 200 ms on entry. Because shelves hold 3–6 items, there is exactly one page: no paging, dots, or chevrons exist. When `lastItemId` is an item of this shelf, that tile shall wear the accent ring (3 px `#F2994A` outline). |
| FR-006 | When an item tile is tapped, the player shall open `preview(item, playing)`, play a 300 ms tile depress, speak `vo_item_{id}` (1.0, one-shot, ≤1.8 s), start the sample clock at 0 (FR-007), and save (`lastItemId` set; the id joins `visitedIds` once; FR-020). Item taps share one 500 ms throttle. |
| FR-007 | Each preview shall run exactly one accumulated **4000 ms** sample clock (advanced per frame only while `sample = playing` and the tab is visible; never wall-clock), on this common skeleton: **0–400** the card fades in (200 ms) and the art's first frame appears; **400–3400** the type's main beat (FR-008–FR-010); **3400–3700** hold; **3700–4000** the check pops (0→1.15→1 over 300 ms); at **4000** `sfx_chime` (0.8, one-shot, 0.8 s) plays and the player enters `preview(item, ended)`, where the card holds and Replay pulses 3×(1→1.15→1) over 200 ms each. Any beat voice starts ≥2000 ms and never gates the clock: a late, missing, or cancelled clip never shifts a beat, the check, or the chime. Samples are automatic and non-interactive: no input affects them, and there is no right/wrong, scoring, comparison, or round logic; each preview is one demo beat and is never another spec's game or activity. |
| FR-008 | A `video` item's beat shall be its three original animated beats, with no footage: beat 1 fades in at 400 and soft-pulses at 700; beat 2 slides in (40 px→0, 200 ms) at 1400 and soft-pulses at 1700; beat 3 pops (0→1, 300 ms) at 2400 with a sparkle (≤6 particles, ≤40 px, 600 ms) and `sfx_pop` (0.6, one-shot); the item's `vo_beat_{id}` line (1.0, one-shot, ≤1.2 s) starts at 2400. |
| FR-009 | A `coloring` item's beat shall self-draw the page outline with a stroke reveal from 400 to 2000 (≤1600 ms; `sfx_draw` 0.4, one-shot, 0.2 s at 400), then sweep in two crayon fills: fill 1 at 2100 and fill 2 at 2600, each a color region fading 0→1 over 200 ms while its leading edge slides 40 px→0 over 200 ms, each with `sfx_pop` (0.6, one-shot); the finished page soft-pulses (400 ms) at 3000. Coloring previews have no beat voice. The page is represented on screen only: no print dialog, download, or file save is triggered (D5). |
| FR-010 | A `book` item's beat shall hold the cover from 400 to 2000, play `sfx_page` (0.6, one-shot, 0.15 s) and flip the cover about its spine 0→180° over 500 ms at 2000–2500, fade in one interior page at 2500 (200 ms) and hold it to 3400; the item's `vo_beat_{id}` line (1.0, one-shot, ≤1.2 s) starts at 2500. The cover carries the book's original title as visible content; the interior page is art only. |
| FR-011 | When the card or Replay is tapped (including mid-sample), the player shall cancel the current voice and sample audio and restart the sample and its `vo_item` line from 0. Replay is throttled to one restart per 500 ms; a double-tap inside 500 ms restarts once. The card tap and the Replay control share that throttle. |
| FR-012 | When Next or Previous (each ≥64×64) is tapped, the player shall step to the next/previous item of the same shelf in index order (no wrap: at the last item Next is a no-op and at the first item Previous is a no-op, with no visual or audio change): it shall cancel voice and sample audio, open `preview(item±1, playing)`, speak that `vo_item`, start from 0, and save. Prev and Next share one 300 ms throttle (back and HOME each keep their own). |
| FR-013 | When back is tapped, the player shall cancel voice and sample audio and go up one level: from `preview` to `grid(shelf)` (the preview entry's save already lists the item, so its tile then wears the accent ring), and from `grid` to `home`. Back is throttled to one return per 300 ms. |
| FR-014 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `home`, `grid`, `preview`, and the completion panel; pressing it shall cancel any voice, the sample clock, and the idle timer, save, and return to `title`. On `title` (the player's home) no HOME control is rendered and a HOME input (Escape) is a no-op; `loading` renders no controls. HOME is throttled to one press per 300 ms. |
| FR-015 | Hit-testing shall expand every control's rectangle by 12 px on all sides. A tap inside more than one expanded rectangle shall resolve to the nearest control center, then the leftmost, then the topmost. A tap more than 12 px from every control is an empty tap — no state change, no sound — and resets the idle timer. A tap that starts inside a control never falls through to the stage beneath it. |
| FR-016 | The player shall track only the first pointer: pointer-down inside a 12 px-expanded control acquires it; pointer-up within 24 px of the down point activates it; a pointer that moves more than 24 px before release cancels that gesture with no state change and no sound (the idle timer still resets); additional simultaneous pointers are ignored until all pointers are released. On a same-millisecond tie between two pointers the leftmost wins. No drag gestures exist, so no drag alternative is required. |
| FR-017 | Rapid or repeated taps shall never double-apply: shelf, item, and Replay taps share their 500 ms throttles (FR-004/006/011) and back, prev, next, and HOME are throttled at 300 ms (prev/next share one; back and HOME each have their own; FR-012–014); taps inside a throttle keep their visual depress but produce exactly one judged event. A double-tap yields one shelf open, one preview, one step, one replay, or one HOME. |
| FR-018 | When no pointer or key input has occurred for 12,000 ms, the player shall hint-pulse the deterministic target for 3,000 ms and speak the state's hint line (1.0, one-shot, ≤2.5 s; visual-only before the first gesture), repeating every 12,000 ms of continued idleness: `title` → Play (`vo_hint_title`); `home` → the leftmost station with an unvisited item, else the leftmost station (`vo_hint_home`); `grid` → the first unvisited tile in index order, else the leftmost tile (`vo_hint_grid`); `preview` → Replay, or the panel Replay while the completion panel shows (`vo_hint_preview`). Any input, including an empty tap, resets the timer. No hint fires while a sample plays (the moving sample is its own cue). |
| FR-019 | When the title logo is held for 3,000 ms, the player shall fill a visible 4 px accent progress ring for the hold duration; releasing early resets the ring to 0 with no action; on completion it shall clear the storage key and in-memory progress, then play a ring flash (300 ms) plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3,000 ms on the keyboard-focused logo is the equivalent; a hidden tab cancels the hold. |
| FR-020 | The player shall persist one small JSON object in browser local storage under `spec.seasonalCollections.earthDay.v1`: `{ "lastShelf": "videos"\|"coloring"\|"books" \| null, "lastItemId": 0-11 \| null, "visitedIds": [0-11 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`. Save points: shelf open (writes `lastShelf`, `lastItemId: null`, keeps `visitedIds`), preview entry (sets `lastItemId`, adds the item to `visitedIds` once), completion (FR-021), and HOME; every save writes all four keys and refreshes `updatedAt`, and no save ever removes a visited id. Restore: on `home` the saved station card wears the accent ring and soft-pulses once beginning when the reveal completes (FR-002); inside that shelf's `grid` the saved item tile wears the same ring when `lastItemId` is not null; nothing auto-opens; Play always starts at `title`. Storage blocked → the run is unsaved (FR-023). |
| FR-021 | When the preview entry that makes `visitedIds.length` reach 12 reaches its sample end (4000 ms), the player shall play the completion moment at that moment: confetti (≤40 rect particles moving ≤120 px over 2500 ms), `sfx_chime` (0.8, one-shot), and `vo_complete` (1.0, one-shot, ≤3.5 s); the strip's check shall become a 32×32 star (star pop 0→1.15→1 over 300 ms) and stays while the save lists all 12 ids. After the 2500 ms confetti, at 6500 ms from sample start, the completion panel (end panel ≤360×280 — at 320–767 width `min(360, viewport width − 32)` × 280 — fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fade 250 ms) shall fade in over the card with a Replay ≥96×96 and a HOME ≥64×64; the chrome Replay hides while the panel shows. A panel Replay or a card tap shall hide the panel (fade 200 ms) and restart the sample from 0 (FR-011); the moment fires once per run and re-fires never, and nothing unlocks, closes, or locks. When the save already lists all 12 ids, the strip shows the star without the moment. |
| FR-022 | Audio: no audio shall play before the first pointer or key input of a run (FR-001); that input unlocks audio. Exactly one voice clip at a time — any new voice (welcome, shelf, item, beat, hint, complete) cancels the previous utterance immediately; sfx may overlap each other and the voice. `music_title` may loop at 0.15 on `title` only and shall stop at Play. Every cue's volume and behavior is stated in section 9. |
| FR-023 | Degradation: no speech synthesis → all voice silent, samples and pulses run unchanged, every state stays navigable by pictogram + numeral, and a muted-speaker pictogram (48×48) shows for 5,000 ms after the first Play; no AudioContext → all audio silent, behavior otherwise identical; storage blocked → the run is unsaved (the visited set works in memory and the reset ring still shows); a missing visual asset draws a stub shape; a missing audio clip is skipped. |
| FR-024 | When the tab becomes hidden while a sample is playing, the player shall freeze the sample clock (frame held) and cancel pending audio; on return the sample stays paused and the Replay control plays the replay attention pulse (replay pulse repeating every 600 ms for 3,000 ms, no voice) until a replay restarts the sample from 0 (FR-011). Hidden time pauses the idle timer; idle time counts visible time only; throttled timers may delay the lead-in or hints but never lose progress (A7). |
| FR-025 | Resize or rotation shall reflow per section 8 and preserve the state, shelf, item, and a running sample's clock (no restart). Each state uses the normal layout while the viewport is at least as tall as that state's normal requirement (section 8: 560 home / 512 grid / 608 preview at ≥1024 px wide; 440/392/472 at 768–1023; 288/288/300 at 320–767) and otherwise its band's compact layout where one exists (≥1024: 424 home/grid, 458 preview; 768–1023: 348/348/412); 320–767 has no compact layout. Below 480 px height the field scales by 0.9 best-effort, keeping every target's minimum. Nothing scrolls from 320×480 up. |
| FR-026 | No reading shall be required: visible text is content only — the count numerals (station badges and strip) and the four book-cover titles. Every instruction and feedback reaches non-readers by voice + pictogram. Every interactive element carries an invisible accessible name (section 7); the catalogued title and the string "Khan" appear nowhere on screen, in audio, or in an accessible name. |
| FR-027 | The player shall run fully offline and shall have no fail state: no network request, connectivity check, download, print dialog, file save, or permission prompt at any time after load; no wrong answer, score, streak, timer, lock, deduction, or comparison exists; empty taps, rapid taps, multi-touch, back, and idle never remove a visited id, and every item stays openable. |
| FR-028 | Shelf order, item order, samples, and layouts are fixed and deterministic; there is no randomization, unlock, adaptive difficulty, calendar, or countdown. Unknown events, unbound keys, and unknown gestures shall be ignored (no state change, no sound). |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | soft themed backdrop | initial; prepare assets; audio locked; no interactive elements |
| `title` | themed backdrop + card + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `home(reveal\|idle)` | meadow frame + 3 station cards + collection strip + HOME | `reveal` lasts 1200 ms; the collection hub |
| `grid(shelf)` | one shelf's 4 tiles (3+1) + shelf pictogram + back + HOME | shelf ∈ {videos, coloring, books}; single page |
| `preview(item, sample)` | preview card + Replay + prev/next + back + HOME; panel after completion | `sample` ∈ {playing, paused, ended}; one 4000 ms clock; the completion panel is the only endcard |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `home(reveal)` → `home(idle)` | actions: unlock audio; 1200 ms reveal; `vo_welcome` on the first Play; saved station soft-pulses at 1200 ms (FR-002) |
| `title` | `HOME_PRESSED` / Escape | — | `title` | no-op (the title is home) |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `home` | `STATION_TAP(s)` | outside the 500 ms throttle | `grid(s)` | actions: FR-004; save `lastShelf`, `lastItemId: null` |
| `home` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `grid(s)` | `ITEM_TAP(i)` | outside the 500 ms throttle | `preview(i, playing)` | entry: sample from 0; actions: FR-006; save |
| `grid(s)` | `BACK` / Backspace | outside the 300 ms back throttle | `home` | action: cancel voice; no save |
| `grid(s)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `preview(i, playing)` | `SAMPLE_END` | sampleMs = 4000 | `preview(i, ended)` | actions: check pop 3700–4000 + `sfx_chime`; Replay pulses 3×; completion if 12th (FR-021) |
| `preview(i, ended)` | `PANEL_SHOWN` | completion armed | `preview(i, ended)` | actions: panel fades in at 6500 ms; star pop |
| `preview(i, *)` | `CARD_TAP` / `REPLAY` / R | outside the 500 ms throttle | `preview(i, playing)` | actions: cancel voice/audio; hide panel; sample from 0 |
| `preview(i, *)` | `NEXT` / ArrowRight | outside the 300 ms prev/next throttle, not the last item | `preview(i+1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `PREV` / ArrowLeft | outside the 300 ms prev/next throttle, not the first item | `preview(i−1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `BACK` / Backspace | outside the 300 ms back throttle | `grid(shelf)` | actions: cancel voice/sample; no save |
| `preview(i, *)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers/sample; save |
| `preview(i, playing)` | `TAB_HIDDEN` | — | `preview(i, paused)` | actions: freeze sample clock; cancel audio (FR-024) |
| `preview(i, paused)` | `TAB_VISIBLE` | — | `preview(i, paused)` | actions: replay attention pulse (3,000 ms) with no voice; sample stays paused (FR-024) |
| any except `loading`, `title` | `IDLE_12S` | sample ≠ playing | same state | actions: FR-018 hint (visual-only before the first gesture) |

Events not listed for a state are ignored (no state change, no sound); tab visibility outside `preview` only pauses and resumes the idle timer (FR-024). The theme frame is decorative and never a target except the tiles and controls it hosts.

**Tab order (per state).** `title` — reset logo → Play. `home` — HOME → station cards in shelf order (videos, coloring pages, books). `grid` — HOME → back → tiles in index order, row-major (first three, then the fourth). `preview` — HOME → back → prev → next → Replay; while the completion panel shows, the chrome Replay is hidden and the order ends with panel Replay → panel HOME. `loading` — no focusables. Keyboard: Tab/Shift+Tab move focus in that order; Enter/Space activates; Escape = HOME; Backspace = back; ArrowLeft/ArrowRight = prev/next in `preview` (no wrap; unbound elsewhere); R = Replay.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Start the collection | tap Play | Tab to Play + Enter/Space |
| Open a station | tap a station card | Tab to it + Enter/Space |
| Open a preview | tap an item tile | Tab to it + Enter/Space |
| Replay the sample | tap the card or Replay | R, or Enter/Space on the focused Replay |
| Step items | tap Next / Previous | ArrowRight / ArrowLeft, or Enter/Space on the focused control |
| Go back one level | tap back | Backspace, or Enter/Space on the focused back |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play ≥96×96 CSS px; reset logo ≥64×64; HOME, back, prev, next, Replay ≥64×64; station cards 180×180 / 136×136 / 88×88 per section 8; item tiles 160×160 / 120×120 / 88×88; panel Replay ≥96×96; panel HOME ≥64×64. All above the 44 px platform minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Tolerance and mis-taps:** 12 px expansion per FR-015; nearest center wins, then leftmost, then topmost; >12 px from everything is an empty tap (nothing changes; the idle timer resets).
- **Pointer semantics:** first pointer only; activation on release within 24 px of the down point; a >24 px move cancels that gesture (no state change, no sound); extra simultaneous pointers are ignored until release (FR-016). No drag gestures exist, so no drag alternative is offered.
- **Throttles:** station, item, and Replay taps 500 ms; back, prev, next, HOME 300 ms; a double-tap yields exactly one judged event (FR-017).
- **Instructions without reading:** every state is voice + pictogram; numerals and book-cover titles are content; chrome is pictogram + invisible name (FR-026).
- **Accessible names (invisible, examples):** "Play", "Reset saved progress (hold 3 seconds)", "Home", "Videos station, 4 items", "Coloring pages station, 4 items", "Books station, 4 items", "Back to the collection", "Video: The Little Pond", "Coloring page: The Big Tree", "Book: The River Runs", "Previous item", "Next item", "Replay preview", "Play again" (panel Replay), "5 of 12 items seen" (strip, non-interactive label).
- **Resize:** viewport resize or rotation reflows per section 8 and preserves the state, shelf, item, and a running sample's clock (FR-025).

## 8. Levels and content data

**The item set — 12 items (ids 0–11), three stations.** All titles, copies, and art below are original (D1, D2).

| Station (shelf id) | Pictogram | Items | Count | Entry voice (`vo_shelf_*`) |
|---|---|---|---|---|
| Videos (`videos`) | rounded screen with a play triangle | ids 0–3 | 4 | "Videos." |
| Coloring pages (`coloring`) | easel with two crayons | ids 4–7 | 4 | "Coloring pages." |
| Books (`books`) | small shelf with three books | ids 8–11 | 4 | "Books." |

| Id | Station | Type | Title (content where visible) | Art guidance (original flat vector) | Voice line (`vo_item_{id}`, 1.0, one-shot, ≤1.8 s) | Beat voice (`vo_beat_{id}`, 1.0, ≤1.2 s) |
|---|---|---|---|---|---|---|
| 0 | videos | `video` | The Seed Wakes | soil mound, seed, raindrops, sprout | "Video: The Seed Wakes." | "A little sprout!" at 2400 |
| 1 | videos | `video` | The Little Pond | pond ripple, duck, fish leap | "Video: The Little Pond." | "A duck glides by." at 2400 |
| 2 | videos | `video` | Trees Are Busy | leaf, breeze, bird, shade | "Video: Trees Are Busy." | "A bird lands here." at 2400 |
| 3 | videos | `video` | The Recycling Line | can, bottle, bin | "Video: The Recycling Line." | "It goes in the bin!" at 2400 |
| 4 | coloring | `coloring` | The Seedling | pot + sprout; fills soil-brown, leaf-green | "Coloring: The Seedling." | none |
| 5 | coloring | `coloring` | The Pond | pond + lily pad; fills water-blue, pad-green | "Coloring: The Pond." | none |
| 6 | coloring | `coloring` | The Big Tree | tree + sun; fills canopy-green, sun-yellow | "Coloring: The Big Tree." | none |
| 7 | coloring | `coloring` | The Recycling Bin | bin + bottle; fills bin-blue, bottle-green | "Coloring: The Recycling Bin." | none |
| 8 | books | `book` | The Thirsty Flower | cover: flower + watering can; page: sprout in soil | "Book: The Thirsty Flower." | "Water helps it grow." at 2500 |
| 9 | books | `book` | A Home for Bees | cover: hive in a tree; page: bees at the hive | "Book: A Home for Bees." | "Bees buzz home." at 2500 |
| 10 | books | `book` | The River Runs | cover: river through hills; page: river reaching the sea | "Book: The River Runs." | "Down to the sea." at 2500 |
| 11 | books | `book` | Goodbye, Bottle | cover: bottle turning into a jar; page: the new jar | "Book: Goodbye, Bottle." | "It becomes something new!" at 2500 |

**Sample timelines (exact).** One accumulated 4000 ms clock per preview. The common skeleton for every type: 0–400 card fade in (200 ms); 3400–3700 hold; 3700–4000 check pop (0→1.15→1, 300 ms); at 4000 `sfx_chime` and `ended` (FR-007); any beat voice starts ≥2000 ms.

| Type | 400–2000 | 2000–2500 | 2500–3400 | Beat sound / voice |
|---|---|---|---|---|
| `video` | beat 1 fades in at 400, soft-pulses at 700; beat 2 slides in at 1400, soft-pulses at 1700 | beat 3 pops (300 ms) at 2400 + sparkle ≤6 | hold | `sfx_pop` 0.6 at 2400; `vo_beat_{id}` at 2400 |
| `coloring` | outline stroke reveal 400–2000 (≤1600 ms); `sfx_draw` 0.4 at 400 | fill 1 at 2100: fade 200 ms + leading-edge slide 40 px→0 over 200 ms | fill 2 at 2600 (same); finished-page soft-pulse 400 ms at 3000 | `sfx_pop` 0.6 ×2; no voice |
| `book` | cover holds (faded in at 0) | `sfx_page` 0.6 at 2000 + flip 0→180° over 500 ms | interior page fades in at 2500 (200 ms) and holds | `sfx_page`; `vo_beat_{id}` at 2500 |

**Printable handling (designed, D5/A4).** The four coloring items are the on-screen representation of the officially documented printable pages: the `coloring` beat shows the page drawing and filling. The player triggers no print dialog, download, file save, or share sheet, and holds no page-file state; actual printing belongs to the app shell and is out of scope (section 16).

**Layout and target numbers (normal layouts; compact-fit rule below covers short viewports; every layout is scroll-free).** Station cards: 180×180 gap 24 (≥1024), 136×136 gap 16 (768–1023), 88×88 gap 12 (320–767). Item tiles: 160×160 gap 24, 120×120 gap 16, 88×88 gap 12 in the same bands. Preview card: 640×480 art ≥320×320; 480×360 art ≥240×240; 280×200 art ≥160×160.

| Element (normal) | ≥1024 px | 768–1023 px | 320–767 px |
|---|---|---|---|
| HOME | 64×64 at (24, 24) | 64×64 at (24, 24) | 64×64 at (24, 24) |
| `home` station row | 180×180 cards, row centered, y = 200 | 136×136, y = 168 | 88×88, y = 88 |
| `home` strip | globe 48, numerals 40, check/star 32; row centered 24 px above bottom | globe 40, numerals 32, check 32; 16 px above bottom | globe 36, numerals 28, check 32; 16 px above bottom |
| `grid` tiles | rows y = 160 and y = 344 (160×160 gap 24) | rows y = 128 and y = 264 (120×120 gap 16) | rows y = 100 and y = 200 (88×88 gap 12) |
| `grid` shelf pictogram | 64×64, 24 px right of HOME | 64×64 | 48×48 |
| `preview` card | 640×480, x centered, y = 24; art ≥320×320 | 480×360, y = 24; art ≥240×240 | 280×200, x centered, y = 24; art ≥160×160 |
| `preview` Replay | 64×64 centered under the card (y = card bottom + 16) | 64×64, y = card bottom + 16 | 64×64, y = card bottom + 12 |
| `preview` prev / next | 64×64 at the side edges, vertically centered | 64×64 same | 64×64 at the side edges, vertically centered |

- **Normal requirements (band heights):** ≥1024 — 560 `home`, 512 `grid`, 608 `preview`; 768–1023 — 440 / 392 / 472; 320–767 — 288 / 288 / 300 (all ≤480, so the normal layout always fits the supported minimum). At 320×480 the content stacks are `home` 288, `grid` 288, `preview` 300, and everything fits with the chrome (HOME row 88; preview 24 + 200 card + 12 + 64 Replay = 300).
- **Compact layouts** apply per state when the viewport height is below that state's normal requirement: ≥1024 — station cards 120×120 gap 16, item tiles 120×120 gap 16, preview card 440×330 (art ≥240×240), chrome 64, content 424 `home`/`grid` (tiles at y = 128 and y = 264) and 458 `preview`; 768–1023 — station cards 100×100 gap 12, item tiles 100×100 gap 12, preview card 400×300 (art ≥200×200), chrome 64, content 348 `home`/`grid` (tiles at y = 104 and y = 216) and 412 `preview`. 320–767 has no compact layout. At 1024×480 every state uses its ≥1024 compact layout (424/424/458 ≤ 480); at 768×480 the 768–1023 normal layout applies (440/392/472 ≤ 480). Below 480 px height, scale the field by 0.9 best-effort, keeping every target's minimum (A8). In the 320–767 band HOME/back are drawn at the card's top corners and prev/next at the side edges, as the table states; the card's art is centered at ≥160×160 and chrome overlaps at most the art's outer edge (≤8 px per side at 320 px width).
- **Worked example (item 5, The Pond, at 320×480):** `home` shows three 88×88 stations at y = 88 and the strip centered 16 px above the bottom. Tap the easel → `grid(coloring)`: four 88×88 tiles, row 1 (items 4–6) at y = 100 and item 7 centered at y = 200; content 288 ≤ 480, no scrolling. Tap tile 5 → `preview(5, playing)`: "Coloring: The Pond."; card 280×200 at y = 24 fades in by 200 ms; outline stroke reveal 400–2000 with `sfx_draw` at 400; fill 1 (water-blue) at 2100 and fill 2 (pad-green) at 2600, each fade + 200 ms slide with `sfx_pop`; soft pulse at 3000; check pops 3700–4000; `sfx_chime` at 4000; Replay pulses 3×200 ms. The save records `lastShelf: "coloring"`, `lastItemId: 5`, `visitedIds` gaining 5 once.
- **Randomization:** none. Station order, item order, samples, and layouts are fixed and deterministic; no seed or backfill exists.
- **Progression rule:** none. Every item is reachable at every moment; the only accumulations are `visitedIds` (the strip, the resume rings, and the one-time completion moment) and the current run's shelf/item position.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Play / HOME / back / prev / next | depress 80 ms | `sfx_tap` — 0.5 — one-shot, 0.08 s |
| Station opened | card depress 300 ms; tiles fade in 200 ms | `sfx_open` — 0.6 — one-shot, 0.12 s; `vo_shelf_{shelf}` — 1.0 — one-shot |
| Item opened | tile depress 300 ms; card fade in 200 ms | `vo_item_{id}` — 1.0 — one-shot |
| Video beat 3 | pop 300 ms + sparkle ≤6 particles | `sfx_pop` — 0.6 — one-shot; `vo_beat_{id}` — 1.0 — one-shot |
| Coloring reveal / fills | stroke reveal 400–2000; two 200 ms fade + slide fills; soft pulse at 3000 | `sfx_draw` — 0.4 — one-shot, 0.2 s; `sfx_pop` — 0.6 — one-shot ×2 |
| Book flip / page | flip 500 ms at 2000; page fade 200 ms at 2500 | `sfx_page` — 0.6 — one-shot, 0.15 s; `vo_beat_{id}` — 1.0 — one-shot |
| Sample end (every type) | check pops 3700–4000; Replay pulses 3×200 ms | `sfx_chime` — 0.8 — one-shot, 0.8 s |
| Completion (FR-021) | confetti ≤40 particles over 2500 ms; panel fade 250 ms at 6500; star pop 300 ms | `sfx_chime` — 0.8 — one-shot; `vo_complete` — 1.0 — one-shot |
| Idle hint (FR-018) | deterministic target hint-pulses 3 s | `vo_hint_{title,home,grid,preview}` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during the hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after the first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only; stops at Play |

**Effect definitions (no undefined effects):** *depress* = scale 1→0.95→1 over 80 ms (tile 300 ms). *fade* = opacity 0→1 or 1→0 over 200 ms. *pop* = scale 0→1 over 300 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 per 500 ms cycle for 3,000 ms. *replay pulse* = 3 cycles of scale 1→1.15→1 over 200 ms each. *replay attention pulse* = the replay pulse repeating every 600 ms for 3,000 ms. *sparkle* = ≤6 square particles ≤40 px flying ≤80 px outward over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *grid settle* = card fade 300 ms + translate ≤16 px, staggered 30 ms in shelf order inside the 1,200 ms reveal. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold. *ring flash* = ring opacity 1→0 over 300 ms. *end panel* = centered card ≤360×280, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fade 250 ms. *check pop* / *star pop* = scale 0→1.15→1 over 300 ms. *accent ring* = static 3 px `#F2994A` outline. *flip* = the cover rotates about its spine 0→180° over 500 ms. *stroke reveal* = SVG stroke-dashoffset over ≤1600 ms. *slide* = translate 40 px→0 over 200 ms.

**Copy (fixed, original; no Khan Academy content).** `vo_welcome` = "Welcome! Pick a station and see what's growing." (≤3.0 s). `vo_shelf_{videos,coloring,books}` = "Videos." / "Coloring pages." / "Books." (≤1.5 s). `vo_item_{0-11}` and `vo_beat_{0-3,8-11}` per section 8 (≤1.8 s / ≤1.2 s). Hints — `vo_hint_title` = "Tap the button to start exploring."; `vo_hint_home` = "Tap a station to see what's inside."; `vo_hint_grid` = "Tap a picture to take a peek."; `vo_hint_preview` = "Tap the card to see it again." (each ≤2.5 s). `vo_complete` = "You've seen the whole collection! Happy Earth Day!" (≤3.5 s). TTS engine or recorded voice is build freedom.

**Audio rules (v1):** no audio before the first gesture (FR-022); one voice at a time, each new voice cancels the previous; sfx may overlap; `music_title` optional at 0.15 on `title` only. Degradation per FR-023; background-tab behavior per FR-024 (A7).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.seasonalCollections.earthDay.v1`.
- **Shape:** `{ "lastShelf": "videos"|"coloring"|"books" | null, "lastItemId": 0-11 | null, "visitedIds": [0-11 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`.
- **Save points:** shelf open (writes `lastShelf`, `lastItemId: null`, keeps `visitedIds`), preview entry (sets `lastItemId`; the id joins `visitedIds` once), completion (FR-021), and HOME; every save writes all four keys and `updatedAt` refreshes on every save; no save ever removes a visited id.
- **Restore:** Play always starts at `title`; nothing auto-opens. On `home` the saved station card wears the accent ring and soft-pulses once beginning when the reveal completes (FR-002); inside that shelf's grid the saved item tile wears the same ring when `lastItemId` is not null. The strip rebuilds from `visitedIds.length`; with all 12 visited it shows the star (FR-021).
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; keyboard equivalent: hold Enter/Space 3 s on the focused logo (FR-019). After reset the strip reads 0 of 12 and no ring or star shows.
- **Deliberately not stored:** sample clock or playhead, per-item timings, visit order, current state, audio settings, language, tap data, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended; handled by FR-024. Storage blocked → run unsaved (FR-023).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy character, art, voice, audio, or footage appears. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) as noted.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_title` / `frame_meadow` | image | meadow, pond, rounded globe, soft sky; also the `home` frame | 1280×720 SVG | static (frame fades in 200 ms at Play) | SVG shapes |
| `card_title` | image | rounded themed card behind Play | 480×320 SVG | static | SVG shapes |
| `station_{videos,coloring,books}` | image | rounded screen with a play triangle; easel with two crayons; small shelf with three books | 180×180 SVG each (88–136 px in smaller bands) | static; settle in the reveal; depress | SVG shapes |
| `pict_play` / `pict_home` / `pict_back` / `pict_prev` / `pict_next` / `pict_replay` | image | triangle; house; return arrow; chevrons; circular restart arrow | 64×64 SVG each (Play drawn at 96×96; panel Replay 96×96) | static; depress | SVG paths |
| `mark_reset` / `ring` | image | inconspicuous logo mark; 4 px accent progress ring | 96×96 SVG; 96×96 SVG | hold ring | SVG shapes |
| `pict_globe` / `mark_check` / `mark_star` | image | rounded globe with a leaf; rounded check; five-point star | 48×48 / 32×32 / 32×32 SVG | static; star replaces check at completion | SVG paths |
| `art_v{0-3}` | image | video scene sets, three beat layers each, per section 8 | 640×480 SVG each | fade / slide / pop per FR-008 | SVG shapes |
| `art_c{4-7}` | image | coloring page: outline path + two fill regions per section 8 | 640×480 SVG each | stroke reveal; fade + slide fills | SVG shapes |
| `cover_{8-11}` / `page_{8-11}` | image | four original book covers (title text is content) and four interior page arts | 640×480 SVG each | cover flip 500 ms; page fade 200 ms | SVG shapes + text |
| `tile_{0-11}` | image | item tile art derived from `art_*` / `cover_*` | 160×160 SVG each | static; depress | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` / `sfx_open` / `sfx_pop` / `sfx_draw` / `sfx_page` / `sfx_chime` | audio | UI click 0.08 s; muted tap; latch click 0.12 s; soft pop; soft scribble 0.2 s; paper flip 0.15 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips / arpeggio |
| `vo_welcome` / `vo_shelf_{3}` / `vo_complete` | audio | copy in section 9 | ≤3.0 s / ≤1.5 s / ≤3.5 s | one-shot | TTS allowed |
| `vo_item_{0-11}` / `vo_beat_{0-3,8-11}` | audio | the 12 name lines and 8 beat lines in section 8 | ≤1.8 s / ≤1.2 s each | one-shot | TTS allowed |
| `vo_hint_{title,home,grid,preview}` | audio | copy in section 9 | ≤2.5 s each | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only; stops at Play | may be omitted |

- **Palette tokens:** meadow `#A8D5A2`, pond `#7EC8E3`, sky `#BFE3F0`, globe/leaf `#7FB069`, soil `#C9A26B`, sun `#F2B33D`, ink `#3A2E24`, cream `#FFFDF6`, chrome `#FFFDF7`, accent `#F2994A`, accent-deep `#E4572E`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); strip numerals 40/32/28 px, badge numerals 40 px, book-cover titles 28 px (content); no other visible words.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → skip that clip, behavior unchanged (FR-023).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Shelf` | `id: enum {videos, coloring, books}`; `pict: string`; `count: int` (4); `items: int[4]` (item ids in order); `voiceKey: string` (`vo_shelf_*`) |
| `Item` | `id: int 0-11`; `shelf: ShelfId`; `type: enum {video, coloring, book}`; `title: string`; `artKey: string`; `voiceKey/voiceCopy: string` (`vo_item`); `data: VideoData \| ColoringData \| BookData` |
| `VideoData` | `beats: string[3]` (art layers); `beatKey: string`; `beatMs: 2400`; `beatCopy: string` |
| `ColoringData` | `outlinePath: string`; `fills: string[2]` (color regions); `fillMs: [2100, 2600]` |
| `BookData` | `coverTitle: string` (content); `pageArtKey: string`; `beatKey: string`; `beatMs: 2500`; `beatCopy: string` |
| `Save` (persisted) | `lastShelf: ShelfId \| null`; `lastItemId: int 0-11 \| null`; `visitedIds: int[]`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, home, grid, preview}`; `reveal: bool`; `shelf: ShelfId`; `itemId: int`; `sample: enum {playing, paused, ended}`; `sampleMs: int 0-4000`; `completionArmed/completionPanel: bool`; `focusIndex: int`; `idleTimer: id`; `utterance: object`; `storageOk: bool`; `audioUnlocked: bool` |

`Shelf`, `Item`, and the type data records are static; the sample timeline is computed from `sampleMs` and never from wall-clock time. There is no judgment, scoring, unlock, or calendar field.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, pictograms, per-tile hit rects, large numerals, and short book titles as content.
- **R-002** The player shall animate the section 9 effects: depress, fade, pop, soft pulse, hint pulse, replay pulse, replay attention pulse, sparkle, confetti, grid settle, ring fill/flash, end panel, check/star pop, accent ring, flip, stroke reveal, slide.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input with the FR-015/FR-016 hit rules; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all controls, with the section 6 tab order, Escape = HOME, Backspace = back, ArrowLeft/Right = prev/next, R = replay.
- **R-005** The player shall play one voice clip at a time with sfx overlap, cancel the previous utterance whenever a new voice starts, and skip a failed clip without blocking play.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall voice all lines via recorded audio or speech synthesis, with the FR-023 no-speech fallback and the muted pictogram.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-023), and make no network requests after initial load (FR-027).
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during samples, confetti, and the reveal.
- **R-010** The player shall scale from 320×480 to 1366×768 without losing state, shelf, item, or a running sample's clock, applying the section 8 compact rule with no scrolling (FR-025).
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-026).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: freeze the sample on hide (FR-024), lose no progress, and allow hints to fire late.
- **R-013** Each preview sample shall be renderable at runtime from its `Item` record and the section 8 timeline; no per-item code is required.
- **R-014** The player shall request no camera, microphone, or network access, and shall trigger no print, download, or file-save API, at runtime (FR-027).
- **R-015** The player shall have no fail state, no scoring, no comparison, and no terminal state: HOME always returns to `title` and every item stays openable.

## 14. Acceptance criteria

| AC | Covers | Given | When | Then |
|---|---|---|---|---|
| AC-01 | FR-001 | a first load | assets finish | `title` shows the themed backdrop and card, Play (≥96 px), and the reset logo (≥64 px) at a 24 px margin, and no audio has played |
| AC-02 | FR-002 | `title`, no save | Play is pressed | the frame fades in 200 ms and three station cards settle (fade 300 ms, ≤16 px, 30 ms stagger) within 1200 ms, and the welcome line plays at 1200 ms; an input during the reveal finishes it and opens nothing |
| AC-03 | FR-002 | `title` with a save | Play is pressed | when the reveal completes (1200 ms) the saved station wears the accent ring and soft-pulses once (1→1.04→1 over 400 ms); nothing auto-opens |
| AC-04 | FR-003 | `home` | it is inspected | three stations show the screen / easel / shelf pictograms with a 4 each, and the strip shows the globe, the visited numeral, 12, and a check; every station opens |
| AC-05 | FR-004 | `home` | a station is tapped, then double-tapped within 500 ms | exactly one grid opens with `sfx_open` and its `vo_shelf` line once, and the save writes `lastShelf` with `lastItemId: null` and `visitedIds` kept |
| AC-06 | FR-005 | a station grid | it is inspected | four tiles show as 3 + 1 centered with no dots, chevrons, or paging; at 320×480 they are 88×88 (rows y = 100/200, content 288 ≤ 480, no scrolling) and at 1024×768 they are 160×160 |
| AC-07 | FR-006 | a station grid | an item tile is tapped | the preview opens, its `vo_item` line plays, the sample starts at 0, and the save records `lastItemId` and the id in `visitedIds` once |
| AC-08 | FR-007 | any preview | the sample runs | the check pops at 3700–4000 ms, `sfx_chime` plays at 4000 ms, the card holds in `ended`, and Replay pulses 3× 200 ms; the sample runs to its end with no input required |
| AC-09 | FR-008 | preview item 1 (The Little Pond) | the sample runs | beat 1 fades in at 400 ms, beat 2 slides in at 1400 ms, beat 3 pops with a sparkle at 2400 ms, and "A duck glides by." plays at 2400 ms |
| AC-10 | FR-009 | preview item 5 (The Pond) | the sample runs | the outline draws 400–2000 ms with `sfx_draw` at 400 ms, fill 1 sweeps at 2100 ms and fill 2 at 2600 ms with `sfx_pop` each, no voice plays, and the finished page soft-pulses at 3000 ms |
| AC-11 | FR-010 | preview item 8 (The Thirsty Flower) | the sample runs | the cover holds, `sfx_page` plays at 2000 ms with a 500 ms flip, the interior page fades in at 2500 ms, and "Water helps it grow." plays at 2500 ms |
| AC-12 | FR-011 | a sample that has ended | the card is tapped twice within 500 ms | exactly one replay starts from 0 with its `vo_item`, and the check/chime sequence plays again |
| AC-13 | FR-012 | preview item 2 of videos | Next is double-tapped within 300 ms, then Next is tapped again at item 3, then Previous is used at item 0 | exactly one step occurs to item 3 with its line, sample, and save; Next at item 3 (the last item) does nothing and plays no sound; Previous at item 0 (the first item) does nothing; the arrow keys step the same way with no wrap |
| AC-14 | FR-013 | a preview opened from the books grid | back is tapped, then back again | the books grid returns with the item's accent ring, then `home` appears; back writes no save (the preview entry's save already lists the item) |
| AC-15 | FR-014 | `home`, `grid`, or `preview` | HOME is pressed | `title` appears and the save was written; on `title`, Escape changes nothing |
| AC-16 | FR-015 | any state | a tap >12 px from every target is made | nothing changes on screen or in audio and the idle timer resets |
| AC-17 | FR-016 | `home` | two fingers land on two stations, and separately one pointer drags >24 px before release | only the first pointer's station opens; the second shows no feedback until release; the drag opens nothing |
| AC-18 | FR-017 | any state | a control is double-tapped | exactly one judged event occurs (one open, preview, step, replay, or HOME) |
| AC-19 | FR-018 | `home` with a gesture already made | 12 s pass | the leftmost station with an unvisited item hint-pulses 3 s and `vo_hint_home` plays; on `title` before any gesture it is visual-only; on `grid` the first unvisited tile pulses; in `preview` Replay pulses; no hint fires while a sample plays; any tap resets |
| AC-20 | FR-019 | `title` | the logo is held 3 s (or Enter/Space is held on it), and separately released before 3 s | the ring fills visibly during the hold; on completion the save clears, the ring flashes 300 ms with `sfx_soft_tap`, and after reload the strip reads 0 of 12 with no ring or star; early release leaves the save unchanged and the ring at 0 |
| AC-21 | FR-020 | an item previewed, then HOME, reload, Play | `home` appears | the saved station wears its accent ring and soft-pulses once when the reveal completes (1200 ms), the saved tile wears the ring inside its grid, nothing auto-opens, and the save holds shelf, item, visited list, and a refreshed `updatedAt` |
| AC-22 | FR-021 | 11 items visited | the 12th distinct item's sample ends at 4000 ms | confetti (≤40, 2500 ms), `sfx_chime`, and `vo_complete` play; at 6500 ms the panel shows with Replay ≥96 and HOME ≥64; the strip's check becomes a 32×32 star (300 ms); a replay restarts the sample without re-firing the moment |
| AC-23 | FR-021 | a save listing all 12 ids | the page reloads and Play is pressed | the strip shows the star without playing the completion moment, and every item still opens |
| AC-24 | FR-022 | a fresh load | Play, then a station is tapped while the welcome line is still speaking | no audio played before the first gesture; "Videos." stops the welcome line (one voice at a time) |
| AC-25 | FR-023 | speech synthesis unavailable / no AudioContext / storage blocked | the collection is browsed in each case | visual-only play with the muted pictogram for 5 s / silent play / fully usable unsaved run, and the reset ring still shows |
| AC-26 | FR-024 | a sample playing | the tab is hidden, then shown | the card is held mid-sample, Replay pulses 3,000 ms (600 ms repeat, no voice), and a replay restarts from 0 with no progress lost |
| AC-27 | FR-025 | `preview` at 1024×768 | the viewport is resized to 320×480 mid-sample | shelf, item, and the sample clock are preserved, the card reflows to 280×200 with 88×88 tiles, targets stay ≥64, and nothing scrolls; at 1024×480 the compact layouts apply (424/424/458 ≤ 480) |
| AC-28 | FR-026 | any state | the screen is reviewed with assistive technology and scanned for visible text | every interactive element announces an invisible name (e.g. "Coloring pages station, 4 items", "5 of 12 items seen"); visible text is only the count numerals and the four book-cover titles; the catalogued title and "Khan" appear nowhere |
| AC-29 | FR-027 | any state | random taps, empty taps, idle time, back-and-forth navigation, and network/print/permission watching occur | no request, dialog, download, or prompt fires; nothing is lost or locked; no score appears; every item stays openable |
| AC-30 | FR-028 | any state | the `A` key is pressed or an unknown event fires | nothing changes on screen or in audio, and shelf/item order is identical after a reload |
| AC-31 | FR-004, section 6 tab order, FR-014 (Escape) | any state | Tab is pressed repeatedly, then Enter/Space, R, arrows, Backspace, Escape are used | focus follows the section 6 order (tiles row-major; panel controls after Replay), each control activates, items step with no wrap, back goes up one level, and Escape returns HOME |
| AC-32 | FR-003, FR-027, D5 | after load | a coloring preview is opened and the browser is watched | the page draws and fills on screen with no print dialog, download, or file-save event, and no network request occurs |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. `title` → 1200 ms meadow reveal → three stations and the strip; every state fits without scrolling at 320×480, 1024×480 (compact), and 1024×768.
3. All 12 items exist with the section 8 titles, voices, and 4000 ms timelines (video beats 400/1400/2400; coloring draw 400–2000 + fills 2100/2600; book flip 2000–2500 + page + line 2500).
4. Previewing, replaying, stepping, back, HOME, the resume rings, and the reset hold behave as specified; the save survives a reload.
5. No-speech, no-AudioContext, and blocked-storage runs behave as specified; no network, print, download, camera, or microphone is used; no visible word other than the numerals and the four book-cover titles appears.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 12 items (4 videos, 4 coloring pages, 4 books) and every title, count, frame, and sample are designed instantiations; official sources publish no individual item titles, counts, art, audio, mechanics, or dates (O3, D2) | designed |
| A2 | "Earth Day" is a generic public theme and is used on screen and in voice copy; the catalogued title and the string "Khan" appear nowhere on screen, in audio, or in accessible names; all content is original | designed (IP rule, D1) |
| A3 | Previews are original 4000 ms non-interactive moments with no game logic, no right/wrong, and no scoring; they are not the collection's real media | designed (D4) |
| A4 | "Printable" coloring pages are represented on screen only; no print, download, file-save, or share affordance exists in this player, and actual printing is app-shell scope | designed (D5, FR-009, FR-027) |
| A5 | No calendar, availability, lock, or countdown state exists; every item is always openable, and O2's time-limited fact lives only in section 3 and here | designed (D6) |
| A6 | Recorded or TTS-synthesized voices are both acceptable; copy is fixed in sections 8–9 | designed |
| A7 | Browsers block autoplay until the first gesture; background-tab timers may be throttled and speech suspended | platform facts; handled by FR-022/FR-024 |
| A8 | 320×480 is supported; the section 8 numbers fit it without scrolling, with compact layouts for short viewports at the two larger bands | designed (FR-025) |
| A9 | No drag gestures exist in this player; taps and keyboard only | designed (FR-016) |
| A10 | Age band 2–8 is the app's published audience; the 2–5 pre-reader focus, the ≥64 px targets, and the voice-first feedback are targeting choices inside it, with 6–8 able to read the four book-cover titles as content | designed |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the three shelves and their types; the 12 items, ids, titles, voices, art guidance, and 4000 ms timelines; the home frame, station cards, strip, and reveal; layout numbers, target minimums, and the compact rule; hit tolerance, pointer, throttle, and step rules; chrome set and keyboard map; the save key, shape, and save points; the completion moment and star; audio rules; no fail state, no calendar, no scoring; offline-only behavior; all content original; acceptance criteria.
- **Free:** exact composition within the section 8 art guidance, easing curves, particle look, voice timbre/TTS engine, optional title music, tile corner radius, exact pictogram and station geometry beyond the guidance.
- **Not in this spec:** the app shell or navigation, profiles, parental controls, real storefront availability, calendars, or countdowns, actual printing, download, or file export, real video footage or licensed media, other seasonal collections, localization, analytics, teacher tooling, or any Khan Academy character, name, art, voice, or audio.
