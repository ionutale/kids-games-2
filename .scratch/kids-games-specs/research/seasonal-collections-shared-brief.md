# Seasonal collections — shared brief for the four specs (ticket 13)

Working artifact for the four writers and their verifiers. Not a spec; the specs are standalone.
Ticket: `.scratch/kids-games-specs/issues/13-specs-seasonal-collections.md`; format model
`book-basics-shared-brief.md`; player model `specs/offline-library-kodis-suitcase.md` (shelf → item →
preview) plus the conventions of `specs/book-basics-book-cover.md`.

## Official facts per entry (quote-checked against the entry files and catalog lines 249–262)

| Entry (`docs/khan-academy-kids-games/<file>`) | Official facts — the complete set | Sources |
|---|---|---|
| Camp Khan Kids (`camp-khan-kids.md`) | "annual free virtual summer camp with in-app and screen-free activities, organized around weekly themes such as arts & crafts, animals, and friendship"; "Seasonal and time-limited; themes and dates vary by year" | Camp Khan Kids official page; App Store version history; catalog lines 251–254 |
| Earth Day collection (`earth-day-collection.md`) | "A limited-time Earth Day collection …: themed videos, printable coloring pages, and a themed book collection"; "time-limited and may not be available outside their season" | App Store version history; catalog lines 255–256 |
| Halloween collection (`halloween-collection.md`) | "a themed home screen, themed books, videos, and songs, and Halloween-inspired lessons across Letters, Reading, Math, Logic+, and Create, including coloring pages, matching games, and scene creation"; "time-limited" | App Store version history (v8.1); catalog lines 257–259 |
| Winter and holiday collections (`winter-and-holiday-collections.md`) | collections named "Winter, Kindness Month, Valentine's, and National Reading Month" adding "seasonal books, videos, and coloring pages, plus "Recommended Reads" and winter-sports book shelves"; "each is time-limited" | App Store version history; catalog lines 260–262 |

- Each spec's section 3 carries exactly these claims (per entry) as `official`; nothing else is
  official. Official sources publish **no individual item titles, counts, art, audio, mechanics, or
  dates** for any entry: every title, count, frame, and sample is `designed` with rationale.
- All four are time-limited in reality; the player models **no calendar, availability, lock, or
  countdown state** (designed): every item is always openable, and the time-limited fact lives only
  in section 3 / assumptions.

## IP rule (identical for all four)

- Original content only: no Khan Academy characters, art, voice, audio, music, or footage; no
  reproduction or imitation of any catalogued item; programmatic SVG / WebAudio / speechSynthesis
  stubs are acceptable, and no real footage or recording is needed.
- The catalogued entry titles are **traceability only**: nowhere on screen or in audio, and never in
  an accessible name, shelf name, item title, or user-visible asset key. Only the spec heading may
  carry the catalogued title with a one-line note (precedent: `specs/character-rooms-and-collections.md` line 5).
- In particular the string "Khan" must not appear in any visible text or spoken line (Camp's
  on-screen name is an original phrase, e.g. "Summer Camp!"), and the seasonal themes themselves are
  generic and usable: Earth Day, Halloween, winter, Valentine's Day, kindness, reading month, winter
  sports. Every item title, art, and sample is an original designed moment (`designed`, section 3).

## Shared format (collection-browser interactive player)

Session shape: `loading` → `title` → `home` → `grid(shelf)` → `preview(item)`; HOME in the last three.

| State | Screen | Notes |
|---|---|---|
| `loading` → `title` | soft themed backdrop → themed card + Play ≥96×96 + reset logo ≥64×64 (24 px margin) | `title` is the player's home; no HOME control; Escape no-op; `loading` has no focusables |
| `home` | themed frame + shelf cards (categories) + collection strip (theme pictogram, visited numeral, total numeral, check) + HOME | the collection home; shelf grid per "Layouts" |
| `grid(shelf)` | one shelf's item tiles in a single 3×2 grid + shelf pictogram + back + HOME | shelves hold 3–6 items, so no paging, dots, or chevrons exist in this family |
| `preview(item, sample)` | preview card + Replay + prev/next + back + HOME | `sample` ∈ {playing, paused, ended}; one 4000 ms clock |

- **Lead-in:** on Play, a 1200 ms themed reveal (frame fade 200 ms; shelf cards settle: fade 300 ms,
  translate ≤16 px, stagger 30 ms). Any input finishes it instantly (consumed); HOME cancels to
  `title`. `vo_welcome` (1.0, one-shot, ≤3.0 s) plays at 1200 ms on first Play; with a save, the
  saved shelf card soft-pulses once (400 ms; the defined `soft pulse`) after it.
- **Items:** each shelf holds 3–6 original items of the entry's documented types; ids `0…total−1` in
  shelf order, then row-major; each item = one tile + one `vo_item_{id}` line + one 4000 ms sample.
