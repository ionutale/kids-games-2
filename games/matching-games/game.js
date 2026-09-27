/* Matching games (Logic+) — "Pair up"
 * Built blind from docs/khan-academy-kids-games/specs/matching-games.md
 * Stack: DOM + inline SVG + CSS/WAAPI, Web Audio + speechSynthesis,
 * vanilla ES module, no build step, no dependencies (stack-decision.md).
 */

/* ======================================================================== *
 * 1. Spec constants
 * ======================================================================== */

const SAVE_KEY = 'spec.matchingGames.v1';
const TOTAL_LEVELS = 8;

const T_PICK = 250;          // pick throttle (FR-010)
const T_FLOURISH = 500;      // match flourish lockout (FR-005 / FR-010)
const T_TEACHING = 1200;     // teaching duration (FR-006)
const T_CELEBRATION = 2500;  // celebration -> next level (section 6)
const T_IDLE = 12000;        // idle hint (FR-011)
const T_REPLAY = 500;        // Replay throttle (section 7)
const T_HOLD = 3000;         // logo reset hold (FR-016)
const TAP_SLOP = 12;         // mis-tap tolerance in px per side (section 7)

const SFX_GAIN = {
  sfx_pick: 0.6,
  sfx_pop: 0.7,
  sfx_soft_tap: 0.5,
  sfx_soft_buzz: 0.5,
  sfx_chime: 0.8,
  sfx_tap: 0.6,
};

const VOICE = {
  target: 'Find the pairs! Tap two cards that match.',
  match: 'A pair!',
  mismatch: "Those don't match. Try again!",
  praise: 'You found every pair!',
  complete: 'You matched every single pair!',
};

const TOKEN_NAMES = {
  fx: 'fox', fg: 'frog', lf: 'leaf', bz: 'bee', sh: 'snail',
  mn: 'moon', wl: 'owl', ms: 'mushroom', sf: 'starfish', cl: 'cloud',
};

const PALETTE = {
  ink: '#3E2C1E', cream: '#FFF8EC', teal: '#6FA8A0', gold: '#F2B84B',
  coral: '#E8804C', green: '#7BC47F', deepGreen: '#5FA463',
  violet: '#8E7CC3', brick: '#C96B58', sand: '#E8B45C', sky: '#A9C9E8',
};

/* ---- original token drawings: 3-6 primitives each (section 11) ---------- *
 * `shape` = the silhouette primitives; `detail` = interior detail that a
 * shadow variant drops. Shadow rendering re-fills every shape primitive
 * with #3E2C1E at 0.85 opacity.                                         */

const TOKENS = {
  fx: {
    shape: `
      <path d="M78 92 L44 22 L116 54 Z" fill="${PALETTE.brick}"/>
      <path d="M186 88 L222 40 L148 48 Z" fill="${PALETTE.brick}"/>
      <path d="M128 44 L200 100 L172 216 L86 216 L58 100 Z" fill="${PALETTE.brick}"/>`,
    detail: `
      <ellipse cx="154" cy="172" rx="38" ry="27" fill="${PALETTE.cream}"/>
      <circle cx="104" cy="118" r="9" fill="${PALETTE.ink}"/>
      <circle cx="152" cy="110" r="9" fill="${PALETTE.ink}"/>
      <circle cx="182" cy="170" r="9" fill="${PALETTE.ink}"/>`,
  },
  fg: {
    shape: `
      <ellipse cx="128" cy="154" rx="82" ry="66" fill="${PALETTE.green}"/>
      <circle cx="86" cy="86" r="32" fill="${PALETTE.green}"/>
      <circle cx="170" cy="86" r="32" fill="${PALETTE.green}"/>`,
    detail: `
      <circle cx="86" cy="86" r="14" fill="${PALETTE.cream}"/>
      <circle cx="86" cy="86" r="7" fill="${PALETTE.ink}"/>
      <circle cx="170" cy="86" r="14" fill="${PALETTE.cream}"/>
      <circle cx="170" cy="86" r="7" fill="${PALETTE.ink}"/>
      <path d="M92 150 q36 32 72 0" fill="none" stroke="${PALETTE.ink}" stroke-width="7" stroke-linecap="round"/>`,
  },
  lf: {
    shape: `
      <path d="M128 22 C196 66 196 190 128 234 C60 190 60 66 128 22 Z" fill="${PALETTE.deepGreen}"/>`,
    detail: `
      <path d="M128 44 L128 218" fill="none" stroke="${PALETTE.cream}" stroke-width="7" stroke-linecap="round"/>
      <path d="M128 92 L100 70 M128 132 L158 108 M128 172 L104 152" fill="none" stroke="${PALETTE.cream}" stroke-width="6" stroke-linecap="round"/>`,
  },
  bz: {
    shape: `
      <ellipse cx="128" cy="150" rx="64" ry="52" fill="${PALETTE.gold}"/>
      <ellipse cx="84" cy="74" rx="32" ry="20" transform="rotate(-28 84 74)" fill="${PALETTE.sky}"/>
      <ellipse cx="172" cy="74" rx="32" ry="20" transform="rotate(28 172 74)" fill="${PALETTE.sky}"/>`,
    detail: `
      <path d="M92 126 h72 M96 162 h64" fill="none" stroke="${PALETTE.ink}" stroke-width="10" stroke-linecap="round"/>
      <path d="M110 104 q-14 -34 -32 -40 M146 104 q14 -34 32 -40" fill="none" stroke="${PALETTE.ink}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="98" cy="150" r="7" fill="${PALETTE.ink}"/>`,
  },
  sh: {
    shape: `
      <rect x="42" y="178" width="180" height="52" rx="26" fill="${PALETTE.teal}"/>
      <circle cx="116" cy="128" r="62" fill="${PALETTE.sand}"/>`,
    detail: `
      <path d="M116 96 a32 32 0 1 1 -32 32 a22 22 0 1 0 22 -22 a13 13 0 1 1 -13 13" fill="none" stroke="${PALETTE.ink}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="184" cy="150" r="7" fill="${PALETTE.ink}"/>`,
  },
  mn: {
    shape: `
      <path d="M185 40 A104 104 0 1 0 185 216 A88 88 0 0 1 185 40 Z" fill="${PALETTE.sand}"/>`,
    detail: `
      <circle cx="112" cy="102" r="17" fill="${PALETTE.cream}" opacity="0.55"/>
      <circle cx="128" cy="166" r="12" fill="${PALETTE.cream}" opacity="0.45"/>`,
  },
  wl: {
    shape: `
      <path d="M64 62 L46 12 L100 44 Z" fill="${PALETTE.violet}"/>
      <path d="M194 68 L208 34 L152 50 Z" fill="${PALETTE.violet}"/>
      <circle cx="128" cy="140" r="86" fill="${PALETTE.violet}"/>
      <circle cx="94" cy="116" r="33" fill="${PALETTE.cream}"/>
      <circle cx="166" cy="124" r="27" fill="${PALETTE.cream}"/>`,
    detail: `
      <circle cx="94" cy="116" r="13" fill="${PALETTE.ink}"/>
      <circle cx="166" cy="124" r="11" fill="${PALETTE.ink}"/>
      <path d="M126 142 l14 22 h-26 Z" fill="${PALETTE.sand}"/>`,
  },
  ms: {
    shape: `
      <rect x="104" y="126" width="48" height="94" rx="18" fill="${PALETTE.cream}"/>
      <path d="M32 142 A96 96 0 0 1 224 142 Z" fill="${PALETTE.coral}"/>`,
    detail: `
      <circle cx="96" cy="104" r="16" fill="${PALETTE.cream}"/>
      <circle cx="156" cy="92" r="12" fill="${PALETTE.cream}"/>`,
  },
  sf: {
    shape: `
      <path d="M128 128 L128 32 M128 128 L216 92 M128 128 L184 206 M128 128 L72 206 M128 128 L40 92"
            fill="none" stroke="${PALETTE.brick}" stroke-width="34" stroke-linecap="round"/>
      <circle cx="128" cy="128" r="44" fill="${PALETTE.brick}"/>`,
    detail: `
      <circle cx="128" cy="128" r="9" fill="${PALETTE.cream}"/>
      <circle cx="128" cy="72" r="6" fill="${PALETTE.cream}"/>
      <circle cx="184" cy="128" r="6" fill="${PALETTE.cream}"/>
      <circle cx="128" cy="184" r="6" fill="${PALETTE.cream}"/>
      <circle cx="72" cy="128" r="6" fill="${PALETTE.cream}"/>`,
  },
  cl: {
    shape: `
      <circle cx="128" cy="102" r="62" fill="${PALETTE.sky}"/>
      <circle cx="92" cy="150" r="56" fill="${PALETTE.sky}"/>
      <circle cx="164" cy="150" r="56" fill="${PALETTE.sky}"/>`,
    detail: ``,
  },
};

