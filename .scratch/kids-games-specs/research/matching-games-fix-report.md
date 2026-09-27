# matching-games — fix report

**Fixer:** subagent (fix + live regression pass). **Date:** 2026-09-27.
**Artifact:** `games/matching-games/` — `index.html`, `styles.css`, `game.js` (vanilla ES modules, no build step, no dependencies).
**Spec:** `docs/khan-academy-kids-games/specs/matching-games.md` (v1); stack contract respected (no stack change).

**File hashes (sha256):**

| File | Before (verification report) | After |
|---|---|---|
| `index.html` | `dce9a383…9ddf` | `dce9a383…9ddf` (unchanged) |
| `styles.css` | `533ba11b…d602` | `138d103b…edb8` |
| `game.js` | `78db8d4d…4ce7` | `31e273e5…be67` |

**Live environment:** macOS; static server `python3 -m http.server 8125 --bind 127.0.0.1` from the repo root →
`http://127.0.0.1:8125/games/matching-games/`; headless Chrome `153.0.8010.53`
(`--headless=new --remote-debugging-port=9334 --user-data-dir=<tmp>/profile --no-first-run
--no-default-browser-check --disable-gpu --window-size=1024,768`); Node `v26.1.0` drove the DevTools
Protocol with a hand-written client (Node built-ins only). All real input through Chrome's own pipeline:
`Input.dispatchMouseEvent`, `Input.dispatchKeyEvent` (rawKeyDown/keyUp with key/code/VK), and
`Input.dispatchTouchEvent` with `Emulation.setTouchEmulationEnabled`. Viewports via
`Emulation.setDeviceMetricsOverride`. Harness kept **outside the repo** in
`$TMPDIR/opencode/mg-fix-35044/` (`lib.mjs`, `run.mjs`, `full-run.log`, `full-run-2.log` — re-runnable:
`node run.mjs [test-name]`). Speech calls were instrumented from a pre-document script
(`window.__speakLog`); game state was read through the unchanged debug hook `window.__pairUp`.

**Result: full suite 96/96 PASS, twice (two consecutive full runs, same result). Console/log clean on
every page; only one deviation: one early exploratory run produced Chrome autoplay warnings on a
CDP-touch-first-gesture page (browser policy, not a game log); the harness now unlocks audio with a
mouse gesture before touch emulation, and the warnings are gone.**

---

## F-1 (Critical) — reset hold survives leaving `title`; key-up coupled to focus

**What changed (all `game.js`):**

- `startLevel()` — `endLogoHold()` added as the first statement (line **805**): starting a level always
  cancels a pending hold.
- `showTitle()` — `endLogoHold()` added as the first statement (line **795**); `goHome()` reaches
  `showTitle()`, so HOME is covered too.
- `completeHold()` — early guard (line **1126**):
  `if (!logoHold.active || s.state !== 'title') { endLogoHold(); return; }` — progress can only be
  cleared by a hold that is genuinely active and still on `title`.
- `onKeyUp()` (lines **1079-1084**) — any Enter/Space release while `logoHold.active` cancels the hold,
  independent of `document.activeElement` (the old `document.activeElement === logoBtn` check and the
  stray `false` argument are gone).
- `onPointerDown()` logo branch (lines **1031-1034**) — `btn.setPointerCapture(e.pointerId)` before
  `beginLogoHold()` so a release is delivered even if the pointer leaves the button; the existing
  window-capture `pointerup`/`pointercancel` path still ends the hold (`onPointerRelease`, line 1046).
- Unused `logoHold.source` removed (line **1098**) — see M-10.

**Live evidence (real input):**

- **F1a — the exact repro:** seed `{highestUnlocked:4,levelsCompleted:3}`; Tab → logo; hold Enter
  (rawKeyDown, no keyUp); 1.0 s; Tab → focus `playBtn`; press Enter (level starts) + release; wait
  > 3.6 s from the hold start. Raw values: state `playing`, level `4`; hold log `begin=1 complete=0`;
  save-clear entries `0`; `localStorage` still
  `{"highestUnlocked":4,"levelsCompleted":3,"updatedAt":"2026-09-01T00:00:00.000Z"}`; in-memory save
  identical; checkmark `checkVisible=0`; ring `holdRingVisible=false`. A follow-up real tap selected
  slot 1 (`selectedSlot:1`) — play is unaffected.
- **F1b — release after focus moved:** hold 0.7 s, Tab to Play, keyUp while Play focused, wait > 4 s:
  `complete=0`, state `title`, save intact.
