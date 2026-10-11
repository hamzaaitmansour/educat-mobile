'use strict';

/* ---------- helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const pad2 = n => String(n).padStart(2, '0');
const mmss = s => `${Math.floor(s / 60)}:${pad2(Math.floor(s % 60))}`;
const toMin = hm => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };
const fmtDur = min => (min >= 60 ? `${Math.floor(min / 60)} h${min % 60 ? ' ' + pad2(min % 60) : ''}` : `${min} min`);
const fr1 = n => (Math.round(n * 10) / 10).toString().replace('.', ',');
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const dayNum = iso => { const [y, m, d] = iso.split('-').map(Number); return Date.UTC(y, m - 1, d) / 86400000; };
function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function hexA(h, a) { const [r, g, b] = hexRgb(h); return `rgba(${r},${g},${b},${a})`; }
function mix(a, b, t) { const A = hexRgb(a), B = hexRgb(b); return `rgb(${A.map((v, i) => Math.round(v * (1 - t) + B[i] * t)).join(',')})`; }
// French typography: no line break inside math, and a non-breaking space before ; : ? !
const NBSP = String.fromCharCode(160);
const MATH_GAP = new RegExp(' ([=+' + String.fromCharCode(0x2212, 0xd7, 0xf7) + '/<>' + String.fromCharCode(0x27fa) + ']) ', 'g');
const nb = s => String(s).replace(MATH_GAP, NBSP + '$1' + NBSP).replace(/ ([;:?!])/g, NBSP + '$1');
const sv = k => `--c:${SUBJ[k].c};--cs:${SUBJ[k].s}`;

const ICONS = {
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  play: '<path d="M7 4.6v14.8a1 1 0 0 0 1.5.86l12.2-7.4a1 1 0 0 0 0-1.72L8.5 3.74A1 1 0 0 0 7 4.6z" fill="currentColor" stroke="none"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1.2" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1.2" fill="currentColor" stroke="none"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  user: '<circle cx="12" cy="8" r="4.5"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  chart: '<path d="M3 3v18h18"/><path d="M8 17v-4M13 17V8M18 17v-7"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  timer: '<path d="M10 2h4M12 14l3-3"/><circle cx="12" cy="14" r="8"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUR: '<path d="M7 17 17 7M8 7h9v9"/>',
  replay: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  cc: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10.5 10.2a2 2 0 1 0 0 3.6M17 10.2a2 2 0 1 0 0 3.6"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2.5"/><path d="m16 11 5-3v8l-5-3"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M4 16V5a2 2 0 0 1 2-2h11"/>',
  ext: '<path d="M14 3h7v7M10 14 21 3M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>',
  sigma: '<path d="M18 7V4H6l6 8-6 8h12v-3"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3"/><path d="M7 15h10"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  landmark: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3z"/>',
  sparkles: '<path d="M12 3l1.8 4.9L19 9.7l-5.2 1.8L12 16.4l-1.8-4.9L5 9.7l5.2-1.8z"/><path d="M19 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  coffee: '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
};
const ic = (name, size = 20) => `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
const STATUS_ICONS = '<span class="row" style="gap:6px"><svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor" aria-hidden="true"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="6" rx="1"/><rect x="10" y="2.5" width="3" height="8.5" rx="1"/><rect x="15" y="0" width="3" height="11" rx="1"/></svg><svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M1.5 4a9.5 9.5 0 0 1 13 0"/><path d="M4 6.8a6 6 0 0 1 8 0"/><circle cx="8" cy="9.4" r="1" fill="currentColor" stroke="none"/></svg><svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true"><rect x="0.75" y="0.75" width="21.5" height="10.5" rx="3.2" stroke="currentColor" stroke-opacity=".45" stroke-width="1.5"/><rect x="2.5" y="2.5" width="16" height="7" rx="1.8" fill="currentColor"/><rect x="23.5" y="4" width="1.8" height="4" rx=".9" fill="currentColor" fill-opacity=".45"/></svg></span>';

/* ---------- saved progress (this browser only) ---------- */
const STORE_KEY = 'ezk-college-proto-v1';
const wSeed = (dur, upto) => '1'.repeat(upto) + '0'.repeat(dur - upto);
function seed() {
  return {
    v: 1,
    last: 'affine',
    lessons: {
      affine: { w: wSeed(720, 80), pos: 80 },
      thales: { w: wSeed(600, 600), pos: 0, resumeRead: true, quizBest: 3, quizPassed: true },
      'produit-nul': { resumeRead: true },
      stats: { resumeRead: true },
      ohm: { w: wSeed(840, 336), pos: 336 },
      ww2: { resumeRead: true, quizBest: 3, quizPassed: true },
    },
    events: [],
    read: { n5: true, n6: true },
    extraNotifs: [],
    exams: [],
    reminders: { m4: true },
    settings: { dys: false, calm: false, notif: { cours: true, controles: true, edt: true, rappels: true } },
  };
}
function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) { const p = JSON.parse(raw); if (p && p.v === 1 && p.lessons) return p; }
  } catch (e) { /* storage unavailable: start from the sample data */ }
  return seed();
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(P)); } catch (e) { /* ignore */ } }
let P = load();

function lp(id) {
  const L = LMAP[id];
  const p = P.lessons[id] || (P.lessons[id] = {});
  if (L.video && (typeof p.w !== 'string' || p.w.length !== L.video.duration)) p.w = '0'.repeat(L.video.duration);
  if (p.pos == null) p.pos = 0;
  return p;
}
function countOnes(s) { let n = 0; for (let i = 0; i < s.length; i++) if (s.charCodeAt(i) === 49) n++; return n; }

/* ---------- app state ---------- */
const S0 = () => ({ screen: 'splash', stack: [], subject: 'all', lessonId: 'affine', tab: 'video', quiz: null, day: TODAY, schedView: 'day', sheet: null, notifFilter: 'all', ficheQ: '', formError: '' });
let S = S0();
const V = { id: null, t: 0, rate: 1, playing: false, cc: true, w: null, count: 0, raf: 0, last: 0, lastSave: 0, unlocked: false, segAt: 0 };
const T = { mode: 'focus', total: 1500, left: 1500, running: false, cycle: 1, iv: 0 };
let examIv = 0;

function watchedSec(L) {
  if (!L.video) return 0;
  if (V.id === L.id && V.w) return V.count;
  return countOnes(lp(L.id).w);
}
const watchedPct = L => (L.video ? Math.round(watchedSec(L) / L.video.duration * 100) : 0);
const quizUnlocked = L => !L.video || watchedSec(L) >= L.video.duration / 2;
function progressOf(L) {
  const p = lp(L.id);
  const parts = [];
  if (L.video) parts.push(Math.min(watchedSec(L) / (L.video.duration / 2), 1));
  parts.push(p.resumeRead ? 1 : 0);
  if (L.quiz) parts.push(p.quizPassed ? 1 : 0);
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length * 100);
}
const allEvents = () => EVENTS.concat(P.events);
const eventById = id => allEvents().concat(UPCOMING_EXTRA).find(e => e.id === id);
const eventsOn = day => allEvents().filter(e => e.day === day).sort((a, b) => toMin(a.start) - toMin(b.start));
const allNotifs = () => P.extraNotifs.concat(NOTIFS);
const unreadCount = () => allNotifs().filter(n => !P.read[n.id]).length;
const dayLong = iso => (WEEK.find(w => w.date === iso) || { long: iso }).long;
function inDays(iso) { const n = dayNum(iso) - dayNum(TODAY); return n === 0 ? "Aujourd'hui" : n === 1 ? 'Demain' : `Dans ${n} jours`; }

/* ---------- small building blocks ---------- */
function ringSm(pct, color) {
  const r = 17, c = 2 * Math.PI * r;
  return `<div class="ring-sm num"><svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true"><circle cx="21" cy="21" r="${r}" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="4"/><circle cx="21" cy="21" r="${r}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"/></svg>${pct === 100 ? ic('check', 16) : pct + '%'}</div>`;
}
function subHeader(eyebrow, title, right = '') {
  return `<div class="topbar"><button class="iconbtn" data-act="back" aria-label="Retour">${ic('left', 22)}</button>${right}</div>
  <div class="hero-title" style="margin-top:16px"><span class="eyebrow">${eyebrow}</span><h1 class="h-xl">${title}</h1></div>`;
}
function lessonRow(L) {
  const sj = SUBJ[L.subject];
  const meta = [TYPE_LABEL[L.type]];
  if (L.video) meta.push(`${Math.round(L.video.duration / 60)} min`);
  return `<div class="lesson-row" role="button" tabindex="0" style="${sv(L.subject)}" data-act="openLesson" data-id="${L.id}">
    <span class="sq">${ic(sj.icon, 22)}</span>
    <span class="info"><b>${esc(L.title)}</b><span class="meta">${esc(sj.name)} · ${meta.join(' · ')}</span></span>
    ${ringSm(progressOf(L), sj.c)}
  </div>`;
}
function weekMini() {
  const max = 90;
  const total = STUDY.reduce((a, d) => a + Object.values(d.m).reduce((x, y) => x + y, 0), 0);
  const cols = STUDY.map(d => {
    const segs = STUDY_ORDER.filter(k => d.m[k]).map(k => `<span style="--c:${SUBJ[k].c};height:${(d.m[k] / max) * 72}px"></span>`).join('');
    return `<div class="col ${d.today ? 'today' : ''}"><div class="stackbar">${segs}</div><span class="d">${d.d}</span></div>`;
  }).join('');
  return `<div class="weekmini" role="button" tabindex="0" data-act="go" data-to="progress">
    <div class="between"><div><span class="eyebrow">7 derniers jours</span><div class="h-md" style="margin-top:4px">${fmtDur(total)} d'étude</div></div><span class="link">Détails ${ic('right', 16)}</span></div>
    <div class="minibars" aria-label="Temps d'étude par jour, coloré par matière">${cols}</div></div>`;
}

/* ---------- screens ---------- */
const SCREENS = {};

SCREENS.splash = () => `<div class="splash">
  <div class="logo"><img src="${LOGO_FULL}" alt="EducazenKids, l'enseignement sur mesure">
    <div class="stack" style="gap:8px;justify-items:center"><span class="eyebrow">Espace élève · Collège</span><h1 class="h-lg">Tes cours, à ton rythme</h1>
    <p>Vidéos, résumés, quiz, contrôles et emploi du temps, au même endroit.</p></div></div>
  <div class="cta"><button class="btn btn-dark block" data-act="nav" data-to="home">Se connecter</button>
    <p class="small faint" style="text-align:center;margin:0">Prototype · données d'exemple</p></div>
</div>`;

