/* ---------- sample data (fictional student, real Educazen Kids brand) ---------- */
const TODAY = '2026-10-12';
const NOW_MIN = 9 * 60 + 40; // Monday 12 October 2026, 09:40
const STUDENT = { first: 'Yanis', initials: 'YB', full: 'Yanis B.', klass: '3e B · Collège CNED' };

const SUBJ = {
  maths: { name: 'Mathématiques', short: 'Maths', c: '#9333EA', s: '#F1E7FD', icon: 'sigma' },
  pc: { name: 'Physique-Chimie', short: 'PC', c: '#088D84', s: '#DCF3EF', icon: 'flask' },
  svt: { name: 'SVT', short: 'SVT', c: '#2E9D68', s: '#E0F4E9', icon: 'leaf' },
  fr: { name: 'Français', short: 'Fr', c: '#D9368F', s: '#FCE7F2', icon: 'pen' },
  ang: { name: 'Anglais', short: 'Ang', c: '#E39A0B', s: '#FFF2D4', icon: 'globe' },
  hg: { name: 'Histoire-Géo', short: 'HG', c: '#E8506F', s: '#FDE6EB', icon: 'landmark' },
  atelier: { name: 'Ateliers', short: 'Atelier', c: '#BC4384', s: '#F7E3EE', icon: 'sparkles' },
  perso: { name: 'Perso', short: 'Perso', c: '#6B5B7B', s: '#EEEAF3', icon: 'user' },
};
const SUBJECT_ORDER = ['maths', 'pc', 'svt', 'fr', 'ang', 'hg'];
const TYPE_LABEL = { vqr: 'Vidéo · Résumé · Quiz', rq: 'Résumé · Quiz', r: 'Résumé' };