/* Table A (pairs) + Table B (grids and slot orders) — fixed, no randomness */
const LEVELS = [
  null,
  { grid: [3, 2], smallGrid: [2, 3], order: 'ABCABC',
    pairs: [['A', 'fx', 'icon'], ['B', 'fg', 'icon'], ['C', 'lf', 'icon']] },
  { grid: [3, 2], smallGrid: [2, 3], order: 'ABCBCA',
    pairs: [['A', 'bz', 'icon'], ['B', 'sh', 'icon'], ['C', 'mn', 'icon']] },
  { grid: [4, 2], smallGrid: [2, 4], order: 'ABCDCDAB',
    pairs: [['A', 'fx', 'icon'], ['B', 'bz', 'icon'], ['C', 'wl', 'icon'], ['D', 'sf', 'icon']] },
  { grid: [4, 2], smallGrid: [2, 4], order: 'ABCDBADC',
    pairs: [['A', 'wl', 'icon'], ['B', 'ms', 'icon'], ['C', 'fg', 'shadow'], ['D', 'cl', 'shadow']] },
  { grid: [5, 2], smallGrid: [2, 5], order: 'ABCDECEADB',
    pairs: [['A', 'sh', 'icon'], ['B', 'lf', 'icon'], ['C', 'mn', 'icon'], ['D', 'fx', 'shadow'], ['E', 'bz', 'shadow']] },
  { grid: [4, 3], smallGrid: [3, 4], order: 'ABCDEFCAFEDB',
    pairs: [['A', 'ms', 'icon'], ['B', 'mn', 'icon'], ['C', 'lf', 'shadow'], ['D', 'cl', 'shadow'], ['E', 'fx', 'pose'], ['F', 'sh', 'pose']] },
  { grid: [4, 3], smallGrid: [3, 4], order: 'ABCDEFBDFACE',
    pairs: [['A', 'fg', 'shadow'], ['B', 'sf', 'shadow'], ['C', 'ms', 'shadow'], ['D', 'bz', 'pose'], ['E', 'wl', 'pose'], ['F', 'sh', 'pose']] },
  { grid: [4, 4], smallGrid: [4, 4], order: 'ABCDEFGHCEGAHFDB',
    pairs: [['A', 'cl', 'icon'], ['B', 'mn', 'icon'], ['C', 'lf', 'shadow'], ['D', 'sf', 'shadow'], ['E', 'ms', 'shadow'], ['F', 'fx', 'pose'], ['G', 'bz', 'pose'], ['H', 'wl', 'pose']] },
];

/* ======================================================================== *
 * 2. Debug / verification hook (no behavioural effect)
 * ======================================================================== */

const eventLog = [];
function log(kind, key, extra) {
  const entry = { t: Math.round(performance.now()), kind, key };
  if (extra) Object.assign(entry, extra);
  eventLog.push(entry);
  if (eventLog.length > 400) eventLog.shift();
}

/* ======================================================================== *
 * 3. DOM refs + layout
 * ======================================================================== */

const $ = (id) => document.getElementById(id);
const app = $('app');
const board = $('board');
const playfield = $('playfield');
const promptCard = $('promptCard');
const pipRow = $('pipRow');
const homeBtn = $('homeBtn');
const playBtn = $('playBtn');
const replayBtn = $('replayBtn');
const logoBtn = $('logoBtn');
const titleScreen = $('titleScreen');
const completeScreen = $('completeScreen');
const confettiLayer = $('confettiLayer');
const holdRingFill = $('holdRingFill');
const holdCheck = $('holdCheck');

const layoutNumbers = { W: 0, H: 0, topBar: 144, gap: 16, card: 140, columns: 3, rows: 2, playW: 960, playH: 600, prompt: 140, pip: 10, pipGap: 5 };

