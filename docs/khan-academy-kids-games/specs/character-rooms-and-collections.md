# Character rooms and collections

## 1. Front matter

- **Title:** Character rooms and collections (catalog name, kept for traceability only; it appears nowhere on screen or in audio)
- **Entry type:** Interactive player — character-room collection feature (home-screen feature, not a Library game). No levels, no score, no fail state.
- **Catalogued entry:** [`character-rooms-and-collections.md`](../character-rooms-and-collections.md) — home screen, bottom row
- **Official sources:** [Help Center — Parent guide](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids); [Help Center — Characters](https://khankids.zendesk.com/hc/en-us/articles/360049358751-Learn-more-about-the-characters-inside-Khan-Academy-Kids); catalog lines 56–57, 140–144, 152–153
- **Spec status:** v1 — follows template v1; not yet blind-built
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-020); no network after load
- **IP constraint:** all five characters, rooms, toys, collection items, art, voices, and copy are **original**. The catalogued title is traceability only and is never rendered or spoken. No Khan Academy character, name, art, voice, or audio is reproduced. The official cast is replaced by the original cast in section 8.
- **Interactive-player substitutions (declared):** (1) the app's home screen is realized as this player's own **home row** of five character tiles — no app shell, no navigation, no profiles; (2) a **4.5 s original intro animation** replaces a video (FR-002); (3) rooms and their toys replace library levels; (4) the officially documented cross-app earning ("complete lessons across all subjects") is **out of scope**; this spec defines a standalone designed earning model (D4, FR-007, section 16).
- **Conditional sections:** all 16 included; section 8 carries room/toy/collection content data instead of levels.

## 2. Overview and learning objective

A child sees five original animal friends along the bottom of the home screen, taps one, and walks into that friend's room: a toy to play with and a shelf of collection items. Tapping the toy starts a three-object play interaction — put each hat on Tuck, bob each bath toy for Momo, send each bug to Fern's jar, dress Bo in each garment, play each of Zuzu's instruments — and completing all three earns one new item for that room's collection, which flies onto the shelf and stays. Tapping the shelf opens the full collection display, where earned items are named aloud and un-earned ones wait as gentle silhouettes. Skills: **turn-taking, one-to-one matching (tap each object once), color and object vocabulary, and the satisfaction of a growing collection** — the feature-level counterpart of the officially documented "play with their toys and see collections earned by learning" behavior. Age band: **2–8** (official app range); the 112 px targets and voice-first feedback serve 2–5, and collecting all 30 items extends to 6–8. Expected session: **3–8 minutes** (one to two room visits).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Tapping a character at the bottom of the home screen opens their room, where children play with the character's toys and see collections earned by learning | official | Catalog lines 56–57; entry file |
| O2 | As children complete lessons they collect bugs, hats, toys, and clothes | official | Catalog lines 152–153; entry file |
| O3 | Documented room details: a hats collection, bath toys, a bug collection, a dress-up closet, and musical instruments | official | Entry file; catalog lines 140–144 |
| O4 | Collections are earned through learning across all subjects | official | Entry file |
| O5 | No individual room activity titles are published (Notes), and none of the cited official sources states per-room mechanics, item counts, or earning rules | official (absence) | Entry file — Notes; absence verified across the cited sources |
| O6 | The app is officially for children ages 2–8 | official | Catalog lines 96, 160–163 |
| O7 | The five official room themes are attached to five Khan Academy characters | official | Catalog lines 140–144 |
| D1 | Five **original** characters replace the Khan Academy cast: Tuck the tortoise (hats), Momo the otter (bath toys), Fern the fox (bugs), Bo the bunny (dress-up), Zuzu the zebra (instruments); the catalogued title appears nowhere on screen or in audio | designed | IP constraint; each original maps to one documented room theme (O3) |
| D2 | The home row of five tiles is this player's home state; the room layout is character + one toy + shelf strip + HOME | designed | The minimal designed surface the entry type promises; no app shell |
| D3 | Toy interactions: 3 objects per room, each tapped once; per-object effects and voice lines | designed | O5 publishes no mechanics; one uniform gentle shape keeps the feature buildable and non-punishing |
| D4 | Collection model: 6 items per room (30 total), earned one at a time in fixed order by completing that room's toy interaction; the official cross-app earning model is out of scope (D-declared in section 1) | designed | O4 describes earning by lessons; a standalone player has no lessons, so this in-spec model is designed and labeled |
| D5 | 4.5 s original intro animation replaces a video; declared in section 1 | designed | Interactive-player substitution |
| D6 | Chrome, persistence, 3 s reset hold, idle hints, audio rules, degradation, layouts, accessible names, no fail state | designed | Template v1 family conventions |
| D7 | All art, audio, voices, and copy are original; no visible words anywhere (names are spoken and invisible) | designed | IP constraint plus the no-reading rule |

## 4. Player experience / core loop

A child opens the player: five friends pop up along the bottom one by one and wave (4.5 s), and a voice says
"Pick a friend and visit their room!" They tap Tuck the tortoise. The room fades in: Tuck by the window, a hat
stand with three hats, and a shelf holding six dashed silhouettes. "Hi! Welcome to Tuck's room." The child taps
the hat stand — the hats lift and glow. They tap the yellow sun hat: it arcs onto Tuck's head (300 ms), Tuck
bobs, "A yellow sun hat!" They tap the blue cap, then the gold crown — sparkles, then confetti: "You found a
new one! A party hat!" A pink party hat flies to shelf slot 1 (800 ms) and the slot pops bright. The child taps
the shelf: a 3×2 display, one item lit, five silhouettes. They tap the party hat — it pops and says its name.
They tap a silhouette — it soft-pulses: "Play with the toy to find it." Back, then HOME. Tuck's tile now shows
one filled pip of six.

**Core loop:** home row → tap a friend → room → tap the toy → tap each of the three objects once → celebrate and
earn one item → watch it land on the shelf → browse the collection → HOME.

## 5. Mechanics and rules

