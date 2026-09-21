# Platform requirements digest — Khan Academy Kids spec library

Evidence base for the engine/stack decision (ticket 15). Source: the 38 specs in
`docs/khan-academy-kids-games/specs/*.md` (the catalog entry files one level up are not specs and were not
used). Extracted 2026-09-21.

## Scope and method

- **Corpus:** all 38 specs. Extraction: for each file, the `Requirements (engine-agnostic)` section was cut
  programmatically (`awk` between that heading and the next `## `) into a working file; both were read end
  to end, plus the persistence sections (`Progress and persistence`, `State and data shapes`) for the
  data/progress tables. Total: **535 R entries**, 12–16 per spec.
- **R IDs are spec-local** and restart at `R-001` in every file; an R ID alone does not identify a
  requirement. Where this digest cites an R ID it names the spec too.
- **Heading anomalies:** 36 specs carry the section at `## 13.`; the pilot `count-the-ice-cream-cones.md`
  carries it at `## 11.` and `trace-the-number-six.md` at `## 12.`. Both were extracted and are covered.
- **Coverage caveat:** the pilot and `trace-the-number-six` predate template v1 and their §R sections are
  thinner (13 entries each); some behaviors (storage-blocked, background throttling) live in their
  non-§R rules instead (their §R already covers degraded audio and focus indicators). Likewise
  `how-many-marbles` and `neat-as-nine` state storage-blocked degradation in §FR, not §R. Counts below
  marked "§R" count the Requirements sections only; "FR-level" flags a spec whose §R is silent but a
  non-§R rule carries the behavior (the four above for storage-blocked; drawing and storytelling for
  the no-speech audio path).
- **Classification threshold:** *common* = stated in **≥19 of 38** specs (half or more); *borderline* = 3–18
  specs (called out inline); *one-off* = 1–2 specs (always named). Ambiguity is resolved toward the spec's
  explicit wording, not intent inferred across files.
- **Family shorthand used below** (issue batches, not spec language):
  *pilot* (1): count-the-ice-cream-cones · *math* (7): how-many-marbles, jar-with-more-fruit,
  smoothie-addition, toy-chest-with-five-socks, tap-the-triangles, fill-in-the-pattern,
  trace-the-number-six · *reading* (3): neat-as-nine, read-to-me, read-by-myself · *letters/videos* (3):
  letter-tracing, ollos-alphabet-videos, sight-words-videos · *songs/movement* (5): baby-shark,
  happy-and-you-know-it, head-shoulders-knees-and-toes, yoga-and-movement-videos,
  mindfulness-videos-alo-yoga · *Book Basics* (9): all `book-basics-*` · *create* (2):
  drawing-and-coloring, storytelling-and-voice-recording · *logic/home* (4): matching-games,
  memory-games, character-rooms-and-collections, offline-library-kodis-suitcase · *seasonal* (4):
  camp-khan-kids, earth-day-collection, halloween-collection, winter-and-holiday-collections.

## Rendering primitives