function computeLayout(columns, rows) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const wide = W >= 480;
  const topBar = wide ? 144 : 104;
  const gap = W >= 768 ? 16 : (wide ? 12 : 8);
  const playW = wide ? Math.min(960, W - 48) : W - 32;
  const playH = H - topBar - 24;
  const raw = Math.min((playW - (columns - 1) * gap) / columns, (playH - (rows - 1) * gap) / rows);
  const card = Math.max(64, Math.min(140, raw));
  const prompt = wide ? 140 : 96;
  const pip = wide ? 10 : 8;
  const pipGap = wide ? 5 : 4;

  Object.assign(layoutNumbers, { W, H, topBar, gap, card, columns, rows, playW, playH, prompt, pip, pipGap });

  app.style.setProperty('--topbar', topBar + 'px');
  app.style.setProperty('--home', '64px');
  app.style.setProperty('--prompt', prompt + 'px');
  app.style.setProperty('--pip', pip + 'px');
  app.style.setProperty('--pip-gap', pipGap + 'px');
  app.style.setProperty('--gap', gap + 'px');
  app.style.setProperty('--card', card + 'px');
  app.style.setProperty('--cols', columns);
  app.style.setProperty('--play-w', playW + 'px');
  app.style.setProperty('--play-h', Math.max(0, playH) + 'px');
}

/* ======================================================================== *
 * 4. Timer scheduler — wall-clock deadlines so throttled background
 *    timers fire once on visibility restore (R-013)
 * ======================================================================== */

let timerSeq = 0;
const timers = new Map();

function after(ms, fn, tag) {
  const id = ++timerSeq;
  timers.set(id, { id, tag: tag || '', deadline: performance.now() + ms, fn });
  return id;
}
function cancelTimer(id) { if (id != null) timers.delete(id); }
function cancelTag(tag) {
  for (const [id, t] of timers) if (t.tag === tag) timers.delete(id);
}
function timerTick() {
  const now = performance.now();
  for (const [id, t] of [...timers]) {
    if (now >= t.deadline) {
      timers.delete(id);
      try { t.fn(); } catch (err) { console.error(err); }
    }
  }
}
setInterval(timerTick, 25);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) recoverInput();   // a hidden tab can drop a pointer release
  else timerTick();
});

/* ======================================================================== *
 * 5. Audio — Web Audio sfx + speechSynthesis voice (FR-017)
 * ======================================================================== */

const audio = {
  unlocked: false,
  ctx: null,
  master: null,
  voiceOk: typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined',
  voiceSeq: 0,
  voice: null,
};

function unlockAudio() {
  if (audio.unlocked) return;
  audio.unlocked = true;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audio.ctx = Ctx ? new Ctx() : null;
    if (audio.ctx) {
      audio.master = audio.ctx.createGain();
      audio.master.gain.value = 0.9;
      audio.master.connect(audio.ctx.destination);
      if (audio.ctx.state === 'suspended') audio.ctx.resume().catch(() => {});
    }
  } catch (err) {
    audio.ctx = null;
    audio.master = null;
  }
  if (audio.voiceOk) {
    try {
      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices() || [];
        if (!voices.length) return;
        const en = voices.filter((v) => /^en/i.test(v.lang));
        const preferred = en.find((v) => /samantha|karen|zira|libby|sonia|google us english|female/i.test(v.name));
        audio.voice = preferred || en[0] || voices[0];
      };
      pickVoice();
      window.speechSynthesis.addEventListener('voiceschanged', pickVoice, { once: false });
    } catch (err) { /* keep going without a voice */ }
  }
  log('audio', 'unlocked');
}

function blip(opts) {
  if (!audio.ctx || !audio.master) return;
  try {
    const t0 = audio.ctx.currentTime + (opts.at || 0);
    const osc = audio.ctx.createOscillator();
    const gain = audio.ctx.createGain();
    const peak = Math.max(0.001, (opts.gain ?? 0.3) * (opts.volume ?? 1));
    osc.type = opts.type || 'sine';
    osc.frequency.setValueAtTime(opts.freq, t0);
    if (opts.glideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(30, opts.glideTo), t0 + opts.dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.linearRampToValueAtTime(peak, t0 + (opts.attack ?? 0.008));
    gain.gain.exponentialRampToValueAtTime(0.0008, t0 + opts.dur);
    osc.connect(gain);
    gain.connect(audio.master);
    osc.start(t0);
    osc.stop(t0 + opts.dur + 0.05);
  } catch (err) { /* silent */ }
}

const SFX = {
  sfx_pick: (v) => blip({ type: 'triangle', freq: 780, glideTo: 540, dur: 0.10, gain: 0.30, attack: 0.004, volume: v }),
  sfx_pop: (v) => blip({ type: 'sine', freq: 300, glideTo: 900, dur: 0.15, gain: 0.36, attack: 0.006, volume: v }),
  sfx_soft_tap: (v) => blip({ type: 'sine', freq: 320, glideTo: 250, dur: 0.10, gain: 0.26, attack: 0.006, volume: v }),
  sfx_soft_buzz: (v) => blip({ type: 'sine', freq: 240, glideTo: 150, dur: 0.20, gain: 0.30, attack: 0.02, volume: v }),
  sfx_chime: (v) => [1046.5, 1318.5, 1568.0].forEach((f, i) => blip({ type: 'triangle', freq: f, dur: 0.55, gain: 0.20, attack: 0.004, at: i * 0.14, volume: v })),
  sfx_tap: (v) => blip({ type: 'triangle', freq: 1040, glideTo: 820, dur: 0.08, gain: 0.24, attack: 0.003, volume: v }),
};

function playSfx(key, volume) {
  log('sfx', key, { volume });
  if (!audio.ctx) return;
  try { (SFX[key] || (() => {}))(volume); } catch (err) { /* silent */ }
}

function say(key, text, volume) {
  log('voice', key, { volume, text });
  if (!audio.voiceOk) return;
  const seq = ++audio.voiceSeq;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.volume = Math.max(0, Math.min(1, volume));
    u.rate = 0.92;
    u.pitch = 1.08;
    u.lang = 'en-US';
    if (audio.voice) u.voice = audio.voice;
    requestAnimationFrame(() => {
      if (seq !== audio.voiceSeq) return;
      try { window.speechSynthesis.speak(u); } catch (err) { /* visual only */ }
    });
  } catch (err) { /* visual only */ }
}

/* ======================================================================== *
 * 6. Save (R-007): localStorage, in-memory fallback when blocked
 * ======================================================================== */

