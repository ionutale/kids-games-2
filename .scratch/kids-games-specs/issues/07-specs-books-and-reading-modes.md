# Write specs: Books and reading modes

Type: task
Status: resolved
Blocked by: 04

## Question

Write complete specs (template v1) for the three reading entries: Neat as Nine (interactive book),
Read To Me, Read by Myself.

## Notes

- Read To Me / Read by Myself are interactive players (book-reader mode with audio and word
  highlighting); Neat as Nine is an interactive counting book.
- Output: `docs/khan-academy-kids-games/specs/<entry-slug>.md`.

## Answer

Resolved 2026-09-20. Three specs written at template v1 (one writer per spec, each independently
verified — the Neat as Nine verifier's first run returned no report, so it was re-run):

- `specs/neat-as-nine.md` (326 lines) — 20 FRs, 15 Rs, 22 ACs; interactive counting book with
  original 6-page rhyme, 9 apple stickers placed into slots, first-placement-only counting (moving
  never double-counts), count-aloud voice and growing numeral.
- `specs/read-to-me.md` (324 lines) — 19 FRs, 13 Rs, 21 ACs; original 8-page early reader "The Red
  Ball" (EN + original ES translation); word highlighting synced via speech word-boundary events
  with a numeric fallback pacing formula; play/pause, tap-word replay, page turns, EN/ES toggle.
- `specs/read-by-myself.md` (300 lines) — 15 FRs, 15 Rs, 23 ACs; original 10-page early reader
  "A Bug on a Log"; no automatic narration (official), designed chrome only — page turns,
  single-word help, pips, finish/Read again; no gamification.

Verification: all 16 sections in each; per-spec verifiers quote-checked official claims against the
catalog and entry files, fixed over-claims and undefined effects, re-derived highlight timings,
sticker math, and token counts by hand, and added missing AC coverage. No `[NEEDS CLARIFICATION]`
items remain. 10 of 38 specs done (pilot + Math A/B + these three); tickets 08–13 remain.
