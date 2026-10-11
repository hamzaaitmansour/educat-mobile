'use strict';

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const icon = (id, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const pad2 = n => String(n).padStart(2, '0');
const toMin = hm => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };
const hm = m => `${pad2(Math.floor(m / 60))}:${pad2(m % 60)}`;
const uid = p => p + Math.random().toString(36).slice(2, 8);

/* ---------- sample data (fictional students, real centre) ---------- */
const NOW = 9 * 60 + 40;           // Monday 12 October 2026, 09:40
const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const DATES = [12, 13, 14, 15, 16, 17];
const SUBJ = {
  maths: { name: 'Mathématiques', short: 'Maths', c: '#9333EA', s: '#F1E7FD' },
  pc: { name: 'Physique-Chimie', short: 'PC', c: '#088D84', s: '#DCF3EF' },
  svt: { name: 'SVT', short: 'SVT', c: '#2E9D68', s: '#E0F4E9' },
  fr: { name: 'Français', short: 'Français', c: '#D9368F', s: '#FCE7F2' },
  ang: { name: 'Anglais', short: 'Anglais', c: '#E39A0B', s: '#FFF2D4' },
  hg: { name: 'Histoire-Géo', short: 'HG', c: '#E8506F', s: '#FDE6EB' },
  atelier: { name: 'Atelier', short: 'Atelier', c: '#BC4384', s: '#F7E3EE' },
};
const sv = k => `--c:${SUBJ[k].c};--cs:${SUBJ[k].s}`;
const TEACHERS = { benali: 'Mme Benali', idrissi: 'M. Idrissi', laurent: 'Mme Laurent', smith: 'Mr Smith', ouali: 'M. Ouali', haddad: 'Mme Haddad', alaoui: 'M. Alaoui', psy: 'Pôle psychosocial' };
const ROOMS = ['Salle 3', 'Salle 4', 'Salle 6', 'Salle 7', 'Salle 9', 'Salle 12', 'Labo 1', 'Labo 2', 'Salle info', 'Salle Zen'];
const CLASSES = ['3e A', '3e B', '4e A', '4e B'];
const KINDS = ['Cours', 'TP', 'Contrôle', 'Atelier', 'Soutien'];