SCREENS.home = c => {
  const unread = unreadCount();
  const R = LMAP[P.last] || LMAP.affine;
  const rs = SUBJ[R.subject];
  const stats = R.video
    ? [['Vidéo', Math.round(R.video.duration / 60), ' min'], ['Quiz', R.quiz ? R.quiz.length : 0, ' q.'], ['Vu', watchedPct(R), ' %']]
    : [['Résumé', parseInt(R.resume.read, 10), ' min'], ['Quiz', R.quiz ? R.quiz.length : 0, ' q.'], ['Fait', progressOf(R), ' %']];
  const NAMES = { all: 'Toutes', maths: 'Maths', pc: 'Physique-Chimie', svt: 'SVT', fr: 'Français', ang: 'Anglais', hg: 'Histoire-Géo' };
  const chips = Object.keys(NAMES).map(k => `<button class="chip ${c.subject === k ? 'on' : ''}" data-act="subject" data-s="${k}" ${k !== 'all' ? `style="--c:${SUBJ[k].c}"` : ''}>${k !== 'all' ? '<span class="dot"></span>' : ''}${NAMES[k]}</button>`).join('');
  const list = LESSONS.filter(L => c.subject === 'all' || L.subject === c.subject).map(lessonRow).join('');
  const today = eventsOn(TODAY).filter(e => toMin(e.end) > NOW_MIN).slice(0, 3).map(e => {
    const live = toMin(e.start) <= NOW_MIN;
    const exam = e.kind === 'Contrôle';
    return `<div class="today-item" role="button" tabindex="0" style="${sv(e.subject)}" data-act="openEvent" data-id="${e.id}" data-day="${e.day}">
      <span class="t num">${e.start}</span>
      <span class="what"><b>${esc(e.title || SUBJ[e.subject].name)}</b><span class="small muted">${esc(e.room || '')}${e.teacher ? ' · ' + esc(e.teacher) : ''}</span></span>
      ${live ? '<span class="tag teal">En cours</span>' : exam ? '<span class="tag pink">Contrôle</span>' : `<span class="faint">${ic('right', 18)}</span>`}
    </div>`;
  }).join('');
  return `<div class="screen">
    <div class="topbar">
      <div class="brandmark"><img src="${LOGO_MARK}" alt=""><span class="wordmark"><span class="e">Educazen</span><span class="k">Kids</span></span></div>
      <div class="row">
        <button class="iconbtn" data-act="go" data-to="fiches" aria-label="Rechercher une fiche">${ic('search', 20)}</button>
        <button class="iconbtn" data-act="go" data-to="notifs" aria-label="Notifications, ${unread} non lues">${ic('bell', 20)}${unread ? `<span class="badge num">${unread}</span>` : ''}</button>
        <button class="avatar" data-act="go" data-to="settings" aria-label="Mon profil">${STUDENT.initials}</button>
      </div>
    </div>
    <div class="hero-title"><span class="muted" style="font-size:16px">Bonjour ${STUDENT.first},</span><h1 class="h-xl">Ton parcours<br>sur mesure</h1></div>
    <div class="chips" style="margin-top:18px">${chips}</div>
    <div class="feature" style="${sv(R.subject)}">
      <div class="art" style="--c:${rs.c}"><span class="ring"></span><i></i><i></i><i></i></div>
      <span class="eyebrow" style="position:relative">Reprendre · ${esc(rs.name)}</span>
      <h2 class="h-lg" style="position:relative">${esc(R.title)}</h2>
      <p style="position:relative">${esc(R.desc)}</p>
      <div class="statpanel">${stats.map(s => `<div><div class="k">${s[0]}</div><div class="v num">${s[1]}<small style="font-size:13px">${s[2]}</small></div></div>`).join('')}<button class="go-btn" data-act="openLesson" data-id="${R.id}" aria-label="Ouvrir ${esc(R.title)}">${ic('arrowUR', 22)}</button></div>
    </div>
    <div class="section">
      <div class="section-head"><h2 class="h-md">Aujourd'hui</h2><button class="link" data-act="nav" data-to="schedule">Emploi du temps ${ic('right', 16)}</button></div>
      <div class="today">${today || '<p class="muted" style="margin:0">Plus de cours aujourd\'hui.</p>'}</div>
    </div>
    <div class="section">
      <div class="section-head"><h2 class="h-md">Mes leçons</h2><span class="faint small">${LESSONS.filter(L => c.subject === 'all' || L.subject === c.subject).length} leçons</span></div>
      <div class="stack" style="gap:8px">${list}</div>
    </div>
    <div class="section">${weekMini()}</div>
  </div>`;
};

