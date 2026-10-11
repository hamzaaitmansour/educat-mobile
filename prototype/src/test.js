// Runs the prototype's script against a tiny fake DOM and checks the core rules.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const code = fs.readFileSync(path.join(__dirname, 'dist', '_all.js'), 'utf8');

function el() {
  return { _html: '', set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; }, dataset: {}, hidden: false, style: {},
    classList: { toggle() {}, contains() { return false; }, add() {}, remove() {} }, querySelector: () => null, appendChild() {}, setAttribute() {}, removeAttribute() {} };
}
const app = el();
const store = {};
const ctx = {
  console, Date, Math, JSON, Object, Array, String, Number, Uint8Array, Set, Promise, parseInt, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 1, clearInterval() {},
  requestAnimationFrame: () => 1, cancelAnimationFrame() {}, performance: { now: () => Date.now() },
  localStorage: { getItem: k => store[k] || null, setItem: (k, v) => { store[k] = v; } },
  location: { hash: '' }, window: { devicePixelRatio: 1, scrollTo() {} }, navigator: {},
  document: { querySelector: s => (s === '#app' ? app : null), querySelectorAll: () => [], addEventListener() {}, createElement: () => el() },
};
vm.createContext(ctx);
vm.runInContext(code + '\n;globalThis.__t = { S: () => S, setS: v => { S = v; }, V, P: () => P, phoneInner, GALLERY, S0, LMAP, LESSONS, quizUnlocked, watchedPct, progressOf, ACTIONS, ensureVideo, finishQuiz, startQuiz, eventsOn, upcomingExams, average };', ctx);
const t = ctx.__t;
let fails = 0;
const ok = (cond, msg) => { if (!cond) { fails++; console.log('FAIL', msg); } else console.log('ok  ', msg); };

// 1. every gallery screen renders
for (const [label, patch] of t.GALLERY) {
  try { const html = t.phoneInner(Object.assign(t.S0(), patch, { gallery: true })); ok(html.length > 500 && !html.includes('undefined') && !html.includes('NaN'), `renders: ${label} (${html.length} chars)`); }
  catch (e) { fails++; console.log('FAIL render', label, e.message); }
}
// 2. video: skipping does not count, watching to 50% unlocks the quiz
const L = t.LMAP.affine;
t.setS(Object.assign(t.S0(), { screen: 'lesson', lessonId: 'affine', tab: 'video' }));
t.ensureVideo(L);
ok(!t.quizUnlocked(L), `quiz locked at start (${t.watchedPct(L)} % seen)`);
t.V.t = 600; // seek far ahead: nothing watched
ok(t.watchedPct(L) === 11, 'seeking ahead does not count as watched');
t.V.t = 80; t.V.playing = true; t.V.rate = 10; t.V.last = 0;
// simulate frames of 0.1 s at x10 speed until 50 %
let guard = 0;
while (!t.quizUnlocked(L) && guard++ < 10000) {
  const before = t.V.t; const after = Math.min(720, before + 1);
  for (let s = Math.floor(before); s < Math.floor(after); s++) if (!t.V.w[s]) { t.V.w[s] = 1; t.V.count++; }
  t.V.t = after;
}
ok(t.quizUnlocked(L) && t.watchedPct(L) === 50, `quiz unlocks at ${t.watchedPct(L)} %`);
// 3. quiz: 4/5 passes and is saved
t.startQuiz('affine', 'lesson');
const q = t.S().quiz;
ok(t.S().screen === 'quiz' && q && q.mode === 'lesson', 'quiz starts after 50 %');
q.picks = [0, 2, 1, 0, 1]; q.i = 4;
t.finishQuiz();
const saved = JSON.parse(Object.values(store).pop());
ok(saved.lessons.affine.quizPassed === true && saved.lessons.affine.quizBest === 4, 'quiz result 4/5 is saved as passed');
ok(t.progressOf(L) === 67, `lesson progress after video 50 % + quiz = ${t.progressOf(L)} % (résumé still unread)`);
// 4. résumé-only lesson completes on read
t.ACTIONS.resumeRead({ id: 'argumentation' });
ok(t.progressOf(t.LMAP.argumentation) === 100, 'résumé-only lesson is 100 % once read');
// 5. exam list + averages
ok(t.upcomingExams().map(e => e.id).join(',') === 'm4,h2,x1', 'upcoming contrôles in date order');
const av = t.average();
ok(Math.abs(av.me - 14.8125) < 1e-9 && Math.abs(av.klass - 12.4) < 1e-9, `weighted averages ${av.me} / ${av.klass}`);
// 6. timetable data sanity: no overlapping slots on a day
for (const d of ['2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17']) {
  const ev = t.eventsOn(d); let clash = false;
  for (let i = 1; i < ev.length; i++) if (ev[i].start < ev[i - 1].end) clash = true;
  ok(!clash, `no overlapping classes on ${d}`);
}
console.log(fails ? `${fails} FAILED` : 'ALL PASSED');
process.exit(fails ? 1 : 0);