- **Preview rule (all types):** one accumulated 4000 ms sample clock (never wall-clock). Skeleton:
  0–400 in; 400–3400 the type's main beat (legend below); 3400–3700 hold; 3700–4000 check pop
  (`0→1.15→1`, 300 ms) with `sfx_chime` 0.8 at 4000 ms; the card then holds in `ended` and Replay
  pulses 3×(1→1.15→1) over 200 ms each. `vo_item_{id}` (1.0, ≤1.8 s) names the item at entry; any
  beat voice starts ≥2000 ms. Samples are automatic and non-interactive: **no right/wrong, no
  scoring, no round logic, and never another spec's game or activity** (previews show one demo beat).
- **Theme frames home:** the entry's theme is the `home` frame and `title` backdrop; frames are
  decorative, never targets except their tiles and controls.
- **Completion:** when the last unvisited item's sample ends (`visitedIds.length` reaches the total),
  that preview plays confetti ≤40 particles over 2500 ms + `sfx_chime` 0.8 + `vo_complete` (1.0,
  ≤3.5 s); then a completion panel (end panel ≤360×280, fade 250 ms) over the card with Replay
  ≥96×96 and HOME ≥64×64; the strip's check becomes a 32×32 star (star pop 300 ms), persisted while
  the save lists every id. It fires once per run; nothing unlocks or closes.
- **Replay/endcard:** a card tap or Replay (throttle 500 ms) in `ended` or mid-sample cancels audio
  and restarts the sample from 0. The completion panel is the only endcard; there is no terminal
  state — HOME always returns to `title`.

## Shared numbers and conventions (pin exactly; do not reinvent)

**Layouts and targets — single page everywhere, nothing scrolls, 320×480 up.** Shelf cards: 3
columns × up to 2 rows. Item tiles: 3 columns × up to 2 rows.

| Element | ≥1024 px | 768–1023 px | 320–767 px |
|---|---|---|---|
| Play / reset logo | ≥96×96 / ≥64×64 | same | same |
| HOME, back, prev, next, Replay | ≥64×64 | ≥64×64 | ≥64×64 |
| Shelf cards | 180×180, gap 24 | 136×136, gap 16 | 88×88, gap 12 |
| Item tiles | 160×160, gap 24 | 120×120, gap 16 | 88×88, gap 12 |
| Preview card (art) | 640×480 (art ≥320×320) | 480×360 (art ≥240×240) | 280×200 (art ≥160×160) |

- **Normal layout heights:** ≥1024 — 560 `home`, 512 `grid`, 608 `preview`; 768–1023 — 440 / 392 /
  472; 320–767 — 288 / 288 / 300 (all ≤480, so normal always fits the supported minimum).
- **Compact layouts** when the viewport is shorter than the band's requirement: ≥1024 — shelf
  120×120 gap 16, item tiles 120×120 gap 16, preview card 440×330 (art ≥240×240), chrome 64 (fits
  1024×480: home/grid 424, preview 458); 768–1023 — shelf 100×100 gap 12, item tiles 100×100 gap
  12, preview card 400×300 (art ≥200×200), chrome 64 (fits 768×480: home/grid 348, preview 412).
  320–767 has no compact layout. Below 480 px height, scale the field by 0.9 best-effort, keeping
  every target's minimum.
- **Idle:** 12,000 ms with no input → the deterministic target hint-pulses 3,000 ms and the hint line
  plays (1.0, ≤2.5 s; visual-only before the first gesture); repeats every 12,000 ms; any input
  resets the timer; no hint while a sample plays. Targets: `title` → Play; `home` → leftmost shelf
  with an unvisited item, else leftmost; `grid` → first unvisited tile in index order, else leftmost;
  `preview` → Replay.
- **Reset:** 3,000 ms hold on the title logo with a 4 px accent filling ring; early release → ring 0,
  no action; completion clears the key and memory, then ring flash 300 ms + `sfx_soft_tap` 0.5.
  Holding Enter/Space 3,000 ms on the focused logo is equivalent; a hidden tab cancels the hold.
- **Audio:** no audio before the first gesture; exactly one voice at a time (a new voice cancels the
  previous utterance); sfx may overlap. All sfx are one-shot: `sfx_tap` 0.5 (chrome; 80 ms depress),
  `sfx_soft_tap` 0.5 (reset), `sfx_open` 0.6 0.12 s (shelf), `sfx_page` 0.6 0.15 s (book flip),
  `sfx_pop` 0.6 (per shape/step), `sfx_draw` 0.4 0.2 s (coloring reveal), `sfx_tick` 0.5 0.06 s
  (step highlight), `sfx_chime` 0.8 0.8 s (sample end, completion). Voices (1.0, one-shot):
  `vo_welcome` ≤3.0 s, `vo_shelf_*` ≤1.5 s, `vo_item_*` ≤1.8 s, `vo_hint_*` ≤2.5 s, `vo_complete`
  ≤3.5 s. Optional `music_title` 0.15 loop on `title` only; stops at Play.