/* ----- lesson ----- */
function stepsHTML(L) {
  const p = lp(L.id);
  const st = [];
  if (L.video) st.push(`<span class="step ${quizUnlocked(L) ? 'done' : ''}" id="step-video">${quizUnlocked(L) ? ic('check', 14) : ic('video', 14)} Vidéo vue à 50 %</span>`);
  st.push(`<span class="step ${p.resumeRead ? 'done' : ''}">${p.resumeRead ? ic('check', 14) : ic('file', 14)} Résumé lu</span>`);
  if (L.quiz) st.push(`<span class="step ${p.quizPassed ? 'done' : ''}">${p.quizPassed ? ic('check', 14) : ic('trophy', 14)} Quiz réussi</span>`);
  return `<div class="steps">${st.join('')}</div>`;
}
function seenHTML(w, dur) {
  const on = i => (typeof w === 'string' ? w.charCodeAt(i) === 49 : w[i] === 1);
  let out = '', s = -1;
  for (let i = 0; i <= dur; i++) {
    const v = i < dur && on(i);
    if (v && s < 0) s = i;
    if (!v && s >= 0) { out += `<div class="seen" style="left:${s / dur * 100}%;width:${(i - s) / dur * 100}%"></div>`; s = -1; }
  }
  return out;
}
function progBtn(L) {
  const dur = L.video.duration, half = dur / 2, sec = watchedSec(L);
  const ready = sec >= half;
  return {
    ready,
    fill: Math.min(sec / half, 1) * 100,
    label: ready ? `Passer le quiz ${ic('arrow', 18)}` : `${ic('lock', 17)} Quiz à 50 % · encore ${mmss(Math.max(0, Math.ceil(half - sec)))}`,
    note: ready ? 'Quiz débloqué. Ta progression est enregistrée.' : 'de la vidéo vue. Le quiz se débloque à 50 %.',
  };
}
function videoTab(L, c) {
  const dur = L.video.duration;
  const t = c.vt != null ? c.vt : V.id === L.id ? V.t : lp(L.id).pos;
  const w = V.id === L.id && V.w ? V.w : lp(L.id).w;
  const playing = V.playing && V.id === L.id && !c.gallery;
  const ch = L.video.chapters;
  let ci = 0; ch.forEach((x, i) => { if (t >= x.t) ci = i; });
  const pb = progBtn(L);
  const rate = V.rate === 10 ? 'Démo ×10' : `${String(V.rate).replace('.', ',')}×`;
  const chapters = ch.map((x, i) => {
    const end = i < ch.length - 1 ? ch[i + 1].t : dur;
    return `<button class="chapter ${i === ci ? 'on' : ''}" id="ch-${i}" data-act="vchapter" data-t="${x.t}">
      <span class="pb">${ic('play', 16)}</span><span><b>${esc(x.title)}</b><span class="sub">${esc(x.sub)}</span></span><span class="dur num">${mmss(end - x.t)}</span></button>`;
  }).join('');
  return `<div class="player">
      <div class="viewport"><canvas id="${c.gallery ? '' : 'vcanvas'}" data-video="${L.id}" data-t="${t}" aria-label="Vidéo : ${esc(L.title)}, avec ${esc(L.teacher)}"></canvas>
        <button class="bigplay" id="bigplay" data-act="vplay" aria-label="Lire la vidéo" ${playing ? 'hidden' : ''}><span>${ic('play', 26)}</span></button></div>
      <div class="controls">
        <div class="track" id="vtrack" role="slider" tabindex="0" aria-label="Position dans la vidéo" aria-valuemin="0" aria-valuemax="${dur}" aria-valuenow="${Math.floor(t)}"><div class="rail"></div><div id="vseen">${seenHTML(w, dur)}</div><div class="half"></div><div class="head" id="vhead" style="left:${t / dur * 100}%"></div></div>
        <div class="ctl-row"><button class="ctl-btn" id="vplay" data-act="vplay" aria-label="${playing ? 'Pause' : 'Lecture'}">${ic(playing ? 'pause' : 'play', 14)}</button>
          <span class="num" id="vtime">${mmss(t)} / ${mmss(dur)}</span><span class="sp"></span>
          <button class="ctl-btn" id="vspeed" data-act="vspeed" aria-label="Vitesse de lecture">${rate}</button>
          <button class="ctl-btn ${V.cc ? 'on' : ''}" data-act="vcc" aria-pressed="${V.cc}" aria-label="Sous-titres">${ic('cc', 16)}</button></div>
      </div>
    </div>
    <div class="section"><div class="section-head"><h2 class="h-md">Chapitres</h2><span class="faint small">${ch.length} parties · ${mmss(dur)}</span></div><div class="chapters">${chapters}</div></div>`;
}
function videoDock(L) {
  const pb = progBtn(L);
  return `<div class="progress-dock">
    <div class="between"><div><div class="eyebrow">Ta progression</div><div class="pct num" id="vpct">${watchedPct(L)} %</div></div>
      <p class="small muted" id="vnote" style="max-width:170px;margin:0;text-align:right">${pb.note}</p></div>
    <button class="progbtn ${pb.ready ? 'ready' : ''}" id="progbtn" data-act="startQuiz" data-id="${L.id}" ${pb.ready ? '' : 'aria-disabled="true"'}><span class="fill" id="progfill" style="width:${pb.fill}%"></span><span class="lbl" id="proglbl">${pb.label}</span></button>
  </div>`;
}
function resumeTab(L) {
  const p = lp(L.id), r = L.resume;
  const cards = r.sections.map(s => `<div class="rcard"><h3>${esc(s.h)}</h3>${s.p ? `<p>${esc(nb(s.p))}</p>` : ''}${s.f ? `<div class="formula">${esc(nb(s.f))}</div>` : ''}${s.list ? `<ul>${s.list.map(x => `<li>${esc(nb(x))}</li>`).join('')}</ul>` : ''}</div>`).join('');
  let action;
  if (!p.resumeRead) action = `<button class="btn btn-dark block" data-act="resumeRead" data-id="${L.id}">${ic('check', 18)} J'ai lu le résumé</button>`;
  else if (L.quiz && !p.quizPassed) action = quizUnlocked(L) ? `<button class="btn btn-brand block" data-act="startQuiz" data-id="${L.id}">Passer au quiz ${ic('arrow', 18)}</button>` : `<button class="btn btn-ghost block" data-act="tab" data-tab="video">${ic('video', 18)} Continuer la vidéo pour débloquer le quiz</button>`;
  else action = `<div class="saved" style="justify-self:center">${ic('check', 18)} ${L.type === 'r' ? 'Leçon terminée et enregistrée' : 'Résumé lu · progression enregistrée'}</div>`;
  return `<div class="resume">
    <div class="between"><span class="tag c">${ic('file', 14)} Fiche · ${esc(r.read)} de lecture</span>${p.resumeRead ? `<span class="tag teal">${ic('check', 13)} Lu</span>` : ''}</div>
    ${cards}
    <div class="rcard retenir"><h3>À retenir</h3><ul>${r.retenir.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    ${r.erreurs ? `<div class="rcard warn"><h3>Erreurs fréquentes</h3><ul>${r.erreurs.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
    ${action}
  </div>`;
}
function quizTab(L) {
  const p = lp(L.id);
  const unlocked = quizUnlocked(L);
  const best = p.quizBest != null ? `<div class="between"><span class="muted">Meilleur score</span><b class="num">${p.quizBest} / ${L.quiz.length}</b></div>` : '';
  if (!unlocked) {
    const pct = Math.min(100, Math.round(watchedSec(L) / (L.video.duration / 2) * 100));
    return `<div class="rcard" style="margin-top:18px"><span class="tag">${ic('lock', 13)} Verrouillé</span><h3>Le quiz se débloque à 50 % de la vidéo</h3>
      <p>Tu as vu ${watchedPct(L)} % de la vidéo. Les passages sautés ne comptent pas : regarde au moins la moitié pour accéder aux questions.</p>
      <div class="meter" style="--c:var(--brand)"><span style="width:${pct}%"></span></div>
      <button class="btn btn-dark block" data-act="tab" data-tab="video">${ic('play', 16)} Reprendre la vidéo</button></div>`;
  }
  return `<div class="rcard" style="margin-top:18px"><span class="tag c">${ic('trophy', 13)} ${L.quiz.length} questions</span>
    <h3>${L.video ? 'Quiz sur la vidéo' : 'Quiz sur le résumé'}</h3>
    <p>Une réponse par question, avec la correction expliquée. Il faut 60 % de bonnes réponses pour valider la leçon.</p>
    ${best}
    <button class="btn btn-dark block" data-act="startQuiz" data-id="${L.id}">${p.quizBest != null ? 'Refaire le quiz' : 'Commencer le quiz'} ${ic('arrow', 18)}</button></div>`;
}
SCREENS.lesson = c => {
  const L = LMAP[c.lessonId] || LMAP.affine;
  const sj = SUBJ[L.subject];
  const tabs = L.type === 'vqr' ? ['video', 'resume', 'quiz'] : L.type === 'rq' ? ['resume', 'quiz'] : ['resume'];
  const tab = tabs.includes(c.tab) ? c.tab : tabs[0];
  const NAMES = { video: 'Vidéo', resume: 'Résumé', quiz: 'Quiz' };
  const seg = tabs.length > 1 ? `<div class="seg" role="tablist">${tabs.map(k => {
    const locked = k === 'quiz' && !quizUnlocked(L);
    return `<button role="tab" aria-selected="${k === tab}" class="${k === tab ? 'on' : ''} ${locked ? 'locked' : ''}" ${k === 'quiz' ? 'id="tab-quiz"' : ''} data-act="tab" data-tab="${k}">${locked ? ic('lock', 14) : ''}${NAMES[k]}</button>`;
  }).join('')}</div>` : '';
  const body = tab === 'video' ? videoTab(L, c) : tab === 'resume' ? resumeTab(L) : quizTab(L);
  return `<div class="screen no-nav ${tab === 'video' ? 'dock-pad' : ''}">
    <div class="lesson-hero" style="${sv(L.subject)}">
      <div class="art" style="--c:${sj.c}"><i></i><i></i><i></i></div>
      <div class="top"><button class="iconbtn glass" data-act="back" aria-label="Retour">${ic('left', 22)}</button></div>
      <div class="titles"><span class="eyebrow">${esc(sj.name)} · ${esc(L.chapter)}</span><h1 class="h-xl">${esc(L.title)}</h1><span class="muted">Avec ${esc(L.teacher)}</span></div>
      ${stepsHTML(L)}
      ${seg}
    </div>
    ${body}
  </div>${tab === 'video' ? videoDock(L) : ''}`;
};

/* ----- quiz ----- */
SCREENS.quiz = c => {
  const q = c.quiz;
  const L = LMAP[q.lessonId];
  const qs = L.quiz, n = qs.length;
  const exam = q.mode === 'exam';
  const label = exam ? 'Contrôle blanc' : 'Quiz';
  if (q.done) {
    const score = qs.reduce((a, x, k) => a + (q.picks[k] === x.a ? 1 : 0), 0);
    const pct = score / n, passed = pct >= 0.6;
    const r = 74, circ = 2 * Math.PI * r;
    const used = q.usedSec != null ? `<span class="tag">${ic('clock', 13)} ${mmss(q.usedSec)} utilisées sur 10:00</span>` : '';
    return `<div class="screen no-nav">
      <div class="quiz-top"><button class="iconbtn" data-act="quizClose" aria-label="Fermer">${ic('x', 20)}</button><span class="eyebrow">${label} · ${esc(L.title)}</span></div>
      <div class="result">
        <div class="bigring"><svg width="170" height="170" viewBox="0 0 170 170" aria-hidden="true"><circle cx="85" cy="85" r="${r}" fill="none" stroke="#E6DFEE" stroke-width="12"/><circle cx="85" cy="85" r="${r}" fill="none" stroke="${passed ? '#088D84' : '#E8506F'}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - pct)}"/></svg><span class="score num">${score}/${n}</span></div>
        <h1 class="h-lg">${passed ? (score === n ? 'Sans faute !' : 'Quiz validé') : 'Pas encore validé'}</h1>
        <p class="muted" style="margin:0;max-width:290px;line-height:1.5">${passed ? 'Bravo, tu maîtrises les points clés. La leçon avance.' : 'Il faut 60 % de bonnes réponses. Relis le résumé, puis réessaie.'}</p>
        ${used}
        <span class="saved">${ic('check', 18)} Progression enregistrée</span>
      </div>
      <div class="stack" style="margin-top:26px">
        ${passed ? '' : `<button class="btn btn-dark block" data-act="quizRetry">${ic('replay', 18)} Recommencer</button>`}
        <button class="btn btn-ghost block" data-act="quizToLesson" data-tab="resume">${ic('file', 18)} Revoir le résumé</button>
        <button class="btn ${passed ? 'btn-dark' : 'btn-ghost'} block" data-act="quizToLesson" data-tab="${L.video ? 'video' : 'resume'}">Retour à la leçon</button>
      </div>
    </div>`;
  }
  const cur = qs[q.i];
  const done = q.i + (q.checked ? 1 : 0);
  const opts = cur.o.map((o, k) => {
    let cls = '';
    if (q.checked) { if (k === cur.a) cls = 'right'; else if (k === q.sel) cls = 'wrong'; } else if (k === q.sel) cls = 'sel';
    const mark = q.checked && k === cur.a ? ic('check', 18) : q.checked && k === q.sel ? ic('x', 18) : '';
    return `<button class="opt ${cls}" data-act="qpick" data-i="${k}" ${q.checked ? 'disabled' : ''}><span class="letter">${'ABCD'[k]}</span><span>${esc(nb(o))}</span>${mark}</button>`;
  }).join('');
  const ok = q.checked && q.sel === cur.a;
  const foot = !q.checked
    ? `<button class="btn btn-dark block" data-act="qcheck" ${q.sel == null ? 'disabled style="opacity:.45"' : ''}>Valider</button>`
    : `<button class="btn btn-dark block" data-act="qnext">${q.i < n - 1 ? 'Question suivante' : 'Voir mon résultat'} ${ic('arrow', 18)}</button>`;
  return `<div class="screen no-nav" style="padding-bottom:120px">
    <div class="quiz-top"><button class="iconbtn" data-act="quizClose" aria-label="Quitter le quiz">${ic('x', 20)}</button>
      <div class="qbar" aria-hidden="true"><span style="width:${done / n * 100}%"></span></div>
      ${exam ? `<span class="timerchip num" id="quiztimer">${ic('clock', 15)} ${mmss(Math.max(0, Math.round(((q.deadline || 0) - Date.now()) / 1000)))}</span>` : `<span class="faint num" style="font-weight:700">${q.i + 1}/${n}</span>`}</div>
    <div style="margin-top:22px" class="eyebrow">${label} · ${esc(L.title)} · Question ${q.i + 1} sur ${n}</div>
    <h1 class="qtext">${esc(nb(cur.q))}</h1>
    <div class="opts">${opts}</div>
    ${q.checked ? `<div class="explain"><b>${ok ? 'Bonne réponse !' : 'Pas tout à fait.'}</b>${esc(nb(cur.e))}</div>` : ''}
  </div><div class="quiz-foot">${foot}</div>`;
};

/* ----- schedule ----- */
function evCard(e, c) {
  const sj = SUBJ[e.subject];
  const exam = e.kind === 'Contrôle';
  const live = e.day === TODAY && toMin(e.start) <= NOW_MIN && NOW_MIN < toMin(e.end);
  const len = toMin(e.end) - toMin(e.start);
  const kpis = exam ? `<div class="kpis"><div><div class="k">${e.room.startsWith('Labo') ? 'Labo' : 'Salle'}</div><div class="v num">${esc(e.room.replace(/\D+/g, '') || e.room)}</div></div><div><div class="k">Coef</div><div class="v num">${e.coef}</div></div><div><div class="k">Durée</div><div class="v num">${fmtDur(len)}</div></div></div>` : '';
  const liveHTML = live ? `<div class="live"><div class="between small"><b>En cours</b><span>encore ${toMin(e.end) - NOW_MIN} min</span></div><div class="lbar"><span style="width:${(NOW_MIN - toMin(e.start)) / len * 100}%"></span></div></div>` : '';
  return `<div class="ev ${exam ? 'exam' : ''} ${e.subject === 'perso' ? 'perso' : ''}" role="button" tabindex="0" style="${sv(e.subject)}" data-act="openEvent" data-id="${e.id}" data-day="${e.day}">
    <div class="between"><b>${esc(e.title || sj.name)}</b><span class="tag ${exam ? 'dark' : ''}">${esc(e.kind)}</span></div>
    <div class="where"><span class="num">${ic('clock', 14)} ${e.start} – ${e.end}</span>${e.room ? `<span>${ic('pin', 14)} ${esc(e.room)}</span>` : ''}${e.teacher ? `<span>${ic('user', 14)} ${esc(e.teacher)}</span>` : ''}</div>
    ${kpis}${liveHTML}
    ${e.note ? `<span class="small" style="color:#A0175F;font-weight:700">${esc(e.note)}</span>` : ''}
  </div>`;
}
function dayTimeline(c) {
  const evs = eventsOn(c.day);
  if (!evs.length) {
    return `<div class="empty">${ic('coffee', 34)}<b style="color:var(--ink)">Pas de cours ce jour-là</b><span>Profite-en pour te reposer, ou programme une séance de révision.</span>
      <button class="btn btn-dark btn-sm" data-act="addEvent">${ic('plus', 16)} Ajouter une révision</button></div>`;
  }
  const rows = [];
  let prevEnd = null;
  const nowLine = `<div class="nowline"><span class="num">09:40</span><i></i></div>`;
  let nowPlaced = c.day !== TODAY;
  evs.forEach(e => {
    const s = toMin(e.start);
    if (!nowPlaced && NOW_MIN < s) { rows.push(nowLine); nowPlaced = true; }
    if (prevEnd != null && s - prevEnd >= 45) {
      const lunch = prevEnd <= 12 * 60 && s >= 13 * 60;
      rows.push(`<div class="tl-row"><div class="tl-time faint num">${pad2(Math.floor(prevEnd / 60))}:${pad2(prevEnd % 60)}</div><div class="free"><span class="faint">${ic('coffee', 18)}</span><b>${lunch ? 'Pause déjeuner' : 'Temps libre'} · ${fmtDur(s - prevEnd)}</b><span class="small muted">${lunch ? 'Tu as du temps pour réviser ou souffler.' : 'Un bon créneau pour une fiche résumé.'}</span></div></div>`);
    }
    if (!nowPlaced && NOW_MIN < toMin(e.end)) nowPlaced = true; // now falls inside this event: the card shows it
    rows.push(`<div class="tl-row"><div class="tl-time num">${e.start}<small>${e.end}</small></div>${evCard(e, c)}</div>`);
    prevEnd = Math.max(prevEnd || 0, toMin(e.end));
  });
  return `<div class="timeline">${rows.join('')}</div>`;
}
function weekGrid(c) {
  const H0 = 8 * 60, H1 = 18 * 60, px = 440 / (H1 - H0);
  const days = WEEK.slice(0, 6);
  const head = `<div></div>${days.map(d => `<div class="wh ${d.date === TODAY ? 'on' : ''}">${d.dw}<br><span class="num">${d.d}</span></div>`).join('')}`;
  const hours = `<div class="whours">${[8, 10, 12, 14, 16, 18].map(h => `<span class="num" style="top:${(h * 60 - H0) * px}px">${h}h</span>`).join('')}</div>`;
  const cols = days.map(d => `<div class="wcol">${eventsOn(d.date).map(e => {
    const top = (toMin(e.start) - H0) * px, h = (toMin(e.end) - toMin(e.start)) * px - 3;
    const exam = e.kind === 'Contrôle';
    const name = exam ? 'Ctrl' : SUBJ[e.subject].short;
    return `<div class="wblock ${exam ? 'exam' : ''}" role="button" tabindex="0" style="${sv(e.subject)};top:${top}px;height:${h}px" data-act="openEvent" data-id="${e.id}" data-day="${e.day}" title="${esc(e.title || SUBJ[e.subject].name)} ${e.start}">${name}${h > 36 ? `<br><span class="num" style="font-weight:600;color:var(--ink-2)">${e.start}</span>` : ''}</div>`;
  }).join('')}</div>`).join('');
  return `<div class="weekgrid">${head}${hours}${cols}</div>
    <div class="legend" style="margin-top:14px">${SUBJECT_ORDER.concat('atelier').map(k => `<span style="--c:${SUBJ[k].c}"><i></i>${SUBJ[k].short === 'Fr' ? 'Français' : SUBJ[k].short === 'Ang' ? 'Anglais' : SUBJ[k].short}</span>`).join('')}</div>`;
}
SCREENS.schedule = c => {
  const strip = WEEK.map(d => {
    const evs = eventsOn(d.date);
    const dots = [...new Set(evs.map(e => (e.kind === 'Contrôle' ? '#D9368F' : SUBJ[e.subject].c)))].slice(0, 3).map(col => `<i style="--c:${col}"></i>`).join('');
    return `<button class="day ${c.day === d.date ? 'on' : ''}" data-act="day" data-d="${d.date}" aria-pressed="${c.day === d.date}" aria-label="${d.long}"><span class="dw">${d.dw}</span><span class="dn num">${d.d}</span><span class="dots">${dots}</span></button>`;
  }).join('');
  const evs = eventsOn(c.day);
  const exams = evs.filter(e => e.kind === 'Contrôle').length;
  const dayHead = `<div class="between" style="margin-top:20px"><div><h2 class="h-md">${c.day === TODAY ? "Aujourd'hui" : dayLong(c.day)}</h2><span class="small muted">${evs.length ? `${evs.length} créneau${evs.length > 1 ? 'x' : ''}${exams ? ` · ${exams} contrôle` : ''}` : 'Journée libre'}</span></div>${c.day === TODAY ? '<span class="tag pink">Lun. 12 oct.</span>' : ''}</div>`;
  return `<div class="screen">
    <div class="topbar"><div><span class="eyebrow">Semaine 42 · 3e B</span><h1 class="h-lg" style="margin-top:4px">Octobre 2026</h1></div>
      <button class="iconbtn" data-act="addEvent" aria-label="Ajouter une révision ou un rappel">${ic('plus', 22)}</button></div>
    <div class="seg" style="margin-top:16px"><button class="${c.schedView === 'day' ? 'on' : ''}" data-act="schedView" data-v="day">Jour</button><button class="${c.schedView === 'week' ? 'on' : ''}" data-act="schedView" data-v="week">Semaine</button></div>
    ${c.schedView === 'day' ? `<div class="week">${strip}</div>${dayHead}${dayTimeline(c)}` : weekGrid(c)}
  </div>`;
};

/* ----- tools ----- */
SCREENS.tools = () => {
  const unread = unreadCount();
  const next = eventsOn(TODAY).find(e => toMin(e.start) > NOW_MIN);
  const upcoming = upcomingExams();
  const tile = (to, icon, k, title, sub, badge = '') => `<div class="tile" role="button" tabindex="0" style="${sv(k)}" data-act="go" data-to="${to}"><span class="ti">${ic(icon, 22)}</span><span><b>${title}</b><span class="s">${sub}</span></span>${badge}</div>`;
  return `<div class="screen">
    <div class="hero-title" style="margin-top:6px"><span class="eyebrow">Organisation</span><h1 class="h-xl">Outils</h1><span class="muted">Tout ce qu'il faut pour t'organiser.</span></div>
    <div class="tiles">
      <div class="tile wide" role="button" tabindex="0" style="${sv('maths')}" data-act="nav" data-to="schedule"><span class="ti">${ic('calendar', 22)}</span><span><b>Emploi du temps</b><span class="s">${next ? `Prochain : ${esc(next.title || SUBJ[next.subject].name)} · ${next.start} · ${esc(next.room)}` : 'Plus de cours aujourd\'hui'}</span></span><span class="faint">${ic('right', 20)}</span></div>
      ${tile('controle', 'clipboard', 'fr', 'Contrôle continu', `${upcoming.length} à venir · moyenne ${fr1(average().me)}`, upcoming.some(u => u.day === TODAY) ? '<span class="badge">1</span>' : '')}
      ${tile('notifs', 'bell', 'ang', 'Notifications', unread ? `${unread} non lue${unread > 1 ? 's' : ''}` : 'Tout est lu', unread ? `<span class="badge num">${unread}</span>` : '')}
      ${tile('progress', 'chart', 'pc', 'Ma progression', `${fmtDur(STUDY.reduce((a, d) => a + Object.values(d.m).reduce((x, y) => x + y, 0), 0))} cette semaine`)}
      ${tile('fiches', 'file', 'svt', 'Fiches résumés', `${LESSONS.length} fiches à réviser`)}
      ${tile('timer', 'timer', 'hg', 'Minuteur', 'Sessions de 25 min')}
      ${tile('settings', 'settings', 'perso', 'Paramètres', 'Notifications, lecture')}
      <div class="tile wide" role="button" tabindex="0" style="${sv('atelier')}" data-act="go" data-to="contact"><span class="ti">${ic('phone', 22)}</span><span><b>Contacter le centre</b><span class="s">EducazenKids · Agadir</span></span><span class="faint">${ic('right', 20)}</span></div>
    </div>
    <div class="contact-logo" style="margin-top:20px"><img src="${LOGO_FULL}" alt="EducazenKids, l'enseignement sur mesure" style="width:170px"></div>
  </div>`;
};

/* ----- contrôle continu ----- */
function upcomingExams() {
  return EVENTS.filter(e => e.kind === 'Contrôle').concat(UPCOMING_EXTRA)
    .filter(e => dayNum(e.day) > dayNum(TODAY) || (e.day === TODAY && toMin(e.end) > NOW_MIN))
    .sort((a, b) => dayNum(a.day) - dayNum(b.day) || toMin(a.start) - toMin(b.start));
}
function average() {
  const w = RESULTS.reduce((a, r) => a + r.coef, 0);
  return { me: RESULTS.reduce((a, r) => a + r.grade * r.coef, 0) / w, klass: RESULTS.reduce((a, r) => a + r.avg * r.coef, 0) / w };
}
SCREENS.controle = () => {
  const av = average();
  const ups = upcomingExams().map(e => {
    const L = LMAP[e.lesson];
    const prep = L ? progressOf(L) : 0;
    const wk = WEEK.find(w => w.date === e.day) || { dw: e.dw, d: e.d };
    return `<div class="exam-card" style="${sv(e.subject)}">
      <div class="row" style="align-items:flex-start;gap:12px"><div class="datebox"><span class="dw">${wk.dw}</span><span class="dn num">${wk.d}</span></div>
        <div style="display:grid;gap:4px;flex:1;min-width:0"><div class="between"><b style="font-weight:700">${esc(SUBJ[e.subject].name)}</b><span class="tag ${e.day === TODAY ? 'pink' : ''}">${inDays(e.day)}</span></div>
        <span class="small muted">${esc(L ? L.title : e.title)} · ${e.start} · ${esc(e.room)} · coef ${e.coef}</span></div></div>
      <div style="display:grid;gap:6px"><div class="between small"><span class="muted">Préparation (vidéo, résumé, quiz)</span><b class="num">${prep} %</b></div><div class="meter"><span style="width:${prep}%"></span></div></div>
      <div class="row"><button class="btn btn-ghost btn-sm" style="flex:1" data-act="openLesson" data-id="${e.lesson}">${ic('book', 16)} Réviser</button>
        ${L && L.quiz ? `<button class="btn btn-dark btn-sm" style="flex:1" data-act="examStart" data-id="${e.lesson}">${ic('clock', 16)} Contrôle blanc</button>` : ''}</div>
    </div>`;
  }).join('');
  const bars = RESULTS.map(r => `<div class="grow" style="${sv(r.subject)}"><span class="gl">${SUBJ[r.subject].short === 'Fr' ? 'Français' : SUBJ[r.subject].short === 'Ang' ? 'Anglais' : SUBJ[r.subject].short}</span>
    <div class="gtrack" role="img" aria-label="${esc(SUBJ[r.subject].name)} : ${fr1(r.grade)} sur 20, moyenne de la classe ${fr1(r.avg)}"><span class="gbar" style="width:${r.grade / 20 * 100}%"></span><span class="gavg" style="left:calc(${r.avg / 20 * 100}% - 1px)"></span></div>
    <span class="gv num">${fr1(r.grade)}</span></div>`).join('');
  const list = RESULTS.map(r => `<div class="li" style="${sv(r.subject)}"><span class="lic">${ic(SUBJ[r.subject].icon, 20)}</span>
    <span class="t"><b>${esc(r.title)}</b><span>${esc(SUBJ[r.subject].name)} · ${r.date} · coef ${r.coef} · classe ${fr1(r.avg)}</span></span>
    <span class="num" style="font:500 22px/1 var(--font-display)">${fr1(r.grade)}<small style="font-size:12px;color:var(--ink-3)">/20</small></span></div>`).join('');
  const blancs = P.exams.length ? `<div class="section"><h2 class="h-md">Mes contrôles blancs</h2><div class="list">${P.exams.slice(0, 4).map(x => `<div class="li" style="${sv(LMAP[x.lessonId].subject)}"><span class="lic">${ic('clock', 20)}</span><span class="t"><b>${esc(LMAP[x.lessonId].title)}</b><span>${mmss(x.secs)} sur 10:00 · ${x.score >= x.n * 0.6 ? 'validé' : 'à retravailler'}</span></span><b class="num">${x.score}/${x.n}</b></div>`).join('')}</div></div>` : '';
  return `<div class="screen">
    ${subHeader('Outils · 1er trimestre', 'Contrôle continu')}
    <div class="summary-dark">
      <div class="between" style="align-items:flex-end"><div><div class="small muted">Moyenne générale</div><div class="big num">${fr1(av.me)}<span style="font-size:18px;color:rgba(255,255,255,0.6)"> /20</span></div></div>
        <div style="text-align:right"><div class="small muted">Classe</div><div class="num" style="font:500 22px/1 var(--font-display)">${fr1(av.klass)}</div></div></div>
      <div class="small muted">${RESULTS.length} contrôles notés · moyenne pondérée par les coefficients</div>
    </div>
    <div class="section"><div class="section-head"><h2 class="h-md">À venir</h2><span class="faint small">${upcomingExams().length} contrôles</span></div><div class="stack">${ups}</div></div>
    <div class="section"><h2 class="h-md">Mes notes</h2>
      <div class="gradechart">${bars}<div class="legend"><span style="--c:#9333EA"><i></i>Ta note (couleur de la matière)</span><span><i class="tick"></i>Moyenne de la classe</span></div></div>
      <div class="list">${list}</div></div>
    ${blancs}
  </div>`;
};

/* ----- notifications ----- */
SCREENS.notifs = c => {
  const F = { all: 'Tout', cours: 'Cours', controles: 'Contrôles', edt: 'Emploi du temps' };
  const items = allNotifs().filter(n => c.notifFilter === 'all' || NOTIF_KIND[n.kind].filter === c.notifFilter);
  const groups = [...new Set(items.map(n => n.group))];
  const body = groups.map(g => `<div class="group-label">${g}</div><div class="list">${items.filter(n => n.group === g).map(n => {
    const k = NOTIF_KIND[n.kind];
    const unread = !P.read[n.id];
    return `<div class="li ${unread ? 'unread' : ''}" role="button" tabindex="0" style="--c:${k.c};--cs:${k.s}" data-act="notifOpen" data-id="${n.id}">
      <span class="lic">${ic(k.icon, 20)}</span><span class="t"><b>${esc(n.title)}</b><span>${esc(n.body)}</span><span class="faint" style="font-size:11.5px">${esc(n.when)}</span></span>${unread ? '<span class="udot" aria-label="Non lue"></span>' : '<span></span>'}</div>`;
  }).join('')}</div>`).join('');
  const unread = unreadCount();
  return `<div class="screen">
    ${subHeader('Outils', 'Notifications', unread ? `<button class="btn btn-ghost btn-sm" data-act="notifAllRead">${ic('check', 16)} Tout lire</button>` : '')}
    <div class="chips" style="margin-top:16px">${Object.keys(F).map(k => `<button class="chip ${c.notifFilter === k ? 'on' : ''}" data-act="notifFilter" data-f="${k}">${F[k]}</button>`).join('')}</div>
    <div class="stack" style="gap:10px;margin-top:8px">${body || '<p class="muted">Aucune notification dans cette catégorie.</p>'}</div>
  </div>`;
};

/* ----- progression (charts in brand colours) ----- */
let uid = 0;
function studyChart() {
  const W = 300, H = 178, ml = 30, mr = 4, mt = 20, mb = 24, max = 90;
  const ih = H - mt - mb, iw = W - ml - mr, step = iw / STUDY.length, bw = 22;
  const Y = v => mt + ih - v / max * ih;
  const id = 'c' + (++uid);
  let out = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Minutes d'étude par jour sur les 7 derniers jours, empilées par matière">`;
  [0, 30, 60, 90].forEach(v => { out += `<line x1="${ml}" x2="${W - mr}" y1="${Y(v)}" y2="${Y(v)}" style="stroke:var(--line)" stroke-width="1"/><text x="${ml - 6}" y="${Y(v) + 3.5}" text-anchor="end" font-size="10" font-weight="700" style="fill:var(--ink-3)">${v}</text>`; });
  out += `<text x="${ml - 6}" y="${mt - 8}" text-anchor="end" font-size="9" font-weight="700" style="fill:var(--ink-3)">min</text>`;
  STUDY.forEach((d, i) => {
    const x = ml + step * i + (step - bw) / 2;
    const tot = Object.values(d.m).reduce((a, b) => a + b, 0);
    out += `<clipPath id="${id}-${i}"><rect x="${x}" y="${Y(tot)}" width="${bw}" height="${Y(0) - Y(tot)}" rx="6"/></clipPath><g clip-path="url(#${id}-${i})">`;
    let acc = 0;
    STUDY_ORDER.forEach(k => { if (!d.m[k]) return; out += `<rect x="${x}" y="${Y(acc + d.m[k])}" width="${bw}" height="${Y(acc) - Y(acc + d.m[k])}" fill="${SUBJ[k].c}"><title>${SUBJ[k].name} : ${d.m[k]} min</title></rect>`; acc += d.m[k]; });
    out += `</g><text x="${x + bw / 2}" y="${Y(tot) - 6}" text-anchor="middle" font-size="9.5" font-weight="700" style="fill:var(--ink-2)">${tot}</text>`;
    out += `<text x="${x + bw / 2}" y="${H - 6}" text-anchor="middle" font-size="11" font-weight="${d.today ? 800 : 700}" style="fill:${d.today ? 'var(--ink)' : 'var(--ink-3)'}">${d.d}</text>`;
  });
  return out + '</svg>';
}
SCREENS.progress = () => {
  const total = STUDY.reduce((a, d) => a + Object.values(d.m).reduce((x, y) => x + y, 0), 0);
  const doneN = LESSONS.filter(L => progressOf(L) === 100).length;
  const quizN = LESSONS.filter(L => lp(L.id).quizPassed).length;
  const present = STUDY_ORDER.filter(k => STUDY.some(d => d.m[k]));
  const bySubj = SUBJECT_ORDER.map(k => {
    const ls = LESSONS.filter(L => L.subject === k);
    const v = ls.length ? Math.round(ls.reduce((a, L) => a + progressOf(L), 0) / ls.length) : 0;
    return `<div class="sbar" style="--c:${SUBJ[k].c}"><span>${SUBJ[k].name}</span><div class="meter" style="height:12px"><span style="width:${v}%"></span></div><span class="num" style="text-align:right">${v} %</span></div>`;
  }).join('');
  return `<div class="screen">
    ${subHeader('Outils', 'Ma progression')}
    <div class="kpi3"><div class="kpi"><span class="k">Temps d'étude</span><span class="v num">${fmtDur(total)}</span><span class="small faint">7 jours</span></div>
      <div class="kpi"><span class="k">Leçons finies</span><span class="v num">${doneN}<small style="font-size:14px">/${LESSONS.length}</small></span><span class="small faint">vidéo, résumé, quiz</span></div>
      <div class="kpi"><span class="k">Quiz validés</span><span class="v num">${quizN}</span><span class="small faint">60 % ou plus</span></div></div>
    <div class="section"><div class="chartcard"><div class="between"><h2 class="h-md">Temps d'étude par jour</h2><span class="tag">${ic('flame', 13)} 7 jours de suite</span></div>
      ${studyChart()}
      <div class="legend">${present.map(k => `<span style="--c:${SUBJ[k].c}"><i></i>${SUBJ[k].name}</span>`).join('')}</div></div></div>
    <div class="section"><div class="chartcard"><h2 class="h-md">Avancement par matière</h2>${bySubj}<p class="small faint" style="margin:0">Une leçon compte 100 % quand la vidéo est vue à 50 %, le résumé lu et le quiz validé.</p></div></div>
  </div>`;
};

/* ----- fiches ----- */
function ficheList(q) {
  const term = q.trim().toLowerCase();
  const rows = LESSONS.filter(L => !term || (L.title + ' ' + SUBJ[L.subject].name + ' ' + L.chapter).toLowerCase().includes(term));
  if (!rows.length) return '<p class="muted">Aucune fiche ne correspond.</p>';
  return rows.map(L => `<div class="li" role="button" tabindex="0" style="${sv(L.subject)}" data-act="openLesson" data-id="${L.id}" data-tab="resume">
    <span class="lic">${ic('file', 20)}</span><span class="t"><b>${esc(L.title)}</b><span>${esc(SUBJ[L.subject].name)} · ${esc(L.resume.read)} de lecture</span></span>
    ${lp(L.id).resumeRead ? `<span class="tag teal">${ic('check', 13)} Lu</span>` : `<span class="faint">${ic('right', 18)}</span>`}</div>`).join('');
}
SCREENS.fiches = c => `<div class="screen">
  ${subHeader('Outils', 'Fiches résumés')}
  <label class="search" for="fiche-q">${ic('search', 18)}<input id="fiche-q" type="search" placeholder="Chercher une leçon, une matière…" value="${esc(c.ficheQ)}" autocomplete="off"></label>
  <div class="list" id="fiche-list" style="margin-top:14px">${ficheList(c.ficheQ)}</div>
</div>`;

/* ----- minuteur ----- */
SCREENS.timer = () => {
  const r = 115, circ = 2 * Math.PI * r;
  return `<div class="screen">
    ${subHeader('Outils', 'Minuteur de révision')}
    <div class="seg" style="margin-top:16px"><button class="${T.mode === 'focus' ? 'on' : ''}" data-act="timerMode" data-m="focus">Travail · 25 min</button><button class="${T.mode === 'pause' ? 'on' : ''}" data-act="timerMode" data-m="pause">Pause · 5 min</button></div>
    <div class="timerface"><svg width="250" height="250" viewBox="0 0 250 250" aria-hidden="true"><circle cx="125" cy="125" r="${r}" fill="none" stroke="#E6DFEE" stroke-width="12"/><circle id="tring" cx="125" cy="125" r="${r}" fill="none" stroke="${T.mode === 'focus' ? '#9333EA' : '#088D84'}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - T.left / T.total)}"/></svg>
      <div style="display:grid;justify-items:center;gap:6px"><span class="tv num" id="tval">${pad2(Math.floor(T.left / 60))}:${pad2(T.left % 60)}</span><span class="small muted">Session ${T.cycle} sur 4</span></div></div>
    <div class="row" style="justify-content:center"><button class="btn btn-dark" id="tbtn" data-act="timerToggle" style="min-width:150px">${T.running ? ic('pause', 16) + ' Pause' : ic('play', 16) + ' Démarrer'}</button><button class="btn btn-ghost" data-act="timerReset">${ic('replay', 16)} Recommencer</button></div>
    <div class="rcard" style="margin-top:22px"><h3>Comment ça marche</h3><ul><li>25 minutes sur une seule matière, téléphone en mode avion.</li><li>5 minutes de pause pour bouger ou boire de l'eau.</li><li>Après 4 sessions, une vraie pause de 15 minutes.</li></ul></div>
  </div>`;
};

/* ----- paramètres ----- */
SCREENS.settings = () => {
  const st = P.settings;
  const row = (k, on, title, sub) => `<button class="setrow" data-act="setToggle" data-k="${k}" role="switch" aria-checked="${on}"><span><b>${title}</b><span>${sub}</span></span><span class="switch ${on ? 'on' : ''}"></span></button>`;
  return `<div class="screen">
    ${subHeader('Outils', 'Paramètres')}
    <div class="li" style="margin-top:18px;--cs:var(--brand-soft)"><span class="avatar">${STUDENT.initials}</span><span class="t"><b>${STUDENT.full}</b><span>${STUDENT.klass} · EducazenKids Agadir</span></span><span></span></div>
    <div class="group-label" style="margin-top:22px">Notifications</div>
    <div class="list">${row('notif.cours', st.notif.cours, 'Cours et vidéos', 'Nouvelles leçons, quiz à terminer')}${row('notif.controles', st.notif.controles, 'Contrôles et notes', 'Rappel la veille et le jour même')}${row('notif.edt', st.notif.edt, 'Emploi du temps', 'Changements de salle ou d\'horaire')}${row('notif.rappels', st.notif.rappels, 'Rappels de révision', 'Les créneaux que tu ajoutes')}</div>
    <div class="group-label" style="margin-top:22px">Lecture et confort</div>
    <div class="list">${row('dys', st.dys, 'Police lecture facile', 'Police Lexend, lettres plus espacées')}${row('calm', st.calm, 'Mode calme', 'Moins d\'animations')}</div>
    <div class="group-label" style="margin-top:22px">Démo</div>
    <button class="btn btn-ghost block" data-act="resetDemo">${ic('replay', 18)} Réinitialiser la démo</button>
    <p class="small faint" style="margin:8px 0 0">Efface la progression et les créneaux enregistrés dans ce navigateur.</p>
  </div>`;
};

/* ----- contact ----- */
SCREENS.contact = () => `<div class="screen">
  ${subHeader('Outils', 'Contacter le centre')}
  <div class="contact-logo"><img src="${LOGO_FULL}" alt="EducazenKids, l'enseignement sur mesure"></div>
  <div class="stack" style="margin-top:16px">
    <div class="copyrow"><span><span class="small faint" style="display:block;font-weight:700">Ligne en arabe</span><span class="v num">06 60 68 69 93</span></span><button class="iconbtn" data-act="copy" data-text="06 60 68 69 93" aria-label="Copier le numéro">${ic('copy', 18)}</button></div>
    <div class="copyrow"><span><span class="small faint" style="display:block;font-weight:700">Ligne en français</span><span class="v num">07 66 68 27 25</span></span><button class="iconbtn" data-act="copy" data-text="07 66 68 27 25" aria-label="Copier le numéro">${ic('copy', 18)}</button></div>
    <div class="li"><span class="lic" style="--c:var(--plum);--cs:#F7E3EE">${ic('pin', 20)}</span><span class="t"><b>EducazenKids</b><span>1er étage, immeuble Mouhib, avenue Alfarabi, Agadir 80000</span></span><span></span></div>
    <div class="rcard"><h3>Pôle psychosocial</h3><p>L'équipe peut t'aider à organiser tes révisions et à préparer tes contrôles. Demande un rendez-vous à l'accueil ou par téléphone.</p></div>
    <div class="row"><a class="btn btn-ghost btn-sm" style="flex:1;text-decoration:none" href="https://educazenkids.com" target="_blank" rel="noopener">${ic('ext', 16)} Site web</a><a class="btn btn-ghost btn-sm" style="flex:1;text-decoration:none" href="https://www.instagram.com/educazenkids/" target="_blank" rel="noopener">${ic('ext', 16)} Instagram</a></div>
  </div>
</div>`;

/* ----- sheets ----- */
function sheetHTML(c) {
  const sh = c.sheet;
  let inner = '';
  if (sh.type === 'event') {
    const e = eventById(sh.id);
    if (!e) return '';
    const sj = SUBJ[e.subject];
    const exam = e.kind === 'Contrôle';
    const L = e.lesson ? LMAP[e.lesson] : null;
    const len = toMin(e.end) - toMin(e.start);
    const rem = !!P.reminders[e.id];
    inner = `<div class="between"><span class="tag ${exam ? 'dark' : 'c'}" style="${sv(e.subject)}">${esc(e.kind)}</span><button class="iconbtn" data-act="closeSheet" aria-label="Fermer">${ic('x', 18)}</button></div>
      <div><h2 class="h-lg">${esc(e.title || sj.name)}</h2><p class="muted" style="margin:6px 0 0">${dayLong(e.day)} · ${e.start} – ${e.end}</p></div>
      <div class="kv">${e.room ? `<div class="between"><span>Salle</span><span>${esc(e.room)}</span></div>` : ''}${e.teacher ? `<div class="between"><span>Avec</span><span>${esc(e.teacher)}</span></div>` : ''}<div class="between"><span>Durée</span><span>${fmtDur(len)}</span></div>${exam ? `<div class="between"><span>Coefficient</span><span>${e.coef}</span></div>` : ''}</div>
      ${e.note ? `<div class="rcard warn" style="padding:14px"><p style="color:#A0175F;font-weight:700">${esc(e.note)}</p></div>` : ''}
      ${e.homework ? `<div class="rcard" style="padding:14px"><span class="eyebrow">Devoirs pour ce cours</span><p style="color:var(--ink);font-weight:600">${esc(e.homework)}</p></div>` : ''}
      ${exam && L ? `<div class="rcard" style="padding:14px;${sv(e.subject)}"><div class="between small"><span class="muted">Préparation</span><b class="num">${progressOf(L)} %</b></div><div class="meter"><span style="width:${progressOf(L)}%"></span></div>
        <div class="row"><button class="btn btn-ghost btn-sm" style="flex:1" data-act="openLesson" data-id="${L.id}">Réviser</button>${L.quiz ? `<button class="btn btn-dark btn-sm" style="flex:1" data-act="examStart" data-id="${L.id}">Contrôle blanc</button>` : ''}</div></div>` : ''}
      ${L && !exam ? `<div class="li" role="button" tabindex="0" style="${sv(L.subject)}" data-act="openLesson" data-id="${L.id}"><span class="lic">${ic('book', 20)}</span><span class="t"><b>${esc(L.title)}</b><span>Leçon liée · ${TYPE_LABEL[L.type]}</span></span><span class="faint">${ic('right', 18)}</span></div>` : ''}
      <button class="setrow" data-act="toggleReminder" data-id="${e.id}" role="switch" aria-checked="${rem}"><span><b>Me rappeler 10 min avant</b><span>Une notification avant le début</span></span><span class="switch ${rem ? 'on' : ''}"></span></button>
      ${e.subject === 'perso' ? `<button class="btn btn-ghost block" data-act="deleteEvent" data-id="${e.id}">${ic('trash', 18)} Supprimer ce créneau</button>` : ''}`;
  } else if (sh.type === 'add') {
    const days = WEEK.map(d => `<option value="${d.date}" ${d.date === c.day ? 'selected' : ''}>${d.long}</option>`).join('');
    inner = `<div class="between"><h2 class="h-lg">Nouveau créneau</h2><button class="iconbtn" data-act="closeSheet" aria-label="Fermer">${ic('x', 18)}</button></div>
      <form id="addForm" class="stack" novalidate>
        <div class="field"><label for="ev-title">Titre</label><input id="ev-title" name="title" value="Révision · Fonctions affines" maxlength="40" required></div>
        <div class="field"><label for="ev-kind">Type</label><select id="ev-kind" name="kind"><option>Révision</option><option>Devoir</option><option>Rappel</option></select></div>
        <div class="field"><label for="ev-day">Jour</label><select id="ev-day" name="day">${days}</select></div>
        <div class="field-row"><div class="field"><label for="ev-start">Début</label><input id="ev-start" name="start" type="time" value="17:30" min="07:00" max="22:00" required></div>
          <div class="field"><label for="ev-end">Fin</label><input id="ev-end" name="end" type="time" value="18:15" min="07:00" max="23:00" required></div></div>
        <label class="setrow" for="ev-rem"><span><b>Me rappeler 10 min avant</b><span>Une notification avant le début</span></span><input id="ev-rem" name="rem" type="checkbox" checked style="width:22px;height:22px;accent-color:#9333EA"></label>
        ${c.formError ? `<p class="form-error" role="alert">${esc(c.formError)}</p>` : ''}
        <button class="btn btn-dark block" type="submit">${ic('plus', 18)} Ajouter à mon emploi du temps</button>
      </form>`;
  }
  return `<div class="sheet-wrap"><div class="sheet-backdrop" data-act="closeSheet"></div><div class="sheet" role="dialog" aria-modal="true"><span class="grab"></span>${inner}</div></div>`;
}

/* ---------- phone composition ---------- */
const NAV_OF = { home: 'home', schedule: 'schedule', tools: 'tools', controle: 'tools', notifs: 'tools', progress: 'tools', fiches: 'tools', timer: 'tools', settings: 'tools', contact: 'tools' };
function navHTML(active) {
  const unread = unreadCount();
  const b = (to, icon, label) => {
    const on = active === to;
    const badge = to === 'tools' && unread && !on ? `<span class="badge num" style="top:-6px;right:-8px">${unread}</span>` : '';
    return `<button class="${on ? 'on' : ''}" data-act="nav" data-to="${to}" aria-label="${label}" ${on ? 'aria-current="page"' : ''}><span class="nb">${ic(icon, 22)}${badge}</span>${on ? `<span>${label}</span>` : ''}</button>`;
  };
  return `<nav class="nav" aria-label="Navigation principale">${b('home', 'book', 'Cours')}${b('schedule', 'calendar', 'Emploi du temps')}${b('tools', 'grid', 'Outils')}</nav>`;
}
function phoneInner(c) {
  const scr = SCREENS[c.screen] ? c.screen : 'home';
  const nav = NAV_OF[scr];
  return `<div class="statusbar"><span class="num">9:40</span>${STATUS_ICONS}</div>${SCREENS[scr](c)}${nav ? navHTML(nav) : ''}${c.sheet ? sheetHTML(c) : ''}`;
}

/* ---------- video ---------- */
const roundRect = (g, x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
const seg = (g, x1, y1, x2, y2) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); };
const dot = (g, x, y, r, col) => { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = col; g.fill(); };
const F_DISP = (px, w = 500) => `${w} ${px}px Fredoka, Quicksand, system-ui, sans-serif`;
const F_BODY = (px, w = 600) => `${w} ${px}px Quicksand, system-ui, sans-serif`;
function wrap(g, text, maxW) {
  const words = text.split(' '); const lines = []; let cur = '';
  words.forEach(w => { const tryL = cur ? cur + ' ' + w : w; if (g.measureText(tryL).width > maxW && cur) { lines.push(cur); cur = w; } else cur = tryL; });
  if (cur) lines.push(cur);
  return lines;
}
function sideText(g, x, y, lines) {
  lines.forEach((l, i) => {
    g.font = i === 0 ? F_DISP(15) : F_BODY(10.5, 600);
    g.fillStyle = i === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.72)';
    g.fillText(l, x, y + (i === 0 ? 0 : 6 + i * 15));
  });
}
const SCENES = {
  affine(g, W, H, t, ci, local) {
    const pink = '#F472C8', gold = '#F2AB19', lilac = '#C9A2FF';
    if (ci === 0 || ci === 4) {
      g.textAlign = 'center';
      if (ci === 0) {
        g.font = F_DISP(30);
        const parts = [['f(x) = ', '#fff'], ['a', pink], ['x + ', '#fff'], ['b', gold]];
        const total = parts.reduce((a, p) => a + g.measureText(p[0]).width, 0);
        let x = W / 2 - total / 2; g.textAlign = 'left';
        parts.forEach(p => { g.fillStyle = p[1]; g.fillText(p[0], x, H * 0.44); x += g.measureText(p[0]).width; });
        g.textAlign = 'center'; g.font = F_BODY(12);
        if (local > 60) { g.fillStyle = 'rgba(255,255,255,0.75)'; g.fillText('a et b : deux nombres fixés', W / 2, H * 0.44 + 26); }
        if (local > 95) { g.fillStyle = lilac; g.fillText('Exemple : f(x) = 2x + 1', W / 2, H * 0.44 + 44); }
      } else {
        g.font = F_DISP(22); g.fillStyle = '#fff'; g.fillText('g(x) = −3x + 4', W / 2, H * 0.32);
        g.font = F_DISP(18); g.fillStyle = 'rgba(255,255,255,0.8)'; g.fillText('g(2) = ?', W / 2, H * 0.32 + 30);
        if (local > 45) { g.fillStyle = lilac; g.fillText('= −3 × 2 + 4', W / 2, H * 0.32 + 56); }
        if (local > 85) { g.fillStyle = gold; g.fillText('= −2', W / 2, H * 0.32 + 82); }
      }
      g.textAlign = 'left';
      return;
    }
    const box = { x: 20, y: 30, w: W * 0.54, h: H - 74 };
    const xr = [-1, 4], yr = [-1, 7];
    const X = v => box.x + (v - xr[0]) / (xr[1] - xr[0]) * box.w;
    const Y = v => box.y + box.h - (v - yr[0]) / (yr[1] - yr[0]) * box.h;
    g.strokeStyle = 'rgba(255,255,255,0.08)'; g.lineWidth = 1;
    for (let x = xr[0]; x <= xr[1]; x++) seg(g, X(x), box.y, X(x), box.y + box.h);
    for (let y = yr[0]; y <= yr[1]; y++) seg(g, box.x, Y(y), box.x + box.w, Y(y));
    g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 1.4;
    seg(g, X(xr[0]), Y(0), X(xr[1]), Y(0)); seg(g, X(0), Y(yr[0]), X(0), Y(yr[1]));
    const tx = box.x + box.w + 14;
    g.save(); g.beginPath(); g.rect(box.x, box.y, box.w, box.h); g.clip();
    const line = (a, b, col, wdt) => { g.strokeStyle = col; g.lineWidth = wdt; seg(g, X(xr[0]), Y(a * xr[0] + b), X(xr[1]), Y(a * xr[1] + b)); };
    if (ci === 1) {
      line(2, 1, lilac, 2.6);
      g.lineWidth = 2.2; g.strokeStyle = gold; seg(g, X(1), Y(3), X(2), Y(3));
      g.strokeStyle = pink; seg(g, X(2), Y(3), X(2), Y(5));
      if (local > 115) line(-1.5, 5, pink, 2.2);
      g.restore();
      g.font = F_BODY(10, 700); g.fillStyle = gold; g.fillText('+1', X(1.35), Y(3) + 12);
      g.fillStyle = pink; g.fillText('+2', X(2) + 5, Y(4));
      sideText(g, tx, H * 0.36, local > 115 ? ['a < 0 : elle', 'descend', 'a > 0 : elle monte'] : ['f(x) = 2x + 1', 'a = 2 : la pente', '+1 en x → +2 en y']);
      return;
    }
    if (ci === 2) {
      const b = 1 + 2 * Math.sin(local / 3);
      line(2, b, lilac, 2.6);
      g.restore();
      dot(g, X(0), Y(b), 5, gold);
      g.font = F_BODY(10, 700); g.fillStyle = gold; g.fillText('(0 ; b)', X(0) + 8, Y(b) - 6);
      sideText(g, tx, H * 0.36, [`b = ${fr1(b)}`, 'b = f(0)', "coupe l'axe des y"]);
      return;
    }
    const p = clamp((local - 120) / 30, 0, 1);
    if (p > 0) { g.strokeStyle = lilac; g.lineWidth = 2.6; seg(g, X(-0.5), Y(0), X(-0.5 + 4 * p), Y(2 * (-0.5 + 4 * p) + 1)); }
    g.restore();
    if (local > 40) { dot(g, X(0), Y(1), 5, gold); g.font = F_BODY(10, 700); g.fillStyle = gold; g.fillText('A(0 ; 1)', X(0) + 8, Y(1) + 4); }
    if (local > 90) { dot(g, X(2), Y(5), 5, pink); g.font = F_BODY(10, 700); g.fillStyle = pink; g.fillText('B(2 ; 5)', X(2) + 8, Y(5) + 4); }
    sideText(g, tx, H * 0.36, ['2 points', 'f(0) = 1 → A', 'f(2) = 5 → B']);
  },
  triangle(g, W, H, t, ci, local) {
    const A = { x: W * 0.3, y: 34 }, B = { x: W * 0.06, y: H - 44 }, C = { x: W * 0.56, y: H - 44 };
    const k = 0.48 + (ci === 2 ? 0.12 * Math.sin(local / 4) : 0);
    const M = { x: A.x + (B.x - A.x) * k, y: A.y + (B.y - A.y) * k }, N = { x: A.x + (C.x - A.x) * k, y: A.y + (C.y - A.y) * k };
    g.strokeStyle = '#fff'; g.lineWidth = 2; g.beginPath(); g.moveTo(A.x, A.y); g.lineTo(B.x, B.y); g.lineTo(C.x, C.y); g.closePath(); g.stroke();
    g.strokeStyle = '#F472C8'; g.lineWidth = 2.6; seg(g, M.x, M.y, N.x, N.y);
    g.font = F_BODY(11, 700); g.fillStyle = '#fff';
    [['A', A, 0, -6], ['B', B, -12, 4], ['C', C, 6, 4], ['M', M, -14, 0], ['N', N, 6, 0]].forEach(([l, p, dx, dy]) => g.fillText(l, p.x + dx, p.y + dy));
    const tx = W * 0.62;
    sideText(g, tx, H * 0.34, [['(MN) // (BC)', 'les deux droites', 'sont parallèles'], ['AM/AB = AN/AC', '= MN/BC', 'rapports égaux'], ['MN = BC × AM/AB', 'produit en croix', ''], ['Rapports égaux', '⇒ (MN) // (BC)', 'la réciproque']][ci]);
  },
  circuit(g, W, H, t, ci) {
    const x0 = 24, y0 = 40, w = W * 0.48, h = H - 92;
    g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 2; g.strokeRect(x0, y0, w, h);
    g.fillStyle = '#1C1529'; g.fillRect(x0 + w * 0.35, y0 - 9, w * 0.3, 18); g.strokeStyle = '#F2AB19'; g.strokeRect(x0 + w * 0.35, y0 - 9, w * 0.3, 18);
    g.font = F_BODY(10, 700); g.fillStyle = '#F2AB19'; g.fillText('R', x0 + w * 0.48, y0 + 4);
    g.fillStyle = '#1C1529'; g.fillRect(x0 - 8, y0 + h * 0.35, 16, h * 0.3);
    g.strokeStyle = '#fff'; seg(g, x0 - 9, y0 + h * 0.45, x0 + 9, y0 + h * 0.45); g.lineWidth = 3.5; seg(g, x0 - 5, y0 + h * 0.56, x0 + 5, y0 + h * 0.56); g.lineWidth = 2;
    dot(g, x0 + w, y0 + h / 2, 11, '#1C1529'); g.strokeStyle = '#2DD4BF'; g.beginPath(); g.arc(x0 + w, y0 + h / 2, 11, 0, Math.PI * 2); g.stroke();
    g.fillStyle = '#2DD4BF'; g.fillText('A', x0 + w - 3.5, y0 + h / 2 + 4);
    const per = 2 * (w + h);
    for (let i = 0; i < 9; i++) {
      let d = ((t * 18) + i * per / 9) % per; let px, py;
      if (d < w) { px = x0 + d; py = y0; } else if ((d -= w) < h) { px = x0 + w; py = y0 + d; } else if ((d -= h) < w) { px = x0 + w - d; py = y0 + h; } else { d -= w; px = x0; py = y0 + h - d; }
      dot(g, px, py, 2.4, '#C9A2FF');
    }
    sideText(g, W * 0.6, H * 0.34, [['U en volts', 'I en ampères', 'voltmètre, ampèremètre'], ['R en ohms (Ω)', "s'oppose au courant", ''], ['U = R × I', 'loi d\'Ohm', 'U en V, R en Ω, I en A'], ['U = f(I)', 'une droite', "qui passe par l'origine"]][ci]);
  },
  timeline(g, W, H, t, ci, local) {
    const y = H * 0.5, x0 = 24, x1 = W - 24;
    g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = 2; seg(g, x0, y, x1, y);
    g.font = F_BODY(10, 700); g.fillStyle = 'rgba(255,255,255,0.6)'; g.fillText('PAST', x0, y + 18); g.fillText('NOW', x1 - 26, y + 18);
    dot(g, x1 - 14, y, 5, '#F2AB19');
    if (ci === 0 || ci === 1) { const s = x0 + (x1 - x0) * 0.3; g.strokeStyle = '#F472C8'; g.lineWidth = 6; seg(g, s, y, x1 - 14, y); dot(g, s, y, 5, '#F472C8'); g.fillStyle = '#F472C8'; g.fillText(ci === 0 ? 'I have lived here' : 'since 2020', s, y - 12); }
    if (ci === 2) { [0.2, 0.45, 0.7].forEach(f => dot(g, x0 + (x1 - x0) * f, y, 5, '#C9A2FF')); g.fillStyle = '#C9A2FF'; g.fillText('Have you ever…?', x0 + (x1 - x0) * 0.2, y - 12); }
    if (ci === 3) { const s = x0 + (x1 - x0) * 0.55; dot(g, s, y, 6, '#2DD4BF'); g.fillStyle = '#2DD4BF'; g.fillText('yesterday → past simple', s - 40, y - 12); }
    g.textAlign = 'center'; g.font = F_DISP(17); g.fillStyle = '#fff';
    g.fillText(['have / has + past participle', 'since · for · this week', 'ever · never', 'finished time = past simple'][ci], W / 2, 52);
    g.textAlign = 'left';
  },
};
function drawVideo(cv, L, t, cc) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = cv.clientWidth || 342, H = cv.clientHeight || 192;
  if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
  const g = cv.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const sj = SUBJ[L.subject];
  const bg = g.createLinearGradient(0, 0, W, H); bg.addColorStop(0, '#1C1529'); bg.addColorStop(1, mix(sj.c, '#1C1529', 0.55));
  g.fillStyle = bg; g.fillRect(0, 0, W, H);
  const glow = g.createRadialGradient(W * 0.9, 0, 4, W * 0.9, 0, W * 0.7); glow.addColorStop(0, hexA(sj.c, 0.45)); glow.addColorStop(1, hexA(sj.c, 0));
  g.fillStyle = glow; g.fillRect(0, 0, W, H);
  const chs = L.video.chapters;
  let ci = 0; chs.forEach((c, i) => { if (t >= c.t) ci = i; });
  g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  g.font = F_BODY(9.5, 700); g.fillStyle = 'rgba(255,255,255,0.6)';
  g.fillText(`${ci + 1}/${chs.length} · ${chs[ci].title.toUpperCase()}`, 14, 20);
  g.textAlign = 'right'; g.fillText(L.teacher, W - 14, 20); g.textAlign = 'left';
  (SCENES[L.video.scene] || (() => {}))(g, W, H, t, ci, t - chs[ci].t);
  if (cc) {
    let cap = null; L.video.captions.forEach(c => { if (t >= c.t) cap = c; });
    if (cap) {
      g.font = F_BODY(11, 600);
      const lines = wrap(g, nb(cap.x), W - 60).slice(0, 2);
      const lh = 15, bh = lines.length * lh + 10, bw = Math.max(...lines.map(l => g.measureText(l).width)) + 20;
      const x = (W - bw) / 2, y = H - bh - 8;
      g.fillStyle = 'rgba(10,6,18,0.74)'; roundRect(g, x, y, bw, bh, 8); g.fill();
      g.fillStyle = '#fff'; g.textAlign = 'center'; lines.forEach((l, i) => g.fillText(l, W / 2, y + 16 + i * lh)); g.textAlign = 'left';
    }
  }
}
function ensureVideo(L) {
  if (V.id === L.id && V.w) return;
  if (V.playing) pauseVideo();
  const p = lp(L.id);
  V.id = L.id;
  V.w = Uint8Array.from(p.w, ch => (ch === '1' ? 1 : 0));
  V.count = V.w.reduce((a, b) => a + b, 0);
  V.t = Math.min(p.pos || 0, L.video.duration - 1);
  V.unlocked = V.count >= L.video.duration / 2;
}
function persistVideo() {
  if (!V.id || !V.w) return;
  const p = lp(V.id);
  p.w = V.w.join('');
  p.pos = Math.floor(V.t);
  save();
}
function updateVideoUI() {
  const L = LMAP[V.id];
  if (!L || S.screen !== 'lesson' || S.lessonId !== V.id || S.tab !== 'video') return;
  const dur = L.video.duration;
  const cv = $('#vcanvas'); if (cv) drawVideo(cv, L, V.t, V.cc);
  const set = (sel, fn) => { const el = $(sel); if (el) fn(el); };
  set('#vtime', el => { el.textContent = `${mmss(V.t)} / ${mmss(dur)}`; });
  set('#vhead', el => { el.style.left = `${V.t / dur * 100}%`; });
  set('#vtrack', el => el.setAttribute('aria-valuenow', Math.floor(V.t)));
  set('#vplay', el => { el.innerHTML = ic(V.playing ? 'pause' : 'play', 14); el.setAttribute('aria-label', V.playing ? 'Pause' : 'Lecture'); });
  set('#bigplay', el => { el.hidden = V.playing; });
  const now = performance.now();
  if (now - V.segAt > 300) { V.segAt = now; set('#vseen', el => { el.innerHTML = seenHTML(V.w, dur); }); }
  let ci = 0; L.video.chapters.forEach((c, i) => { if (V.t >= c.t) ci = i; });
  document.querySelectorAll('#app .chapter').forEach((el, i) => el.classList.toggle('on', i === ci));
  const pb = progBtn(L);
  set('#vpct', el => { el.textContent = `${watchedPct(L)} %`; });
  set('#vnote', el => { el.textContent = pb.note; });
  set('#progbtn', el => { el.classList.toggle('ready', pb.ready); if (pb.ready) el.removeAttribute('aria-disabled'); else el.setAttribute('aria-disabled', 'true'); });
  set('#progfill', el => { el.style.width = `${pb.fill}%`; });
  set('#proglbl', el => { if (el.dataset.l !== pb.label) { el.innerHTML = pb.label; el.dataset.l = pb.label; } });
  set('#step-video', el => { if (pb.ready && !el.classList.contains('done')) { el.classList.add('done'); el.innerHTML = `${ic('check', 14)} Vidéo vue à 50 %`; } });
  set('#tab-quiz', el => { if (pb.ready && el.classList.contains('locked')) { el.classList.remove('locked'); el.innerHTML = 'Quiz'; } });
}
function vTick(ts) {
  if (!V.playing) return;
  const L = LMAP[V.id], dur = L.video.duration;
  const dt = V.last ? Math.min((ts - V.last) / 1000, 0.25) : 0;
  V.last = ts;
  const prev = V.t;
  V.t = Math.min(dur, V.t + dt * V.rate);
  for (let s = Math.floor(prev); s < Math.floor(V.t) && s < dur; s++) if (!V.w[s]) { V.w[s] = 1; V.count++; }
  if (!V.unlocked && V.count >= dur / 2) {
    V.unlocked = true;
    persistVideo();
    toast('Quiz débloqué : tu as vu la moitié de la vidéo.');
  }
  if (ts - V.lastSave > 2000) { V.lastSave = ts; persistVideo(); }
  updateVideoUI();
  if (V.t >= dur) { pauseVideo(); toast('Vidéo terminée. Ta progression est enregistrée.'); return; }
  V.raf = requestAnimationFrame(vTick);
}
function playVideo() {
  const L = LMAP[V.id]; if (!L) return;
  if (V.t >= L.video.duration - 0.5) V.t = 0;
  V.playing = true; V.last = 0;
  V.raf = requestAnimationFrame(vTick);
  updateVideoUI();
}
function pauseVideo() {
  if (!V.playing) return;
  V.playing = false; cancelAnimationFrame(V.raf); V.last = 0;
  persistVideo();
  updateVideoUI();
}

