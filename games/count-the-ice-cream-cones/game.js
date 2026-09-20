(() => {
  'use strict';

  const SAVE_KEY = 'spec.iceCream.v1';
  const TOTAL_LEVELS = 8;
  const SCOOP_COLORS = ['#F7A8B8', '#FFF3D6', '#8B5E3C', '#B7E4C7'];
  const NUMBER_WORDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  const INSTRUCTION = 'Tap each cone to count.';
  const COMPLETE_LINE = 'Amazing! You counted all the way to eight!';
  const IDLE_MS = 12000;
  const CELEBRATION_MS = 2500;
  const HIT_TOLERANCE = 12;
  const WRAP_SLOT = 96;
  const MIN_CONE = 64;
  const MAX_CONE = 120;
  const BASE_GAP = 12;
  const CONFETTI_MAX = 90;

  const els = {
    body: document.body,
    logo: document.getElementById('logo'),
    play: document.getElementById('play'),
    homePlay: document.getElementById('home-play'),
    homeComplete: document.getElementById('home-complete'),
    replay: document.getElementById('replay'),
    field: document.getElementById('field'),
    confetti: document.getElementById('confetti'),
  };

  const confettiCtx = els.confetti ? els.confetti.getContext('2d') : null;

  const state = {
    phase: 'loading',
    level: 1,
    count: 0,
    highestUnlocked: 1,
    levelsCompleted: 0,
    cones: [],
    hintEl: null,
  };

  let idleTimer = null;
  let celebrateTimer = null;
  let holdTimer = null;
  let resizeRaf = null;
  let tapQueue = [];
  let tapRaf = null;
  let particles = [];
  let confettiRaf = null;
  let lastConfettiFrame = 0;
  let audioCtx = null;
  let speechOk = typeof window.speechSynthesis !== 'undefined';
  const lastKeyActivation = new WeakMap();

  const clamp = (value, lo, hi) => Math.max(lo, Math.min(hi, value));

  function setPhase(phase) {
    state.phase = phase;
    els.body.dataset.state = phase;
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return;
      const highest = Number(data.highestUnlocked);
      const completed = Number(data.levelsCompleted);
      if (Number.isFinite(highest)) state.highestUnlocked = clamp(Math.round(highest), 1, TOTAL_LEVELS);
      if (Number.isFinite(completed)) state.levelsCompleted = clamp(Math.round(completed), 0, TOTAL_LEVELS);
    } catch (err) {
      return;
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        highestUnlocked: state.highestUnlocked,
        levelsCompleted: state.levelsCompleted,
        updatedAt: new Date().toISOString(),
      }));
    } catch (err) {
      return;
    }
  }

  function clearProgress() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (err) {
      return;
    }
    state.highestUnlocked = 1;
    state.levelsCompleted = 0;
  }

  function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        try {
          audioCtx = new AC();
        } catch (err) {
          audioCtx = null;
        }
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  }

  function tone(options) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime + (options.delay || 0);
    const duration = options.duration || 0.1;
    const peak = options.gain == null ? 0.2 : options.gain;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = options.type || 'sine';
    osc.frequency.setValueAtTime(options.frequency || 440, now);
    if (options.endFrequency) {
      osc.frequency.exponentialRampToValueAtTime(options.endFrequency, now + duration);
    }
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + Math.min(0.02, duration * 0.3));
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  const sfx = {
    pop() {
      tone({ frequency: 300, endFrequency: 900, type: 'sine', duration: 0.15, gain: 0.28 });
    },
    softTap() {
      tone({ frequency: 260, endFrequency: 200, type: 'sine', duration: 0.1, gain: 0.07 });
    },
    tap() {
      tone({ frequency: 520, endFrequency: 700, type: 'triangle', duration: 0.08, gain: 0.16 });
    },
    chime() {
      [523.25, 659.25, 783.99].forEach((frequency, index) => {
        tone({ frequency, type: 'triangle', duration: 0.35, gain: 0.16, delay: index * 0.12 });
      });
    },
  };

  function speak(text, options) {
    const opts = options || {};
    if (!speechOk || typeof window.SpeechSynthesisUtterance === 'undefined') return;
    try {
      if (opts.interrupt) window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.15;
      utterance.volume = opts.soft ? 0.7 : 1;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      speechOk = false;
    }
  }

  function speakNumber(number, soft) {
    speak(NUMBER_WORDS[number - 1], { interrupt: true, soft });
  }

  function praiseText(number) {
    return 'You counted ' + number + (number === 1 ? ' cone!' : ' cones!');
  }

  function measureAvailableWidth() {
    return Math.max(0, els.field.clientWidth - 48);
  }

  function rowPlan(n, available, gap) {
    if (n <= 3) return [n];
    const single = (available - (n - 1) * gap) / n;
    if (single >= WRAP_SLOT) return [n];
    const first = Math.min(4, Math.ceil(n / 2));
    return [first, n - first];
  }

  function arrangeRows(rows) {
    const existing = Array.from(els.field.querySelectorAll('.row'));
    const rowEls = rows.map((size, index) => existing[index] || document.createElement('div'));
    existing.forEach((row, index) => {
      if (index >= rows.length) row.remove();
    });
    rowEls.forEach((row) => {
      if (row.parentElement !== els.field) els.field.appendChild(row);
    });
    let cursor = 0;
    rows.forEach((size, rowIndex) => {
      const row = rowEls[rowIndex];
      row.className = 'row';
      for (let i = 0; i < size; i += 1) {
        row.appendChild(state.cones[cursor].el);
        cursor += 1;
      }
    });
  }

  function layout() {
    const n = state.level;
    const available = measureAvailableWidth();
    const slotFor = (plan, gap) => Math.min.apply(null, plan.map((size) => (available - (size - 1) * gap) / size));
    let gap = BASE_GAP;
    let rows = rowPlan(n, available, gap);
    let slot = slotFor(rows, gap);
    if (slot < MIN_CONE) {
      gap = 4;
      rows = rowPlan(n, available, gap);
      slot = slotFor(rows, gap);
    }
    const coneWidth = clamp(Math.floor(slot), 56, MAX_CONE);
    const badgeFont = clamp(Math.floor(slot), 40, 96);
    els.field.style.setProperty('--gap', gap + 'px');
    els.field.style.setProperty('--cone-w', coneWidth + 'px');
    els.field.style.setProperty('--badge-font', badgeFont + 'px');
    arrangeRows(rows);
  }

  function buildCones(n) {
    els.field.innerHTML = '';
    state.cones = [];
    for (let i = 0; i < n; i += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cone';
      button.dataset.index = String(i);
      button.style.setProperty('--scoop', SCOOP_COLORS[i % SCOOP_COLORS.length]);
      button.setAttribute('aria-label', 'Cone ' + (i + 1));
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.setAttribute('aria-hidden', 'true');
      const art = document.createElement('span');
      art.className = 'art';
      art.innerHTML = '<svg class="scoop-svg" viewBox="0 0 120 115" aria-hidden="true"><use href="#sym-scoop"></use></svg>'
        + '<svg class="cone-svg" viewBox="0 0 120 85" aria-hidden="true"><use href="#sym-cone"></use></svg>';
      button.appendChild(badge);
      button.appendChild(art);
      button.addEventListener('keydown', onConeKeyDown);
      button.addEventListener('click', onConeClick);
      state.cones.push({ el: button, badge, count: null });
    }
    layout();
  }

  function nearestCone(x, y) {
    let best = null;
    state.cones.forEach((cone, index) => {
      const rect = cone.el.getBoundingClientRect();
      const dx = Math.max(rect.left - x, 0, x - rect.right);
      const dy = Math.max(rect.top - y, 0, y - rect.bottom);
      const distance = Math.hypot(dx, dy);
      if (distance > HIT_TOLERANCE) return;
      const better = !best
        || distance < best.distance - 0.001
        || (Math.abs(distance - best.distance) <= 0.001 && rect.left < best.left);
      if (better) best = { index, distance, left: rect.left };
    });
    return best ? best.index : null;
  }

  function enqueueTap(index, x, time) {
    tapQueue.push({ index, x, time });
    if (tapRaf == null) tapRaf = requestAnimationFrame(flushTaps);
  }

  function flushTaps() {
    tapRaf = null;
    const queue = tapQueue.sort((a, b) => (a.time - b.time) || (a.x - b.x));
    tapQueue = [];
    queue.forEach((tap) => handleTap(tap.index));
  }

  function onFieldPointerDown(event) {
    if (state.phase !== 'playing') return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const coneEl = event.target.closest ? event.target.closest('.cone') : null;
    let index = null;
    if (coneEl && els.field.contains(coneEl)) {
      index = Number(coneEl.dataset.index);
    } else {
      index = nearestCone(event.clientX, event.clientY);
    }
    enqueueTap(index, event.clientX, event.timeStamp || performance.now());
  }

  function onConeKeyDown(event) {
    if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
    if (state.phase !== 'playing') return;
    event.preventDefault();
    const button = event.currentTarget;
    lastKeyActivation.set(button, performance.now());
    enqueueTap(Number(button.dataset.index), button.getBoundingClientRect().left, event.timeStamp || performance.now());
  }

  function onConeClick(event) {
    if (event.detail > 0) return;
    if (state.phase !== 'playing') return;
    const button = event.currentTarget;
    if (performance.now() - (lastKeyActivation.get(button) || 0) < 600) return;
    lastKeyActivation.set(button, performance.now());
    enqueueTap(Number(button.dataset.index), button.getBoundingClientRect().left, event.timeStamp || performance.now());
  }

  function handleTap(index) {
    if (state.phase !== 'playing') return;
    markActivity();
    if (index == null) return;
    const cone = state.cones[index];
    if (!cone) return;
    if (cone.count == null) {
      state.count += 1;
      cone.count = state.count;
      showBadge(cone);
      sfx.pop();
      speakNumber(cone.count, false);
      bounce(cone.el);
      if (state.count >= state.level) finishLevel();
    } else {
      pulse(cone.badge);
      speakNumber(cone.count, true);
    }
  }

  function showBadge(cone) {
    cone.badge.textContent = String(cone.count);
    cone.badge.classList.remove('show', 'pulse');
    void cone.badge.offsetWidth;
    cone.badge.classList.add('show');
  }

  function pulse(badge) {
    badge.classList.remove('pulse');
    void badge.offsetWidth;
    badge.classList.add('pulse');
    window.setTimeout(() => badge.classList.remove('pulse'), 140);
  }

  function bounce(el) {
    el.classList.remove('bounce');
    void el.offsetWidth;
    el.classList.add('bounce');
    window.setTimeout(() => el.classList.remove('bounce'), 140);
  }

  function finishLevel() {
    const n = state.level;
    state.levelsCompleted = Math.max(state.levelsCompleted, n);
    state.highestUnlocked = clamp(Math.max(state.highestUnlocked, n + 1), 1, TOTAL_LEVELS);
    saveProgress();
    enterCelebration(n);
  }

  function enterCelebration(n) {
    stopIdle();
    hideHint();
    setPhase('celebrating');
    els.field.classList.add('celebrating');
    burstConfetti(40, false);
    sfx.chime();
    speak(praiseText(n), { interrupt: true });
    celebrateTimer = window.setTimeout(() => {
      celebrateTimer = null;
      if (state.phase !== 'celebrating') return;
      els.field.classList.remove('celebrating');
      if (n < TOTAL_LEVELS) startLevel(n + 1);
      else showComplete();
    }, CELEBRATION_MS);
  }

  function showComplete() {
    stopIdle();
    hideHint();
    saveProgress();
    setPhase('complete');
    burstConfetti(60, true);
    sfx.chime();
    speak(COMPLETE_LINE, { interrupt: true });
  }

  function startLevel(n) {
    stopIdle();
    hideHint();
    state.level = n;
    state.count = 0;
    els.field.classList.remove('celebrating');
    setPhase('playing');
    buildCones(n);
    startIdle();
  }

  function onPlay() {
    ensureAudio();
    sfx.tap();
    startLevel(state.highestUnlocked);
    speak(INSTRUCTION, { interrupt: false });
  }

  function onReplay() {
    ensureAudio();
    sfx.tap();
    startLevel(1);
  }

  function goHome() {
    if (celebrateTimer != null) {
      clearTimeout(celebrateTimer);
      celebrateTimer = null;
    }
    stopIdle();
    hideHint();
    els.field.classList.remove('celebrating');
    saveProgress();
    setPhase('title');
  }

  function onHome() {
    ensureAudio();
    sfx.tap();
    goHome();
  }

  function startIdle() {
    stopIdle();
    idleTimer = window.setTimeout(idleFire, IDLE_MS);
  }

  function stopIdle() {
    if (idleTimer != null) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  function markActivity() {
    hideHint();
    if (state.phase === 'playing') startIdle();
  }

  function idleFire() {
    idleTimer = null;
    if (state.phase !== 'playing') return;
    const target = state.cones.find((cone) => cone.count == null);
    if (target) {
      showHint(target);
      speak(INSTRUCTION, { interrupt: true });
    }
    idleTimer = window.setTimeout(idleFire, IDLE_MS);
  }

  function showHint(cone) {
    hideHint();
    const arrow = document.createElement('span');
    arrow.className = 'hint-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true"><use href="#sym-arrow"></use></svg>';
    cone.el.appendChild(arrow);
    state.hintEl = arrow;
  }

  function hideHint() {
    if (state.hintEl && state.hintEl.parentElement) state.hintEl.remove();
    state.hintEl = null;
  }

  function sizeConfetti() {
    if (!confettiCtx) return;
    const dpr = window.devicePixelRatio || 1;
    els.confetti.width = Math.floor(window.innerWidth * dpr);
    els.confetti.height = Math.floor(window.innerHeight * dpr);
    els.confetti.style.width = window.innerWidth + 'px';
    els.confetti.style.height = window.innerHeight + 'px';
    confettiCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function burstConfetti(count, fullScreen) {
    if (!confettiCtx) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const colors = ['#F7A8B8', '#FFF3D6', '#8B5E3C', '#B7E4C7', '#F4A261', '#7BC47F'];
    for (let i = 0; i < count && particles.length < CONFETTI_MAX; i += 1) {
      particles.push({
        x: fullScreen ? Math.random() * width : width / 2 + (Math.random() - 0.5) * Math.min(320, width * 0.5),
        y: (fullScreen ? height * 0.22 : height * 0.28) + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 260,
        vy: -Math.random() * 320 - 80,
        size: 5 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 10,
        life: 2.4,
        shape: i % 2,
      });
    }
    startConfetti();
  }

  function startConfetti() {
    if (!confettiCtx || confettiRaf != null) return;
    lastConfettiFrame = performance.now();
    confettiRaf = requestAnimationFrame(stepConfetti);
  }

  function stepConfetti(now) {
    const dt = Math.min(0.05, (now - lastConfettiFrame) / 1000);
    lastConfettiFrame = now;
    const width = window.innerWidth;
    const height = window.innerHeight;
    confettiCtx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.vy += 620 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.spin * dt;
      p.life -= dt;
    });
    particles = particles.filter((p) => p.life > 0 && p.y < height + 60);
    particles.forEach((p) => {
      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot);
      confettiCtx.globalAlpha = Math.max(0, Math.min(1, p.life / 0.6));
      confettiCtx.fillStyle = p.color;
      if (p.shape === 0) {
        confettiCtx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
      } else {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        confettiCtx.fill();
      }
      confettiCtx.restore();
    });
    if (particles.length) {
      confettiRaf = requestAnimationFrame(stepConfetti);
    } else {
      confettiRaf = null;
      confettiCtx.clearRect(0, 0, width, height);
    }
  }

  function startHold() {
    if (holdTimer != null) return;
    holdTimer = window.setTimeout(() => {
      holdTimer = null;
      doReset();
    }, 3000);
  }

  function endHold() {
    if (holdTimer != null) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
  }

  function doReset() {
    clearProgress();
    els.logo.classList.remove('shimmer');
    void els.logo.offsetWidth;
    els.logo.classList.add('shimmer');
    window.setTimeout(() => els.logo.classList.remove('shimmer'), 1900);
    sfx.softTap();
  }

  function onLogoKeyDown(event) {
    if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
    event.preventDefault();
    if (event.repeat) return;
    startHold();
  }

  function onResize() {
    sizeConfetti();
    if (resizeRaf != null) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = null;
      if (state.phase === 'playing' || state.phase === 'celebrating') layout();
    });
  }

  function wire() {
    els.play.addEventListener('click', onPlay);
    els.replay.addEventListener('click', onReplay);
    els.homePlay.addEventListener('click', onHome);
    els.homeComplete.addEventListener('click', onHome);
    els.field.addEventListener('pointerdown', onFieldPointerDown);
    els.logo.addEventListener('pointerdown', startHold);
    els.logo.addEventListener('pointerup', endHold);
    els.logo.addEventListener('pointerleave', endHold);
    els.logo.addEventListener('pointercancel', endHold);
    els.logo.addEventListener('keydown', onLogoKeyDown);
    els.logo.addEventListener('keyup', endHold);
    els.logo.addEventListener('blur', endHold);
    window.addEventListener('pointerdown', ensureAudio, { capture: true });
    window.addEventListener('keydown', ensureAudio, { capture: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
  }

  function boot() {
    loadProgress();
    sizeConfetti();
    wire();
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase('title')));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
