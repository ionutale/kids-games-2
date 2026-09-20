# Storytelling and voice recording

## 1. Front matter

- **Title:** Storytelling and voice recording (catalog name, kept for traceability only; the activity is untitled on screen)
- **Entry type:** Activity (creative tool) — sandbox story builder with voice recording; no levels, no fail state, no score
- **Catalogued entry:** [`storytelling-and-voice-recording.md`](../storytelling-and-voice-recording.md) — Create tab
- **Official sources:** [Help Center — How to use creative tools inside the Khan Kids app](https://khankids.zendesk.com/hc/en-us/articles/21188738836763-How-to-use-creative-tools-inside-the-Khan-Kids-app), [Help Center — Find books and lessons in the Khan Kids Library](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library)
- **Spec status:** v1 — follows template v1; pending blind-build test
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch (pointer), mouse, and keyboard; microphone where available; sound on; no network after load
- **Conditional sections:** all 16 included; section 8 carries content data instead of levels (none exist)
- **IP constraint:** all scenes, stickers, art, and voices are original; no Khan Academy characters, art, audio, names, or content
- **Family reference:** the sibling [`drawing-and-coloring.md`](drawing-and-coloring.md) spec is this spec's reference for canvas, stickers, gallery, and export; every deliberate deviation is flagged in sections 3 and 15

## 2. Overview and learning objective

A child builds a story across four scenes: they draw and color each scene on a shared canvas, add
stickers, then record their voice for a scene and play it back. The skills are **creative
expression, oral narration, and sequencing** (a story that moves from scene to scene), matching the
officially described Create content ("storytelling… voice recording, playback") and the official
creative-expression subject area (ages 2–8). Age band: **2–8**; chunky targets and picture-only
touch flow serve 2–5, multi-scene narration and recording extend to 8. Expected session:
**5–12 minutes** (one story of four scenes, one to three recordings); a session can end at any
point with nothing lost.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Children build stories in Create: draw and color scenes, add stickers, record their voice, and play the recording back | official | Entry file; Library article |
| O2 | Creations are saved to a Gallery and can be exported to the camera roll | official | Entry file; Library article |
| O3 | "Storytelling" is listed among the Create tab's content | official | Entry file "Notes"; Library article |
| O4 | Create content is not level-filtered | official | Entry file "Levels" line |
| O5 | The app covers ages 2–8 and the creative-expression subject (drawing, storytelling, recording, self-expression) | official | Catalog lines 96, 112 |
| O6 | Official sources name the activity and its main actions only; no scene count, tools, sizes, recording flow, playback rules, gallery UI, or export flow are described | official (absence) | Entry file description is the whole official claim set |
| D1 | Stories have exactly 4 scenes, navigated by Previous/Next arrows plus a 4-dot indicator; per-scene art and recording state; no page-picker state | designed | O1 says "scenes"; count and navigation invented to bound a session and the save |
| D2 | Reuse of the sibling's four tools (crayon, brush, rainbow crayon, eraser), 10-color palette, and 16 original stickers; **no region fills and no coloring-page outlines**; the color name is spoken when a swatch is tapped (`vo_color_*`, FR-005) | designed | O1 says "draw and color"; region-fill coloring pages are the sibling's territory, and a story's art is authored by the child; the swatch-tap voice is the designed replacement for the sibling's fill voice, which needs region fills storytelling does not have |
| D3 | Recording via `getUserMedia` + `MediaRecorder`: 15 s cap per scene, 1.0 s minimum, one clip per scene, armed re-record, visual-only while recording | designed | O1 says "record… and play back"; every number invented and justified in sections 5 and 9 |
| D4 | Audio blobs persist in IndexedDB (`clips` store, 52 clips / 14 MB budget — 12 gallery stories × 4 scenes + the current story's 4 clips, ≤256 KB each — with eviction of the oldest non-current clip as the safety valve) alongside the sibling-style localStorage JSON; when IndexedDB is blocked, clips are session-only | designed | Audio is far larger than localStorage allows; a deliberate deviation from the sibling's single-store class (A4) |
| D5 | Gallery = up to 12 saved stories, two-step delete, oldest-item replacement when full; thumbnail is scene 1 | designed | O2 says a Gallery exists; size and behavior reuse the sibling conventions |
| D6 | Export = current scene rendered 2× (2048×1536) as a PNG download, with the Web Share file sheet when available; the recording is not part of the file | designed | O2 says camera roll; **no camera-roll API exists in a browser**, and A/V video export is out of scope (§16) |
| D7 | Title, Play, HOME, 3 s reset hold, 15 s idle hints, audio rules, degradation, layouts, tab order, accessible names | designed | Template v1 family conventions |
| D8 | No fail state, no score, no timer; every mis-tap is safe; the only destructive paths are the eraser (undoable), the two-step gallery delete, the armed re-record, the oldest-item gallery replacement when full (FR-024), and the 3 s reset | designed | Template "never punishing" rule; A9 |
| D9 | All art, audio, voices, and copy are original; no Khan Academy content | designed | IP constraint |

## 4. Player experience / core loop

A child presses Play and a paper scene appears. They take the crayon and draw
a hill, then a sun with the rainbow crayon; they open Stickers and stamp a tree and a bird. They
press Record — the browser asks for the microphone, then a boop, then a red dot and a draining ring;
they say "Once upon a time there was a little bird…" and press Stop. "Nice!" plays and the speaker
button swells. They press Next scene ("Scene 2."), draw the bird flying, and record again. Four
scenes later they press Play voice on scene 1 and hear their own story with the ring draining over
the clip. They save to the Gallery ("Saved!") and export a picture of the last scene ("Saved to your
device!"). The next day, Play returns them to the same story, same scene, same voices.

**Core loop:** draw and color a scene → add stickers → record a voice line → replay it → move to
the next scene → save to the Gallery or export a scene → resume later.

## 5. Mechanics and rules

- **FR-001** When the activity loads, it shall show `loading` (preload art and audio) then `title`: a decorative storybook scene, Play (≥112×112 CSS px), and a logo emblem (≥72×72) that is the reset control (FR-026). No audio plays before the first gesture (FR-029).
- **FR-002** When Play is pressed, the activity shall unlock audio and then either (a) resume `story` at the saved `sceneIndex` with `sfx_pop` (0.4, one-shot) when the save's `current` holds at least one stroke, sticker, or recording, or (b) start a new `story` at scene 1 with four empty paper scenes and `vo_new_story` (0.9, one-shot) when no save exists or `current` is empty. There is no page-picker state (designed deviation from the sibling: scenes are always visible).
- **FR-003** The `story` state shall show: the scene canvas (FR-014) over paper tint `#FFF8EC`; a top bar with Previous scene, Next scene, Record/Stop, Play voice, Undo, Stickers, Gallery, and Export controls (HOME is the floating 24 px top-left button of FR-027); a 4-dot scene indicator (16 px dots, 8 px gaps; the current dot filled accent, others 40% outline; not interactive); the tool rail and palette (FR-005); and an optional sticker tray (FR-010). Every control is ≥72×72 landscape / ≥64×64 portrait and small (FR-015). The canvas carries the invisible name "Drawing canvas, scene *n* of 4" (FR-034).
- **FR-004** A story has exactly 4 scenes. When Next scene is pressed on scenes 1–3, or Previous scene on scenes 2–4, the activity shall first commit an active stroke at its last point, cancel the held sticker (no ink, no save), stop playback, stop recording (committing if ≥1.0 s per FR-017), clear the undo stack, then show the adjacent scene with `sfx_pop` (0.4) and `vo_scene_{n}` (0.8, one-shot), preserving every scene's strokes, stickers, and recording. Previous is dimmed 40% on scene 1 and Next on scene 4 (a press plays `sfx_soft_tap` 0.4 only). Scene changes never create gallery items. `sceneIndex` is stored in the save (FR-022).
- **FR-005** The tool row shall offer exactly four tools — Crayon (12-unit round line, alpha 0.85), Brush (28-unit round line, alpha 1.0), Rainbow crayon (16-unit, alpha 1.0, FR-007), Eraser (48-unit tip, FR-008) — and the palette shall offer exactly 10 colors (§8). The selected tool and color shall show a 4 px selection ring and a 1.1× swell; tapping a swatch also speaks its color name (`vo_color_*`, 0.8, at most once per 3 s; designed; D2). `tool` and `color` persist in the save and are restored on load. `official` base: draw and color scenes.
- **FR-006** When a pointer goes down on the canvas with a drawing tool selected and not on a placed sticker (FR-012), a stroke shall start with that tool and color; while the pointer moves, a point is appended when ≥4 artwork units from the last point (pointer events coalesced where available), and ink renders live; when the pointer lifts or is cancelled, the stroke is committed as one undo entry and one save trigger (FR-022). Caps: 1,500 points per stroke (further input is ignored until pointer-up; existing ink stays), 300 strokes per scene, 600 strokes per story (further stroke starts are ignored with `sfx_soft_tap` 0.4); caps never delete existing ink.
- **FR-007** The rainbow crayon shall color each stroke deterministically: the hue index is `floor(arcLength / 64) mod 7` over the fixed list red `#E23A3A`, orange `#F28C28`, yellow `#F5D547`, green `#4CAF50`, blue `#2E9BD6`, indigo `#4B4FE2`, violet `#7A4FBF`, starting at red at arc length 0 for every stroke.
- **FR-008** When the eraser pointer contacts ink or a sticker, it shall remove each whole stroke whose centerline comes within `24 + strokeWidth/2` units of the eraser point and each whole sticker whose 96×96 box intersects the eraser point (48 units). All removals during one eraser stroke form one undo entry. An eraser stroke touching nothing changes nothing and is not saved or stacked. Recordings are never erased by the eraser.
- **FR-009** A pointer-down and -up on the canvas with a drawing tool that moves ≤8 CSS px shall count as a quick tap; with the eraser it is eraser contact (FR-008). A quick tap is judged against the topmost placed sticker first (FR-012); a tap that hits no sticker is an empty tap: nothing on screen changes, no dot is drawn, `sfx_soft_tap` (0.4) plays, and the idle timer resets. Storytelling has no region fills (designed; D2).
- **FR-010** The Stickers button shall toggle a sticker tray (bottom sheet) showing the 16 originals (§8) in fixed order as thumbnails ≥80×80 CSS px (2 rows × 8; portrait and small 4 rows × 4): tapping a thumbnail picks that sticker up as the held sticker (thumbnail lifts 1.2×; `sfx_soft_tap` 0.4). Placed stickers belong to their scene; a held sticker is cancelled by FR-004 on a scene change.
- **FR-011** While a sticker is held it shall follow the pointer without drawing. When the pointer lifts over the canvas, or any canvas quick tap lands, the sticker is placed centered there and clamped so its 96×96 box stays inside 0–1024 × 0–768; placing plays `sfx_pop` (0.5), a 160 ms pop-in with drop bounce, `vo_sticker_*` (0.8, one-shot), and one undo entry. A second thumbnail tap swaps the held sticker (the first is not placed). Activating any chrome control (HOME, scene arrows, Record, Play voice, Stickers, Gallery, Export, or a tool) changes state or cancels the held sticker with no ink and no save; there is no trapping cancel state. Caps: 100 placed stickers per scene, 200 per story; a placement beyond either cap is ignored with `sfx_soft_tap` (0.4).
- **FR-012** A pointer-down within the topmost placed sticker's 96×96 box (latest placed wins overlaps) shall suppress drawing entirely: moving ≥12 CSS px moves that sticker (one undo entry on release, `sfx_soft_tap` 0.3, drop bounce); moving <12 px is a no-op with the bounce only. Moving does not change sticker layering. Strokes render beneath stickers.
- **FR-013** The Undo button (≥72×72 landscape, ≥64×64 portrait and small) shall reverse the most recent undo entry — stroke, sticker add, sticker move, sticker remove, or one eraser action — with a 200 ms un-draw animation and `sfx_undo` (0.5). The stack holds the last 20 entries; it is cleared on scene change and on reset, and there is no redo (a new action after undo simply pushes a new entry). With an empty stack the button shows 40% opacity and a press plays `sfx_soft_tap` (0.4) only. Undo is throttled to one reversal per 300 ms; a double-tap undoes once. Recording actions are never undoable (FR-017/FR-018; the undo stack never holds recording entries).
- **FR-014** The artwork space shall be 1024×768 units per scene. The canvas view is scaled uniformly to fit its box (FR-015) with ≥24 px padding, never distorted and never below 224×168 CSS px displayed; pointer coordinates map through the inverse transform, so strokes and stickers are stored in artwork units and are unaffected by resize or rotation. No zoom, pan, or rotate gestures exist.
- **FR-015** Layout per the section 8 breakpoint table; all targets ≥64 CSS px except the documented 48×48 swatch (portrait and small) exception, chrome ≥72 landscape / ≥64 portrait and small, and nothing requires scrolling from 320×480 up; every interactive element carries a 4 px focus indicator at ≥3:1 contrast.
- **FR-016** When Record is pressed and the scene has no recording, the activity shall request microphone access with `getUserMedia({ audio: true })` from that gesture (`official` base: voice recording). While the request is pending, the Record button pulses 1→1.2→1 over 1 s (`rec pulse`) and no audio plays; further Record presses while the request is pending or during the 1.0 s pre-roll are ignored (no second request). When access is granted, the activity shall play `sfx_boop` (0.3), wait 1.0 s with the stream open but not recording, then start `MediaRecorder` (`audioBitsPerSecond: 128000`; preferred `audio/webm;codecs=opus`, else `audio/mp4`; neither → FR-021) and show: a red dot pulsing 600 ms on/off, a 6 px ring draining 360°→0° over 15 s (`rec ring`), and a stop square on the Record button. While recording: drawing and stickers stay available; the idle timer is paused; all audio output is suspended (FR-020, FR-029); recording stops automatically at 15 s. Pressing any chrome control other than Record stops the recording first (commit if ≥1.0 s per FR-017, else discard), then performs its action.
- **FR-017** When a recording stops (Stop pressed, the 15 s cap, a chrome control, the microphone track ending, or the tab hidden), the activity shall close the microphone stream with all tracks stopped, then: if the clip is ≥1.0 s, commit it as the scene's recording — replacing any previous clip — store the blob per FR-023, play `sfx_pop` (0.5), speak `vo_rec_saved` (0.8), swell the Play voice button 1.2×, and save (FR-022); or if the clip is <1.0 s, discard it with `sfx_soft_tap` (0.4) and `vo_too_short` (0.9), leaving the scene and any previous clip unchanged.
- **FR-018** When Record is pressed while the current scene already has a recording, the activity shall arm replacement for 2.5 s — a red 4 px ring pulsing 1.1× every 300 ms around Record (`replace arm`) with `sfx_boop` (0.3) — and start the FR-016 flow only when Record is pressed a second time within 2.5 s; any other input cancels the arm with no change. The previous clip is kept until a new clip commits (FR-017), so a cancelled or too-short re-record never loses a recording. There is no separate delete-recording control.
- **FR-019** The Play voice button shall play the current scene's recording at 1.0 voice volume and show a 6 px ring draining over the clip's duration; pressing it again stops playback. With no recording it is dimmed 40% and a press plays `sfx_soft_tap` (0.4) only. Playback stops at clip end, on scene change, on HOME, when the Gallery opens, when Export starts, when recording starts, and when the tab is hidden (FR-035). Playback is a voice per FR-020.
- **FR-020** Narration (`vo_*`), hints, and recording playback share one voice channel: a new voice cancels the one playing, and starting playback cancels a playing voice. The idle timer is paused while recording and while playing, so playback is never cut short by a hint. While recording, all audio output is suspended so the microphone never captures app sound; sfx may overlap voices at other times. Recording playback is never interrupted by a hint.
- **FR-021** When microphone access is denied or the request rejects, `getUserMedia` or `MediaRecorder` is unavailable, or the context is not secure, the activity shall enter no-record mode: Record is dimmed 40% with a crossed-microphone badge, a 3 s mic-with-slash toast shows, and `vo_mic_off` (0.9) plays, at most once per 30 s. The activity stays fully usable (art, stickers, gallery, export). In no-record mode a Record press re-attempts at most once per 30 s; a failing attempt shows the toast and `sfx_soft_tap` (0.4) only. This press rule applies whether or not the scene already has a recording; the FR-018 arm is not used in no-record mode.
- **FR-022** The activity shall persist a JSON save in browser local storage under `spec.storytellingAndVoiceRecording.v1` (shape §12), debounced to at most one write per 5 s: after each completed action (stroke commit, sticker place/move/erase, undo, scene change) it saves immediately when ≥5 s have passed since the last write, otherwise 5 s after the last action. It writes immediately on a clip commit, on HOME, on a Gallery Save, and on export completion. `updatedAt` refreshes on every write.
- **FR-023** Audio blobs shall be stored in IndexedDB (database `spec.storytellingAndVoiceRecording.v1`, store `clips`, keyed by `clipId`) with a budget of 52 clips / 14 MB total (12 gallery stories × 4 scenes + the current story's 4 clips = 52 clips, ≤256 KB each); each clip is ≤15 s (≤256 KB at 128 kbps mono). When a new clip would exceed the budget, the activity shall evict the oldest stored clip that is not referenced by `current`. If the new clip still does not fit, it stays playable in memory for the session, its JSON reference is omitted, and `vo_audio_unsaved` (0.9) plays with a 3 s mic-slash toast, at most once per 30 s. After every JSON save, clips not referenced by the saved JSON are deleted (garbage collection). When IndexedDB is blocked or unavailable, clips are session-only (same voice and toast on the first committed clip) and the JSON stores `audio: null`. On load, a reference whose blob is missing is dropped to `null` without error; the scene's art is untouched.
- **FR-024** The Gallery button shall open a modal `gallery` with: a Save tile (first, sized like the item tiles) that saves the current story as a new item (`sfx_chime_save` 0.6, `vo_saved` 0.9, tile pops 1.2×); then up to 12 saved stories in newest-first order as a grid that fits without scrolling (5 columns × 3 rows at ≥900 px wide with tiles ≥160×120 CSS px; 3 columns × 5 rows below 900 px wide with tiles ≥96×72 CSS px), each with a 256×192 WebP thumbnail (quality 0.7, ≤24 KB; PNG fallback) of scene 1, an invisible name including its index, and a delete button (≥64×64). Delete is two-step: the first tap arms the item for 2.5 s (delete arm, `sfx_boop` 0.3); a second tap within 2.5 s deletes it (`sfx_soft_tap` 0.4, `vo_deleted` 0.8, 200 ms shrink) and its clips are removed at the next save (FR-023); any other tap cancels. Opening an item auto-saves `current` when non-empty, stops recording and playback, then loads that story at scene 1 with `sfx_pop` (0.4) and an empty undo stack. When the gallery is full (12) and a save is requested, the oldest item (lowest `createdAt`) is removed first with a 1.5 s fade-out, `sfx_soft_tap` (0.4), and `vo_make_room` (0.9); the new story is always saved. Opening the Gallery stops and commits an active recording first (FR-016). The Gallery has a Close button ≥72×72.
- **FR-025** The Export button shall render the current scene at 2× (2048×1536) — paper tint, strokes, stickers; no chrome — then: when `navigator.canShare({ files })` accepts the PNG, open the system share sheet; otherwise trigger a download named `story-scene{N}-YYYYMMDD-HHMMSS.png` (N = 1–4). A 48 px spinner shows during rendering (≤2 s). On share/download start: `sfx_chime_save` (0.6) and `vo_exported` (0.9) with a 2 s success toast (arrow-out-of-box pictogram). A cancelled share plays `sfx_soft_tap` (0.4) and is not an error. On failure: a 3 s failure toast and `vo_export_fail` (0.9); the story is kept. The recording is not part of the exported file (designed; D6, §16). `official` base: camera-roll export; no camera-roll API exists in a browser.
- **FR-026** When the title logo is held 3 s, a 6 px progress ring shall fill for the hold; releasing early resets the ring with no action; completion clears `spec.storytellingAndVoiceRecording.v1`, clears the `clips` store, and clears all in-memory progress (the Gallery returns to empty), with a 400 ms 1.1× emblem pulse and `sfx_soft_tap` (0.5). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent; a hidden tab cancels the hold (FR-035).
- **FR-027** HOME (≥72×72, 24 px top-left margin) shall exist in every state except `loading`; it stops recording (committing if ≥1.0 s per FR-017), stops playback, cancels the held sticker, commits an active stroke at its last point, cancels all timers (idle, replace arm, delete arm, FIFO notice, export render), saves, and returns to `title`. Escape is the keyboard HOME (FR-033). On `title` no HOME is rendered and the key is a no-op.
- **FR-028** When no pointer, key, or switch input has occurred for 15 s, a hint shall play, targeting deterministically: on `title` the Play target hint-pulses 2.5 s with `vo_hint_play` (0.9, visual-only before the first gesture); on `story`, when the current scene holds no stroke, sticker, or recording, the Record button pulses with `vo_hint_record` (0.9); with content and zero placed stickers on the scene, the Stickers button pulses with `vo_hint_stickers` (0.9); otherwise, when the scene is not scene 4, the Next arrow pulses with `vo_hint_next` (0.9); otherwise the Gallery button pulses with `vo_hint_save` (0.9); on `gallery` the Save tile pulses with `vo_hint_save` (0.9). Hints repeat every 15 s of continued idleness; any input, including an empty tap, resets the timer; `exporting` has no hint, and the timer is paused during recording and playback (FR-020).
- **FR-029** Audio rules: no audio before the first user gesture; one voice at a time (a new voice cancels the previous utterance); sfx may overlap; volumes per section 9; an optional music loop plays at 0.15 and may be omitted; while recording, all audio output is suspended (FR-020). Every instruction and confirmation a non-reader needs is voice plus pictogram.
- **FR-030** Degradation: no speech synthesis → all behavior identical with visual cues only (selection rings, pops, rec dot, rings, toast pictograms); no AudioContext → fully silent, same behavior; recording unavailable or denied → FR-021; storage blocked or quota-exceeded → the run continues in memory, the Gallery and `current` work for the session, and the first failed write shows a disk-with-slash pictogram for 3 s with `vo_storage_full` (0.9, at most once per 30 s); IndexedDB blocked → FR-023; playback of a clip fails → a 3 s mic-slash toast and continuation, story kept; export unsupported or failing → FR-025 failure path; a missing visual asset → draw a stub shape and keep playing.
- **FR-031** The activity shall have no fail state: mis-taps, empty taps, rapid repeated taps, double-taps, multi-touch, idle time, scene changes, and reloads never erase unsaved work, never end a session, and never show a score; the only destructive actions are the eraser (undoable), the two-step gallery delete, the armed re-record (the old clip is kept until the new one commits), the gallery's oldest-item replacement when full (announced by `vo_make_room`), and the 3 s reset hold.
- **FR-032** Multi-touch: the earliest pointer-down on the canvas owns the canvas gesture; further simultaneous canvas contacts are ignored (no ink, no sticker change) until it lifts; on a timestamp tie the leftmost contact wins. Control taps are processed independently per pointer in pointer-down order; activating any control while a stroke is active commits that stroke at its last point (never losing ink). Two thumbs on two sticker thumbnails: the later tap swaps the held sticker (FR-011). A recording continues while drawing is used with multiple contacts; no audio is lost.
- **FR-033** Keyboard: Tab moves focus in the section 6 order; Enter/Space activates the focused control; Escape = HOME. With the canvas focused, a 24 artwork-unit cursor moves with the arrow keys (Shift = 96 units; hold repeats every 50 ms), Space starts and ends a stroke at the cursor (polyline through visited cursor positions), Enter places a held sticker at the cursor (with no held sticker it plays `sfx_soft_tap` 0.4 and changes nothing), and Delete/Backspace removes the topmost sticker under the cursor (one undo entry). With the cursor over a placed sticker, Shift+Enter picks that sticker up, the arrow keys move it, Enter drops it (one undo entry), and a second Shift+Enter cancels the move without change. Ctrl/Cmd+Z is Undo. With the Record button focused, Enter/Space starts the FR-016 flow. Escape always returns HOME (a held sticker is cancelled by FR-027 rather than Escape-first).
- **FR-034** Every interactive element shall carry an invisible accessible name (examples in section 7) and visible text shall be absent everywhere — all UI is pictograms and art; sticker thumbnails are images, never labels. Placed stickers are not tab stops but carry an exposed name (e.g. "Star sticker at 720, 180"); they are managed with the canvas cursor (FR-033). The scene indicator carries the current name "Scene *n* of 4".
- **FR-035** When the tab is hidden, the activity shall stop recording and commit it when ≥1.0 s (releasing the microphone with all tracks stopped), cancel any playing voice, commit an active stroke at its last point (no ink lost), pause the idle timer, cancel a reset hold in progress, and keep the FIFO notice and delete-arm timers until visible time passes; when visible again, nothing replays automatically. Throttled timers may delay idle hints or a debounced save by seconds, never lose work (A8).
- **FR-036** Unbound keys and unknown events shall be ignored (no state change, no sound). Scene count and order, palette order, sticker order, hue cycle, and layout are fixed; particle positions may vary randomly within section 9 bounds, but nothing that affects state, sequencing, or save data is random. No network requests occur after load.

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank paper background | initial; preload art and audio; no interactive elements |
| SC-02 | `title` | storybook scene + Play + logo (reset) | audio unlocks on the first gesture here |
| SC-03 | `story(sceneIndex, tool, color, trayOpen, heldSticker, recording, playing, armUntil)` | canvas + chrome + scene dots + optional sticker tray | main state; 4 scenes |
| SC-04 | `gallery` | saved-stories modal (canvas preserved underneath) | Close; Save tile; ≤12 items |
| SC-05 | `exporting` | canvas + rotating ring | ≤2 s; HOME remains |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | silent start (FR-029) |
| `title` | `PLAY_PRESSED` | `current` has content | `story(current, sceneIndex)` | resume scenes, tool, color; `sfx_pop` |
| `title` | `PLAY_PRESSED` | no save or empty `current` | `story(new, 1)` | four empty scenes; `vo_new_story` |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | ring fill; clear save + clips + memory; pulse + `sfx_soft_tap` |
| `story` | `STROKE_COMMITTED` | — | `story` | FR-006; push undo entry; schedule save |
| `story` | `EMPTY_TAPPED` | quick tap, no hit | `story` | FR-009; `sfx_soft_tap`; idle reset |
| `story` | `SCENE_NEXT` / `SCENE_PREV` | target scene in 1–4 | `story(sceneIndex±1)` | FR-004; commit stroke; stop playback/recording; clear undo; `vo_scene_{n}` |
| `story` | `STICKER_HELD` / `STICKER_PLACED` | tray open | `story` | FR-010/FR-011; held follows pointer; place or swap |
| `story` | `STICKER_MOVED` | ≥12 px from topmost box | `story` | FR-012; push undo entry on release |
| `story` | `ERASER_CONTACT` | removes ≥1 item | `story` | FR-008; one undo entry; save |
| `story` | `UNDO_PRESSED` | stack non-empty, 300 ms clear | `story` | FR-013; pop entry; un-draw 200 ms |
| `story` | `RECORD_PRESSED` | no clip, mic available, no arm | `story(recording)` | FR-016: request mic; pulse; grant → boop, 1 s, record |
| `story` | `RECORD_PRESSED` | no-record mode, <30 s since last attempt | `story` | FR-021; `sfx_soft_tap`; no state change |
| `story` | `RECORD_PRESSED` | scene has a clip | `story(armUntil)` | FR-018; arm 2.5 s; second press within arm → `story(recording)` |
| `story(recording)` | `RECORD_PRESSED` (Stop) / `REC_CAP_15S` | clip length known | `story` | FR-017; commit ≥1.0 s or discard; save; `sfx_pop`/`vo_too_short` |
| `story(recording)` | `MIC_DENIED` / `MIC_ERROR` | — | `story` | FR-021; toast; no-record mode; previous clip kept |
| `story` | `PLAY_VOICE_PRESSED` | clip present | `story(playing)` | FR-019; ring drains over clip |
| `story(playing)` | `CLIP_END` / `PLAY_VOICE_PRESSED` | — | `story` | playback stops |
| `story` | `GALLERY_PRESSED` | — | `gallery` | stop + commit recording; stop playback; cancel held sticker |
| `story` | `EXPORT_PRESSED` | — | `exporting` | stop + commit recording; stop playback; cancel held sticker; render 2× |
| `story` | `IDLE_15S` | no input 15 s, not recording/playing | `story` | FR-028 hint |
| `gallery` | `SAVE_PRESSED` | — | `gallery` | FR-024; FIFO first when full; pop new tile |
| `gallery` | `ITEM_OPENED` | — | `story(item, 1)` | auto-save current when non-empty; load story; clear undo |
| `gallery` | `DELETE_CONFIRMED` | armed, ≤2.5 s | `gallery` | FR-024; remove item; clips GC at next save |
| `gallery` | `CLOSE_PRESSED` | — | `story(same)` | no change to the story |
| `exporting` | `EXPORT_DONE` / `EXPORT_FAILED` | ≤2 s | `story` | FR-025; toast 2 s / 3 s |
| any except `loading` | `HOME_PRESSED` / Escape | — | `title` | FR-027; stop + commit recording; stop playback; cancel timers; save |
| any except `loading` | `IDLE_15S` | — | same state | FR-028 hint |

**Tab order per state (v1):** `loading` — none; `title` — logo (reset) → Play; `story` — HOME → Drawing canvas → Previous scene → Next scene → Record/Stop → Play voice → Undo → Stickers → Gallery → Export → Crayon → Brush → Rainbow crayon → Eraser → 10 swatches left→right → (tray open) 16 sticker thumbnails in §8 order; `gallery` — HOME → Close → Save tile → item 1 → its delete → item 2 → its delete …; `exporting` — HOME (≤2 s).

**HOME everywhere (v1):** HOME is rendered in `story`, `gallery`, and `exporting`; it stops and commits an active recording (≥1.0 s), stops playback, cancels the held sticker, commits an active stroke, cancels idle/arm/delete/FIFO/export timers, saves, and returns to `title`. On `title` no HOME exists and the key is a no-op.

## 7. Input and interaction

- **Primary input:** single-pointer drag on the canvas (draw, erase, move stickers) and tap/click on chrome.
- **Targets (CSS px):** Play ≥112×112; logo and chrome buttons ≥72×72 (≥64 portrait and small); Undo ≥72×72 (≥64 portrait and small); tools 96×96 landscape / 72 portrait / 64 small; swatches 64×64 landscape / 48 portrait and small (the documented small-screen exception, shared with the sibling); sticker thumbnails 80×80 / 64; gallery tiles ≥160×120 landscape / ≥96×72 portrait and small; gallery delete ≥64×64; scene dots are non-interactive (16 px / 12 px).
- **Tap tolerance (numeric):** quick tap = ≤8 CSS px movement with a drawing tool; sticker grab = topmost 96×96 box; sticker move starts at 12 px; eraser removal ranges in FR-008. Tie rules: topmost (latest) sticker wins overlaps; multi-touch ties resolve to the leftmost contact (FR-032).
- **Drag alternative:** every drag has a tap path — tap the sticker thumbnail then tap the canvas to place; move stickers by dragging or (keyboard) Shift+Enter on the canvas cursor to pick up the sticker under it, arrows to move, Enter to drop; no drag is the only route to any action.
- **Multi-touch:** FR-032 (earliest canvas contact owns; leftmost on a tie; control taps independent; tool switch commits the stroke; recording is unaffected).
- **Keyboard:** FR-033 (Tab order, Enter/Space, Escape = HOME, canvas cursor + Space/Enter/Delete, Ctrl/Cmd+Z, Enter on Record). Focus indicator 4 px, ≥3:1 contrast.
- **Instructions without reading:** every action is learnable from voice + pictogram (selection rings, pops, the rec dot and rings, toast pictograms); no visible words appear anywhere in the activity.
- **Accessible names (invisible, examples):** "Play", "Reset saved progress, hold three seconds", "Home", "Previous scene", "Next scene", "Scene 2 of 4", "Record your voice", "Stop recording", "Play your recording, 8 seconds" / "No recording on this scene", "Undo, 3 actions available" / "Undo, nothing to undo", "Stickers", "Gallery", "Save to device", "Crayon", "Brush", "Rainbow crayon", "Eraser", "Color: red"…"Color: gray", "Sticker: star", "Drawing canvas, scene 3 of 4", "Save this story", "Saved story 2", "Delete saved story 2", "Close", "Recording, 9 seconds left".
- **Viewport:** design spaces 1024×768 (landscape) and 768×1024 (portrait), letterboxed; art and recordings are stored per scene in artwork units, so resize or rotation mid-recording or mid-drawing preserves everything (FR-014); layouts per section 8; no scrolling from 320×480 up; resizing never stops a recording.

## 8. Levels and content data

*(No levels: Create content is not level-filtered (O4). This section holds the scenes, tools, and layout data.)*

**Scenes (4, fixed).** Every story has exactly four scenes over the paper tint `#FFF8EC`; the child's art and one recording are stored per scene. Scene 1 is the default on a new story and on gallery open; the current `sceneIndex` is stored in the save (FR-004, FR-022).

| Scene | Default content | Recording slot | Navigation |
|---|---|---|---|
| 1 | empty paper | 1 clip, 1.0–15 s | Previous dimmed |
| 2 | empty paper | 1 clip, 1.0–15 s | both arrows |
| 3 | empty paper | 1 clip, 1.0–15 s | both arrows |
| 4 | empty paper | 1 clip, 1.0–15 s | Next dimmed |

**Tools.**

| Tool | Line width (artwork units) | Alpha | Behavior | Accessible name |
|---|---|---|---|---|
| Crayon | 12 | 0.85 | freehand stroke; default tool | "Crayon" |
| Brush | 28 | 1.0 | freehand stroke | "Brush" |
| Rainbow crayon | 16 | 1.0 | hue cycles per FR-007 | "Rainbow crayon" |
| Eraser | 48 tip | — | removes whole strokes/stickers (FR-008) | "Eraser" |

**Palette (10, fixed order).**

| # | Color | Hex | Voice key |
|---|---|---|---|
| 1 | red | `#E23A3A` | `vo_color_red` |
| 2 | orange | `#F28C28` | `vo_color_orange` |
| 3 | yellow | `#F5D547` | `vo_color_yellow` |
| 4 | green | `#4CAF50` | `vo_color_green` |
| 5 | blue | `#2E9BD6` | `vo_color_blue` |
| 6 | purple | `#7A4FBF` | `vo_color_purple` |
| 7 | pink | `#F27FB2` | `vo_color_pink` |
| 8 | brown | `#8B5A2B` | `vo_color_brown` |
| 9 | black | `#3A3A3A` | `vo_color_black` |
| 10 | gray | `#9AA0A6` | `vo_color_gray` |

**Stickers (16, fixed tray order).** Identical set and behavior to the sibling spec; all original; placed at 96×96 artwork units, centered.

| # | Kind | Voice key | Art guidance |
|---|---|---|---|
| 1 | star | `vo_sticker_star` | 5-point rounded star |
| 2 | heart | `vo_sticker_heart` | rounded heart |
| 3 | sun | `vo_sticker_sun` | disc + 8 rays |
| 4 | cloud | `vo_sticker_cloud` | 3-lobe cloud |
| 5 | flower | `vo_sticker_flower` | 6 petals + center |
| 6 | tree | `vo_sticker_tree` | round canopy + trunk |
| 7 | fish | `vo_sticker_fish` | oval + tail + eye dot |
| 8 | bird | `vo_sticker_bird` | round body + wing + beak |
| 9 | cat | `vo_sticker_cat` | round head + ears |
| 10 | dog | `vo_sticker_dog` | round head + floppy ears |
| 11 | ball | `vo_sticker_ball` | circle + curve stripes |
| 12 | balloon | `vo_sticker_balloon` | oval + string |
| 13 | rainbow | `vo_sticker_rainbow` | 3-band arc |
| 14 | moon | `vo_sticker_moon` | crescent + star dot |
| 15 | leaf | `vo_sticker_leaf` | rounded leaf + vein |
| 16 | car | `vo_sticker_car` | chunky car + 2 wheels |

**Layout breakpoints (numbers).**

| Class | Top bar | Tools | Palette | Sticker tray | Sticker thumbnails | Canvas box |
|---|---|---|---|---|---|---|
| Landscape ≥900 px wide | top bar 88 px, buttons 72×72, 16 px gaps, dots 16 px | left rail 120 px, tools 96×96, 16 px gaps | strip 88 px under canvas, 10×64 px swatches, 12 px gaps | 2 rows × 8 | 80×80 | viewport − 88 − 88 tall × − 120 wide, 24 px padding |
| Portrait 640–899 px wide | top bar 88 px, buttons 64×64, 8 px gaps, dots 12 px | bottom dock 216 px: tools 72×72, 8 px gaps | 2 rows × 5, 48×48, 8 px gaps (112 px with padding) | 4 rows × 4 | 64×64 | viewport − 88 − 216 − 112 tall |
| Small 320–639 px wide | two 64 px rows, buttons 64×64, 8 px gaps (4 per row), dots 12 px | bottom dock 72 px: tools 64×64, 6 px gaps | 2 rows × 5, 48×48, 6 px gaps (≈110 px) | 4 rows × 4 | 64×64 | viewport − 128 − 72 − 110 tall (≥224×168 at 320×480) |

**Worked example (landscape, 1024×768 artwork units).** Play → "Let's tell a story!" → scene 1. The child picks the rainbow crayon and drags from (100, 500) to (600, 560) (arc ≈ 500 units): hues run red → orange → yellow → green → blue → indigo → violet, wrapping once (indices 0–6); the stroke commits (undo entry 1). Stickers → `tree` → tap (800, 300): a tree pops in with "Tree!" (undo entry 2). Record: the browser asks; on the grant, a boop, then 1 s later the red dot pulses and the ring drains; they say "Once upon a time…" for 6 s and press Stop: "Nice!" plays, the speaker button swells 1.2×, and the clip commits. Next scene: "Scene 2." plays, dot 2 fills; the stroke, tree, and clip stay on scene 1. Scenes 2–4 are drawn the same way. Back on scene 1, Play voice drains its ring over ≈6 s; Export downloads `story-scene1-YYYYMMDD-HHMMSS.png`; Gallery → Save shows the story as the newest tile ("Saved!"). HOME writes `updatedAt`. The next day Play resumes at scene 1 with the art, the tree, and the 6 s recording.

- **Determinism:** scene count and order, palette order, sticker order, tool widths, hue cycle, and layout are fixed; only particle positions (puff ≤6, pop ≤1) may vary, within section 9 bounds.
- **Progression:** none — the child may move between scenes, record, re-record, and draw in any order; nothing unlocks.

## 9. Feedback, rewards, and audio cues

Effect definitions (no undefined effects): **hint pulse** = scale 1→1.12→1 over 500 ms, repeating for 2.5 s; **selection ring** = 4 px accent outline held on the active tool/swatch; **swell** = scale 1→1.1→1 over 120 ms; **depress** = scale 1→0.95→1 over 80 ms; **sticker pop-in** = scale 0→1.2→1 over 160 ms; **drop bounce** = scale 1→1.15→1 over 160 ms; **puff** = ≤6 gray circles r 8→32 px, 200 ms, opacity 1→0; **un-draw** = the reversed action plays over 200 ms (an added stroke or sticker disappears: stroke opacity→0, sticker scale→0; a removed sticker returns: scale 0→1; a moved sticker eases back to its old position); **fade-in** = a loaded scene appears at opacity 0→1 over 400 ms; **fade** = opacity 1→0 over 1.5 s; **delete arm** = red 4 px ring around the armed tile pulsing 1.1× every 300 ms for up to 2.5 s; **ring fill** = 6 px ring stroke sweeps 0→360° over the 3 s hold; **ring pulse** = 1.1× for 400 ms; **spinner** = 48 px ring arc rotating 360° per 1 s; **toast** = centered pictogram card 120×120, fades in 200 ms, holds 1.6 s (success) or 2.6 s (failure, storage notice), fades out 200 ms (2 s and 3 s total); **rec pulse** = Record scale 1→1.2→1 over 1 s while the permission request is pending; **rec dot** = 16 px red dot, 600 ms on / 600 ms off; **rec ring** = 6 px ring around Record draining 360°→0° linearly over 15 s; **play ring** = the same ring draining over the clip's duration; **replace arm** = 4 px red ring around Record pulsing 1.1× every 300 ms for up to 2.5 s.

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Tool / swatch selected | selection ring moves; swell | `sfx_soft_tap` — 0.4 — one-shot; `vo_color_*` — 0.8 — one-shot (≤1 per 3 s) |
| Stroke starts | first ink point | `sfx_soft_tap` — 0.3 — one-shot |
| Stroke committed | ink stays | none |
| Eraser removes ≥1 item | puff ≤6; items vanish | `sfx_erase` — 0.5 — one-shot |
| Eraser with no contact / empty tap | none | `sfx_soft_tap` — 0.4 — one-shot |
| Sticker picked up | thumbnail lifts 1.2× | `sfx_soft_tap` — 0.4 — one-shot |
| Sticker placed | pop-in + drop bounce 160 ms | `sfx_pop` — 0.5 — one-shot; `vo_sticker_*` — 0.8 — one-shot |
| Sticker moved | drop bounce | `sfx_soft_tap` — 0.3 — one-shot |
| Undo | un-draw 200 ms | `sfx_undo` — 0.5 — one-shot |
| Scene changed | dot fills; 400 ms fade-in | `sfx_pop` — 0.4 — one-shot; `vo_scene_{n}` — 0.8 — one-shot |
| Recording requested | rec pulse; mic pictogram | none |
| Recording starts | rec dot + rec ring; stop square | none (all output suspended, FR-020) |
| Recording committed | speaker swells 1.2× | `sfx_pop` — 0.5 — one-shot; `vo_rec_saved` — 0.8 — one-shot |
| Recording too short | none | `sfx_soft_tap` — 0.4 — one-shot; `vo_too_short` — 0.9 — one-shot |
| Replace armed / cancelled | replace arm; ring clears | `sfx_boop` — 0.3 — one-shot / none |
| Playback start / stop | play ring drains | none (the recording plays at voice volume 1.0) |
| Microphone denied / unavailable | mic-with-slash toast 3 s | `vo_mic_off` — 0.9 — one-shot (≤1 per 30 s) |
| Saved to Gallery | new tile pops 1.2× | `sfx_chime_save` — 0.6; `vo_saved` — 0.9 — one-shot each |
| Gallery full, making room | oldest tile fades 1.5 s | `sfx_soft_tap` — 0.4; `vo_make_room` — 0.9 — one-shot each |
| Delete armed | delete arm ring 2.5 s | `sfx_boop` — 0.3 — one-shot |
| Delete confirmed | tile shrinks 200 ms | `sfx_soft_tap` — 0.4; `vo_deleted` — 0.8 — one-shot each |
| Export start | spinner | `sfx_tap` — 0.5 — one-shot |
| Export done | success toast 2 s | `sfx_chime_save` — 0.6; `vo_exported` — 0.9 — one-shot each |
| Export cancelled | none | `sfx_soft_tap` — 0.4 — one-shot |
| Export failed | failure toast 3 s | `vo_export_fail` — 0.9 — one-shot |
| Storage write failed | disk-with-slash pictogram 3 s | `vo_storage_full` — 0.9 — one-shot (≤1 per 30 s) |
| Clip kept in memory only | mic-slash toast 3 s | `vo_audio_unsaved` — 0.9 — one-shot (≤1 per 30 s) |
| Playback failed | mic-slash toast 3 s | none |
| Idle 15 s | deterministic target hint-pulses 2.5 s | `vo_hint_*` — 0.9 — one-shot (visual-only before the first gesture) |
| HOME / Play / Close | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Reset hold | ring fill during hold; ring pulse | `sfx_soft_tap` — 0.5 — one-shot |
| Optional background | — | `music_loop` — 0.15 — loop |

Copy: `vo_new_story` = "Let's tell a story!"; `vo_scene_1..4` = "Scene one." … "Scene four."; `vo_rec_saved` = "Nice!"; `vo_too_short` = "That was very short. Try again!"; `vo_mic_off` = "Ask a grown-up to turn on the microphone."; `vo_audio_unsaved` = "You can listen now, but this voice can't be saved."; `vo_saved` = "Saved!"; `vo_make_room` = "I made room for your new story."; `vo_exported` = "Saved to your device!"; `vo_export_fail` = "Ask a grown-up to save your story."; `vo_deleted` = "Deleted."; `vo_storage_full` = "There is no room to save. Your story is still here."; hints: "Tap the green button to tell a story." (`vo_hint_play`), "Tap the microphone to record your voice." (`vo_hint_record`), "Tap the stickers button to add stickers." (`vo_hint_stickers`), "Tap the arrow for the next scene." (`vo_hint_next`), "Tap to save your story." (`vo_hint_save`). `vo_color_*` and `vo_sticker_*` are the sibling's ten color names and sixteen sticker names. Clip durations ≤1.2 s for color/sticker/scene names, ≤3 s for all others. No negative wording. Voice timbre, language, and TTS engine are build freedom within this copy.

**Audio rules (v1):** no audio before the first gesture (FR-029); one voice at a time, each new voice cancels the previous utterance; sfx may overlap; recording playback is a voice (FR-020); all output is suspended while recording; `music_loop` optional at 0.15. Degradation per FR-030. Background-tab behavior per FR-035 (A8).

## 10. Progress and persistence

- **Storage class:** browser local storage for the JSON save; IndexedDB for audio blobs (designed deviation from the sibling's single-store class, because audio is large; A4). No network, no accounts.
- **Keys:** `spec.storytellingAndVoiceRecording.v1` (local storage); database `spec.storytellingAndVoiceRecording.v1`, store `clips` (IndexedDB).
- **Shape:** `{ "current": Story|null, "sceneIndex": 0-3, "gallery": GalleryItem[≤12], "tool": "crayon", "color": "#E23A3A", "updatedAt": "<ISO-8601>" }` — `Story`, `Scene`, `ClipRef`, `Stroke`, `Sticker`, `GalleryItem`, `ClipRecord` per section 12.
- **Save points:** after each completed action (leading + trailing 5 s debounce per FR-022); immediate writes on a clip commit, on HOME, on a Gallery Save, and on export completion; `updatedAt` refreshes on every write. Clip blobs are written to IndexedDB at commit, never debounced (each clip is ≤15 s and ≤256 KB at the FR-016 128 kbps target).
- **Restore:** on load, Play resumes `current` at `sceneIndex` when it holds at least one stroke, sticker, or recording; otherwise a new story starts at scene 1. Clip references are resolved from IndexedDB; a missing blob becomes an empty audio slot without error. The undo stack, in-progress strokes, the held sticker, the open tray, and the active modal are deliberately not persisted.
- **Reset:** hold the title logo 3 s (filling ring) or hold Enter/Space 3 s on it → clears the local-storage key, clears the `clips` store, and clears all in-memory progress; the Gallery returns to empty and the next Play starts a fresh story. The logo is shown only on `title`.
- **Deliberately not stored:** in-progress strokes, undo history, object URLs, thumbnails of unsaved work, idle/timer state, audio settings, the arm/delete timers, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled; hints and debounced saves may fire late and never lose work (FR-035, A8). Microphone permission is remembered per origin; denial is handled by FR-021. Storage blocked or over quota → in-memory run with FR-030 degradation. One JSON key plus one clips store; no shared kernel.

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy character, art, audio, or name appears. Programmatic stubs (SVG / WebAudio / speechSynthesis) are acceptable when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `scene_title` | image | storybook scene behind Play (hills, sun, open book) | 1024×768 SVG | static | SVG shapes |
| `bg_scene` | image | flat paper tint `#FFF8EC` with subtle dots | 1024×768 SVG | static; behind all scenes | SVG rect + dots |
| `sticker_{kind}` ×16 | image | original sticker art per §8 (same 16 kinds as the sibling) | 96×96 SVG each (scales) | static; pop/bounce | SVG shapes |
| `pict_home`, `pict_prev`, `pict_next`, `pict_undo`, `pict_mic`, `pict_stop`, `pict_speaker`, `pict_speaker_slash`, `pict_stickers`, `pict_gallery`, `pict_export`, `pict_close`, `pict_trash`, `pict_save`, `pict_play` | image | chrome pictograms (house, left/right arrows, curved arrow, microphone, square, speaker, crossed speaker, star sheet, frame grid, out-of-box arrow, X, bin, plus, green triangle) | 64×64 SVG each (Play 96×96) | static | SVG paths |
| `pict_export_ok`, `pict_export_fail`, `pict_storage_full`, `pict_mic_slash` | image | success arrow, sad arrow, disk with slash, crossed microphone | 120×120 SVG | toast | SVG paths |
| `ring` | image | 6 px progress ring for the reset hold, rec ring, and play ring; 4 px red variant for the replace-arm and delete-arm rings | 96×96 SVG | during hold / record / playback / arm | SVG circle |
| `sfx_soft_tap`, `sfx_tap`, `sfx_pop`, `sfx_erase`, `sfx_undo`, `sfx_boop`, `sfx_chime_save` | audio | muted tap 0.10 s; UI click 0.08 s; bubble pop 0.15 s; swish 0.25 s; reverse blip 0.20 s; low boop 0.12 s; 3-note chime 0.8 s | 0.08–0.8 s each | one-shot | WebAudio blips/arpeggios |
| `vo_color_*` ×10, `vo_sticker_*` ×16 | audio | the sibling's color and sticker names | ≤1.2 s each | one-shot | TTS allowed |
| `vo_scene_1..4` | audio | "Scene one." … "Scene four." | ≤1.2 s each | one-shot | TTS allowed |
| `vo_new_story`, `vo_rec_saved`, `vo_too_short`, `vo_mic_off`, `vo_audio_unsaved`, `vo_saved`, `vo_make_room`, `vo_exported`, `vo_export_fail`, `vo_deleted`, `vo_storage_full`, `vo_hint_*` ×5 | audio | copy in §9 | ≤3 s each | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink outline `#3A3A3A`, home accent `#5FBF6F` (Play), chrome `#FFFDF7`, record red `#E23A3A`, plus the 10 colors of §8.
- **Typography:** none — the activity shows no visible text; visible glyphs are art only. Invisible names use the system rounded stack via accessibility APIs only.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → continue silently (FR-030); missing clip blob → empty audio slot (FR-023).

## 12. State and data shapes

```
Story      = { scenes: Scene[4], createdAt: <ISO>, updatedAt: <ISO> }
Scene      = { strokes: Stroke[], stickers: Sticker[], audio: ClipRef|null }
ClipRef    = { clipId: "c_…", durationMs: 1000–15000 }
Stroke     = { tool: "crayon"|"brush"|"rainbow", color: "#RRGGBB", width: 12|16|28, points: [x, y][] }
Sticker    = { kind: string, x: number, y: number }                   // center; box 96×96 clamped to bounds
GalleryItem= { id: "g_001"…, story: Story, thumb: "data:image/webp;base64,…", createdAt: <ISO>, updatedAt: <ISO> }
SaveObject = { current: Story|null, sceneIndex: 0|1|2|3, gallery: GalleryItem[], tool: string, color: "#RRGGBB", updatedAt: <ISO> }
ClipRecord = { clipId: "c_…", mime: "audio/webm;codecs=opus"|"audio/mp4", blob: Blob,
               durationMs: 1000–15000, savedAt: <ISO> }               // IndexedDB store `clips` only
Runtime (not persisted) = { state, sceneIndex, tool, color, undoStack: UndoEntry[≤20], heldSticker, trayOpen,
                            recording: { startedAt, armUntil }|null, playing: clipId|null,
                            canvasCursor: {x, y}, deleteArm: {id, until}|null, idleTimer, saveTimer, clipUrls }
UndoEntry  = { type: "stroke", stroke } | { type: "sticker_add", index }
           | { type: "sticker_move", index, from, to } | { type: "sticker_remove", index, sticker }
           | { type: "erase", strokes: Stroke[], stickers: { index, sticker }[] }
```

- **Validation (build-time assertions):** exactly 4 `Scene` records per story; ≤300 strokes per scene and ≤600 per story; ≤1,500 points per stroke; ≤100 stickers per scene and ≤200 per story; ≤1 clip per scene with `1000 ≤ durationMs ≤ 15000`; the clip store holds ≤52 clips and ≤14 MB with every stored clip ≤256 KB; gallery ≤12; clip references resolve from IndexedDB or are dropped to `null` on load; `tool`/`color` in the §8 lists. A failing record fails the build, not runtime.
- **Coordinates:** all persisted geometry uses artwork units (x 0–1024, y 0–768, origin top-left); screen positions are derived per FR-014 and never stored.
- **Determinism:** authored content and rules are fixed (FR-036); `createdAt`/`updatedAt` are the only wall-clock values, and they never affect play.

## 13. Requirements (engine-agnostic)

- **R-001** The activity shall render 2D vector art: variable-width round-capped polyline strokes, sticker sprites, scene backgrounds, and thumbnails.
- **R-002** The activity shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet by caching each scene's committed artwork into a layer and re-rendering only the active stroke per frame.
- **R-003** The activity shall track pointer down/move/up/cancel with coalesced events and map positions into artwork units (FR-014).
- **R-004** The activity shall handle multi-touch per FR-032.
- **R-005** The activity shall support keyboard focus and activation for every interactive element, including the canvas cursor, the 3 s reset hold, and starting a recording (FR-033).
- **R-006** The activity shall play concurrent one-shot sfx, at most one voice clip at a time (recording playback counts as a voice), and an optional music loop at 0.15 (FR-020, FR-029).
- **R-007** The activity shall capture microphone audio with `getUserMedia` + `MediaRecorder`, only from a user gesture, and shall tolerate denial, rejection, or unavailable APIs without ending the session (FR-016, FR-021).
- **R-008** The activity shall persist and restore one small JSON save object in browser local storage plus audio blobs in IndexedDB with the FR-023 budget, tolerate blocked or full storage, and run unsaved in memory (FR-022, FR-023).
- **R-009** The activity shall export a 2048×1536 PNG via file download or the Web Share file sheet (FR-025).
- **R-010** The activity shall run offline with no network requests after initial load.
- **R-011** The activity shall scale from 768×1024 to 1366×768 and down to 320×480 without losing art, recordings, tool, scene, or save state (FR-014, FR-015).
- **R-012** The activity shall provide hit targets ≥64 CSS px except the documented 48×48 swatch (portrait and small) exception (Play ≥112, chrome ≥72) with 4 px focus indicators at ≥3:1 contrast.
- **R-013** The activity shall expose an invisible accessible name on every interactive element (FR-034).
- **R-014** The activity shall render no visible text; all UI is pictograms and art.
- **R-015** While the tab is backgrounded, the activity shall stop and commit a recording, commit an active stroke, pause idle hints, and lose no work (FR-035).
- **R-016** When storage, microphone, playback, or export fails, the activity shall degrade per FR-021, FR-023, and FR-030 without ending the session.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play (≥112 px) and the logo (≥72 px), and no audio has played (FR-001, FR-029) |
| AC-02 | `title`, no save | Play is pressed | a four-scene story opens at scene 1 on paper, the dots show 1 of 4, and "Let's tell a story!" plays after the gesture (FR-002, FR-003) |
| AC-03 | a save whose `current` has strokes on scenes 1 and 4, a sticker on scene 2, and a recording on scene 3 | the page reloads and Play is pressed | the story reopens at the saved scene with all strokes, stickers, and the recording in place (FR-002, FR-004, FR-022) |
| AC-04 | one stroke on scene 1 and one sticker on scene 2 | Next, then Previous are pressed | each scene keeps its own art, the undo stack is empty after each change, the dots track the scene, and "Scene 2." is spoken (FR-004) |
| AC-05 | scene 1, crayon selected | a stroke is drawn | a 12-unit 0.85-alpha stroke follows the pointer and stays after release (FR-005, FR-006) |
| AC-06 | brush and rainbow crayon | a stroke is drawn with each, then a swatch is tapped | the brush renders 28 units at 1.0 alpha; the rainbow stroke cycles red→orange→yellow→green→blue→indigo→violet every 64 units from red at its start; the color name is spoken at most once per 3 s (FR-005, FR-007) |
| AC-07 | one stroke and one sticker on the scene | one eraser swipe touches both, then Undo is pressed | both disappear as one action, Undo restores both together, and a recording on the scene is untouched (FR-008, FR-013) |
| AC-08 | an empty scene | empty space is tapped, then two quick taps land on the same empty spot | no dot appears, no stroke starts, nothing is erased, and each tap plays a soft tap (FR-009, FR-032) |
| AC-09 | the sticker tray open | a thumbnail is tapped then the canvas; another thumbnail while held; then the Record button | the sticker pops in at the tap with its name; the swap replaces the held sticker; the Record press cancels the held sticker leaving no ink (FR-010, FR-011) |
| AC-10 | one placed sticker | dragged 100 px, released, then dragged 6 px | the first drag moves it with a bounce and Undo restores its old position; the second changes nothing and only bounces (FR-012, FR-013) |
| AC-11 | 200 stickers and 600 strokes placed across the story | another placement and another stroke start are attempted | both are ignored with a soft tap and existing content, art, and recordings are unchanged (FR-006, FR-011) |
| AC-12 | a stroke at its 1,500-point cap | the pointer keeps moving, then lifts | no new ink appears, existing ink stays, and the stroke commits and undoes normally (FR-006) |
| AC-13 | stickers, eraser, crayon, and Undo each used once | Undo is pressed once, then twice quickly, then with an empty stack | exactly one reversal occurs per 300 ms, each reversal animates out over 200 ms, and the empty stack is dimmed and only soft-taps (FR-013) |
| AC-14 | a scene mid-stroke with a recording playing | Next scene is pressed | the stroke commits, playback stops, scene 2 appears with its own art, and scene 1's recording is intact on return (FR-004, FR-019) |
| AC-15 | scene 1 with no recording, microphone allowed | Record is pressed | the button pulses while the browser asks; 1.0 s after the grant the red dot pulses and the ring drains; drawing still works; no app audio plays while recording (FR-016, FR-020, FR-029) |
| AC-16 | a recording in progress | 15 s pass | recording stops automatically, the clip commits with "Nice!", the Play button swells, and the microphone indicator goes off (FR-016, FR-017) |
| AC-17 | a recording in progress, a previous clip on the scene | Stop is pressed after 0.4 s | the clip is discarded with a soft tap and "That was very short. Try again!", and the previous clip is unchanged (FR-017) |
| AC-18 | a scene with a recording | Record is pressed once, then again after 3 s, then twice within 2.5 s | the first press arms with a pulsing ring and changes nothing; the expired arm changes nothing; the second pair starts a new recording while the old clip stays playable until the new one commits (FR-018) |
| AC-19 | a scene with a 6 s recording | Play voice is pressed, then pressed again after 2 s; then on a scene with no recording | audio plays with a ring draining over ≈6 s; the second press stops it early; the empty scene's button is dimmed and only soft-taps (FR-019) |
| AC-20 | a hint voice playing; then a recording playing and the scene left untouched for 15 s | Play voice is pressed during the hint, then idleness continues | starting playback cancels the hint and the recording plays; the paused idle timer lets no hint cut the playback short (FR-020, FR-028) |
| AC-21 | microphone denied; then a browser without `MediaRecorder` | Record is pressed in each case | both dim Record with a crossed-mic badge, show a mic-slash toast and "Ask a grown-up to turn on the microphone." at most once per 30 s, and leave all art, sticker, gallery, and export features working (FR-021, FR-030) |
| AC-22 | a story with recordings on two scenes, saved in the Gallery | the page reloads, Play is pressed, and a different gallery item is deleted and saved | both scenes play their recordings; the deleted item's clips are gone while the current story's clips still play (FR-022, FR-023, FR-024) |
| AC-23 | 52 stored clips | a new clip is committed | the oldest clip not in the current story is evicted; if nothing can be evicted the clip stays playable for the session with "You can listen now, but this voice can't be saved." (FR-023) |
| AC-24 | IndexedDB blocked | a clip is committed and the page reloads | the clip played before reload, the story reloads with an empty audio slot on that scene and its art intact, and the warning played once (FR-023, FR-030) |
| AC-25 | three gallery items | Save is pressed, then item 2 is opened | a fourth tile pops in with "Saved!"; opening item 2 auto-saves the current story first and loads item 2 at scene 1 (FR-024) |
| AC-26 | 12 gallery items | Save is pressed | the oldest tile fades over 1.5 s as the new story saves, all 13 tiles fit without scrolling at 320×480, and "I made room for your new story." plays (FR-024) |
| AC-27 | any gallery item | its delete is tapped, then tapped again within 2.5 s; then another delete is tapped once and cancelled | the first two taps delete it with a shrink and "Deleted."; the single tap only arms and cancels on the next tap (FR-024) |
| AC-28 | a story with strokes and stickers on scene 3 | Export is pressed on scene 3 | a 2048×1536 PNG named `story-scene3-YYYYMMDD-HHMMSS.png` downloads (or the share sheet opens), the spinner runs ≤2 s, and the success chime and "Saved to your device!" play (FR-025) |
| AC-29 | `title` | the logo is held 3 s; then the page reloads and Play is pressed | the ring fills during the hold, the save and all stored clips are cleared, and Play starts a fresh story with an empty gallery (FR-026) |
| AC-30 | a recording in progress and a stroke in progress | HOME is pressed, then the page reloads and Play is pressed | the recording commits (≥1.0 s), `title` appears, and the clip and art return on that scene (FR-027) |
| AC-31 | an empty scene idle for 15 s; then scene 2 with stickers idle for 15 s | idleness continues | the Record button pulses with "Tap the microphone to record your voice."; the later state pulses the Next arrow with "Tap the arrow for the next scene."; any tap resets the timer (FR-028) |
| AC-32 | a stroke in progress, then a recording in progress | a second finger touches the canvas, then a third touches a tool | only the first pointer draws; the tool press commits the stroke at its last point; the recording keeps running and no audio is lost (FR-032) |
| AC-33 | keyboard focus on the canvas; then on Record | arrows move the cursor, Space draws, Enter places a held sticker, Shift+Enter picks up and moves a placed sticker, Delete removes a sticker, Ctrl/Cmd+Z undoes, Escape returns HOME, Enter starts a recording | each action matches its pointer equivalent and focus order follows section 6 (FR-033) |
| AC-34 | a screen reader active | `title`, `story`, and `gallery` are navigated | every control announces an invisible name ("Record your voice", "Play your recording, 8 seconds", "Undo, 3 actions available", "Scene 2 of 4", "Saved story 2") and no visible text appears (FR-034) |
| AC-35 | a recording in progress and a stroke in progress | the tab is hidden, then shown | the recording commits (≥1.0 s), the stroke commits, playback stops, the microphone is released, and nothing replays on return (FR-035) |
| AC-36 | any state | random taps, double-taps, rapid repeated taps, idle for one minute, unbound keys, and an offline reload are applied | no art or recording is erased, no score appears, no timer ends anything, unknown events change nothing, and everything still runs offline (FR-031, FR-036) |
| AC-37 | a story mid-recording with art on scene 2 | the viewport is resized from 1024×768 to 768×1024, then to 360×640 | the recording continues without loss, art is identical and centered, chrome reflows to the section 8 breakpoints, and tool, color, and scene stay selected (FR-014, FR-015) |
| AC-38 | speech synthesis unavailable; then no AudioContext | the activity is played normally | each case stays fully playable with visual cues only and silent without audio; art, recordings, and the Gallery are unaffected (FR-030) |
| AC-39 | blocked local storage; then an export that fails; then a share that is cancelled | the activity is played normally and export is attempted in each case | the run continues in memory for the session and the first failed write shows the disk-with-slash pictogram with "There is no room to save. Your story is still here." at most once per 30 s; the failed export shows a 3 s failure toast with "Ask a grown-up to save your story." and the story is kept; the cancelled share plays a soft tap and is not an error (FR-025, FR-030) |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. One full story works end-to-end: draw and color scenes 1–4, place/move/erase stickers, record and re-record voice on two scenes, play both back, undo, save to the Gallery, and export a scene PNG.
3. The four-scene shape, tool/palette/sticker sets, clip budget, and save object exist in the section 12 shapes; `current`, recordings, and the Gallery survive a reload; the 3 s hold clears them.
4. No fail state exists; empty taps, caps, multi-touch, microphone denial, IndexedDB blocking, and hidden-tab behavior match sections 5 and 14.
5. No visible text, no Khan Academy asset or character, no network request, and no app audio captured by a recording appears anywhere.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 4 scenes per story, free canvas (no region fills, no coloring pages), 4-dot indicator, no page-picker state | designed — official text says "scenes"; count and navigation invented to bound a session and the save |
| A2 | Tools, palette, and the 16 stickers are exactly the sibling's sets and behaviors | designed — keeps the two Create specs one family |
| A3 | Recording: 15 s cap, 1.0 s minimum, one clip per scene, 2.5 s armed re-record, visual-only while recording, all output suspended while recording | designed — numbers chosen for ages 2–8; suspension prevents the app capturing its own sound (FR-016, FR-020) |
| A4 | Clip persistence: IndexedDB `clips` store, 52 clips / 14 MB (worst case 52 = 12 gallery stories × 4 scenes + the current story's 4 clips), oldest non-current eviction as the safety valve, GC after JSON saves, session-only when IndexedDB is blocked | designed — audio exceeds localStorage; deviation flagged in section 3 (D4) |
| A5 | Export is a scene-level 2048×1536 PNG (download or share sheet) with no audio, because browsers have no camera-roll API and A/V video export is out of scope | designed — FR-025, D6 |
| A6 | TTS clips or runtime TTS are acceptable; voice copy is fixed, timbre/language are build freedom | designed |
| A7 | Browsers block autoplay until the first gesture; microphone access needs a secure context and a user gesture; permission state is remembered per origin | platform fact — FR-016, FR-021, FR-029 |
| A8 | Background-tab timers may be throttled; hints and debounced saves fire late, never losing work | known platform behavior — FR-035 |
| A9 | Idle threshold 15 s; tap tolerance 8 px; sticker-move threshold 12 px; undo throttle 300 ms; replace/delete arms 2.5 s; save debounce 5 s; 3 s reset hold suit ages 2–8 | designed — may widen, never tighten, without a spec revision |
| A10 | The sibling spec's canvas, sticker, gallery, and export conventions are reused; deliberate deviations (scene model, no fills, audio store, scene-level export) are marked designed in section 3 | designed |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the 4-scene shape and navigation, tool/palette/sticker sets and order, artwork space and layout breakpoints, stroke/sticker/clip caps, undo stack size and throttle, tap tolerance, recording numbers and flow, armed re-record, playback and voice-channel rules, save key and data shapes, clip budget and garbage collection, gallery size/delete/FIFO behavior, export size and naming, reset gesture, no fail state, no visible text, asset provenance, acceptance criteria.
- **Free:** art style within the guidance, easing curves, particle positions and looks, title-scene decoration, sticker and scene composition, voice timbre/TTS engine, optional music, exact clip mime preference within the stated fallbacks, thumbnail rendering details.
- **Not in this spec:** region fills and coloring pages (sibling spec), background/scene-tint picker, adding or removing scenes beyond the fixed four, a delete-recording control, text/type/shape tools, audio or music recording, video or audio-file export, voice effects, zoom/pan/layers, sticker scaling/rotation, profiles, navigation shell, parental controls, localization, analytics, teacher tooling, printing, and any scoring or unlock system.