/* ---------- toast ---------- */
let toastTimer = 0;
function toast(msg) {
  const app = $('#app');
  const old = app.querySelector('.toast'); if (old) old.remove();
  const el = document.createElement('div');
  el.className = 'toast'; el.setAttribute('role', 'status');
  el.innerHTML = `${ic('check', 18)}<span>${esc(msg)}</span>`;
  app.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.classList.add('hide'); setTimeout(() => el.remove(), 350); }, 2800);
}

/* ---------- render ---------- */
function render(resetScroll) {
  const app = $('#app');
  const key = [S.screen, S.lessonId, S.tab, S.schedView, S.quiz ? S.quiz.i : ''].join('|');
  const old = app.querySelector('.screen');
  const keep = !resetScroll && old && app.dataset.key === key ? old.scrollTop : 0;
  if (V.playing && !(S.screen === 'lesson' && S.tab === 'video' && S.lessonId === V.id)) pauseVideo();
  if (S.screen === 'lesson' && LMAP[S.lessonId] && LMAP[S.lessonId].video) ensureVideo(LMAP[S.lessonId]);
  app.innerHTML = phoneInner(S);
  app.dataset.key = key;
  app.classList.toggle('dys', !!P.settings.dys);
  app.classList.toggle('calm', !!P.settings.calm);
  const scr = app.querySelector('.screen'); if (scr) scr.scrollTop = keep;
  if (S.screen === 'lesson' && S.tab === 'video') updateVideoUI();
}
function snap() { return { screen: S.screen, lessonId: S.lessonId, tab: S.tab, day: S.day, schedView: S.schedView, subject: S.subject }; }
function go(patch) {
  S.stack.push(snap());
  Object.assign(S, patch);
  S.sheet = patch.sheet || null;
  S.formError = '';
  render(true);
}
function back() {
  const prev = S.stack.pop();
  S.sheet = null; S.quiz = null; stopExamTimer();
  if (prev) Object.assign(S, prev); else S.screen = 'home';
  render(true);
}
function openLesson(id, tab) {
  const L = LMAP[id]; if (!L) return;
  P.last = id; save();
  const tabs = L.type === 'vqr' ? ['video', 'resume', 'quiz'] : L.type === 'rq' ? ['resume', 'quiz'] : ['resume'];
  go({ screen: 'lesson', lessonId: id, tab: tabs.includes(tab) ? tab : tabs[0] });
}