const LESSONS = [
  {
    id: 'affine', subject: 'maths', title: 'Fonctions affines', chapter: 'Chapitre 4 · Fonctions', type: 'vqr', teacher: 'Mme Benali',
    desc: 'Reconnaître f(x) = ax + b, lire a et b, tracer la droite.',
    video: {
      duration: 720, scene: 'affine',
      chapters: [
        { t: 0, title: 'Définition', sub: 'Reconnaître une fonction affine' },
        { t: 130, title: 'Le coefficient directeur a', sub: 'Ce que « a » change sur la droite' },
        { t: 270, title: "L'ordonnée à l'origine b", sub: "Où la droite coupe l'axe des y" },
        { t: 400, title: 'Tracer la droite', sub: 'Deux points suffisent' },
        { t: 555, title: 'Exercice guidé', sub: 'Calculer une image pas à pas' },
      ],
      captions: [
        { t: 0, x: "Bonjour ! Aujourd'hui, on étudie les fonctions affines." },
        { t: 25, x: "Une fonction affine s'écrit toujours f(x) = ax + b." },
        { t: 60, x: 'a et b sont deux nombres fixés : ce sont les paramètres.' },
        { t: 95, x: 'Exemple : f(x) = 2x + 1. Ici a = 2 et b = 1.' },
        { t: 130, x: "Le nombre a s'appelle le coefficient directeur." },
        { t: 170, x: 'Quand x augmente de 1, f(x) augmente de a.' },
        { t: 215, x: 'Si a est positif, la droite monte : la fonction est croissante.' },
        { t: 245, x: 'Si a est négatif, la droite descend : elle est décroissante.' },
        { t: 270, x: "Le nombre b s'appelle l'ordonnée à l'origine." },
        { t: 310, x: "C'est la valeur de f(0) : f(0) = a × 0 + b = b." },
        { t: 350, x: "La droite coupe l'axe des ordonnées au point (0 ; b)." },
        { t: 400, x: 'Pour tracer la droite, deux points suffisent.' },
        { t: 440, x: 'f(0) = 1 : on place le point A(0 ; 1).' },
        { t: 490, x: 'f(2) = 2 × 2 + 1 = 5 : on place le point B(2 ; 5).' },
        { t: 525, x: 'On relie A et B : voilà la représentation graphique de f.' },
        { t: 555, x: 'À toi : soit g(x) = −3x + 4. Calcule g(2).' },
        { t: 600, x: 'On remplace x par 2 : g(2) = −3 × 2 + 4.' },
        { t: 640, x: 'g(2) = −6 + 4 = −2. Bravo si tu as trouvé !' },
        { t: 680, x: 'Relis le résumé, puis passe au quiz.' },
      ],
    },
    resume: {
      read: '5 min',
      sections: [
        { h: 'Définition', p: 'Une fonction affine associe à chaque nombre x le nombre ax + b, où a et b sont deux nombres fixés.', f: 'f(x) = ax + b' },
        { h: 'Le coefficient directeur a', p: 'a donne la pente de la droite : quand x augmente de 1, f(x) augmente de a.', list: ['a > 0 : la fonction est croissante', 'a < 0 : la fonction est décroissante', 'a = 0 : la fonction est constante'] },
        { h: "L'ordonnée à l'origine b", p: "b est l'image de 0 : f(0) = b. La droite coupe l'axe des ordonnées au point (0 ; b)." },
        { h: 'Calculer a avec deux points', p: 'Si la droite passe par A(xA ; yA) et B(xB ; yB) :', f: 'a = (yB − yA) / (xB − xA)' },
        { h: 'Exemple', p: 'Pour f(x) = 2x + 1 : f(0) = 1 et f(2) = 5. La droite passe par A(0 ; 1) et B(2 ; 5).' },
      ],
      retenir: ['Une fonction affine se représente par une droite.', "a est le coefficient directeur (la pente), b l'ordonnée à l'origine.", 'Deux points suffisent pour tracer la droite.'],
      erreurs: ['Confondre a et b : dans f(x) = 4 − 3x, a = −3 et b = 4.', 'Oublier les parenthèses avec un nombre négatif : f(−2) = 2 × (−2) + 1.'],
    },
    quiz: [
      { q: "Quelle est l'écriture d'une fonction affine ?", o: ['f(x) = ax + b', 'f(x) = ax²', 'f(x) = a / x', 'f(x) = x² + x'], a: 0, e: 'Une fonction affine s\'écrit toujours f(x) = ax + b, avec a et b fixés.' },
      { q: 'Pour f(x) = 2x + 1, que vaut f(3) ?', o: ['5', '6', '7', '9'], a: 2, e: 'f(3) = 2 × 3 + 1 = 6 + 1 = 7.' },
      { q: 'Dans f(x) = −3x + 4, le coefficient directeur est…', o: ['4', '−3', '3', '1'], a: 1, e: 'Le coefficient directeur est le nombre devant x : a = −3.' },
      { q: 'La droite de f(x) = 2x + 1 coupe l\'axe des ordonnées en…', o: ['(0 ; 1)', '(1 ; 0)', '(0 ; 2)', '(2 ; 1)'], a: 0, e: "Elle coupe l'axe des ordonnées en (0 ; b), donc en (0 ; 1)." },
      { q: 'Si a > 0, la fonction affine est…', o: ['croissante', 'décroissante', 'constante'], a: 0, e: 'Avec a positif, f(x) augmente quand x augmente : la droite monte.' },
    ],
  },
  {
    id: 'thales', subject: 'maths', title: 'Théorème de Thalès', chapter: 'Chapitre 3 · Géométrie', type: 'vqr', teacher: 'Mme Benali',
    desc: 'Écrire les rapports égaux et calculer une longueur.',
    video: {
      duration: 600, scene: 'triangle',
      chapters: [
        { t: 0, title: 'La configuration', sub: 'Deux droites parallèles dans un triangle' },
        { t: 150, title: "L'égalité des rapports", sub: 'AM/AB = AN/AC = MN/BC' },
        { t: 320, title: 'Calculer une longueur', sub: 'Le produit en croix' },
        { t: 470, title: 'La réciproque', sub: 'Prouver que deux droites sont parallèles' },
      ],
      captions: [
        { t: 0, x: 'Dans le triangle ABC, M est sur [AB] et N sur [AC].' },
        { t: 70, x: 'Si (MN) est parallèle à (BC), on peut utiliser Thalès.' },
        { t: 150, x: 'Les rapports sont égaux : AM/AB = AN/AC = MN/BC.' },
        { t: 320, x: 'On remplace par les longueurs connues, puis produit en croix.' },
        { t: 470, x: 'Si les rapports sont égaux, alors les droites sont parallèles.' },
      ],
    },
    resume: {
      read: '4 min',
      sections: [
        { h: 'La configuration', p: 'Dans un triangle ABC, M est un point de [AB], N un point de [AC], et (MN) est parallèle à (BC).' },
        { h: "L'égalité de Thalès", p: 'Les longueurs des deux triangles AMN et ABC sont proportionnelles :', f: 'AM / AB = AN / AC = MN / BC' },
        { h: 'Exemple', p: 'AM = 3, AB = 6 et BC = 8. Alors MN / 8 = 3 / 6, donc MN = 8 × 3 / 6 = 4.' },
        { h: 'La réciproque', p: 'Si AM / AB = AN / AC (points dans le même ordre), alors (MN) et (BC) sont parallèles.' },
      ],
      retenir: ['Vérifie d\'abord que les droites sont parallèles.', 'Écris les trois rapports avant de remplacer.', 'La réciproque sert à démontrer un parallélisme.'],
      erreurs: ['Mélanger les sommets : le petit triangle en haut, le grand en bas de chaque fraction.'],
    },
    quiz: [
      { q: 'M ∈ [AB], N ∈ [AC] et (MN) // (BC). Quelle égalité est vraie ?', o: ['AM/AB = AN/AC = MN/BC', 'AM/AC = AN/AB', 'AB/AM = MN/AC'], a: 0, e: 'Les côtés du petit triangle sont au numérateur, ceux du grand au dénominateur.' },
      { q: 'AM = 3, AB = 6 et BC = 8. Combien mesure MN ?', o: ['4', '3', '6', '16'], a: 0, e: 'MN = 8 × 3 / 6 = 4.' },
      { q: 'La réciproque du théorème de Thalès sert à prouver que…', o: ['deux droites sont parallèles', 'un triangle est rectangle', 'deux angles sont égaux'], a: 0, e: 'On l\'utilise pour démontrer un parallélisme.' },
    ],
  },
  {
    id: 'produit-nul', subject: 'maths', title: 'Équations produit nul', chapter: 'Chapitre 5 · Équations', type: 'rq', teacher: 'Mme Benali',
    desc: 'Résoudre (ax + b)(cx + d) = 0 en deux équations simples.',
    resume: {
      read: '3 min',
      sections: [
        { h: 'La règle', p: "Un produit est nul si et seulement si l'un de ses facteurs est nul.", f: 'A × B = 0  ⟺  A = 0 ou B = 0' },
        { h: 'Méthode', list: ["Vérifier qu'on a bien un produit égal à 0.", 'Écrire chaque facteur égal à 0.', 'Résoudre les deux équations simples.', 'Donner toutes les solutions.'] },
        { h: 'Exemple', p: '(x − 3)(2x + 1) = 0 donne x − 3 = 0 ou 2x + 1 = 0, donc x = 3 ou x = −1/2.' },
      ],
      retenir: ['Il faut un produit ET un second membre égal à 0.', 'Une équation produit nul a souvent deux solutions.'],
      erreurs: ['Développer le produit : on perd la forme qui permet de conclure.'],
    },
    quiz: [
      { q: 'Résoudre (x − 3)(x + 5) = 0.', o: ['x = 3 ou x = −5', 'x = −3 ou x = 5', 'x = 3 seulement'], a: 0, e: 'x − 3 = 0 donne x = 3 ; x + 5 = 0 donne x = −5.' },
      { q: '(2x + 1)(x − 4) = 0 a pour solutions…', o: ['−1/2 et 4', '1/2 et −4', '−1 et 4'], a: 0, e: '2x + 1 = 0 donne x = −1/2 ; x − 4 = 0 donne x = 4.' },
      { q: 'Avant d\'appliquer la règle, il faut…', o: ['un produit égal à 0', 'développer', 'diviser par x'], a: 0, e: 'La règle ne marche que pour un produit égal à zéro.' },
    ],
  },
  {
    id: 'stats', subject: 'maths', title: 'Moyenne et médiane', chapter: 'Chapitre 6 · Statistiques', type: 'r', teacher: 'Mme Benali',
    desc: 'Fiche de révision : moyenne, moyenne pondérée, médiane, étendue.',
    resume: {
      read: '4 min',
      sections: [
        { h: 'Moyenne', p: 'On additionne toutes les valeurs, puis on divise par le nombre de valeurs.', f: 'moyenne = somme des valeurs / effectif' },
        { h: 'Moyenne pondérée', p: 'Chaque valeur est multipliée par son coefficient. Exemple : 12 (coef 2) et 15 (coef 1) donnent (24 + 15) / 3 = 13.' },
        { h: 'Médiane', p: "On range les valeurs dans l'ordre. La médiane partage la série en deux groupes de même effectif." },
        { h: 'Étendue', p: 'Étendue = plus grande valeur − plus petite valeur. Elle mesure la dispersion.' },
      ],
      retenir: ['Toujours ranger les valeurs avant de chercher la médiane.', 'La moyenne est sensible aux valeurs extrêmes, la médiane non.'],
    },
  },
  {
    id: 'ohm', subject: 'pc', title: "La loi d'Ohm", chapter: 'Électricité', type: 'vqr', teacher: 'M. Idrissi',
    desc: 'Relier tension, intensité et résistance : U = R × I.',
    video: {
      duration: 840, scene: 'circuit',
      chapters: [
        { t: 0, title: 'Tension et intensité', sub: 'Les deux grandeurs du circuit' },
        { t: 200, title: 'La résistance', sub: "Un dipôle qui s'oppose au courant" },
        { t: 420, title: "La loi d'Ohm", sub: 'U = R × I' },
        { t: 640, title: 'Exploiter un graphique', sub: 'Une droite qui passe par l\'origine' },
      ],
      captions: [
        { t: 0, x: 'La tension U se mesure en volts, avec un voltmètre.' },
        { t: 100, x: "L'intensité I se mesure en ampères, avec un ampèremètre." },
        { t: 200, x: "Une résistance s'oppose au passage du courant. Unité : l'ohm." },
        { t: 420, x: 'Loi d\'Ohm : U = R × I.' },
        { t: 640, x: 'Le graphique U = f(I) est une droite qui passe par l\'origine.' },
      ],
    },
    resume: {
      read: '4 min',
      sections: [
        { h: 'Les grandeurs', list: ['Tension U en volts (V), mesurée en dérivation.', 'Intensité I en ampères (A), mesurée en série.', 'Résistance R en ohms (Ω).'] },
        { h: "La loi d'Ohm", p: 'Pour une résistance, la tension à ses bornes est proportionnelle à l\'intensité qui la traverse.', f: 'U = R × I' },
        { h: 'Exemple', p: 'R = 100 Ω et I = 0,05 A : U = 100 × 0,05 = 5 V.' },
      ],
      retenir: ['U = R × I, avec U en V, R en Ω, I en A.', 'Convertir les mA en A avant de calculer.'],
      erreurs: ['Oublier de convertir 50 mA en 0,05 A.'],
    },
    quiz: [
      { q: "La loi d'Ohm s'écrit…", o: ['U = R × I', 'I = R × U', 'R = U × I'], a: 0, e: 'La tension est égale à la résistance multipliée par l\'intensité.' },
      { q: 'R = 100 Ω et I = 0,05 A. Que vaut U ?', o: ['5 V', '2 000 V', '0,0005 V'], a: 0, e: 'U = 100 × 0,05 = 5 V.' },
      { q: "L'unité de la résistance est…", o: ["l'ohm (Ω)", 'le volt (V)', "l'ampère (A)"], a: 0, e: "La résistance se mesure en ohms." },
    ],
  },
  {
    id: 'genetique', subject: 'svt', title: 'ADN, gènes et chromosomes', chapter: 'Hérédité', type: 'rq', teacher: 'M. Ouali',
    desc: "Où se trouve l'information génétique et comment elle se transmet.",
    resume: {
      read: '4 min',
      sections: [
        { h: 'Les chromosomes', p: 'Ils se trouvent dans le noyau de chaque cellule. Une cellule humaine en contient 46, soit 23 paires.' },
        { h: "L'ADN", p: "Chaque chromosome est formé d'une longue molécule d'ADN, le support de l'information génétique." },
        { h: 'Les gènes', p: "Un gène est une portion d'ADN qui détermine un caractère héréditaire (groupe sanguin, couleur des yeux…)." },
      ],
      retenir: ['46 chromosomes, 23 paires.', 'Gène = portion d\'ADN = une information héréditaire.'],
    },
    quiz: [
      { q: "Où se trouve l'ADN dans une cellule ?", o: ['Dans le noyau', 'Dans la membrane', 'Dans le sang'], a: 0, e: "L'ADN des chromosomes est dans le noyau." },
      { q: 'Combien de chromosomes dans une cellule humaine ?', o: ['46 (23 paires)', '23', '64'], a: 0, e: '46 chromosomes, regroupés en 23 paires.' },
      { q: 'Un gène est…', o: ["une portion d'ADN", 'une cellule', 'un organe'], a: 0, e: 'Un gène est un morceau d\'ADN qui porte une information.' },
    ],
  },
  {
    id: 'argumentation', subject: 'fr', title: "L'argumentation", chapter: 'Écrire pour convaincre', type: 'r', teacher: 'Mme Laurent',
    desc: 'Thèse, arguments, exemples et connecteurs logiques.',
    resume: {
      read: '5 min',
      sections: [
        { h: 'La thèse', p: "C'est l'opinion que l'on défend. Elle répond à la question posée." },
        { h: 'Les arguments', p: 'Ce sont les raisons qui soutiennent la thèse. Chaque argument est illustré par un exemple précis.' },
        { h: 'Les connecteurs', list: ["Ajouter : de plus, en outre", "S'opposer : cependant, pourtant", 'Conclure : ainsi, donc, en somme'] },
      ],
      retenir: ['Un paragraphe = un argument + un exemple.', 'Annonce ta thèse dès l\'introduction.'],
    },
  },
  {
    id: 'present-perfect', subject: 'ang', title: 'Present perfect', chapter: 'Grammar', type: 'vqr', teacher: 'Mr Smith',
    desc: 'Have + past participle, et la différence avec le past simple.',
    video: {
      duration: 480, scene: 'timeline',
      chapters: [
        { t: 0, title: 'Form', sub: 'have / has + past participle' },
        { t: 140, title: 'Unfinished time', sub: 'since, for, this week' },
        { t: 260, title: 'Experience', sub: 'ever, never' },
        { t: 360, title: 'vs Past simple', sub: 'yesterday, last year, ago' },
      ],
      captions: [
        { t: 0, x: 'Present perfect: I have visited, she has eaten.' },
        { t: 140, x: 'We use it for actions that continue until now: since 2020.' },
        { t: 260, x: 'Have you ever been to London? I have never seen snow.' },
        { t: 360, x: 'With a finished time like yesterday, use the past simple.' },
      ],
    },
    resume: {
      read: '3 min',
      sections: [
        { h: 'Form', p: 'Sujet + have / has + participe passé.', f: 'I have visited · She has lived' },
        { h: 'Quand l\'utiliser', list: ['Une action qui dure jusqu\'à maintenant (since, for).', 'Une expérience de vie (ever, never).', 'Un résultat présent d\'une action passée.'] },
        { h: 'Avec le past simple', p: 'Si le moment est terminé et précis (yesterday, last year, ago), on utilise le past simple.' },
      ],
      retenir: ['since + point de départ, for + durée.', 'yesterday, ago → past simple.'],
    },
    quiz: [
      { q: 'I ___ (visit) London three times.', o: ['have visited', 'visited', 'has visit'], a: 0, e: 'Expérience de vie sans moment précis : present perfect.' },
      { q: 'She ___ in Paris since 2020.', o: ['has lived', 'lived', 'is living'], a: 0, e: '« since » indique une action qui dure jusqu\'à maintenant.' },
      { q: 'Yesterday we ___ a film.', o: ['watched', 'have watched', 'has watched'], a: 0, e: '« Yesterday » est un moment terminé : past simple.' },
    ],
  },
  {
    id: 'ww2', subject: 'hg', title: 'La Seconde Guerre mondiale', chapter: 'Histoire · 1939-1945', type: 'rq', teacher: 'Mme Haddad',
    desc: 'Les grandes dates, une guerre totale et le bilan.',
    resume: {
      read: '6 min',
      sections: [
        { h: 'Les grandes dates', list: ['1er septembre 1939 : invasion de la Pologne.', '6 juin 1944 : débarquement en Normandie.', '8 mai 1945 : capitulation de l\'Allemagne.', '2 septembre 1945 : capitulation du Japon.'] },
        { h: 'Une guerre totale', p: "Toutes les ressources des pays sont mobilisées : économie, populations civiles, propagande." },
        { h: 'Le bilan', p: "Plus de 60 millions de morts, dont une majorité de civils, et le génocide des Juifs et des Tziganes." },
      ],
      retenir: ['1939-1945, une guerre mondiale et totale.', 'Les civils sont les premières victimes.'],
    },
    quiz: [
      { q: 'La guerre commence en…', o: ['1939', '1914', '1945'], a: 0, e: 'Le 1er septembre 1939, l\'Allemagne envahit la Pologne.' },
      { q: 'Le débarquement en Normandie a lieu le…', o: ['6 juin 1944', '8 mai 1945', '11 novembre 1918'], a: 0, e: 'C\'est le 6 juin 1944.' },
      { q: 'La guerre se termine en Europe le…', o: ['8 mai 1945', '6 juin 1944', '1er septembre 1939'], a: 0, e: "L'Allemagne capitule le 8 mai 1945." },
    ],
  },
];
const LMAP = Object.fromEntries(LESSONS.map(l => [l.id, l]));

