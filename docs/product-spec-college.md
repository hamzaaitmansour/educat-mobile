# EducazenKids Collège: product spec

The student app for collège (14 to 16, 3e, CNED programme at EducazenKids Agadir). Decided by the owner on 11/10/2026: the app targets collège students, a little more mature than the first kids demo. Reference build: `prototype/` (online at https://hamzaaitmansour.github.io/educat-mobile/educazenkids-college.html).

## Connexion (student code)

Decided 12/10/2026: students sign in with a **personal code** the centre hands out, nothing else. The phone remembers them; « Se déconnecter » in Paramètres signs out.

- **Code:** `EZK-` + class + 4 digits, e.g. EZK-3B-4821. The prefix is printed; the student types the 6 characters into cells. A pasted code (with or without « EZK- », any case, spaces) is tidied.
- **Errors**, each with its own message: too short (« Ton code a 6 caractères après EZK… »), wrong shape (« Il ressemble à EZK-3B-4821 »), unknown code (« Vérifie-le, ou demande ton code à l'accueil »). On an error the lit formulas go back to their tint.
- **Screen: « le mur des cours ».** The backdrop is the year's real content (f(x) = ax + b, U = R × I, 46 chromosomes, 1939-1945, have + past participle…) in pale subject tints, drifting slowly. Each typed character lights one formula in its subject colour; a valid code lights the whole wall and the card greets the student (« Bonjour Yanis ! », class, « Code reconnu »), then Home opens. The drift stops in calm mode, with reduced motion, and while the student types.
- **Help:** « Pas de code ? Demande-le à l'accueil du centre. » The prototype adds a button that types the demo code.

## Navigation

A floating bottom bar with three entries, as in the reference `resources/references/inspiration-syllabus-app.png`:

| Entry | Icon | Screen |
|---|---|---|
| Cours | book | Home: « Ton parcours sur mesure », lessons by subject |
| Emploi du temps | calendar | Weekly timetable (the most important feature) |
| Outils | grid | Tools menu that groups the secondary screens |

Lessons and quizzes open full screen, without the bar. The Outils icon carries the unread-notification count.

## Lessons

**Three lesson types**, each with an optional **Exercice** (added 12/10/2026):

| Type | Code | Tabs |
|---|---|---|
| Vidéo + Résumé + Quiz | `vqr` | Vidéo · Résumé · Quiz (· Exercice) |
| Résumé + Quiz | `rq` | Résumé · Quiz (· Exercice) |
| Résumé seul | `r` | Résumé (· Exercice) |

**Video:**
- The player has play/pause, a seek bar, a time readout, a speed control (1×, 1,5×, 2×; the prototype adds « Démo ×10 ») and subtitles.
- The chapter list has durations and jumps to each chapter.
- The seek bar shows which parts were actually watched, with a mark at 50 %.

**The progress button (key rule):**
- It sits in a dock under the video: « Ta progression XX % ».
- The button fills as the student watches. While locked it reads « Quiz à 50 % · encore m:ss ».
- **When at least half of the video's seconds have actually been played, it unlocks the quiz.** Seeking forward does not count. A toast says « Quiz débloqué ».
- The Quiz tab shows a lock until then.

**Résumé:** a revision sheet with sections, formulas, « À retenir » and « Erreurs fréquentes », and a reading time. « J'ai lu le résumé » marks it read.

**Quiz:**
- Multiple-choice questions shown one at a time: Valider, then the correction with an explanation, then the next question.
- **60 % or more validates the quiz.**
- The result screen shows the score ring and « Progression enregistrée ».

**Exercice** (decided 12/10/2026):
- Posted by the teacher. Either **an image** (a figure, a graph, a timeline, a photo of a worksheet) with questions about it, or **questions only**.
- The Exercice tab shows the format, the number of questions, the time, a thumbnail of the image and « Commencer l'exercice ». The exercise opens full screen: the statement, the image (« Agrandir » opens it in a sheet), then every question on one page, like a worksheet.
- **Short answers** (a number, a word) are checked at once. The check ignores case, spaces, the decimal comma, a leading « b = » and a trailing unit (« 3 cm », « 100 Ω »). A wrong answer gets a second try (« Pas encore. Vérifie ton calcul, puis réessaie. ») or « Voir la correction »; after two misses the correction shows, marked « À revoir ».
- **Written answers:** the student writes (or works on paper), opens « Voir le corrigé », then marks « J'ai réussi » or « À revoir ».
- « Terminer l'exercice » unlocks once every question is corrected. The result shows one tile per question, the correction of every question « À revoir », the lesson's steps with « Exercice fait », « Revoir la leçon » and « Refaire l'exercice ».
- The teacher's image and the student's are the same drawing: `prototype/web/assets/figures.js` serves both prototypes.
- **It is the lesson's 4th step**, « Exercice fait », done when the exercise is finished, whatever the score (the quiz validates knowledge; the exercise counts practice).

**Saving progress:**
- Watched seconds are saved every 2 seconds and on pause.
- The résumé-read flag, best quiz score and passed flag are saved at once.
- Lesson progress = average of its steps: video at 50 % (partial credit before that), résumé read, quiz passed, exercice done (when the lesson has one).
- A finished exercise saves its score (réussies / questions) and adds a « Cours » notification.

## Contrôle continu (Outils → Contrôle continu)

- **Summary:** weighted general average and the class average (coefficients).
- **À venir:**
  - date, subject, chapter, time, room, coefficient, countdown (« Aujourd'hui », « Dans 3 jours »)
  - **Préparation** = progress of the linked lesson
  - « Réviser » opens the lesson
  - « Contrôle blanc » starts a 10-minute timed quiz
- **Mes notes:**
  - a bar chart per subject: the student's grade in the subject color, a tick for the class average
  - the list of graded contrôles with date, coefficient and class average
- **Mes contrôles blancs:** score and time used for each attempt.

## Notifications (Outils → Notifications, or the bell on Home)

| Type | Example | Opens |
|---|---|---|
| Emploi du temps | Room change | The class in the timetable |
| Contrôle | « Contrôle de maths à 14:00 » | The lesson |
| Cours | New video available, quiz result | The lesson |
| Note | Grade available | Contrôle continu |
| Rappel | Unfinished quiz, a slot the student added | The lesson or the slot |
| Centre | Parent-teacher meeting | Contact |

- Filters: Tout, Cours, Contrôles, Emploi du temps.
- Groups: Aujourd'hui, Hier, Plus tôt.
- Unread dot, and « Tout lire ».
- Settings choose which types notify.

## Emploi du temps

**Header:** « Semaine 42 · 3e B », the month, and a **+** button to add a revision, homework or reminder slot.

**Day view:**
- A week strip (Lun 12 to Dim 18). Each day has dots in the subject colors, and pink for a contrôle.
- The timeline gives start and end times and a card per class: subject, room, teacher, type (Cours, TP, Contrôle, Atelier, Soutien).
- The current class shows « En cours · encore 20 min » with a progress bar.
- Gaps of 45 minutes or more become « Pause déjeuner » or « Temps libre » cards.
- Contrôle cards stand out (pink, with salle, coef and durée).
- An empty day shows an empty state with « Ajouter une révision ».

**Week view:** a Mon–Sat grid from 8h to 18h with colored blocks and a legend. Tapping a block opens it.

**Class sheet:**
- Room, teacher, duration and coefficient.
- Notes (« Changement de salle ») and homework.
- The linked lesson.
- For a contrôle: preparation, « Réviser » and « Contrôle blanc ».
- « Me rappeler 10 min avant ».
- Delete, for a student's own slot.

**Add form:** title, type, day, start, end, reminder. It checks that the end is after the start, and adds a notification.

## Outils menu

| Tool | Notes |
|---|---|
| Emploi du temps | Wide tile showing the next class |
| Exercices | Wide tile: how many to do. The list is grouped by subject, with subject chips, a thumbnail for image exercises, « Étape de la leçon » or « Entraînement », and the score once done. Some exercises are extra practice outside the lesson steps (moyenne et médiane, conversions, argumentation) |
| Contrôle continu | Upcoming count and general average |
| Notifications | Unread count |
| Ma progression | Study time per day (stacked by subject), completion per subject, lessons finished, quizzes passed |
| Fiches résumés | Every résumé, with search |
| Minuteur | Pomodoro: 25 min work, 5 min break, 4 sessions |
| Paramètres | The student, « Se déconnecter »; notification types; a reading-friendly font (Lexend, extra spacing, for DYS students); calm mode; reset demo |
| Contacter le centre | Logo, the Arabic and French phone lines with copy buttons, address, psychosocial support, website and Instagram |

## Branding in the app

- **Logo:** the head mark and wordmark on the login card; the full logo at the bottom of Outils and on Contact. The head mark with the « EducazenKids » wordmark (purple « Educazen », pink « Kids ») at the top of Home.
- **Colors, charts included:**
  - one brand color per subject (see `docs/app-design-system.md`)
  - gold for highlights, teal for success, pink for contrôles and alerts
  - dark plum-ink for the navigation pill and primary buttons

## Not in the prototype yet

- Real accounts and code distribution (the prototype knows one code), and a real backend for lessons, exercises, grades and the timetable.
- Teachers see students' exercise answers (the prototype keeps them on the phone).
- Real video files (the prototype draws an animated lesson on a canvas).
- Push notifications.
- The parent space from the kids plan.
- An Arabic version.