/* ---------- quiz flow ---------- */
function startQuiz(id, mode) {
  const L = LMAP[id];
  if (!L || !L.quiz) return;
  if (mode !== 'exam' && !quizUnlocked(L)) { toast('Regarde au moins la moitié de la vidéo pour débloquer le quiz.'); return; }
  pauseVideo();
  if (S.screen !== 'quiz') S.stack.push(snap());
  S.screen = 'quiz'; S.sheet = null;
  S.quiz = { lessonId: id, mode, i: 0, picks: [], sel: null, checked: false, done: false, started: Date.now(), deadline: mode === 'exam' ? Date.now() + 600000 : null };
  render(true);
  if (mode === 'exam') startExamTimer();
}
function finishQuiz() {
  const q = S.quiz, L = LMAP[q.lessonId];
  const score = L.quiz.reduce((a, x, k) => a + (q.picks[k] === x.a ? 1 : 0), 0);
  const passed = score / L.quiz.length >= 0.6;
  const p = lp(L.id);
  p.quizBest = Math.max(p.quizBest || 0, score);
  if (passed) p.quizPassed = true;
  q.done = true;
  if (q.mode === 'exam') {
    q.usedSec = Math.min(600, Math.round((Date.now() - q.started) / 1000));
    P.exams.unshift({ lessonId: L.id, score, n: L.quiz.length, secs: q.usedSec });
    stopExamTimer();
  }
  P.extraNotifs.unshift({ id: 'q' + Date.now(), kind: 'cours', when: "À l'instant", group: "À l'instant", title: passed ? `Quiz validé · ${L.title}` : `Quiz à retravailler · ${L.title}`, body: `Score ${score}/${L.quiz.length}. Ta progression est enregistrée.`, to: { screen: 'lesson', lessonId: L.id, tab: 'resume' } });
  P.read[P.extraNotifs[0].id] = true;
  save();
  render(true);
}
function startExamTimer() {
  stopExamTimer();
  examIv = setInterval(() => {
    const q = S.quiz;
    if (!q || q.mode !== 'exam' || q.done) { stopExamTimer(); return; }
    const left = Math.max(0, Math.round((q.deadline - Date.now()) / 1000));
    const el = $('#quiztimer'); if (el) el.innerHTML = `${ic('clock', 15)} ${mmss(left)}`;
    if (left <= 0) { if (q.checked) q.picks[q.i] = q.sel; finishQuiz(); toast('Temps écoulé : ta copie est rendue.'); }
  }, 1000);
}
function stopExamTimer() { clearInterval(examIv); examIv = 0; }