const storageOk = (() => {
  try {
    const k = '__pairup_probe__';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch (err) { return false; }
})();

let save = { highestUnlocked: 1, levelsCompleted: 0, updatedAt: null };

function readSave() {
  if (!storageOk) return;
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const hi = Number(parsed && parsed.highestUnlocked);
    const lc = Number(parsed && parsed.levelsCompleted);
    if (Number.isFinite(hi)) save.highestUnlocked = Math.min(TOTAL_LEVELS, Math.max(1, Math.round(hi)));
    if (Number.isFinite(lc)) save.levelsCompleted = Math.min(TOTAL_LEVELS, Math.max(0, Math.round(lc)));
    save.updatedAt = typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null;
  } catch (err) { /* corrupt or blocked -> defaults */ }
}

function writeSave() {
  if (!storageOk) return;
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch (err) { /* storage blocked mid-run: keep memory copy */ }
}

/* Save points: entering celebrating, entering complete, any HOME press.
 * Saved values never decrease (section 10). */
function saveProgress(completedLevel) {
  if (completedLevel) {
    save.highestUnlocked = Math.max(save.highestUnlocked, Math.min(TOTAL_LEVELS, completedLevel + 1));
    save.levelsCompleted = Math.max(save.levelsCompleted, Math.min(TOTAL_LEVELS, completedLevel));
  }
  save.updatedAt = new Date().toISOString();
  writeSave();
  log('save', 'write', { highestUnlocked: save.highestUnlocked, levelsCompleted: save.levelsCompleted });
}

function clearProgress() {
  save = { highestUnlocked: 1, levelsCompleted: 0, updatedAt: null };
  try { window.localStorage.removeItem(SAVE_KEY); } catch (err) { /* ignore */ }
  log('save', 'clear');
}

/* ======================================================================== *
 * 7. Level construction (Tables A + B, no runtime randomness)
 * ======================================================================== */

let cfg = null;

function buildLevel(n) {
  const def = LEVELS[n];
  const pairs = def.pairs.map(([pairId, token, variant]) => ({ pairId, token, variant }));
  const byId = new Map(pairs.map((p) => [p.pairId, p]));
  const cards = [...def.order].map((pairId, i) => {
    const p = byId.get(pairId);
    return { slot: i + 1, pairId, token: p.token, variant: p.variant };
  });
  return { level: n, pairs, cards, def };
}

function partnerOf(slot) {
  const me = cfg.cards[slot - 1];
  const other = cfg.cards.find((c) => c.pairId === me.pairId && c.slot !== slot);
  return other ? other.slot : null;
}

/* ======================================================================== *
 * 8. Session state
 * ======================================================================== */

const s = {
  state: 'loading',
  level: 1,
  matchedCount: 0,
  matchedSlots: new Set(),
  selectedSlot: null,
  anchorSlot: null,
  lastPickAt: -Infinity,
  lastMatchAt: -Infinity,
  enteredCompleteAt: -Infinity,
  idleTimer: null,
  teachingTimer: null,
  celebrationTimer: null,
  holdTimer: null,
  ringPulseTimer: null,
};

const activePointers = new Set();
const nowMs = () => performance.now();
const cardEl = (slot) => board.querySelector(`.card[data-slot="${slot}"]`);
const isPlayState = () => s.state === 'playing' || s.state === 'teaching';

/* ======================================================================== *
 * 9. Rendering
 * ======================================================================== */

function tokenSvg(token, variant) {
  const t = TOKENS[token];
  const shadow = variant === 'shadow';
  const shape = shadow ? t.shape.replace(/(fill|stroke)="(#[0-9A-Fa-f]{3,8})"/g, '$1="#3E2C1E"') : t.shape;
  const detail = shadow ? '' : t.detail;
  const mirror = variant === 'pose' ? ' transform="translate(256,0) scale(-1,1)"' : '';
  const dim = shadow ? ' opacity="0.85"' : '';
  return `<svg viewBox="0 0 256 256" aria-hidden="true" focusable="false"><g${mirror}${dim}>${shape}${detail}</g></svg>`;
}

function cardAccessibleName(card) {
  const name = TOKEN_NAMES[card.token];
  let phrase = name;
  if (card.variant === 'shadow') phrase = `shadow of ${/^[aeiou]/i.test(name) ? 'an' : 'a'} ${name}`;
  else if (card.variant === 'pose') phrase = `mirrored ${name}`;
  let stateWord = 'not matched';
  if (s.matchedSlots.has(card.slot)) stateWord = 'matched';
  else if (s.selectedSlot === card.slot) stateWord = 'selected';
  return `Card ${card.slot} of ${cfg.cards.length}, ${phrase}, ${stateWord}`;
}

function updateCardNames() {
  for (const card of cfg.cards) {
    const el = cardEl(card.slot);
    if (el) el.setAttribute('aria-label', cardAccessibleName(card));
  }
}

function renderBoard() {
  board.innerHTML = '';
  board.setAttribute('role', 'group');
  board.setAttribute('aria-label', `Card board, ${cfg.cards.length} cards, ${cfg.pairs.length} pairs`);
  reflow();
  for (const card of cfg.cards) {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.slot = String(card.slot);
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', cardAccessibleName(card));
    el.innerHTML = `
      <div class="card-inner">
        <div class="card-face"></div>
        <div class="glyph">${tokenSvg(card.token, card.variant)}</div>
        <div class="ring"></div>
        <div class="flash-white"></div>
        <div class="flash-coral"></div>
        <div class="halo"></div>
        <svg class="check" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><use href="#i-check"></use></svg>
      </div>`;
    board.appendChild(el);
  }
}

function renderPrompt() {
  pipRow.innerHTML = '';
  for (let i = 0; i < cfg.pairs.length; i++) {
    const pip = document.createElement('div');
    pip.className = 'pip';
    pip.innerHTML = '<div class="fill"></div>';
    pipRow.appendChild(pip);
  }
}

function reflow() {
  if (!cfg) return;
  const wide = window.innerWidth >= 480;
  const grid = wide ? cfg.def.grid : cfg.def.smallGrid;
  computeLayout(grid[0], grid[1]);
}

function clearBoard() {
  board.innerHTML = '';
  pipRow.innerHTML = '';
}

/* ======================================================================== *
 * 10. Effects (section 9 definitions; spec numbers)
 * ======================================================================== */

function popIn(el, delay) {
  el.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
    { duration: 150, delay: delay || 0, easing: 'cubic-bezier(.34,1.36,.64,1)', fill: 'backwards' });
}

function flash(el, selector, peak) {
  const node = el.querySelector(selector);
  if (!node) return;
  node.animate([
    { opacity: 0, offset: 0 },
    { opacity: peak, offset: 0.3333 },
    { opacity: 0, offset: 1 },
  ], { duration: 450, easing: 'linear' });
}