- **FR-001** When the player loads, it shall show `loading` (blank pastel; preload per section 11; audio locked; no interactive elements), then `home`: five character tiles in fixed order left→right (Tuck, Momo, Fern, Bo, Zuzu), each ≥112×112 CSS px at ≥1024 px wide (≥96×96 at 768–1023) with the character's portrait and a 6-pip progress strip under it (6 dots of 8 px with 4 px gaps at ≥1024 px wide, 6 px with 4 px gaps at 768–1023; filled = earned), plus one inconspicuous reset mark ≥64×64 top-right (FR-014). No audio shall play before the first user gesture (FR-019).
- **FR-002** When assets are ready and the save has `introSeen:false`, the player shall play the intro animation: the five characters pop up left→right (160 ms apart, 300 ms each), wave twice (400 ms per wave), and settle; the last wave ends at 1740 ms and the settled row holds for the remaining 2760 ms (4500 ms total) on the home row. Any input cancels the remaining animation (the input is handled normally); completion or cancellation saves `introSeen:true`. `vo_intro` plays at animation start when audio is unlocked, otherwise it plays on the first gesture (R-006) unless that gesture starts another voice line (FR-003), which supersedes it. With `introSeen:true` the row appears settled with no animation.
- **FR-003** When a character tile is tapped, the player shall unlock audio and enter `room(roomId)`, speaking that room's greeting line (1.0, one-shot) and laying out the room per section 8. Tile taps are throttled to one per 500 ms (repeats inside the window are ignored).
- **FR-004** The `room` state shall show: the room's character idle art; the room's toy (hit target ≥112×112, at the section 8 position); the shelf strip of 6 slots (each ≥96×96 with 12 px gaps at ≥1024 px wide, ≥80×80 with 8 px gaps at 768–1023) showing earned items full-color and un-earned items as 40 % dashed silhouettes; and HOME ≥64×64 at a 24 px top-left margin. Tapping the toy enters `toy`; tapping the shelf enters `collection`; tapping the character makes it wave (400 ms ×2) and speaks its name (`vo_name_{roomId}`, throttled to one per 1000 ms).
- **FR-005** When `toy(roomId)` is entered, the player shall lift and highlight all three of the room's objects (8 px accent outline), speak the room's toy line (`vo_toy_{roomId}`, 1.0, one-shot), and set `used = [false,false,false]`. Object hit targets are ≥96×96. No object is ever locked, hidden, or removed.
- **FR-006** When an object is tapped: (a) if `used[i]` is false, the player shall run that object's section 8 effect, play its sound effect, speak its name line (1.0, one-shot), and set `used[i] = true`; (b) if `used[i]` is true, the player shall repeat the effect and sound effect with no voice more often than once per 1200 ms and shall not change progress. Object taps are judged at most once per 300 ms per object; a double-tap yields exactly one judged tap. When all three `used` flags are true the player shall enter `celebrating` (FR-007).
- **FR-007** On entering `celebrating(roomId)`: confetti (≤40 particles, 2500 ms) and `sfx_chime` (0.8, one-shot) play; the three objects wiggle; and the player shall speak, in order, `vo_found` (1.0) and then: (a) if the room's earned count is <6 — the next item in that room's fixed section 8 order is earned, its name line plays after `vo_found`, the item flies from the toy to its shelf slot over 800 ms, and the slot fills with a pop; (b) if that earn completes the room (6/6) — `vo_roomDone_{roomId}` plays after the item name; (c) if the earn completes all 30 items — `vo_allDone` plays instead of `vo_roomDone`; (d) if the room was already 6/6 — no item is earned and `vo_roomDone_{roomId}` plays after `vo_found`. The save is written on entry to `celebrating`. Nothing ever un-earns.
- **FR-008** `celebrating` shall auto-exit to `room(roomId)` 2500 ms after entry; the item is already on the shelf. Voice clips are not cancelled by this transition; a new voice (including HOME's silence) cancels the previous utterance per FR-019.
- **FR-009** When the shelf is tapped, the player shall enter `collection(roomId)`: 6 slots in a 3×2 grid (each ≥96×96, 16 px gaps) at ≥1024 px wide, or a 2×3 grid at 768–1023 px; earned items full-color, un-earned items 40 % dashed silhouettes; a header with the room's character portrait (96×96 at ≥1024 px wide, 80×80 at 768–1023) and the 6-pip progress strip; a Back target ≥96×96 (left-arrow pictogram, 24 px bottom-left margin); and HOME ≥64×64 at a 24 px top-left margin.
- **FR-010** In `collection`: tapping an earned item pops it (scale 1→1.15→1, 200 ms), sparkles ≤6 particles, and speaks its name line (1.0, one-shot, 300 ms throttle). Tapping an un-earned slot soft-pulses it (scale 1→1.04→1, 400 ms), plays `sfx_soft_tap` (0.5), and speaks `vo_notYet` (0.9, one-shot, throttled to one per 1200 ms). Back returns to `room(roomId)`. Nothing is ever deducted, locked, or marked wrong.
- **FR-011** Earning order within each room is fixed (section 8, items 1→6) and never randomizes; `earned[roomId]` is an integer 0–6 equal to the number of earned items. A room's toy interaction may be replayed any number of times after 6/6; replaying never removes an item.
- **FR-012** HOME shall be rendered in `room`, `toy`, `celebrating`, and `collection`; pressing it cancels every running timer and voice, saves, and returns to `home`. On `home` the state is already home, so no HOME control is rendered and a HOME input is a no-op; in `loading` nothing is interactive. The keyboard equivalent of HOME is Escape in every state except `loading`.
- **FR-013** When no input has occurred for 12 s, the player shall pulse a deterministic target for 3 s and speak the state's hint line (1.0, one-shot; visual-only before the first gesture), repeating every 12 s of continued idleness: `home` → the leftmost character tile whose collection is not 6/6 (all five complete → the leftmost tile) with `vo_hint_home`; `room` → the toy with `vo_hint_room`; `toy` → the leftmost object with `used[i] = false` (all used → the room's character) with `vo_hint_toy`; `collection` → the Back target with `vo_hint_collection`. Any input, including an empty-space tap, resets the timer; no hint fires during `celebrating` (the animation is its own cue).
- **FR-014** When the home reset mark is held for 3 s, the player shall fill a visible progress ring for the hold duration; releasing early resets the ring to 0 with no action; on completion it shall clear the storage key and in-memory progress (all counts 0, `introSeen:false`), then play a ring flash (300 ms) and `sfx_soft_tap` (0.5). Holding Enter/Space 3 s on the focused mark is the keyboard equivalent. The intro does not replay in the same session after a reset; it plays again on the next load.
- **FR-015** No-reading rule: the player shall display **no visible words** at any time (the catalogued title included); every instruction and feedback reaches a non-reader by voice plus pictogram (portraits, toys, shelf, arrows, pips, ring). Names exist only as invisible accessible names (FR-016) and spoken lines.
- **FR-016** Every interactive element — reset mark, each character tile, HOME, each room's toy, the character art, the shelf, Back, each toy object, each collection slot — shall carry an invisible accessible name, e.g. "Visit Tuck's room", "Tuck's hat stand", "Tuck's shelf, 1 of 6 items", "Home", "Reset saved collections (hold 3 seconds)", "Back to Tuck's room", "Sun hat", "Party hat, earned", "Turtle bath toy, not found yet".
- **FR-017** Input semantics: tap/click only — no drag gestures exist in this entry. The player shall track only the first pointer: a pointer-down inside a target (12 px-expanded) acquires it; pointer-up within **24 px** of the down point activates it; a pointer that moves more than 24 px before release cancels that gesture with no state change and no sound (the idle timer still resets); additional simultaneous pointers are ignored until all pointers are released; on a same-millisecond tie between two pointers the leftmost wins. Hit rects take a 12 px expansion; on overlap the target whose center is nearest wins, exact ties resolve to the leftmost, then topmost. A tap >12 px from every target is an empty tap: no state change, no sound, idle timer reset. Per-target tap throttle is 300 ms unless stated otherwise; the focused target activates on Enter/Space.
- **FR-018** Persistence per section 10: save on entering `celebrating` (item earn), on intro completion/cancellation (`introSeen:true`), and on HOME; `updatedAt` refreshes on every save. On load, the row always opens first (there is no level to resume); collections restore from the save; storage blocked → run unsaved (FR-020).
- **FR-019** Audio: no audio before the first user gesture; exactly one voice clip at a time — any new voice cancels the previous utterance; sound effects may overlap each other and the voice; every cue has the numeric volume in section 9. Optional `music_home` at 0.15 may loop on `home` only and shall stop when a room opens; it may be omitted. A missing or failed clip is skipped without blocking anything.
- **FR-020** Degradation: no speech synthesis → all voice lines are silent and every step remains playable from visuals (highlights, pulses, pips, shelf, confetti), with a muted-speaker pictogram (48×48) shown for 5 s after the first gesture; no AudioContext → all audio silent, behavior otherwise identical; storage blocked → run unsaved with full in-memory behavior (collections reset to 0 on reload, no error shown).
- **FR-021** Background tab: while the tab is hidden, voices are cancelled, the intro and `celebrating` timers pause, and the idle timer counts visible time only; on return the state is intact and any expired timer runs once. Throttled timers may delay the intro, the celebration exit, and hints; they never lose an earned item or change a count.
- **FR-022** Viewport resize or rotation mid-state reflows per section 8 preserving state, `used` flags, earned counts, and any in-flight celebration; every target stays ≥64×64 CSS px.
- **FR-023** Unknown events and unbound keys shall be ignored (no state change, no sound). All orders — row, objects, items, hints — are fixed; there is no randomness, no timer that gates progress, no unlock, and no adaptive difficulty.
- **FR-024** A room whose collection is 6/6 shall still accept toy play (FR-011) and still celebrate per FR-007(d); the home row pip strips and the collection display remain accurate at 6/6.

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank pastel background | initial; preload assets; audio locked; no focusables |
| `home` | five character tiles + pip strips + reset mark; first-load intro animation | the player's home; audio unlocks on the first gesture |
| `room(roomId)` | character + toy + shelf strip + HOME | roomId ∈ {tuck, momo, fern, bo, zuzu} |
| `toy(roomId, used[3])` | room with the toy's 3 objects lifted and highlighted | each object tapped once; `used` per FR-005 |
| `celebrating(roomId)` | frozen toy scene + confetti + item flight to the shelf | auto-exits after 2500 ms |
| `collection(roomId)` | 6-slot collection grid + header + Back + HOME | terminal until Back or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `home` | entry: arm audio; start intro animation when `introSeen:false` (FR-002) |
| `home` | `TILE_TAP` | throttle clear | `room(roomId)` | entry: unlock audio, cancel intro + save `introSeen`, speak greeting (FR-003) |
| `home` | `INTRO_END` / `INTRO_CANCEL` | `introSeen:false` | `home` | action: save `introSeen:true` |
| `home` | `RESET_HOLD` | hold 3 s on mark | `home` | action: ring fill; clear key + memory; ring flash + `sfx_soft_tap` |
| `home` | `IDLE_12S` | visible, no input 12 s | `home` | action: FR-013 hint on the leftmost incomplete tile (visual-only before the first gesture) |
| `room` | `TOY_TAP` | throttle clear | `toy(roomId, [F,F,F])` | entry: FR-005 highlight + toy line |
| `room` | `SHELF_TAP` | throttle clear | `collection(roomId)` | entry: FR-009 grid + header |
| `room` | `CHAR_TAP` | 1000 ms throttle clear | `room` | action: wave 400 ms ×2 + `vo_name_{roomId}` |
| `room` | `HOME_PRESSED` / Escape | — | `home` | action: cancel voice/timers; save |
| `room` | `IDLE_12S` | visible, no input 12 s | `room` | action: FR-013 hint on the toy |
| `toy` | `OBJECT_TAP(i)` | `used[i]` false, 300 ms throttle clear | `toy(used[i]=true)` or `celebrating` when all true | actions: FR-006 effect + sfx + name line; on complete FR-007 |
| `toy` | `OBJECT_TAP(i)` | `used[i]` true | `toy` | action: repeat effect + sfx only (voice ≤1 per 1200 ms) |
| `toy` | `CHAR_TAP` | 1000 ms throttle clear | `toy` | action: wave 400 ms ×2 + `vo_name_{roomId}` |
| `toy` | `HOME_PRESSED` / Escape | — | `home` | action: cancel voice/timers; save |
| `toy` | `IDLE_12S` | visible, no input 12 s | `toy` | action: FR-013 hint on the leftmost unused object |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms elapsed | `room(roomId)` | action: item already placed at 800 ms; save already written on entry |
| `celebrating` | `HOME_PRESSED` / Escape | — | `home` | action: cancel timer + voice; save |
| `collection` | `ITEM_TAP` | earned, 300 ms throttle clear | `collection` | action: FR-010 pop + sparkle + name line |
| `collection` | `ITEM_TAP` | not earned | `collection` | action: FR-010 soft pulse + `vo_notYet` (1200 ms throttle) |
| `collection` | `BACK_PRESSED` | — | `room(roomId)` | action: `sfx_tap` |
| `collection` | `HOME_PRESSED` / Escape | — | `home` | action: cancel voice; save |
| `collection` | `IDLE_12S` | visible, no input 12 s | `collection` | action: FR-013 hint on Back |

