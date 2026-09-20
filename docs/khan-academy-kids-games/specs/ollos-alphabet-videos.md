# Ollo's alphabet videos

## 1. Front matter

- **Entry type:** Interactive player — video series (procedurally animated letter clips)
- **Catalogued entry:** [`ollos-alphabet-videos.md`](../ollos-alphabet-videos.md)
- **Official source:** [Help Center — Get ready for school](https://khankids.zendesk.com/hc/en-us/articles/360013113232-Get-ready-for-school-with-Khan-Academy-Kids); [Help Center — Find books and lessons in the Library](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library); [App Store listing](https://apps.apple.com/us/app/khan-academy-kids/id1378467217)
- **Spec status / platform:** v1 — first video-series interactive-player spec; matches template v1; not yet blind-built; last updated 2026-09-20. Browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load.
- **Provenance constraint:** the catalogued title "Ollo's alphabet videos" is retained for traceability only. The official presenter (Ollo) is replaced by the original guide **Pip**, and every clip is original: no Khan Academy character, art, voice, or audio is reproduced (D2).
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Game-only blocks are replaced by player equivalents: 52 clips replace levels, clip end replaces the win condition, watch position replaces scoring; there are no quizzes and no scoring.

## 2. Overview and learning objective

A child opens the player and sees a gallery of 26 letter tiles. Tapping a tile (or Play, which
resumes) starts a 12-second animated clip: the uppercase or lowercase glyph draws itself stroke by
stroke while the original guide Pip presents the letter name, its sound, and one keyword object
("A — ah — apple"). The child can pause, replay, step to the next or previous letter, flip the case,
or return to the gallery at any time. Skills: **letter-form recognition** (both cases) and
**letter–sound association**. Age band: **3–5** (the official Letters band); expected session
**1–2 minutes** (about 3–6 clips).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Ollo's alphabet videos are uppercase/lowercase letter introductions | official | `khan-academy-kids-games.md` line 215; Help Center "Get ready for school" |
| O2 | The videos are presented by Ollo the elephant, the character tied to phonics and letter sounds | official | Catalogued entry; `letter-tracing.md` line 14 |
| O3 | Letters content is described for ages 3–5 and covers uppercase letters, lowercase letters, and letter sounds | official | `khan-academy-kids-games.md` line 87 |
| O4 | The number of videos and per-video titles are not published | official | Catalogued entry — Notes |
| D1 | 52 clips (26 letters × uppercase + lowercase) generated from one 12 s procedural template; timings in section 8 | designed | Official sources publish no video count, titles, or content; one template + per-letter data keeps the series buildable |
| D2 | The presenter is replaced by the original guide "Pip" (a round bird drawn from primitives); the catalogued title is kept for traceability only and appears nowhere on screen or in audio | designed | Constraint: no Khan Academy character, art, voice, or audio may be reproduced; Ollo is a Khan Kids character |
| D3 | Player chrome: Play/Pause, Replay, Previous/Next, case toggle, 26-tile gallery; no quizzes, no scoring | designed | The minimal designed interaction the interactive-player entry type promises |
| D4 | Per-letter keyword object (A = apple … Z = zebra) plus a name/sound/word/recap voice structure | designed | Implements O3's letter + sound pairing; keywords are original choices |
| D5 | Stroke data and draw formula, idle hint, hidden reset, local resume, audio rules, no fail state; all art, voice, music, and layout | designed | Template v1 plus buildability invention; session continuity without accounts; never punishing (ages 3–5); all assets original |

## 4. Player experience / core loop

A child taps the tile with **b** on it. The studio view opens; after a 400 ms lead-in, Pip slides in
and the big lowercase b draws itself — tall line, then the bowl — while the voice says "b", then
"buh" as three ripples spread. A ball pops in and bobs while the voice says "ball", and Pip hops as
the voice recaps "b says buh". The clip lands on an end card with Replay and Next pictograms; the
child taps Next, and later comes back and Play picks up on the same clip.

**Core loop:** gallery or Play → watch the 12 s letter clip → play/pause/replay/next/prev/case →
end card → next letter or gallery.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show the gallery: 26 tiles (A–Z glyphs, each ≥88×88 CSS px, 12 px gaps, left→right then down), a Play target ≥96×96 CSS px, and an inconspicuous reset mark ≥64×64 CSS px top-right (FR-013). No audio shall play before the first user gesture (R-006); the first pointer or key input unlocks audio. |
| FR-002 | When Play is pressed, the player shall open the resume clip (section 10; upper A when no save exists), wait a 400 ms lead-in (the stage fades in over 200 ms per section 9), play it from 0, and save. When a tile is pressed, it shall open that letter's uppercase clip the same way and save. |
| FR-003 | While a clip plays, the player shall follow the 12,000 ms timeline in section 8: intro 0–1500, draw 1500–4500 (FR-004), name 4500–5700, sound 5700–7200, keyword 7200–10200, recap 10200–11400, end card 11400–12000, with the stated visual and audio events firing at the stated times. At 12,000 ms the clip shall end into `ended` with the end card visible; the player shall not auto-advance. |
| FR-004 | The draw segment shall render `strokes[]` in order; with n strokes the per-stroke reveal is `s = clamp(floor((3000 − 300 × (n − 1)) / n), 300, 900)` ms and stroke i starts at `1500 + (i − 1) × (s + 300)` ms; after the last stroke ends the completed glyph holds until 4500 ms. If `strokes` is empty or missing, the player shall fall back to a font-rendered glyph (R-001). |
| FR-005 | Play/Pause (≥72×72 CSS px) shall toggle playback with a 300 ms debounce — a second toggle within 300 ms is ignored. Pause freezes clip time and all motion; Play resumes from the frozen time. When `ended`, Play/Pause shall restart the clip from 0 (same as Replay). |
| FR-006 | Replay (≥72×72 CSS px) shall cancel the current clip audio, restart the clip at 0, and play; it works from `playing`, `paused`, and `ended`. Replay is throttled to one restart per 500 ms (repeats inside the window are ignored). |
| FR-007 | Next/Previous (each ≥72×72 CSS px) shall move one step in the 52-clip playlist (upper A → lower a → upper B → … → lower z), cancel the current clip audio, play the new clip from 0, and save. Next on lower z and Previous on upper A are no-ops (no visual or audio change). Next+Previous share a 500 ms throttle. |
| FR-008 | The case toggle (Aa glyph, ≥64×64 CSS px) shall switch the current letter to its other case, cancel the clip audio, play the new clip from 0, and save. The toggle always starts playback (from `paused` or `ended` too). Throttle 500 ms. |
| FR-009 | A gallery tile press shall open that letter's uppercase clip, play it from 0, and save. Tiles exist only on `home`; all tiles share one 500 ms throttle (separate from the Next/Previous throttle). |
| FR-010 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `watching`; it cancels the clip audio and idle timers, saves, and returns to `home`. On `home` (the player's home) no HOME control is rendered and a HOME input is a no-op; on `loading` any input is a no-op. |
| FR-011 | The player shall have no fail state: mis-taps, empty-space taps, rapid or repeated taps, double-taps, and idle time never lose progress, never end playback, and never block play. A tap >12 px from every control and tile is an empty tap: nothing changes on screen or in audio, and the idle timer resets. |
| FR-012 | When no input has occurred for 12,000 ms on `home`, the player shall pulse Play for 3,000 ms; when `ended` or `paused`, it shall pulse Replay for 3,000 ms. On `home` and before the first user gesture the hint is visual only; in `watching` after the first gesture it also plays `vo_hint` (volume 1.0, one-shot). No hint fires while `playing` (the moving clip is its own cue). The hint repeats every 12,000 ms of continued idleness; any input, including an empty tap, resets the timer. |
| FR-013 | When the home reset mark is held for 3 s, the player shall fill a visible progress ring for the hold duration; on completion it shall clear the storage key and in-memory progress, then play a ring flash (300 ms) and `sfx_soft_tap` (0.7, one-shot). Holding Enter/Space 3 s on the focused mark is the keyboard equivalent. |
| FR-014 | No-reading rule: visible text is limited to the letter glyphs (A–Z, a–z — content) and the Aa toggle glyph; no visible words appear anywhere. All instructions and feedback reach non-readers by voice + pictogram; every interactive element (reset mark, Play, each tile, HOME, Replay, Previous, Play/Pause, Next, case toggle) carries an invisible accessible name. |
| FR-015 | Input semantics: first pointer down wins; additional simultaneous pointers are ignored until release. Hit tolerance is 12 px around every control and tile; overlaps resolve to the nearest control center, exact ties to the leftmost, then topmost. A tap inside any control rectangle never falls through to the stage. |
| FR-016 | Persistence: save on Play, clip end, Next/Previous, case toggle, tile pick, and HOME; `updatedAt` refreshes on every save (section 10). Resume: Play opens the saved clip and plays it from 0. |
| FR-017 | Degradation: no speech synthesis → all voice clips are silent, the clip still draws and pulses, and a muted-speaker pictogram (48×48) shows for 5 s after Play; no AudioContext → all audio silent, behavior otherwise identical; storage blocked → run unsaved (resume defaults to upper A; the reset hold still shows its ring and flash). |
| FR-018 | Background tab: when the tab becomes hidden while `playing`, the player shall pause and freeze clip time and motion; on return it stays paused until Play, which resumes from the frozen time. Idle time counts visible time only; throttled timers may delay hints, never lose progress (A5). |
| FR-019 | Only one voice clip shall play at a time; any new voice clip (name, sound, word, recap, hint) cancels the previous immediately. Sound effects may overlap each other and the voice. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank studio backdrop | initial state; preload assets; audio locked |
| `home` | 26-tile gallery + Play + reset mark | the player's home; audio unlocks on the first gesture |
| `watching(clipId, playback)` | studio stage + chrome | clipId ∈ the 52-clip playlist; playback ∈ {playing, paused, ended} |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `home` | entry: arm audio; no sound before first gesture |
| `home` | `PLAY_PRESSED` | — | `watching(resume, playing)` | entry: unlock audio, 400 ms lead-in, play from 0; save |
| `home` | `TILE_TAP(letter)` | outside 500 ms tile throttle | `watching(letter-upper, playing)` | entry: unlock audio, 400 ms lead-in; save |
| `home` | `RESET_HOLD` | hold 3 s on mark | `home` | action: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `home` | `IDLE_12S` | — | `home` | action: FR-012 hint |
| `watching` | `PLAY_PAUSE` | outside 300 ms debounce | `playing`↔`paused`: `watching(same, toggled)`; `ended`: `watching(same, playing)` from 0 | action: freeze or resume clip time |
| `watching` | `REPLAY` | outside 500 ms throttle | `watching(same, playing)` | action: restart at 0 |
| `watching` | `NEXT` | outside 500 ms throttle; no-op at lower z | `watching(next, playing)`; at lower z `watching` | action: cancel audio; save / none |
| `watching` | `PREV` | outside 500 ms throttle; no-op at upper A | `watching(previous, playing)`; at upper A `watching` | action: cancel audio; save / none |
| `watching` | `CASE_TOGGLE` | outside 500 ms throttle | `watching(same letter, other case, playing)` | action: cancel audio; save |
| `watching` | `CLIP_END` | clipTime = 12,000 ms | `watching(same, ended)` | action: show end card; save |
| `watching` | `IDLE_12S` | playback ≠ playing | `watching` | action: FR-012 hint |
| `watching` | `TAB_HIDDEN` | playback = playing | `watching(same, paused)` | action: cancel audio, freeze clip time (FR-018) |
| `watching` | `HOME_PRESSED` | — | `home` | action: cancel audio/timers; save |

Events not listed for a state are ignored (no state change, no sound).

**Tab order:** `home` — reset mark → Play → tiles A–Z (row-major, left→right then down);
`watching` — HOME → Replay → Previous → Play/Pause → Next → case toggle; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Start / resume | tap Play | Tab to Play + Enter/Space |
| Pick a letter | tap a gallery tile | Tab to a tile + Enter/Space |
| Play / pause | tap Play/Pause | Space (no control focused) or Enter/Space on the focused control |
| Replay | tap Replay | R |
| Next letter | tap Next | ArrowRight |
| Previous letter | tap Previous | ArrowLeft |
| Toggle case | tap the Aa toggle | C |
| HOME | tap HOME | Escape |
| Reset | hold the home mark 3 s | hold Enter/Space 3 s on the focused mark |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play ≥96×96 CSS px; gallery tiles ≥88×88 (≥72×72 at 768–1023 px width); Play/Pause,
  Replay, Previous, Next ≥72×72; HOME, case toggle, reset mark ≥64×64 — all above the 44 px platform
  minimum, sized larger because the audience is 3–5. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Touch:** tap only — FR-015 single-pointer semantics, every action has a keyboard path. 12 px
  tolerance around every control; overlaps resolve to the nearest control center, exact ties to the
  leftmost then topmost; >12 px from everything = empty tap (FR-011).
- **Without reading:** every control is voice-cued and pictogram-labelled; letter glyphs are content;
  no visible words exist (FR-014). Invisible accessible names on every control (FR-014/R-011):
  "Play", "Letter A", "Pause", "Replay letter A", "Next letter", "Previous letter", "Home",
  "Switch to lowercase"/"Switch to uppercase" (per current case), "Reset progress".
- **Resize:** viewport resize or rotation mid-clip reflows per section 8 and preserves letter, case,
  clip time, and playback.

## 8. Clips and content data

**Media scope (designed):** **52 clips = 26 letters × 2 cases**, all generated from one 12,000 ms
procedural template plus per-letter data (`LetterClip`, section 12) — adding a clip is one record,
with no per-letter code.

| Segment | Window (ms) | Visual | Audio (key — volume — behavior) |
|---|---|---|---|
| Intro | 0–1500 | Pip slides in from bottom-right (300 ms), waves twice (400 ms each), settles | `sfx_slide` — 0.5 — one-shot at 0 |
| Draw | 1500–4500 | `strokes[]` reveal per FR-004; completed glyph holds to 4500 | `sfx_draw` — 0.4 — one-shot at each stroke start |
| Name | 4500–5700 | glyph pulses (600 ms); speech-bubble pictogram fades in | `vo_name_{L}` — 1.0 — one-shot at 4600 |
| Sound | 5700–7200 | 3 expanding ripples (500 ms each); sound-wave pictogram | `vo_sound_{L}` — 1.0 — one-shot at 5800 |
| Keyword | 7200–10200 | keyword object pops in (300 ms), bobs (800 ms) | `sfx_pop` — 0.6 — one-shot at 7200; `vo_word_{L}` — 1.0 — one-shot at 7300 |
| Recap | 10200–11400 | Pip hops (300 ms); glyph + sound pictogram pulse | `vo_recap_{L}` — 1.0 — one-shot at 10300 |
| End card | 11400–12000 | glyph at 96 px, Replay and Next pictograms pulse (200 ms × 3) | `sfx_chime` — 0.8 — one-shot at 11400 |

- **Draw rule:** `s = clamp(floor((3000 − 300 × (n − 1)) / n), 300, 900)` ms; stroke i starts at
  `1500 + (i − 1) × (s + 300)`; n = `strokes.length`; n = 1 draws 900 ms and holds; the glyph holds
  to 4500 ms. Paths are SVG data in a 100×100 unit box, width 8 units, round caps; font-glyph stubs allowed (R-001).
- **Worked example (upper A):** `strokes` = ["M50 8 L20 88", "M50 8 L80 88", "M31 62 L69 62"], n = 3
  → s = 800 ms, starts 1500/2600/3700, complete at 4500; name 4600, sound 5800, keyword 7300, recap
  10300, chime 11400, `CLIP_END` 12000. **Lower a:** strokes = ["M40 40 a20 20 0 1 0 0 40 a20 20 0 1
  0 0 -40", "M60 40 L60 76"], n = 2 → s = 900 ms (clamped from 1350), starts 1500/2700, complete
  3600, holds to 4500; voice events unchanged.
- **Playlist order:** upper A, lower a, upper B, lower b, …, lower z — fixed and deterministic; no
  randomization, no unlocks, no gating; every clip is directly reachable from the gallery.
- **Progression rule:** none; any letter may be watched any number of times, with no completion state and no scoring.

**Per-letter variance table** (n U/L = stroke count for uppercase/lowercase; stubs = spoken TTS
respellings; all designed):

| L | n U/L | Keyword | Name / sound | L | n U/L | Keyword | Name / sound |
|---|---|---|---|---|---|---|---|
| A | 3/2 | apple | ay / ah | N | 3/2 | nest | en / nnn |
| B | 3/2 | ball | bee / buh | O | 1/1 | octopus | oh / aw |
| C | 1/1 | cat | see / kuh | P | 2/2 | pig | pee / puh |
| D | 2/2 | dog | dee / duh | Q | 2/2 | queen | cue / kwuh |
| E | 4/1 | egg | ee / eh | R | 3/2 | rabbit | arr / rrr |
| F | 3/2 | fish | eff / fff | S | 1/1 | sun | ess / sss |
| G | 2/2 | goat | jee / guh | T | 2/2 | tree | tee / tuh |
| H | 3/2 | hat | aitch / huh | U | 1/2 | umbrella | you / uh |
| I | 3/2 | igloo | eye / ih | V | 2/1 | van | vee / vvv |
| J | 1/2 | jam | jay / juh | W | 4/2 | web | double you / wuh |
| K | 3/3 | kite | kay / kuh | X | 2/2 | box | ex / ks |
| L | 2/1 | lion | ell / lll | Y | 3/2 | yo-yo | why / yuh |
| M | 4/3 | moon | em / mmm | Z | 3/1 | zebra | zee / zzz |

**Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px; stage 4:3, centered, max
1024×768; glyph ≥240 px tall; keyword object 192×192 px; tiles 88×88 px, 12 px gaps, up to 13 per row.
At 768–1023 px — chrome 88 px; glyph ≥180 px; keyword 144×144 px; tiles 72×72 px, gap 10 px, up to 9
per row. Height ≥700 px; below that scale the field by 0.85 keeping every control ≥48 px; resize
preserves letter, case, clip time, and playback.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Clip segments (intro, draw, name, sound, keyword, recap, end card) | section 8 timeline states each visual and its exact timing | section 8 table states each cue's key, volume, and one-shot behavior |
| Play/Pause, Replay, Next/Previous, case toggle, HOME, gallery tile | depress 80 ms | `sfx_tap` — 0.7 — one-shot |
| Idle hint (12 s) | deterministic target pulses 3 s (Play on `home`; Replay when paused or ended) | `vo_hint` — 1.0 — one-shot (plays in `watching` after the first gesture; visual only on `home` and before it) |
| Reset hold | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.7 — one-shot |
| Optional background music | none | `music_loop` — 0.2 — loop |

**Effect definitions (no undefined effects):** *stroke reveal* = SVG stroke-dashoffset 100→0 over
`s` ms (FR-004), width 8/100 units, round caps. *pulse* = scale 1→1.12→1 over 600 ms per cycle,
repeated for the stated duration. *end-card pulse* = scale 1→1.15→1 over 200 ms, 3 cycles. *slide* =
Pip translates 120 px→0 with opacity 0→1 over 300 ms. *pop* = scale 0→1 over 300 ms. *bob* =
translate 8 px up then down over 800 ms. *ripple* = expanding arc, opacity 1→0, radius 12→36 px over
500 ms, 3 in sequence. *depress* = scale 1→0.95→1 over 80 ms. *ring fill* = 4 px accent stroke fills
clockwise over the 3 s hold. *ring flash* = ring opacity 1→0 over 300 ms. *stage fade* = opacity 0→1
over 200 ms. *fade-in* = a pictogram's opacity 0→1 over 200 ms. *wave* = Pip's wing rotates 0→30°→0
twice, 400 ms per wave. *hop* = Pip translates 0→−16 px→0 over 300 ms. *muted pictogram* = 48×48
speaker-with-slash shown 5000 ms after Play when speech synthesis is missing.

**Voice copy (designed, fixed):** name = the letter name; sound = the table's sound stub; word = the keyword ("apple"); recap = "{Name} says {sound}." ("A says ah."); `vo_hint` = "Tap a letter to watch. Tap play." Voice timbre and TTS engine are build freedom.

**Audio rules:** no audio before the first user gesture (FR-001, R-006); each new voice clip cancels
the previous utterance (FR-019); degradation per FR-017 (no speech synthesis → visual-only clip with
muted pictogram, no AudioContext → silent, storage blocked → run unsaved); background-tab timers may
be throttled and speech suspended, handled by FR-018 (A5).

## 10. Progress and persistence

- **Storage class, key, and shape:** browser local storage, no network, no accounts; key `spec.alphabetVideos.v1`; value `{ "letter": "A".."Z", "case": "upper"|"lower", "updatedAt": "<ISO-8601>" }` — the last-watched letter and case, nothing else.
- **Save points:** Play, clip end, Next/Previous, case toggle, gallery tile pick, and HOME; `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play opens the saved clip and plays it from 0 (upper A when no save exists). Play resumes at the last-watched clip; playhead time is never stored.
- **Reset:** hold the home reset mark 3 s (filling ring) → clears the key and in-memory progress; the keyboard equivalent is holding Enter/Space 3 s on the focused mark (FR-013).
- **Deliberately not stored:** playhead time, watched history, audio settings, language, tap data, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. No Khan Academy character, art, voice,
or audio is reproduced. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the
row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_studio` | image | soft studio backdrop, rounded shapes | 1024×768 SVG | static | SVG gradient + circles |
| `pip_idle` / `pip_wave` / `pip_hop` | image | original round bird guide, three frames (no KHAN character) | 256×256 SVG each | static | SVG shapes |
| `glyph_{L}_{case}` / `pict_case` | rendered | letter glyph from `strokes[]` path data; Aa toggle glyphs (content) | 100-unit box, stroke 8 units; toggle ≥48 px | stroke reveal / static | system rounded font glyph |
| `obj_{keyword}` | image | one keyword object per letter (section 8 table) | 128×128 SVG each | pop + bob | SVG shapes |
| `pict_play` / `pict_pause` / `pict_replay` / `pict_prev` / `pict_next` / `pict_home` | image | triangle / bars / circular arrow / chevrons / house | 64×64 SVG each (Play drawn at 96×96) | static | SVG paths |
| `pict_speech` / `pict_sound` | image | speech bubble; sound wave | 64×64 SVG each | fade-in / ripple | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after Play when speech is missing | SVG path |
| `mark_reset` | image | inconspicuous home mark; doubles as reset (FR-013) | ≥64×64 SVG | static | three glyphs drawn from stroke data |
| `sfx_slide` / `sfx_draw` / `sfx_pop` / `sfx_tap` / `sfx_soft_tap` / `sfx_chime` | audio | whoosh 0.3 s; soft scribble 0.2 s; pop 0.15 s; click 0.08 s; muted tap 0.10 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips / arpeggio |
| `vo_name_{L}` / `vo_sound_{L}` / `vo_word_{L}` / `vo_recap_{L}` / `vo_hint` | audio | copy from section 9 and the section 8 table; hint = "Tap a letter to watch. Tap play." (≤3 s) | name ≤1.2 s; sound ≤1.5 s; word ≤3 s; recap ≤1.7 s | one-shot | TTS with the table's respellings |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.2 | may be omitted |

- **Palette tokens:** studio `#EAF4FB`, ink `#2E3A46`, accent `#F2994A`, tile `#FFF8EC`, keyword `#8CC63F`, ring `#F2994A`, highlight `#FFD166`; **typography:** rounded system stack (`ui-rounded`, fallback `system-ui`) for incidental UI only — glyphs are drawn from stroke paths, and no visible words appear.
- **Load failure:** missing visual asset → draw stub shape, log a warning, keep playing; missing
  audio → continue silently (R-007).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `LetterClip` | `id: string` ("A-upper", "A-lower", …, "Z-lower"); `letter: "A".."Z"`; `case: enum {upper, lower}`; `glyph: string`; `strokes: Stroke[]` (1–4); `keyword: {name: string, asset: string}`; `nameStub: string`; `soundStub: string` |
| `Stroke` | `path: string` (SVG path in a 100×100 unit box); `order: int` |
| `Playlist` (derived) | `LetterClip[52]` in order upper A, lower a, upper B, lower b, …, lower z |
| `Save` (persisted) | `letter: "A".."Z"`; `case: enum {upper, lower}`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, home, watching}`; `clipId: string`; `playback: enum {playing, paused, ended}`; `clipTimeMs: int 0–12000`; `raf: id`; `idleTimer: id` |

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render vector art, pictograms, and a procedural stroke animation from path data, with a font-glyph fallback when stroke data is missing.
- **R-002** The player shall animate the section 9 effects: stroke reveal, pulse, end-card pulse, slide, fade-in, wave, hop, pop, bob, ripple, depress, stage fade, ring fill/flash.
- **R-003** When a pointer taps or clicks, the player shall hit-test per FR-015 with single-pointer semantics; hit targets shall be ≥44 CSS px (most ≥64 px) with a 4 px focus indicator at ≥3:1 contrast.
- **R-004** The player shall support keyboard focus and activation for all controls: Space = play/pause, ArrowLeft/ArrowRight = previous/next, R = replay, C = case toggle, Escape = HOME.
- **R-005** The player shall play concurrent one-shot audio (sfx + voice; voice at 1.0, music loop ≤0.2); a new voice clip cancels the previous utterance, so voice clips never overlap.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall voice clips via recorded audio or speech synthesis using the section 8 respelling stubs, fall back to a visual-only clip when synthesis is unavailable, and continue with visual-only feedback when any voice or audio asset fails.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-017), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during stroke reveal.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing letter, case, clip time, or playback.
- **R-011** The player shall expose an invisible accessible name on every interactive element.
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause-on-hide (FR-018), no progress loss, hints may fire late.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the gallery shows 26 letter tiles and Play, and no audio has played |
| AC-02 | the gallery, no save | Play is pressed | the upper A clip opens after a 400 ms lead-in and plays from 0; its first stroke begins 1500 ms into the clip |
| AC-03 | the upper A clip playing | the clip runs | 3 strokes draw at 1500/2600/3700 ms (800 ms each) and the glyph is complete by 4500 ms; the name plays at 4600 ms and the sound at 5800 ms |
| AC-04 | the upper A clip | the clip reaches 12000 ms | the end card shows Replay and Next pictograms; 12 s later the end card is still showing (no auto-advance) |
| AC-05 | a clip playing | Play/Pause is double-tapped within 300 ms | exactly one toggle occurs (paused, clip time frozen); tapping again after the 300 ms window toggles exactly once back to playing from the frozen time |
| AC-06 | the upper A clip playing | Next is tapped twice within 500 ms | the upper A voice stops immediately, and exactly one advance occurs: the lowercase a clip plays from 0 |
| AC-07 | the upper A clip | Previous is tapped (or ArrowLeft) | nothing changes on screen or in audio |
| AC-08 | a clip paused (or ended) | Replay is tapped | the clip restarts from 0 and plays |
| AC-09 | the upper A clip playing | the Aa toggle is tapped | the lowercase a clip plays from 0; tapping again returns to uppercase A |
| AC-10 | the gallery | the K tile is tapped | the upper K clip plays from 0; Next then plays lower k |
| AC-11 | any state | a tap >12 px from every control is made | nothing changes on screen or in audio and no hint fires within 12 s of that tap |
| AC-12 | the gallery, no input for 12 s | idleness continues | Play pulses for 3 s; before the first gesture no sound plays |
| AC-13 | a paused clip and the first gesture has happened | 12 s pass without input | Replay pulses for 3 s and `vo_hint` plays; any tap resets and the hint repeats 12 s later |
| AC-14 | the upper B clip playing at 3000 ms | HOME is pressed, the page reloads, Play is pressed | the upper B clip plays from 0 |
| AC-15 | the upper A clip | Next is tapped, the page reloads, Play is pressed | the lowercase a clip plays from 0 |
| AC-16 | the gallery | the reset mark is held 3 s | a ring is visible during the hold; after a reload Play opens upper A; the focused-mark keyboard hold behaves the same |
| AC-17 | speech synthesis unavailable | Play is pressed | no voice plays, strokes and pulses still run, the keyword object still appears, and the muted pictogram shows for 5 s |
| AC-18 | a clip playing | the tab is hidden and then shown | the clip is paused at its current time; Play resumes from that time and no progress is lost |
| AC-19 | a clip playing at 1024×768 | the viewport is resized to 800×1000 | letter, case, playback, and clip time are unchanged and every control is ≥48 px |
| AC-20 | the gallery | a tile is double-tapped within 500 ms | exactly one clip starts (that letter, uppercase) with no restart stutter |
| AC-21 | the gallery or any clip | the page is inspected or read by a screen reader | no visible words appear anywhere (only letter glyphs and the Aa toggle glyph), and a name is announced for every control (reset mark, Play, tiles, HOME, Replay, Previous, Play/Pause, Next, case toggle) |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. All 52 clips render from the section 8 template and data; any letter in either case plays end-to-end.
3. Play/Pause, Replay, Next/Previous, case toggle, gallery, HOME, and reset behave as specified, including the throttles.
4. Progress resumes at the last-watched letter and case after a reload; the reset hold clears it; runs offline at both viewport sizes; with speech synthesis disabled the clip still draws, pulses, and shows its keyword.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The presenter is replaced by the original guide Pip because Ollo is a Khan Kids character and may not be reproduced | designed — required constraint (D2) |
| A2 | Official sources publish no video count or titles; this spec builds 26 letters × 2 cases = 52 clips from one template | designed (section 8) |
| A3 | The 12,000 ms clip length and segment timings approximate child-paced presentation; keyword words and TTS respelling stubs are original choices; recorded or synthesized voices are both acceptable | designed (section 8) |
| A4 | Uppercase-first pairing (A then a) and the fixed playlist order are the designed progression; there is no completion state, quiz, or score | designed (section 8, FR-011) |
| A5 | Browsers block autoplay until the first gesture; background-tab timers may be throttled and speech suspended | platform facts; handled by R-006 and FR-018 |
| A6 | English letter names and sounds only; no second language | designed (section 16) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** 52-clip scope, 12 s template timings, draw formula, playlist order, controls and keyboard map, throttles, hit-target minimums, no-reading rule, save key and shape, asset provenance (original assets only), acceptance criteria.
- **Free:** easing curves, Pip's exact design within the primitive-shape guidance, keyword object art,
  voice timbre/TTS engine, optional music, tile corner radius, glyph geometry beyond the worked example.
- **Not in this spec:** quizzes, scoring, badges, completion tracking; library browsing or video
  selection shell; profiles; navigation shell; parental controls; non-English localization; analytics.