| # | Cluster | Count | Specs | Class |
|---|---|---|---|---|
| 1 | 2D vector scene/art/path foundation | **38/38** | all (pilot and 12 others: "vector **or raster** sprites") | common — hard baseline |
| 2 | Vector-or-raster sprite allowance | 13/38 | pilot, math×6 (all but trace-the-number-six), matching, memory, neat-as-nine, read-to-me, read-by-myself, sight-words-videos | borderline |
| 3 | Text runs, numerals, word cards, letterforms as rendered content | 28/38 §R | songs×3 (lyric runs), reading×3, letters/videos×3, Book Basics×6 (bb-book-cover, bb-fiction, bb-identifying name tags, bb-illustrations, bb-reading, bb-story slot numerals), pilot + math×5 (how-many-marbles, jar, smoothie, toy-chest, trace-the-number-six), seasonal×4 (numerals + short titles), offline-library, mindfulness, yoga | common |
| 4 | Per-word / per-token highlight synced to narration | 5/38 | baby-shark, happy-and-you-know-it, head-shoulders-knees-and-toes (per-word lyric highlights), read-to-me, sight-words-videos | borderline |
| 5 | Effect-animation catalogues in §R (R-002 enumerates "section 9 effects") | 23/38 | all Book Basics×9, songs×3, seasonal×4, logic/home×2 (character-rooms, offline-library), letters/videos×2 (ollos, sight-words), read-to-me, mindfulness, yoga | common among the 23 "player" specs |
| 6 | Confetti and/or particle bursts | **28/38** | 21 confetti §R (Book Basics×9, songs×3, seasonal×4, logic/home×2, fill-in-the-pattern, read-to-me, yoga) + 7 particle bursts (pilot; math×5: marbles, jar, smoothie, toy-chest, tap-the-triangles; neat-as-nine); fill-in's ≤40-particle effect is its confetti; math bursts cap at ≤40 particles | common |
| 7 | Ring fill / flash (progress and hold feedback) | 23/38 §R | 18 player specs (songs×3, Book Basics×9, seasonal×4, character-rooms, offline-library) + mindfulness, ollos, read-to-me, sight-words, yoga; the hidden reset hold is universal in §Progress (38/38; at §10 for 36 specs, §9 for pilot and trace), and 32 of the 38 §Progress sections name a filling ring (the other 6 name a checkmark, or the pilot's shimmer) | common |
| 8 | Highlight overlay / highlight ring / underline / select ring | 16/38 §R | Book Basics×9, songs×3, fill-in, character-rooms, read-to-me, sight-words | borderline |
| 9 | Card flip (incl. scaleX face swap at midpoint) | 6/38 | memory (full flip animation), bb-book-cover, earth-day, halloween, offline-library, winter | borderline |
| 10 | Mirrored + single-fill-silhouette glyph variants | 2/38 | matching, memory | one-off |
| 11 | Tracing / stroke rendering | 9/38 | trace-the-number-six (round caps/joins, smooth curves), letter-tracing (round caps/joins, guide lines), drawing + storytelling (variable-width round-capped polylines), ollos (procedural stroke reveal from path data, font-glyph fallback), stroke-reveal effects in earth-day, halloween, offline-library, winter | borderline |
| 12 | Canvas drawing tools + thumbnail/sticker layer + 2048×1536 PNG export | 2/38 | drawing, storytelling | one-off |
| 13 | Pictogram-first, no-visible-text UI | 3/38 | drawing, storytelling ("render no visible text; all UI is pictograms and art"), character-rooms ("no visible word shall appear") | borderline |
| 14 | Stage/content generated at runtime from data records ("renderable at runtime") | 18/38 | songs×3 (note data), Book Basics×8 (Chapter/Beat; all but bb-parts), seasonal×4 (Item + timeline), mindfulness (Session+Timeline), sight-words (WordVideo+Timeline), offline-library (Item) — pre-rendered files allowed only if timings match | borderline |
| 15 | One clock / timeline driving phases; video-stage overlays | 9/38 clocks; 5/38 video overlays | clocks: songs×3, bb-ask, bb-parts, bb-story, mindfulness, sight-words, yoga; overlays: bb-book-cover, bb-how-to-read, bb-identifying, bb-illustrations, bb-story | borderline |
| 16 | Specialized stage art | 2/38 | mindfulness (scalable circular pacer + numerals), yoga (pictogram figure, keyframed pose transitions, breathing) | one-off |
| 17 | Per-element hit rectangles as render geometry | 16/38 §R | Book Basics×9, seasonal×4, read-by-myself, read-to-me, offline-library | borderline |
| 18 | Deterministic content ("no runtime randomness") | 7/38 | fill-in-the-pattern, letter-tracing, matching, memory, read-by-myself, smoothie, trace-the-number-six | borderline |

## Input models

| # | Cluster | Count | Specs / notes | Class |
|---|---|---|---|---|
| 1 | Tap / click as the primary verb | **38/38** (32 §R contain tap/click; 6 use pointer-first wording: drawing, fill-in, letter-tracing, read-by-myself, storytelling, trace) | all | common — baseline |
| 2 | Keyboard focus + activation for every interactive element | **38/38** | all; some also require visible focus indicators (see Accessibility) | common — baseline |
| 3 | Escape = HOME | 23/38 §R (27/38 anywhere; 11 specs do not bind Escape: pilot, trace-the-number-six, how-many-marbles, jar-with-more-fruit, fill-in-the-pattern, tap-the-triangles, toy-chest-with-five-socks, letter-tracing, matching, memory, neat-as-nine) | Book Basics×9, songs/movement×5, seasonal×4, character-rooms, offline-library, ollos, sight-words, read-to-me | common |
| 4 | Other key bindings | Space = play/pause 10; R = replay 15; ArrowLeft/Right or arrows 10; Backspace = back 5 (seasonal×4 + offline-library); C = case toggle 1 (ollos); D = Done 1 (yoga) | see §R per spec | mixed |
| 5 | Double-tap | 15/38 | Book Basics×8 (all but bb-parts), seasonal×4, character-rooms, offline-library, read-to-me | borderline |
| 6 | Multi-touch pointer input | 16/38 §R | Book Basics×8 (all but bb-parts), seasonal×4, character-rooms, offline-library, drawing, storytelling | borderline |
| 7 | Explicit pointer-concurrency rule (single-pointer semantics, earliest-wins, first-pointer-wins, ignore extra contacts) | 9/38 | bb-ask, bb-parts, ollos, yoga (single-pointer semantics); trace (earliest touch-down, leftmost on tie), letter-tracing (ignore extra contacts); matching, memory (first-pointer-wins); storytelling (FR-032, earliest pointer owns the canvas) | borderline |
| 8 | Drag / stroke / swipe gestures | 7/38 | neat-as-nine (drag/drop), smoothie (drag, hold, fly-to-slot, 8 px threshold, 24 px drop tolerance), read-to-me (swipe), trace, letter-tracing, drawing, storytelling (pointer down/move/up/cancel) | borderline |
| 9 | Explicitly tap-only ("no drag gestures are required") | 14/38 | Book Basics×8 (all but bb-parts), seasonal×4, character-rooms, offline-library | borderline |
| 10 | Coalesced pointer events | 4/38 | drawing, storytelling, letter-tracing, trace | borderline |
| 11 | Hit-testing with numeric tolerances | 11/38 §R state numbers; 29/38 mention hit-testing | 12 px: bb-ask, bb-parts, matching, memory, jar, yoga; ≥8 px: fill-in, neat, toy-chest, tap-the-triangles; 8 px drag + 24 px drop: smoothie; rest defer to per-spec §7 rule tables | mixed |
| 12 | Nearest-center resolution on tie | 4/38 | bb-ask, bb-parts, matching, memory | borderline |
| 13 | Interaction throttles | 2/38 explicit numeric sets | matching (250 ms pick, 500 ms flourish, 500 ms replay, 3 s logo hold); memory (350 ms flip, 250 ms re-tap, 800 ms match, 1800 ms mismatch, 500 ms replay, 3 s hold); trace carries 96/56/120 px and 600/500 ms rules in FR/AC | one-off |
| 14 | 3 s hold-to-reset gesture | 7/38 §R name it (drawing, fill-in, letter-tracing, matching, memory, read-by-myself, storytelling); reset itself is in all 38 §Progress sections; all 38 give a hold-Enter/Space keyboard equivalent (33 state it in §Progress; pilot, fill-in, smoothie, tap, toy state it elsewhere) | mixed |
| 15 | Microphone input (`getUserMedia` + `MediaRecorder`, gesture-gated, denial tolerated) | **1/38** | storytelling (R-007; FR-016/FR-021) | one-off |
| 16 | Keyboard equivalents for gestures | 5/38 | smoothie (pick-up/place), trace (Enter/Space completes a stroke), drawing (canvas cursor + reset hold), storytelling (canvas cursor, recording start), read-by-myself (reading-order word focus) | borderline |

## Audio

| # | Cluster | Count | Specs / notes | Class |
|---|---|---|---|---|
| 1 | No audio before the first user gesture; never required to proceed | **38/38** (37 §R + storytelling FR-029) | all | common — baseline |
| 2 | Speech synthesis for voices (or provided clips) with fallback | 26/38 §R explicitly name synthesis; 12 §R do not (voice clips implied) | not stating synthesis: pilot, math×6, neat, matching, memory, drawing, storytelling; wording varies ("recorded audio or speech synthesis", "provided clips") | common |
| 3 | One voice at a time (serial voices; new voice cancels previous / never overlap) | 23/38 §R (incl. storytelling R-006 and read-by-myself R-004) + trace §8/FR | variants: "one voice clip at a time" (bb-ask etc.), "at most one voice clip" (drawing, storytelling), "cancels the previous" (camp, earth-day, ollos), "never overlap" (yoga, read-to-me); ducking-only songs don't state it in §R (baby-shark, happy, head-shoulders) | common |
| 4 | One-shot sfx that may overlap voice | 35/38 §R name sfx; read-by-myself requires single one-shot clips and no looping audio | not naming "sfx": trace, letter-tracing, neat (still require one-shot clips) | common |
| 5 | Optional single looping music track with a numeric cap | 24/38 §R mention music | caps 0.15–0.25: 0.15 in most (camp, bb-parts, jar, smoothie, matching, memory, fill-in, tap, toy, trace, letter-tracing, drawing, storytelling, offline-library, winter, halloween on `title` only); 0.2 (mindfulness, ollos, read-to-me, sight-words, yoga); 0.25 (how-many-marbles, neat-as-nine); pilot says "low volume" with no number; read-by-myself explicitly none; songs×3 render melody from note data instead | common |
| 6 | Ducking rule (voice over sfx/music) | 11/38 | songs×3 + Book Basics×8 (bb-parts instead cancels the previous utterance) | borderline |
| 7 | Explicit numeric mix levels | voices at 1.0 in 8 §R (camp, mindfulness, offline-library, ollos, read-to-me, sight-words, winter, yoga); bb-parts cites "voices at 0.7/1.0"; the rest cite "section 9 volumes" | §9 audio tables carry per-cue voice/sfx/music numbers; this digest only lists what §R states | borderline |
| 8 | Melody synthesized at runtime from note data (pre-rendered clips only if they match BPM/onsets) | 3/38 | baby-shark, happy-and-you-know-it, head-shoulders-knees-and-toes | borderline |
| 9 | Audio degradation: skip failed clip, visual-only/no-speech path, silent when no AudioContext, muted pictogram | **38/38** (36 §R explicit; drawing and storytelling state the no-speech/visual-only path in §FR — FR-025/FR-030, with storytelling R-016 also covering playback failure) | e.g. collections add a muted pictogram; Book Basics "no-speech fallback" | common — baseline |
| 10 | Voice recording playback (counts as a voice; audio in IndexedDB) | **1/38** | storytelling | one-off |

## Data and persistence

| # | Cluster | Count | Detail | Class |
|---|---|---|---|---|
| 1 | One small JSON save object in browser local storage, versioned key | **38/38** | key pattern `spec.<name>.v1`; 25 standalone keys + 9 `spec.bookBasics.*` + 4 `spec.seasonalCollections.*`; no accounts, no network | common — baseline |
| 2 | `updatedAt` ISO-8601 refreshed on every save | **38/38** | stated in every §Progress section | common — baseline |
| 3 | Blocked/full storage degradation (run unsaved in memory) | 34/38 §R + 4 FR-level (pilot, how-many-marbles, neat, trace) | wording: "tolerate blocked storage", "run unsaved", "tolerate blocked or full storage" | common — baseline |
| 4 | Offline: no network requests after initial load | **38/38** | every §R | common — baseline |
| 5 | Save points | all 38 | level/round completion and HOME fire everywhere; patterns by family: level fire + HOME (math/pilot), section/verse entry + celebration + HOME (songs), phase/round entry + completion + HOME (Book Basics), shelf/item entry + completion + HOME (seasonal, offline-library), page turn + completion + HOME (reading), hold completion + celebration + HOME (yoga), clip end/switch + HOME (ollos, sight-words, mindfulness), level/letter pass completion + HOME (trace, letter-tracing), debounced completed action (drawing, storytelling), clip commit immediate (storytelling) | common |
| 6 | Reset: hidden 3 s hold on the title logo/emblem clears the key | **38/38** §Progress (7 also state it in §R; all 38 give a hold-Enter/Space keyboard equivalent — 33 stated in §Progress, 5 elsewhere) | no confirmation prompts (non-readers) | common — baseline |
| 7 | "Deliberately not stored" list (mid-clock positions, taps, timings, audio settings, PII) | **38/38** | every §Progress section | common — baseline |
| 8 | Single-key ownership ("no shared kernel", no cross-entry state) | 11/38 state it explicitly | songs×3, logic/home×2, seasonal×2 (halloween, winter), create×2, letter-tracing, trace-the-number-six; the design is one standalone key per spec | common by design |
| 9 | IndexedDB for binary/audio blobs | **1/38** | storytelling: local-storage JSON + IndexedDB `clips` store (≤15 s, ≤256 KB per clip at 128 kbps); missing blob becomes an empty slot | one-off |
| 10 | Debounced saves | 2/38 | drawing, storytelling: leading + trailing 5 s debounce per completed action; clips written immediately | one-off |
| 11 | Export to file | 2/38 require it | drawing, storytelling: 2048×1536 PNG via download or Web Share file sheet; failure degrades without ending the session | one-off |
| 12 | Download/save APIs forbidden | **1/38** | earth-day: no print, download, or file-save API at runtime | one-off |

## Progress and leveling

| Family | Model | Stored | Resume behavior |
|---|---|---|---|
| pilot + math×6 (levels) | `highestUnlocked` + `levelsCompleted`/`roundsCompleted` + `updatedAt` | unlocked level and count, monotonic | Play resumes at `highestUnlocked` (level 1 first run); no mid-level state |
| trace-the-number-six | `highestUnlocked` + `completedLevels` (1–9) | same level model | Play resumes at `highestUnlocked`, pass 1; mid-pass state not stored |
| songs×3 | `lastSection`/`lastVerse` + `completed` | last entered section/verse, completion flag | Play plays a lead-in then the saved section; `completed` resets to section 1 |
| Book Basics×9 | `phase` (video/activity) + `roundIndex` (0–4) + `completed` | phase, round, flag | Play resumes at saved phase/round (video not replayed); `completed` restarts at chapter 1 |
| seasonal×4 | `lastShelf`/`lastItemId`/`visitedIds` | last shelf, last item, visited id set (unique, ascending) | Play always starts at `title`; rings mark the saved shelf/item; never auto-opens |
| offline-library | `lastCategory`/`lastItemId`/`visitedIds` | same collection model (30 items, 5 categories) | Play at `title`; saved pocket/item ringed |
| character-rooms | `earned` per character (0–6) + `introSeen` | earned counts, intro flag | Row opens first; shelves/grids rebuild from `earned`; no in-flight state |
| read-to-me | `bookId` + `lastPage` + `completed` | current book, page, flag | Play resumes page; `completed` restarts at page 1 |
| read-by-myself | `lastBookId` + `books{lastPage, finished}` | per-book page/finished | Play opens saved book/page, or finished screen |
| neat-as-nine | `highestPageUnlocked` + `bookCompleted` | unlocked page, flag | Read opens unlocked page with deterministic backfill |
| letter-tracing | `completed[]` glyphs + `current` | per-letter completions, current glyph | Play resumes `current`, pass 1; mid-letter state not stored |
| ollos | `letter` + `case` | last watched clip/case | Play opens the saved clip from 0; playhead never stored |
| sight-words | `lastWordId` + `watchedIds` | last word, watched set | Home Play starts `lastWordId`; all 12 always selectable |
| yoga | `lastDonePoseId` (or warmup) | last completed pose | Play opens that pose at demo t=0; no mid-hold resume |
| mindfulness | `lastSessionId` | one of 3 session ids | Play starts saved session; no locks |
| create×2 (sandbox) | no progress model; `current` work + `gallery` + tool/color (+ `sceneIndex` for storytelling) | in-progress artwork/gallery, tool state; storytelling also audio clips | Play resumes `current` work if non-empty, else picker/new story; no fail state |

## Performance and environment

- **Frame rate:** ≥30 fps with target 60, at 1024×768 on a mid-range 2020 tablet — **38/38**, including effect-heavy moments
  (sparkles, confetti, page turns, stroke reveal, pacer scaling, 16 face-up cards).
- **Viewport:** portrait 768×1024 ↔ landscape 1366×768 scale-without-state-loss is the stated baseline (33 specs say
  "scale from 768×1024"; all 38 state a resize/scale requirement). **15/38 additionally address 320×480**: 7 require
  layouts that scale/support down to it (camp, earth-day, halloween, winter, offline-library, drawing, storytelling);
  8 more require no scrolling down to it (fill-in, jar, letter-tracing, matching, memory, read-by-myself,
  tap-the-triangles, toy-chest). **13/38 require "no scrolling"** at supported sizes; seasonal specs add compact-fit
  rules. No spec requires a fixed canvas size.
- **Background tabs:** 36/38 §R require tolerating throttled timers (pilot and trace at FR level; storytelling's variant
  commits/closes a recording and suspends output). Common behavior: pause/freeze the clock, never lose progress,
  hints may fire late; expired timers run once on restore in math games.
- **Camera / microphone / network:** offline with no network after load — 38/38. Explicit "request no camera,
  microphone, or network access at runtime" — 14/38 §R (Book Basics×7, seasonal×4, offline-library, character-rooms,
  yoga). Microphone required — storytelling only. 23 specs are silent (their interfaces never need camera/mic).