- **Effects (closed list — define every one used, use only these):** *depress* = scale 1→0.95→1 over
  80 ms (tile 300 ms). *pop* = 0→1 over 300 ms; *item pop* = 1→1.15→1 over 200 ms. *soft pulse* =
  1→1.04→1 over 400 ms. *hint pulse* = 1→1.12→1 per 500 ms cycle for 3,000 ms. *replay pulse* =
  3×(1→1.15→1) over 200 ms each. *sparkle* = ≤6 particles ≤40 px flying ≤80 px over 600 ms.
  *confetti* = ≤40 rect particles moving ≤120 px over 2500 ms. *fade* = opacity 0→1 or 1→0 over
  200 ms. *grid settle* = tile fade 300 ms + translate ≤16 px, stagger 30 ms inside the 1,200 ms
  lead-in. *ring fill* = 4 px accent stroke fills over exactly the 3 s hold; *ring flash* = opacity
  1→0 over 300 ms. *end panel* = centered card ≤360×280, fill `#FFFDF6`, 4 px `#3A2E24` border,
  24 px radius, fade 250 ms. *check pop* / *star pop* = scale 0→1.15→1 over 300 ms. *accent ring* =
  static 3 px `#F2994A` outline. *flip* = cover rotates about its spine 0→180° over 500 ms. *stroke
  reveal* = SVG stroke-dashoffset over ≤1600 ms. *slide* = translate 40 px→0 over 200 ms.
- **Save:** browser local storage; keys `spec.seasonalCollections.camp.v1`,
  `spec.seasonalCollections.earthDay.v1`, `spec.seasonalCollections.halloween.v1`,
  `spec.seasonalCollections.winterHoliday.v1`. Shape per entry:
  `{ "lastShelf": "<shelfId>" | null, "lastItemId": 0…total−1 | null, "visitedIds": [ints, unique,
  ascending], "updatedAt": "<ISO-8601>" }`. Save points: shelf open (writes `lastShelf`,
  `lastItemId: null`, keeps `visitedIds`), preview entry (sets `lastItemId`, adds the item once),
  completion, HOME; every save refreshes `updatedAt` and never removes a visited id. Restore: the
  saved shelf card wears the accent ring and pulses once after the lead-in; the saved item tile
  wears the same ring; nothing auto-opens; Play always starts at `title`.
- **No fail state:** no wrong answer, score, streak, timer, lock, deduction, or comparison; empty
  taps, rapid taps, multi-touch, back, and idle never lose progress; every item is always openable.
- **Input:** tap/click only — no drag gestures. First pointer only: pointer-down inside a
  (12 px-expanded) rect acquires; pointer-up within 24 px activates; a >24 px move cancels that
  gesture with no change; extra simultaneous pointers are ignored until release; same-ms tie → the
  leftmost. Overlap → nearest center, then leftmost, then topmost. >12 px from every target = empty
  tap (no state change, no sound, idle reset). Throttles: shelf taps, item taps, Replay 500 ms;
  back, prev, next, HOME 300 ms.