function wiggle(el) {
  const inner = el.querySelector('.card-inner');
  inner.animate([
    { transform: 'rotate(0deg)', offset: 0 },
    { transform: 'rotate(-6deg)', offset: 1 / 6 },
    { transform: 'rotate(6deg)', offset: 1 / 3 },
    { transform: 'rotate(0deg)', offset: 1 / 2 },
    { transform: 'rotate(-6deg)', offset: 2 / 3 },
    { transform: 'rotate(6deg)', offset: 5 / 6 },
    { transform: 'rotate(0deg)', offset: 1 },
  ], { duration: 300, easing: 'ease-in-out' });
}

function stampCheck(el) {
  const check = el.querySelector('.check');
  check.animate([
    { transform: 'scale(1.4) rotate(-10deg)', opacity: 0 },
    { transform: 'scale(1) rotate(0deg)', opacity: 1 },
  ], { duration: 200, easing: 'cubic-bezier(.2,.9,.3,1.15)', fill: 'forwards' });
}

function pulseCheck(el) {
  const check = el.querySelector('.check');
  check.animate([
    { transform: 'scale(1) rotate(0deg)' },
    { transform: 'scale(1.08) rotate(0deg)' },
    { transform: 'scale(1) rotate(0deg)' },
  ], { duration: 300, easing: 'ease-in-out' });
}

function ringPulse(el) {
  const ring = el.querySelector('.ring');
  ring.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.08)' },
    { transform: 'scale(1)' },
  ], { duration: 300, easing: 'ease-in-out' });
}

function fillPip(index) {
  const pip = pipRow.children[index - 1];
  if (!pip) return;
  const fill = pip.querySelector('.fill');
  fill.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
    { duration: 150, easing: 'cubic-bezier(.34,1.36,.64,1)', fill: 'forwards' });
}

const hintAnims = [];
function clearHints() {
  for (const a of hintAnims.splice(0)) { try { a.cancel(); } catch (err) { /* ignore */ } }
  for (const el of board.querySelectorAll('.halo')) el.classList.remove('on');
  cancelTag('hint');
}

function haloSlot(slot) {
  const el = cardEl(slot);
  if (!el) return;
  const halo = el.querySelector('.halo');
  halo.classList.add('on');
  const anim = halo.animate([
    { transform: 'scale(1)', opacity: 0.9 },
    { transform: 'scale(1.15)', opacity: 0.9 },
    { transform: 'scale(1)', opacity: 0.9 },
  ], { duration: 1000, iterations: 3, easing: 'ease-in-out' });
  hintAnims.push(anim);
  const done = () => {
    halo.classList.remove('on');
    const i = hintAnims.indexOf(anim);
    if (i >= 0) hintAnims.splice(i, 1);   // drop finished hints so the list cannot grow forever
  };
  anim.finished.then(done).catch(() => {});
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let confettiSeed = 1;
function confetti(count, duration) {
  log('effect', 'confetti', { count, duration });
  const rand = mulberry32(confettiSeed++);
  const colors = [PALETTE.teal, PALETTE.gold, PALETTE.coral];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.background = colors[i % colors.length];
    p.style.width = (7 + Math.round(rand() * 8)) + 'px';
    p.style.height = (11 + Math.round(rand() * 10)) + 'px';
    p.style.left = (rand() * 96) + '%';
    p.style.top = '-4%';
    confettiLayer.appendChild(p);
    const dx = (rand() - 0.5) * 200;
    const rot = 260 + rand() * 620;
    const drop = window.innerHeight * (0.85 + rand() * 0.2);
    const anim = p.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 0.95 },
      { transform: `translate(${dx}px, ${drop}px) rotate(${rot}deg)`, opacity: 0.9 },
    ], { duration: duration * (0.72 + rand() * 0.28), easing: 'cubic-bezier(.3,.55,.65,1)', fill: 'forwards' });
    anim.finished.then(() => p.remove()).catch(() => p.remove());
  }
}

function clearConfetti() {
  confettiLayer.innerHTML = '';
}

/* ======================================================================== *
 * 11. Screens / focus management
 * ======================================================================== */

function setState(next) {
  if (s.state === next) return;
  log('state', next, { level: s.level, matched: s.matchedCount });
  s.state = next;
  app.dataset.state = next;
  renderScreens();
}

function renderScreens() {
  const st = s.state;
  const cardsInteractive = st === 'playing' || st === 'teaching';
  const homeVisible = st === 'playing' || st === 'teaching' || st === 'celebrating' || st === 'complete';

  // Resolve where focus must go before hiding anything (hiding blurs synchronously).
  const active = document.activeElement;
  let nextFocus = null;
  if (active && active !== document.body) {
    const goesAway = (active === logoBtn && st !== 'title')
      || (active === playBtn && st !== 'title')
      || (active === replayBtn && st !== 'complete')
      || (active === homeBtn && !homeVisible)
      || (active.classList && active.classList.contains('card') && !cardsInteractive);
    if (goesAway) {
      nextFocus = homeVisible ? homeBtn
        : st === 'title' ? logoBtn
          : st === 'complete' ? replayBtn : null;
    }
    if (goesAway && !nextFocus) active.blur();
  }

  titleScreen.hidden = st !== 'title';
  completeScreen.hidden = st !== 'complete';
  promptCard.hidden = !(st === 'playing' || st === 'teaching' || st === 'celebrating');
  homeBtn.hidden = !homeVisible;
  playfield.hidden = !(st === 'playing' || st === 'teaching' || st === 'celebrating');

  logoBtn.setAttribute('tabindex', st === 'title' ? '0' : '-1');
  playBtn.setAttribute('tabindex', st === 'title' ? '0' : '-1');
  replayBtn.setAttribute('tabindex', st === 'complete' ? '0' : '-1');
  homeBtn.setAttribute('tabindex', homeVisible ? '0' : '-1');

  for (const el of board.querySelectorAll('.card')) {
    el.classList.toggle('board-frozen', !cardsInteractive);
    el.setAttribute('tabindex', cardsInteractive ? '0' : '-1');
  }

  if (nextFocus) nextFocus.focus();
  if (st !== 'playing' && st !== 'teaching') clearHints();
}

/* ======================================================================== *
 * 12. Idle hint (FR-011)
 * ======================================================================== */

function resetIdle() {
  cancelTimer(s.idleTimer);
  s.idleTimer = after(T_IDLE, idleFired, 'idle');
}

