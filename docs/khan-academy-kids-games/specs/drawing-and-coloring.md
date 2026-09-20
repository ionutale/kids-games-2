# Drawing and coloring

## 1. Front matter

- **Title:** Drawing and coloring (catalog name, kept for traceability only; the activity is untitled on screen)
- **Entry type:** Activity (creative tool) — sandbox drawing/coloring canvas; no levels, no fail state, no score
- **Catalogued entry:** [`drawing-and-coloring.md`](../drawing-and-coloring.md) — Create tab
- **Official sources:** [Help Center — How to use creative tools inside the Khan Kids app](https://khankids.zendesk.com/hc/en-us/articles/21188738836763-How-to-use-creative-tools-inside-the-Khan-Kids-app), [Help Center — Find books and lessons in the Library](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library)
- **Spec status:** v1 — follows template v1; pending blind-build test
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch (pointer), mouse, and keyboard; sound on; no network after load
- **Conditional sections:** all 16 included; section 8 carries content data instead of levels (none exist)
- **IP constraint:** all pages, stickers, art, and voices are original; no Khan Academy characters, art, audio, names, or content. The official "app characters" page category is realized as **original characters only** (designed)

## 2. Overview and learning objective

A child picks a coloring page or a plain background, fills regions with a tap, draws freehand with a
crayon, brush, or rainbow crayon, adds and moves stickers, erases and undoes, then saves the picture
to the Gallery or exports it to a file. The skills are **creative expression, color and tool choice,
and fine-motor control** (steady freehand strokes), matching the officially described Create content
("coloring pages… backgrounds, stickers, and colored pencils/crayons including a rainbow crayon, with
an undo option") and the official creative-expression subject area (drawing, coloring, self-expression,
ages 2–8). Age band: **2–8**; the tap-to-fill flow and chunky targets serve 2–5, freehand stroke and
sticker control extend to 8. Expected session: **5–15 minutes** (one to three pictures); a session can
end at any point with nothing lost. This spec's canvas, sticker, gallery, and export conventions
(sections 5–12) are the family reference for the sibling
[`storytelling-and-voice-recording.md`](storytelling-and-voice-recording.md) spec.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Create includes coloring pages — animals, vehicles, app characters, and seasonal | official | Entry file; Library article |
| O2 | Create includes backgrounds and stickers | official | Entry file |
| O3 | Coloring tools are "colored pencils/crayons including a rainbow crayon", with an undo option | official | Entry file; Creative tools article |
| O4 | Creations are saved to a Gallery and can be exported to the device's camera roll | official | Entry file; Library article |
| O5 | Create content is not level-filtered | official | Entry file "Levels" line |
| O6 | The app covers ages 2–8 and the creative-expression subject (drawing, coloring, self-expression) | official | Catalog lines 96, 112 |
| O7 | Official sources name categories and tools only; no canvas behavior, counts, sizes, gallery UI, or export flow are described | official (absence) | Entry file description is the whole official claim set |
| D1 | 28 pages: 24 coloring pages (6 animals, 6 vehicles, 6 original characters, 6 seasonal) + 4 backgrounds; all original art | designed | O1 names categories only; counts and art invented; the "app characters" category is built with original characters (IP constraint) |
| D2 | Artwork space 1024×768, stroke model, tool widths, 10-color palette, region-fill rule | designed | O3 names tools but gives no numbers |
| D3 | Sticker system: 16 originals, 96×96 placements, drag to move, eraser to remove | designed | O2 names stickers only |
| D4 | Gallery = up to 12 locally stored creations, two-step delete, oldest-item replacement when full | designed | O4 says a Gallery exists; size and behavior invented for browser local storage |
| D5 | Export = 2048×1536 PNG download, with the Web Share sheet when the browser exposes file sharing | designed | O4 says camera roll; **no camera-roll API exists in a browser**, so this is the designed equivalent (FR-019) |
| D6 | Undo = 20 reversible actions; eraser removes whole strokes and stickers | designed | O3 names undo only |
| D7 | Title, Play, HOME, 3 s reset hold, idle hints, audio rules, degradation, layouts, accessible names | designed | Template v1 family conventions |
| D8 | No fail state, no score, no timer, no unlock; every mis-tap is safe | designed | Template "never punishing" rule |
| D9 | All art, audio, voices, and copy are original; no Khan Academy content | designed | IP constraint |

## 4. Player experience / core loop

A child presses Play; 28 page thumbnails appear. They tap the cat. The cat outline appears on paper.
They tap its head — it fills yellow and a voice says "Yellow!" They pick the rainbow crayon and
scribble across the body; the stroke cycles red → orange → yellow → green. They open Stickers, tap the
star, tap the sky — the star pops in with "Star!" and a bounce. They drag it 100 px left; it drops and
bounces. A stray scribble crossed the eyes; they take the eraser, swipe through it, and the whole
scribble puffs away — then Undo brings it back, and they erase again. They save to the Gallery
("Saved!"), export a file ("Saved to your device!"), and press HOME. The next day, Play returns them
to the same half-finished cat.

**Core loop:** choose a page → fill regions / draw strokes / place stickers → erase or undo → save to
the Gallery or export → resume later.

## 5. Mechanics and rules

- **FR-001** When the activity loads, it shall show `loading` (preload page art and audio) then `title`: a decorative crayon scene, Play (≥112×112 CSS px), and a logo emblem (≥72×72) that is the reset control (FR-021). No audio plays before the first gesture (FR-024).
- **FR-002** When Play is pressed, the activity shall unlock audio and then either (a) resume `current` when the save's `current` holds at least one stroke, fill, or sticker — loading its page and artwork — or (b) open the page picker `pages` when no save exists or `current` is empty.
- **FR-003** The page picker shall show all 28 pages (FR content order in §8) as a grid that fits without scrolling: 7 columns × 4 rows at ≥900 px wide with thumbnails ≥112×84 CSS px, or 4 columns × 7 rows below 900 px wide with thumbnails ≥64×48 CSS px; cells fill the modal width. Each thumbnail shows the page's outline art over its background tint, with a 4 px accent ring on the current page; the picker is a modal over the preserved canvas and has a Close button ≥72×72. Visible text: none.
- **FR-004** When a page is selected, the activity shall first write the gallery auto-save (FR-018) when the canvas holds content, then load the page with `fills = {}`, `strokes = []`, `stickers = []`, clear the undo stack, play a 400 ms fade-in with `vo_new_page` (0.9, one-shot), and start `drawing` on that page. Selecting the page already loaded shall instead close the picker with no gallery write, no reload, and no fade-in, and play `sfx_soft_tap` (0.4).
- **FR-005** The tool row shall offer exactly four tools — Crayon (12-unit round line, alpha 0.85), Brush (28-unit round line, alpha 1.0), Rainbow crayon (16-unit, alpha 1.0, FR-007), Eraser (48-unit tip, FR-008) — and the palette shall offer exactly 10 colors (§8). The selected tool and color shall show a 4 px selection ring and a 1.1× swell; both persist in the save (`tool`, `color`) and are restored on load. `official` base: crayons/pencils incl. rainbow and undo.
- **FR-006** When a pointer goes down on the canvas with a drawing tool selected and not on a placed sticker (FR-014), a stroke shall start with that tool and color; while the pointer moves, a point is appended when ≥4 artwork units from the last point (pointer events are coalesced where available), and ink renders live; when the pointer lifts or is cancelled, the stroke is committed as one undo entry and one save trigger (FR-020). Caps: 1,500 points per stroke (further input is ignored until pointer-up; existing ink stays), 300 strokes per work (further stroke starts are ignored with `sfx_soft_tap`); neither cap ever deletes existing ink.
- **FR-007** The rainbow crayon shall color each stroke deterministically: the hue index is `floor(arcLength / 64) mod 7` over the fixed list red `#E23A3A`, orange `#F28C28`, yellow `#F5D547`, green `#4CAF50`, blue `#2E9BD6`, indigo `#4B4FE2`, violet `#7A4FBF`, starting at red at arc length 0 for every stroke.
- **FR-008** When the eraser pointer contacts ink or a sticker, it shall remove each whole stroke whose centerline comes within `24 + strokeWidth/2` units of the eraser point and each whole sticker whose 96×96 box intersects the eraser point (48 units); region fills are never erased. All removals during one eraser stroke form one undo entry. An eraser stroke touching nothing changes nothing and is not saved or stacked.
- **FR-009** A pointer-down and -up on the canvas with a drawing tool that moves ≤8 CSS px shall count as a quick tap; with the eraser it is eraser contact (FR-008). A quick tap is judged against the topmost placed sticker first (FR-014), then the page's regions: the region whose path contains the point wins; if none contains it, the nearest region within 12 CSS px wins; ties resolve to the smaller-area region, then the lower region index. Taps on backgrounds and empty space are FR-011.
- **FR-010** When a quick tap hits a region, the activity shall set that region's fill to the current palette color with a 200 ms cross-fade and one undo entry; it shall play `sfx_fill` (0.5) and speak the color name (`vo_color_*`, 0.8, at most once per 3 s). Tapping a region already in the current color changes nothing and plays `sfx_soft_tap` (0.4) only; the rainbow tool never colors fills (the palette color is used).
- **FR-011** When a quick tap hits no sticker and no region (backgrounds, blank space, outside every outline), nothing on screen changes and `sfx_soft_tap` (0.4) plays. Empty taps never draw a dot, never remove anything, and reset the idle timer.
- **FR-012** The Stickers button shall toggle a sticker tray (bottom sheet) showing the 16 originals (§8) in fixed order as thumbnails ≥80×80 CSS px (2 rows × 8; portrait 4 rows × 4): tapping a thumbnail picks that sticker up as the held sticker (thumbnail lifts 1.2×; `sfx_soft_tap` 0.4).
- **FR-013** While a sticker is held it shall follow the pointer without drawing. When the pointer lifts over the canvas, or any canvas quick tap lands, the sticker is placed centered there and clamped so its 96×96 box stays inside 0–1024 × 0–768; placing plays `sfx_pop` (0.5), a 160 ms pop-in with drop bounce, `vo_sticker_*` (0.8, one-shot), and one undo entry. A second thumbnail tap swaps the held sticker (the first is not placed). Activating any chrome control changes state or cancels the held sticker (Pages, Gallery, Export, HOME, or a tool) with no ink and no save; there is no trapping cancel state. Cap: 100 placed stickers per work; a placement beyond the cap is ignored with `sfx_soft_tap`.
- **FR-014** A pointer-down within the topmost placed sticker's 96×96 box (latest placed wins overlaps) shall suppress drawing entirely: moving ≥12 CSS px moves that sticker (one undo entry on release, `sfx_soft_tap` 0.3, drop bounce); moving <12 px is a no-op with the bounce only. Moving does not change sticker layering. Strokes render beneath stickers.
- **FR-015** The Undo button (≥72×72) shall reverse the most recent undo entry — stroke, fill, sticker add, sticker move, sticker remove, or one eraser action — with a 200 ms un-draw animation and `sfx_undo` (0.5). The stack holds the last 20 entries; it is cleared on page change and on reset, and there is no redo (a new action after undo simply pushes a new entry). With an empty stack the button shows at 40% opacity and a press plays `sfx_soft_tap` (0.4) only. Undo is throttled to one reversal per 300 ms; a double-tap undoes once.
- **FR-016** The artwork space shall be 1024×768 units. The canvas view is scaled uniformly to fit its box (section 8 breakpoints), never distorted, with ≥24 px padding wherever the box leaves slack and a displayed view never below 224×168 CSS px (at 320×480 it is exactly 224×168); pointer coordinates map through the inverse transform, so strokes, fills, and stickers are stored in artwork units and are unaffected by resize or rotation. No zoom, pan, or rotate gestures exist.
- **FR-017** Layout per the section 8 breakpoint table; all targets ≥64 CSS px except the documented 48×48 swatch (portrait and small) and 64×48 page-thumbnail (below 900 px wide) exceptions, chrome ≥72 landscape / 64 portrait and small, and nothing requires scrolling from 320×480 up. Every interactive element carries a 4 px focus indicator at ≥3:1 contrast.
- **FR-018** The Gallery button shall open a modal `gallery` with: a Save tile (first, sized like the item tiles) that saves the current work as a new item (`sfx_chime_save` 0.6, `vo_saved` 0.9, thumbnail pops 1.2×), then up to 12 saved items in newest-first order as a grid that fits without scrolling (5 columns × 3 rows at ≥900 px wide with tiles ≥160×120 CSS px; 3 columns × 5 rows below 900 px wide with tiles ≥96×72 CSS px), each with a 256×192 WebP thumbnail (quality 0.7, ≤24 KB; PNG fallback), an invisible name including its index, and a delete button (≥64×64). Delete is two-step: the first tap arms the item for 2.5 s (delete arm, `sfx_boop` 0.3), a second tap within 2.5 s deletes it (`sfx_soft_tap` 0.4, `vo_deleted` 0.8, 200 ms shrink), and any other tap cancels. Opening an item auto-saves the current work when non-empty, then loads that work (FR-004 semantics for the undo stack) with `sfx_pop` (0.4). When the gallery is full (12) and a save is requested — Save tile or a page-change auto-save — the oldest item (lowest `createdAt`) is removed first with a 1.5 s fade-out, `sfx_soft_tap` (0.4), and `vo_make_room` (0.9); the new work is always saved. An empty canvas at a page change triggers no auto-save. The Gallery has a Close button ≥72×72.
- **FR-019** The Export button shall render the artwork at 2× (2048×1536) — background, fills, page outline, strokes, stickers; no chrome — then: when `navigator.canShare({files})` accepts the PNG, open the system share sheet; otherwise trigger a download named `drawing-YYYYMMDD-HHMMSS.png`. A rotating 48 px ring shows during rendering (≤2 s). On share/download start: `sfx_chime_save` (0.6) and `vo_exported` (0.9) with a 2 s success toast (arrow-out-of-box pictogram). A cancelled share plays `sfx_soft_tap` (0.4) and is not an error. On failure: a 3 s failure toast and `vo_export_fail` (0.9); the artwork is kept. `official` base: camera-roll export; this browser equivalent is designed (D5) — no camera-roll API exists.
- **FR-020** The activity shall persist `current` at most once per 5 s: after each completed action (stroke commit, fill, sticker place, sticker move, sticker remove, eraser action, undo) it saves immediately when ≥5 s have passed since the last write, otherwise 5 s after the last action; it also saves on HOME, on page selection (after the FR-018 auto-save decision), on export completion, and on a Gallery Save. `updatedAt` refreshes on every write. Shape per section 10.
- **FR-021** When the title logo is held 3 s, a visible progress ring shall fill for the hold; releasing early resets the ring with no action; completion clears `spec.drawingAndColoring.v1` and all in-memory progress (gallery returns to empty) and plays a 400 ms 1.1× emblem pulse with `sfx_soft_tap` (0.5). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent; a hidden tab cancels the hold (FR-029).
- **FR-022** HOME (≥72×72, 24 px top-left margin) shall exist in every state except `loading`; it cancels the held sticker, commits an active stroke at its last point, cancels all timers (idle, delete arm, FIFO notice, export render), saves, and returns to `title`. Escape is the keyboard HOME (FR-027). On `title` no HOME is rendered and the key is a no-op.
- **FR-023** When no pointer, key, or switch input has occurred for 15 s, a hint shall play, targeting deterministically: on `title` the Play target hint-pulses 2.5 s with `vo_hint_play` (0.9, visual-only before the first gesture); on `drawing` with an empty canvas the Crayon tool pulses with `vo_hint_draw` (0.9); with content but zero placed stickers the Stickers button pulses with `vo_hint_stickers` (0.9); otherwise the Pages button pulses with `vo_hint_pages` (0.9); on `pages` the first page thumbnail pulses with `vo_hint_pages_choose` (0.9); on `gallery` the Save tile pulses with `vo_hint_save` (0.9). Hints repeat every 15 s of continued idleness; any input, including an empty tap, resets the timer; `exporting` has no hint.
- **FR-024** Audio rules: no audio before the first user gesture; one voice clip at a time (a new voice cancels the previous utterance); sfx may overlap; volumes per section 9; an optional music loop plays at 0.15 and may be omitted. Every instruction and confirmation a non-reader needs is voice plus pictogram.
- **FR-025** Degradation: no speech synthesis → all behavior identical with visual cues only (selection rings, fills, pops, toast pictograms); no AudioContext → fully silent, same behavior; storage blocked or quota-exceeded → the run continues in memory, gallery and `current` work for the session, and the first failed write shows a disk-with-slash pictogram for 3 s with `vo_storage_full` (0.9, at most once per 30 s); export unsupported or failing → FR-019 failure path; a missing visual asset → draw a stub shape and keep playing.
- **FR-026** Multi-touch: the earliest pointer-down on the canvas owns the canvas gesture; further simultaneous canvas contacts are ignored (no ink, no fill, no sticker change) until it lifts; on a timestamp tie the leftmost contact wins. Control taps are processed independently per pointer in pointer-down order; activating any control while a stroke is active commits that stroke at its last point (never losing ink). Two thumbs on two sticker thumbnails: the later tap swaps the held sticker (FR-013).
- **FR-027** Keyboard: Tab moves focus in the section 6 order; Enter/Space activates the focused control; Escape = HOME. With the canvas focused, a 24 artwork-unit cursor moves with the arrow keys (Shift = 96 units; hold repeats every 50 ms), Space starts and ends a stroke at the cursor (polyline through visited cursor positions), Enter acts as a quick tap at the cursor (fill, erase, or empty-tap per FR-009–FR-011), and Delete/Backspace removes the topmost sticker under the cursor (one undo entry). Ctrl/Cmd+Z is Undo. With a sticker held, Enter on the canvas places it at the cursor. Escape always returns HOME (a held sticker is cancelled by FR-022 rather than Escape-first).
- **FR-028** Every interactive element shall carry an invisible accessible name (examples in section 7) and visible text shall be absent everywhere — all UI is pictograms and art; page and sticker thumbnails are images, never labels. Placed stickers are not tab stops but carry an exposed name (e.g. "Star sticker at 720, 180"); they are managed with the canvas cursor (FR-027).
- **FR-029** When the tab is hidden, the activity shall cancel any playing voice, commit an active stroke at its last point (no ink lost), pause the idle timer, cancel a reset hold in progress, and keep the FIFO notice and delete-arm timers until visible time passes; when visible again, nothing replays automatically. Throttled timers may delay idle hints or a debounced save by seconds, never lose work (A7).
- **FR-030** The activity shall have no fail state: mis-taps, empty taps, rapid repeated taps, double-taps, multi-touch, idle time, page changes, and reloads never erase unsaved work, never end a session, and never show a score; the only destructive actions are the eraser, the two-step gallery delete, and the 3 s reset hold, and the eraser is undoable.
- **FR-031** Unbound keys and unknown events shall be ignored (no state change, no sound). Page order, palette order, sticker order, hue cycle, and layout are fixed; particle positions may vary randomly within section 9 bounds, but nothing that affects state, sequencing, or save data is random. No network requests occur after load.

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank paper background | initial; preload page art and audio; no interactive elements |
| SC-02 | `title` | crayon scene + Play + logo (reset) | audio unlocks on the first gesture here |
| SC-03 | `pages` | page picker modal (canvas preserved underneath) | Close; 28 thumbnails |
| SC-04 | `drawing(pageId, tool, color, trayOpen, heldSticker)` | canvas + chrome + optional sticker tray | main state |
| SC-05 | `gallery` | saved-pictures modal (canvas preserved underneath) | Close; Save tile; ≤12 items |
| SC-06 | `exporting` | canvas + rotating ring | ≤2 s; HOME remains |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | silent start (FR-024) |
| `title` | `PLAY_PRESSED` | `current` has content | `drawing(current)` | resume page, fills, strokes, stickers; save settings |
| `title` | `PLAY_PRESSED` | no save or empty `current` | `pages` | open picker; no page ring |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | ring fill; clear key + memory; pulse + `sfx_soft_tap` |
| `drawing` | `STROKE_COMMITTED` | — | `drawing` | FR-006; push undo entry; schedule save |
| `drawing` | `REGION_TAPPED` | quick tap, region hit | `drawing` | FR-010; fill + voice; push undo entry |
| `drawing` | `EMPTY_TAPPED` | quick tap, no hit | `drawing` | FR-011; `sfx_soft_tap`; idle reset |
| `drawing` | `STICKER_HELD` / `STICKER_PLACED` | tray open | `drawing` | FR-012/FR-013; held follows pointer; place or swap |
| `drawing` | `STICKER_MOVED` | ≥12 px from topmost box | `drawing` | FR-014; push undo entry on release |
| `drawing` | `ERASER_CONTACT` | removes ≥1 item | `drawing` | FR-008; one undo entry; save |
| `drawing` | `UNDO_PRESSED` | stack non-empty, 300 ms clear | `drawing` | FR-015; pop entry; un-draw 200 ms |
| `drawing` | `PAGES_PRESSED` | — | `pages` | cancel held sticker |
| `drawing` | `GALLERY_PRESSED` | — | `gallery` | cancel held sticker |
| `drawing` | `EXPORT_PRESSED` | — | `exporting` | cancel held sticker; render 2× |
| `drawing` | `IDLE_15S` | no input 15 s | `drawing` | FR-023 hint |
| `pages` | `PAGE_SELECTED` | — | `drawing(new page)` | FR-004; gallery auto-save first when canvas non-empty |
| `pages` | `PAGE_SELECTED` | pageId = current | `drawing(same)` | FR-004; close picker; no gallery write or reload; `sfx_soft_tap` |
| `pages` | `CLOSE_PRESSED` | — | `drawing(same)` | no change to work |
| `gallery` | `SAVE_PRESSED` | — | `gallery` | FR-018; FIFO first when full; pop new tile |
| `gallery` | `ITEM_OPENED` | — | `drawing(item page)` | auto-save current when non-empty; load work |
| `gallery` | `DELETE_CONFIRMED` | armed, ≤2.5 s | `gallery` | FR-018; remove item |
| `gallery` | `CLOSE_PRESSED` | — | `drawing(same)` | no change to work |
| `exporting` | `EXPORT_DONE` / `EXPORT_FAILED` | ≤2 s | `drawing` | FR-019; toast 2 s / 3 s |
| any except `loading` | `HOME_PRESSED` / Escape | — | `title` | FR-022; cancel timers/hold; save |
| any except `loading` | `IDLE_15S` | — | same state | FR-023 hint |

**Tab order per state (v1):** `loading` — none; `title` — logo (reset) → Play; `pages` — HOME → Close → 28 page thumbnails in §8 order; `drawing` — HOME → Pages → Undo → Stickers → Gallery → Export → Crayon → Brush → Rainbow crayon → Eraser → 10 swatches left→right → canvas → (tray open) 16 sticker thumbnails in §8 order; `gallery` — HOME → Close → Save tile → item 1 → its delete → item 2 → its delete …; `exporting` — HOME (≤2 s).

**HOME everywhere (v1):** HOME is rendered in `pages`, `drawing`, `gallery`, and `exporting`; it cancels the held sticker, commits an active stroke, cancels idle/delete-arm/FIFO/export timers, saves, and returns to `title`. On `title` no HOME exists and the key is a no-op.

## 7. Input and interaction

- **Primary input:** single-pointer drag on the canvas (draw, erase, move stickers) and tap/click on chrome.
- **Targets (CSS px):** Play ≥112×112; logo and chrome buttons ≥72×72 (≥64 portrait and small); tools 96×96 landscape / 72×72 portrait / 64×64 small; swatches 64×64 landscape / 48×48 portrait and small; sticker thumbnails 80×80 landscape / 64×64 portrait and small; page thumbnails ≥112×84 landscape / ≥64×48 portrait and small; gallery tiles ≥160×120 landscape / ≥96×72 portrait and small; gallery delete ≥64×64 — all at or above the 44 px platform minimum except the 48×48 swatches and 64×48 page thumbnails, documented in FR-003, FR-017, and FR-018.
- **Tap tolerance (numeric):** quick tap = ≤8 CSS px movement with a drawing tool; region hit = containing path, else nearest region within 12 px; sticker grab = topmost 96×96 box; sticker move starts at 12 px; eraser removal ranges in FR-008. Tie rules: topmost (latest) sticker wins overlaps; region ties resolve to smaller area, then lower index.
- **Drag alternative:** every drag has a tap path — tap the sticker thumbnail then tap the canvas to place; move stickers by dragging or (keyboard) by the canvas cursor; no drag is the only route to any action.
- **Multi-touch:** FR-026 (earliest canvas contact owns; leftmost on a tie; control taps independent; tool switch commits the stroke).
- **Keyboard:** FR-027 (Tab order, Enter/Space, Escape = HOME, cursor + Space/Enter/Delete, Ctrl/Cmd+Z). Focus indicator 4 px, ≥3:1 contrast.
- **Instructions without reading:** every action is learnable from voice + pictogram (selection rings, pops, toast pictograms); no visible words appear anywhere in the activity.
- **Accessible names (invisible, examples):** "Play", "Reset saved progress, hold three seconds", "Home", "Drawing canvas, cat page", "Choose a page", "Undo, 3 actions available" / "Undo, nothing to undo", "Stickers", "Gallery", "Save to device", "Crayon", "Brush", "Rainbow crayon", "Eraser", "Color: red"…"Color: gray", "Coloring page: cat", "Background: paper", "Sticker: star", "Save this picture", "Saved picture 2", "Delete saved picture 2", "Close".
- **Viewport:** design spaces 1024×768 (landscape) and 768×1024 (portrait), letterboxed; artwork is stored in artwork units so resize or rotation mid-drawing preserves everything (FR-016); layouts per section 8; no scrolling from 320×480 up.

## 8. Levels and content data

*(No levels: Create content is not level-filtered (O5). This section holds the content, tools, and layout data.)*

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

**Pages (28, fixed picker order).** Outlines are 8-unit `#3A3A3A` strokes drawn above region fills and below child strokes; regions are closed paths that may share edges but never overlap; the entire page record is authored data (§12), all art original.

| Category | IDs | Count | Regions/page | Art guidance |
|---|---|---|---|---|
| Animals | `p_animal_cat`, `p_animal_dog`, `p_animal_fish`, `p_animal_bird`, `p_animal_bunny`, `p_animal_bear` | 6 | 5–10 | simple side-view animals, big rounded shapes, large colorable areas ≥80×80 units |
| Vehicles | `p_vehicle_car`, `p_vehicle_bus`, `p_vehicle_boat`, `p_vehicle_train`, `p_vehicle_plane`, `p_vehicle_bike` | 6 | 6–12 | chunky vehicles, windows/wheels/paths as separate regions |
| Characters (original) | `p_char_robot`, `p_char_dino`, `p_char_owl`, `p_char_snail`, `p_char_penguin`, `p_char_monster` | 6 | 5–10 | original friendly characters; **no Khan Academy character resemblance, names, or art** |
| Seasonal | `p_season_pumpkin`, `p_season_snowman`, `p_season_heart`, `p_season_flower`, `p_season_sun`, `p_season_leaf` | 6 | 4–9 | non-denominational seasonal shapes usable year-round |
| Backgrounds | `bg_paper`, `bg_sky`, `bg_meadow`, `bg_sunset` | 4 | 0 | plain tinted fields (`#FFF8EC`, `#D9EEF9`, `#E7F4DC`, `#FBE3CF`); no outline, no regions; free drawing only |

**Stickers (16, fixed tray order).** All original; placed at 96×96 artwork units, centered.

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

| Class | Chrome | Tool rail / dock | Palette | Sticker tray | Sticker thumbnails | Canvas box |
|---|---|---|---|---|---|---|
| Landscape ≥900 px wide | top bar 88 px, buttons 72×72, 16 px gaps | left rail 120 px, tools 96×96, 16 px gaps | strip 88 px under canvas, 10×64 px swatches, 12 px gaps | 2 rows × 8 | 80×80 | viewport − 88 − 88 tall × − 120 wide, 24 px padding |
| Portrait 640–899 px wide | top bar 88 px, buttons 64×64, 8 px gaps | bottom dock 216 px: tools 72×72, 8 px gaps | 2 rows × 5, 48×48, 8 px gaps | 4 rows × 4 | 64×64 | viewport − 88 − 216 tall |
| Small 320–639 px wide | two 64 px rows, buttons 64×64, 8 px gaps | bottom dock 184 px: tools 64×64, 8 px gaps | 2 rows × 5, 48×48, 6 px gaps | 4 rows × 4 | 64×64 | viewport − 128 − 184 tall (canvas view ≥224×168 at 320×480) |

**Worked example (landscape 1024×768 artwork space, page `p_animal_cat`).** The picker's first thumbnail (row 1, column 1) is the cat. Selecting it clears fills/strokes/stickers and saves the previous work if non-empty. The child taps the head at (300, 260): the head region fills `#F5D547` (200 ms cross-fade), `sfx_fill`, "Yellow!"; undo entry 1. They pick rainbow and drag from (420, 420) to (700, 520) (arc length ≈ 310 units): hues run red → orange → yellow → green → blue (indices 0–4); stroke committed, entry 2. They open Stickers, tap `star`, then tap (820, 180): star placed at (820, 180), pop + bounce, "Star!"; entry 3. They drag the star 100 units left to (720, 180); release bounce; entry 4. They erase across the rainbow stroke, touching it at (500, 450): the whole rainbow stroke puffs away (entry 5 holds the whole removal). They tap Undo: the rainbow stroke redraws over 200 ms; `current` saves with 1 fill, 1 stroke, 1 sticker, `updatedAt` refreshed.

- **Determinism:** page order, palette order, sticker order, tool widths, hue cycle, region hit rules, and layout are fixed; only the ≤6 puff particle positions may vary, within section 9 bounds.
- **Progression:** none — the child may switch pages, revisit saved items, and draw in any order; nothing unlocks.

## 9. Feedback, rewards, and audio cues

Effect definitions (no undefined effects): **hint pulse** = scale 1→1.12→1 over 500 ms, repeating for 2.5 s; **selection ring** = 4 px accent outline held on the active tool/swatch; **swell** = scale 1→1.1→1 over 120 ms; **depress** = scale 1→0.95→1 over 80 ms; **fill pop** = scale 1→1.05→1 over 200 ms; **cross-fade** = fill color A→B over 200 ms; **sticker pop-in** = scale 0→1.2→1 over 160 ms; **drop bounce** = scale 1→1.15→1 over 160 ms; **puff** = ≤6 gray circles r 8→32 px, 200 ms, opacity 1→0; **un-draw** = the reversed action plays over 200 ms (an added stroke or sticker disappears: stroke opacity→0, sticker scale→0; a removed one returns: opacity 0→1, sticker scale 0→1; a fill cross-fades B→A; a moved sticker eases back to its old position); **fade-in** = a loaded page appears at opacity 0→1 over 400 ms; **fade** = opacity 1→0 over 1.5 s; **delete arm** = red 4 px ring around the armed tile pulsing 1.1× every 300 ms for up to 2.5 s; **ring fill** = 6 px ring stroke sweeps 0→360° over the 3 s hold; **ring pulse** = 1.1× for 400 ms; **spinner** = 48 px ring arc rotating 360° per 1 s; **toast** = centered pictogram card 120×120, fades in 200 ms, holds 1.6 s (success) or 2.6 s (failure, storage notice), fades out 200 ms (2 s and 3 s total).

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Tool / swatch selected | selection ring moves; swell | `sfx_soft_tap` — 0.4 — one-shot |
| Stroke starts | first ink point | `sfx_soft_tap` — 0.3 — one-shot |
| Stroke committed | ink stays | none |
| Region filled | fill pop + cross-fade | `sfx_fill` — 0.5 — one-shot; `vo_color_*` — 0.8 — one-shot (≤1 per 3 s) |
| Same-color refill / empty tap | none | `sfx_soft_tap` — 0.4 — one-shot |
| Eraser removes ≥1 item | puff ≤6; items vanish | `sfx_erase` — 0.5 — one-shot |
| Eraser with no contact | none | none |
| Sticker picked up | thumbnail lifts 1.2× | `sfx_soft_tap` — 0.4 — one-shot |
| Sticker placed | pop-in + drop bounce 160 ms | `sfx_pop` — 0.5 — one-shot; `vo_sticker_*` — 0.8 — one-shot |
| Sticker moved | drop bounce | `sfx_soft_tap` — 0.3 — one-shot |
| Undo | un-draw 200 ms | `sfx_undo` — 0.5 — one-shot |
| Page loaded | 400 ms fade-in | `sfx_pop` — 0.4 — one-shot; `vo_new_page` — 0.9 — one-shot |
| Saved to Gallery | new tile pops 1.2× | `sfx_chime_save` — 0.6; `vo_saved` — 0.9 — one-shot each |
| Gallery full, making room | oldest tile fades 1.5 s | `sfx_soft_tap` — 0.4; `vo_make_room` — 0.9 — one-shot each |
| Delete armed | delete arm ring 2.5 s | `sfx_boop` — 0.3 — one-shot |
| Delete confirmed | tile shrinks 200 ms | `sfx_soft_tap` — 0.4; `vo_deleted` — 0.8 — one-shot each |
| Export start | spinner | `sfx_tap` — 0.5 — one-shot |
| Export done | success toast 2 s | `sfx_chime_save` — 0.6; `vo_exported` — 0.9 — one-shot each |
| Export cancelled | none | `sfx_soft_tap` — 0.4 — one-shot |
| Export failed | failure toast 3 s | `vo_export_fail` — 0.9 — one-shot |
| Storage write failed | disk-with-slash pictogram 3 s | `vo_storage_full` — 0.9 — one-shot (≤1 per 30 s) |
| Idle 15 s | deterministic target hint-pulses 2.5 s | `vo_hint_*` — 0.9 — one-shot (visual-only before the first gesture) |
| HOME / Play / Close | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Reset hold | ring fill during hold; ring pulse | `sfx_soft_tap` — 0.5 — one-shot |
| Optional background | — | `music_loop` — 0.15 — loop |

Copy: `vo_color_*` = "Red.", "Orange.", "Yellow.", "Green.", "Blue.", "Purple.", "Pink.", "Brown.", "Black.", "Gray."; `vo_sticker_*` = "Star!", "Heart!", "Sun!", "Cloud!", "Flower!", "Tree!", "Fish!", "Bird!", "Cat!", "Dog!", "Ball!", "Balloon!", "Rainbow!", "Moon!", "Leaf!", "Car!"; `vo_saved` = "Saved!"; `vo_make_room` = "I made room for your new picture."; `vo_exported` = "Saved to your device!"; `vo_export_fail` = "Ask a grown-up to save your picture."; `vo_deleted` = "Deleted."; `vo_new_page` = "Let's color!"; `vo_storage_full` = "There is no room to save. Your picture is still here."; hints: "Tap the green button to make something." (`vo_hint_play`), "Pick a crayon and draw." (`vo_hint_draw`), "Tap the stickers button to add stickers." (`vo_hint_stickers`), "Tap the pages button to try another picture." (`vo_hint_pages`), "Tap a picture to color it." (`vo_hint_pages_choose`), "Tap to save your picture here." (`vo_hint_save`). Clip durations ≤1.2 s for color/sticker names, ≤3 s for all others. No negative wording. Voice timbre, language, and TTS engine are build freedom within this copy.

**Audio rules (v1):** no audio before the first gesture (FR-024); one voice at a time, each new voice cancels the previous utterance; sfx may overlap; `music_loop` optional at 0.15. Degradation per FR-025. Background-tab behavior per FR-029 (A7).

## 10. Progress and persistence

- **Storage class:** browser local storage; no network, no accounts.
- **Key:** `spec.drawingAndColoring.v1`
- **Shape:** `{ "current": Work|null, "gallery": GalleryItem[≤12], "tool": "crayon", "color": "#E23A3A", "updatedAt": "<ISO-8601>" }` — `Work`, `GalleryItem`, `Stroke`, `Sticker` per section 12.
- **Save points:** after each completed action (leading + trailing 5 s debounce per FR-020), on HOME, on page selection (after a gallery auto-save decision), on export completion, on a Gallery Save; `updatedAt` refreshes on every write.
- **Restore:** on load, Play resumes `current` (page, fills, strokes, stickers) when it holds content; otherwise the page picker opens. The undo stack, in-progress strokes, the held sticker, and the active modal are deliberately not persisted.
- **Reset:** hold the title logo 3 s (filling ring) or hold Enter/Space 3 s on it → clears the key and all in-memory progress; the next Play opens the page picker. The logo is shown only on `title`.
- **Deliberately not stored:** in-progress strokes, undo history, thumbnails of unsaved work, idle/timer state, audio settings, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled; hints and debounced saves may fire late and never lose work (FR-029, A7). Storage blocked or over quota → in-memory run with FR-025 degradation. One key only; no shared kernel.

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy character, art, audio, or name appears. Programmatic stubs (SVG / WebAudio / speechSynthesis) are acceptable when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `scene_title` | image | crayon-and-paper scene behind Play | 1024×768 SVG | static | SVG shapes |
| `page_{id}` | image/data | 24 outline+region records per §8/§12: 8-unit `#3A3A3A` outline paths plus closed region paths | 1024×768 artwork units, SVG/runtime | static; fills drawn between background and outline | authored data + SVG paths |
| `bg_paper`, `bg_sky`, `bg_meadow`, `bg_sunset` | image | flat tinted fields per §8 | 1024×768 SVG | static | SVG rect + texture dots |
| `sticker_{kind}` ×16 | image | original sticker art per §8 | 96×96 SVG each (scales) | static; pop/bounce | SVG shapes |
| `pict_home`, `pict_pages`, `pict_undo`, `pict_stickers`, `pict_gallery`, `pict_export`, `pict_close`, `pict_trash`, `pict_save`, `pict_play` | image | chrome pictograms (house, picture stack, curved arrow, star sheet, frame grid, out-of-box arrow, X, bin, plus, green triangle) | 64×64 SVG each (Play 96×96) | static | SVG paths |
| `pict_export_ok`, `pict_export_fail`, `pict_storage_full` | image | success arrow, sad arrow, disk with slash | 120×120 SVG | toast | SVG paths |
| `ring` | image | 6 px progress ring for the reset hold | 96×96 SVG | during hold | SVG circle |
| `sfx_soft_tap`, `sfx_tap`, `sfx_fill`, `sfx_pop`, `sfx_erase`, `sfx_undo`, `sfx_boop`, `sfx_chime_save` | audio | muted tap 0.10 s; UI click 0.08 s; rising fill blip 0.20 s; bubble pop 0.15 s; swish 0.25 s; reverse blip 0.20 s; low boop 0.12 s; 3-note chime 0.8 s | 0.08–0.8 s each | one-shot | WebAudio blips/arpeggios |
| `vo_color_*` ×10 | audio | color names, copy in §9 | ≤1.2 s each | one-shot | TTS allowed |
| `vo_sticker_*` ×16 | audio | sticker names, copy in §9 | ≤1.2 s each | one-shot | TTS allowed |
| `vo_saved`, `vo_make_room`, `vo_exported`, `vo_export_fail`, `vo_deleted`, `vo_new_page`, `vo_storage_full`, `vo_hint_*` ×6 | audio | copy in §9 | ≤3 s each | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 | may be omitted |

- **Palette tokens:** background `#FFF8EC`, ink outline `#3A3A3A`, home accent `#5FBF6F` (Play), chrome `#FFFDF7`, plus the 10 colors of §8.
- **Typography:** none — the activity shows no visible text; visible glyphs are art only. Invisible names use the system rounded stack via accessibility APIs only.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → continue silently (FR-025).

## 12. State and data shapes

```
PageDef  = { id: string, category: "animal"|"vehicle"|"character"|"seasonal"|"background",
             artKey: string, outlineW: 8, regions: Region[] }        // 28 records, authored
Region   = { id: "r_head"…, path: [x, y][], area: number }            // closed path, 3–40 points
ToolDef  = { id: "crayon"|"brush"|"rainbow"|"eraser", width: number, alpha: number }
Stroke   = { tool: "crayon"|"brush"|"rainbow", color: "#RRGGBB", width: 12|16|28, points: [x, y][] }
Sticker  = { kind: string, x: number, y: number }                     // center; box 96×96 clamped to bounds
Work     = { pageId: string, fills: { [regionId: string]: "#RRGGBB" }, strokes: Stroke[], stickers: Sticker[] }
GalleryItem = { id: "g_001"…, work: Work, thumb: "data:image/webp;base64,…", createdAt: <ISO>, updatedAt: <ISO> }
SaveObject  = { current: Work|null, gallery: GalleryItem[], tool: string, color: "#RRGGBB", updatedAt: <ISO> }
Runtime (not persisted) = { state, pageId, tool, color, undoStack: UndoEntry[≤20], heldSticker, trayOpen,
                            canvasCursor: {x, y}, deleteArm: {id, until}|null, idleTimer, saveTimer }
UndoEntry = { type: "stroke", stroke } | { type: "fill", regionId, prev, next }
          | { type: "sticker_add", index } | { type: "sticker_move", index, from, to }
          | { type: "sticker_remove", index, sticker }
          | { type: "erase", strokes: Stroke[], stickers: { index, sticker }[] }
```

- **Validation (build-time assertions):** 28 `PageDef` records in §8 order; each page's regions ≤12 and non-overlapping; each region path 3–40 points inside 0–1024 × 0–768; stroke caps 1,500 points and 300 strokes; sticker cap 100; gallery ≤12; `tool`/`color` in the §8 lists. A failing record fails the build, not runtime.
- **Coordinates:** all persisted geometry uses artwork units (x 0–1024, y 0–768, origin top-left); screen positions are derived per FR-016 and never stored.
- **Determinism:** authored content and rules are fixed (FR-031); `createdAt`/`updatedAt` are the only wall-clock values, and they never affect play.

## 13. Requirements (engine-agnostic)

- **R-001** The activity shall render 2D vector art: page outlines, region fills, variable-width round-capped polyline strokes, sticker sprites, and thumbnails.
- **R-002** The activity shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet by caching committed artwork into a layer and re-rendering only the active stroke per frame.
- **R-003** The activity shall track pointer down/move/up/cancel with coalesced events and map positions into artwork units (FR-016).
- **R-004** The activity shall handle multi-touch per FR-026.
- **R-005** The activity shall support keyboard focus and activation for every interactive element, including the canvas cursor and the 3 s reset hold (FR-027).
- **R-006** The activity shall play concurrent one-shot sfx and at most one voice clip at a time, with an optional music loop at 0.15.
- **R-007** When the browser blocks audio before a user gesture, the activity shall defer audio until the first interaction and shall never require sound to proceed.
- **R-008** The activity shall persist and restore one small JSON save object in browser local storage, tolerate blocked or full storage (FR-025), and run unsaved in memory.
- **R-009** The activity shall export a 2048×1536 PNG via file download or the Web Share file sheet (FR-019).
- **R-010** The activity shall run offline with no network requests after initial load.
- **R-011** The activity shall scale from 768×1024 to 1366×768 and down to 320×480 without losing artwork, fills, stickers, tool, or save state (FR-016, FR-017).
- **R-012** The activity shall provide hit targets ≥64 CSS px except the documented 48×48 swatch and 64×48 page-thumbnail exceptions (Play ≥112, chrome ≥72) with 4 px focus indicators at ≥3:1 contrast.
- **R-013** The activity shall expose an invisible accessible name on every interactive element (FR-028).
- **R-014** The activity shall render no visible text; all UI is pictograms and art.
- **R-015** While the tab is backgrounded, the activity shall tolerate throttled timers, commit an active stroke, pause idle hints, and lose no work (FR-029).
- **R-016** When storage or export fails, the activity shall degrade per FR-025 and FR-019 without ending the session.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play (≥112 px) and the logo (≥72 px) and no audio has played (FR-001) |
| AC-02 | `title` | Play is pressed | the page picker shows all 28 thumbnails in §8 order (no scrolling at 320×480) with a Close button, and the page voice plays only after the gesture (FR-002, FR-003) |
| AC-03 | a save whose `current` holds one fill, one stroke, one sticker | the page reloads and Play is pressed | the same page, fill color, stroke shape, and sticker position appear without opening the picker (FR-002, FR-020) |
| AC-04 | the cat page with content | another page is selected, then the picker is reopened and the current page's thumbnail is tapped | the cat work appears as the newest gallery item and the new page loads empty with an empty undo stack; the second tap closes the picker with the work unchanged and no new gallery item (FR-004, FR-018) |
| AC-05 | the cat page, crayon selected | a stroke is drawn | a 12-unit 0.85-alpha stroke follows the pointer and stays after release (FR-005, FR-006) |
| AC-06 | brush and rainbow crayon | a stroke is drawn with each | the brush renders 28 units at 1.0 alpha; the rainbow stroke cycles red→orange→yellow→green→blue→indigo→violet every 64 units from red at its start (FR-005, FR-007) |
| AC-07 | the cat page, yellow selected | the unfilled head region is tapped | it fills yellow within 200 ms and "Yellow." is spoken at most once per 3 s (FR-009, FR-010) |
| AC-08 | the head already yellow | it is tapped again with yellow, then blank space is tapped | the second tap changes nothing but plays a soft tap and the blank tap draws no dot and changes nothing (FR-010, FR-011) |
| AC-09 | two strokes and one sticker on the canvas | one eraser swipe touches all three | all three disappear with a puff as one action, region fills are untouched, and Undo restores all three together (FR-008, FR-015) |
| AC-10 | stickers, eraser, crayon, and Undo each used once | Undo is pressed once, then twice quickly | exactly one reversal occurs per 300 ms and the reversed action plays over 200 ms; with an empty stack the button is dimmed and does nothing but soft-tap (FR-015) |
| AC-11 | a stroke reaching its 1,500-point cap | the pointer keeps moving, then lifts | no new ink appears, existing ink stays, and the stroke commits and undoes normally (FR-006) |
| AC-12 | the sticker tray open | a thumbnail is tapped, then the canvas is tapped; then another thumbnail is tapped while held; then a tool is tapped | the sticker appears under the pointer and is placed at the tap with pop and its name; the swap replaces the held sticker; the tool tap cancels the held sticker leaving no ink (FR-012, FR-013) |
| AC-13 | one placed sticker | it is dragged 100 px, released, then dragged 6 px | the first drag moves it with a bounce and Undo restores its old position; the second drag changes nothing (FR-014, FR-015) |
| AC-14 | 100 stickers placed | another placement is attempted | it is ignored with a soft tap and existing stickers are unchanged (FR-013) |
| AC-15 | a half-drawn picture | the window is resized from 1024×768 to 768×1024 | the artwork is identical and centered; chrome moves to the bottom dock; tool and color stay selected; nothing is lost (FR-016, FR-017) |
| AC-16 | three gallery items | Save is pressed, then item 2 is opened | a fourth tile pops in with "Saved!"; opening item 2 auto-saves the current work first and loads item 2 (FR-018) |
| AC-17 | 12 gallery items | Save is pressed | the oldest tile fades over 1.5 s as the new item is saved, and "I made room for your new picture." plays (FR-018) |
| AC-18 | any gallery item | its delete is tapped, then tapped again within 2.5 s; then another delete is tapped once and cancelled | the first two taps delete it with a shrink and "Deleted."; the single tap arms only and cancels on the next tap (FR-018) |
| AC-19 | a drawing with fills, strokes, and stickers | Export is pressed | a 2048×1536 PNG named `drawing-YYYYMMDD-HHMMSS.png` downloads (or the share sheet opens), the spinner runs ≤2 s, and the success chime and "Saved to your device!" play (FR-019) |
| AC-20 | a share sheet, when available | the share is cancelled | a soft tap plays, no error toast appears, and the artwork is unchanged (FR-019) |
| AC-21 | a drawing in progress | HOME is pressed, then the page reloads and Play is pressed | `title` appeared immediately, the in-progress stroke is committed (not lost), and the same artwork returns (FR-022, FR-020) |
| AC-22 | `title` | the logo is held 3 s; then the page reloads and Play is pressed | the ring fills during the hold, the save is cleared, and Play opens the page picker with an empty gallery (FR-021) |
| AC-23 | an empty canvas with no input for 15 s; then a tap | idleness continues | the Crayon tool pulses with "Pick a crayon and draw."; any tap resets the timer and the hint repeats 15 s later (FR-023, FR-024) |
| AC-24 | speech synthesis unavailable; then no AudioContext; then blocked storage | the activity is played normally | each case stays fully playable with visual cues only, silent without audio, and fully functional in memory without storage; the storage pictogram and "There is no room to save. Your picture is still here." show at most once per 30 s (FR-025) |
| AC-25 | a stroke in progress | a second finger touches the canvas, then a third touches a tool | only the first pointer draws; the tool selection commits the stroke at its last point with no ink lost (FR-026) |
| AC-26 | keyboard focus on the canvas | arrows move the cursor, Space draws, Enter fills a region, Delete removes a sticker, Ctrl/Cmd+Z undoes, Escape returns HOME | each action matches its pointer equivalent and focus order follows section 6 (FR-027) |
| AC-27 | a screen reader active | `title`, `drawing`, and `gallery` are navigated | every control announces an invisible name ("Undo, 3 actions available", "Color: red", "Sticker: star", "Saved picture 2") and no visible text appears anywhere (FR-028) |
| AC-28 | a drawing in progress | the tab is hidden mid-stroke, then shown | the stroke is committed at its last point, the voice stops, the idle timer is paused, and no work is lost (FR-029) |
| AC-29 | any state | random taps, double-taps, rapid repeated taps, idle for one minute, and an unbound key are applied | no work is erased, no score appears, no timer ends anything, and unknown events change nothing (FR-030, FR-031) |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. One full session works end-to-end: pick a page, fill a region, draw with all four tools, place/move/erase a sticker, undo, save to the Gallery, and export a PNG.
3. The 28 pages, 16 stickers, and 10 colors exist as authored data in the section 12 shape; `current` and the gallery survive a reload; the 3 s hold clears them.
4. No fail state exists; empty taps, caps, multi-touch, and hidden-tab behavior match sections 5 and 14.
5. No visible text, no Khan Academy asset or character, and no network request appears anywhere.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 28 pages (24 coloring + 4 backgrounds), 16 stickers, 10 colors, tool widths, 96×96 sticker size | designed — official sources name categories and tools only |
| A2 | "App characters" is realized as original characters (6) with no Khan resemblance | designed — IP constraint |
| A3 | Eraser removes whole strokes/stickers rather than splitting strokes | designed — keeps undo simple and predictable for ages 2–8; undo recovers mistakes |
| A4 | Gallery cap 12 with oldest-item replacement when full | designed — bounded browser storage; the newest work is never lost; documented in FR-018 |
| A5 | Export is a browser download (plus the share sheet when file sharing is exposed) because no camera-roll API exists in browsers | designed — FR-019, D5 |
| A6 | TTS clips or runtime TTS are acceptable; voice copy is fixed, timbre/language are build freedom | designed |
| A7 | Background-tab timers may be throttled; hints and debounced saves fire late, never losing work | known platform behavior — FR-029 |
| A8 | Browsers block autoplay until the first gesture; iOS may require a gesture for speech | platform fact — FR-024 |
| A9 | Idle hint threshold 15 s; tap tolerance 8 px; sticker-move threshold 12 px; undo throttle 300 ms suit ages 2–8 | designed — may widen, never tighten, without a spec revision |
| A10 | This spec's canvas, sticker, gallery, and export conventions are the family reference for the sibling storytelling-and-voice-recording spec | designed |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** page/sticker/color sets and order, artwork space and layout breakpoints, tool widths, stroke caps, region-fill rules, tap tolerance, eraser semantics, undo size and throttle, sticker placement/move rules, gallery size and delete/FIFO behavior, export size and naming, save key and shape, reset gesture, no fail state, no visible text, asset provenance, acceptance criteria.
- **Free:** art style within the guidance, easing curves, particle positions and looks, sticker and outline composition, voice timbre/TTS engine, optional music, title-scene decoration, thumbnail rendering details.
- **Not in this spec:** sound effects or voice recording (see the sibling spec), profiles, navigation shell, parental controls, localization, analytics, teacher tooling, printing, layers, zoom/pan, text or shape tools, sticker scaling/rotation, and any scoring or unlock system.