- **Print / download APIs:** forbidden in earth-day (1); required export in create×2.
- **Original assets required in §R:** songs×3, character-rooms, letter-tracing (5); the whole library is original-assets-only
  per the map.
- **Platform form factor:** browser-based, touch-first, tablet in both orientations, mouse/click and keyboard also first-class;
  mic policy is the only permission; offline-capable after load; no accounts/profiles.

## Accessibility

- **Keyboard focus and activation:** 38/38, every interactive element; invisible accessible name on every interactive
  element 38/38 (read-by-myself additionally requires a group label on the pips and word-by-word reading-order focus).
- **Target sizes:** ≥64 CSS px named in 15 §R (character-rooms, pilot, trace, yoga, math×6, letters/videos×2,
  neat-as-nine, create×2); ≥44 CSS px named in 4 (fill-in sequence row, ollos, read-by-myself, yoga). Documented
  exceptions: 48×48 swatch (drawing, storytelling) and 64×48 page thumbnail (drawing), Play ≥112, chrome ≥72 (drawing,
  storytelling, letter-tracing); read-by-myself: words ≥44×48, chrome ≥64, primary ≥96, one step larger for preschool.
- **Focus indicators:** 14/38 §R; 4 px at ≥3:1 contrast in 6 §R (drawing, letter-tracing, neat, ollos, storytelling,
  trace), plus the pilot in §6 (its R-010 says "visible focus indicators" without the number).