function idleFired() {
  resetIdle();   // "the hint repeats every 12 s of continued idleness"
  if (s.state === 'title') {
    log('hint', 'title');
    pulseControl(playBtn, 3);
    return;
  }
  if (s.state === 'complete') {
    log('hint', 'complete');
    pulseControl(replayBtn, 3);
    say('vo_complete', VOICE.complete, 0.9);
    return;
  }
  if (s.state === 'playing' || s.state === 'teaching') {
    const targets = hintTargets();
    log('hint', 'board', { targets });
    for (const slot of targets) haloSlot(slot);
    say('vo_target', VOICE.target, 0.9);
  }
}

function hintTargets() {
  const selected = s.state === 'teaching' ? s.anchorSlot : s.selectedSlot;
  if (selected != null) {
    const p = partnerOf(selected);
    return p != null ? [p] : [];
  }
  const first = cfg.cards.find((c) => !s.matchedSlots.has(c.slot));
  if (!first) return [];
  const p = partnerOf(first.slot);
  return p != null ? [first.slot, p] : [first.slot];
}

function pulseControl(el, count) {
  const anim = el.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.08)' },
    { transform: 'scale(1)' },
  ], { duration: 1000, iterations: count, easing: 'ease-in-out' });
  hintAnims.push(anim);
  anim.finished.then(() => {
    const i = hintAnims.indexOf(anim);
    if (i >= 0) hintAnims.splice(i, 1);
  }).catch(() => {});
}

/* ======================================================================== *
 * 13. State transitions
 * ======================================================================== */

function showTitle() {
  endLogoHold();                // leaving title always cancels a pending reset hold (FR-016)
  cancelTag('idle'); cancelTag('teaching'); cancelTag('celebration'); cancelTag('ringPulse');
  s.selectedSlot = null; s.anchorSlot = null;
  clearHints();
  clearConfetti();
  setState('title');
  resetIdle();
}

function startLevel(n) {
  endLogoHold();                // leaving title always cancels a pending reset hold (FR-016)
  s.level = n;
  s.matchedCount = 0;
  s.matchedSlots.clear();
  s.selectedSlot = null;
  s.anchorSlot = null;
  s.lastPickAt = -Infinity;
  s.lastMatchAt = -Infinity;
  cfg = buildLevel(n);
  cancelTag('teaching'); cancelTag('celebration'); cancelTag('ringPulse');
  clearHints();
  clearConfetti();
  renderBoard();
  renderPrompt();
  setState('playing');
  updateCardNames();
  popIn(promptCard, 0);
  [...board.querySelectorAll('.card')].forEach((el, i) => popIn(el.querySelector('.card-inner'), i * 50));
  say('vo_target', VOICE.target, 1.0);
  resetIdle();
  log('level', 'start', { level: n, cards: cfg.cards.length, pairs: cfg.pairs.length });
}

function selectCard(slot) {
  s.selectedSlot = slot;
  const el = cardEl(slot);
  if (el) el.classList.add('selected');
  playSfx('sfx_pick', 0.6);
  updateCardNames();
  log('select', 'card', { slot });
}

function deselectCard() {
  const slot = s.selectedSlot;
  s.selectedSlot = null;
  const el = slot != null ? cardEl(slot) : null;
  if (el) el.classList.remove('selected');
  playSfx('sfx_soft_tap', 0.5);
  updateCardNames();
  log('deselect', 'card', { slot });
}

function matchPair(a, b) {
  s.matchedSlots.add(a);
  s.matchedSlots.add(b);
  s.matchedCount++;
  s.selectedSlot = null;
  s.anchorSlot = null;
  s.lastMatchAt = nowMs();
  for (const slot of [a, b]) {
    const el = cardEl(slot);
    if (!el) continue;
    el.classList.remove('selected');
    el.classList.add('matched');
    flash(el, '.flash-white', 0.25);
    stampCheck(el);
  }
  fillPip(s.matchedCount);
  playSfx('sfx_pop', SFX_GAIN.sfx_pop);
  playSfx('sfx_chime', SFX_GAIN.sfx_chime);
  say('vo_match', VOICE.match, 1.0);
  updateCardNames();
  resetIdle();
  log('match', 'pair', { a, b, matched: s.matchedCount });
  if (s.matchedCount === cfg.pairs.length) enterCelebrating();
}

function enterTeaching(anchor, slot) {
  cancelTag('teaching'); cancelTag('ringPulse');
  const anchorEl = cardEl(anchor);
  const otherEl = cardEl(slot);
  if (otherEl) {
    wiggle(otherEl);
    flash(otherEl, '.flash-coral', 0.7);
  }
  if (anchorEl) {
    wiggle(anchorEl);
    flash(anchorEl, '.flash-coral', 0.7);
  }
  s.anchorSlot = anchor;
  s.selectedSlot = anchor;
  setState('teaching');
  s.ringPulseTimer = after(600, () => {
    if (s.state === 'teaching' && s.anchorSlot === anchor && anchorEl) ringPulse(anchorEl);
  }, 'ringPulse');
  s.teachingTimer = after(T_TEACHING, () => {
    s.anchorSlot = null;
    setState('playing');
  }, 'teaching');
  playSfx('sfx_soft_buzz', SFX_GAIN.sfx_soft_buzz);
  say('vo_mismatch', VOICE.mismatch, 0.9);
  updateCardNames();
  log('teaching', 'start', { anchor, other: slot });
}

function cancelTeaching() {
  cancelTag('teaching');
  cancelTag('ringPulse');
  s.anchorSlot = null;
}

function enterCelebrating() {
  cancelTag('idle'); cancelTag('ringPulse');
  s.selectedSlot = null;
  s.anchorSlot = null;
  setState('celebrating');
  updateCardNames();
  saveProgress(s.level);
  confetti(40, 600);
  for (const slot of s.matchedSlots) {
    const el = cardEl(slot);
    if (el) pulseCheck(el);
  }
  playSfx('sfx_chime', SFX_GAIN.sfx_chime);
  say('vo_praise', VOICE.praise, 1.0);
  log('celebrating', 'start', { level: s.level });
  s.celebrationTimer = after(T_CELEBRATION, () => {
    if (s.level < TOTAL_LEVELS) startLevel(s.level + 1);
    else enterComplete();
  }, 'celebration');
}

