# Mindfulness videos (Alo Yoga)

## 1. Front matter

- **Entry type:** Interactive player — guided mindfulness video collection (historical entry)
- **Catalogued entry:** [`mindfulness-videos-alo-yoga.md`](../mindfulness-videos-alo-yoga.md)
- **Official source:** [App Store listing — version history](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); repo wording "mindfulness videos from Alo Yoga (older update)" in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 219–221
- **Spec status:** v1 — first mindfulness-player spec; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load; no camera or microphone access
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Game-only blocks are replaced by player equivalents: one calm session replaces a level, the restful end card replaces a win condition, session starts and pacer ripples replace scoring.

## 2. Overview and learning objective

A child picks one of three short guided calm sessions and watches an animated circle grow and shrink
with a spoken cue for every phase: breathe in, hold, breathe out, rest. The child may tap the circle
to breathe along; taps only make a soft ripple. The skill is **self-regulation through paced
breathing** — following an external rhythm to slow the breath, an early social-emotional and physical
development practice. Age band: **3–7 pre-reader** (the app's range is 2–8; designed choice A9). One
session is **68–80 s**; a sitting is **1–3 minutes**; no camera, no detection, no score, no fail state.

## 3. Official vs designed

**IP rule (D0):** "Alo Yoga" is a third-party brand. This spec reproduces none of its branding,
content, or recordings; the entry title appears only for catalog traceability. All sessions, audio,
art, and copy below are original.

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | An older app update added mindfulness videos from Alo Yoga to the app's video content | official | App Store version history; `khan-academy-kids-games.md` lines 219–221 |
| O2 | Current availability was not verified, and the number of videos is not published | official | Catalogued entry notes |
| O3 | The subject classification (social-emotional / motor & physical development) is inferred, not stated | official (about the source's limits) | Catalogued entry notes |
| O4 | The app targets ages 2–8; the Videos tab is browsed by learning level; adjacent yoga/movement videos are listed 1st/2nd grade | official | `khan-academy-kids-games.md` lines 160–177, 219–221 |
| O5 | No video titles, art, audio, or recordings appear in any surveyed source | official | Catalogued entry |
| D0 | The build uses no Alo Yoga branding, content, or recordings; the name is provenance only | designed | Third-party brand; IP rule above |
| D1 | Three original sessions (Belly Breathing, Star Breathing, Quiet Listening) with exact phase seconds and runtimes 68/78/80 s | designed | O5 publishes no sessions; original content is required and auditable (section 8, A1) |
| D2 | An original animated breathing pacer (circle + countdown numeral) and spoken phase cues are the "videos"; programmatic animation is the expected realization | designed | Keeps the entry buildable; no real video required (A3, R-013) |
| D3 | Player chrome: Play/Pause, Replay, prev/next session, session picker; tapping the pacer ripples but never scores or penalizes | designed | The minimal designed interaction the interactive-player type promises |
| D4 | No camera, no microphone, no motion/gaze/face detection, no gamification | designed | Never-punishing and accessibility rules; nothing about the official videos requires sensing |
| D5 | Home, HOME chrome, resume at `lastSessionId`, hidden reset, idle hint, audio rules, no fail state | designed | Template v1; continuity without accounts |

## 4. Player experience / core loop

A child opens the collection and sees three big cards and one Play. Pressing Play softens the screen
into Belly Breathing: a voice says "Let's breathe together. Watch the circle grow", the circle swells
to "Breathe in, big balloon", holds, and shrinks to "Breathe out, slow and soft". The child taps the
circle — a ripple spreads and a soft tap sounds — and the rhythm continues. After five breaths the
voice says "Good breathing. You are calm", and an end card offers Replay or Next; later, Play resumes
the session last visited.

**Core loop:** pick a session → follow the pacer and spoken cues through its cycles → tap the pacer
to breathe along → replay or switch session → rest on the end card.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, prepare the three sessions (section 8) and audio (section 11), and then `home`: an optional decorative title, one Play target ≥96×96 CSS px, a 3-card session grid (cards sized per FR-008, ≥112×112 CSS px minimum), and a reset logo ≥64×64 CSS px (FR-012). No audio plays before the first user gesture (FR-018). |
| FR-002 | When a session starts, it shall run one deterministic timeline on a single playing-time clock (`elapsedMs`, advanced only while `playing`; Pause freezes it, Replay sets 0): **lead-in** 0→L; **cycle** *k* = 1..N starts at `C_k = L + (k−1)·K` and runs inhale `C_k`→`+i`, hold →`+h`, exhale →`+e`, rest →`+r`; **closing** `L + N·K` →`+cl`; **end card** at `T = L + N·K + cl`. Phase order is fixed with no skips; L, i, h, e, r, K, N, cl, and T come from section 8 per session. Voice cues never gate the clock — a late, missing, or cancelled clip never shifts a phase boundary. |
| FR-003 | The pacer shall be a circle at stage center whose diameter = base diameter (section 8) × scale: lead-in, closing, and rest = **0.60**; inhale **0.60→1.00** linear over its seconds; hold = **1.00**; exhale **1.00→0.60** linear over its seconds; it updates each frame with no easing, so the shape always matches the phase. During the four cycle phases the pacer shall show the phase's remaining whole seconds as a numeral, `ceil(remainingMs / 1000)` (full phase seconds at each phase start); no numeral shows during lead-in, closing, or the end card. The numeral is content (FR-013). |
| FR-004 | At each phase start — lead-in, every cycle's inhale/hold/exhale/rest, and closing — the player shall speak that phase's cue (section 8 copy) as a one-shot clip at volume 1.0 (`vo_lead_{id}`, `vo_{id}_inhale`, `vo_{id}_hold`, `vo_{id}_exhale`, `vo_{id}_rest`, `vo_close_{id}`). Cycle-phase clips are ≤2.0 s, and in phases shorter than 2.2 s they are also ≤ phase seconds − 0.2 s (≤1.8 s in the 2.0 s phases); lead-in and closing clips are ≤4.0 s. A new cue cancels the previous utterance (FR-018). |
| FR-005 | A Play/Pause target ≥64×64 CSS px shall toggle playback in `player` before the end card. Pause shall cancel the current cue and freeze the clock, pacer scale, and numeral; Resume shall restart the current phase (or the lead-in/closing segment) from its start — clock set to that phase's start, pacer to that phase's start scale, its cue re-spoken — and never skip or repeat a cycle. On the end card Play/Pause is not rendered and Space is a no-op. |
| FR-006 | A Replay target ≥64×64 CSS px (≥96×96 on the end card) shall cancel the current cue and restart the current session at `elapsedMs = 0` (`leadin`, playing), saving `lastSessionId`. Replay is available throughout `player`. |
| FR-007 | Prev/Next targets ≥64×64 CSS px shall switch to the adjacent session in list order, wrapping (Next on session 3 → session 1; Prev on session 1 → session 3), cancel the cue, start the new session at `elapsedMs = 0` playing, save `lastSessionId`, and play `sfx_card` (0.6, one-shot) on a session switch. Switches are throttled to one per 500 ms (FR-014). |
| FR-008 | A Sessions pictogram ≥64×64 CSS px shall open `picker`: a 3-card grid (home cards ≥140×140 CSS px at ≥1024 px wide and ≥112×112 at 768–1023 px; picker cards ≥120×120 at ≥1024 px and ≥96×96 at 768–1023 px; each card with pictogram + session name; the current session's card carries a 16×16 accent dot pip) over a dimmed paused stage; entry pauses the clock and cancels the cue. Tapping a card (including the current session) shall start it at `elapsedMs = 0` playing, save `lastSessionId`, and close the overlay. A Back pictogram ≥64×64 shall return to the same session, phase, and `paused` state, with no cue. HOME (FR-011) returns to `home`. |
| FR-009 | When the pacer is tapped, the player shall show a ripple (section 9) centered on the tap point and play `sfx_soft_tap` (0.5, one-shot); the clock, pacer scale, numeral, and progress are unchanged — taps never score, penalize, pause, or advance. Pacer taps are throttled to one ripple per 300 ms (a double-tap shows one ripple). On the end card the pacer is not a target and a tap on it is a no-op. Keyboard: Enter/Space on the focused pacer behaves identically. |
| FR-010 | At `T` the session shall end: the timeline stops, `sfx_bell` (0.6, one-shot) plays once, and the end card slides in over a dimmed pacer with Replay ≥96×96, Prev/Next ≥64×64, Sessions ≥64×64, and HOME. The end card rests: no auto-advance, no score, badge, streak, or comparison — the only outcomes are Replay, another session, or HOME. |
| FR-011 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `player` and `picker`; it cancels any cue or timer, saves, and returns to `home`. On `home` and `loading` no HOME control is rendered and a HOME input is a no-op (home is home). |
| FR-012 | When the home logo is held for 3 s, the player shall fill a visible progress ring for the hold duration; on completion it shall clear the save and in-memory progress and play a ring flash plus `sfx_soft_tap` (0.7, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-013 | No-reading rule: visible text is content only — the three session names and the phase countdown numeral, plus an optional decorative title. Session names are read aloud by the player's assistive-technology announcements when their card is focused or activated and when a session starts (not a voice cue, so no phase cue is cancelled); the numeral is not read aloud (pacing is carried by the pacer, numeral, and cues). Every instruction and label reaches a non-reader by voice + pictogram. Every interactive element (logo, Play, HOME, prev, Play/Pause, pacer, Replay, Next, Sessions, Back, each session card) carries an invisible accessible name (e.g. "Play", "Session: Belly Breathing, 68 seconds", "Breathing circle: tap to breathe along"); this rule governs visible text only. |
| FR-014 | Input semantics: first pointer down wins; additional simultaneous pointers are ignored until release. Hit rects take a 12 px expansion on all sides; on overlap the nearest center wins, exact ties resolve to the lowest list index (leftmost); the pacer hit rect takes precedence over the decorative stage; a tap >12 px from every hit rect is an empty tap (no state change, idle timer resets). Throttles: Play/Pause 300 ms, pacer tap 300 ms, session switches (next/prev/picker card) 500 ms; taps inside a throttle are ignored with no sound. Double-tapping Play/Pause toggles once; double-tapping Next switches once; double-tapping a picker card starts that session once. No drag gestures exist. |
| FR-015 | When no input has occurred for 12 s in `home`, `player`, or `picker`, the player shall pulse one deterministic target for 3 s: `home` — Play; `player` before the end card — Play/Pause; `player` end card — Replay; `picker` — the current session's card. `vo_hint` plays with each hint (after the first gesture; visual-only before it). The hint repeats every 12 s of continued idleness; any input, including an empty-space tap, resets the timer. |
| FR-016 | Degradation: no speech synthesis → visual-only — the timeline, pacer, and numerals still run (cues are skipped by design, FR-002), sfx still play when AudioContext exists, and a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. |
| FR-017 | Background tab: when the tab becomes hidden during `player`, the player shall cancel the cue and enter `paused` with the clock, pacer, and numeral frozen; on return it stays paused until Play (FR-005). The timeline is driven by accumulated playing time (`elapsedMs`), never by wall-clock timestamps, so phase timers cannot desync from the pacer when platform timers are throttled — phase boundaries are recomputed from `elapsedMs` on each frame. Idle time counts visible time only; throttled timers may delay hints, never lose saved progress (A6). |
| FR-018 | Audio rules: no audio plays before the first user gesture; one voice clip plays at a time — a new cue, `vo_hint`, or any other voice cancels the previous utterance immediately. sfx may overlap each other and the voice; `music_loop` (optional) may loop under both at 0.2. |
| FR-019 | The player shall not request camera or microphone access, shall not use motion, gaze, or face detection, and shall not score, rank, compare, or gate sessions; all three sessions are always available and re-playable. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial state; prepare sessions and audio; audio locked |
| `home` | decorative title + Play + 3 session cards + reset logo | the collection's home; audio unlocks on first gesture |
| `player(sessionId, phase, playback)` | ambient illustration + pacer + numeral + chrome; end card in phase `endcard` | phase ∈ {leadin, inhale, hold, exhale, rest, closing, endcard}; playback ∈ {playing, paused} |
| `picker(sessionId, returnPhase)` | dimmed paused stage + 3 cards + Back | overlay over `player`; selecting starts a session |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `home` | entry: arm audio; no sound before first gesture |
| `home` | `PLAY_PRESSED` | — | `player(lastSessionId or belly-breathing, leadin, playing)` | entry: unlock audio; lead-in cue at 0; save |
| `home` | `SESSION_CARD_TAP(i)` | — | `player(session_i, leadin, playing)` | actions: save `lastSessionId`; `sfx_card` 0.6 |
| `home` | `RESET_HOLD` | hold 3 s on logo | `home` | action: ring fill; clear save + memory; ring flash + `sfx_soft_tap` 0.7 |
| `player` | `PLAY_PAUSE` | phase ≠ endcard | `player(same, same phase, toggled)` | action: FR-005 |
| `player` | `NEXT` / ArrowRight | throttle clear | `player(next session, leadin, playing)` | actions: FR-007; save |
| `player` | `PREV` / ArrowLeft | throttle clear | `player(prev session, leadin, playing)` | actions: FR-007; save |
| `player` | `REPLAY` | — | `player(same, leadin, playing)` | actions: FR-006; save |
| `player` | `PACER_TAP` / Enter on pacer | phase ≠ endcard | `player(same)` | action: FR-009 ripple; no other change |
| `player` | `PHASE_ADVANCE` | fixed order per FR-002 | `player(same, next phase, playing)` | actions: FR-003/FR-004 |
| `player` | `SESSION_END` | `elapsedMs` reaches T | `player(same, endcard, paused)` | actions: FR-010; `sfx_bell` 0.6 |
| `player` | `PICKER_OPEN` | — | `picker(same, phase)` | actions: pause clock, cancel cue |
| `player` | `HOME_PRESSED` | — | `home` | actions: cancel cue/timers, save |
| `player` | `TAB_HIDDEN` | `playing` | `player(same, same phase, paused)` | actions: cancel cue, freeze (FR-017) |
| `picker` | `SESSION_CARD_TAP(i)` | — | `player(session_i, leadin, playing)` | actions: save `lastSessionId`; close overlay |
| `picker` | `PICKER_CLOSE` | — | `player(same, returnPhase, paused)` | none (voice not resumed) |
| `picker` | `HOME_PRESSED` | — | `home` | action: save |
| any | `IDLE_12S` | visible tab, no input 12 s | same state | action: FR-015 hint |

Events not listed for a state are ignored (no state change, no sound); on the end card Play/Pause is a no-op (FR-005).

**Tab order (v1):** `home` — logo (reset) → Play → cards 1–3; `player` before the end card — HOME → prev → Play/Pause → pacer → Replay → Next → Sessions; `player` end card — HOME → prev → Replay → Next → Sessions (no Play/Pause or pacer focus); `picker` — HOME → Back → cards 1–3 (arrows move grid focus); `loading` — none.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play / pause | tap the Play/Pause target | Space (when no control is focused) or Enter/Space on the focused target |
| Replay session | tap Replay | Tab to Replay + Enter/Space |
| Next / previous session | tap the arrow targets | ArrowRight / ArrowLeft, or Tab + Enter/Space |
| Pick a session | tap a session card | Tab to the card + Enter/Space |
| Open / close the picker | tap Sessions / Back | Tab + Enter/Space |
| Breathe along (pacer) | tap the pacer | Tab to the pacer + Enter/Space |
| HOME | tap HOME | Escape |
| Reset | hold the home logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and end-card Replay ≥96×96 CSS px; HOME, Play/Pause, Replay, prev/next, Sessions,
  Back ≥64×64; home session cards ≥140×140 (≥112×112 at 768–1023 px), picker cards ≥120×120 (≥96×96 at
  768–1023 px); pacer hit rect = the base circle's bounds + 12 px expansion (≥344 px diameter at ≥1024 px, ≥264 at
  768–1023 px) — all above the 44 px minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px per FR-014; ties resolve to the lowest list index; >12 px from every target
  is an empty tap (nothing changes; the idle timer resets).
- **Gestures:** FR-014 is single-pointer; no drag exists, so no drag alternative is needed.
- **Instructions without reading:** all chrome is pictogram + invisible name; `vo_hint` and the phase cues
  carry meaning; FR-013 limits visible text to content.
- **Accessible names:** invisible names on every interactive element (FR-013/R-011), e.g. "Session: Quiet
  Listening, 80 seconds", "Pause", "Previous session", "Choose a session", "Back to session".
- **Resize:** reflow per section 8 preserves session, phase, `elapsedMs`, playback, and progress.

## 8. Content and session data

**Sessions (designed, original):** three sessions, **226 s total**. All timings are exact; `T` is the
end-card moment. `i/h/e/r` = inhale/hold/exhale/rest seconds; `K = i+h+e+r`; `L` = lead-in; `cl` =
closing.

| # | id | Session | Focus | i | h | e | r | K | N | L | cl | T |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `belly-breathing` | Belly Breathing | slow belly breath | 4 | 2 | 4 | 2 | 12 s | 5 | 4 s | 4 s | **68 s** |
| 2 | `star-breathing` | Star Breathing | long, steady exhale | 3 | 3 | 6 | 2 | 14 s | 5 | 4 s | 4 s | **78 s** |
| 3 | `quiet-listening` | Quiet Listening | calm attention and rest | 3 | 2 | 5 | 4 | 14 s | 5 | 5 s | 5 s | **80 s** |

**Cue copy (designed; one clip per cell, one-shot at each phase start, FR-004):**

| Session | Lead-in | Inhale | Hold | Exhale | Rest | Closing |
|---|---|---|---|---|---|---|
| Belly Breathing | "Let's breathe together. Watch the circle grow." | "Breathe in, big balloon." | "Hold it." | "Breathe out, slow and soft." | "Rest." | "Good breathing. You are calm." |
| Star Breathing | "Let's breathe with a star. Reach up high." | "Breathe in, reach the star." | "Hold it, twinkle still." | "Breathe out, slow like starlight." | "Rest." | "You did it. Shine on." |
| Quiet Listening | "Let's sit quietly and listen." | "Breathe in, and listen." | "Hold still." | "Breathe out, slowly." | "Listen. What do you hear?" | "You listened so well. Feel calm." |

- **Worked example (Belly Breathing, FR-002):** lead-in 0–4000 (`vo_lead_belly-breathing`); c1 inhale
  4000–8000, hold 8000–10000, exhale 10000–14000, rest 14000–16000; cycle *k* starts at 4000+(k−1)×12000;
  c5 rest ends 64000; closing 64000–68000; **end card at 68000 ms**. Pauses never shift these boundaries
  (they are computed from `elapsedMs`).
- **Illustration guidance (original, abstract only — no characters, no brands):** Belly — warm room,
  one soft balloon at rest. Star — dusk sky, one large soft five-point star, sparkles. Quiet — meadow at
  dusk, a leaf and soft wave arcs. All sessions share `stage_bg`.
- **Media:** each session is a runtime-rendered pacer + numeral over an ambient scene (default,
  blind-buildable) or a pre-rendered file (1280×720, ≤85 s) matching the FR-002 contract; programmatic
  animation is the expected realization and no real video is required (A3, R-013).
- **Progression rule:** fixed list order 1→3; Next/Prev wrap; no locks, gates, timers, scores, or
  adaptive behavior; every session is always available, and nothing is unlocked or marked complete.
- **Layout breakpoints (numbers):** at ≥1024 px — chrome 96 px, pacer base ⌀320 px centered at 45% of the
  16:9 stage, numeral 96 px, session name 48 px, controls ≥64 px with 24 px gaps, home cards ≥140×140
  with 24 px gaps. At 768–1023 px — chrome 88 px, pacer ⌀240 px, numeral 72 px, name 40 px, home cards
  ≥112×112 with 16 px gaps. Height ≥700 px, else scale the field by 0.85 keeping targets ≥64 px; names wrap to ≤2 lines.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Session start (Play, home card, picker card, next/prev) | stage fades 200 ms; pacer at 0.60 | lead cue — 1.0 — one-shot; `sfx_card` on a switch — 0.6 — one-shot |
| Phase start (inhale/hold/exhale/rest) | pacer begins its grow/shrink; numeral resets to the phase seconds | phase cue — 1.0 — one-shot |
| Pacer tap | ripple at the tap point | `sfx_soft_tap` — 0.5 — one-shot |
| Play/Pause, HOME, Replay, Sessions, Back | depress 80 ms | `sfx_tap` — 0.7 — one-shot |
| Session end (FR-010) | end card slides in over a dimmed pacer | `sfx_bell` — 0.6 — one-shot |
| Idle hint (FR-015) | deterministic target pulses 3 s | `vo_hint` — 1.0 — one-shot (visual-only before first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.7 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after first Play | none |
| Optional background music | none | `music_loop` — 0.2 — loop |

**Effect definitions (no undefined effects):** *fade* = opacity 1→0 or 0→1 over 200 ms. *dim* = stage
opacity 1→0.35 over 200 ms. *pulse* = target scales 1→1.12→1 over 500 ms, for 3 s. *depress* =
control scales 1→0.95→1 over 80 ms. *ripple* = 60 px ⌀ circle at the tap point expanding to 120 px,
opacity 0.6→0 over 600 ms, accent color, no other motion. *ring fill* = 4 px accent stroke fills
clockwise over exactly the 3 s hold; *ring flash* = ring opacity 1→0 over 300 ms. *panel slide* =
end-card opacity 0→1 and translate-y 24 px→0 over 200 ms. *grow/shrink* = FR-003 linear, no easing.
*countdown* = numeral swaps to `ceil(remainingMs/1000)` in ≤50 ms. *pip* = 16×16 accent dot, 8 px from the card's top-right corner.

`vo_hint`: "Tap Play to breathe with the circle. Tap a session to choose it." Voice timbre and TTS
engine are build freedom; copy and timing rules are fixed.

**Audio rules (v1):** no audio before the first gesture; one voice clip at a time, a new voice clip cancels the previous utterance; sfx may overlap; `music_loop` optional at 0.2. Degradation per FR-016; background-tab timers may be throttled, handled by FR-017 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.mindfulnessVideos.v1`.
- **Shape:** `{ "lastSessionId": "<session id>", "updatedAt": "<ISO-8601>" }` — one of the three session ids.
- **Save points:** every session start/switch (Play, cards, next/prev, Replay) and HOME; `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play starts `lastSessionId`; with no save it starts session 1 (`belly-breathing`);
  there are no locks — the picker always offers all three sessions (FR-008).
- **Reset:** hold the home logo 3 s (filling ring) → clears the key and in-memory progress; the keyboard
  equivalent is holding Enter/Space 3 s on the focused logo (FR-012).
- **Deliberately not stored:** activity flags, completion or streak data, phase, clock position, pause
  state, cue/pacer tap counts, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy or Alo Yoga, and no Alo Yoga names,
branding, art, audio, or recordings appear anywhere in the build. Programmatic stubs are acceptable
(SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `stage_bg` | image | soft calm gradient backdrop with faint dots; palette below | 1280×720 SVG | static | SVG gradient |
| `ill_belly` / `ill_star` / `ill_quiet` | image | ambient scenes per section 8 guidance; abstract shapes only | 1280×720 SVG each | static | SVG shapes |
| `pict_home` / `pict_prev` / `pict_next` / `pict_replay` / `pict_sessions` / `pict_back` / `pict_play` / `pict_pause` | image | house; chevrons; circular restart arrow; 3-card grid glyph; back arrow; triangle/bars | 64×64 SVG each (end-card Replay 96×96) | static | SVG paths |
| `pict_belly` / `pict_star` / `pict_quiet` | image | balloon; star; ear/leaf glyph for the session cards | 64×64 SVG each | static | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after first Play when speech synthesis is missing | SVG path |
| `pacer` | rendered | breathing circle, scale per FR-003; numeral inside | runtime | grows/shrinks per phase | none needed |
| `ring` | image | 4 px accent progress ring for the reset hold | 96×96 SVG | during hold | SVG shape |
| `sfx_tap` / `sfx_card` / `sfx_soft_tap` | audio | UI click 0.08 s; card whoosh 0.12 s; muted tap 0.10 s | ogg/mp3 | one-shot | WebAudio blips |
| `sfx_bell` | audio | soft single bell | 1.2 s | one-shot | WebAudio tone |
| `vo_lead_{id}` / `vo_close_{id}` | audio | lead-in and closing copy per section 8, ×3 each | ≤4 s each | one-shot | TTS allowed |
| `vo_{id}_{phase}` | audio | phase cue copy per section 8, ×12 (4 phases × 3 sessions) | ≤2.0 s each (≤ phase − 0.2 s when phase < 2.2 s) | one-shot | TTS allowed |
| `vo_hint` | audio | copy in section 9 | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle ambient pad (optional) | 30 s | loop at 0.2 | may be omitted |

- **Palette tokens:** background `#EAF2F0`, ink `#2F3E46`, accent `#84A98C`, pacer `#A8DADC`, chrome
  `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); sizes per section 8.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing
  audio → silence for that cue, timeline unchanged (R-005, FR-016).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Session` | `id: string`; `name: string`; `focus: string`; `glyphKey: string`; `illKey: string`; `inhale: int`; `hold: int`; `exhale: int`; `rest: int`; `cycles: int`; `leadIn: int`; `closing: int`; `cueKeys: {leadin, inhale, hold, exhale, rest, closing: string}` |
| `Timeline` (computed) | `K: int`; `N: int`; `L: int`; `cl: int`; `T: int`; `phaseAt(elapsedMs): enum`; `phaseStartMs(phase): int`; `scaleAt(elapsedMs): float` |
| `Save` (persisted) | `lastSessionId: string`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, home, player, picker}`; `sessionId: string`; `phase: enum {leadin, inhale, hold, exhale, rest, closing, endcard}`; `playback: enum {playing, paused}`; `elapsedMs: int`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

**Derivation:** `phaseAt(elapsedMs)` computes each phase's `[startMs, endMs)` from L, K, i, h, e, r, N, cl per FR-002; `scaleAt` interpolates 0.60→1.00 in the inhale window and 1.00→0.60 in the exhale window, holding at the endpoints. `Session` records are static; adding a session = one record plus its six cue clips (`cueKeys`).

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes with a scalable circular pacer, large numerals, and one timeline clock driving phase changes.
- **R-002** The player shall animate the section 9 effects: fade, dim, pulse, depress, ripple, ring fill/flash, panel slide, grow/shrink, countdown.
- **R-003** When the user taps or clicks a target, the player shall hit-test per FR-014.
- **R-004** The player shall support keyboard focus and activation for every interactive element, with Escape = HOME, arrows = session switching, and grid navigation inside `picker`.
- **R-005** The player shall play concurrent one-shot clips (sfx + voice, voice at 1.0) and may loop one music track at ≤0.2; a failed clip is skipped without blocking the timeline.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis (or provided clips) for all cues, and when speech is unavailable shall run the identical visual timeline (pacer + numerals) with cues skipped (FR-016).
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-016), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during pacer scaling and phase changes.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing session, phase, `elapsedMs`, or playback state.
- **R-011** The player shall expose an invisible accessible name on every interactive element.
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause with no progress loss and no phase desync (FR-017); hints may fire late.
- **R-013** Each session shall be renderable at runtime from `Session` + `Timeline` data; a pre-rendered file is acceptable only if it matches the same timeline contract.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `home` shows Play, three session cards, and the logo, no audio has played, and no camera or microphone permission prompt appears |
| AC-02 | home with `lastSessionId: "star-breathing"` (or no save) | Play is pressed | Star Breathing (or Belly Breathing) starts: lead-in cue plays, the pacer sits at 0.60, and no numeral shows during the lead-in |
| AC-03 | Belly Breathing playing | the timeline runs | phase changes occur at 4000 (inhale), 8000 (hold), 10000 (exhale), 14000 (rest), 16000 (cycle 2 inhale), 64000 (closing), and the end card appears at 68000 ms; each phase start speaks its cue |
| AC-04 | Belly Breathing playing at 6000 ms (mid-inhale) | Play/Pause is pressed, then Play | the pacer and numeral freeze and the cue stops; Play restarts the inhale from its start — pacer at 0.60, numeral 4, cue re-spoken — and no cycle is skipped or repeated |
| AC-05 | any session playing (or paused) | the pacer is double-tapped within 300 ms | exactly one ripple and one `sfx_soft_tap` occur; the clock, numeral, and progress are unchanged and no score appears |
| AC-06 | session 1 (or session 3) playing | Next (or Prev) is double-tapped rapidly | exactly one session switch occurs: the new session starts at its lead-in and is saved as `lastSessionId`; Next on session 3 wraps to session 1 and Prev on session 1 wraps to session 3 |
| AC-07 | a session reaches its end-card moment | the end card appears | `sfx_bell` plays, Replay (≥96 px), prev/next, Sessions, and HOME are shown, and nothing auto-advances; after 12 s the Replay hint pulses |
| AC-08 | a session's end card | Replay is pressed | the session restarts at its lead-in with the lead-in cue |
| AC-09 | a session playing mid-phase | Sessions is tapped, then a different card is tapped (or, on a second opening, Back is tapped instead) | opening pauses the clock and stops the cue; the chosen session starts at its lead-in and is saved; Back instead returns to the same session and phase, paused, with no cue |
| AC-10 | `home`, `player`, or `picker` with no input for 12 s | idleness continues | `vo_hint` plays after the first gesture (visual-only before it) and the deterministic target (Play, Play/Pause, Replay, or the current card) pulses for 3 s; any tap resets the timer, and the hint repeats 12 s later |
| AC-11 | any session | empty space >12 px from every target is tapped | nothing changes on screen or in audio and the idle timer resets |
| AC-12 | a session switched to Quiet Listening | the page reloads and Play is pressed | Quiet Listening starts at its lead-in |
| AC-13 | `home` | the logo is held 3 s | a ring is visible during the hold and the save is cleared; the focused-logo keyboard hold behaves the same; after reload Play starts Belly Breathing |
| AC-14 | a session playing | HOME is pressed | `home` appears, the cue stops, and the save is intact |
| AC-15 | a session playing | the tab is hidden, then shown | the session is paused with the pacer and numeral frozen; Play restarts the phase it was in from that phase's start, and phase boundaries still match section 8 |
| AC-16 | speech synthesis unavailable | a session is started | no voice plays, the pacer and numerals still run the FR-002 timeline, and the muted-speaker pictogram shows for 5 s |
| AC-17 | storage blocked | a session is started and HOME is pressed | the player works normally in memory; after reload no session resumes (Play starts session 1) |
| AC-18 | a session playing at 1024×768 | the viewport is resized to 800×1000 | session, phase, playback, and progress are unchanged and every control is ≥64 px |
| AC-19 | keyboard focus on any control | Tab is pressed repeatedly | focus visits targets in the section 6 tab order with each focused control announcing its accessible name, Enter/Space activates, ArrowLeft/Right switch sessions (grid focus inside `picker`), and Escape returns HOME |
| AC-20 | any full session | a session plays start to end | no score, stars, streak, or comparison appears, and no camera/microphone prompt or detection indicator ever appears |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. All three sessions play end-to-end at the section 8 timings, with cue, pacer scale, and numeral matching every phase.
3. Play/Pause, Replay, next/prev (with wrap), picker, pacer tap, and HOME all behave as specified; the end card never auto-advances.
4. `lastSessionId` survives a reload; the reset hold clears it; no-speech and blocked-storage runs still work; no camera or microphone is ever requested.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The three sessions and all copy are original; the historical Alo Yoga videos have no published titles or content | designed — O2/O5 publish nothing; IP rule (D0) forbids reproducing them |
| A2 | The subject classification is treated as inferred, not stated | official limitation (O3) |
| A3 | A runtime-rendered pacer + ambient scene is an acceptable form of "video" | designed — keeps the build feasible for a fresh-context LLM; pre-rendered files allowed (sections 8 and 13) |
| A4 | Phase seconds (3–6 s) and cue clip limits approximate calming, child-friendly paced breathing | designed (FR-004, section 8) |
| A5 | TTS-generated voice clips and runtime TTS are acceptable | designed |
| A6 | Background-tab timers may be throttled and speech synthesis may be suspended | known platform behavior; handled by FR-017 |
| A7 | A 12 px tap tolerance, 44+ px targets, and ≥96 px session cards are sufficient for ages 3–7 | designed platform rule (section 7) |
| A8 | No camera, microphone, detection, scoring, locks, or persisted playback position | designed (FR-019, section 10) |
| A9 | Age band 3–7 is a designed targeting choice inside the app's official 2–8 range | designed |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** sessions, phase seconds and cue copy, pacer/numeral rules, controls and keyboard map, target minimums, save key/shape, no camera/microphone/detection, no gamification, IP rule, acceptance criteria.
- **Free:** exact composition of the ambient scenes within the guidance, easing of fades and slides,
  voice timbre/TTS engine, optional music, the decorative home title, the exact abstract shapes used.
- **Not in this spec:** library/Videos-tab browsing, the other video collections, yoga/movement content,
  profiles, navigation shell, parental controls, localization, analytics, scoring, streaks, reminders.