- **Keyboard equivalents:** Escape = HOME 23 §R (27 anywhere); Backspace = back 5; arrows 10; Space 10; R = replay 15;
  C/D one-offs; 3 s hold reset has a keyboard equivalent in all 38; gesture/keyboard equivalence in 5 (smoothie pick-up/place,
  trace completes a stroke from the keyboard, drawing/storytelling canvas cursor, read-by-myself reading-order focus).
- **Non-text operation:** drawing, storytelling, character-rooms require pictogram-only UI; yoga restricts visible text
  to content (pose name, countdown, title); trace renders only numerals as visible text.
- **Focus order:** explicit §6 tab order in 6 §R (seasonal×4, character-rooms, offline-library); the rest specify tab order elsewhere.

## Common core vs one-offs (summary)

**Presumptive baseline the stack must cover (common, ≥19/38):**

1. 2D vector rendering (38/38) with animation timelines, confetti/particles (28/38), rendered text and numerals
   (28/38), rings (23/38; highlight overlays 16/38, borderline), resize 768×1024↔1366×768, ≥30/60 fps at 1024×768.
2. Tap/click plus full keyboard focus/activation and invisible accessible names on everything; Escape = HOME mostly;
   hit-testing (29/38 §R) with explicit per-spec tolerances (11/38 §R give numbers: 12 px and 8 px recur; per-element
   hit rectangles 16/38 §R, borderline) and tie rules where stated.
