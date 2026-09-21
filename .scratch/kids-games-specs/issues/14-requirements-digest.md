# Extract platform requirements digest from all specs

Type: task
Status: resolved
Blocked by: 05, 06, 07, 08, 09, 10, 11, 12, 13

## Question

Read all 38 finished specs and extract every `Requirements` entry into one digest: rendering
primitives, input models, audio needs, data/persistence, progress and leveling behavior.
Classify each as common across most games or one-off. Deliverable:
`.scratch/kids-games-specs/research/platform-requirements-digest.md`.

## Notes

- AFK. This digest is the evidence base for the stack decision.

## Answer

Resolved 2026-09-21. Digest written at `research/platform-requirements-digest.md` (207 lines):
535 Requirements entries extracted from all 38 specs (509 across 36 `## 13.` sections plus the
pilot's §11 and trace-the-number-six's §12, which predate v1's section numbering), clustered into
rendering (18 clusters), input (16), audio (10), data/persistence (12), a 17-family progression
table, performance/environment (7 areas), accessibility (6 areas), and a common-core vs one-off
summary (5-part baseline + 18 named exceptions).

Verification: a fresh-context verifier re-extracted all 38 section 13s, independently counted the
same 38 specs / 535 entries, deep-sampled 12+ specs across families, and fixed 14 defects
(miscounted clusters, misattributed exceptions, a false "universal" ring-fill claim, classification
threshold inconsistencies, shared-kernel family errors). Caveats recorded in the digest: the pilot
and trace-the-number-six carry thinner Requirements sections (behaviors live in FRs/§8 prose), and
counts are §R-wording based, so a few are conservative.

Ready as the evidence base for ticket 15 (engine/stack decision).