Events not listed for a state are ignored (no state change, no sound).

**Tab order per state:** `loading` — none; `home` — reset mark → tiles left→right (Tuck, Momo, Fern, Bo, Zuzu); `room` — HOME → toy → character → shelf; `toy` — HOME → the three objects in fixed order → character; `celebrating` — HOME only; `collection` — HOME → Back → the six slots in order (row-major: 1,2,3 then 4,5,6).

**HOME everywhere (v1):** HOME is rendered in `room`, `toy`, `celebrating`, and `collection`; it cancels every running timer (intro 4500 ms, celebrating 2500 ms, idle 12 s, reset hold, 1200 ms voice throttles), saves, and returns to `home`. `home` is itself the home state, so it renders no HOME control and a HOME input is a no-op; `loading` has no controls. Escape is HOME everywhere except `loading`. Any input resets the idle timer, including empty-space taps (FR-013).

## 7. Input and interaction

- **Primary input:** single-pointer tap / click on a target. No drag gestures exist, so no drag alternative is required.
- **Hit targets:** character tiles ≥112×112 CSS px at ≥1024 px wide (≥96×96 at 768–1023); each room's toy ≥112×112 (≥96×96); toy objects ≥96×96 (≥80×80); shelf slots and collection slots ≥96×96 (≥80×80); Back ≥96×96; HOME and reset mark ≥64×64 — all above the 44 px platform minimum, sized up for ages 2–5.
- **Tolerance (numeric):** 12 px expansion on all sides of every target; on overlap the nearest center wins, exact ties resolve to the leftmost, then topmost; a tap >12 px from every target is an empty tap (no state change, no sound; idle timer resets).
- **Pointer semantics:** first pointer only; a pointer-down inside a target (12 px-expanded) acquires it, pointer-up within 24 px of the down point activates it, and a move of more than 24 px before release cancels that gesture with no state change (no drag gestures exist, so no drag alternative is required); extra simultaneous pointers are ignored until all pointers are released (FR-017).
- **Throttles (numeric):** character tile 500 ms; toy, shelf, character, object, collection item, and Back taps 300 ms per target; character name line 1000 ms; repeated object voice 1200 ms; `vo_notYet` 1200 ms. A double-tap yields exactly one judged tap.
- **Multi-touch:** the first pointer down wins; additional simultaneous pointers are ignored until all pointers are released (no feedback of any kind).
- **Keyboard:** Tab moves focus per the section 6 tab order; Enter/Space activates the focused target; Escape is HOME. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Instructions without reading:** every instruction and feedback is voice + pictogram or animation (highlighted objects, pip strips, silhouettes, confetti, ring); visible words never appear (FR-015).
- **Accessible names (invisible, examples):** "Visit Tuck's room", "Visit Momo's room", "Tuck's hat stand", "Tuck's shelf, 1 of 6 items", "Back to Tuck's room", "Sun hat", "Party hat, earned", "Turtle bath toy, not found yet", "Home", "Reset saved collections (hold 3 seconds)".
- **Resize:** reflow per section 8 preserving state, `used` flags, earned counts, and any in-flight celebration; every target stays ≥64×64.