- **F1c — clean keyboard hold (AC-19 keyboard):** Tab to logo, hold Enter. Mid-hold:
  `holdRingVisible=true`, `strokeDashoffset=171.539px` (of 339.3). At completion: hold log
  `["begin","complete"]`, `checkVisible=1`, `sfx_soft_tap` logged, `localStorage` key `null`,
  memory `{highestUnlocked:1,levelsCompleted:0}`. Reload → key still `null`; Play starts level 1.
- **F1d — clean pointer hold (AC-19 pointer):** press and hold on the logo; mid-hold ring visible
  (`strokeDashoffset=171.55px`); completes at 3 s; key cleared; memory reset.
- **F1e — early pointer release:** press, hold 1 s, release → hold log `cancel=1`, ring hidden, save
  intact, `complete=0` after 2.4 s more.
- **F1f — release outside the logo (pointer capture):** press logo, drag pointer to (900,700), release
  there → `cancel=1, complete=0`, save intact.

**Not testable here:** a real OS-level window blur mid-hold (headless); covered by the same
`recoverInput()` path that F-2 exercises and by F1e/F1f for release semantics.

---

## F-2 (High) — missed `pointerup`/`pointercancel` locks out all input

**What changed:**

- `recoverInput()` added (`game.js` lines **1049-1054**): `activePointers.clear(); endLogoHold();`.
- `window.addEventListener('blur', recoverInput)` (line **1152**).
- `document.visibilitychange` handler extended (lines **263-266**): hidden → `recoverInput()`,
  visible → `timerTick()` (R-013 drain preserved).
- Logo `setPointerCapture` (F-1 above) also guarantees the release for holds.

**Live evidence (real touch, with an independent pointer-event trace):**

- Seed level 1, start with a real mouse tap on Play (audio unlocked), then enable touch emulation.
  Inject a pointer trace listener, then a real `touchStart` (touch id 11) on card 1 and **never send a
  release**: card 1 selected (`selectedSlot:1`). The trace after the second touch proves no implicit
  release was delivered: `downs=[2,3] releases=[]` (pointer ids 2 and 3; no `pointerup`/`pointercancel`
  between).
- A real OS window blur cannot be produced in headless Chrome, so (as permitted) a
  `window.dispatchEvent(new Event("blur"))` was dispatched **after** the real pointerdown.
- Second touch (touch id 22) lands on card 2 while touch 11 is still down → processed: state
  `teaching`, `anchorSlot:1`. Without the fix, `activePointers` still holding id 2 would have rejected
  this pointerdown (`first=false`) and state would have stayed `playing`.
- Taps then work normally: teaching ends with the anchor still selected; a normal touch tap on card 4
  completes the pair (`matchedCount:1`).
- `visibilitychange`-to-hidden path: touch id 55 selected card 2; `document.hidden` was shadowed to
  `true` and `visibilitychange` dispatched (`Emulation.setPageVisibilityOverride` is unsupported in
  Chrome 153); a new touch (id 66) was processed → `teaching`, `anchorSlot:2`. `document.hidden`
  restored afterwards.
- Console clean (the Chrome autoplay warning seen before the harness was adjusted was a
  CDP-touch-first-gesture artifact; with a mouse unlock first, zero warnings).

**Not testable here:** a genuine focus change that swallows the release, and a genuinely hidden tab
(simulated as above); real-device event delivery differs, but the code path is the same.

---

## F-3 (Low) — pips shrank to 7.75 px at 320×480 with 8 pips

**What changed:** `styles.css` `.pip` (line **134**) — added `flex: 0 0 var(--pip);` so the 8-pip row
keeps its 92 px intrinsic size and stays centered instead of shrinking; the 92 px row fits inside the
96 px prompt card (2 px margin each side) and inside the 104 px narrow top bar.

**Live evidence (320×480, seeded `highestUnlocked:8`, level 8):**

- `getBoundingClientRect` widths: `[8,8,8,8,8,8,8,8]`; computed `width`: `"8px"` ×8 (before the fix
  the defect measured 7.75 px computed).
- Row union center `160` vs prompt-card center `160` (Δ 0.0000038 px); pip row `[114,206]` inside the
  card `[112,208]` — inside the card's border box, visually centered.
- No scrolling (`scrollWidth 320 / scrollHeight 480 = innerWidth/innerHeight`); all 16 cards ≥ 66 px
  and fully inside the viewport.

---

## F-4 (polish)

