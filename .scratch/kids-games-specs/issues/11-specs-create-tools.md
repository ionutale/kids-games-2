# Write specs: Create tools

Type: task
Status: resolved
Blocked by: 04

## Question

Write complete specs (template v1) for: Drawing and coloring, Storytelling and voice recording.

## Notes

- Both are sandbox-style activities; specs must cover tools, canvas behavior, gallery/save, and
  export.
- Output: `docs/khan-academy-kids-games/specs/<entry-slug>.md`.

## Answer

Resolved 2026-09-20. Two specs written at template v1:

- `specs/drawing-and-coloring.md` (401 lines) — 31 FRs, 16 Rs, 29 ACs; sandbox creative tool:
  28 original pages (24 coloring pages across 4 sets + 4 backgrounds), 16 stickers, 10 colors plus
  a rainbow crayon, crayon/brush/eraser, region fills, undo (20 deep), Gallery (12, FIFO), PNG
  export via share sheet or download, save `spec.drawingAndColoring.v1`.
- `specs/storytelling-and-voice-recording.md` (420 lines) — 36 FRs, 16 Rs, 39 ACs; four-scene
  story builder reusing the sibling's tools/palette/stickers plus voice recording (`getUserMedia` +
  `MediaRecorder`, 15 s cap, one clip per scene, armed re-record), playback, an IndexedDB clip
  store (52 clips / 14 MB) beside the localStorage save, scene PNG export, save
  `spec.storytellingAndVoiceRecording.v1`.

Pattern: drawing written first; storytelling written after it and reuses its canvas/sticker/
gallery/export conventions (deviations marked designed, e.g. IndexedDB for audio). Each
independently verified by a fresh-context verifier: drawing's verifier fixed impossible picker and
gallery layouts at small viewports, a punishing re-tap reload, target-size contradictions, and
undefined effects; storytelling's fixed missing undo/canvas tab stops, mic re-entry hazards, and
tab-order contradictions. A cross-spec consistency pass then found five remaining items in
storytelling (gallery grid, HOME in the tab orders, one-way `un-draw`, unmarked swatch-voice
divergence, clip budget vs worst-case gallery); the writer fixed all five (budget now 52 clips /
14 MB) and a scoped re-review passed all five with no new breakage. Deferred minors: `un-draw`
leaves an erased stroke's return implicit; A2's "exactly the sibling's sets" wording predates the
marked D2 deviation.

No `[NEEDS CLARIFICATION]` items remain. 29 of 38 specs done; tickets 12–13 remain.