let TT = [];
const slot = (cls, day, start, end, subj, kind, teacher, room, title) => TT.push({ id: uid('s'), cls, day, start, end, subj, kind, teacher, room, title: title || '' });
// 3e B: the class of the student app
slot('3e B', 0, '08:00', '09:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('3e B', 0, '09:00', '10:00', 'pc', 'TP', 'idrissi', 'Labo 2');
slot('3e B', 0, '10:15', '12:00', 'fr', 'Cours', 'laurent', 'Salle 7');
slot('3e B', 0, '14:00', '15:00', 'maths', 'Contrôle', 'benali', 'Salle 12', 'Contrôle · Fonctions affines');
slot('3e B', 0, '15:00', '16:00', 'ang', 'Cours', 'smith', 'Salle 4');
slot('3e B', 0, '16:15', '17:15', 'atelier', 'Atelier', 'psy', 'Salle Zen', 'Atelier méthodo');
slot('3e B', 1, '08:00', '10:00', 'svt', 'Cours', 'ouali', 'Labo 1');
slot('3e B', 1, '10:15', '12:00', 'hg', 'Cours', 'haddad', 'Salle 9');
slot('3e B', 1, '14:00', '16:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('3e B', 1, '16:15', '17:00', 'ang', 'Cours', 'smith', 'Salle 4');
slot('3e B', 2, '08:00', '10:00', 'fr', 'Cours', 'laurent', 'Salle 7');
slot('3e B', 2, '10:15', '12:00', 'pc', 'Cours', 'idrissi', 'Labo 2');
slot('3e B', 3, '08:00', '09:00', 'ang', 'Cours', 'smith', 'Salle 4');
slot('3e B', 3, '09:00', '10:00', 'pc', 'Contrôle', 'idrissi', 'Labo 2', "Contrôle · Loi d'Ohm");
slot('3e B', 3, '10:15', '12:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('3e B', 3, '14:00', '16:00', 'hg', 'Cours', 'haddad', 'Salle 9');
slot('3e B', 3, '16:15', '17:15', 'svt', 'Cours', 'ouali', 'Labo 1');
slot('3e B', 4, '08:00', '10:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('3e B', 4, '10:15', '12:00', 'svt', 'TP', 'ouali', 'Labo 1');
slot('3e B', 4, '14:00', '15:00', 'fr', 'Cours', 'laurent', 'Salle 7');
slot('3e B', 4, '15:00', '17:00', 'atelier', 'Atelier', 'alaoui', 'Salle info', 'Atelier codage & IA');
slot('3e B', 5, '09:00', '11:00', 'atelier', 'Soutien', 'benali', 'Salle 3', 'Soutien scolaire · Maths');
// other classes
slot('3e A', 0, '08:00', '10:00', 'svt', 'Cours', 'ouali', 'Labo 1');
slot('3e A', 0, '10:15', '11:15', 'maths', 'Cours', 'benali', 'Salle 12');
slot('3e A', 0, '11:15', '12:00', 'ang', 'Cours', 'smith', 'Salle 4');
slot('3e A', 0, '14:00', '16:00', 'hg', 'Cours', 'haddad', 'Salle 9');
slot('3e A', 0, '16:15', '17:15', 'fr', 'Cours', 'laurent', 'Salle 7');
slot('3e A', 1, '08:00', '10:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('3e A', 1, '10:15', '12:00', 'pc', 'Cours', 'idrissi', 'Labo 2');
slot('3e A', 1, '14:00', '16:00', 'svt', 'Cours', 'ouali', 'Labo 1');
slot('3e A', 3, '08:00', '10:00', 'fr', 'Cours', 'laurent', 'Salle 7');
slot('3e A', 3, '10:15', '12:00', 'ang', 'Cours', 'smith', 'Salle 4');
slot('3e A', 3, '14:00', '15:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('3e A', 4, '08:00', '10:00', 'hg', 'Cours', 'haddad', 'Salle 9');
slot('3e A', 4, '10:15', '12:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('4e A', 0, '08:00', '09:00', 'fr', 'Cours', 'laurent', 'Salle 7');
slot('4e A', 0, '09:00', '10:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('4e A', 0, '10:15', '12:00', 'pc', 'Cours', 'idrissi', 'Labo 2');
slot('4e A', 0, '14:00', '15:00', 'ang', 'Cours', 'smith', 'Salle 4');
slot('4e A', 0, '15:00', '17:00', 'atelier', 'Atelier', 'alaoui', 'Salle info', 'Atelier codage & IA');
slot('4e A', 1, '08:00', '10:00', 'ang', 'Cours', 'smith', 'Salle 4');
slot('4e A', 1, '10:15', '12:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('4e A', 1, '14:00', '16:00', 'hg', 'Cours', 'haddad', 'Salle 9');
slot('4e A', 3, '08:00', '10:00', 'svt', 'Cours', 'ouali', 'Labo 1');
slot('4e A', 3, '10:15', '12:00', 'fr', 'Cours', 'laurent', 'Salle 7');
slot('4e B', 0, '08:00', '10:00', 'hg', 'Cours', 'haddad', 'Salle 9');
slot('4e B', 0, '10:15', '12:00', 'svt', 'Cours', 'ouali', 'Labo 1');
slot('4e B', 0, '14:00', '16:00', 'fr', 'Cours', 'laurent', 'Salle 7');
slot('4e B', 0, '16:15', '17:15', 'atelier', 'Soutien', 'benali', 'Salle 3', 'Soutien scolaire · Maths');
slot('4e B', 1, '08:00', '10:00', 'fr', 'Cours', 'laurent', 'Salle 7');
slot('4e B', 1, '10:15', '12:00', 'ang', 'Cours', 'smith', 'Salle 4');
slot('4e B', 1, '14:00', '16:00', 'pc', 'Cours', 'idrissi', 'Labo 2');
slot('4e B', 3, '08:00', '10:00', 'maths', 'Cours', 'benali', 'Salle 12');
slot('4e B', 3, '10:15', '12:00', 'hg', 'Cours', 'haddad', 'Salle 9');

const STUDENTS = [
  { id: 'yanis', name: 'Yanis B.', profile: 'Typique', video: 86, res: 7, quiz: 5, affine: 100, last: "Aujourd'hui 08:52", subj: { maths: 92, pc: 70, svt: 64, fr: 80, ang: 75, hg: 68 }, pap: 'Très autonome. Objectif du trimestre : régularité en SVT.' },
  { id: 'adam', name: 'Amine R.', profile: 'TDAH', video: 41, res: 4, quiz: 2, affine: 12, last: 'Hier 19:10', subj: { maths: 38, pc: 45, svt: 40, fr: 52, ang: 60, hg: 47 }, pap: 'Séances courtes avec pauses. Consignes audio activées.' },
  { id: 'ines', name: 'Imane T.', profile: 'Typique', video: 58, res: 5, quiz: 3, affine: 30, last: 'Hier 17:45', subj: { maths: 55, pc: 61, svt: 58, fr: 70, ang: 66, hg: 59 }, pap: 'Revoir les méthodes de révision avant les contrôles.' },
  { id: 'mehdi', name: 'Mehdi A.', profile: 'Typique', video: 35, res: 3, quiz: 2, affine: 0, last: 'Sam. 10 oct.', subj: { maths: 30, pc: 42, svt: 35, fr: 48, ang: 51, hg: 40 }, pap: 'Absences répétées le lundi. Rendez-vous parents à prévoir.' },
  { id: 'nour', name: 'Nour H.', profile: 'DYS', video: 63, res: 6, quiz: 3, affine: 44, last: "Aujourd'hui 07:58", subj: { maths: 60, pc: 66, svt: 70, fr: 55, ang: 62, hg: 64 }, pap: 'Dyslexie. Police lecture facile et sous-titres activés.' },
  { id: 'ayoub', name: 'Ayoub Z.', profile: 'Typique', video: 47, res: 4, quiz: 3, affine: 25, last: 'Hier 21:30', subj: { maths: 46, pc: 50, svt: 44, fr: 58, ang: 49, hg: 52 }, pap: 'Travaille tard le soir. Encourager le minuteur de révision.' },
  { id: 'rania', name: 'Rania E.', profile: 'DYS', video: 92, res: 8, quiz: 3, affine: 100, last: "Aujourd'hui 08:10", subj: { maths: 78, pc: 52, svt: 80, fr: 74, ang: 70, hg: 77 }, pap: 'Dyscalculie. Regarde tout, mais les quiz de calcul la bloquent.' },
  { id: 'salim', name: 'Salim K.', profile: 'HPI', video: 95, res: 9, quiz: 7, affine: 100, last: "Aujourd'hui 09:05", subj: { maths: 98, pc: 94, svt: 90, fr: 88, ang: 92, hg: 91 }, pap: 'HPI. Proposer des défis supplémentaires en maths.' },
  { id: 'hiba', name: 'Hiba M.', profile: 'Typique', video: 74, res: 7, quiz: 5, affine: 80, last: 'Hier 18:02', subj: { maths: 72, pc: 75, svt: 78, fr: 81, ang: 70, hg: 69 }, pap: 'Bonne progression. Rien à signaler.' },
  { id: 'omar', name: 'Omar F.', profile: 'TSA', video: 69, res: 6, quiz: 4, affine: 64, last: 'Hier 16:40', subj: { maths: 70, pc: 68, svt: 62, fr: 60, ang: 66, hg: 71 }, pap: 'Mode calme activé. Prévenir à l\'avance de tout changement de salle.' },
  { id: 'kenza', name: 'Kenza L.', profile: 'Typique', video: 81, res: 8, quiz: 6, affine: 90, last: "Aujourd'hui 08:30", subj: { maths: 84, pc: 79, svt: 82, fr: 86, ang: 80, hg: 78 }, pap: 'Déléguée de classe.' },
  { id: 'yasmine', name: 'Yasmine D.', profile: 'Typique', video: 77, res: 6, quiz: 5, affine: 72, last: 'Hier 20:15', subj: { maths: 74, pc: 71, svt: 76, fr: 79, ang: 83, hg: 70 }, pap: 'Rien à signaler.' },
];
const RES_TOTAL = 9, QUIZ_TOTAL = 7;
const stu = id => STUDENTS.find(s => s.id === id);
const initials = n => n.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();

const lessonBase = (o) => Object.assign({ video: null, resume: { sections: [], retenir: '' }, quiz: [], avg: null, updated: '', author: 'benali' }, o);
const LESSONS = [
  lessonBase({
    id: 'affine', title: 'Fonctions affines', subj: 'maths', cls: '3e B', chapter: 'Chapitre 4 · Fonctions', type: 'vqr', status: 'published', avg: 62, updated: '8 oct.',
    video: { name: 'fonctions-affines.mp4', dur: '12:00', chapters: [{ t: '0:00', title: 'Définition' }, { t: '2:10', title: 'Le coefficient directeur a' }, { t: '4:30', title: "L'ordonnée à l'origine b" }, { t: '6:40', title: 'Tracer la droite' }, { t: '9:15', title: 'Exercice guidé' }] },
    resume: { sections: [{ h: 'Définition', p: 'Une fonction affine associe à chaque nombre x le nombre ax + b, où a et b sont deux nombres fixés.' }, { h: 'Le coefficient directeur a', p: 'a donne la pente : quand x augmente de 1, f(x) augmente de a.' }], retenir: 'Une fonction affine se représente par une droite. Deux points suffisent pour la tracer.' },
    quiz: [{ q: "Quelle est l'écriture d'une fonction affine ?", o: ['f(x) = ax + b', 'f(x) = ax²', 'f(x) = a / x'], a: 0, e: "Une fonction affine s'écrit f(x) = ax + b." }, { q: 'Pour f(x) = 2x + 1, que vaut f(3) ?', o: ['5', '6', '7'], a: 2, e: 'f(3) = 2 × 3 + 1 = 7.' }],
  }),
  lessonBase({ id: 'thales', title: 'Théorème de Thalès', subj: 'maths', cls: '3e B', chapter: 'Chapitre 3 · Géométrie', type: 'vqr', status: 'published', avg: 88, updated: '30 sept.', video: { name: 'thales.mp4', dur: '10:00', chapters: [{ t: '0:00', title: 'La configuration' }] }, resume: { sections: [{ h: "L'égalité de Thalès", p: 'AM / AB = AN / AC = MN / BC' }], retenir: '' }, quiz: [{ q: 'La réciproque sert à prouver que…', o: ['deux droites sont parallèles', 'un triangle est rectangle'], a: 0, e: '' }] }),
  lessonBase({ id: 'produit-nul', title: 'Équations produit nul', subj: 'maths', cls: '3e B', chapter: 'Chapitre 5 · Équations', type: 'rq', status: 'published', avg: 54, updated: '6 oct.', resume: { sections: [{ h: 'La règle', p: "Un produit est nul si et seulement si l'un de ses facteurs est nul." }], retenir: '' }, quiz: [{ q: 'Résoudre (x − 3)(x + 5) = 0', o: ['x = 3 ou x = −5', 'x = −3 ou x = 5'], a: 0, e: '' }] }),
  lessonBase({ id: 'stats', title: 'Moyenne et médiane', subj: 'maths', cls: '3e B', chapter: 'Chapitre 6 · Statistiques', type: 'r', status: 'published', avg: 71, updated: '2 oct.', resume: { sections: [{ h: 'Moyenne', p: 'On additionne les valeurs, puis on divise par leur nombre.' }], retenir: '' } }),
  lessonBase({ id: 'ohm', title: "La loi d'Ohm", subj: 'pc', cls: '3e B', chapter: 'Électricité', type: 'vqr', status: 'published', avg: 46, updated: 'Hier', author: 'idrissi', video: { name: 'loi-d-ohm.mp4', dur: '14:00', chapters: [{ t: '0:00', title: 'Tension et intensité' }, { t: '3:20', title: 'La résistance' }, { t: '7:00', title: "La loi d'Ohm" }] }, resume: { sections: [{ h: "La loi d'Ohm", p: "La tension aux bornes d'une résistance est proportionnelle à l'intensité : U = R × I." }], retenir: 'U = R × I, avec U en volts, R en ohms, I en ampères.' } }),
  lessonBase({ id: 'genetique', title: 'ADN, gènes et chromosomes', subj: 'svt', cls: '3e B', chapter: 'Hérédité', type: 'rq', status: 'published', avg: 38, updated: '7 oct.', author: 'ouali', resume: { sections: [{ h: 'Les chromosomes', p: 'Une cellule humaine contient 46 chromosomes, soit 23 paires.' }], retenir: '' }, quiz: [{ q: "Où se trouve l'ADN ?", o: ['Dans le noyau', 'Dans la membrane'], a: 0, e: '' }] }),
  lessonBase({ id: 'argumentation', title: "L'argumentation", subj: 'fr', cls: '3e B', chapter: 'Écrire pour convaincre', type: 'r', status: 'published', avg: 66, updated: '5 oct.', author: 'laurent', resume: { sections: [{ h: 'La thèse', p: "C'est l'opinion que l'on défend." }], retenir: '' } }),
  lessonBase({ id: 'present-perfect', title: 'Present perfect', subj: 'ang', cls: '3e B', chapter: 'Grammar', type: 'vqr', status: 'review', updated: 'Hier 18:12', author: 'smith', video: { name: 'present-perfect.mp4', dur: '8:00', chapters: [{ t: '0:00', title: 'Form' }, { t: '2:20', title: 'Unfinished time' }] }, resume: { sections: [{ h: 'Form', p: 'Sujet + have / has + participe passé.' }], retenir: '' }, quiz: [{ q: 'She ___ in Paris since 2020.', o: ['has lived', 'lived'], a: 0, e: '' }] }),
  lessonBase({ id: 'ww2', title: 'La Seconde Guerre mondiale', subj: 'hg', cls: '3e B', chapter: 'Histoire · 1939-1945', type: 'rq', status: 'published', avg: 72, updated: '1er oct.', author: 'haddad', resume: { sections: [{ h: 'Les grandes dates', p: '1939 : invasion de la Pologne. 1944 : débarquement. 1945 : capitulation.' }], retenir: '' }, quiz: [{ q: 'La guerre commence en…', o: ['1939', '1914'], a: 0, e: '' }] }),
  lessonBase({ id: 'equations', title: 'Équations du premier degré', subj: 'maths', cls: '4e A', chapter: 'Chapitre 3 · Calcul', type: 'vqr', status: 'scheduled', updated: '9 oct.', schedule: 'Lun. 19 oct. 08:00', video: { name: 'equations.mp4', dur: '9:30', chapters: [{ t: '0:00', title: 'Isoler x' }] }, resume: { sections: [{ h: 'Méthode', p: 'On ajoute, soustrait, multiplie ou divise les deux membres par le même nombre.' }], retenir: '' }, quiz: [{ q: 'Résoudre 2x + 3 = 11', o: ['x = 4', 'x = 7'], a: 0, e: '' }] }),
  lessonBase({ id: 'puissances', title: 'Puissances de 10', subj: 'maths', cls: '4e A', chapter: 'Chapitre 4 · Nombres', type: 'rq', status: 'draft', updated: 'Aujourd\'hui 08:20', resume: { sections: [{ h: 'Écriture', p: '10ⁿ est le produit de n facteurs égaux à 10.' }], retenir: '' } }),
];
const lessonById = id => LESSONS.find(l => l.id === id);
const STATUS = { draft: ['st-draft', 'Brouillon'], review: ['st-review', 'À relire'], published: ['st-published', 'Publiée'], scheduled: ['st-scheduled', 'Programmée'] };
const TYPES = { vqr: 'Vidéo · résumé · quiz', rq: 'Résumé · quiz', r: 'Résumé seul' };
const hasVideo = t => t === 'vqr';
const hasQuiz = t => t !== 'r';

const CATS = { cours: ['video', 'Cours', 'pc'], controle: ['quiz', 'Contrôle', 'fr'], edt: ['calendar', 'Emploi du temps', 'maths'], rappel: ['clock', 'Rappel', 'hg'], centre: ['bell', 'Centre', 'atelier'] };
let HISTORY = [
  { id: 'h1', cat: 'edt', title: 'Changement de salle', body: "L'anglais de 15:00 a lieu en salle 4 aujourd'hui.", to: '3e B', count: 12, when: "Aujourd'hui 07:30", read: 10 },
  { id: 'h2', cat: 'controle', title: 'Contrôle de maths à 14:00', body: 'Fonctions affines · Salle 12 · coef 2. Révise avec la vidéo et le quiz.', to: '3e B', count: 12, when: "Aujourd'hui 07:00", read: 9 },
  { id: 'h3', cat: 'cours', title: 'Nouvelle vidéo en Physique-Chimie', body: "« La loi d'Ohm » est disponible (14 min).", to: '3e B', count: 12, when: 'Hier 18:20', read: 11 },
  { id: 'h4', cat: 'centre', title: 'Réunion parents-professeurs', body: 'Jeudi 22 octobre à 17:00, au centre EducazenKids.', to: 'Tout le collège', count: 48, when: 'Ven. 9 oct.', read: 41 },
];

const ADN_LATE = ['adam', 'ines', 'mehdi', 'nour', 'ayoub', 'omar', 'yasmine', 'hiba', 'rania'];
const ALERTS = [
  { id: 'a-video', lvl: 'urgent', scope: ['direction', 'benali'], title: "5 élèves de 3e B n'ont pas vu la moitié de « Fonctions affines »", ctx: 'Contrôle de maths à 14:00 : leur quiz de révision est encore verrouillé.', action: 'Relancer', kind: 'notify', recipients: ['adam', 'ines', 'mehdi', 'nour', 'ayoub'], cat: 'controle', ntitle: 'Contrôle de maths à 14:00', body: 'Regarde au moins la moitié de la vidéo « Fonctions affines » pour débloquer le quiz de révision avant le contrôle.', done: n => `${n} élève${n > 1 ? 's' : ''} relancé${n > 1 ? 's' : ''}` },
  { id: 'a-room', lvl: 'urgent', scope: ['direction'], title: 'Atelier codage & IA de vendredi : changement de salle à annoncer', ctx: "La salle info est réservée vendredi après-midi ; l'atelier de 3e B passe en salle 3.", action: 'Prévenir la classe', kind: 'room', cls: '3e B', from: 'Salle info', to: 'Salle 3', when: 'Vendredi 16 octobre · 15:00 – 17:00', cat: 'edt', ntitle: 'Changement de salle vendredi', body: "L'atelier codage & IA de vendredi 15:00 a lieu en salle 3.", done: () => 'Classe 3e B prévenue, emploi du temps mis à jour' },
  { id: 'a-ohm', lvl: 'todo', scope: ['direction'], title: "« La loi d'Ohm » est publiée sans quiz", ctx: 'Physique-Chimie · 3e B · contrôle jeudi à 09:00.', action: 'Compléter le quiz', kind: 'lesson', lesson: 'ohm', done: () => 'Quiz ajouté et publié' },
  { id: 'a-rania', lvl: 'todo', scope: ['direction'], title: 'Rania E. a échoué deux quiz de Physique-Chimie', ctx: '3e B · profil DYS · vidéos regardées en entier, mais 1 sur 3 aux deux derniers quiz.', action: 'Planifier un soutien', kind: 'support', student: 'rania', cat: 'rappel', ntitle: 'Séance de soutien samedi', body: "Rania, une séance de soutien en Physique-Chimie t'attend samedi à 11:00, salle 3, avec M. Idrissi.", done: () => 'Soutien planifié samedi 11:00, Rania prévenue' },
  { id: 'a-adn', lvl: 'todo', scope: ['direction'], title: '9 élèves n\'ont pas lu le résumé « ADN, gènes et chromosomes »', ctx: 'SVT · 3e B · contrôle mardi 20 octobre.', action: 'Relancer', kind: 'notify', recipients: ADN_LATE, cat: 'cours', ntitle: 'Résumé à lire avant mardi', body: 'Lis le résumé « ADN, gènes et chromosomes » avant le contrôle de SVT de mardi 20 octobre.', done: n => `${n} élève${n > 1 ? 's' : ''} relancé${n > 1 ? 's' : ''}` },
  { id: 'a-puiss', lvl: 'todo', scope: ['benali'], title: "« Puissances de 10 » n'a pas encore de quiz", ctx: 'Maths · 4e A · brouillon à publier avant lundi 19.', action: 'Compléter le quiz', kind: 'lesson', lesson: 'puissances', done: () => 'Quiz ajouté' },
  { id: 'a-review', lvl: 'info', scope: ['direction'], title: 'Brouillon à relire : « Present perfect »', ctx: 'Anglais · 3e B · proposé par Mr Smith hier à 18:12.', action: 'Relire', kind: 'lesson', lesson: 'present-perfect', done: () => 'Leçon relue et publiée' },
  { id: 'a-yanis', lvl: 'info', scope: ['direction', 'benali'], title: 'Yanis B. a validé le quiz « Théorème de Thalès »', ctx: 'Maths · 3e B · 3 sur 3, après avoir revu la vidéo.', action: 'Féliciter', kind: 'notify', recipients: ['yanis'], cat: 'cours', ntitle: 'Bravo pour le quiz Thalès', body: 'Bravo Yanis, 3 sur 3 au quiz « Théorème de Thalès ». Continue comme ça avant le contrôle.', done: () => 'Message envoyé à Yanis' },
];
const LVL = { urgent: ['lvl-urgent', 'Urgent'], todo: ['lvl-todo', 'À faire'], info: ['lvl-info', 'Info'] };

/* ---------- state ---------- */
const S = {
  view: 'suivi', param: null, role: 'direction', alertTab: 'open', alertSel: null, alertQ: '',
  resolved: {}, recip: {}, bodies: {},
  lessonStatus: 'all', lessonSubj: 'all', lessonQ: '', draft: null, edErrors: {}, edMsg: '',
  stuFilter: 'all', stuQ: '', stuSel: 'yanis',
  edtClass: '3e B', edtSel: null, edtDraft: null, edtNotify: true,
  compose: { to: '3e B', student: 'yanis', cat: 'cours', title: '', body: '', when: 'now', at: '2026-10-12T18:00' }, composeErr: '',
  lastSent: null,
};
const myAlerts = () => ALERTS.filter(a => a.scope.includes(S.role));
const openCount = () => myAlerts().filter(a => !S.resolved[a.id]).length;

/* ---------- toast with undo ---------- */
let toastTimer = 0;
function toast(msg, undo) {
  const t = $('#toast');
  t.innerHTML = `${icon('check')}<span>${esc(msg)}</span>${undo ? '<button type="button">Annuler</button>' : ''}`;
  if (undo) t.querySelector('button').onclick = () => { hideToast(); undo(); };
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 5200);
}
function hideToast() { $('#toast').classList.remove('on'); }

/* ---------- chrome: nav, me ---------- */
const NAV = [['suivi', 'inbox', 'Suivi'], ['lecons', 'book', 'Leçons'], ['eleves', 'users', 'Élèves'], ['edt', 'calendar', 'Emploi du temps'], ['notifs', 'bell', 'Notifications']];
function renderChrome() {
  $('#nav').innerHTML = NAV.map(([id, ic, label]) => {
    const n = id === 'suivi' ? openCount() : 0;
    return `<a href="#${id}" ${S.view === id ? 'aria-current="page"' : ''}>${icon(ic)}<span>${label}</span>${n ? `<span class="count num" aria-label="${n} à traiter">${n}</span>` : ''}</a>`;
  }).join('');
  $('#me').innerHTML = S.role === 'direction'
    ? '<span class="avatar">DP</span><span><b>Direction pédagogique</b><span>Toutes les classes</span></span>'
    : '<span class="avatar" style="background:#9333EA">MB</span><span><b>Mme Benali</b><span>Maths · 3e A, 3e B, 4e A, 4e B</span></span>';
  document.querySelectorAll('[data-act="role"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.role === S.role)));
}
function head(title, sub, tools = '') {
  return `<header class="head"><button class="btn btn-ghost menu-btn" type="button" data-act="menu" aria-label="Ouvrir le menu">${icon('menu')}</button>
    <h1>${title}</h1><span class="today">${sub}</span><div class="tools">${tools}</div></header>`;
}

/* ---------- Suivi ---------- */
function strip() {
  const H0 = 8 * 60, H1 = 18 * 60, span = H1 - H0;
  const x = m => ((m - H0) / span) * 100;
  const mine = S.role === 'benali';
  const lanes = CLASSES.filter(c => !mine || TT.some(s => s.cls === c && s.day === 0 && s.teacher === 'benali'));
  const ticks = [8, 10, 12, 14, 16, 18].map(h => `<span style="left:${x(h * 60)}%">${h}h</span>`).join('');
  const rows = lanes.map(c => `<div class="lane"><b>${c}</b><div class="track"><span class="lunch" style="left:${x(720)}%;width:${x(840) - x(720)}%"></span>${TT.filter(s => s.cls === c && s.day === 0).map(s => {
    const exam = s.kind === 'Contrôle', other = mine && s.teacher !== 'benali';
    const label = exam ? `Contrôle ${SUBJ[s.subj].short}` : (s.title || SUBJ[s.subj].short);
    return `<button type="button" class="blk ${exam ? 'exam' : ''} ${other ? 'other' : ''}" style="${sv(s.subj)};left:${x(toMin(s.start))}%;width:calc(${x(toMin(s.end)) - x(toMin(s.start))}% - 3px)" data-act="slot" data-id="${s.id}" title="${esc(label)} · ${s.start}–${s.end} · ${esc(s.room)} · ${esc(TEACHERS[s.teacher])}"><span>${esc(label)}</span></button>`;
  }).join('')}</div></div>`).join('');
  return `<div class="strip"><div class="lanes" style="position:relative;--lab:56px"><div class="axis"><span></span><div class="ticks">${ticks}</div></div>${rows}<span class="nowline" data-t="09:40" style="left:calc(var(--lab) + ${x(NOW) / 100} * (100% - var(--lab)))"></span></div></div>`;
}
function alertRow(a) {
  const r = S.resolved[a.id];
  const [cls, label] = LVL[a.lvl];
  return `<li class="alert ${S.alertSel === a.id ? 'selected' : ''} ${r ? 'resolved' : ''} ${r && r.fresh ? 'enter' : ''}">
    <button class="pick" type="button" data-act="pick" data-id="${a.id}" aria-pressed="${S.alertSel === a.id}">
      <span class="lvl ${r ? 'lvl-done' : cls}">${r ? 'Traité' : label}</span><b>${esc(a.title)}</b><small>${esc(a.ctx)}</small></button>
    <div>${r ? `<span class="resolved-line">${icon('check')}${esc(r.summary)}<button class="btn btn-quiet btn-sm" type="button" data-act="undo" data-id="${a.id}">Annuler</button></span>`
      : `<button class="btn ${a.lvl === 'info' ? 'btn-ghost' : 'btn-primary'} btn-sm" type="button" data-act="do" data-id="${a.id}">${esc(a.action)}</button>`}</div>
  </li>`;
}
function recipientsOf(a) {
  if (a.kind === 'notify') { const keep = S.recip[a.id] || a.recipients; return keep; }
  return null;
}
function detail(a) {
  if (!a) return `<div class="calm"><h3>Tout est à jour pour ce matin.</h3><p>Rien d'urgent avant le contrôle de maths de 14:00. Les nouvelles alertes apparaîtront ici : élèves en retard, leçons incomplètes, changements à annoncer.</p><a class="btn btn-ghost" href="#edt">${icon('calendar')}Voir la semaine</a></div>`;
  const r = S.resolved[a.id];
  const [cls, label] = LVL[a.lvl];
  let content = '';
  if (a.kind === 'notify') {
    const ids = recipientsOf(a);
    content = `<table class="mini"><thead><tr><th>Élève</th><th>Profil</th><th>${a.id === 'a-video' ? 'Vidéo vue' : a.id === 'a-adn' ? 'Résumé' : 'Quiz'}</th><th>Dernière activité</th></tr></thead><tbody>${a.recipients.map(id => {
      const s = stu(id);
      const cell = a.id === 'a-video' ? `<div class="barcell"><span class="bar half ${s.affine < 50 ? 'low' : ''}" title="Le quiz s'ouvre à 50 %"><i style="width:${s.affine}%"></i></span><span class="num">${s.affine} %</span></div>` : a.id === 'a-adn' ? '<span class="tag">Non lu</span>' : '<span class="tag" style="background:var(--teal-soft);color:var(--teal-ink)">3 / 3</span>';
      return `<tr${ids.includes(id) ? '' : ' style="opacity:.45"'}><td>${esc(s.name)}</td><td><span class="tag ${s.profile.toLowerCase()}">${esc(s.profile)}</span></td><td>${cell}</td><td class="muted">${esc(s.last)}</td></tr>`;
    }).join('')}</tbody></table>`;
  } else if (a.kind === 'room') {
    content = `<dl class="kv"><dt>Créneau</dt><dd>${esc(a.when)}</dd><dt>Classe</dt><dd>${esc(a.cls)} · ${esc(TEACHERS.alaoui)}</dd></dl>
      <div class="change"><div><small>Avant</small>${esc(a.from)}</div>${icon('site').replace('class="icon"', 'class="icon" style="transform:scaleX(-1)"')}<div class="new"><small>Après</small>${esc(a.to)}</div></div>`;
  } else if (a.kind === 'support') {
    const s = stu(a.student);
    content = `<dl class="kv"><dt>Profil</dt><dd>${esc(s.profile)} · ${esc(s.pap)}</dd><dt>Quiz PC</dt><dd>Circuits 1 / 3 · Loi d'Ohm 1 / 3</dd><dt>Créneau proposé</dt><dd>Samedi 17 octobre · 11:00 – 12:00 · Salle 3 · M. Idrissi</dd></dl>`;
  } else if (a.kind === 'lesson') {
    const L = lessonById(a.lesson);
    content = `<dl class="kv"><dt>Leçon</dt><dd>${esc(L.title)} · ${esc(L.cls)}</dd><dt>Type</dt><dd>${TYPES[L.type]}</dd><dt>Auteur</dt><dd>${esc(TEACHERS[L.author])}</dd></dl>${partsChecks(L)}`;
  }
  let compose = '';
  if (!r && (a.kind === 'notify' || a.kind === 'room' || a.kind === 'support')) {
    const to = a.kind === 'notify'
      ? (recipientsOf(a).map(id => `<span class="chip">${esc(stu(id).name)}${a.recipients.length > 1 ? `<button type="button" data-act="unrecip" data-id="${a.id}" data-s="${id}" aria-label="Retirer ${esc(stu(id).name)}">${icon('x')}</button>` : ''}</span>`).join('') || '<span class="muted">Aucun destinataire</span>')
      : a.kind === 'room' ? `<span class="chip" style="padding-right:10px">Classe ${esc(a.cls)} · 12 élèves</span>` : `<span class="chip" style="padding-right:10px">${esc(stu(a.student).name)}</span>`;
    compose = `<div class="compose"><div class="to"><b>À :</b>${to}</div>
      <label class="sr-only" for="body-${a.id}">Message</label>
      <textarea id="body-${a.id}" data-bind="alertbody" data-id="${a.id}">${esc(S.bodies[a.id] != null ? S.bodies[a.id] : a.body)}</textarea>
      <div class="foot"><span class="muted">${icon('bell')} « ${esc(a.ntitle)} », dans l'application élève</span><button class="btn btn-primary btn-sm" type="button" data-act="do" data-id="${a.id}" ${a.kind === 'notify' && !recipientsOf(a).length ? 'disabled' : ''}>${icon('send')}${esc(a.action)}</button></div></div>`;
  }
  if (!r && a.kind === 'lesson') compose = `<a class="btn btn-primary" href="#lecons/${a.lesson}">${icon('pen')}${esc(a.action)}</a>`;
  const resolved = r ? `<p class="resolved-line">${icon('check')}${esc(r.summary)} · ${r.at}</p><div><button class="btn btn-ghost btn-sm" type="button" data-act="undo" data-id="${a.id}">Annuler</button> ${r.notif ? '<a class="btn btn-quiet btn-sm" href="#notifs">Voir dans Notifications</a>' : ''}</div>` : '';
  return `<div class="body"><h3>${esc(a.title)}</h3><p class="ctx">${esc(a.ctx)}</p>${content}${compose}${resolved}</div>`;
}
function partsChecks(L) {
  const parts = [['video', 'Vidéo', hasVideo(L.type), !!L.video], ['file', 'Résumé', true, L.resume.sections.length > 0], ['quiz', 'Quiz', hasQuiz(L.type), L.quiz.length > 0]];
  return `<div class="checks">${parts.filter(p => p[2]).map(([ic, label, , ok]) => `<span class="check ${ok ? '' : 'missing'}">${icon(ok ? 'check' : ic)}${label}${ok ? '' : ' manquant'}</span>`).join('')}</div>`;
}
function viewSuivi() {
  const q = S.alertQ.trim().toLowerCase();
  const all = myAlerts().filter(a => !q || (a.title + ' ' + a.ctx).toLowerCase().includes(q));
  const open = all; // resolved rows stay in place, marked « Traité », with their undo
  const done = all.filter(a => S.resolved[a.id]);
  const list = S.alertTab === 'open' ? open : done;
  if (!S.alertSel || !myAlerts().some(a => a.id === S.alertSel)) { const first = myAlerts().find(a => !S.resolved[a.id]); S.alertSel = first ? first.id : null; }
  const sel = myAlerts().find(a => a.id === S.alertSel);
  const nOpen = all.filter(a => !S.resolved[a.id]).length;
  const empty = S.alertTab === 'open'
    ? `<div class="calm"><h3>Tout est traité.</h3><p>Plus rien à faire ce matin. Le contrôle de maths de 14:00 est prêt.</p></div>`
    : `<div class="calm"><h3>Rien de traité pour l'instant.</h3><p>Les alertes que vous traitez aujourd'hui s'affichent ici, avec un bouton pour annuler.</p></div>`;
  return head('Suivi du jour', 'Lundi 12 octobre 2026 · 09:40',
    `<label class="search">${icon('search')}<span class="sr-only">Chercher dans les alertes</span><input type="search" data-bind="alertq" value="${esc(S.alertQ)}" placeholder="Chercher une alerte…"></label><a class="btn btn-primary" href="#lecons/new">${icon('plus')}Nouvelle leçon</a>`) +
    `<section class="panel" aria-labelledby="h-today"><div class="panel-head"><h2 id="h-today">Aujourd'hui</h2><span class="muted">${S.role === 'direction' ? '4 classes' : 'Vos cours en couleur'}</span></div>${strip()}<p class="strip-hint"><span class="hint-hover">Cliquez un créneau pour le modifier.</span><span class="hint-touch">Touchez un créneau pour le modifier.</span></p></section>
    <div class="inbox">
      <section class="panel" aria-labelledby="h-alerts"><div class="panel-head"><h2 id="h-alerts">Alertes du jour</h2>
        <div class="tabs end" role="tablist"><button type="button" role="tab" aria-selected="${S.alertTab === 'open'}" data-act="atab" data-t="open">À traiter <span class="num">${nOpen}</span></button><button type="button" role="tab" aria-selected="${S.alertTab === 'done'}" data-act="atab" data-t="done">Traitées <span class="num">${done.length}</span></button></div></div>
        ${list.length ? `<ul class="alerts">${list.map(alertRow).join('')}</ul>` : empty}</section>
      <aside class="panel detail" aria-label="Détail de l'alerte" aria-live="polite">${detail(sel)}</aside>
    </div>`;
}

/* ---------- actions on alerts ---------- */
const clock = () => { const d = new Date(); return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`; };
function resolveAlert(a) {
  const btns = document.querySelectorAll(`[data-act="do"][data-id="${a.id}"]`);
  btns.forEach(b => { b.setAttribute('aria-busy', 'true'); b.disabled = true; b.innerHTML = `<span class="spinner" aria-hidden="true"></span>Envoi…`; });
  setTimeout(() => {
    let summary = a.done ? a.done() : 'Traité';
    const effects = [];
    let notif = null;
    if (a.kind === 'notify') {
      const ids = recipientsOf(a);
      summary = a.done(ids.length);
      notif = { id: uid('h'), cat: a.cat, title: a.ntitle, body: S.bodies[a.id] != null ? S.bodies[a.id] : a.body, to: ids.length === 1 ? stu(ids[0]).name : `${ids.length} élèves de 3e B`, count: ids.length, when: `Aujourd'hui ${clock()}`, read: 0 };
    } else if (a.kind === 'room') {
      const s = TT.find(x => x.cls === a.cls && x.day === 4 && x.room === a.from);
      if (s) { s.room = a.to; effects.push(() => { s.room = a.from; }); }
      notif = { id: uid('h'), cat: a.cat, title: a.ntitle, body: S.bodies[a.id] != null ? S.bodies[a.id] : a.body, to: a.cls, count: 12, when: `Aujourd'hui ${clock()}`, read: 0 };
    } else if (a.kind === 'support') {
      const id = uid('s');
      TT.push({ id, cls: '3e B', day: 5, start: '11:00', end: '12:00', subj: 'pc', kind: 'Soutien', teacher: 'idrissi', room: 'Salle 3', title: 'Soutien PC · Rania E.' });
      effects.push(() => { TT = TT.filter(x => x.id !== id); });
      notif = { id: uid('h'), cat: a.cat, title: a.ntitle, body: S.bodies[a.id] != null ? S.bodies[a.id] : a.body, to: stu(a.student).name, count: 1, when: `Aujourd'hui ${clock()}`, read: 0 };
    }
    if (notif) { HISTORY.unshift(notif); effects.push(() => { HISTORY = HISTORY.filter(h => h.id !== notif.id); }); }
    S.resolved[a.id] = { summary, at: clock(), fresh: true, notif: !!notif, undo: effects };
    render();
    const badge = document.querySelector('.nav .count');
    if (badge) badge.classList.add('bump');
    toast(summary, () => undoAlert(a.id));
  }, 520);
}
function undoAlert(id) {
  const r = S.resolved[id];
  if (!r) return;
  r.undo.forEach(f => f());
  delete S.resolved[id];
  render();
  toast('Action annulée.');
}
function resolveByLesson(lessonId) {
  ALERTS.filter(a => a.kind === 'lesson' && a.lesson === lessonId && !S.resolved[a.id]).forEach(a => {
    const L = lessonById(lessonId);
    const ok = a.id === 'a-review' ? L.status === 'published' : L.quiz.length > 0;
    if (ok) S.resolved[a.id] = { summary: a.done(), at: clock(), fresh: true, notif: false, undo: [] };
  });
}

/* ---------- Leçons ---------- */
function viewLessons() {
  if (S.param) return viewEditor();
  const q = S.lessonQ.trim().toLowerCase();
  const rows = LESSONS.filter(L => (S.role === 'direction' || L.subj === 'maths') && (S.lessonStatus === 'all' || L.status === S.lessonStatus) && (S.lessonSubj === 'all' || L.subj === S.lessonSubj) && (!q || (L.title + ' ' + L.chapter).toLowerCase().includes(q)));
  const counts = k => LESSONS.filter(L => (S.role === 'direction' || L.subj === 'maths') && (k === 'all' || L.status === k)).length;
  const pills = [['all', 'Toutes'], ['draft', 'Brouillons'], ['review', 'À relire'], ['published', 'Publiées'], ['scheduled', 'Programmées']].map(([k, l]) => `<button type="button" data-act="lstatus" data-k="${k}" aria-pressed="${S.lessonStatus === k}">${l} <span class="num">${counts(k)}</span></button>`).join('');
  const subjOpts = ['all'].concat(Object.keys(SUBJ).filter(k => k !== 'atelier')).map(k => `<option value="${k}" ${S.lessonSubj === k ? 'selected' : ''}>${k === 'all' ? 'Toutes les matières' : SUBJ[k].name}</option>`).join('');
  const body = rows.length ? `<div class="tablewrap"><table class="grid"><thead><tr><th>Leçon</th><th>Classe</th><th>Type</th><th>Contenu</th><th>Statut</th><th>Élèves</th><th>Mise à jour</th></tr></thead><tbody>${rows.map(L => {
    const [stc, stl] = STATUS[L.status];
    const part = (ok, need, ic, label) => !need ? `<span class="part no" title="${label} : sans objet">${icon(ic)}</span>` : `<span class="part ${ok ? '' : 'miss'}" title="${label} ${ok ? 'prêt' : 'manquant'}">${icon(ok ? ic : ic)}<span class="sr-only">${label} ${ok ? 'prêt' : 'manquant'}</span></span>`;
    return `<tr class="row" tabindex="0" data-act="open-lesson" data-id="${L.id}"><td><div class="title-cell"><span class="dot" style="${sv(L.subj)}"></span><span>${esc(L.title)}<br><small class="muted" style="font-weight:600">${esc(SUBJ[L.subj].name)} · ${esc(L.chapter)}</small></span></div></td>
      <td>${esc(L.cls)}</td><td class="muted" style="font-weight:600">${TYPES[L.type]}</td>
      <td><div class="parts">${part(!!L.video, hasVideo(L.type), 'video', 'Vidéo')}${part(L.resume.sections.length > 0, true, 'file', 'Résumé')}${part(L.quiz.length > 0, hasQuiz(L.type), 'quiz', 'Quiz')}</div></td>
      <td><span class="status ${stc}">${stl}</span>${L.status === 'scheduled' && L.schedule ? `<br><small class="muted" style="font-weight:600">${esc(L.schedule)}</small>` : ''}</td>
      <td>${L.avg != null ? `<div class="barcell" style="${sv(L.subj)}"><span class="bar"><i style="width:${L.avg}%"></i></span><span class="num">${L.avg} %</span></div>` : '<span class="muted">Pas encore publiée</span>'}</td>
      <td class="muted" style="font-weight:600">${esc(L.updated)}</td></tr>`;
  }).join('')}</tbody></table></div>` : `<div class="calm"><h3>Aucune leçon ne correspond.</h3><p>Changez de filtre, ou créez une leçon : vidéo, résumé et quiz, ou seulement un résumé.</p><a class="btn btn-primary" href="#lecons/new">${icon('plus')}Nouvelle leçon</a></div>`;
  return head('Leçons', S.role === 'direction' ? 'Toutes les matières' : 'Vos leçons de maths',
    `<label class="search">${icon('search')}<span class="sr-only">Chercher une leçon</span><input type="search" data-bind="lessonq" value="${esc(S.lessonQ)}" placeholder="Chercher une leçon…"></label><a class="btn btn-primary" href="#lecons/new">${icon('plus')}Nouvelle leçon</a>`) +
    `<section class="panel"><div class="toolbar"><div class="pills" role="group" aria-label="Statut">${pills}</div>${S.role === 'direction' ? `<label class="field" style="margin-left:auto"><span class="sr-only">Matière</span><select data-bind="lessonsubj">${subjOpts}</select></label>` : ''}</div>${body}</section>`;
}
function newDraft() {
  return { id: null, title: '', subj: 'maths', cls: '3e B', chapter: '', type: 'vqr', video: null, resume: { sections: [{ h: '', p: '' }], retenir: '' }, quiz: [{ q: '', o: ['', '', ''], a: 0, e: '' }], publish: 'now', at: '2026-10-19T08:00', notify: true, status: 'draft', author: S.role === 'benali' ? 'benali' : 'benali' };
}
function openEditor(id) {
  if (id === 'new') S.draft = newDraft();
  else {
    const L = lessonById(id);
    if (!L) { location.hash = '#lecons'; return; }
    S.draft = JSON.parse(JSON.stringify(L));
    if (hasQuiz(S.draft.type) && !S.draft.quiz.length) S.draft.quiz = [{ q: '', o: ['', '', ''], a: 0, e: '' }];
    S.draft.publish = L.status === 'scheduled' ? 'schedule' : L.status === 'draft' || L.status === 'review' ? 'now' : 'now';
    S.draft.at = '2026-10-19T08:00';
    S.draft.notify = true;
  }
  S.edErrors = {}; S.edMsg = '';
}
function preview(d) {
  const sj = SUBJ[d.subj];
  const tabs = d.type === 'vqr' ? ['Vidéo', 'Résumé', 'Quiz'] : d.type === 'rq' ? ['Résumé', 'Quiz'] : ['Résumé'];
  const firstSection = d.resume.sections.find(s => s.h || s.p) || { h: 'Résumé', p: 'Le texte du résumé apparaîtra ici.' };
  return `<div class="preview" aria-label="Aperçu dans l'application élève"><span>Aperçu dans l'application élève</span><div class="mini-phone"><div class="mini-screen">
    <div class="mp-hero" style="${sv(d.subj)}"><b>${esc(d.title || 'Titre de la leçon')}</b><small>${esc(sj.name)}${d.chapter ? ' · ' + esc(d.chapter) : ''}</small>
      ${tabs.length > 1 ? `<div class="mp-tabs">${tabs.map((t, i) => `<span class="${i === 0 ? 'on' : ''}">${t === 'Quiz' && d.type === 'vqr' ? icon('lock') : ''}${t}</span>`).join('')}</div>` : ''}</div>
    ${d.type === 'vqr' ? `<div class="mp-video">${d.video ? esc(d.video.name.replace(/\.[a-z0-9]+$/i, '')) : 'Vidéo à ajouter'}</div><div class="mp-track" aria-hidden="true"></div><div class="mp-btn">${icon('lock')}Quiz à 50 % de la vidéo</div>`
      : `<div class="mp-card" style="margin-top:12px"><b style="color:var(--ink);display:block;font:500 13px var(--font-display)">${esc(firstSection.h)}</b>${esc(firstSection.p)}</div>${d.type === 'rq' ? `<div class="mp-btn">${icon('quiz')}${d.quiz.length} question${d.quiz.length > 1 ? 's' : ''}</div>` : ''}`}
  </div></div></div>`;
}
function viewEditor() {
  const d = S.draft;
  if (!d) return '';
  const E = S.edErrors;
  const isNew = !d.id;
  const subjOpts = Object.keys(SUBJ).filter(k => k !== 'atelier' && (S.role === 'direction' || k === 'maths')).map(k => `<option value="${k}" ${d.subj === k ? 'selected' : ''}>${SUBJ[k].name}</option>`).join('');
  const clsOpts = CLASSES.map(c => `<option ${d.cls === c ? 'selected' : ''}>${c}</option>`).join('');
  const typeCard = (k, t, s) => `<label><input type="radio" name="ltype" value="${k}" data-bind="type" ${d.type === k ? 'checked' : ''}><b>${t}</b><small>${s}</small></label>`;
  const video = hasVideo(d.type) ? `<section class="sect" aria-labelledby="sv"><h2 id="sv">${icon('video')}Vidéo</h2>
    ${d.video ? `<div class="drop has"><span class="ic">${icon('video')}</span><span><b>${esc(d.video.name)}</b><span>${esc(d.video.dur)} · ${d.video.chapters.length} chapitre${d.video.chapters.length > 1 ? 's' : ''}</span></span><button class="btn btn-quiet btn-sm" type="button" data-act="vremove">${icon('trash')}Retirer</button></div>
      <div class="chapters">${d.video.chapters.map((c, i) => `<div class="ch"><label class="sr-only" for="ct${i}">Début du chapitre ${i + 1}</label><div class="field"><input id="ct${i}" value="${esc(c.t)}" data-bind="ch-t" data-i="${i}" class="num"></div><label class="sr-only" for="cn${i}">Titre du chapitre ${i + 1}</label><div class="field"><input id="cn${i}" value="${esc(c.title)}" data-bind="ch-title" data-i="${i}" placeholder="Titre du chapitre"></div><button class="btn btn-quiet btn-sm" type="button" data-act="ch-del" data-i="${i}" aria-label="Supprimer le chapitre ${i + 1}">${icon('x')}</button></div>`).join('')}
      <button class="btn btn-ghost btn-sm" type="button" data-act="ch-add" style="justify-self:start">${icon('plus')}Ajouter un chapitre</button></div>`
    : `<div class="drop ${E.video ? 'err' : ''}"><span class="ic">${icon('upload')}</span><span><b>Déposer la vidéo du cours</b><span>MP4 ou MOV. La durée et les chapitres s'affichent ensuite.</span></span><span style="display:flex;gap:8px"><label class="btn btn-ghost btn-sm" for="vfile">Choisir un fichier</label><button class="btn btn-quiet btn-sm" type="button" data-act="vsample">Vidéo d'exemple</button></span><input id="vfile" type="file" accept="video/*" class="sr-only" data-bind="vfile"></div>${E.video ? `<span class="err" style="color:#B3123C;font-weight:700;font-size:.75rem">${E.video}</span>` : ''}`}
    <div class="rule">${icon('lock')}Le quiz s'ouvre quand l'élève a regardé 50 % de la vidéo. Avancer la barre ne compte pas.</div></section>` : '';
  const resume = `<section class="sect" aria-labelledby="sr"><h2 id="sr">${icon('file')}Résumé <span class="muted">la fiche de révision</span></h2>
    ${d.resume.sections.map((s, i) => `<div class="q"><div class="q-head">Partie ${i + 1}${d.resume.sections.length > 1 ? `<button class="btn btn-quiet btn-sm" type="button" data-act="rs-del" data-i="${i}">${icon('trash')}Supprimer</button>` : ''}</div>
      <div class="field"><label for="rh${i}">Titre</label><input id="rh${i}" value="${esc(s.h)}" data-bind="rs-h" data-i="${i}" placeholder="Ex. Définition"></div>
      <div class="field"><label for="rp${i}">Texte</label><textarea id="rp${i}" data-bind="rs-p" data-i="${i}" placeholder="L'essentiel, en phrases courtes">${esc(s.p)}</textarea></div></div>`).join('')}
    <button class="btn btn-ghost btn-sm" type="button" data-act="rs-add" style="justify-self:start">${icon('plus')}Ajouter une partie</button>
    <div class="field"><label for="ret">À retenir</label><textarea id="ret" data-bind="retenir" placeholder="Les deux ou trois points clés">${esc(d.resume.retenir)}</textarea></div>
    ${E.resume ? `<span class="field"><span class="err">${E.resume}</span></span>` : ''}</section>`;
  const quiz = hasQuiz(d.type) ? `<section class="sect" aria-labelledby="sq" id="quiz-section"><h2 id="sq">${icon('quiz')}Quiz <span class="muted">60 % de bonnes réponses pour valider</span></h2>
    ${d.quiz.map((q, i) => `<div class="q"><div class="q-head">Question ${i + 1}<button class="btn btn-quiet btn-sm" type="button" data-act="q-del" data-i="${i}">${icon('trash')}Supprimer</button></div>
      <div class="field"><label for="qq${i}">Question</label><input id="qq${i}" value="${esc(q.q)}" data-bind="q-q" data-i="${i}" placeholder="Ex. Pour f(x) = 2x + 1, que vaut f(3) ?" ${E['q' + i] ? 'aria-invalid="true"' : ''}></div>
      <fieldset style="border:0;padding:0;margin:0;display:grid;gap:8px"><legend class="field" style="padding:0;margin-bottom:6px"><span class="lbl" style="font-size:.75rem;font-weight:700;color:var(--ink-2)">Réponses (cochez la bonne)</span></legend>
        ${q.o.map((o, j) => `<div class="opt"><input type="radio" name="qa${i}" value="${j}" data-bind="q-a" data-i="${i}" ${q.a === j ? 'checked' : ''} aria-label="Bonne réponse : réponse ${j + 1}"><div class="field"><label class="sr-only" for="qo${i}-${j}">Réponse ${j + 1}</label><input id="qo${i}-${j}" value="${esc(o)}" data-bind="q-o" data-i="${i}" data-j="${j}" placeholder="Réponse ${j + 1}"></div></div>`).join('')}
        ${q.o.length < 4 ? `<button class="btn btn-quiet btn-sm" type="button" data-act="o-add" data-i="${i}" style="justify-self:start">${icon('plus')}Ajouter une réponse</button>` : ''}</fieldset>
      <div class="field"><label for="qe${i}">Explication affichée après la réponse</label><input id="qe${i}" value="${esc(q.e)}" data-bind="q-e" data-i="${i}" placeholder="Pourquoi c'est la bonne réponse"></div>
      ${E['q' + i] ? `<span class="field"><span class="err">${E['q' + i]}</span></span>` : ''}</div>`).join('')}
    <button class="btn btn-ghost btn-sm" type="button" data-act="q-add" style="justify-self:start">${icon('plus')}Ajouter une question</button>
    ${E.quiz ? `<span class="field"><span class="err">${E.quiz}</span></span>` : ''}</section>` : '';
  const publish = `<section class="sect" aria-labelledby="sp"><h2 id="sp">Publication</h2>
    <div class="radios" role="radiogroup" aria-labelledby="sp">
      <label><input type="radio" name="pub" value="now" data-bind="publish" ${d.publish === 'now' ? 'checked' : ''}>Publier maintenant</label>
      <label><input type="radio" name="pub" value="schedule" data-bind="publish" ${d.publish === 'schedule' ? 'checked' : ''}>Programmer</label>
      <label><input type="radio" name="pub" value="draft" data-bind="publish" ${d.publish === 'draft' ? 'checked' : ''}>Garder en brouillon</label></div>
    ${d.publish === 'schedule' ? `<div class="field" style="max-width:260px"><label for="pat">Date et heure</label><input id="pat" type="datetime-local" value="${esc(d.at)}" data-bind="at"></div>` : ''}
    ${d.publish !== 'draft' ? `<label class="checkline"><input type="checkbox" data-bind="notify" ${d.notify ? 'checked' : ''}>Prévenir la classe ${esc(d.cls)} à la publication</label>` : ''}</section>`;
  const st = d.id ? STATUS[lessonById(d.id).status] : STATUS.draft;
  const saveLabel = d.publish === 'now' ? 'Publier' : d.publish === 'schedule' ? 'Programmer' : 'Enregistrer le brouillon';
  return head(isNew ? 'Nouvelle leçon' : esc(d.title || 'Leçon'), `<span class="status ${st[0]}">${st[1]}</span>`, `<a class="btn btn-ghost" href="#lecons">${icon('left')}Toutes les leçons</a>`) +
    `<div class="editor"><form class="panel" id="lesson-form" novalidate>
      <section class="sect" aria-labelledby="si"><h2 id="si">La leçon</h2>
        <div class="field"><label for="lt">Titre</label><input id="lt" value="${esc(d.title)}" data-bind="title" placeholder="Ex. Fonctions affines" ${E.title ? 'aria-invalid="true"' : ''}>${E.title ? `<span class="err">${E.title}</span>` : ''}</div>
        <div class="row3"><div class="field"><label for="ls">Matière</label><select id="ls" data-bind="subj">${subjOpts}</select></div><div class="field"><label for="lc">Classe</label><select id="lc" data-bind="cls">${clsOpts}</select></div><div class="field"><label for="lch">Chapitre</label><input id="lch" value="${esc(d.chapter)}" data-bind="chapter" placeholder="Ex. Chapitre 4 · Fonctions"></div></div>
        <div class="field"><span class="lbl" id="ltype-l">Type de leçon</span><div class="types" role="radiogroup" aria-labelledby="ltype-l">${typeCard('vqr', 'Vidéo, résumé et quiz', 'Le quiz s\'ouvre à 50 % de la vidéo')}${typeCard('rq', 'Résumé et quiz', 'Une fiche, puis les questions')}${typeCard('r', 'Résumé seul', 'Une fiche de révision')}</div></div>
      </section>
      ${video}${resume}${quiz}${publish}
      <div class="bottombar"><span class="err" role="alert">${esc(S.edMsg)}</span>${!isNew && d.id ? '' : ''}<a class="btn btn-quiet" href="#lecons">Annuler</a><button class="btn btn-primary" type="submit">${icon(d.publish === 'draft' ? 'check' : 'send')}${saveLabel}</button></div>
    </form>${preview(d)}</div>`;
}
function validateDraft(d) {
  const E = {};
  if (!d.title.trim()) E.title = 'Donnez un titre à la leçon.';
  if (hasVideo(d.type) && !d.video && d.publish !== 'draft') E.video = 'Ajoutez la vidéo avant de publier, ou gardez la leçon en brouillon.';
  if (d.publish !== 'draft' && !d.resume.sections.some(s => s.p.trim())) E.resume = 'Écrivez au moins une partie du résumé.';
  if (hasQuiz(d.type) && d.publish !== 'draft') {
    const full = d.quiz.filter(q => q.q.trim() && q.o.filter(o => o.trim()).length >= 2 && (q.o[q.a] || '').trim());
    if (!full.length) E.quiz = 'Ajoutez au moins une question complète : la question, deux réponses et la bonne cochée.';
    d.quiz.forEach((q, i) => { if (q.q.trim() && !(q.o[q.a] || '').trim()) E['q' + i] = 'La réponse cochée est vide.'; });
  }
  return E;
}
function saveDraft() {
  const d = S.draft;
  S.edErrors = validateDraft(d);
  const n = Object.keys(S.edErrors).length;
  if (n) { S.edMsg = n === 1 ? 'Un point à corriger avant d\'enregistrer.' : `${n} points à corriger avant d'enregistrer.`; render(); const first = document.querySelector('[aria-invalid="true"], .err:not(:empty)'); if (first && first.scrollIntoView) first.scrollIntoView({ block: 'center' }); return; }
  const status = d.publish === 'now' ? 'published' : d.publish === 'schedule' ? 'scheduled' : 'draft';
  const clean = Object.assign({}, d, { quiz: hasQuiz(d.type) ? d.quiz.filter(q => q.q.trim()) : [], video: hasVideo(d.type) ? d.video : null, status, updated: `Aujourd'hui ${clock()}` });
  if (status === 'scheduled') clean.schedule = d.at.replace('T', ' ');
  let L = d.id ? lessonById(d.id) : null;
  if (L) Object.assign(L, clean);
  else { clean.id = uid('l'); clean.avg = null; LESSONS.unshift(clean); L = clean; }
  let msg = status === 'published' ? 'Leçon publiée' : status === 'scheduled' ? 'Leçon programmée' : 'Brouillon enregistré';
  if (status !== 'draft' && d.notify) {
    HISTORY.unshift({ id: uid('h'), cat: 'cours', title: `Nouvelle leçon en ${SUBJ[L.subj].name}`, body: `« ${L.title} » est disponible.`, to: L.cls, count: 12, when: status === 'scheduled' ? `Programmée · ${clean.schedule}` : `Aujourd'hui ${clock()}`, read: 0 });
    msg += ` · classe ${L.cls} prévenue`;
  }
  resolveByLesson(L.id);
  S.draft = null;
  location.hash = '#lecons';
  toast(msg);
}

/* ---------- Élèves ---------- */
function viewStudents() {
  const q = S.stuQ.trim().toLowerCase();
  const late = s => s.video < 50 || s.quiz / QUIZ_TOTAL < 0.5;
  const rows = STUDENTS.filter(s => (S.stuFilter === 'all' || (S.stuFilter === 'late' && late(s)) || (S.stuFilter === 'pap' && s.profile !== 'Typique')) && (!q || s.name.toLowerCase().includes(q)));
  const sel = stu(S.stuSel) || STUDENTS[0];
  const pills = [['all', 'Tous', STUDENTS.length], ['late', 'En retard', STUDENTS.filter(late).length], ['pap', 'Profils accompagnés', STUDENTS.filter(s => s.profile !== 'Typique').length]].map(([k, l, n]) => `<button type="button" data-act="sfilter" data-k="${k}" aria-pressed="${S.stuFilter === k}">${l} <span class="num">${n}</span></button>`).join('');
  const table = rows.length ? `<div class="tablewrap"><table class="grid"><thead><tr><th>Élève</th><th>Profil</th><th>Vidéos vues</th><th>Résumés lus</th><th>Quiz réussis</th><th>Dernière activité</th></tr></thead><tbody>${rows.map(s => `<tr class="row ${s.id === sel.id ? 'selected' : ''}" tabindex="0" data-act="stu" data-id="${s.id}" aria-selected="${s.id === sel.id}">
      <td><div class="person"><span class="avatar">${initials(s.name)}</span><b>${esc(s.name)}</b></div></td>
      <td><span class="tag ${s.profile.toLowerCase()}">${esc(s.profile)}</span></td>
      <td><div class="barcell"><span class="bar half ${s.video < 50 ? 'low' : ''}" title="Le quiz s'ouvre à 50 % de chaque vidéo"><i style="width:${s.video}%"></i></span><span class="num">${s.video} %</span></div></td>
      <td class="num">${s.res} / ${RES_TOTAL}</td><td class="num">${s.quiz} / ${QUIZ_TOTAL}</td><td class="muted" style="font-weight:600">${esc(s.last)}</td></tr>`).join('')}</tbody></table></div>`
    : '<div class="calm"><h3>Aucun élève ne correspond.</h3><p>Essayez un autre nom ou un autre filtre.</p></div>';
  const file = `<aside class="panel file" aria-label="Dossier de ${esc(sel.name)}"><div class="body">
    <div class="person"><span class="avatar" style="width:44px;height:44px;font-size:.9375rem">${initials(sel.name)}</span><span><h3>${esc(sel.name)}</h3><span class="muted" style="font-weight:600">3e B · <span class="tag ${sel.profile.toLowerCase()}">${esc(sel.profile)}</span></span></span></div>
    <p class="note">${esc(sel.pap)}</p>
    <div style="display:grid;gap:8px"><b style="font-size:.8125rem">Avancement par matière</b>${['maths', 'pc', 'svt', 'fr', 'ang', 'hg'].map(k => `<div class="subj-row" style="${sv(k)}"><span>${SUBJ[k].name}</span><span class="bar ${sel.subj[k] < 50 ? 'low' : ''}"><i style="width:${sel.subj[k]}%"></i></span><span class="num" style="text-align:right">${sel.subj[k]} %</span></div>`).join('')}</div>
    <div style="display:grid;gap:8px"><b style="font-size:.8125rem">Cette semaine</b><ul class="timeline">
      <li><span>Lun.</span><span>Vidéo « Fonctions affines » vue à ${sel.affine} %${sel.affine >= 50 ? ', quiz débloqué' : ''}.</span></li>
      <li><span>Dim.</span><span>${sel.res >= 6 ? 'Résumé « ADN, gènes et chromosomes » lu.' : 'Aucun résumé lu.'}</span></li>
      <li><span>Ven.</span><span>Quiz « Théorème de Thalès » : ${sel.quiz >= 5 ? '3 / 3' : sel.quiz >= 3 ? '2 / 3' : '1 / 3'}.</span></li></ul></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary" type="button" data-act="write-to" data-id="${sel.id}">${icon('send')}Écrire à l'élève</button><button class="btn btn-ghost" type="button" data-act="support-for" data-id="${sel.id}">${icon('calendar')}Planifier un soutien</button></div>
  </div></aside>`;
  return head('Élèves', '3e B · 12 élèves', `<label class="search">${icon('search')}<span class="sr-only">Chercher un élève</span><input type="search" data-bind="stuq" value="${esc(S.stuQ)}" placeholder="Chercher un élève…"></label>`) +
    `<div class="split"><section class="panel"><div class="toolbar"><div class="pills" role="group" aria-label="Filtre">${pills}</div></div>${table}</section>${file}</div>`;
}

/* ---------- Emploi du temps ---------- */
function conflictsFor(d) {
  if (!d) return [];
  const a = toMin(d.start), b = toMin(d.end);
  return TT.filter(s => s.id !== d.id && s.day === +d.day && toMin(s.start) < b && a < toMin(s.end) && (s.room === d.room || s.teacher === d.teacher || s.cls === d.cls))
    .map(s => s.cls === d.cls ? `${d.cls} a déjà ${s.title || SUBJ[s.subj].name} de ${s.start} à ${s.end}.` : s.room === d.room ? `${s.room} est déjà occupée par ${s.cls} (${SUBJ[s.subj].name}, ${TEACHERS[s.teacher]}) de ${s.start} à ${s.end}.` : `${TEACHERS[s.teacher]} a déjà cours avec ${s.cls} de ${s.start} à ${s.end}.`);
}
function viewEdt() {
  const H0 = 8 * 60, H1 = 18 * 60, H = 520, px = H / (H1 - H0);
  const cls = S.edtClass;
  const cols = DAYS.map((dname, di) => `<div class="col"><span class="lunch" style="top:${(720 - H0) * px}px;height:${120 * px}px"></span>${TT.filter(s => s.cls === cls && s.day === di).map(s => {
    const top = (toMin(s.start) - H0) * px, h = (toMin(s.end) - toMin(s.start)) * px - 3;
    const exam = s.kind === 'Contrôle';
    const trimmed = s.title ? s.title.replace(/^Atelier\s+/, '').replace('Soutien scolaire · ', 'Soutien ').replace('Soutien PC · ', 'Soutien ') : '';
    const short = exam ? `Contrôle ${SUBJ[s.subj].short}` : trimmed ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1) : SUBJ[s.subj].short;
    return `<button type="button" class="wb ${exam ? 'exam' : ''} ${S.edtSel === s.id ? 'selected' : ''} ${S.flash === s.id ? 'new' : ''}" style="${sv(s.subj)};top:${top}px;height:${h}px" data-act="slot" data-id="${s.id}" title="${esc(s.title || SUBJ[s.subj].name)} · ${s.start}–${s.end} · ${esc(s.room)} · ${esc(TEACHERS[s.teacher])}"><b>${esc(short)}</b>${h > 40 ? `<span class="num">${s.start} – ${s.end}</span>` : ''}${h > 58 ? `<span>${esc(s.room)}</span>` : ''}${h > 74 ? `<span>${esc(TEACHERS[s.teacher])}</span>` : ''}</button>`;
  }).join('')}</div>`).join('');
  const hours = `<div class="hours">${[8, 10, 12, 14, 16, 18].map(h => `<span class="num" style="top:${(h * 60 - H0) * px}px">${h}h</span>`).join('')}</div>`;
  const dh = `<span></span>${DAYS.map((d, i) => `<span class="dh ${i === 0 ? 'today' : ''}">${d.slice(0, 3)}. ${DATES[i]}</span>`).join('')}`;
  const d = S.edtDraft;
  let side;
  if (d) {
    const conf = conflictsFor(d);
    const bad = toMin(d.end) <= toMin(d.start);
    const sel = (bind, opts, val) => `<select id="e-${bind}" data-bind="e-${bind}">${opts.map(([v, l]) => `<option value="${esc(v)}" ${String(val) === String(v) ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
    side = `<aside class="panel file" aria-label="${d.id ? 'Modifier le créneau' : 'Nouveau créneau'}"><form class="body" id="slot-form" novalidate>
      <h3>${d.id ? 'Modifier le créneau' : 'Nouveau créneau'}</h3>
      <div class="row2"><div class="field"><label for="e-subj">Matière</label>${sel('subj', Object.keys(SUBJ).map(k => [k, SUBJ[k].name]), d.subj)}</div><div class="field"><label for="e-kind">Type</label>${sel('kind', KINDS.map(k => [k, k]), d.kind)}</div></div>
      <div class="field"><label for="e-title">Intitulé <span class="hint">(facultatif)</span></label><input id="e-title" value="${esc(d.title)}" data-bind="e-title" placeholder="Ex. Contrôle · Fonctions affines"></div>
      <div class="row2"><div class="field"><label for="e-teacher">Professeur</label>${sel('teacher', Object.keys(TEACHERS).map(k => [k, TEACHERS[k]]), d.teacher)}</div><div class="field"><label for="e-room">Salle</label>${sel('room', ROOMS.map(r => [r, r]), d.room)}</div></div>
      <div class="row3"><div class="field"><label for="e-day">Jour</label>${sel('day', DAYS.map((x, i) => [i, `${x} ${DATES[i]}`]), d.day)}</div><div class="field"><label for="e-start">Début</label><input id="e-start" type="time" step="900" min="07:00" max="20:00" value="${d.start}" data-bind="e-start"></div><div class="field"><label for="e-end">Fin</label><input id="e-end" type="time" step="900" min="07:00" max="20:00" value="${d.end}" data-bind="e-end" ${bad ? 'aria-invalid="true"' : ''}></div></div>
      ${bad ? '<p class="warn" role="alert" style="background:#FDE6EB;color:#9E1239">L\'heure de fin doit être après l\'heure de début.</p>' : ''}
      ${conf.length ? `<p class="warn" role="alert">${conf.map(esc).join('<br>')}</p>` : ''}
      <label class="checkline"><input type="checkbox" data-bind="e-notify" ${S.edtNotify ? 'checked' : ''}>Prévenir la classe ${esc(d.cls)} du changement</label>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary" type="submit" ${bad ? 'disabled' : ''}>${icon('check')}${conf.length ? 'Enregistrer quand même' : 'Enregistrer'}</button><button class="btn btn-quiet" type="button" data-act="edt-cancel">Annuler</button>${d.id ? `<button class="btn btn-danger" type="button" data-act="edt-del" style="margin-left:auto">${icon('trash')}Supprimer</button>` : ''}</div>
    </form></aside>`;
  } else {
    side = '';
  }
  const clsOpts = CLASSES.map(c => `<option ${c === cls ? 'selected' : ''}>${c}</option>`).join('');
  return head('Emploi du temps', 'Semaine du 12 au 17 octobre 2026', `<label class="field"><span class="sr-only">Classe</span><select data-bind="edtclass">${clsOpts}</select></label><button class="btn btn-primary" type="button" data-act="edt-new">${icon('plus')}Ajouter un créneau</button>`) +
    `<div class="split ${side ? '' : 'solo'}"><section class="panel" aria-labelledby="h-week"><div class="panel-head"><h2 id="h-week">Semaine de ${cls}</h2><span class="muted"><span class="hint-hover">Cliquez un cours pour changer la salle, l'horaire ou le professeur.</span><span class="hint-touch">Touchez un cours pour le modifier.</span></span></div><div class="week">${dh}${hours}${cols}</div></section>${side}</div>`;
}
function slotDraft(id) {
  const s = TT.find(x => x.id === id);
  return s ? Object.assign({}, s) : { id: null, cls: S.edtClass, day: 5, start: '11:00', end: '12:00', subj: 'maths', kind: 'Soutien', teacher: 'benali', room: 'Salle 3', title: '' };
}
function saveSlot() {
  const d = S.edtDraft;
  if (toMin(d.end) <= toMin(d.start)) return;
  const item = { id: d.id || uid('s'), cls: d.cls, day: +d.day, start: d.start, end: d.end, subj: d.subj, kind: d.kind, teacher: d.teacher, room: d.room, title: d.title.trim() };
  const existing = TT.find(x => x.id === d.id);
  if (existing) Object.assign(existing, item); else TT.push(item);
  let msg = existing ? 'Créneau modifié' : 'Créneau ajouté';
  if (S.edtNotify) {
    HISTORY.unshift({ id: uid('h'), cat: 'edt', title: existing ? 'Changement dans ton emploi du temps' : 'Nouveau créneau', body: `${item.title || SUBJ[item.subj].name} · ${DAYS[item.day]} ${DATES[item.day]} octobre · ${item.start} – ${item.end} · ${item.room}.`, to: item.cls, count: 12, when: `Aujourd'hui ${clock()}`, read: 0 });
    msg += ` · classe ${item.cls} prévenue`;
  }
  S.flash = item.id; S.edtSel = null; S.edtDraft = null;
  render(); toast(msg);
  setTimeout(() => { S.flash = null; }, 700);
}

/* ---------- Notifications ---------- */
function viewNotifs() {
  const c = S.compose;
  const [cic, clabel, ck] = CATS[c.cat];
  const toLabel = c.to === 'student' ? (stu(c.student) || STUDENTS[0]).name : c.to;
  const toOpts = [...CLASSES.map(x => [x, `Classe ${x}`]), ['Tout le collège', 'Tout le collège'], ['student', 'Un élève de 3e B']].map(([v, l]) => `<option value="${esc(v)}" ${c.to === v ? 'selected' : ''}>${esc(l)}</option>`).join('');
  const hist = HISTORY.map(h => { const [ic, , k] = CATS[h.cat]; return `<div class="notif-row ${S.lastSent === h.id ? 'fresh' : ''}" style="${sv(k)}"><span class="ic">${icon(ic)}</span><div><b>${esc(h.title)}</b><p>${esc(h.body)}</p></div><div class="meta">${esc(h.to)}<br>${esc(h.when)}<br>${h.read ? `Lue par ${h.read} / ${h.count}` : h.when.startsWith('Programmée') ? 'En attente' : 'Envoyée'}</div></div>`; }).join('');
  return head('Notifications', 'Ce que les élèves reçoivent dans leur application') +
    `<div class="split notifs"><section class="panel" aria-labelledby="h-hist"><div class="panel-head"><h2 id="h-hist">Envoyées</h2><span class="muted">${HISTORY.length} cette semaine</span></div>${hist}</section>
    <aside class="panel file" aria-labelledby="h-new"><form class="body" id="notif-form" novalidate><h3 id="h-new">Nouvelle notification</h3>
      <div class="row2"><div class="field"><label for="n-to">Destinataires</label><select id="n-to" data-bind="n-to">${toOpts}</select></div>
        <div class="field"><label for="n-cat">Catégorie</label><select id="n-cat" data-bind="n-cat">${Object.keys(CATS).map(k => `<option value="${k}" ${c.cat === k ? 'selected' : ''}>${CATS[k][1]}</option>`).join('')}</select></div></div>
      ${c.to === 'student' ? `<div class="field"><label for="n-stu">Élève</label><select id="n-stu" data-bind="n-stu">${STUDENTS.map(s => `<option value="${s.id}" ${c.student === s.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select></div>` : ''}
      <div class="field"><label for="n-title">Titre</label><input id="n-title" value="${esc(c.title)}" data-bind="n-title" maxlength="60" placeholder="Ex. Contrôle de maths jeudi" ${S.composeErr && !c.title.trim() ? 'aria-invalid="true"' : ''}></div>
      <div class="field"><label for="n-body">Message</label><textarea id="n-body" data-bind="n-body" maxlength="200" placeholder="Une phrase claire, avec le jour, l'heure et la salle si besoin." ${S.composeErr && !c.body.trim() ? 'aria-invalid="true"' : ''}>${esc(c.body)}</textarea><span class="hint"><span data-count class="num">${c.body.length}</span> / 200</span></div>
      <div class="radios" role="radiogroup" aria-label="Quand"><label><input type="radio" name="when" value="now" data-bind="n-when" ${c.when === 'now' ? 'checked' : ''}>Maintenant</label><label><input type="radio" name="when" value="later" data-bind="n-when" ${c.when === 'later' ? 'checked' : ''}>Programmer</label></div>
      ${c.when === 'later' ? `<div class="field" style="max-width:240px"><label for="n-at">Date et heure</label><input id="n-at" type="datetime-local" value="${esc(c.at)}" data-bind="n-at"></div>` : ''}
      <div style="display:grid;gap:6px"><span class="field"><span class="lbl">Aperçu chez l'élève</span></span><div class="app-notif" style="${sv(ck)}" data-preview><span class="ic">${icon(cic)}</span><span><b>${esc(c.title || 'Titre de la notification')}</b><span>${esc(c.body || 'Le message apparaîtra ici.')}</span></span></div></div>
      ${S.composeErr ? `<p class="field"><span class="err" role="alert">${esc(S.composeErr)}</span></p>` : ''}
      <button class="btn btn-primary" type="submit">${icon('send')}${c.when === 'now' ? `Envoyer à ${esc(toLabel)}` : 'Programmer l\'envoi'}</button>
    </form></aside></div>`;
}
function sendCompose() {
  const c = S.compose;
  if (!c.title.trim() || !c.body.trim()) { S.composeErr = !c.title.trim() ? 'Ajoutez un titre court.' : 'Écrivez le message.'; render(); return; }
  const to = c.to === 'student' ? stu(c.student).name : c.to;
  const count = c.to === 'student' ? 1 : c.to === 'Tout le collège' ? 48 : 12;
  const id = uid('h');
  HISTORY.unshift({ id, cat: c.cat, title: c.title.trim(), body: c.body.trim(), to, count, when: c.when === 'now' ? `Aujourd'hui ${clock()}` : `Programmée · ${c.at.replace('T', ' ')}`, read: 0 });
  S.lastSent = id; S.composeErr = '';
  S.compose = Object.assign({}, c, { title: '', body: '' });
  render();
  toast(c.when === 'now' ? `Envoyée à ${to}` : 'Envoi programmé', () => { HISTORY = HISTORY.filter(h => h.id !== id); render(); });
}

/* ---------- router + render ---------- */
const VIEWS = { suivi: viewSuivi, lecons: viewLessons, eleves: viewStudents, edt: viewEdt, notifs: viewNotifs };
function route() {
  const [v, p] = (location.hash || '#suivi').slice(1).split('/');
  S.view = VIEWS[v] ? v : 'suivi';
  S.param = p || null;
  if (S.view === 'lecons' && S.param && (!S.draft || (S.draft.id || 'new') !== S.param)) openEditor(S.param);
  if (S.view === 'lecons' && !S.param) S.draft = null;
  $('#app').classList.remove('menu-open');
  render(true);
}
function render(top) {
  const view = $('#view');
  const y = window.scrollY;
  renderChrome();
  view.innerHTML = VIEWS[S.view]();
  if (top) { window.scrollTo(0, 0); view.focus({ preventScroll: true }); } else window.scrollTo(0, y);
  if (S.view === 'lecons' && S.param && S.focusQuiz) { const q = $('#quiz-section'); if (q) q.scrollIntoView({ block: 'start' }); S.focusQuiz = false; }
  Object.values(S.resolved).forEach(r => { r.fresh = false; });
}

/* ---------- events ---------- */
const ACT = {
  menu: () => $('#app').classList.toggle('menu-open'),
  role: d => { S.role = d.role; S.alertSel = null; S.edtSel = null; S.edtDraft = null; render(); toast(d.role === 'direction' ? 'Vue direction : toutes les classes' : 'Vue enseignante : Mme Benali'); },
  atab: d => { S.alertTab = d.t; render(); },
  pick: d => {
    S.alertSel = d.id; render();
    if (matchMedia('(max-width: 1180px)').matches) { const p = $('.detail'); if (p) p.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }
  },
  do: d => {
    const a = ALERTS.find(x => x.id === d.id);
    if (!a || S.resolved[a.id]) return;
    S.alertSel = a.id;
    if (a.kind === 'lesson') { S.focusQuiz = a.id !== 'a-review'; location.hash = `#lecons/${a.lesson}`; return; }
    resolveAlert(a);
  },
  undo: d => undoAlert(d.id),
  unrecip: d => { const a = ALERTS.find(x => x.id === d.id); S.recip[a.id] = recipientsOf(a).filter(x => x !== d.s); render(); },
  slot: d => { const s = TT.find(x => x.id === d.id); if (!s) return; S.edtClass = s.cls; S.edtSel = s.id; S.edtDraft = slotDraft(s.id); if (S.view !== 'edt') location.hash = '#edt'; else render(); },
  'open-lesson': d => { location.hash = `#lecons/${d.id}`; },
  lstatus: d => { S.lessonStatus = d.k; render(); },
  vsample: () => { S.draft.video = { name: 'cours-video.mp4', dur: '10:00', chapters: [{ t: '0:00', title: 'Introduction' }, { t: '3:00', title: 'Méthode' }, { t: '7:00', title: 'Exercice guidé' }] }; delete S.edErrors.video; render(); },
  vremove: () => { S.draft.video = null; render(); },
  'ch-add': () => { S.draft.video.chapters.push({ t: '', title: '' }); render(); },
  'ch-del': d => { S.draft.video.chapters.splice(+d.i, 1); render(); },
  'rs-add': () => { S.draft.resume.sections.push({ h: '', p: '' }); render(); },
  'rs-del': d => { S.draft.resume.sections.splice(+d.i, 1); render(); },
  'q-add': () => { S.draft.quiz.push({ q: '', o: ['', '', ''], a: 0, e: '' }); render(); },
  'q-del': d => { S.draft.quiz.splice(+d.i, 1); render(); },
  'o-add': d => { S.draft.quiz[+d.i].o.push(''); render(); },
  sfilter: d => { S.stuFilter = d.k; render(); },
  stu: d => { S.stuSel = d.id; render(); },
  'write-to': d => { S.compose = Object.assign({}, S.compose, { to: 'student', student: d.id, cat: 'rappel', title: '', body: '' }); location.hash = '#notifs'; },
  'support-for': d => { S.edtClass = '3e B'; S.edtSel = null; S.edtDraft = Object.assign(slotDraft(null), { title: `Soutien · ${stu(d.id).name}` }); location.hash = '#edt'; },
  'edt-new': () => { S.edtSel = null; S.edtDraft = slotDraft(null); render(); const f = $('#e-subj'); if (f) f.focus(); },
  'edt-cancel': () => { S.edtSel = null; S.edtDraft = null; render(); },
  'edt-del': () => { const d = S.edtDraft; const s = TT.find(x => x.id === d.id); TT = TT.filter(x => x.id !== d.id); S.edtSel = null; S.edtDraft = null; render(); toast('Créneau supprimé', () => { TT.push(s); render(); }); },
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const fn = ACT[el.dataset.act];
  if (!fn) return;
  if (el.tagName === 'A') e.preventDefault();
  fn(el.dataset, el);
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('tr[data-act]')) { e.preventDefault(); e.target.click(); }
  if (e.key === 'Escape') $('#app').classList.remove('menu-open');
});
document.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.id === 'lesson-form') saveDraft();
  if (e.target.id === 'slot-form') saveSlot();
  if (e.target.id === 'notif-form') sendCompose();
});
document.addEventListener('input', e => {
  const t = e.target, b = t.dataset.bind;
  if (!b) return;
  const d = S.draft, i = +t.dataset.i;
  switch (b) {
    case 'alertq': S.alertQ = t.value; rerenderKeepFocus(t); return;
    case 'lessonq': S.lessonQ = t.value; rerenderKeepFocus(t); return;
    case 'stuq': S.stuQ = t.value; rerenderKeepFocus(t); return;
    case 'alertbody': S.bodies[t.dataset.id] = t.value; return;
    case 'title': d.title = t.value; delete S.edErrors.title; t.removeAttribute('aria-invalid'); break;
    case 'chapter': d.chapter = t.value; break;
    case 'ch-t': d.video.chapters[i].t = t.value; return;
    case 'ch-title': d.video.chapters[i].title = t.value; return;
    case 'rs-h': d.resume.sections[i].h = t.value; break;
    case 'rs-p': d.resume.sections[i].p = t.value; break;
    case 'retenir': d.resume.retenir = t.value; return;
    case 'q-q': d.quiz[i].q = t.value; return;
    case 'q-o': d.quiz[i].o[+t.dataset.j] = t.value; return;
    case 'q-e': d.quiz[i].e = t.value; return;
    case 'n-title': S.compose.title = t.value; updateNotifPreview(); return;
    case 'n-body': S.compose.body = t.value; updateNotifPreview(); return;
    case 'e-title': S.edtDraft.title = t.value; return;
    default: return;
  }
  const pv = document.querySelector('.preview');
  if (pv && S.draft) pv.outerHTML = preview(S.draft);
});
document.addEventListener('change', e => {
  const t = e.target, b = t.dataset.bind;
  if (!b) return;
  const d = S.draft;
  switch (b) {
    case 'type': d.type = t.value; if (hasQuiz(d.type) && !d.quiz.length) d.quiz = [{ q: '', o: ['', '', ''], a: 0, e: '' }]; S.edErrors = {}; render(); break;
    case 'subj': d.subj = t.value; render(); break;
    case 'cls': d.cls = t.value; render(); break;
    case 'q-a': d.quiz[+t.dataset.i].a = +t.value; break;
    case 'publish': d.publish = t.value; render(); break;
    case 'at': d.at = t.value; break;
    case 'notify': d.notify = t.checked; break;
    case 'vfile': {
      const f = t.files && t.files[0];
      if (!f) break;
      d.video = { name: f.name, dur: '…', chapters: [{ t: '0:00', title: 'Introduction' }] };
      delete S.edErrors.video;
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.onloadedmetadata = () => { if (isFinite(v.duration)) { d.video.dur = `${Math.floor(v.duration / 60)}:${pad2(Math.round(v.duration % 60))}`; render(); } URL.revokeObjectURL(v.src); };
      v.onerror = () => { d.video.dur = 'durée inconnue'; render(); };
      v.src = URL.createObjectURL(f);
      render();
      break;
    }
    case 'lessonsubj': S.lessonSubj = t.value; render(); break;
    case 'edtclass': S.edtClass = t.value; S.edtSel = null; S.edtDraft = null; render(); break;
    case 'e-subj': case 'e-kind': case 'e-teacher': case 'e-room': case 'e-day': case 'e-start': case 'e-end':
      S.edtDraft[b.slice(2)] = t.value; render(); break;
    case 'e-notify': S.edtNotify = t.checked; break;
    case 'n-to': S.compose.to = t.value; render(); break;
    case 'n-stu': S.compose.student = t.value; render(); break;
    case 'n-cat': S.compose.cat = t.value; render(); break;
    case 'n-when': S.compose.when = t.value; render(); break;
    case 'n-at': S.compose.at = t.value; break;
    default: break;
  }
});
function rerenderKeepFocus(input) {
  const bind = input.dataset.bind, pos = input.selectionStart;
  render();
  const again = document.querySelector(`[data-bind="${bind}"]`);
  if (again) { again.focus(); try { again.setSelectionRange(pos, pos); } catch (err) { /* type=search */ } }
}
function updateNotifPreview() {
  const p = document.querySelector('[data-preview]');
  if (p) { p.querySelector('b').textContent = S.compose.title || 'Titre de la notification'; p.querySelector('span span').textContent = S.compose.body || 'Le message apparaîtra ici.'; }
  const n = document.querySelector('[data-count]'); if (n) n.textContent = S.compose.body.length;
}
window.addEventListener('hashchange', route);
route();
