# Write specs: Math batch A

Type: task
Status: resolved
Blocked by: 04

## Question

Write complete game specs (template v1) for: How many marbles?, Find the toy chest with five
socks, Trace the number six. (Count and tap the ice cream cones was already upgraded to v1 by the
template lock.)

## Notes

- Sources of official behavior: `docs/khan-academy-kids-games/*.md` and
  `docs/khan-academy-kids-games.md`; designed extensions must be marked as designed.
- Output: `docs/khan-academy-kids-games/specs/<entry-slug>.md`.

## Answer

Resolved 2026-09-20. Three specs written at template v1 (one writer per spec, then verified):

- `specs/how-many-marbles.md` (294 lines) — 14 FRs, 14 Rs, 15 ACs; circles rendered as marbles on
  a tray; levels 1–10; quantity shown by collected marbles plus a numeral counter.
- `specs/toy-chest-with-five-socks.md` (278 lines) — 14 FRs, 14 Rs, 17 ACs; 3–4 open drawers with
  dice-pattern sock clusters; targets 1–6 over 8 levels; wrong taps teach via gentle reveal.
- `specs/trace-the-number-six.md` (247 lines) — 18 FRs, 13 Rs, 16 ACs; guided numeral trace with
  stroke corridor, waypoints, and three guide-fading passes; numerals 1–9 sequence.

Verification: all 16 sections present in each; Official-vs-designed tables cite only the blog
facts (spot-checked — no over-claiming); tab order, HOME-everywhere, ARIA names, numeric audio
volumes, reset-with-ring, resume-at-highest-unlocked, blind-build checklists all present.
Design ambiguities resolved by the writers are listed in each spec's assumptions section.
