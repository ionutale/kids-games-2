# Write specs: Book Basics series

Type: task
Status: resolved
Blocked by: 04

## Question

Write complete specs (template v1) for the nine Book Basics entries: Book Cover, Parts of a Book,
How to Read a Book, Ask While You Read, Identifying Characters, Reading Accuracy, Illustrations,
Fiction & Nonfiction, Story Structure.

## Notes

- The nine share a format; write one per entry as an interactive player (short video plus a
  comprehension interaction designed to fit the title).
- Output: `docs/khan-academy-kids-games/specs/<entry-slug>.md`.

## Answer

Resolved 2026-09-20. Nine specs written at template v1 (one writer per spec, each independently
verified by a fresh-context verifier against the shared brief's 11-point checklist). Shared
conventions and the per-entry interaction concepts are fixed in
`research/book-basics-shared-brief.md`:

- `specs/book-basics-book-cover.md` (327 lines) — 22 FRs, 14 Rs, 27 ACs; name-the-part rounds on a
  cover (picture area, title, author line, back cover) after a 42.4 s video.
- `specs/book-basics-parts-of-a-book.md` (374 lines) — 19 FRs, 12 Rs, 24 ACs; name-the-part on
  staged book scenes (front cover, spine, pages, back cover, title page) after a 56.4 s video.
- `specs/book-basics-how-to-read-a-book.md` (397 lines) — 22 FRs, 14 Rs, 30 ACs; sequencing
  "what do you do first/next?" over 4 steps (open, look at the words, turn the page, close) across
  5 rounds after a 43.6 s video.
- `specs/book-basics-ask-while-you-read.md` (380 lines) — 22 FRs, 13 Rs, 30 ACs; question-to-page
  over an original picture book ("The Red Ball"): the narrator asks who/what/where and the child
  taps the page element that answers, after a 45.6 s video.
- `specs/book-basics-identifying-characters.md` (405 lines) — 25 FRs, 15 Rs, 29 ACs;
  find-the-character across 5 scenes (2–3 characters + props) after a 51.6 s video.
- `specs/book-basics-reading-accuracy.md` (366 lines) — 22 FRs, 14 Rs, 25 ACs; four
  match-the-word rounds (voice says a word, child taps the printed word among 2–3 options) plus a
  left-to-right three-word sentence read, after a 47.4 s video.
- `specs/book-basics-illustrations.md` (339 lines) — 22 FRs, 14 Rs, 27 ACs; match-the-picture: the
  voice speaks a sentence, the child taps the picture that shows it (2–3 options), after a 44.8 s
  video.
- `specs/book-basics-fiction-and-nonfiction.md` (350 lines) — 23 FRs, 14 Rs, 30 ACs; two-bin
  "Story"/"Facts" sort of 6 items (2+1+1+1+1 across 5 rounds) after a 44.4 s video.
- `specs/book-basics-story-structure.md` (320 lines) — 22 FRs, 13 Rs, 29 ACs; order-three story
  cards (beginning/middle/end) over 4 mini-stories, with the video's bird story as the round-1
  warm-up, after a 42.4 s video.

Verification: all nine independently verified; every spec had real defects fixed — missing
Play-resume branches for a saved `activity` phase (five specs), missing success locks that allowed
double-judging between confirmation and advance, idle hints firing while the video played, voice
caps crossing chapter beats, an impossible clip-cap budget (parts-of-a-book), overlapping hit rects
(parts-of-a-book), a wrong-round AC (book-cover), and missing AC coverage for chrome, no-speech,
and accessible names. Verifiers re-derived every timeline, throttle, and clip-cap arithmetic by
hand and quote-checked official claims to the title-only facts; no Khan Academy media or characters
are reproduced. A family-wide broken relative link to the catalog
(`../khan-academy-kids-games.md` → `../../khan-academy-kids-games.md`) was found and fixed in all
14 affected specs (9 Book Basics plus 5 earlier).

No `[NEEDS CLARIFICATION]` items remain. 27 of 38 specs done; tickets 11–13 remain.