function enterComplete() {
  cancelTag('idle'); cancelTag('celebration');
  setState('complete');
  s.enteredCompleteAt = nowMs();
  saveProgress(TOTAL_LEVELS);
  confetti(60, 900);
  playSfx('sfx_chime', SFX_GAIN.sfx_chime);
  say('vo_complete', VOICE.complete, 1.0);
  resetIdle();
  log('complete', 'enter');
}

function goHome() {
  if (s.state === 'loading' || s.state === 'title') return;
  cancelTag('idle'); cancelTag('teaching'); cancelTag('celebration'); cancelTag('ringPulse');
  saveProgress(null);
  s.selectedSlot = null;
  s.anchorSlot = null;
  clearBoard();
  showTitle();
  log('home', 'press');
}

/* ======================================================================== *
 * 14. Input
 * ======================================================================== */

function cardHitAt(x, y) {
  let best = null;
  for (const el of board.querySelectorAll('.card')) {
    const r = el.getBoundingClientRect();
    if (x < r.left - TAP_SLOP || x > r.right + TAP_SLOP || y < r.top - TAP_SLOP || y > r.bottom + TAP_SLOP) continue;
    const slot = Number(el.dataset.slot);
    const dx = x - (r.left + r.width / 2);
    const dy = y - (r.top + r.height / 2);
    const d = dx * dx + dy * dy;
    if (!best || d < best.d - 0.001 || (Math.abs(d - best.d) <= 0.001 && slot < best.slot)) best = { slot, d };
  }
  return best ? best.slot : null;
}

function processCardTap(slot) {
  if (!isPlayState()) return;
  const now = nowMs();
  if (now - s.lastPickAt < T_PICK) return;          // pick throttle
  if (now - s.lastMatchAt < T_FLOURISH) return;     // match flourish lockout
  const el = cardEl(slot);
  if (!el) return;

  if (s.matchedSlots.has(slot)) {                   // FR-008
    pulseCheck(el);
    playSfx('sfx_soft_tap', 0.4);
    s.lastPickAt = now;
    log('tap', 'matched', { slot });
    return;
  }

  if (s.state === 'teaching') {                     // FR-007
    if (slot === s.anchorSlot) {
      cancelTeaching();
      deselectCard();
      setState('playing');
    } else if (slot === partnerOf(s.anchorSlot)) {
      const anchor = s.anchorSlot;
      cancelTeaching();
      setState('playing');
      matchPair(anchor, slot);
    } else {
      enterTeaching(s.anchorSlot, slot);
    }
  } else if (s.selectedSlot == null) {              // FR-003
    selectCard(slot);
  } else if (s.selectedSlot === slot) {             // FR-004
    deselectCard();
  } else if (slot === partnerOf(s.selectedSlot)) {  // FR-005
    matchPair(s.selectedSlot, slot);
  } else {                                          // FR-006
    enterTeaching(s.selectedSlot, slot);
  }
  s.lastPickAt = now;
}

function pressControl(el) {
  el.classList.add('pressed');
  after(140, () => el.classList.remove('pressed'), 'press');
  el.animate([{ transform: 'scale(0.95)' }, { transform: 'scale(1)' }], { duration: 80, easing: 'ease-out' });
  if (el === logoBtn) return;                       // logo acts only on the 3 s hold
  playSfx('sfx_tap', SFX_GAIN.sfx_tap);
  if (el === playBtn) startLevel(save.highestUnlocked);
  else if (el === replayBtn) {
    if (nowMs() - s.enteredCompleteAt >= T_REPLAY) startLevel(1);
  } else if (el === homeBtn) goHome();
}

function onPointerDown(e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  resetIdle();
  unlockAudio();
  const first = activePointers.size === 0;
  activePointers.add(e.pointerId);
  if (!first) return;                               // first-pointer-wins

  const btn = e.target.closest ? e.target.closest('button') : null;
  if (btn) {
    if (btn === logoBtn) {
      // capture so the release is delivered even if the pointer leaves the button/window
      try { btn.setPointerCapture(e.pointerId); } catch (err) { /* window listeners still catch it */ }
      beginLogoHold();
    } else pressControl(btn);
    return;
  }
  if (!isPlayState()) return;                       // empty tap elsewhere: idle only
  const slot = cardHitAt(e.clientX, e.clientY);
  if (slot != null) processCardTap(slot);
  // no card -> empty tap (FR-009): idle timer already reset
}

function onPointerRelease(e) {
  activePointers.delete(e.pointerId);
  if (logoHold.active) endLogoHold();   // releasing early cancels the reset ring (FR-016)
}

/* A window blur / hidden tab can swallow a pointer release (R-002/FR-010):
 * recover so first-pointer-wins does not lock up until reload. */
function recoverInput() {
  activePointers.clear();
  endLogoHold();
}

function onKeyDown(e) {
  const isActivate = e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar';
  resetIdle();
  unlockAudio();
  if (!isActivate) return;
  const el = document.activeElement;
  if (!el) return;
  if (el === logoBtn) {
    e.preventDefault();
    if (!e.repeat && !logoHold.active) beginLogoHold();
    return;
  }
  if (el.classList && el.classList.contains('card')) {
    e.preventDefault();
    if (!e.repeat) processCardTap(Number(el.dataset.slot));
    return;
  }
  if (el === homeBtn || el === playBtn || el === replayBtn) {
    e.preventDefault();
    if (!e.repeat) pressControl(el);
  }
}

function onKeyUp(e) {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
    // release cancels the hold wherever focus moved (FR-016: releasing early cancels)
    if (logoHold.active) endLogoHold();
  }
}

function onClick(e) {
  if (e.detail !== 0) return;                       // AT / keyboard-generated only
  resetIdle();
  unlockAudio();
  const el = e.target;
  const btn = el.closest ? el.closest('button') : null;
  if (btn && btn !== logoBtn) { pressControl(btn); return; }
  const cardEl2 = el.closest ? el.closest('.card') : null;
  if (cardEl2 && isPlayState()) processCardTap(Number(cardEl2.dataset.slot));
}

/* ---- 3 s reset hold (FR-016) ---- */
const logoHold = { active: false, anim: null };

function beginLogoHold() {
  if (s.state !== 'title' || logoHold.active) return;
  logoHold.active = true;
  holdRingFill.classList.add('holding');
  holdRingFill.style.strokeDashoffset = '';
  logoHold.anim = holdRingFill.animate([
    { strokeDashoffset: 339.3 },
    { strokeDashoffset: 0 },
  ], { duration: T_HOLD, easing: 'linear', fill: 'forwards' });
  log('hold', 'begin');
  s.holdTimer = after(T_HOLD, completeHold, 'hold');
}