## 8. Levels and content data

**The five rooms (all original; the official themes are the traceability anchor).** Row, object, and item orders are fixed and deterministic; nothing randomizes.

| Room | Character (species) | Official theme | Toy | Toy objects (tap each once) | Toy line `vo_toy_{room}` | Greeting `vo_hello_{room}` |
|---|---|---|---|---|---|---|
| `tuck` | Tuck the tortoise | hats collection | the hat stand | sun hat, knit cap, crown | "Tap each hat once!" | "Hi! Welcome to Tuck's room." |
| `momo` | Momo the otter | bath toys | the little tub | rubber duck, tugboat, whale | "Tap each bath toy once!" | "Hi! Welcome to Momo's room." |
| `fern` | Fern the fox | bug collection | the log and the jar | ladybug, firefly, beetle | "Tap each bug once!" | "Hi! Welcome to Fern's room." |
| `bo` | Bo the bunny | dress-up closet | the dress-up closet | scarf, rain boots, cape | "Tap each piece once!" | "Hi! Welcome to Bo's room." |
| `zuzu` | Zuzu the zebra | musical instruments | the band rug | drum, xylophone, shaker | "Tap each instrument once!" | "Hi! Welcome to Zuzu's room." |

**Toy objects — effects, sounds, and name lines** (all ≤1.5 s, volume 1.0, one-shot).

| Object | Art guidance (original flat vector) | Effect on tap | Sfx (volume) | Name line |
|---|---|---|---|---|
| `obj_hat_sun` | wide-brim yellow sun hat, ribbon band | arc to Tuck's head 300 ms; Tuck bobs y −12 px, 300 ms | `sfx_pop` (0.6) | "A yellow sun hat!" |
| `obj_hat_knit` | blue knit cap with a pompom | arc to head 300 ms; Tuck wiggles ±3°, 300 ms | `sfx_pop` (0.6) | "A cozy blue cap!" |
| `obj_hat_crown` | gold three-point crown, gem dots | arc to head 300 ms; Tuck stands tall scale 1.06, 300 ms; sparkle ≤6 | `sfx_sparkle` (0.6) | "A shiny gold crown!" |
| `obj_tub_duck` | yellow rubber duck, orange bill | bob 0→−16→0 px, 300 ms, twice; ripple ring 40→120 px, 400 ms | `sfx_squeak` (0.5) | "The little duck!" |
| `obj_tub_boat` | red tugboat, white cabin | bob twice; ripple; 3 steam puffs, 400 ms | `sfx_squeak` (0.5) | "The red boat!" |
| `obj_tub_whale` | blue whale, white belly lines | bob twice; ripple; 5-droplet spout, 500 ms | `sfx_squeak` (0.5) | "The blue whale!" |
| `obj_bug_lady` | red ladybug, 6 black spots | flutter arc to the jar 500 ms (2 wing flaps); sparkle ≤6 on landing | `sfx_flutter` (0.5) | "A little ladybug!" |
| `obj_bug_fire` | yellow firefly, glowing tail dot | flutter arc to the jar 500 ms; tail glows 2×, 600 ms | `sfx_flutter` (0.5) | "A glowing firefly!" |
| `obj_bug_beetle` | green shiny beetle, 6 legs | walk a 3-point path to the jar, 600 ms | `sfx_tick_soft` (0.4) | "A shiny green beetle!" |
| `obj_cl_scarf` | red scarf, fringe ends | arc to Bo's neck 300 ms; Bo sways ±4°, 400 ms | `sfx_pop` (0.6) | "A warm red scarf!" |
| `obj_cl_boots` | pair of green rain boots | two arcs to Bo's feet 300 ms; Bo stamps twice (y −10 px, 200 ms each) | `sfx_stamp` (0.5) | "Green rain boots!" |
| `obj_cl_cape` | purple cape, star clasp | arc to Bo's back, unfurl scale-x 0.4→1 over 400 ms; Bo spins 360°, 600 ms | `sfx_whoosh` (0.5) | "A purple cape!" |
| `obj_mus_drum` | red drum, two tan sticks | bounce y −12 px, 250 ms; 2 concentric rings | `sfx_drum` (0.6) | "The drum!" |
| `obj_mus_xylo` | rainbow xylophone, 3 bars | bars light left→right, 150 ms each | `sfx_xylo` (0.6) | "The xylophone!" |
| `obj_mus_shaker` | green shaker egg, dot pattern | shake ±20° ×4, 400 ms; 4 dot puffs | `sfx_shaker` (0.5) | "The shaker!" |

