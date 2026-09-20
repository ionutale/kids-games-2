# Book Basics — shared brief for the nine specs (ticket 10)

Working artifact for writers and verifiers. Not a spec; the specs are standalone.

## Official facts (identical for all nine; verified against the entry files and the catalog)

- Each entry is one of the nine "Book Basics" videos named in the app's official version history
  (v8.1.3); the series covers foundational book and reading concepts.
- Official sources publish the video titles only — **no per-video descriptions**. The focus implied
  by each title is an inference, **not** an official description.
- Entry files: `docs/khan-academy-kids-games/book-basics-<slug>.md`; catalog section:
  `docs/khan-academy-kids-games.md` lines 229–233.
- Everything beyond the title/series fact is `designed` with rationale. All art, video, voice, and
  audio must be original; no Khan Academy media or characters.

## Shared format (interactive player — short video + comprehension interaction)

Every spec follows template v1's 16 numbered sections and fidelity rules, with this session shape:

1. `title` — Play ≥96×96, reset logo ≥64×64, original decorative scene.
2. `video` — an original programmatic animated video (no real footage needed; explicit stub policy),
   3 chapters with exact timings, pause/replay chrome. Target total 40–60 s; each spec fixes its
   own exact storyboard and chapter timings.
3. `activity` — **5 rounds** of the entry's comprehension interaction (per-entry concept below),
   each round: prompt (voice) → response targets → gentle feedback. Wrong taps teach and never
   punish; no scores; rounds advance on success; no fail state.
4. `celebrating` — 2500 ms confetti + chime + praise; `endcard` — Replay + HOME.

### Shared numbers and conventions (do not reinvent; keep families consistent)

- Lead-in 2000 ms after Play; 1200 ms between chapters; auto-advance at chapter end.
- Idle hint after 12 s of no input (`title`, `paused`, `endcard`): pulse Play/Play-Pause/Replay,
  `vo_hint`; any input incl. empty-space taps resets the timer.
- Reset: 3 s hold on the title logo with a filling ring + keyboard hold; clears the save.
- Input: tap/click only (no drag in this series — if a spec uses drag it needs the tap alternative);
  12 px hit-rect expansion; nearest-center, then lowest-index tie rule; first pointer wins, extra
  pointers ignored; empty tap = no change + idle reset.
- Targets ≥96×96 CSS px at ≥1024 px wide, ≥80×80 at 768–1023 px (audience 2–8); chrome ≥64×64.
- Audio: no audio before the first user gesture; numeric volumes; one-shot/loop labels; a new voice
  clip cancels the previous utterance; degradation: no speech → visual-only prompts, no audio
  context → silent, storage blocked → run unsaved; background-tab throttling documented.
- Effects per siblings: highlight, pop, bounce, soft pulse, hint pulse, jiggle, depress, sparkle
  (≤6 particles), confetti (≤40, 2500 ms), fade, ring fill/flash, end panel; each defined with
  numbers. Audio keys per siblings: `sfx_tap` 0.5, `sfx_soft_tap` 0.5, `sfx_ding` 0.8 (300 ms
  throttle), `sfx_chime` 0.8; voices 0.7 (teach) / 1.0 (prompt, praise, hint); optional
  `music_title` loop at 0.15; duck melody bus 0.5→0.4 for 120 ms during teach voices.
- Every interactive element carries an invisible accessible name; the only visible text is content
  (words being taught are content); instructions via voice + pictogram.
- Same multi-touch, tab-order, keyboard (Enter/Space, Escape = HOME), and resize rules as the
  sibling specs; tab order listed per state.

### Progress (shared shape)

- Key: `spec.bookBasics.<slug>.v1` (e.g. `spec.bookBasics.bookCover.v1`).
- Shape: `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- Save points: phase/round entries, completion, HOME; `updatedAt` refreshed each save.
- Play resumes at the saved phase and round; when `completed` is true, Play starts at the video.
- Deliberately not stored: clock position, tap history, judgments, settings, anything identifying.

## Per-entry designed concept (fixes the interaction; writers fully specify content)

| Slug | Video focus (designed inference from title) | Comprehension interaction (designed) |
|---|---|---|
| `book-basics-book-cover` | what a cover is and what a cover shows | name-the-part: tap the named cover part (picture area, title, author name, back cover) |
| `book-basics-parts-of-a-book` | the physical parts of a book | name-the-part on an open book: front cover, spine, pages, back cover, title page |
| `book-basics-how-to-read-a-book` | handling and reading steps | sequence: "what do you do first/next?" — pick among 2–3 action pictures (4 steps) |
| `book-basics-ask-while-you-read` | asking questions as you read | question-to-page: a page is shown, the voice asks who/what/where, child taps the page element that answers |
| `book-basics-identifying-characters` | who the characters in a story are | find-the-character: in a scene, tap the named character (2–3 characters + props) |
| `book-basics-reading-accuracy` | reading the words that are printed | match-the-word: the voice reads a word, child taps the matching printed word (2–3 options), then left-to-right order for a 3-word sentence |
| `book-basics-illustrations` | pictures show what words say | match-the-picture: the voice says a sentence, child taps the picture that shows it (2–3 options) |
| `book-basics-fiction-and-nonfiction` | stories vs facts | two-bin sort: tap a book/item then tap "Story" or "Facts" (6 items) |
| `book-basics-story-structure` | beginning, middle, end | order-three: tap 3 story-picture cards in the right order (4 mini-stories) |

Writers must author: the exact 3-chapter storyboard (chapter copy, on-screen content, timings,
original art guidance), the 5-round content tables (prompt copy, correct target, distractors,
illustration guidance), and all sections — with every claim marked `official` or `designed`.

## Verification checklist (for the independent verifier)

1. All 16 sections, in order; interactive-player substitutions declared.
2. Official claims quote-checked against the entry file and the catalog (title + series + v8.1.3 +
   "titles only, no descriptions"); nothing else claimed official; no KA media/characters.
3. Numbers over adjectives; no undefined effects; every effect used is defined.
4. Timeline math re-derived: lead-in + 3 chapters + 5 rounds + celebration; chapter timings sum to
   the stated total; round counts and order consistent across tables, FRs, and ACs.
5. Interaction rules airtight: hit testing, 12 px tolerance + tie rule, round advance, wrong-tap
   teach, double-tap, multi-touch, idle; the per-entry concept matches the brief.
6. States/HOME/transition table complete; audio rules; degradation; tab throttling.
7. Progress key/shape/save points/`updatedAt`/resume/reset ring + keyboard; shared shape respected.
8. Traceability: unique IDs; every FR ≥1 AC; ACs observable; blind-build checklist.
9. Accessibility: tab order per state, keyboard equivalents, accessible names, target sizes.
10. Family consistency with the nine siblings and the existing v1 specs.
11. Blind-build questions: list any that remain.
