'use strict';

/* The 50 % rule, live: only seconds actually played count toward unlocking the quiz. */
(function unlockDemo() {
  const box = document.querySelector('[data-unlock]');
  if (!box) return;
  const DUR = 720;               // a 12-minute lesson
  const SPEED = 60;              // the demo plays a minute per second
  const seen = new Uint8Array(DUR);
  let t = 0, count = 0, playing = false, raf = 0, last = 0, unlocked = false;

  const q = sel => box.querySelector(sel);
  const seenEl = q('.u-seen'), head = q('.u-head'), pct = q('[data-u="pct"]'), msg = q('[data-u="msg"]');
  const quiz = q('[data-u="quiz"]'), fill = quiz.querySelector('.fill'), label = quiz.querySelector('.lbl span'), qIcon = quiz.querySelector('use');
  const play = q('[data-u="play"]'), playIcon = play.querySelector('use'), playLabel = play.querySelector('span');

  const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  function paintSeen() {
    const stops = [];
    let start = -1;
    for (let i = 0; i <= DUR; i++) {
      const on = i < DUR && seen[i] === 1;
      if (on && start < 0) start = i;
      if (!on && start >= 0) {
        const a = (start / DUR * 100).toFixed(2), b = (i / DUR * 100).toFixed(2);
        stops.push(`transparent ${a}%, rgba(255,255,255,0.6) ${a}%, rgba(255,255,255,0.6) ${b}%, transparent ${b}%`);
        start = -1;
      }
    }
    seenEl.style.width = '100%';
    seenEl.style.background = stops.length ? `linear-gradient(90deg, ${stops.join(', ')})` : 'none';
  }
  function update() {
    head.style.left = `${t / DUR * 100}%`;
    const p = Math.round(count / DUR * 100);
    pct.textContent = `${p} % vus`;
    fill.style.transform = `scaleX(${Math.min(count / (DUR / 2), 1)})`;
    paintSeen();
    if (!unlocked && count >= DUR / 2) {
      unlocked = true;
      quiz.classList.add('ready');
      quiz.removeAttribute('aria-disabled');
      qIcon.setAttribute('href', '#i-check');
      label.textContent = 'Quiz débloqué';
      msg.textContent = 'La moitié de la vidéo est vue : le quiz s\'ouvre, et la progression est enregistrée.';
    }
  }
  function setPlaying(on) {
    playing = on;
    playIcon.setAttribute('href', on ? '#i-pause' : '#i-play');
    playLabel.textContent = on ? 'Pause' : (t >= DUR ? 'Revoir' : 'Regarder');
    if (on) { last = 0; raf = requestAnimationFrame(tick); } else cancelAnimationFrame(raf);
  }
  function tick(ts) {
    if (!playing) return;
    const dt = last ? Math.min((ts - last) / 1000, 0.1) : 0;
    last = ts;
    const prev = t;
    t = Math.min(DUR, t + dt * SPEED);
    for (let s = Math.floor(prev); s < Math.floor(t); s++) if (!seen[s]) { seen[s] = 1; count++; }
    update();
    if (t >= DUR) { setPlaying(false); if (!unlocked) msg.textContent = `Vidéo terminée, mais seulement ${Math.round(count / DUR * 100)} % ont été regardés.`; return; }
    raf = requestAnimationFrame(tick);
  }

  play.addEventListener('click', () => {
    if (!playing && t >= DUR) t = 0;
    setPlaying(!playing);
    if (playing && !unlocked) msg.textContent = 'Chaque seconde regardée compte.';
  });
  q('[data-u="skip"]').addEventListener('click', () => {
    t = Math.round(DUR * 0.8);
    update();
    if (!unlocked) msg.textContent = 'Avancer la barre ne compte pas : seules les minutes regardées débloquent le quiz.';
  });
  quiz.addEventListener('click', () => {
    msg.textContent = unlocked
      ? 'Dans l\'application, l\'élève passe maintenant aux questions, avec la correction expliquée.'
      : `Encore ${mmss(Math.max(0, DUR / 2 - count))} de vidéo à regarder avant le quiz.`;
  });
  update();
})();

/* « Vu et signé par les parents »: the signature line books the appointment. */
(function signature() {
  const form = document.querySelector('.signform');
  if (!form) return;
  const name = form.querySelector('#f-name'), tel = form.querySelector('#f-tel');
  const ink = form.querySelector('[data-sig]'), stamp = form.querySelector('[data-received]');
  const error = form.querySelector('[data-error]'), thanks = form.querySelector('[data-thanks]'), submit = form.querySelector('[type="submit"]');

  function preview() {
    const v = name.value.trim();
    ink.textContent = v || 'votre nom';
    ink.classList.toggle('placeholder', !v);
  }
  name.addEventListener('input', () => { preview(); name.removeAttribute('aria-invalid'); });
  tel.addEventListener('input', () => tel.removeAttribute('aria-invalid'));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const digits = tel.value.replace(/[^\d]/g, '');
    let problem = '';
    if (!name.value.trim()) { problem = 'Indiquez votre nom pour signer.'; name.setAttribute('aria-invalid', 'true'); name.focus(); }
    else if (digits.length < 9) { problem = 'Le numéro de téléphone semble incomplet : 10 chiffres, par exemple 06 12 34 56 78.'; tel.setAttribute('aria-invalid', 'true'); tel.focus(); }
    error.textContent = problem;
    if (problem) return;
    preview();
    ink.classList.remove('signing');
    void ink.offsetWidth; // restart the ink stroke
    ink.classList.add('signing');
    stamp.classList.add('on');
    thanks.hidden = false;
    submit.textContent = 'Demande signée';
    submit.disabled = true;
  });
})();