**Collection sets — 6 items per room, earned 1→6 in this fixed order (30 total).** Item art is 96×96 SVG (80×80 at 768–1023 px); earned items render full-color, un-earned items render as 40 % dashed silhouettes. Each item has a name line `vo_item_{set}_{n}` (≤1.5 s, volume 1.0, one-shot).

| Room | Item 1 | Item 2 | Item 3 | Item 4 | Item 5 | Item 6 |
|---|---|---|---|---|---|---|
| `tuck` (`item_hats_1..6`) | party hat | rain hat | beret | propeller cap | top hat | flower crown |
| `momo` (`item_toys_1..6`) | turtle | starfish | frog | seal | submarine | penguin |
| `fern` (`item_bugs_1..6`) | butterfly | cricket | bee | dragonfly | caterpillar | ant |
| `bo` (`item_clothes_1..6`) | mittens | sunglasses | backpack | tutu | cowboy boots | raincoat |
| `zuzu` (`item_music_1..6`) | tambourine | triangle | trumpet | guitar | bells | harmonica |

**Room-complete and overall lines:** `vo_roomDone_{room}` = "Tuck's hat collection is complete!" / "Momo's bath toys are all here!" / "Fern's bug collection is complete!" / "Bo's closet is complete!" / "Zuzu's band is complete!" (≤2.5 s each); `vo_allDone` = "You found every collection!" (≤3 s); `vo_found` = "You found a new one!" (≤2 s); `vo_notYet` = "Play with the toy to find it." (≤2 s); `vo_intro` = "Pick a friend and visit their room!" (≤3 s).

**Hint lines (FR-013):** `vo_hint_home` = "Tap a friend to visit their room."; `vo_hint_room` = "Tap the toy to play."; `vo_hint_toy` = "Tap the blinking one!"; `vo_hint_collection` = "Tap the arrow to go back." (each ≤2.5 s, volume 1.0, one-shot).

