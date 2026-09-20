# Write specs: Songs and movement

Type: task
Status: resolved
Blocked by: 04

## Question

Write complete specs (template v1) for: Head, Shoulders, Knees, and Toes; Happy and You Know It;
Baby Shark; Yoga and movement videos; Mindfulness videos (Alo Yoga).

## Notes

- All five are interactive players: sing-along with tap-along lyrics for the songs; guided
  movement/mindfulness players for the rest. Invented mechanics marked as designed.
- Output: `docs/khan-academy-kids-games/specs/<entry-slug>.md`.

## Answer

Resolved 2026-09-20. Five specs written at template v1:

- `specs/head-shoulders-knees-and-toes.md` (308 lines) — 18 FRs, 13 Rs, 26 ACs; 4-pass sing-along
  (100→200 BPM) with full 32-row note/word grid, 8 body-part cards, tap-along judgments.
- `specs/happy-and-you-know-it.md` (325 lines) — 18 FRs, 13 Rs, 28 ACs; 4 verses (clap, stomp,
  hooray, all-three finale) at 120/120/120/100 BPM, 4 action cards, per-verse action-slot grids.
- `specs/baby-shark.md` (318 lines) — 18 FRs, 13 Rs, 27 ACs; 8-section traditional camp song
  (150→200→120 BPM), 6 shark cards, doo refrain with gesture pictograms; Super Simple/Pinkfong
  content explicitly excluded, original geometric shark art.
- `specs/yoga-and-movement-videos.md` (299 lines) — 20 FRs, 14 Rs, 22 ACs; guided routine
  (7 poses, 136 s) with count-in, hold timers and voice counts; no camera.
- `specs/mindfulness-videos-alo-yoga.md` (322 lines) — 19 FRs, 13 Rs, 20 ACs; 3 original breathing
  sessions (68/78/80 s) with phase-exact pacing; no Alo Yoga branding/content.

Verification: `head-shoulders`, `baby-shark`, `yoga`, and `mindfulness` were independently verified
by fresh-context verifiers (timing math re-derived, over-claims fixed, missing ACs added — including
multi-touch, tab-hidden, and accessible-name coverage). The Happy spec's writer subagent failed
three times and its verifier four times (empty responses), so the orchestrator wrote it directly and
then verified it by hand: fixed a faulty early-tap AC (20000 ms was 2500 ms before the next onset,
not ≤800 ms), a no-AudioContext contradiction in AC-20, added AC-26/27/28, and wording fixes.

No `[NEEDS CLARIFICATION]` items remain. 18 of 38 specs done (pilot + Math A/B + books + letters +
these five); tickets 10–13 remain.