const WEEK = [
  { date: '2026-10-12', dw: 'Lun', d: 12, long: 'Lundi 12 octobre' },
  { date: '2026-10-13', dw: 'Mar', d: 13, long: 'Mardi 13 octobre' },
  { date: '2026-10-14', dw: 'Mer', d: 14, long: 'Mercredi 14 octobre' },
  { date: '2026-10-15', dw: 'Jeu', d: 15, long: 'Jeudi 15 octobre' },
  { date: '2026-10-16', dw: 'Ven', d: 16, long: 'Vendredi 16 octobre' },
  { date: '2026-10-17', dw: 'Sam', d: 17, long: 'Samedi 17 octobre' },
  { date: '2026-10-18', dw: 'Dim', d: 18, long: 'Dimanche 18 octobre' },
];

const EVENTS = [
  { id: 'm1', day: '2026-10-12', start: '08:00', end: '09:00', subject: 'maths', kind: 'Cours', teacher: 'Mme Benali', room: 'Salle 12', lesson: 'affine', homework: 'Exercices 12 à 15 page 84' },
  { id: 'm2', day: '2026-10-12', start: '09:00', end: '10:00', subject: 'pc', kind: 'TP', teacher: 'M. Idrissi', room: 'Labo 2', lesson: 'ohm', homework: 'Compte rendu du TP sur la loi d\'Ohm' },
  { id: 'm3', day: '2026-10-12', start: '10:15', end: '12:00', subject: 'fr', kind: 'Cours', teacher: 'Mme Laurent', room: 'Salle 7', lesson: 'argumentation' },
  { id: 'm4', day: '2026-10-12', start: '14:00', end: '15:00', subject: 'maths', kind: 'Contrôle', title: 'Contrôle · Fonctions affines', teacher: 'Mme Benali', room: 'Salle 12', lesson: 'affine', coef: 2 },
  { id: 'm5', day: '2026-10-12', start: '15:00', end: '16:00', subject: 'ang', kind: 'Cours', teacher: 'Mr Smith', room: 'Salle 4', lesson: 'present-perfect', note: 'Changement de salle aujourd\'hui' },
  { id: 'm6', day: '2026-10-12', start: '16:15', end: '17:15', subject: 'atelier', kind: 'Atelier', title: 'Atelier méthodo', teacher: 'Pôle psychosocial', room: 'Salle Zen' },
  { id: 't1', day: '2026-10-13', start: '08:00', end: '10:00', subject: 'svt', kind: 'Cours', teacher: 'M. Ouali', room: 'Labo 1', lesson: 'genetique' },
  { id: 't2', day: '2026-10-13', start: '10:15', end: '12:00', subject: 'hg', kind: 'Cours', teacher: 'Mme Haddad', room: 'Salle 9', lesson: 'ww2' },
  { id: 't3', day: '2026-10-13', start: '14:00', end: '16:00', subject: 'maths', kind: 'Cours', teacher: 'Mme Benali', room: 'Salle 12', lesson: 'produit-nul' },
  { id: 't4', day: '2026-10-13', start: '16:15', end: '17:00', subject: 'ang', kind: 'Cours', teacher: 'Mr Smith', room: 'Salle 4' },
  { id: 'w1', day: '2026-10-14', start: '08:00', end: '10:00', subject: 'fr', kind: 'Cours', teacher: 'Mme Laurent', room: 'Salle 7' },
  { id: 'w2', day: '2026-10-14', start: '10:15', end: '12:00', subject: 'pc', kind: 'Cours', teacher: 'M. Idrissi', room: 'Labo 2', lesson: 'ohm' },
  { id: 'h1', day: '2026-10-15', start: '08:00', end: '09:00', subject: 'ang', kind: 'Cours', teacher: 'Mr Smith', room: 'Salle 4' },
  { id: 'h2', day: '2026-10-15', start: '09:00', end: '10:00', subject: 'pc', kind: 'Contrôle', title: "Contrôle · Loi d'Ohm", teacher: 'M. Idrissi', room: 'Labo 2', lesson: 'ohm', coef: 1 },
  { id: 'h3', day: '2026-10-15', start: '10:15', end: '12:00', subject: 'maths', kind: 'Cours', teacher: 'Mme Benali', room: 'Salle 12' },
  { id: 'h4', day: '2026-10-15', start: '14:00', end: '16:00', subject: 'hg', kind: 'Cours', teacher: 'Mme Haddad', room: 'Salle 9' },
  { id: 'h5', day: '2026-10-15', start: '16:15', end: '17:15', subject: 'svt', kind: 'Cours', teacher: 'M. Ouali', room: 'Labo 1' },
  { id: 'f1', day: '2026-10-16', start: '08:00', end: '10:00', subject: 'maths', kind: 'Cours', teacher: 'Mme Benali', room: 'Salle 12' },
  { id: 'f2', day: '2026-10-16', start: '10:15', end: '12:00', subject: 'svt', kind: 'TP', teacher: 'M. Ouali', room: 'Labo 1' },
  { id: 'f3', day: '2026-10-16', start: '14:00', end: '15:00', subject: 'fr', kind: 'Cours', teacher: 'Mme Laurent', room: 'Salle 7' },
  { id: 'f4', day: '2026-10-16', start: '15:00', end: '17:00', subject: 'atelier', kind: 'Atelier', title: 'Atelier codage & IA', teacher: 'M. Alaoui', room: 'Salle info' },
  { id: 's1', day: '2026-10-17', start: '09:00', end: '11:00', subject: 'atelier', kind: 'Soutien', title: 'Soutien scolaire · Maths', teacher: 'Mme Benali', room: 'Salle 3', lesson: 'affine' },
];

