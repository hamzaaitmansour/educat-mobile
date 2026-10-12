---
version: 1
slug: "prototype-educazenkids-college-html"
primary_target: "prototype/educazenkids-college.html"
related_targets: ["prototype/src/app.js","prototype/src/app.css","prototype/src/data.js"]
---

Scope: the collège student app prototype (`prototype/educazenkids-college.html`, built from `prototype/src/`). Visitor mode: Operate. This brief holds the login screen (« Connexion », screen `splash`) decided 12/10/2026; the rest of the app is the incumbent world (tokens in `prototype/src/app.css`, rules in `docs/app-design-system.md`).

Audience: collège students, 14 to 16, typique, DYS, TDAH, TSA and HPI.
Job: sign in with the personal code the centre gives each student (code only; the phone remembers them).
States: empty, typing, invalid format, unknown code, signed in.
Constraints: no backend (sample code EZK-3B-4821 for Yanis B.), French, « tu », no emoji, calm mode and reduced motion freeze the drift, touch targets of 44 px or more.

Also added 12/10 as extensions of the incumbent world (no new identity): an Exercice tab in lessons (an image posted by the teacher or questions, short answers auto-checked, longer ones corrigé + self-check, counted as a 4th lesson step) and an Exercices section in Outils, filtered by subject.

Chosen: Le mur des cours. Memorable moment: each character typed lights one formula of the year in its subject colour.
Unresolved: real accounts and code distribution; what happens on a shared phone (sign out lives in Paramètres).

## Direction contract

THESIS: Signing in happens in front of the year's real lessons: the backdrop is the collège's own content written large, not a logo on a gradient with one button.

OWN-WORLD: The app's lavender world. Rows of Fredoka formulas and dates (f(x) = ax + b, U = R × I, AM/AB = AN/AC, 1939-1945, have + past participle, 46 chromosomes) in pale subject tints, drifting slowly in alternating directions; one white card with the hairline-free soft shadow; three groups of code cells; the plum-ink pill.

STORY: The student opens the app, recognises their subjects on the wall, and types the code from the centre. Each character lights one formula in its colour. A valid code lights the whole wall and greets them by name; an unknown code says what to do next.

FIRST VIEWPORT: Formula rows edge to edge above and below. A centred white card at about 40 % height: logo, « Bonjour ! », one line, the code field (EZK · 3B · 4821 shape), « Se connecter », « Pas de code ? Demande-le à l'accueil ». A demo hint under the card.

FORM: Le mur des cours, position 1 of 7 on the ranked surface list, seed key df5ed065. Signature interaction: typed characters light formulas; a valid code lights the wall, then « Bonjour Yanis ».

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
