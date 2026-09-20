# Offline library — "Kodi's Suitcase"

## 1. Front matter

- **Entry type:** Interactive player — offline content collection (a suitcase browser with per-item preview cards)
- **Catalogued entry:** [`offline-library-kodis-suitcase.md`](../offline-library-kodis-suitcase.md)
- **Official source:** [Help Center — Parent and Home Account Users](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids); [Google Play listing](https://play.google.com/store/apps/details?id=org.khankids.android); catalog row `khan-academy-kids-games.md` line 86 and the Library tabs list line 27
- **Spec status:** v1 — first offline-library spec; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-021); no network after load
- **Provenance constraint:** the catalogued title is retained for traceability only. "Kodi" is a Khan Academy character; the guide here is the **original character Tuck** (a round tortoise drawn from primitives). The catalogued title appears nowhere on screen or in audio, and no Khan Academy character, name, art, voice, or audio is reproduced (D1, FR-024).
- **Interactive-player substitutions (declared):** a 1200 ms original suitcase-open animation replaces a video; five content pockets replace levels; 30 preview cards replace rounds; an "all packed" moment replaces a win condition; there is no scoring, no fail state, and no terminal state (HOME always returns to the title).

## 2. Overview and learning objective

A child presses Play and the suitcase lid swings open over 1200 ms, revealing five pockets — alphabet tracing, books, sight-word spelling, numbers, and math games — each showing how many items it holds. Tapping a pocket lays out its item cards in a grid that always fits the screen without scrolling; tapping a card plays a 3-second original sample moment (a letter stroke drawing itself, a book cover flipping, a word's letters popping in, pips filling a numeral, or two dot-groups merging) while a warm voice names the item. The child can replay, step through cards, go back, or go home at any time, and the suitcase marks what they have already seen. The skills are **independent choice-making and one-hop exposure to each documented offline activity type** — "I can pick what I want, and it works anywhere". Age band: **2–8 across the library**; this entry targets the **2–5 pre-reader** first, with 6–8 early readers able to read the book titles and sight words as content. Expected session: **1–3 minutes** (three to six previews); a full browse of all 30 items spans several sessions.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | The Library has an **Offline** section providing dozens of books and games available without an internet connection | official | Catalog row line 86; Library tabs list line 27; Parent guide; Google Play listing |
| O2 | The offline content includes alphabet tracing, books, sight-word spelling, numbers, and math games | official | Catalog row line 86; catalogued entry description |
| O3 | The number of offline items ("dozens") is described in official materials | official | Catalogued entry Notes |
| O4 | Official sources describe offline content by type only; individual offline titles are not published | official (about the source's limits) | Catalogued entry Notes |
| O5 | The app is officially for children ages 2–8 | official | `khan-academy-kids-games.md` §5 |
| O6 | "Kodi's Suitcase" is the catalogued name of the Offline section, and "Kodi" is a Khan Academy character | official | Catalog lines 86, 140 |
| D1 | The guide is the original character **Tuck** (a round tortoise); the catalogued title is traceability only and appears nowhere on screen or in audio; no KA character, art, voice, or audio is reproduced | designed | IP constraint; mirrors the Ollo's-alphabet-videos replacement precedent |
| D2 | Exactly **30 items** (trace 6, books 8, spell 6, numbers 5, math 5) | designed | Makes "dozens" concrete and buildable inside a 24–36 range; per-type counts are unpublished (O4) |
| D3 | Pocket browsing: suitcase → pocket grid → preview card, no scrolling, paging when a pocket needs it | designed | The minimal buildable browsing the interactive-player entry promises; grid numbers in section 8 |
| D4 | Per-item **preview cards** with one 3000 ms sample per item, auto-played, replayable | designed | Keeps each item's moment small and original; previews are not the library's games and contain no game logic, scoring, or right/wrong |
| D5 | Offline-status affordances: packed strip (no-network pictogram + count + check), per-item packed check, "all packed" star; no download, connectivity, or cloud state | designed | Honest representation of O1's offline promise without inventing packaging mechanics |
| D6 | Player chrome (Play, HOME, back, paging, Replay, prev/next, reset logo), 12 s idle hints, 3 s reset hold, save/resume rings, audio rules, degradation | designed | Template v1 and family conventions (book-cover, neat-as-nine, Ollo's alphabet videos) |
| D7 | All art, voice, copy, layout, animation timing, and the all-packed moment | designed | IP rule: all assets original (section 11) |

## 4. Player experience / core loop

A child presses Play. The lid swings open; Tuck the tortoise hops up and a voice says "All packed! Tap a pocket to look inside." Five pockets show their pictograms and counts: 6, 8, 6, 5, 5. The child taps the book pocket; eight book cards settle into a grid and the voice says "Books." The child taps the red wagon card: it grows to the stage, the voice says "A book: The Red Wagon.", the cover flips at 1400 ms and one page of art appears, then a check badge pops and a chime rings at 3000 ms. The child taps the card again — the same little story-flip, again. They tap the next chevron and a second book appears. Later they tap HOME; the suitcase closes to the title. On the next visit the book pocket and the red wagon card wear small accent rings, so they can pick up where they left off.

**Core loop:** open the suitcase → pick a pocket → pick a card → watch or replay its 3 s sample → step to the next card or go back → keep browsing until everything has been seen ("all packed").

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading` (prepare assets per section 11; audio locked), then `title`: a closed suitcase with Tuck bobbing beside it, one Play target ≥96×96 CSS px, and a reset logo ≥96×96 CSS px at the top-left with a 24 px margin (FR-016). No audio shall play before the first pointer or key input (FR-020). The catalogued title and every Khan Academy character, name, art, voice, and sound shall appear nowhere on screen or in audio (FR-024). |
| FR-002 | When Play is pressed, the player shall unlock audio and run the opening animation: the lid rotates −70° about its hinge over 1200 ms while 30 tiny cards settle into place. Any pointer or key input during the 1200 ms shall finish the animation instantly (that input is consumed — it opens nothing — and the animation never skips content); HOME during it cancels to `title`. On completion the player shall enter `suitcase(idle)` and, on the first Play after load, speak `vo_welcome` (1.0, one-shot, ≤3.0 s). When a save exists, the saved pocket tile shall pulse once (300 ms) after the animation (FR-018). |
| FR-003 | The suitcase shall show exactly five pocket tiles, each ≥88×88 CSS px with its category pictogram and a numeral badge of its item count — trace 6, books 8, spell 6, numbers 5, math 5 (30 items total) — plus a packed strip: a 48×48 no-network pictogram (globe with a slash), the numeral "30", and a 32×32 check. Every item shall always be openable: no lock, download, connectivity, or availability state exists and no pocket or tile is ever disabled. The player shall make no network request at any time after load (FR-025). |
| FR-004 | When a pocket tile is tapped, the player shall open `browse(category, page 1)`, speak `vo_cat_{category}` (1.0, one-shot, ≤1.5 s), play a 300 ms tile depress, and save (FR-018). Pocket taps share one 500 ms throttle: a second pocket tap inside 500 ms shall not open a second pocket. |
| FR-005 | `browse` shall show the pocket's item tiles in the section 8 grid: 4 columns × 3 rows of 160×160 px tiles with 24 px gaps at ≥1024 px wide; 4×2 of 120×120 with 16 px gaps at 768–1023; 3×2 of 80×80 with 12 px gaps at 320–767, all centered, with the pocket glyph (64×64) 24 px right of HOME and a back control (≥64×64) top-right. Every page shall fit the viewport with no scrolling from 320×480 up: when the viewport is shorter than the band's requirement, the band's compact layout applies (section 8). Page dots (12 px, 8 px gaps) appear only when the pocket has more than one page, together with paging chevrons (≥64×64); in the 320–767 layout — the only band where a pocket (books) has two pages — prev chevron, dots, and next chevron sit in one centered bottom row 16 px above the viewport bottom. Paging is throttled to one change per 300 ms and never wraps: prev on page 1 and next on the last page are no-ops. |
| FR-006 | When an item tile is tapped, the player shall open `preview(item)`, play a 300 ms tile depress, speak the item's `vo_item_{id}` line (1.0, one-shot, ≤2.5 s), start the item's sample from 0 (FR-007), and save `lastCategory`/`lastItemId` with `visitedIds` gaining the item once (FR-018). Item taps share one 500 ms throttle. |
| FR-007 | Each preview sample shall run the section 8 timeline for its kind (`trace`, `book`, `spell`, `number`, `math`) over exactly 3000 ms: that kind's visual events at the stated offsets, the packed check popping at 2700–3000 ms, and `sfx_chime` at 3000 ms. On entry the sample plays automatically with no tap needed. At 3000 ms the player shall enter `preview(item, ended)`: the card holds its final frame and the Replay control pulses 3 times over 600 ms. |
| FR-008 | When the card or the Replay control (≥56×56 CSS px at 320–767, ≥64×64 at ≥768) is tapped in `preview(item, ended)` or during a sample, the player shall cancel the current voice and sample audio and replay the sample and its `vo_item` line from 0. Replay is throttled to one restart per 500 ms; a double-tap inside 500 ms restarts once. |
| FR-009 | When Next or Previous (each ≥56×56 at 320–767, ≥64×64 at ≥768) is tapped, the player shall open the previous/next item of the same pocket (`preview(item±1)`) — cancel audio, speak that item's line, play its sample from 0 — and save. At the first or last item of the pocket the control is a no-op (no visual or audio change). Replay, Next, and Previous share one 500 ms throttle. |
| FR-010 | When the back control (≥64×64) is tapped, the player shall cancel voice and sample audio and go up one level: from `preview` to `browse(category, page of the item)`, saving first; from `browse` to `suitcase(idle)`. Back is throttled to one return per 300 ms. |
| FR-011 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `suitcase`, `browse`, and `preview`; pressing it shall cancel any voice, sample clock, and idle timer, save, and return to `title`. On `title` (the player's home) no HOME control is rendered and a HOME input (Escape) is a no-op; on `loading` no control is rendered and any input is a no-op. HOME is throttled to one press per 300 ms. |
| FR-012 | Hit-testing shall expand every control's rectangle by 12 px on all sides. A tap inside more than one expanded rectangle shall resolve to the nearest control center, then the leftmost, then the topmost. A tap more than 12 px from every control is an empty tap — no state change, no sound — and resets the idle timer (FR-015). A tap that starts inside a control never falls through to the stage beneath it. |
| FR-013 | The player shall track only the first pointer: a pointer-down inside a control (12 px-expanded) acquires it; pointer-up within 24 px of the down point activates it; a pointer that moves more than 24 px before release cancels that gesture with no state change (no drag gestures exist, so no drag alternative is required); additional simultaneous pointers are ignored until all pointers are released. On a same-millisecond tie between two pointers the leftmost wins. |
| FR-014 | Rapid or repeated taps shall never double-apply: taps inside a shared throttle (FR-004/FR-006/FR-008/FR-009/FR-010/FR-011) produce exactly one judged event; taps inside a throttle keep their visual depress but play no second voice; a double-tap yields one pocket open, one preview, one page change, one replay, or one HOME. |
| FR-015 | When no pointer or key input has occurred for 12,000 ms, the player shall hint-pulse the deterministic target for 3,000 ms: `title` → Play; `suitcase` → the saved pocket tile, or the trace pocket when no save exists; `browse` → the first tile on the current page whose item is not in `visitedIds`, or the leftmost tile on the page when all are visited; `preview` → Replay. After the first gesture of the run the hint shall also speak the state's hint line (1.0, one-shot, ≤2.5 s); before it, the hint is visual-only. The hint repeats every 12,000 ms of continued idleness; any input, including an empty tap, resets the timer. No hint fires while a sample is playing (the moving sample is its own cue). |
| FR-016 | When the title logo is held for 3,000 ms, the player shall fill a visible progress ring for the hold duration; releasing early resets the ring to 0 with no action; on completion it shall clear the storage key and in-memory progress (`lastCategory`, `lastItemId`, `visitedIds`) and play a ring flash (300 ms) plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3,000 ms on the keyboard-focused logo is the equivalent. |
| FR-017 | The player shall have no fail state: no wrong answer, score, star, streak, timer, lock, deduction, or comparison exists; empty taps, rapid taps, multi-touch, going back, and idle time never remove progress, never close the suitcase, and never lose the visited set. |
| FR-018 | The player shall persist one small JSON object in browser local storage under `spec.offlineLibrary.v1`: `{ "lastCategory": "trace"\|"books"\|"spell"\|"numbers"\|"math", "lastItemId": 0-29 \| null, "visitedIds": [0-29 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`. Save points: pocket open, preview entry, and HOME; every save writes all four keys (before the first preview: `lastItemId: null` and `visitedIds: []`; preview entry sets `lastItemId` and adds the item to `visitedIds` once). `updatedAt` refreshes on every save. Restore: on `suitcase` the saved pocket tile shows a 3 px accent ring (and pulses once per FR-002); inside that pocket the saved item tile shows the same ring when `lastItemId` is not null; nothing auto-opens; a run with no save shows no rings. Storage blocked → the run is unsaved per FR-021. |
| FR-019 | When the 30th distinct item is previewed (`visitedIds.length` reaches 30), the player shall play the all-packed moment at that sample's end (3000 ms): confetti ≤40 rect particles over 2000 ms, `sfx_chime` (0.8, one-shot), `vo_all` (1.0, one-shot, ≤3.5 s: "Your suitcase is full — you looked at everything!"), and the packed strip's check shall become a 32×32 star for the rest of the run and, with 30 visited ids in the save, after reload too. Visit order and counts are otherwise never shown and no unlock, score, or comparison appears. |
| FR-020 | Audio: no audio shall play before the first pointer or key input of a run (FR-001); that input unlocks audio. One voice clip at a time — any new voice (welcome, category, item, hint, all-packed) cancels the previous utterance immediately; sfx may overlap each other and the voice. `music_title` may loop at 0.15 on `title` only and shall stop at Play. Every cue's volume and behavior is stated in section 9. |
| FR-021 | Degradation: no speech synthesis → all voice silent, samples and pulses run unchanged, every state stays navigable by pictogram + numeral, and a muted-speaker pictogram (48×48) shows for 5,000 ms after the first Play; no AudioContext → all audio silent, behavior otherwise identical; storage blocked → the run is unsaved (all behavior and the visited set work in memory; the reset hold still shows its ring and flash). A missing visual asset draws a stub shape and play continues. |
| FR-022 | When the tab becomes hidden while a sample is playing, the player shall freeze the sample clock (frame held) and cancel pending audio; on return the sample stays paused, the card holds, and the Replay control plays the replay attention pulse (3,000 ms) with no voice; a replay input restarts the sample from 0 (FR-008). Hidden time in `suitcase` or `browse` pauses the idle timer; idle time counts visible time only; throttled timers may delay hints but never lose progress (A5). |
| FR-023 | Resize or rotation shall reflow per section 8 and preserve the state, pocket, page (clamped to the new last page), previewed item, and a running sample's clock (no restart). When the viewport height is below the width band's requirement (720 px at ≥1024 px wide, 472 px at 768–1023, 384 px at 320–767), the band's compact layout shall apply so the page still fits without scrolling: at 1024×480 the compact layout applies, at 320×480 the normal layout applies. From 320×480 to 1366×768 every target shall stay ≥56×56 CSS px (chrome), ≥64×64 (item tiles), ≥72×72 (pocket tiles) in every layout, and no page shall scroll. |
| FR-024 | No reading shall be required: visible text is limited to content — letters A–F, the sight words `the, and, go, we, my, you`, book titles, numerals (pocket counts and the packed strip), and glyphs. Every instruction and feedback reaches non-readers by voice + pictogram. Every interactive element carries an invisible accessible name (section 7), and the catalogued title appears nowhere on screen or in audio. |
| FR-025 | The player shall run fully offline: no network request, connectivity check, download state, or cloud affordance at any time after load; the packed strip and the per-item check that pops at each sample's end are the only offline-status affordances; every item is always openable (FR-003). Camera, microphone, and network permissions shall never be requested. |
| FR-026 | Unknown events, inputs, and unbound keys shall be ignored (no state change, no sound). Pocket order, item order, samples, and layouts are fixed and deterministic; there is no randomization, unlock, adaptive difficulty, or timer that gates progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | soft backdrop | initial; prepare assets; audio locked; no interactive elements |
| `title` | closed suitcase + Tuck + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `suitcase(opening\|idle)` | open suitcase + 5 pocket tiles + Tuck + packed strip + HOME | `opening` lasts 1200 ms; the main hub |
| `browse(pocket, page)` | pocket grid + pocket glyph + back + HOME + dots/chevrons when >1 page | pages per section 8; tiles in item order |
| `preview(item, sample)` | item card + Replay + prev/next + back + HOME | `sample` ∈ {playing, paused, ended}; sample runs 0–3000 ms |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `suitcase(opening)` → `suitcase(idle)` | actions: unlock audio; 1200 ms lid open; `vo_welcome` on first Play; saved pocket pulses (FR-002) |
| `title` | `HOME_PRESSED` / Escape | — | `title` | no-op (the title is home) |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `title` | `IDLE_12S` | — | `title` | actions: FR-015 hint on Play |
| `suitcase(opening)` | `ANY_INPUT` | pointer or key | `suitcase(idle)` | action: finish the lid animation instantly |
| `suitcase(opening)` | `HOME_PRESSED` / Escape | — | `title` | action: cancel animation; save |
| `suitcase(idle)` | `POCKET_TAP(c)` | outside the 500 ms pocket throttle | `browse(c, 1)` | actions: FR-004; save `lastCategory` |
| `suitcase(idle)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `suitcase(idle)` | `IDLE_12S` | — | `suitcase(idle)` | actions: FR-015 hint |
| `browse(c, p)` | `ITEM_TAP(i)` | outside the 500 ms item throttle | `preview(i, playing)` | entry: sample from 0; actions: FR-006; save |
| `browse(c, p)` | `PAGE_NEXT` / ArrowRight | `p < lastPage`, throttle clear | `browse(c, p+1)` | actions: 200 ms slide; page dots fill |
| `browse(c, p)` | `PAGE_PREV` / ArrowLeft | `p > 1`, throttle clear | `browse(c, p−1)` | actions: 200 ms slide; page dots fill |
| `browse(c, p)` | `BACK` / Backspace | throttle clear | `suitcase(idle)` | action: cancel voice; no save |
| `browse(c, p)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `browse(c, p)` | `IDLE_12S` | — | `browse(c, p)` | actions: FR-015 hint |
| `preview(i, playing)` | `SAMPLE_END` | sampleMs = 3000 | `preview(i, ended)` | actions: check pop 2700–3000 + `sfx_chime`; Replay pulses 3×; all-packed if 30th (FR-019) |
| `preview(i, *)` | `CARD_TAP` / `REPLAY` / R | throttle clear | `preview(i, playing)` | actions: cancel voice/audio; sample from 0 |
| `preview(i, *)` | `NEXT` / ArrowRight | throttle clear, not last in pocket | `preview(i+1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `PREV` / ArrowLeft | throttle clear, not first in pocket | `preview(i−1, playing)` | actions: cancel audio; speak line; sample; save |
| `preview(i, *)` | `BACK` / Backspace | throttle clear | `browse(pocket, page of i)` | actions: cancel voice/sample; save |
| `preview(i, *)` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers/sample; save |
| `preview(i, playing)` | `TAB_HIDDEN` | — | `preview(i, paused)` | actions: freeze sample clock; cancel audio (FR-022) |
| `preview(i, paused)` | `TAB_VISIBLE` | — | `preview(i, paused)` | actions: Replay plays the replay attention pulse (3,000 ms) with no voice; the sample stays paused (FR-022) |
| `preview(i, *)` | `IDLE_12S` | sample ≠ playing | `preview(i, *)` | actions: FR-015 hint on Replay |

Events not listed for a state are ignored (no state change, no sound); tab visibility outside `preview` only pauses and resumes the idle timer (FR-022).

**Tab order (per state).** `title` — reset logo → Play. `suitcase` — HOME → pocket tiles in order (trace, books, spell, numbers, math). `browse` — HOME → back → prev page (if any) → next page (if any) → item tiles in index order, row-major. `preview` — HOME → back → prev → next → Replay. `loading` — no focusables. Keyboard: Tab/Shift+Tab move focus in that order; Enter/Space activates; Escape = HOME; Backspace = back; ArrowLeft/ArrowRight = page prev/next in `browse` (item prev/next in `preview`); R = replay.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Open the suitcase | tap Play | Tab to Play + Enter/Space |
| Pick a pocket | tap a pocket tile | Tab to it + Enter/Space |
| Open a preview | tap an item tile | Tab to it + Enter/Space |
| Replay the sample | tap the card or Replay | R, or Enter/Space on the focused Replay |
| Step items | tap Next / Previous | ArrowRight / ArrowLeft, or Enter/Space on the focused control |
| Change page | tap the chevrons | ArrowLeft / ArrowRight in `browse` |
| Go back one level | tap back | Backspace, or Enter/Space on the focused back |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and the reset logo ≥96×96 CSS px; pocket tiles ≥88×88; item tiles ≥80×80 at 320–767, ≥120×120 at 768–1023, ≥160×160 at ≥1024; HOME, back, paging ≥64×64; Replay, prev, next ≥56×56 at 320–767 and ≥64×64 above. All ≥44 px platform minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Tolerance and mis-taps:** 12 px expansion per FR-012; nearest center wins, then leftmost, then topmost; >12 px from everything is an empty tap (nothing changes; the idle timer resets).
- **Pointer semantics:** first pointer only; activation on release within 24 px of the down point; a >24 px move cancels that gesture; extra simultaneous pointers are ignored until release (FR-013). No drag gestures exist, so no drag alternative is offered.
- **Instructions without reading:** every state is voice + pictogram; numerals and the letters/words inside preview cards are content; chrome is pictogram + invisible name (FR-024).
- **Accessible names (invisible, examples):** "Open the suitcase", "Reset saved progress (hold 3 seconds)", "Home", "Trace a letter pocket, 6 items", "Books pocket, 8 items", "Spell a word pocket, 6 items", "Numbers pocket, 5 items", "Math games pocket, 5 items", "Back to the suitcase", "Back to the pockets", "Previous page", "Next page", "Letter A, trace preview", "Book: The Red Wagon", "Sight word: the", "Number 4", "Two and one", "Previous item", "Next item", "Replay preview", "30 items packed for offline play" (packed strip, non-interactive label).
- **Resize:** viewport resize or rotation reflows per section 8 and preserves pocket, page (clamped), item, and a running sample's clock (FR-023).

## 8. Levels and content data

**The item set — 30 items (ids 0–29), five pockets.** All titles, words, copies, and art below are original (D2, D7).

| Pocket | id | Items | Count | Pocket pictogram | Entry voice (`vo_cat_*`) |
|---|---|---|---|---|---|
| Trace a letter | `trace` | letters A–F | 6 | dashed A with a start dot | "Trace a letter." |
| Books | `books` | 8 original titles | 8 | open book | "Books." |
| Sight words | `spell` | the, and, go, we, my, you | 6 | three letter tiles | "Spell a word." |
| Numbers | `numbers` | numerals 1–5 | 5 | numeral 4 with pips | "Numbers." |
| Math games | `math` | five dot sums | 5 | two dot groups and a plus | "Math games." |

| Id | Pocket | Item art | Sample kind + parameters | Voice line (`vo_item_{id}`, 1.0, one-shot, ≤2.5 s) |
|---|---|---|---|---|
| 0 | trace | dashed A, 3 strokes | `trace` n=3 | "Trace the letter A." |
| 1 | trace | dashed B, 3 strokes | `trace` n=3 | "Trace the letter B." |
| 2 | trace | dashed C, 1 stroke | `trace` n=1 | "Trace the letter C." |
| 3 | trace | dashed D, 2 strokes | `trace` n=2 | "Trace the letter D." |
| 4 | trace | dashed E, 4 strokes | `trace` n=4 | "Trace the letter E." |
| 5 | trace | dashed F, 3 strokes | `trace` n=3 | "Trace the letter F." |
| 6 | books | cover "The Red Wagon" + wagon art | `book` | "A book: The Red Wagon." |
| 7 | books | cover "The Lost Mitten" + mitten on snow | `book` | "A book: The Lost Mitten." |
| 8 | books | cover "Big and Small" + tree and sprout | `book` | "A book: Big and Small." |
| 9 | books | cover "My Blue Boat" + boat on water | `book` | "A book: My Blue Boat." |
| 10 | books | cover "Sun and Moon" + sky | `book` | "A book: Sun and Moon." |
| 11 | books | cover "On the Farm" + barn and fence | `book` | "A book: On the Farm." |
| 12 | books | cover "Three Little Ducks" + pond | `book` | "A book: Three Little Ducks." |
| 13 | books | cover "The Sleepy Cat" + cat on a cushion | `book` | "A book: The Sleepy Cat." |
| 14 | spell | letter tiles t-h-e | `spell` word "the" | "Spell the word: the." |
| 15 | spell | letter tiles a-n-d | `spell` word "and" | "Spell the word: and." |
| 16 | spell | letter tiles g-o | `spell` word "go" | "Spell the word: go." |
| 17 | spell | letter tiles w-e | `spell` word "we" | "Spell the word: we." |
| 18 | spell | letter tiles m-y | `spell` word "my" | "Spell the word: my." |
| 19 | spell | letter tiles y-o-u | `spell` word "you" | "Spell the word: you." |
| 20 | numbers | numeral 1 + 1 pip | `number` N=1 | "Number one." |
| 21 | numbers | numeral 2 + 2 pips | `number` N=2 | "Number two." |
| 22 | numbers | numeral 3 + 3 pips | `number` N=3 | "Number three." |
| 23 | numbers | numeral 4 + 4 pips | `number` N=4 | "Number four." |
| 24 | numbers | numeral 5 + 5 pips | `number` N=5 | "Number five." |
| 25 | math | 1 dot + 1 dot | `math` 1+1=2 | "One and one." → "Two!" |
| 26 | math | 2 dots + 1 dot | `math` 2+1=3 | "Two and one." → "Three!" |
| 27 | math | 2 dots + 2 dots | `math` 2+2=4 | "Two and two." → "Four!" |
| 28 | math | 3 dots + 1 dot | `math` 3+1=4 | "Three and one." → "Four!" |
| 29 | math | 3 dots + 2 dots | `math` 3+2=5 | "Three and two." → "Five!" |

**Sample timelines (exact; every kind ends with the check pop and chime).** One 3000 ms clock per preview.

| Kind | 0–300 ms | 300–2000 ms | 2000–2700 ms | 2700–3000 ms | At 3000 ms |
|---|---|---|---|---|---|
| `trace` (n strokes) | glyph fades in 200 ms | stroke reveal: `s = clamp(floor(1500 / n), 300, 750)` ms per stroke, stroke *i* starts at `300 + (i−1)×s`; last stroke ends ≤1800 | completed glyph pulses once (300 ms) at 2200 | packed check pops 0→1.15→1 over 300 ms | `sfx_chime`; card holds (`ended`) |
| `book` | cover fades in 200 ms | cover holds | flip 1400–1900 ms; sparkle ≤6 particles at 2000 | check pop 300 ms | `sfx_chime`; card holds (`ended`) |
| `spell` (m letters) | tile card fades in 200 ms | letters pop at `400 + k×400` ms for k = 0…m−1 (2–3 letters) | word pulses once (300 ms) at 2000; word spoken at 2000 (1.0) | check pop 300 ms | `sfx_chime`; card holds (`ended`) |
| `number` (N pips) | numeral pops 0→1 over 300 ms | pips fill at `800 + (k−1)×250` ms for k = 1…N (pip fill 200 ms each) | numeral + pips pulse once (300 ms) at `800 + N×250` | check pop 300 ms | `sfx_chime`; card holds (`ended`) |
| `math` (a + b) | group A and group B fade in 200 ms | groups slide together 600–1200 ms; merged group pops 300 ms at 1200; total numeral pops 300 ms at 1600 | total numeral holds | check pop 300 ms | `sfx_chime`; card holds (`ended`) |

**Grid and layout numbers (normal layouts; the compact-fit rule below covers viewports shorter than the band requirement, and every layout is scroll-free).**

| Viewport width | Item tiles | Grid per page | Pages per pocket (trace / books / spell / numbers / math) |
|---|---|---|---|
| ≥1024 px | 160×160, gap 24 | 4 × 3 = 12 | 1 / 1 / 1 / 1 / 1 |
| 768–1023 px | 120×120, gap 16 | 4 × 2 = 8 | 1 / 1 / 1 / 1 / 1 |
| 320–767 px | 80×80, gap 12 | 3 × 2 = 6 | 1 / 2 / 1 / 1 / 1 |

- **Suitcase layout:** ≥1024 px — pocket tiles 180×180, gap 24, one row of five at y=160; 768–1023 — 136×136, gap 16, one row of five at y=140; 320–767 — 88×88, gap 12, three per row (2 rows) at y=120. Packed strip centered 24 px above the bottom (16 px at 320–767). Opening animation 1200 ms; any input finishes it.
- **Preview layout:** ≥1024 px — card 640×480 centered, art ≥320×320, HOME and back 64 top corners, prev/next 72 at the side edges, Replay 64 under the card; 768–1023 — card 480×360, art ≥240×240, controls 64; 320–767 — card 280×200, art ≥160×160, HOME/back 64 in a top row, prev/replay/next 56 in a bottom row.
- **Compact-fit rule (numbers):** the normal layouts require a viewport height of **720 px** at ≥1024 px wide (browse: 24 top margin + 96 top bar + 24 gap + 528 grid + 24 dots + 24 bottom margin), **472 px** at 768–1023 (preview: 16 + 360 card + 16 + 64 Replay + 16; browse needs 416), and **384 px** at 320–767 (suitcase: 120 top + 88 + 12 + 88 tiles + 12 + 48 strip + 16; browse needs 348, preview 352). When the viewport is shorter than the band's requirement, that band's compact layout applies: ≥1024 — pocket tiles 136×136 gap 16 at y=120, item tiles 120×120 gap 16, 4×2 = 8 per page, preview card 440×330 (art ≥240×240), chrome 64; 768–1023 — pocket 120×120 gap 12 at y=110, item tiles 100×100 gap 12, 4×2 = 8 per page, preview card 400×300 (art ≥200×200), chrome 64; 320–767 — pocket 80×80 gap 12 at y=100 (3 per row, 2 rows), item tiles 72×72 gap 12, 3×2 = 6 per page, preview card 260×180 (art ≥160×160), chrome 56. Compact grids keep the table's page counts (8 / 8 / 6 tiles per page). Required compact heights are 458 / 412 / 348 px, so at **1024×480** the ≥1024 compact layout applies and fits (browse 448, preview 458) with item tiles 120 ≥64, pocket tiles 136 ≥72, chrome 64 ≥56; at **320×480** the normal layout applies (384 ≤ 480) and nothing scales. Below the supported minimum height (480 px) the compact field scales by 0.9 as a best effort, keeping the same minimums.
- **Worked example (books at 320×480):** pocket `books` opens on page 1 with tiles for items 6–11 (6 tiles) and a two-dot page indicator (first dot filled); Next slides 200 ms to page 2 with items 12–13 and the second dot filled; Prev returns to page 1. Tapping item 7 opens its preview: "A book: The Lost Mitten." plays, the cover flips at 1400 ms, the check pops at 2700 ms, and `sfx_chime` rings at 3000 ms; the save records `lastCategory:"books"`, `lastItemId:7`, `visitedIds` gaining 7 once.
- **Randomization:** none. Pocket order, item order, samples, and layouts are fixed and deterministic; no seed or backfill exists.
- **Progression rule:** none. Every item is reachable at every moment; the only accumulations are `visitedIds` (drives the resume rings and the one-time all-packed moment) and the pocket/page positions of the current run.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Play / HOME / back / paging | depress 80 ms | `sfx_tap` — 0.5 — one-shot, 0.08 s |
| Pocket opened | tile depress 300 ms; 200 ms grid fade-in | `sfx_open` — 0.6 — one-shot, 0.12 s; `vo_cat_*` — 1.0 — one-shot |
| Item opened | tile depress 300 ms; card pop 0→1 over 300 ms | `vo_item_{id}` — 1.0 — one-shot |
| Trace sample | stroke reveals per section 8 | `sfx_draw` — 0.4 — one-shot per stroke, 0.2 s |
| Book sample | flip 500 ms; sparkle ≤6 | `sfx_page` — 0.6 — one-shot, 0.15 s |
| Spell sample | letters pop 200 ms each | `sfx_pop` — 0.6 — one-shot per letter, 0.15 s; word spoken — 1.0 — one-shot |
| Number sample | pips fill 200 ms each | `sfx_tick` — 0.5 — one-shot per pip, 0.06 s |
| Math sample | groups merge 600 ms; total numeral pops | `sfx_slide` — 0.5 — one-shot, 0.2 s; total spoken — 1.0 — one-shot |
| Sample end (every kind) | check pops at 2700 ms; Replay pulses 3× 200 ms | `sfx_chime` — 0.8 — one-shot, 0.8 s |
| Idle hint (FR-015) | deterministic target hint-pulses 3 s | `vo_hint_*` — 1.0 — one-shot (visual-only before the first gesture) |
| All packed (FR-019) | confetti ≤40 particles, 2000 ms; check becomes a star | `sfx_chime` — 0.8 — one-shot; `vo_all` — 1.0 — one-shot |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after the first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only; stops at Play |

**Effect definitions (no undefined effects):** *lid open* = suitcase lid rotates −70° about its hinge over 1200 ms, easing out. *bob* = Tuck translates 8 px up and back over 1200 ms, repeating while idle. *depress* = scale 1→0.95→1 over 80 ms (tile: 300 ms). *pop* = scale 0→1 over 300 ms. *pulse* = scale 1→1.12→1 over 300 ms; *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3 s; *replay pulse* = 3 cycles of scale 1→1.15→1 over 200 ms each. *check pop* = scale 0→1.15→1 over 300 ms. *confetti burst* = ≤40 rect particles moving ≤120 px outward over 2000 ms. *sparkle* = ≤6 square particles ≤40 px flying ≤80 px over 600 ms. *stroke reveal* = SVG stroke-dashoffset 100→0 over the per-stroke duration; 8/100-unit width, round caps. *fade-in* = opacity 0→1 over 200 ms. *slide* = grid or dot fill translate 40 px→0 over 200 ms; *group merge* = both dot groups translate to the card center over 600 ms. *pip fill* = scale 0→1.15→1 over 200 ms. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold; *ring flash* = ring opacity 1→0 over 300 ms. *accent ring* (resume cue) = static 3 px `#F2994A` outline. *flip* = the card's cover rotates about its spine 0→180° over 500 ms. *letter pop* = scale 0→1 over 200 ms. *replay attention pulse* = the replay pulse repeating every 600 ms for 3,000 ms. *cards settle* = the 30 mini cards fade in (opacity 0→1 over 300 ms each, staggered 30 ms apart) and translate ≤16 px into their slots inside the 1200 ms opening. *hop* = translate y 0→−16→0 px over 300 ms. *point* = Tuck's head/arm tilts toward the target, 0→−15°→0 over 300 ms.

**Copy (fixed, original):** `vo_welcome` = "All packed! Tap a pocket to look inside." (≤3.0 s). Hint lines — `vo_hint_title` = "Tap the button to open the suitcase."; `vo_hint_suitcase` = "Tap a pocket to look inside."; `vo_hint_browse` = "Tap a picture to take a peek."; `vo_hint_preview` = "Tap the card to see it again." (each ≤2.5 s). `vo_all` = "Your suitcase is full — you looked at everything!" (≤3.5 s). Voice timbre and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first gesture (FR-020); one voice at a time, each new voice cancels the previous; sfx may overlap; `music_title` optional at 0.15 on `title` only. Degradation per FR-021; background-tab behavior per FR-022 (A5).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.offlineLibrary.v1`.
- **Shape:** `{ "lastCategory": "trace"\|"books"\|"spell"\|"numbers"\|"math", "lastItemId": 0-29 \| null, "visitedIds": [0-29 ints, unique, ascending], "updatedAt": "<ISO-8601>" }`.
- **Save points:** pocket open (writes `lastCategory` with `lastItemId: null` and `visitedIds: []`), preview entry (sets `lastItemId`; the item joins `visitedIds` once), and HOME; every save writes all four keys and `updatedAt` refreshes on every save.
- **Restore:** the player has no levels; the resume analog is marking — on `suitcase` the saved pocket tile shows a 3 px accent ring and pulses once, and inside that pocket the saved item tile shows the same ring when `lastItemId` is not null. Nothing auto-opens and Play always starts at the title.
- **No shared kernel:** one key only; no profiles, accounts, or cross-entry storage.
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; keyboard equivalent: hold Enter/Space 3 s on the focused logo (FR-016).
- **Deliberately not stored:** sample clock or playhead, per-item timings, visit order, page index, audio settings, language, tap data, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended; handled by FR-022. Storage blocked → run unsaved (FR-021).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy character, art, voice, or audio appears. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_stage` | image | soft travel backdrop, rounded shapes | 1024×768 SVG | static | SVG gradient + circles |
| `tuck_idle` / `tuck_hop` / `tuck_point` | image | original round tortoise guide, three frames (no KA character) | 256×256 SVG each | bob / hop 300 ms / point | SVG shapes |
| `suitcase_closed` / `suitcase_open` | image | the suitcase and its lid on a hinge; rust body, cream trim, clasp | 512×384 SVG each | lid open 1200 ms | SVG shapes |
| `pict_play` / `pict_home` / `pict_back` / `pict_prev` / `pict_next` / `pict_replay` | image | triangle; house; return arrow; chevrons; circular restart arrow | 64×64 SVG each (Play and logo drawn at 96×96) | static | SVG paths |
| `mark_reset` / `ring` | image | inconspicuous logo mark; 4 px accent progress ring | ≥96×96; 96×96 SVG | hold ring | SVG shapes |
| `pict_offline` / `check_packed` / `star_packed` | image | globe with a slash; rounded check; rosette star | 48×48 / 32×32 / 32×32 SVG | static; check pops; star replaces check when all 30 visited | SVG paths |
| `glyph_cat_{trace,books,spell,numbers,math}` | image | dashed A + start dot; open book; three tiles; numeral 4 + pips; two dot groups + plus | 128×128 SVG each | static | SVG shapes + font glyphs |
| `glyph_{A-F}` | rendered | dashed letter glyph from `strokes[]` path data (100×100 unit box, 8-unit round-capped stroke) | runtime | stroke reveal | system rounded font glyph |
| `cover_{6-13}` / `page_{6-13}` | image | eight original book covers (title text is content) and eight interior page arts per section 8 | 320×240 SVG each | static; cover flip 500 ms | SVG shapes + text |
| `tiles_{14-19}` | rendered | sight-word letter tiles | runtime text | letters pop in | font glyphs |
| `numeral_{20-24}` | rendered | large numerals 1–5 (content) | runtime text, ≥96 px | pop / pulse | font glyphs |
| `math_{25-29}` | rendered | dot groups and total numerals per section 8 | runtime | merge, pop | SVG circles + font glyphs |
| `sfx_tap` / `sfx_soft_tap` / `sfx_open` / `sfx_draw` / `sfx_page` / `sfx_pop` / `sfx_tick` / `sfx_slide` / `sfx_chime` | audio | click 0.08 s; muted tap 0.10 s; latch clack 0.12 s; soft scribble 0.2 s; paper flip 0.15 s; pop 0.15 s; tick 0.06 s; whoosh 0.2 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips / arpeggio |
| `vo_welcome` / `vo_cat_{5}` | audio | copy in section 9 | ≤3.0 s / ≤1.5 s each | one-shot | TTS allowed |
| `vo_item_{0-29}` | audio | the 30 lines in section 8 | ≤2.5 s each | one-shot | TTS allowed |
| `vo_hint_{title,suitcase,browse,preview}` / `vo_all` | audio | copy in section 9 | ≤2.5 s / ≤3.5 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** backdrop `#EDF6F1`, ink `#2E3A46`, suitcase `#C96F4A`, trim `#F2D7A0`, accent `#F2994A`, guide green `#7FB069`, sky `#BFE3F0`, chrome `#FFFDF7`, check `#7BC47F`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); numerals ≥96 px in previews, 40 px in pocket badges, 40 px in the packed strip; book titles ≥28 px on covers (content).
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → skip that clip, behavior unchanged (FR-021, R-007).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Pocket` | `id: enum {trace, books, spell, numbers, math}`; `pict: string`; `count: int`; `items: int[]` (item ids in order) |
| `Item` | `id: int 0-29`; `pocket: PocketId`; `kind: enum {trace, book, spell, number, math}`; `artKey: string`; `voiceKey/voiceCopy: string`; `data: Trace \| Book \| Spell \| Number \| Math` |
| `Trace` | `letter: "A"–"F"`; `strokes: string[]` (SVG paths, 100×100 box, 1–4 strokes) |
| `Book` | `title: string` (content); `pageArtKey: string` |
| `Spell` | `word: string` (2–3 letters); `letters: string[]` |
| `Number` | `numeral: int 1-5`; `pips: int 1-5` (equal to numeral) |
| `Math` | `a: int`; `b: int`; `total: int`; `voiceTotal: string` ("Two!"…"Five!") |
| `Save` (persisted) | `lastCategory: PocketId`; `lastItemId: int 0-29 \| null`; `visitedIds: int[]`; `updatedAt: string` |
| `Runtime` (not persisted) | `state: enum {loading, title, suitcase, browse, preview}`; `opening: bool`; `pocket: PocketId`; `page: int`; `itemId: int`; `sample: enum {playing, paused, ended}`; `sampleMs: int 0-3000`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Pocket`, `Item`, and the kind data records are static; the sample timeline is computed from `sampleMs` and never from wall-clock time. Judgment, scoring, and unlocks do not exist.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, pictograms, per-tile hit rects, large numerals, and short text runs as content.
- **R-002** The player shall animate the section 9 effects: lid open, bob, depress, pop, pulses, check pop, confetti, sparkle, stroke reveal, flip, letter pop, pip fill, merge, fade, ring fill/flash.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input with the FR-012/FR-013 hit rules; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all controls, with the section 6 tab order, Escape = HOME, Backspace = back, ArrowLeft/Right = page/item stepping, R = replay.
- **R-005** The player shall play concurrent one-shot audio (sfx + voice; voice at 1.0, optional music loop ≤0.15) and shall cancel the previous utterance whenever a new voice starts.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall voice clips via recorded audio or speech synthesis with the FR-021 no-speech fallback, and shall continue with visual-only feedback when any voice or audio asset fails.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-021), and make no network requests after initial load (FR-025).
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during samples, confetti, and the lid animation.
- **R-010** The player shall scale from 320×480 to 1366×768 without losing state, pocket, page, item, or a running sample's clock (FR-023).
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-024).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: freeze the sample on hide (FR-022), lose no progress, and allow hints to fire late.
- **R-013** Each preview sample shall be renderable at runtime from its `Item` record and the section 8 timeline; no per-item code is required.
- **R-014** The player shall request no camera, microphone, or network access at runtime.
- **R-015** The player shall keep every page free of scrolling at 320×480 and above by applying the section 8 compact-fit rule whenever the viewport is shorter than the width band's requirement, with the section 8 target minimums.

## 14. Acceptance criteria

| AC | Covers | Given | When | Then |
|---|---|---|---|---|
| AC-01 | FR-001 | a first load | assets finish | `title` shows Play (≥96 px) and the reset logo, Tuck bobs beside the closed suitcase, and no audio has played |
| AC-02 | FR-002 | `title`, no save | Play is pressed | the lid opens within 1200 ms, the suitcase is idle, and the welcome line plays (only after this gesture); with a save, the saved pocket pulses once (300 ms) |
| AC-03 | FR-003 | the suitcase idle | it is inspected | five pockets show badges 6/8/6/5/5 and the packed strip shows the no-network pictogram, "30", and a check; every pocket opens |
| AC-04 | FR-004 | the suitcase idle | the books pocket is tapped, then double-tapped within 500 ms | exactly one open occurs, "Books." is spoken once, and the grid shows the book items |
| AC-05 | FR-005 | a 320×480 viewport | the books pocket opens and Next is pressed | page 1 shows 6 tiles with a two-dot indicator (first filled) and a next chevron, no scrolling; Prev on page 1 does nothing; page 2 shows 2 tiles; at 1024×768 all 8 tiles show on one page with no chevrons |
| AC-06 | FR-006 | the books grid | a book tile is tapped | the preview opens, "A book: …" plays, the sample starts at 0, and the save records the item in `visitedIds` |
| AC-07 | FR-007 | `preview` item 6 | the sample runs | the cover flips at 1400 ms, the check pops at 2700 ms, `sfx_chime` plays at 3000 ms, and the Replay control pulses 3 times over 600 ms; on item 0, 3 strokes draw at 300/800/1300 ms |
| AC-08 | FR-008 | a sample that has ended | the card is tapped twice within 500 ms | exactly one replay starts from 0 with its voice, and the check/chime sequence plays again |
| AC-09 | FR-009 | preview item 6 of the books pocket | Next is tapped (twice within 500 ms) | exactly one step occurs to item 7 with its line and sample; at item 13 Next does nothing and plays no sound |
| AC-10 | FR-010 | a preview opened from books page 2 | back is tapped | the books grid returns on page 2 with the item's ring; back again returns to the suitcase |
| AC-11 | FR-011 | `suitcase`, `browse`, or `preview` | HOME is pressed | the title appears and the save was written; on `title`, Escape changes nothing |
| AC-12 | FR-012 | any state | a tap >12 px from every target is made | nothing changes on screen or in audio and the idle timer resets |
| AC-13 | FR-013 | the suitcase idle | two fingers land on two pockets, and separately one pointer drags >24 px before release | only the first pointer's pocket opens; the second shows no feedback until release; the drag opens nothing |
| AC-14 | FR-014 | any state | a control is double-tapped | exactly one judged event occurs (one open, preview, page, replay, or HOME) |
| AC-15 | FR-015 | `suitcase`, `browse`, and `preview`, with a gesture already made | 12 s pass with no input in each | the deterministic target pulses 3 s and the matching hint line plays; on `title` before any gesture it is visual-only; any tap resets |
| AC-16 | FR-016 | `title` | the logo is held 3 s | the ring fills visibly, the save clears, the ring flashes with `sfx_soft_tap`, and after reload the suitcase shows no rings; the focused-logo keyboard hold behaves the same |
| AC-17 | FR-017 | any state | random taps, empty taps, idle time, and back-and-forth navigation occur | nothing is lost or locked, no score appears, and every item stays openable |
| AC-18 | FR-018 | an item previewed, then HOME, reload, Play | the suitcase appears | the saved pocket wears its accent ring and pulses; inside it the saved item wears the ring; the save holds category, item, and visited list |
| AC-19 | FR-019 | 29 items visited | the 30th distinct item's sample ends | confetti, `sfx_chime`, and "Your suitcase is full — you looked at everything!" play and the packed strip check becomes a star; the star also shows after reload when the save lists 30 ids |
| AC-20 | FR-020 | a fresh load | Play and then a pocket are pressed while the welcome line is still speaking | no audio played before the first gesture, and the welcome line stops when "Books." begins (one voice at a time) |
| AC-21 | FR-021 | speech synthesis unavailable / no AudioContext / storage blocked | the suitcase is browsed in each case | visual-only with the muted pictogram for 5 s / silent / fully usable unsaved, and the reset ring still shows |
| AC-22 | FR-022 | a sample playing | the tab is hidden and then shown | the card is held mid-sample, Replay pulses 3 s with no voice, and a replay restarts from 0 with no progress lost |
| AC-23 | FR-023 | `browse` at 1024×768 | the viewport is resized to 320×480 | the pocket and page are preserved (clamped), tiles reflow to the normal 3×2 of 80×80 (384 ≤ 480, so no compact layout), nothing scrolls, and targets stay ≥56/64/72 px |
| AC-24 | FR-024 | any state | the screen is reviewed with assistive technology and scanned for visible text | every interactive element announces an invisible name; visible text is only letters, sight words, book titles, numerals, and glyphs; the catalogued title appears nowhere |
| AC-25 | FR-025 | after load | the player is browsed and the network panel/camera/microphone are watched | no network request, permission prompt, download, or cloud state occurs, every item opens, and each sample ends with its packed check |
| AC-26 | FR-026 | any state | the `A` key is pressed or an unknown event fires | nothing changes on screen or in audio and play continues normally |
| AC-27 | R-004; section 6 tab order; FR-011 (Escape) | any state | Tab is pressed repeatedly, then Enter/Space, R, arrows, Backspace, Escape are used | focus follows the section 6 order, each control activates, pages and items step, back goes up one level, and Escape returns HOME |
| AC-28 | FR-015, FR-017 | any state | 60 s pass with no input | nothing closes or is lost, and every item remains openable; idle hints fire at most every 12 s |
| AC-29 | FR-023 | `browse` and `preview` at 1024×480 (height below the 720 px band requirement) | the pages are shown | the ≥1024 compact layout applies: browse fits 8 tiles of 120×120 in 4×2 plus the bar and dots inside 480 px with no scrolling, the preview card is 440×330 with chrome 64, and every target is ≥64 (item tiles), ≥72 (pocket tiles), ≥56 (chrome) |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The suitcase opens, five pockets and all 30 item cards exist with the section 8 samples, and every page fits without scrolling at 320×480, 1024×480 (compact layout), and 1024×768.
3. Browsing, replay, stepping, back, HOME, the resume rings, and the reset hold behave as specified.
4. The save survives a reload; the all-packed moment fires once at 30 distinct visits.
5. No-speech, no-AudioContext, and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 30 items across the five documented types is a designed instantiation of "dozens" (24–36); per-type counts and titles are unpublished (O3, O4) | designed (D2) |
| A2 | The guide is the original Tuck because Kodi is a Khan Academy character; the catalogued title is traceability only and is shown nowhere | designed (D1, IP constraint) |
| A3 | Preview samples are original 3000 ms moments with no game logic, right/wrong, or scoring; they are not the library's games | designed (D4) |
| A4 | Recorded or TTS-synthesized voices are both acceptable; copy is fixed in section 9 | designed |
| A5 | Browsers block autoplay until the first gesture; background-tab timers may be throttled and speech suspended | platform facts; handled by FR-020/FR-022 |
| A6 | Pause-on-hide for samples, with no auto-restart on return, is a designed choice | designed (FR-022) |
| A7 | 320×480 is supported (below the family's 768-wide baseline); the section 8 grid numbers were chosen to fit it without scrolling | designed (FR-023) |
| A8 | No drag gestures exist in this player; taps and keyboard only | designed (FR-013) |
| A9 | Age band 2–8 with a 2–5 pre-reader focus is a targeting choice inside the app's official 2–8 range | designed (O5) |
| A10 | Every item is reachable at all times; no unlock or completion gating exists, and `visitedIds` only drives rings and the all-packed moment | designed (FR-017, FR-019) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the five pockets and their item counts (6/8/6/5/5 = 30); item ids, kinds, and sample timelines; pocket/page/tile grid numbers; hit tolerance, pointer, throttle, and paging rules; chrome set and keyboard map; target minimums; the save key and shape; no network, no fail state, no scoring; asset provenance; acceptance criteria.
- **Free:** exact composition within the section 8 guidance, easing curves, Tuck's exact design within the primitive-shape guidance, particle look, voice timbre/TTS engine, optional title music, tile corner radius, glyph geometry beyond the worked examples.
- **Not in this spec:** the app shell or Library navigation, profiles, parental controls, offline packaging or download mechanics beyond the packed status the player shows, the library's actual games or books (no re-implementation), localization, analytics, teacher tooling, or any Khan Academy character, art, voice, or audio.