**Layout (numbers).** Design spaces: landscape 1024×768 (≥1024 px wide) and portrait 768×1024 (768–1023 px wide); letterbox-scale the matching design space to the viewport (the decorative field scales; control and slot hit rects are laid out at the table's CSS pixel sizes and never shrink below their minimums); at height <700 px scale the field by an extra 0.85, and every target still stays ≥64 px.

| Element | Landscape (≥1024 px) | Portrait (768–1023 px) |
|---|---|---|
| Character tiles | 176×176, 24 px gaps, one row centered, bottom margin 48 px | 128×128, 16 px gaps, one row centered, bottom margin 64 px |
| Pip strip under a tile | 6 dots of 8 px, 4 px gaps, 12 px below the tile | 6 dots of 6 px, 4 px gaps, 8 px below |
| Reset mark | 64×64, 24 px top-right margin | 64×64, 24 px top-right |
| HOME | 64×64 at (24, 24) | 64×64 at (24, 24) |
| Room character art | 320×320 at (160, 240) | 240×240 at (96, 300) |
| Room toy | 200×200 box at (600, 300) | 160×160 at (470, 340) |
| Shelf strip | 6 slots 96×96, 12 px gaps, centered, y = height − 128 | 6 slots 80×80, 8 px gaps, centered, y = height − 112 |
| Toy objects | 3 × 160×160, 32 px gaps, centered at y = 380 | 3 × 128×128, 24 px gaps, centered at y = 420 |
| Collection grid | 3×2 of 160×160, 16 px gaps, centered | 2×3 of 128×128, 12 px gaps, centered |
| Collection header | character portrait 96×96 centered, 16 px below HOME | 80×80 centered, 16 px below HOME |
| Back | 96×96, 24 px bottom-left margin | 96×96, 24 px bottom-left |

**Worked example (first visit to Tuck's room).** Load → `loading` → `home`; `introSeen:false`, so the five characters pop up and wave over 4500 ms. The child taps Tuck's tile at 2000 ms: the intro is cancelled and `introSeen:true` saves; audio unlocks; "Hi! Welcome to Tuck's room." The room shows Tuck (320×320 at 160,240), the hat stand (600,300), and the shelf with six silhouettes. The child taps the hat stand → `toy(tuck, [F,F,F])`, the three hats lift and glow, "Tap each hat once!" Tap `obj_hat_sun`: it arcs to Tuck's head (300 ms), Tuck bobs, `sfx_pop`, "A yellow sun hat!", `used = [T,T,F]`. Tap `obj_hat_sun` again: the arc and `sfx_pop` repeat with no voice inside the 1200 ms window and `used` stays `[T,T,F]`. Tap `obj_hat_knit` → "A cozy blue cap!", then `obj_hat_crown` → sparkle, "A shiny gold crown!" — all used → `celebrating`: confetti ≤40, `sfx_chime`, "You found a new one!", "A party hat!"; the party hat flies to shelf slot 1 (800 ms) and the slot pops; `earned.tuck = 1` saves. At 2500 ms, `room` again: the shelf shows one lit hat and five silhouettes. Shelf tap → `collection(tuck)`: slot 1 lit. Tap it → pop, sparkle, "A party hat!" Tap slot 2 (silhouette) → soft pulse, `sfx_soft_tap`, "Play with the toy to find it." Back → room; HOME → `home`, Tuck's pip strip shows 1 of 6 filled.

**Progression rule:** no levels, no unlocks, no gates, no timers, no adaptive difficulty; every room is open from the first load; the only progression is the per-room earned count 0→6, fixed order, replayable at any time.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Tile / toy / shelf / Back / HOME press | depress scale 1→0.95→1, 80 ms | `sfx_tap` — 0.5 — one-shot, 0.08 s |
| Room entry | room fades in 250 ms; greeting | `vo_hello_{room}` — 1.0 — one-shot, ≤2.5 s |
| Character tapped | wave: arm/wing rotates 0→20°→0 twice, 400 ms each | `vo_name_{room}` — 1.0 — one-shot, ≤1.2 s (1000 ms throttle) |
| Toy state entry | 3 objects lift 8 px and highlight (8 px accent outline) | `vo_toy_{room}` — 1.0 — one-shot, ≤2.5 s |
| Object tapped (first time) | object's section 8 effect | object sfx — 0.4–0.6 — one-shot; name line — 1.0 — one-shot |
| Object tapped (repeat) | effect repeats | object sfx — 0.4–0.6 — one-shot only (voice ≤1 per 1200 ms) |
| Toy complete | confetti ≤40 particles, 2500 ms; objects wiggle ±3°, 300 ms; item flight 800 ms; slot pop 1→1.15→1, 200 ms | `sfx_chime` — 0.8 — one-shot, 0.8 s; `vo_found`, item name, then `vo_roomDone_{room}` or `vo_allDone` — 1.0 each — one-shots |
| Earned item tapped in collection | pop 1→1.15→1, 200 ms; sparkle ≤6 | `vo_item_{set}_{n}` — 1.0 — one-shot (300 ms throttle) |
| Un-earned slot tapped | soft pulse 1→1.04→1, 400 ms | `sfx_soft_tap` — 0.5 — one-shot; `vo_notYet` — 0.9 — one-shot (1200 ms throttle) |
| Idle hint (FR-013) | hint pulse 1→1.12→1, 500 ms per cycle, 3 s | state hint line — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fills during the hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| Intro animation (first load) | characters pop up left→right, wave twice, settle, 4500 ms | `vo_intro` — 1.0 — one-shot (per FR-002) |
| Optional home music | — | `music_home` — 0.15 — loop on `home` only; stops when a room opens; may be omitted |

**Effect definitions (no undefined effects):** *depress* = scale 1→0.95→1 over 80 ms. *pop* = scale 1→1.15→1 over 200 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3 s. *bob* = translate y 0→−h→0 px over 300 ms, h = 12 px (hats) or 16 px (bath toys) per section 8. *wiggle* = rotate 0→−3°→+3°→0 over 300 ms. *sway* = rotate 0→−4°→+4°→0 over 400 ms. *stamp* = translate y 0→−10→0 px over 200 ms. *spin* = rotate 0→360° over 600 ms. *wave* = one limb rotates 0→20°→0 over 400 ms, twice. *highlight* = 8 px accent outline appears in ≤100 ms and holds while `toy` is open. *arc* = translate to the destination along a 40 px-high arc over 300 ms. *flutter* = arc with 2 wing flaps (wing rotate ±15°, 120 ms each) over 500 ms. *ripple* = 4 px accent ring scaling 40→120 px, fading 0.6→0 over 400 ms. *steam puff* = 24 px white circle rising 32 px, fading over 400 ms, ×3. *spout* = 5 droplets flying ≤48 px outward over 500 ms. *sparkle* = ≤6 square particles ≤40 px flying ≤60 px outward over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *item flight* = translate along a 60 px arc from the toy to the shelf slot over 800 ms with a 1.1 scale, then the slot pops. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold. *ring flash* = ring opacity 1→0 over 300 ms. *fade-in* = opacity 0→1 over 250 ms. *muted pictogram* = 48×48 speaker-with-slash shown 5 s after the first gesture when speech is missing. Object-specific motions: *lift* = translate y 0→−8 px, appears in ≤100 ms and holds while `toy` is open. *walk* = translate along a 3-point zigzag path to the jar over 600 ms. *glow* = tail dot opacity 0.5→1→0.5 over 300 ms, twice. *unfurl* = scale-x 0.4→1 over 400 ms. *bounce* = translate y 0→−12→0 px over 250 ms. *concentric rings* = two ripples, the second starting 100 ms after the first. *bar light* = each bar's opacity rises 0.5→1 over 150 ms, left to right. *shake* = rotate 0→+20°→−20°→0 over 100 ms, 4 cycles. *dot puffs* = ≤4 dots flying ≤40 px outward over 400 ms.

**Audio rules (v1):** no audio before the first user gesture (FR-019); one voice at a time — any new voice cancels the previous utterance; sfx may overlap; optional `music_home` at 0.15 on `home` only, stopping when a room opens; degradation per FR-020; background-tab behavior per FR-021 (A6). Voice timbre, language, and TTS engine are build freedom within the copy above.

## 10. Progress and persistence

- **Storage class:** browser local storage; no network, no accounts.
- **Key:** `spec.characterRooms.v1`; **shape:** `{ "earned": { "tuck": 0, "momo": 0, "fern": 0, "bo": 0, "zuzu": 0 }, "introSeen": false, "updatedAt": "<ISO-8601>" }` — each `earned` value is an integer 0–6 (items earned in fixed order), `introSeen` is a boolean.
- **Save points:** entering `celebrating` (the item earn, written before the animation finishes), intro completion or cancellation (`introSeen:true`), and HOME. `updatedAt` refreshes on every save.
- **Restore:** the row always opens first (there is no level or position to resume); pip strips, shelves, and collection grids rebuild from `earned`; `introSeen:true` suppresses the intro. No in-flight state (current room, `used` flags, timers) is restored.
- **Reset:** hold the home reset mark 3 s (ring fills) → clears the key and in-memory progress (all counts 0, `introSeen:false`); keyboard equivalent: hold Enter/Space 3 s on the focused mark. The intro does not replay until the next load (FR-014).
- **Deliberately not stored:** current room, toy progress, visit counts, throttle state, timings, audio settings, anything identifying. One key only; no shared kernel.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy, and no Khan Academy character, name, art, voice, or audio appears. SVG / WebAudio / speechSynthesis stubs are acceptable when the row says so. All audio volumes are numeric (section 9).

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_pastel` | image | soft pastel backdrop `#FDF3E3` with faint dots | 1024×768 SVG | static | SVG gradient + dots |
| `room_bg_{tuck,momo,fern,bo,zuzu}` | image | five room backdrops: cozy den with a window (tuck); tiled bath nook with a tub (momo); leafy garden nook with a log (fern); bedroom with a closet (bo); band corner with a rug (zuzu) | 1024×768 SVG each | static | SVG shapes |
| `char_{tuck,momo,fern,bo,zuzu}_idle` / `_happy` / `_wave` | image | the five original characters, three frames each, flat rounded linework | 320×320 SVG each | idle breathing loop 2 s; happy/wave one-shot | SVG shapes |
| `toy_{tuck,momo,fern,bo,zuzu}` | image | hat stand; little tub; log + jar; dress-up closet; band rug | 200×200 SVG each | static; pops on tap | SVG shapes |
| `obj_*` (15) | image | the section 8 toy objects (3 per room), 160×160 | SVG each | per-object effect | SVG shapes |
| `item_{hats,toys,bugs,clothes,music}_{1..6}` (30) | image | the section 8 collection items, full-color + a 40 % dashed silhouette variant | 96×96 SVG each (80×80 at 768–1023) | static; pop on tap | SVG shapes |
| `pict_home` | image | house pictogram | 64×64 SVG | depress | SVG path |
| `pict_back` | image | left-arrow pictogram | 96×96 SVG | depress | SVG path |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after the first gesture when speech is missing | SVG path |
| `ring` | image | 4 px accent progress ring for the reset hold | 96×96 SVG | during hold | SVG shape |
| `sparkle` / `confetti` | rendered | square particle; rect particle | runtime | one-shot (≤6 / ≤40) | SVG shapes |
| `sfx_tap`, `sfx_soft_tap`, `sfx_pop`, `sfx_sparkle`, `sfx_chime` | audio | UI click 0.08 s; muted tap 0.10 s; soft pop 0.12 s; twinkle 0.20 s; 3-note chime 0.80 s | ogg/mp3 | one-shot | WebAudio blips/arpeggio |
| `sfx_squeak`, `sfx_flutter`, `sfx_tick_soft`, `sfx_stamp`, `sfx_whoosh`, `sfx_drum`, `sfx_xylo`, `sfx_shaker` | audio | bath squeak 0.20 s; soft flutter 0.30 s; soft tick 0.05 s; foot stamp 0.15 s; cloth whoosh 0.30 s; low drum boom 0.50 s; three rising notes 0.90 s; sh-sh 0.50 s | ogg/mp3 | one-shot | WebAudio blips/noise |
| `vo_intro`, `vo_hint_home`, `vo_hint_room`, `vo_hint_toy`, `vo_hint_collection`, `vo_found`, `vo_notYet`, `vo_allDone` | audio | copy in section 8/FR-013 | ≤3 s each | one-shot | TTS allowed |
| `vo_hello_{tuck,momo,fern,bo,zuzu}`, `vo_name_{...}`, `vo_toy_{...}`, `vo_roomDone_{...}` | audio | per-room greetings, names, toy lines, room-complete lines (section 8) | ≤2.5 s each | one-shot | TTS allowed |
| `vo_obj_{object id}` (15) | audio | object name lines keyed by the section 8 object ids (e.g. `vo_obj_hat_sun`) | ≤1.5 s each | one-shot | TTS allowed |
| `vo_item_{set}_{1..6}` (30) | audio | item name lines (section 8) | ≤1.5 s each | one-shot | TTS allowed |
| `music_home` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `home` only; stops when a room opens | may be omitted |

- **Palette / typography:** background `#FDF3E3`, ink `#3A2E24`, accent `#E4572E`, leaf `#7FB069`, sky `#BFE3F0`, gold `#F2B33D`, cream `#FFFDF7`; system rounded stack (`ui-rounded`, fallback `system-ui`); **no visible type anywhere** (FR-015) — all labels are pictograms, art, or spoken.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → skip that clip, behavior otherwise unchanged (FR-019, FR-020).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Room` | `id: enum {tuck, momo, fern, bo, zuzu}`; `characterName: string`; `species: string`; `theme: string` (official theme); `toyName: string`; `objects: Object[3]`; `items: Item[6]`; `greetingClip`, `nameClip`, `toyClip`, `doneClip: string` |
| `Object` | `id: string`; `artKey: string`; `sfxKey: string`; `nameClip: string`; `effect: string` (section 8) |
| `Item` | `id: string`; `artKey: string`; `silhouetteKey: string`; `nameClip: string` |
| `Save` (persisted) | `earned: Record<RoomId, int 0-6>`; `introSeen: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, home, room, toy, celebrating, collection}`; `roomId: RoomId \| null`; `used: bool[3]`; `introActive: bool`; `introSuppressed: bool` (set by the reset so the intro does not replay this session, FR-014); `hintTimer: id`; `celebrateTimer: id`; `introTimer: id`; `voiceThrottle: id`; `focusIndex: int`; `audioUnlocked: bool`; `storageOk: bool` |

`Room`, `Object`, and `Item` records are static content (section 8); judgment reads only `used[i]` and `earned[roomId]`. No field is random.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, character frames, toy objects, and collection items.
- **R-002** The player shall animate the section 9 effects: depress, pop, pulses, bob, lift, wiggle, sway, stamp, spin, bounce, shake, walk, glow, unfurl, bar light, wave, arc, flutter, ripple, steam, spout, sparkle, dot puffs, confetti, item flight, ring fill/flash, fade-in, and highlight.
- **R-003** The player shall hit-test tap, click, double-tap, and multi-touch pointer input per FR-017; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for every interactive target, with Escape = HOME and the section 6 tab order.
- **R-005** The player shall play one voice clip at a time with sfx overlap, cancel the previous utterance whenever a new voice starts, and skip a failed clip without blocking play.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis or provided clips for all lines, with the FR-020 no-speech fallback and the muted pictogram.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage, and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during the intro, item flights, sparkles, and confetti.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing state, `used` flags, or earned counts, and every target shall stay ≥64 CSS px.
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-016).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause the intro and celebration, count visible idle time only, and never lose an earned item (FR-021).
- **R-013** The player shall request no camera, microphone, or network access at runtime.
- **R-014** All rendered, spoken, and written assets shall be original; no Khan Academy character, name, art, voice, or audio shall be reproduced, and no visible word shall appear.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `home` shows five character tiles (each ≥112 px with a 6-pip strip) and the reset mark, and no audio has played |
| AC-02 | a first load with `introSeen:false` | the row appears | the five characters pop up and wave over 4500 ms; a tap during the animation cancels it and is handled normally, and `introSeen:true` saves |
| AC-03 | `home` | Tuck's tile is tapped, then tapped again inside 500 ms | the room opens with Tuck, the hat stand, the shelf of six silhouettes, HOME, and "Hi! Welcome to Tuck's room."; the second tap opens no second room and plays no second greeting |
| AC-04 | Tuck's room | the hat stand is tapped | `toy` opens, the three hats lift and highlight, and "Tap each hat once!" plays |
| AC-05 | `toy(tuck)` | the sun hat is tapped (effect 300 ms), then tapped again after the effect finishes | the first tap arcs it to Tuck's head with `sfx_pop` and "A yellow sun hat!"; the second repeats the arc and sound with no voice and no progress change |
| AC-06 | `toy(tuck)` with two hats used | the crown is tapped | sparkle and "A shiny gold crown!" play, then confetti, `sfx_chime`, "You found a new one!", "A party hat!", and the party hat flies to shelf slot 1 and lights it |
| AC-07 | the celebration from AC-06 | 2500 ms pass | the room reappears with the party hat lit on the shelf and five silhouettes, and `earned.tuck = 1` is saved |
| AC-08 | Tuck's room with 1 item | the shelf is tapped | `collection(tuck)` shows a 3×2 grid with slot 1 lit, five silhouettes, the header portrait, Back, and HOME |
| AC-09 | `collection(tuck)` | the lit slot 1 is tapped | it pops, sparkles ≤6 particles, and "A party hat!" plays |
| AC-10 | `collection(tuck)` | a silhouette slot is tapped | it soft-pulses, `sfx_soft_tap` plays, "Play with the toy to find it." plays, and no count changes |
| AC-11 | `collection(tuck)` then the room, then `home` | Back is pressed, then HOME | Back returns to Tuck's room; HOME returns to the row and Tuck's pip strip shows 1 of 6 filled |
| AC-12 | any state except `loading` | Tab is pressed repeatedly, then Enter/Space, then Escape | focus follows the section 6 tab order, Enter/Space activates the focused target, and Escape returns HOME |
| AC-13 | `home` | the reset mark is held 3 s (or Enter/Space is held on it), and separately released before 3 s | the ring fills during the hold and, on completion, the save clears with a ring flash and `sfx_soft_tap`; releasing early leaves the save unchanged and the ring at 0; after reload the row shows 0/6 and the intro plays |
| AC-14 | a save with `earned.tuck = 3` and `introSeen:true` | the page reloads | the row appears settled (no intro), Tuck's pip strip shows 3 filled, and his shelf and collection show three lit items |
| AC-15 | Tuck's room, 12 s with no input | idleness continues | the hat stand hint-pulses for 3 s and "Tap the toy to play." plays (visual-only before the first gesture); any tap resets the timer |
| AC-16 | `home` before any gesture, 12 s with no input | idleness continues | the leftmost incomplete tile pulses with no audio; after the first gesture the hint also speaks |
| AC-17 | speech synthesis unavailable | a full toy interaction runs | no voice plays, highlights, effects, confetti, pips, and the shelf still carry every step, an item is still earned, and the muted pictogram shows 5 s |
| AC-18 | storage blocked | a toy interaction earns an item and HOME is pressed | all behavior works in memory; after reload the collections are 0 and no error appears |
| AC-19 | `toy(tuck)` | two fingers tap the sun hat and the crown simultaneously | only the first pointer is tracked, exactly one object becomes used, and the second shows no feedback |
| AC-20 | any state | empty space >12 px from every target is tapped | nothing changes on screen or in audio and the idle timer resets |
| AC-21 | `toy(momo)` with one toy used | the viewport is resized 1024×768 → 800×1000 | the state, `used` flags, and earned counts are unchanged and every remaining target is ≥64 px |
| AC-22 | a room with `earned = 6` | the toy interaction is completed again | no new item is earned, the celebration and "…collection is complete!" still play, and no item is removed |
| AC-23 | 29 items earned | the 30th item is earned | "You found a new one!" and "You found every collection!" play, all five collections read 6/6, and the row shows full pip strips |
| AC-24 | any state | the screen is scanned for visible text | no words appear anywhere; the catalogued title appears nowhere on screen or in audio |
| AC-25 | any state | assistive technology reads the interactive elements | every element announces an invisible name (e.g. "Visit Tuck's room", "Party hat, earned", "Turtle bath toy, not found yet") |
| AC-26 | any state | an unbound key (e.g. `A`) is pressed | nothing changes on screen or in audio and play continues normally |
| AC-27 | `celebrating` | the tab is hidden, then shown | the state is intact, the exit timer fires late rather than early, and the earned item and save are unchanged |
| AC-28 | Tuck's room | Tuck is tapped twice quickly | he waves twice and his name plays once (the second tap inside the 1000 ms window shows the wave but plays no new voice) |
| AC-31 | any state | a pointer goes down on a target, moves 40 px, and releases over the target | nothing activates (no state change, no sound) and the idle timer resets |
| AC-29 | any state | a target (tile, toy, object, item, Back, HOME) is double-tapped inside its throttle window | exactly one judged event occurs — one room opens, one object is judged once, one item pops, or one HOME — and the second tap adds no voice, effect, or state change |
| AC-30 | no AudioContext | a load, a room entry, and a full toy interaction run | all audio is silent and every step still plays: highlights, effects, confetti, pips, the shelf, and the earned item behave exactly as with audio |

**FR coverage:** FR-001→AC-01; FR-002→AC-02; FR-003→AC-03, AC-29; FR-004→AC-03, AC-08, AC-28; FR-005→AC-04; FR-006→AC-05, AC-29; FR-007→AC-06, AC-22, AC-23; FR-008→AC-07; FR-009→AC-08; FR-010→AC-09, AC-10; FR-011→AC-06, AC-22; FR-012→AC-11, AC-12, AC-29; FR-013→AC-15, AC-16; FR-014→AC-13; FR-015→AC-24; FR-016→AC-25; FR-017→AC-19, AC-20, AC-29, AC-31; FR-018→AC-07, AC-14; FR-019→AC-17; FR-020→AC-17, AC-18, AC-30; FR-021→AC-27; FR-022→AC-21; FR-023→AC-26; FR-024→AC-22.

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The five rooms exist with their exact toys, objects, item sets, and copy from section 8; tapping a tile opens the room and HOME returns to the row.
3. A toy interaction completes when all three objects are tapped once; an item is earned, flies to the shelf, persists, and appears in the collection display.
4. Resume, the 3 s reset hold, idle hints, keyboard access, multi-touch, and the no-speech / no-audio / blocked-storage runs behave as specified.
5. No visible word appears anywhere; no Khan Academy character, name, art, voice, or audio appears; no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Five original characters replace the Khan Academy cast; each maps to one documented room theme (O3) | designed — IP constraint (D1) |
| A2 | 3 toy objects per room and 6 collection items per room (30 total) | designed — no official counts exist (O5); 6 fits a 3×2 display and one row of pips |
| A3 | Items are earned by completing a room's toy interaction; the official cross-app lesson earning is out of scope | designed (D4) — a standalone player has no lessons; declared in section 1 |
| A4 | A 4.5 s intro animation is the declared video substitution | designed (D5) |
| A5 | TTS-generated or runtime TTS voice clips are acceptable | designed |
| A6 | Browsers block autoplay until the first gesture, and background-tab timers may be throttled | platform facts; handled by R-006 and FR-021 |
| A7 | 12 px tap tolerance, 112 px character/toy targets, and 300 ms throttles suit ages 2–5 | designed (section 7) |
| A8 | No levels, unlocks, adaptive difficulty, or persisted position; the row always opens first | designed (FR-018, section 8) |
| A9 | Room, object, and item art guidance is deliberately open (flat rounded linework) | designed — build freedom within the palette |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the five original characters and their room themes; the 3-object toy shape and the 6-item sets in fixed order; the standalone earning model; the state list, transitions, and HOME rule; tab orders and keyboard map; hit tolerances, throttles, and target minimums; the save key `spec.characterRooms.v1` and shape; the 3 s reset hold; no visible words; no fail state; asset provenance; acceptance criteria.
- **Free:** exact composition of the rooms and characters within the art guidance, easing curves, particle look, voice timbre/TTS engine, optional music, decorative details within the palette.
- **Not in this spec:** the app shell (navigation, profiles, parental controls), cross-app progression or lesson integration (the official earning source), other home-screen entries, localization, analytics, scoring, streaks, or teacher tooling; no network after load.