const UPCOMING_EXTRA = [
  { id: 'x1', day: '2026-10-20', dw: 'Mar', d: 20, start: '10:15', end: '11:15', subject: 'svt', kind: 'Contrôle', title: 'Contrôle · Génétique', teacher: 'M. Ouali', room: 'Labo 1', lesson: 'genetique', coef: 1 },
];

const RESULTS = [
  { subject: 'maths', title: 'Théorème de Thalès', date: '2 oct.', grade: 16, avg: 12.8, coef: 2 },
  { subject: 'fr', title: "L'argumentation", date: '9 oct.', grade: 15, avg: 12.4, coef: 2 },
  { subject: 'ang', title: 'Irregular verbs', date: '7 oct.', grade: 17, avg: 13.9, coef: 1 },
  { subject: 'hg', title: 'La Première Guerre mondiale', date: '5 oct.', grade: 12.5, avg: 11.6, coef: 1 },
  { subject: 'svt', title: 'La cellule', date: '1er oct.', grade: 13, avg: 12.1, coef: 1 },
  { subject: 'pc', title: 'Circuits électriques', date: '30 sept.', grade: 14, avg: 11.2, coef: 1 },
];

const NOTIFS = [
  { id: 'n1', kind: 'edt', when: '07:30', group: "Aujourd'hui", title: 'Changement de salle', body: "L'anglais de 15:00 a lieu en salle 4 aujourd'hui.", to: { screen: 'schedule', day: '2026-10-12', sheet: { type: 'event', id: 'm5' } } },
  { id: 'n2', kind: 'controle', when: '07:00', group: "Aujourd'hui", title: 'Contrôle de maths à 14:00', body: 'Fonctions affines · Salle 12 · coef 2. Révise avec la vidéo et le quiz.', to: { screen: 'lesson', lessonId: 'affine', tab: 'video' } },
  { id: 'n3', kind: 'cours', when: '18:20', group: 'Hier', title: 'Nouvelle vidéo en Physique-Chimie', body: "« La loi d'Ohm » est disponible (14 min).", to: { screen: 'lesson', lessonId: 'ohm', tab: 'video' } },
  { id: 'n4', kind: 'note', when: '16:05', group: 'Hier', title: 'Note disponible', body: "Français · L'argumentation : 15/20 (moyenne de la classe 12,4).", to: { screen: 'controle' } },
  { id: 'n5', kind: 'rappel', when: 'Sam. 10 oct.', group: 'Plus tôt', title: 'Quiz à terminer', body: 'Tu n\'as pas encore fait le quiz « Équations produit nul ».', to: { screen: 'lesson', lessonId: 'produit-nul', tab: 'quiz' } },
  { id: 'n6', kind: 'centre', when: 'Ven. 9 oct.', group: 'Plus tôt', title: 'Réunion parents-professeurs', body: 'Jeudi 22 octobre à 17:00, au centre EducazenKids.', to: { screen: 'contact' } },
];
const NOTIF_KIND = {
  edt: { icon: 'calendar', c: '#9333EA', s: '#F1E7FD', filter: 'edt' },
  controle: { icon: 'clipboard', c: '#D9368F', s: '#FCE7F2', filter: 'controles' },
  cours: { icon: 'video', c: '#088D84', s: '#DCF3EF', filter: 'cours' },
  note: { icon: 'trophy', c: '#E39A0B', s: '#FFF2D4', filter: 'controles' },
  rappel: { icon: 'timer', c: '#E8506F', s: '#FDE6EB', filter: 'cours' },
  centre: { icon: 'bell', c: '#BC4384', s: '#F7E3EE', filter: 'all' },
};

/* minutes studied in the app, last 7 days (Tue 6 to Mon 12 Oct) */
const STUDY = [
  { d: 'M', label: 'Mar 6', m: { maths: 35, pc: 20, fr: 15 } },
  { d: 'M', label: 'Mer 7', m: { svt: 30, hg: 25, ang: 10 } },
  { d: 'J', label: 'Jeu 8', m: { fr: 40, maths: 20 } },
  { d: 'V', label: 'Ven 9', m: { maths: 30, pc: 25 } },
  { d: 'S', label: 'Sam 10', m: { atelier: 60, ang: 20 } },
  { d: 'D', label: 'Dim 11', m: { maths: 45, hg: 15 } },
  { d: 'L', label: 'Lun 12', m: { maths: 12, pc: 8 }, today: true },
];
const STUDY_ORDER = ['maths', 'pc', 'svt', 'fr', 'ang', 'hg', 'atelier'];