function endLogoHold() {
  if (!logoHold.active) return;
  logoHold.active = false;
  cancelTimer(s.holdTimer);
  s.holdTimer = null;
  if (logoHold.anim) { try { logoHold.anim.cancel(); } catch (err) { /* ignore */ } logoHold.anim = null; }
  holdRingFill.classList.remove('holding');
  holdRingFill.style.strokeDashoffset = '';
  log('hold', 'cancel');
}

function completeHold() {
  // Only a genuinely active hold on the title screen may reset progress.
  if (!logoHold.active || s.state !== 'title') { endLogoHold(); return; }
  logoHold.active = false;
  s.holdTimer = null;
  if (logoHold.anim) { try { logoHold.anim.finish(); } catch (err) { /* ignore */ } logoHold.anim = null; }
  holdRingFill.classList.remove('holding');
  clearProgress();
  log('hold', 'complete');
  playSfx('sfx_soft_tap', 0.7);
  holdCheck.animate([
    { opacity: 0, transform: 'scale(0.6)', offset: 0 },
    { opacity: 1, transform: 'scale(1)', offset: 0.1667 },
    { opacity: 1, transform: 'scale(1)', offset: 0.8333 },
    { opacity: 0, transform: 'scale(1)', offset: 1 },
  ], { duration: 1200, easing: 'ease-out' });
}

/* ======================================================================== *
 * 15. Wiring + boot
 * ======================================================================== */

window.addEventListener('pointerdown', onPointerDown, true);
window.addEventListener('pointerup', onPointerRelease, true);
window.addEventListener('pointercancel', onPointerRelease, true);
window.addEventListener('keydown', onKeyDown, true);
window.addEventListener('keyup', onKeyUp, true);
window.addEventListener('click', onClick, true);
window.addEventListener('blur', recoverInput);
window.addEventListener('contextmenu', (e) => e.preventDefault());
window.addEventListener('dragstart', (e) => e.preventDefault());

let reflowQueued = false;
function onResize() {
  if (reflowQueued) return;
  reflowQueued = true;
  requestAnimationFrame(() => {
    reflowQueued = false;
    reflow();
    log('layout', 'reflow', { ...layoutNumbers });
  });
}
window.addEventListener('resize', onResize);
window.addEventListener('orientationchange', onResize);

readSave();
renderScreens();
requestAnimationFrame(() => {
  requestAnimationFrame(() => showTitle());
});

/* Verification hook — read-only introspection, no behaviour change. */
window.__pairUp = {
  getState: () => s.state,
  getSession: () => ({
    state: s.state, level: s.level, matchedCount: s.matchedCount,
    matchedSlots: [...s.matchedSlots], selectedSlot: s.selectedSlot, anchorSlot: s.anchorSlot,
    lastPickAt: s.lastPickAt, lastMatchAt: s.lastMatchAt, enteredCompleteAt: s.enteredCompleteAt,
  }),
  getSave: () => ({ ...save, storageOk }),
  getLayout: () => ({ ...layoutNumbers }),
  getLevel: () => (cfg ? {
    level: cfg.level,
    pairs: cfg.pairs.map((p) => ({ ...p })),
    cards: cfg.cards.map((c) => ({ ...c })),
    grid: [...cfg.def.grid],
    smallGrid: [...cfg.def.smallGrid],
  } : null),
  getBoard: () => [...board.querySelectorAll('.card')].map((el) => ({
    slot: Number(el.dataset.slot),
    label: el.getAttribute('aria-label'),
    classes: el.className,
    tabindex: el.getAttribute('tabindex'),
    opacity: getComputedStyle(el.querySelector('.card-inner')).opacity,
    innerTransform: getComputedStyle(el.querySelector('.card-inner')).transform,
    lift: getComputedStyle(el).transform,
    ringOpacity: getComputedStyle(el.querySelector('.ring')).opacity,
    ringTransform: getComputedStyle(el.querySelector('.ring')).transform,
    checkOpacity: getComputedStyle(el.querySelector('.check')).opacity,
    checkTransform: getComputedStyle(el.querySelector('.check')).transform,
    haloOpacity: getComputedStyle(el.querySelector('.halo')).opacity,
    whiteFlash: getComputedStyle(el.querySelector('.flash-white')).opacity,
    coralFlash: getComputedStyle(el.querySelector('.flash-coral')).opacity,
    rect: (() => { const r = el.getBoundingClientRect(); return { left: r.left, top: r.top, w: r.width, h: r.height }; })(),
  })),
  getPips: () => [...pipRow.children].map((p) => getComputedStyle(p.querySelector('.fill')).transform),
  getControls: () => ({
    home: { hidden: homeBtn.hidden, tabindex: homeBtn.getAttribute('tabindex') },
    play: { hidden: playBtn.hidden, tabindex: playBtn.getAttribute('tabindex'), label: playBtn.getAttribute('aria-label') },
    replay: { hidden: replayBtn.hidden, tabindex: replayBtn.getAttribute('tabindex'), label: replayBtn.getAttribute('aria-label') },
    logo: { hidden: logoBtn.hidden, tabindex: logoBtn.getAttribute('tabindex'), label: logoBtn.getAttribute('aria-label') },
    prompt: { hidden: promptCard.hidden },
    titleHidden: titleScreen.hidden, completeHidden: completeScreen.hidden,
    boardLabel: board.getAttribute('aria-label'),
    holdRing: getComputedStyle(holdRingFill).strokeDashoffset,
    holdRingVisible: holdRingFill.classList.contains('holding'),
    checkVisible: getComputedStyle(holdCheck).opacity,
  }),
  getVisibleText: () => document.body.innerText.trim(),
  getCounts: () => ({
    particles: confettiLayer.children.length,
    halos: [...board.querySelectorAll('.halo.on')].map((h) => Number(h.closest('.card').dataset.slot)),
  }),
  idleInfo: () => [...timers.values()].filter((t) => t.tag === 'idle').map((t) => Math.round(t.deadline - performance.now())),
  log: (since = 0) => eventLog.filter((e) => e.t >= since),
  clearLog: () => { eventLog.length = 0; },
  voiceState: () => ({
    supported: audio.voiceOk,
    unlocked: audio.unlocked,
    speaking: audio.voiceOk ? window.speechSynthesis.speaking : false,
    pending: audio.voiceOk ? window.speechSynthesis.pending : false,
    ctxState: audio.ctx ? audio.ctx.state : null,
  }),
};