- **Accessibility:** every interactive element carries an invisible accessible name (e.g. "Home",
  "Reset saved progress (hold 3 seconds)", "Back to the collection", "Arts & crafts week, 4
  activities", "Previous item", "Replay preview", "16 of 16 items seen"). Visible text is content
  only — numerals/counts, book titles, letters or words in lesson moments; instructions and feedback
  are voice + pictogram. Tab order: `title` reset logo → Play; `home` HOME → shelf cards in shelf
  order; `grid` HOME → back → tiles in index order row-major; `preview` HOME → back → prev → next →
  Replay; `loading` none. Keyboard: Enter/Space activates; Escape = HOME; Backspace = back;
  ArrowLeft/Right = prev/next in `preview` (no wrap; unbound elsewhere); R = Replay.
- **Resize / background tab:** resize reflows per the layout table, preserving state, shelf, item,
  and a running sample's clock (no restart), with targets at the table's minimums and no scrolling.
  On hide, the sample clock freezes and pending audio is cancelled; on return the sample stays
  paused and Replay pulses 3,000 ms (600 ms repeat, no voice) until a replay restarts it from 0.
  Hidden time pauses the idle timer; throttled timers may delay the lead-in or hints but never lose
  progress.
- **Degradation:** no speech synthesis → all voices silent, visuals + pictograms carry every step,
  muted-speaker pictogram 48×48 for 5 s after the first Play; no AudioContext → all audio silent,
  behavior otherwise identical; storage blocked → unsaved run (the visited set works in memory; the
  reset ring still shows); missing visual asset → stub shape; missing audio → skip the clip.

## Per-entry designed concept (fixed; writers author the content tables)

Type legend — each type's main beat in the shared 4000 ms preview skeleton (see above):

| Type | Main beat (one line) |
|---|---|
| `activity` / `screenFree` (camp) | in-app: three activity steps animate in place; screen-free: paper sheet slides in, 3 numbered pictogram steps highlight at 400/1400/2400 ms |
| `video` | three-beat original animated moment (no footage) |
| `book` | cover fades in; 500 ms flip at 2000–2500; one interior page + one spoken line |
| `coloring` | outline self-draws (≤1600 ms), then two crayon fills sweep in |
| `song` | one original 4-note phrase, pictograms bouncing per note, then a color-shifted repeat |
| `lesson` | three-beat teaching demo (objects pop one by one with the item's voice) |
| `matching` | one auto-demo match: two like pictures glide together + sparkle; no input |
| `create` (scene creation) | three original shapes pop into place at 400/1400/2400 ms |

| Entry → spec file, save key | Shelves (categories) | Item set (types × counts; total) | Home frame (designed) |
|---|---|---|---|
| Camp → `camp-khan-kids.md`, `…camp.v1` | 4 weekly themes: arts & crafts, animals, friendship, water & sun (4th theme designed) | 4 per theme = 16: 12 `activity` (3/theme) + 4 `screenFree` (exactly 1/theme) | summer-camp map: tent, sun, trees; theme signpost shelf cards; strip n/16 |
| Earth Day → `earth-day-collection.md`, `…earthDay.v1` | 3: videos, coloring pages, books | 4+4+4 = 12: 4 `video`, 4 `coloring`, 4 `book` | meadow + pond + rounded globe; three station shelf cards; strip n/12 |
| Halloween → `halloween-collection.md`, `…halloween.v1` | 5: books; videos & songs; letters & reading; math & logic; create | 4/shelf = 20: 4 `book`; 2 `video` + 2 `song`; 4 `lesson` + 4 `lesson`; 2 `coloring` + 1 `matching` + 1 `create` | friendly night street: moon, porch, jack-o'-lantern (the official "themed home screen"); 5 shelf cards; strip n/20 |
| Winter/holiday → `winter-and-holiday-collections.md`, `…winterHoliday.v1` | 6: winter; kindness month; Valentine's; national reading month; recommended reads; winter sports | 4/shelf = 24: 16 `book` (2+2+2+2+4+4), 4 `video`, 4 `coloring` (1 in each of the first four shelves) | cozy snowy window ledge with string lights; 6 shelf cards; strip n/24 |

Writers own exact item ids, titles, shelf ids, `vo_item` copy, and art; the counts, types, shelves,
and totals above are fixed. Section 3 needs a `designed` row per invented count and for no-calendar.

## Verification checklist (for each independent verifier)

1. All 16 sections, in order; collection-browser substitutions declared (shelves replace levels,
   item previews replace rounds, the completion moment replaces a win condition); no terminal state.
2. Official claims quote-checked against the entry file and catalog lines 249–262 (per-entry lists in
   the table above); "time-limited"; "titles/counts unpublished"; nothing else official; no KA
   media/characters; no "Khan" on screen, in audio, or in accessible names.
3. Numbers over adjectives; every effect used appears in the defined list; no undefined effect.
4. Timeline and grid math re-derived: lead-in 1200 + 30 ms stagger; preview 4000 with check at
   3700–4000 and chime at 4000; completion confetti 2500 + panel 250; item totals 16/12/20/24 and
   per-shelf counts 3–6 (no paging); normal/compact heights fit 320×480 up with no scrolling.
5. Interaction rules airtight: 12 px expansion + nearest-center/leftmost/topmost tie, 24 px release
   window, first pointer, throttles, double-taps, empty taps, idle; previews never interactive.
6. State/transition table complete; HOME everywhere except `loading`/`title`; audio rules;
   degradation; background-tab behavior.
7. Save key/shape/save points/`updatedAt`; shelf-open save preserves `visitedIds`; resume rings;
   reset ring + keyboard hold; completion star derived from `visitedIds.length === total`.
8. Traceability: unique IDs; every FR ≥1 AC; ACs observable; blind-build checklist.
9. Accessibility: tab order per state, keyboard equivalents, accessible names, target sizes.
10. Family consistency with the four siblings and with `offline-library-kodis-suitcase.md` /
    `book-basics-book-cover.md` (numbers, effects, save conventions, no-fail rule).
11. Blind-build questions: list any that remain, with `[NEEDS CLARIFICATION]` instead of invention.
