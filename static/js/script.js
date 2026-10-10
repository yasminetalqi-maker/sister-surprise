/* =====================================================================
   script.js - l'interactions dyal site surprise 🎀
   Kolchi li dakhl nass (smiya...) kayt7at b textContent, jamais b innerHTML,
   bach ma ykounch chi code ykhdm b ghlat.
   ===================================================================== */
(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const TOTAL = 5;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = { name: '', hearts: 0, busy: false };

  /* ---------- Outils sghar ---------- */
  function el(tag, props = {}, ...kids) {
    const node = document.createElement(tag);
    for (const [key, val] of Object.entries(props)) {
      if (key === 'class') node.className = val;
      else if (key === 'text') node.textContent = val;
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), val);
      else node.setAttribute(key, val);
    }
    kids.flat().forEach((k) => node.append(k));
    return node;
  }

  function catSvg(cls) {            // dessin dyal qetta (markup statique w safe)
    const holder = document.createElement('div');
    holder.innerHTML = `<svg class="cat ${cls}" viewBox="0 0 100 90" aria-hidden="true"><use href="#cat"/></svg>`;
    return holder.firstChild;
  }

  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const withName = (text) => text.replaceAll('{name}', state.name || 'a lkbida');
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function api(path, body) {
    const options = { credentials: 'same-origin' };
    if (body !== undefined) {
      options.method = 'POST';
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(body);
    }
    const res = await fetch(path, options);
    let data = {};
    try { data = await res.json(); } catch (e) { /* reponse machi JSON */ }
    return { ok: res.ok, status: res.status, data };
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach((s) => { s.hidden = s.id !== id; });
    $('#topbar').hidden = id === 'screen-welcome';
    document.body.dataset.screen = id;   // CSS: f lettre, les cœurs kaymchiw wra l'carte (ma-ykhbbouch nass)
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  /* ---------- Particules: cœurs, confettis, etc. ---------- */
  const fx = $('#fx');
  let liveParticles = 0;
  const MAX_PARTICLES = 160;

  function spawn(node, lifetimeMs) {
    if (reduceMotion || liveParticles >= MAX_PARTICLES) return;
    liveParticles += 1;
    fx.append(node);
    setTimeout(() => { node.remove(); liveParticles -= 1; }, lifetimeMs + 200);
  }

  function burst(chars, count, x = innerWidth / 2, y = innerHeight / 2) {
    for (let i = 0; i < count; i++) {
      const angle = rand(0, Math.PI * 2);
      const dist = rand(90, Math.min(320, innerWidth * 0.6));
      const t = rand(1.2, 2.2);
      const p = el('span', { class: 'p burst', text: pick(chars) });
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.fontSize = rand(1.1, 2.4) + 'rem';
      p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      p.style.setProperty('--r', rand(-200, 200) + 'deg');
      p.style.setProperty('--t', t + 's');
      spawn(p, t * 1000);
    }
  }

  function rain(chars, count, seconds = 4) {
    for (let i = 0; i < count; i++) {
      const t = rand(seconds * 0.7, seconds * 1.3);
      const d = rand(0, seconds * 0.6);
      const p = el('span', { class: 'p rain', text: pick(chars) });
      p.style.left = rand(0, 100) + 'vw';
      p.style.fontSize = rand(1.1, 2.2) + 'rem';
      p.style.setProperty('--dx', rand(-60, 60) + 'px');
      p.style.setProperty('--r', rand(-120, 120) + 'deg');
      p.style.setProperty('--t', t + 's');
      p.style.setProperty('--d', d + 's');
      spawn(p, (t + d) * 1000);
    }
  }

  function confetti(count) {
    const colors = ['#ff4d88', '#ffd166', '#7bdff2', '#b2f7ef', '#c77dff', '#ff8fb1', '#fff'];
    for (let i = 0; i < count; i++) {
      const t = rand(2.5, 5);
      const d = rand(0, 1.5);
      const p = el('span', { class: 'p rain confetti' });
      p.style.left = rand(0, 100) + 'vw';
      p.style.background = pick(colors);
      p.style.setProperty('--dx', rand(-120, 120) + 'px');
      p.style.setProperty('--r', rand(-720, 720) + 'deg');
      p.style.setProperty('--t', t + 's');
      p.style.setProperty('--d', d + 's');
      spawn(p, (t + d) * 1000);
    }
  }

  /* ---------- Decor f l'arriere-plan ---------- */
  function buildBackground() {
    const bg = $('#bg');
    const items = ['💗', '🎀', '✨', '🌸', '☁️', '💕', '🐱', '⭐'];
    for (let i = 0; i < 14; i++) {
      const d = el('span', { class: 'float-deco', text: items[i % items.length] });
      d.style.left = rand(0, 96) + 'vw';
      d.style.fontSize = rand(1.2, 2.4) + 'rem';
      d.style.setProperty('--t', rand(16, 30) + 's');
      d.style.setProperty('--d', -rand(0, 30) + 's');
      bg.append(d);
    }
  }

  /* ---------- Barre dyal l9lob ---------- */
  function renderHearts(newIndex = -1) {
    const box = $('#hearts');
    box.replaceChildren();
    for (let i = 0; i < TOTAL; i++) {
      const full = i < state.hearts;
      const slot = el('span', { class: 'heart-slot' + (i === newIndex ? ' pop' : ''), text: full ? '❤️' : '🤍' });
      box.append(slot);
    }
    box.setAttribute('aria-label', `${state.hearts} mn ${TOTAL} dyal l9lob`);
  }

  /* ---------- 1. Ecran d'accueil ---------- */
  $('#welcomeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (state.busy) return;
    const input = $('#welcomeName');
    const error = $('#welcomeError');
    const name = input.value.trim();
    if (!name) {
      error.textContent = 'Ktbi smitk 9bel a lkbida 🥺💗';
      error.hidden = false;
      input.focus();
      return;
    }
    error.hidden = true;
    state.busy = true;
    try {
      const res = await api('/api/start', { name });
      if (!res.ok) throw new Error('start');
      state.name = res.data.name;
      state.hearts = res.data.hearts || 0;
      renderHearts();
      introPending = true;
      $('#introBubble').textContent = withName('Aaaah, {name} jat! Daba wlla site zwine kter bzzaf! 😂💗');
      burst(['💗', '🎀', '✨'], 14);
      renderQuestion(state.hearts);
    } catch (err) {
      error.textContent = 'Oups! Chi 7aja ma-mchatch mzyan 🙈 3awdi jerrbi a lkbida 💗';
      error.hidden = false;
    } finally {
      state.busy = false;
    }
  });

  /* ---------- 2. Les questions ---------- */
  const MONTHS = ['Yennayer', 'Febrayer', 'Mars', 'Abril', 'Mayu', 'Yunyu', 'Yulyuz', 'Ghuct', 'Shutanbir', 'Octubr', 'Nuwanbir', 'Dujanbir'];

  const QUESTIONS = [
    { title: 'CHNO SMITK? 💗', text: 'Chno smitk a lkbida? 🥹💗',
      build(submit) {
        const input = el('input', { class: 'input', type: 'text', maxlength: '30', autocomplete: 'off',
          'aria-label': 'Smitk', placeholder: 'Ktbi smitk hna ya lkbida 💗' });
        input.value = state.name;
        return { nodes: [input], focus: input, button: 'Hadi ana! 🎀',
          get: () => input.value.trim(), check: (v) => (v ? '' : 'Ktbi smitk 9bel a lkbida 🥺💗') };
      } },
    { title: 'CHNO SMIT KHTK? 🎀', text: 'Chno smit khtk li katbghik bzaf? 👀💕',
      build() {
        const input = el('input', { class: 'input', type: 'text', maxlength: '30', autocomplete: 'off',
          'aria-label': 'Smit khtk', placeholder: 'Ktbi smit khtk hna 🎀' });
        return { nodes: [input], focus: input, button: 'Hadi hiya! 💕',
          get: () => input.value.trim(), check: (v) => (v ? '' : 'Ktbi chi smiya 9bel a lkbida 🥺💗') };
      } },
    { title: 'CH7AL KATBGHI KHTK MN 100? 😭💗', text: 'Ch7al katbghi khtk mn 100? 🥹❤️',
      build() {
        const out = el('p', { class: 'slider-value', text: '50/100 💗' });
        const face = el('p', { class: 'slider-face', 'aria-hidden': 'true', text: '🥰' });
        const range = el('input', { type: 'range', min: '0', max: '100', step: '1', value: '50',
          'aria-label': 'Ch7al katbghi khtk mn 100' });
        range.addEventListener('input', () => {
          const v = Number(range.value);
          out.textContent = `${v}/100 💗`;
          face.textContent = v === 100 ? '😭✨' : v >= 80 ? '🥰' : v >= 50 ? '😊' : '🥺';
          out.classList.add('bump');
          setTimeout(() => out.classList.remove('bump'), 120);
        });
        const box = el('div', { class: 'slider-box' }, out, face, range,
          el('div', { class: 'slider-ends', 'aria-hidden': 'true' }, el('span', { text: '0 🤍' }), el('span', { text: '💗 100' })));
        return { nodes: [box], focus: range, button: 'Hada ch7al kanbghiha 💗',
          get: () => Number(range.value), check: () => '' };
      } },
    { title: 'IMTA 3ID MILAD KHTK? 🎂', text: 'Imta 3id milad khtk? 🎂💗',
      build() {
        const day = el('select', { class: 'select', 'aria-label': 'Nhar' }, el('option', { value: '', text: 'Nhar 🎂' }));
        for (let d = 1; d <= 31; d++) day.append(el('option', { value: String(d), text: String(d) }));
        const month = el('select', { class: 'select', 'aria-label': 'Chhar' }, el('option', { value: '', text: 'Chhar 🌸' }));
        MONTHS.forEach((m, i) => month.append(el('option', { value: String(i + 1), text: `${i + 1} - ${m}` })));
        return { nodes: [el('div', { class: 'date-row' }, day, month), el('p', { class: 'hint', text: 'Ghir nhar w chhar kfaya 😉' })],
          focus: day, button: 'Hada howa nhar! 🎂',
          get: () => ({ day: day.value, month: month.value }),
          check: (v) => (v.day && v.month ? '' : 'Ikhtari nhar w chhar 9bel a lkbida 🎂💗') };
      } },
    { title: 'WACH 3ARFA CH7AL KANBGHIK? 💌', text: 'WACH 3ARFA CH7AL KANBGHIK? 🥹💗',
      build(submit) {
        const options = [
          ['a', 'Chwiya 😂', ['😂', '🤭']],
          ['b', 'Bzaf bzaf 💗', ['💗', '💕']],
          ['c', 'Bzzzzzzaf mn bzaf! 😭❤️', ['❤️', '💖', '✨', '🌟']],
          ['d', 'Ma kaynach chi 9yassa l had l7ob! 💕', ['💕', '🎀', '🐱', '🌸']],
        ];
        const buttons = options.map(([id, label, emojis]) =>
          el('button', { type: 'button', class: 'choice', text: label, onclick: (ev) => {
            const r = ev.currentTarget.getBoundingClientRect();
            burst(emojis, 12, r.left + r.width / 2, r.top + r.height / 2);
            submit(id);
          } }));
        return { nodes: [el('div', { class: 'choices' }, buttons)], focus: buttons[0], button: null,
          get: () => '', check: () => '' };
      } },
  ];

  let currentQuestion = null;
  let introPending = false;

  function renderQuestion(index) {
    showScreen('screen-quiz');
    const q = QUESTIONS[index];
    $('#qNumber').textContent = `Soual ${index + 1} mn ${TOTAL}`;
    $('#qTitle').textContent = q.title;
    $('#qText').textContent = q.text;
    $('#feedback').hidden = true;
    $('#introBubble').parentElement.hidden = !introPending;   // salam ghir f awl soual li kaban
    introPending = false;
    const body = $('#qBody');
    body.replaceChildren();

    const form = el('form', { class: 'q-form', novalidate: '' });
    const built = q.build((choice) => submitAnswer(index, { get: () => choice, check: () => '' }, built));
    built.nodes.forEach((n) => form.append(n));
    let submitBtn = null;
    if (built.button) {
      submitBtn = el('button', { type: 'submit', class: 'btn', text: built.button });
      form.append(submitBtn);
    }
    built.submitBtn = submitBtn;
    built.form = form;
    form.addEventListener('submit', (e) => { e.preventDefault(); submitAnswer(index, built, built); });
    body.append(form);
    currentQuestion = built;
    setTimeout(() => built.focus && built.focus.focus({ preventScroll: true }), 150);
  }

  function setBusy(built, busy) {
    state.busy = busy;
    built.form.querySelectorAll('button, input, select').forEach((c) => { c.disabled = busy; });
  }

  function showFeedback(text) {
    const fb = $('#feedback');
    fb.textContent = '🐱 ' + withName(text);
    fb.hidden = false;
    fb.style.animation = 'none';
    void fb.offsetWidth;          // relance l'animation
    fb.style.animation = '';
  }

  async function submitAnswer(index, source, built) {
    if (state.busy) return;       // ma-kaynch double-clic
    const value = source.get();
    const problem = source.check(value);
    if (problem) { showFeedback(problem); return; }
    setBusy(built, true);
    $('#feedback').hidden = true;
    let keepLocked = false;
    try {
      const res = await api(`/api/answer/${index + 1}`, { answer: value });
      if (res.status === 409) {                       // out of order: n3awdo nsynkro
        state.hearts = res.data.hearts || 0;
        renderHearts();
        state.busy = false;
        return state.hearts >= TOTAL ? showWin() : renderQuestion(state.hearts);
      }
      if (!res.ok) throw new Error('answer');
      if (!res.data.correct) { showFeedback(res.data.message); return; }
      keepLocked = true;                              // l9alb rb7an: ma-n9dro n3awdo n7awlo
      if (index === 0) state.name = String(value).trim().slice(0, 30);   // smiya li ktbat f Soual 1
      onHeartWon(index, res.data);
    } catch (err) {
      showFeedback('Oups! Chi 7aja ma-mchatch mzyan 🙈 3awdi jerrbi a lkbida 💗');
    } finally {
      if (!keepLocked) setBusy(built, false);
    }
  }

  function questionEffects(index, data) {
    if (index === 0) { burst(['💗', '🐱', '🎀'], 14); }
    else if (index === 1) { burst(['😂', '💕', '✨'], 16); }
    else if (index === 2 && data.perfect) {
      // Grande celebration 100/100 (kolchi non-bloquant: pointer-events none)
      burst(['💗', '💖', '💕', '❤️', '⭐', '✨'], 40);
      rain(['💗', '💖', '💕', '❤️'], 50, 4.5);
      confetti(70);
      setTimeout(() => burst(['🚒', '💗', '🎉'], 14), 600);
    } else if (index === 2) { burst(['💕', '🥰'], 14); }
    else if (index === 3) { rain(['🎂', '🧁', '🍰', '⭐', '💗'], 30, 4); burst(['🎂', '🎉', '✨'], 20); }
  }

  function onHeartWon(index, data) {
    state.hearts = data.hearts;
    renderHearts(index);
    questionEffects(index, data);

    const body = $('#qBody');
    const carried = el('span', { class: 'carried', 'aria-hidden': 'true', text: '❤️' });
    const cat = catSvg(index === 2 && data.perfect ? 'party' : 'big');
    const nextLabel = state.hearts >= TOTAL ? 'Yallah l cadeau! 🎁' : 'Soual li moraha 🎀';
    const nextBtn = el('button', { type: 'button', class: 'btn', text: nextLabel, onclick: () => {
      state.busy = false;
      if (state.hearts >= TOTAL) showWin(); else renderQuestion(state.hearts);
    } });
    body.replaceChildren(el('div', { class: 'reaction' },
      el('div', { class: 'bring' }, cat, carried),
      el('p', { class: 'says', text: withName(data.message) }),
      nextBtn));
    $('#qText').textContent = 'L9alb jdid rb7ti 💗';
    state.busy = false;
    setTimeout(() => nextBtn.focus({ preventScroll: true }), 200);
  }

  /* ---------- 3. Felicitations ---------- */
  function showWin() {
    showScreen('screen-win');
    $('#giftError').hidden = true;
    $('#gift').className = 'gift';
    $('#openGift').disabled = false;
    rain(['💗', '💖', '💕', '⭐', '🎀'], 50, 4.5);
    confetti(60);
    setTimeout(() => $('#openGift').focus({ preventScroll: true }), 300);
  }

  $('#openGift').addEventListener('click', async () => {
    if (state.busy) return;
    state.busy = true;
    const btn = $('#openGift');
    btn.disabled = true;
    const gift = $('#gift');
    gift.classList.add('shake');
    const letterRequest = api('/api/letter', {});          // kanjibo lettre f nafs lwe9t
    await wait(reduceMotion ? 200 : 1600);
    gift.classList.add('open');
    const rect = gift.getBoundingClientRect();
    burst(['💌', '💗', '✨', '🎀', '💖'], 30, rect.left + rect.width / 2, rect.top + 20);
    await wait(reduceMotion ? 200 : 1000);
    try {
      const res = await letterRequest;
      if (!res.ok) throw new Error('letter');
      showLetter(res.data.sentences);
    } catch (err) {
      const msg = $('#giftError');
      msg.textContent = 'Oups! Ma-9dernach n7elo l cadeau 🙈 3awdi 3afak 💗';
      msg.hidden = false;
      gift.className = 'gift';
      btn.disabled = false;
    } finally {
      state.busy = false;
    }
  });

  /* ---------- 4. Lettre ---------- */
  function showLetter(sentences) {
    showScreen('screen-letter');
    const lines = $('#letterLines');
    const prevBtn = $('#prevBtn');
    const nextBtn = $('#nextBtn');
    lines.replaceChildren();
    $('#finalMsg').hidden = true;
    nextBtn.hidden = false;
    let revealed = 0;
    let viewing = 0;

    const scrollTo = (i) => {
      const line = lines.children[i];
      line.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      line.classList.add('flash');
      setTimeout(() => line.classList.remove('flash'), 1200);
    };
    const revealNext = () => {
      lines.append(el('p', { class: 'line', text: sentences[revealed] }));   // texte brut, ma-kaytbdelch
      viewing = revealed;
      revealed += 1;
      prevBtn.disabled = revealed < 2;
      scrollTo(viewing);
      if (revealed >= sentences.length) finish();
    };
    const finish = () => {
      nextBtn.hidden = true;
      const final = $('#finalMsg');
      final.hidden = false;
      rain(['💗', '💖', '💕', '❤️', '🎀', '🐱'], 70, 5);
      burst(['💗', '💖', '✨'], 30);
      setTimeout(() => final.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }), 500);
    };
    nextBtn.onclick = revealNext;
    prevBtn.onclick = () => {                    // kay3awd ychouf jomla 9bila, bla ma ykhser progression
      viewing = Math.max(0, viewing - 1);
      scrollTo(viewing);
    };
    prevBtn.disabled = true;
    revealNext();                                // jomla lawla katban mn lwl
    nextBtn.focus({ preventScroll: true });
  }

  /* ---------- Bda mn lwl ---------- */
  $('#resetBtn').addEventListener('click', async () => {
    if (!window.confirm('Bghiti tbda mn lwl? 🥺💗')) return;
    await api('/api/reset', {});
    state.name = ''; state.hearts = 0; state.busy = false;
    $('#welcomeName').value = '';
    showScreen('screen-welcome');
  });

  /* ---------- Demarrage ---------- */
  async function init() {
    buildBackground();
    renderHearts();
    try {
      const res = await api('/api/state');
      if (res.ok && res.data.name && res.data.hearts > 0) {
        state.name = res.data.name;
        state.hearts = res.data.hearts;
        renderHearts();
        introPending = true;
        $('#introBubble').textContent = withName('Merhba mn jdid a {name}! 🎀💗');
        if (state.hearts >= TOTAL) showWin(); else renderQuestion(state.hearts);
        return;
      }
    } catch (e) { /* ghir kan3tiw l'accueil */ }
    showScreen('screen-welcome');
    window.scrollTo(0, 0);
  }
  init();
})();