3. Local storage single versioned JSON key per spec (`spec.*.v1`) with `updatedAt`, blocked-storage degradation to
   in-memory, offline after load, hidden 3 s reset hold, no accounts.
4. Speech-or-clip voices, one voice at a time with sfx overlap, optional capped music loop, no audio before a
   gesture, graceful audio degradation (skip clip / visual-only / silent).
5. Background-tab throttling tolerance: pause, no progress loss, late hints.

**Exceptions the stack must also support (named):**

| Exception | Specs | Why it matters |
|---|---|---|
| Runtime-generated stage from data records (chapters, previews, songs, word videos) | 18/38: Book Basics×8, seasonal×4, songs×3, mindfulness, sight-words, offline-library | Data-driven scene/timeline runtime, not per-item code |
| Drag/stroke/swipe input with down/move/up/cancel and coalesced events | 7/38: neat-as-nine, smoothie, read-to-me, trace, letter-tracing, drawing, storytelling | Pointer capture + stroke pipeline; elsewhere "no drag required" |
| Freehand canvas + variable-width polylines + stickers + 2048×1536 PNG export (download/Web Share) | drawing, storytelling | Canvas/file/Share APIs; 1024×768 artwork units with inverse transform |
| Pointer-concurrency rules (single-pointer semantics, earliest/first-pointer wins, ignore extra contacts) | 9/38: bb-ask, bb-parts, ollos, yoga, trace, letter-tracing, matching, memory, storytelling | Multi-touch arbitration policy |
| Microphone capture + playback + IndexedDB blob storage | storytelling | Only permission-bearing spec; clip budget ≤15 s/≤256 KB; recording suspends output |
| Runtime melody synthesis from note data (BPM/word-onset matching) | songs×3: baby-shark, happy-and-you-know-it, head-shoulders-knees-and-toes | Web Audio scheduling; ducking rule |
| OCR-free narration sync: TTS word-boundary events → token highlighting; single-token replay; fallback pacing | read-to-me, sight-words | TTS boundary API dependency with a timing fallback |
| Card-flip transform (scaleX with face swap at midpoint) | memory (+ flip effects in bb-book-cover, earth-day, halloween, offline-library, winter) | 3D/scaleX transform support |
| Mirrored + single-fill silhouette glyph variants | matching, memory | Art pipeline variants |
| Keyframed pose figure / breathing animation; scalable circular pacer | yoga; mindfulness | Specialized vector animation stages |
| Letterform/stroke path data with font-glyph fallback | ollos | Stroke-data format + fallback |
| Deterministic content generation (no runtime randomness) | 7/38: fill-in, letter-tracing, matching, memory, read-by-myself, smoothie, trace | Seeded/fixed content generation |
| 320×480 support (down-scale or no-scroll) | 15/38 (see Performance) | Wider viewport envelope than the 768-wide baseline |
| 3 s continuous hold gestures with ring feedback and keyboard equivalent | matching, memory, drawing, fill-in, letter-tracing, read-by-myself, storytelling (+ reset in all 38) | Long-press arbitration; hidden reset affordance |
| Numeric volume/ducking mix | 11/38 ducking; caps 0.15/0.2/0.25; voices 0.7–1.0 | Duck envelope, not just clip playback |
| Export/file APIs forbidden | earth-day | Must not trigger download/print/save |
| "Render no visible text" / pictogram-only UI | drawing, storytelling, character-rooms | Sound/art-only UX contract |
| No fail state / no scoring | stated in §R by bb-identifying and earth-day; the design is universal (no spec defines a fail state) | Nothing gates progress on success |
