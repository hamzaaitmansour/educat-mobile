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
vm.runInContext(code + '\n;globalThis.__t = { S: () => S, setS: v => { S = v; }, V, P: () => P, phoneInner, GALLERY, S0, LMAP, LESSONS, quizUnlocked, watchedPct, progressOf, ACTIONS, ensureVideo, finishQuiz, startQuiz, eventsOn, upcomingExams, average, loginSubmit, cleanCode, shortOk, startExo, XMAP, EXERCISES, LMAP, lessonTabs, FIGURES, CODES };', ctx);
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
ok(t.progressOf(L) === 50, `lesson progress after video 50 % + quiz = ${t.progressOf(L)} % (résumé and exercice still to do)`);
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
// 7. exercises: data sanity, answer checking, the 4th lesson step
for (const X of t.EXERCISES) {
  const good = t.LMAP[X.lesson] && X.qs.length && X.qs.every(q => q.q && q.c && (q.t === 'open' || (q.t === 'short' && q.a && q.a.length))) && (X.kind !== 'image' || (t.FIGURES[X.figure] && X.alt));
  ok(good, `exercise data complete: ${X.id}`);
}
ok(t.lessonTabs(t.LMAP.affine).join(',') === 'video,resume,quiz,exo' && t.lessonTabs(t.LMAP.argumentation).join(',') === 'resume', 'lessons with an exercise get the Exercice tab, the others do not');
const XA = t.XMAP['ex-affine'].qs, XT = t.XMAP['ex-thales'].qs;
ok(['−1', '-1', 'b = -1', 'b=−1', ' -1 '].every(v => t.shortOk(XA[0], v)) && !t.shortOk(XA[0], '1') && !t.shortOk(XA[0], ''), 'short answers accept −1 written several ways, refuse 1');
ok(['0,4', '0.4', '2/5', '2 / 5'].every(v => t.shortOk(XT[0], v)) && ['3', '3 cm', '3cm', 'MN = 3 cm'].every(v => t.shortOk(XT[1], v)) && !t.shortOk(XT[1], '30'), 'decimal comma, fractions and units are accepted');
ok(t.shortOk(t.XMAP['ex-conversions'].qs[1], '1 500') && t.shortOk(t.XMAP['ex-conversions'].qs[1], '1500 Ω') && t.shortOk(t.XMAP['ex-ww2'].qs[0], 'C') && t.shortOk(t.XMAP['ex-present-perfect'].qs[0], 'Has lived.') && !t.shortOk(t.XMAP['ex-present-perfect'].qs[0], 'lived'), 'spaced thousands, letters and words are checked');
t.startExo('ex-affine');
const ex = t.S().exo;
ex.ans[0].v = '-1'; t.ACTIONS.xcheck({ i: '0' });
ex.ans[1].v = '4'; t.ACTIONS.xcheck({ i: '1' });
const firstTry = ex.ans[1].st;
t.ACTIONS.xcheck({ i: '1' });
t.ACTIONS.xreveal({ i: '2' });
const shown = ex.ans[2].st;
t.ACTIONS.xself({ i: '2', v: 'ok' });
ok(ex.ans[0].st === 'ok' && firstTry === 'retry' && ex.ans[1].st === 'review' && shown === 'shown' && ex.ans[2].st === 'ok', 'right answer passes, a wrong one gets a second try then the correction, the corrigé is self-marked');
t.ACTIONS.exoFinish();
const saved2 = JSON.parse(Object.values(store).pop());
ok(saved2.exos['ex-affine'].done === true && saved2.exos['ex-affine'].ok === 2 && saved2.exos['ex-affine'].n === 3, 'finished exercise is saved (2 of 3 right)');
ok(t.progressOf(L) === 75, `lesson progress with the exercise done = ${t.progressOf(L)} % (résumé still unread)`);
ok(t.progressOf(t.LMAP.thales) === 100, 'Thalès stays 100 % (its exercise is done in the sample data)');
// 8. connexion with the student code
const tryCode = v => { t.S().screen = 'splash'; t.S().login = { v, err: '', ok: false }; t.loginSubmit(); return t.S().login; };
ok(tryCode('3B48').err === 'short' && tryCode('ABCDEF').err === 'format' && tryCode('3B4812').err === 'unknown', 'short, malformed and unknown codes are refused with their own message');
ok(t.cleanCode('ezk-3b-4821') === '3B4821' && t.cleanCode('3b 48 21') === '3B4821', 'a pasted code is tidied (prefix, case, spaces)');
const signed = tryCode('3B4821');
ok(signed.ok === true && !signed.err && JSON.parse(Object.values(store).pop()).signedIn === true, 'the demo code signs Yanis in and the phone remembers it');
console.log(fails ? `${fails} FAILED` : 'ALL PASSED');
process.exit(fails ? 1 : 0);