- **M-1 — hint animations:** `haloSlot()` (game.js **634-639**) and `pulseControl()` (game.js
  **784-787**) now drop each animation from `hintAnims` when it finishes (`.finished.then(...)`, with
  `.catch(() => {})` for cancels by `clearHints`). Not externally observable (no hook exposes the
  array); verified by inspection — the full idle-hint run (AC-11/AC-28-style, two hint cycles) is
  clean.
- **M-2 — double `resetIdle()` in `idleFired`:** trailing call removed; one call at function entry
  (game.js **744-763**). Behaviour unchanged by construction (second call only replaced the first);
  idle-hint timing re-verified live (first hint halos `[1,4]`, second hint `[4]` with a card selected,
  empty tap re-arms ~12 s: `before=5947ms → after=11836ms`).
- **M-3 — `getLevel()` live references:** now returns copies (`game.js` **1185-1191**). Live test:
  `cards.pop()`, `cards[0].token="hacked"`, `pairs.pop()`, `grid.pop()` on the returned object leave
  the next `getLevel()` byte-identical (`before/after equal=true`, grid `[3,2]`).
- **M-5 — global focus radius:** `border-radius: 14px` removed from `:focus-visible`
  (`styles.css` **90-93**); the 4 px ink outline is kept. Live test: focused card outline
  `4px solid rgb(62,44,30)`, focused/unfocused card radius both `0px` on the `.card` element (the
  visible face keeps `calc(var(--card)*0.12)`), focused logo keeps `22px` radius + 4 px outline.
- **M-10 — dead code:** `logoHold.source` removed (game.js **1098**); the `holdReset` timer that only
  reset `holdRingFill.style.strokeDashoffset` removed from `completeHold`; `PALETTE.blue` removed
  (game.js **45-49**); `--blue` / `--success` removed (`styles.css` **4-18**); the stray `false`
  argument to `endLogoHold()` removed (game.js **1082**). Grep for all five symbols returns no
  remaining references.

---

## Regression re-checks (live, real input)

| Check | Result | Raw evidence |
|---|---|---|
| AC-04 select → match | PASS | card 1: `class "card selected"`, `lift matrix(1,0,0,1,0,-6)`, ring opacity `0.9`, `sfx_pick`; card 4: both `matched`, opacity `0.7`, pip 1 `matrix(1,0,0,1,0,0)`, voice `"A pair!"` vol 1, `matchedCount 1` |
| AC-11 idle hint | PASS | first hint halos `[1,4]` + `vo_target` at vol 0.89999… (float32 of 0.9); selected card → halos `[4]`; selection/progress intact; empty tap reset the deadline `5947ms → 11836ms` |
| AC-12 tab order + outline | PASS | title `logoBtn → playBtn`; after Play focus `homeBtn`; Tab → card 1 (row-major), Enter selects; Tab → card 2, Space starts teaching (anchor 1); focused card outline `4px solid rgb(62,44,30)`, no radius morph |
| AC-19 both hold paths | PASS | F1c (keyboard) and F1d (pointer) — ring mid-hold, complete at 3 s, save cleared + checkmark (`checkVisible=1`), persistence confirmed after reload; early release cancels (F1e/F1f) |
| AC-21 320×480 level 8 | PASS | 4×4 / card 66 px / no scrolling / all cards inside viewport; **level 8 completed end-to-end with 16 real taps** → `celebrating` |
| Console clean | PASS | 13/13 pages: no console errors/warnings, no exceptions, no browser-log errors |
| Offline resources | PASS | `performance.getEntriesByType('resource')` = `styles.css`, `game.js` only (R-008 unchanged) |

Syntax check: `node --check games/matching-games/game.js` → OK.

**Explicitly not changed (per adjudication):** M-4 (pip fill width — untouched; `.pip .fill { inset: -2px }`
still as verified live), M-6 (AT live region), M-7 (double-press hardening), M-8 (cross-browser ring),
M-9 (primitive count) — deferred.

## Not testable / limitations

1. Real OS-level window blur and a genuinely hidden background tab were not producible in headless
   Chrome 153 (`Emulation.setPageVisibilityOverride` is unimplemented); F-2 used a dispatched `blur`
   event and a shadowed `document.hidden` + dispatched `visibilitychange`, with an independent
   pointer-event trace proving no implicit release occurred.
2. M-1's memory retention has no observable surface; the drop-on-finish change was verified by
   inspection plus a clean multi-cycle idle run (no console errors).
3. Only Chrome 153 was available (no Firefox/Safari); the hold-ring WAAPI cross-browser question
   (M-8) remains open as before.
4. Audio output (timbre/TTS) is headless-silent; speech calls were checked via instrumentation only,
   as before.
