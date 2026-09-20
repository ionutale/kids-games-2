# Book Basics (ticket 10) — progress ledger

Ticket: `.scratch/kids-games-specs/issues/10-specs-book-basics.md`
Shared brief: `.scratch/kids-games-specs/research/book-basics-shared-brief.md`
Pattern: one writer subagent per spec, then one fresh-context verifier per spec (tickets 05–09 pattern).

## Writer status (2026-09-20) — all nine written

| Spec | Lines | FRs | Rs | ACs |
|---|---|---|---|---|
| book-basics-book-cover | 327 | 22 | 14 | 27 |
| book-basics-parts-of-a-book | 374 | 19 | 12 | 24 |
| book-basics-how-to-read-a-book | 397 | 22 | 14 | 30 |
| book-basics-ask-while-you-read | 380 | 22 | 13 | 30 |
| book-basics-identifying-characters | 405 | 25 | 15 | 29 |
| book-basics-reading-accuracy | 366 | 22 | 14 | 25 |
| book-basics-illustrations | 339 | 22 | 14 | 27 |
| book-basics-fiction-and-nonfiction | 350 | 23 | 14 | 30 |
| book-basics-story-structure | 320 | 22 | 13 | 29 |

Note: identifying-characters was left truncated (sections 1–5, `<!-- APPEND-1 -->`) by an
interrupted writer from the prior session; a resumed writer finished it (402 lines at write time;
405 after verification).

## Verification results — all nine FIXED by fresh-context verifiers

- book-cover — 17 defects + AC-25/26/27; resume-branch contradiction, per-part teach table
  split, AC-10 named the wrong round.
- parts-of-a-book — 24 defects; overlapping hit rects, impossible clip-cap budget, resume
  semantics aligned to the family.
- identifying-characters — 8 defects + FR-025, AC-28/29; cross-ref fix, chapter-dot spec, writer
  seam checked.
- how-to-read-a-book — 11 defects + AC-25–30; resume branch, idle-while-playing, catalog link.
- ask-while-you-read — 11 defects + AC-28/29/30; success lock, round-2 nesting made deterministic.
- reading-accuracy — 18 defects; success lock, resume branch, teach-line count.
- illustrations — 13 defects + AC-25–27; resume branch, O5 over-claim removed, AC-09 fixed.
- fiction-and-nonfiction — 9 defects; resume branch, celebration timing, `close` effect defined.
- story-structure — 14 defects + AC-27–29; slide bound, no-speech chip sizing, step guards.

Family-wide fix: broken catalog link `../khan-academy-kids-games.md` →
`../../khan-academy-kids-games.md` in all 14 affected specs (9 Book Basics + baby-shark, yoga,
mindfulness, happy, sight-words, head-shoulders).

## Finish checklist

- [x] all 9 specs complete (16 sections, no `[NEEDS CLARIFICATION]`)
- [x] all 9 independently verified (brief's 11-point checklist)
- [x] ticket 10 Answer updated + status resolved
- [x] map.md Decisions updated (27 of 38)
- [x] commits: ticket 08 → `0b6cef2`, ticket 09 → `842177d`, ticket 10 → committed with this file