/* ---------- timer ---------- */
function updateTimerUI() {
  const v = $('#tval'); if (v) v.textContent = `${pad2(Math.floor(T.left / 60))}:${pad2(T.left % 60)}`;
  const r = $('#tring'); if (r) { const circ = 2 * Math.PI * 115; r.setAttribute('stroke-dashoffset', circ * (1 - T.left / T.total)); }
  const b = $('#tbtn'); if (b) b.innerHTML = T.running ? `${ic('pause', 16)} Pause` : `${ic('play', 16)} Démarrer`;
}
function timerStop() { clearInterval(T.iv); T.iv = 0; T.running = false; }
function timerTick() {
  T.left -= 1;
  if (T.left <= 0) {
    timerStop();
    if (T.mode === 'focus') { T.mode = 'pause'; T.total = T.left = 300; toast('Session terminée. Pause de 5 minutes !'); }
    else { T.mode = 'focus'; T.total = T.left = 1500; T.cycle = T.cycle % 4 + 1; toast('Pause finie. Prêt pour la session suivante ?'); }
    if (S.screen === 'timer') render();
    return;
  }
  updateTimerUI();
}

/* ---------- actions ---------- */
const JUMP = {
  splash: { screen: 'splash' }, home: { screen: 'home' }, video: { screen: 'lesson', lessonId: 'affine', tab: 'video' },
  resume: { screen: 'lesson', lessonId: 'affine', tab: 'resume' }, schedule: { screen: 'schedule', schedView: 'day', day: TODAY },
  controle: { screen: 'controle' }, notifs: { screen: 'notifs' }, tools: { screen: 'tools' }, progress: { screen: 'progress' }, settings: { screen: 'settings' },
};
const ACTIONS = {
  nav: d => { S.stack = []; S.sheet = null; S.quiz = null; stopExamTimer(); S.screen = d.to; if (d.to === 'schedule') { S.day = S.day || TODAY; } render(true); },
  go: d => go({ screen: d.to }),
  back: () => back(),
  jump: d => { showGallery(false); S = Object.assign(S0(), JUMP[d.to] || {}); stopExamTimer(); render(true); },
  subject: d => { S.subject = d.s; render(); },
  openLesson: d => openLesson(d.id, d.tab),
  tab: d => {
    const L = LMAP[S.lessonId];
    if (d.tab === 'quiz' && !quizUnlocked(L)) toast('Regarde au moins la moitié de la vidéo pour débloquer le quiz.');
    S.tab = d.tab; render(true);
  },
  vplay: () => { if (V.playing) pauseVideo(); else playVideo(); },
  vspeed: () => { const R = [1, 1.5, 2, 10]; V.rate = R[(R.indexOf(V.rate) + 1) % R.length]; const el = $('#vspeed'); if (el) el.textContent = V.rate === 10 ? 'Démo ×10' : `${String(V.rate).replace('.', ',')}×`; },
  vcc: (d, el) => { V.cc = !V.cc; el.classList.toggle('on', V.cc); el.setAttribute('aria-pressed', V.cc); updateVideoUI(); },
  vchapter: d => { V.t = +d.t; V.last = 0; persistVideo(); updateVideoUI(); },
  startQuiz: d => startQuiz(d.id, 'lesson'),
  examStart: d => startQuiz(d.id, 'exam'),
  qpick: d => { if (!S.quiz.checked) { S.quiz.sel = +d.i; render(); } },
  qcheck: () => { const q = S.quiz; if (q.sel == null) return; q.checked = true; q.picks[q.i] = q.sel; render(); },
  qnext: () => { const q = S.quiz, n = LMAP[q.lessonId].quiz.length; if (q.i < n - 1) { q.i++; q.sel = null; q.checked = false; render(true); } else finishQuiz(); },
  quizClose: () => back(),
  quizRetry: () => { const q = S.quiz; S.screen = 'quiz'; startQuiz(q.lessonId, q.mode); },
  quizToLesson: d => { const id = S.quiz.lessonId; stopExamTimer(); S.quiz = null; S.stack.pop(); S.screen = 'lesson'; S.lessonId = id; S.tab = d.tab; render(true); },
  resumeRead: d => { const L = LMAP[d.id]; lp(L.id).resumeRead = true; save(); render(); toast(L.type === 'r' ? 'Leçon terminée. Progression enregistrée.' : 'Résumé lu. Progression enregistrée.'); },
  day: d => { S.day = d.d; render(); },
  schedView: d => { S.schedView = d.v; render(true); },
  openEvent: d => { if (S.screen !== 'schedule') { S.stack.push(snap()); S.screen = 'schedule'; S.schedView = 'day'; } if (d.day) S.day = d.day; S.sheet = { type: 'event', id: d.id }; render(); },
  closeSheet: () => { S.sheet = null; S.formError = ''; render(); },
  addEvent: () => { S.sheet = { type: 'add' }; S.formError = ''; render(); },
  toggleReminder: d => { P.reminders[d.id] = !P.reminders[d.id]; save(); render(); toast(P.reminders[d.id] ? 'Rappel activé : 10 min avant.' : 'Rappel désactivé.'); },
  deleteEvent: d => { P.events = P.events.filter(e => e.id !== d.id); delete P.reminders[d.id]; save(); S.sheet = null; render(); toast('Créneau supprimé.'); },
  notifOpen: d => { const n = allNotifs().find(x => x.id === d.id); if (!n) return; P.read[n.id] = true; save(); if (n.to.screen === 'lesson') openLesson(n.to.lessonId, n.to.tab); else if (n.to.sheet) { S.stack.push(snap()); Object.assign(S, { screen: n.to.screen, day: n.to.day, schedView: 'day', sheet: n.to.sheet }); render(true); } else go({ screen: n.to.screen, day: n.to.day || S.day }); },
  notifAllRead: () => { allNotifs().forEach(n => { P.read[n.id] = true; }); save(); render(); toast('Toutes les notifications sont lues.'); },
  notifFilter: d => { S.notifFilter = d.f; render(); },
  timerToggle: () => { if (T.running) timerStop(); else { T.running = true; T.iv = setInterval(timerTick, 1000); } updateTimerUI(); },
  timerReset: () => { timerStop(); T.left = T.total; updateTimerUI(); },
  timerMode: d => { timerStop(); T.mode = d.m; T.total = T.left = d.m === 'focus' ? 1500 : 300; render(); },
  setToggle: d => { const st = P.settings; if (d.k.startsWith('notif.')) { const k = d.k.slice(6); st.notif[k] = !st.notif[k]; } else st[d.k] = !st[d.k]; save(); render(); },
  resetDemo: () => { pauseVideo(); timerStop(); stopExamTimer(); P = seed(); save(); V.id = null; V.w = null; V.rate = 1; T.mode = 'focus'; T.total = T.left = 1500; T.cycle = 1; const sc = S.screen === 'splash' ? 'home' : S.screen; S = S0(); S.screen = sc === 'quiz' || sc === 'lesson' ? 'home' : sc; render(true); toast('Démo réinitialisée.'); },
  copy: d => { const done = () => toast('Numéro copié.'); try { navigator.clipboard.writeText(d.text).then(done, () => toast('Sélectionne le numéro pour le copier.')); } catch (e) { toast('Sélectionne le numéro pour le copier.'); } },
  gallery: d => showGallery(d.on === '1'),
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el || el.closest('#gallery')) return;
  const fn = ACTIONS[el.dataset.act];
  if (!fn) return;
  e.preventDefault();
  fn(el.dataset, el);
});
document.addEventListener('keydown', e => {
  const el = e.target;
  if ((e.key === 'Enter' || e.key === ' ') && el.matches && el.matches('[role="button"][data-act]')) { e.preventDefault(); el.click(); }
  if (el.id === 'vtrack' && V.id && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
    e.preventDefault();
    V.t = clamp(V.t + (e.key === 'ArrowRight' ? 10 : -10), 0, LMAP[V.id].video.duration); V.last = 0; updateVideoUI();
  }
  if (e.key === 'Escape' && S.sheet) { S.sheet = null; render(); }
});
let seeking = false;
function seekTo(e, tr) {
  const r = tr.getBoundingClientRect();
  V.t = clamp((e.clientX - r.left) / r.width, 0, 1) * LMAP[V.id].video.duration;
  V.last = 0;
  updateVideoUI();
}
document.addEventListener('pointerdown', e => {
  const tr = e.target.closest && e.target.closest('#vtrack');
  if (!tr || tr.closest('#gallery') || !V.id) return;
  seeking = true;
  try { tr.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
  seekTo(e, tr);
});
document.addEventListener('pointermove', e => { if (seeking) { const tr = $('#vtrack'); if (tr) seekTo(e, tr); } });
document.addEventListener('pointerup', () => { if (seeking) { seeking = false; persistVideo(); } });
document.addEventListener('submit', e => {
  if (e.target.id !== 'addForm') return;
  e.preventDefault();
  const f = new FormData(e.target);
  const title = String(f.get('title') || '').trim();
  const start = String(f.get('start') || ''), end = String(f.get('end') || ''), day = String(f.get('day') || TODAY), kind = String(f.get('kind') || 'Révision');
  if (!title) { S.formError = 'Donne un titre à ce créneau.'; render(); return; }
  if (!start || !end || toMin(end) <= toMin(start)) { S.formError = "L'heure de fin doit être après l'heure de début."; render(); return; }
  const id = 'p' + Date.now();
  P.events.push({ id, day, start, end, subject: 'perso', kind, title, room: '', teacher: '' });
  if (f.get('rem')) P.reminders[id] = true;
  P.extraNotifs.unshift({ id: 'a' + Date.now(), kind: 'edt', when: "À l'instant", group: "À l'instant", title: 'Créneau ajouté', body: `${title} · ${dayLong(day)} · ${start}`, to: { screen: 'schedule', day, sheet: { type: 'event', id } } });
  save();
  S.sheet = null; S.formError = ''; S.day = day; S.schedView = 'day';
  render();
  toast('Ajouté à ton emploi du temps.');
});
document.addEventListener('scroll', e => {
  const t = e.target;
  if (t && t.classList && t.classList.contains('screen') && t.parentElement && t.parentElement.id === 'app') t.parentElement.classList.toggle('scrolled', t.scrollTop > 4);
}, true);
document.addEventListener('input', e => {
  if (e.target.id === 'fiche-q') { S.ficheQ = e.target.value; const l = $('#fiche-list'); if (l) l.innerHTML = ficheList(S.ficheQ); }
});

/* ---------- gallery: every screen side by side ---------- */
const GALLERY = [
  ['Connexion', { screen: 'splash' }],
  ['Accueil', { screen: 'home' }],
  ['Leçon vidéo · quiz verrouillé', { screen: 'lesson', lessonId: 'affine', tab: 'video', vt: 80 }],
  ['Leçon vidéo · quiz débloqué', { screen: 'lesson', lessonId: 'thales', tab: 'video', vt: 200 }],
  ['Résumé', { screen: 'lesson', lessonId: 'affine', tab: 'resume' }],
  ['Leçon résumé + quiz', { screen: 'lesson', lessonId: 'produit-nul', tab: 'quiz' }],
  ['Quiz · correction', { screen: 'quiz', quiz: { lessonId: 'affine', mode: 'lesson', i: 1, picks: [0, 1], sel: 1, checked: true } }],
  ['Résultat du quiz', { screen: 'quiz', quiz: { lessonId: 'affine', mode: 'lesson', i: 4, picks: [0, 2, 1, 0, 1], done: true } }],
  ['Emploi du temps · jour', { screen: 'schedule', schedView: 'day', day: TODAY }],
  ['Emploi du temps · semaine', { screen: 'schedule', schedView: 'week' }],
  ['Détail du contrôle', { screen: 'schedule', schedView: 'day', day: TODAY, sheet: { type: 'event', id: 'm4' } }],
  ['Ajouter une révision', { screen: 'schedule', schedView: 'day', day: '2026-10-14', sheet: { type: 'add' } }],
  ['Outils', { screen: 'tools' }],
  ['Contrôle continu', { screen: 'controle' }],
  ['Contrôle blanc chronométré', { screen: 'quiz', quiz: { lessonId: 'affine', mode: 'exam', i: 2, picks: [0, 2], sel: null, checked: false, deadline: Date.now() + 452000 } }],
  ['Notifications', { screen: 'notifs' }],
  ['Ma progression', { screen: 'progress' }],
  ['Fiches résumés', { screen: 'fiches' }],
  ['Minuteur', { screen: 'timer' }],
  ['Paramètres', { screen: 'settings' }],
  ['Contacter le centre', { screen: 'contact' }],
];
function showGallery(on) {
  $('#stage').hidden = on;
  $('#gallery-wrap').hidden = !on;
  if (!on) return;
  pauseVideo();
  const g = $('#gallery');
  g.innerHTML = GALLERY.map(([label, patch]) => {
    const c = Object.assign(S0(), patch, { gallery: true });
    return `<figure><div class="phone">${phoneInner(c)}</div><figcaption>${label}</figcaption></figure>`;
  }).join('');
  drawGalleryVideos();
  window.scrollTo(0, 0);
}
function drawGalleryVideos() {
  document.querySelectorAll('#gallery canvas[data-video]').forEach(cv => drawVideo(cv, LMAP[cv.dataset.video], +cv.dataset.t, true));
}

/* ---------- boot ---------- */
(function boot() {
  const mark = $('#guide-mark'); if (mark) mark.src = LOGO_MARK;
  const token = (location.hash || '').slice(1);
  if (JUMP[token]) S = Object.assign(S0(), JUMP[token]);
  render(true);
  if (token === 'galerie') showGallery(true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { updateVideoUI(); if (!$('#gallery-wrap').hidden) drawGalleryVideos(); });
})();
