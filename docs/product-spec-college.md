# EducazenKids Collège: product spec

The student app for collège (14 to 16, 3e, CNED programme at EducazenKids Agadir). Decided by the owner on 11/10/2026: the app targets collège students, a little more mature than the first kids demo. Reference build: `prototype/` (online at https://hamzaaitmansour.github.io/educat-mobile/educazenkids-college.html).

## Navigation

A floating bottom bar with three entries, as in the reference `resources/references/inspiration-syllabus-app.png`:

| Entry | Icon | Screen |
|---|---|---|
| Cours | book | Home: « Ton parcours sur mesure », lessons by subject |
| Emploi du temps | calendar | Weekly timetable (the most important feature) |
| Outils | grid | Tools menu that groups the secondary screens |

Lessons and quizzes open full screen, without the bar. The Outils icon carries the unread-notification count.

## Lessons

**Three lesson types:**

| Type | Code | Tabs |
|---|---|---|
| Vidéo + Résumé + Quiz | `vqr` | Vidéo · Résumé · Quiz |
| Résumé + Quiz | `rq` | Résumé · Quiz |
| Résumé seul | `r` | Résumé |

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

**Saving progress:**
- Watched seconds are saved every 2 seconds and on pause.
- The résumé-read flag, best quiz score and passed flag are saved at once.
- Lesson progress = average of its steps: video at 50 % (partial credit before that), résumé read, quiz passed.

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
| Contrôle continu | Upcoming count and general average |
| Notifications | Unread count |
| Ma progression | Study time per day (stacked by subject), completion per subject, lessons finished, quizzes passed |
| Fiches résumés | Every résumé, with search |
| Minuteur | Pomodoro: 25 min work, 5 min break, 4 sessions |
| Paramètres | Notification types; a reading-friendly font (Lexend, extra spacing, for DYS students); calm mode; reset demo |
| Contacter le centre | Logo, the Arabic and French phone lines with copy buttons, address, psychosocial support, website and Instagram |

## Branding in the app

- **Logo:** the full logo on the login screen, at the bottom of Outils and on Contact. The head mark with the « EducazenKids » wordmark (purple « Educazen », pink « Kids ») at the top of Home.
- **Colors, charts included:**
  - one brand color per subject (see `docs/app-design-system.md`)
  - gold for highlights, teal for success, pink for contrôles and alerts
  - dark plum-ink for the navigation pill and primary buttons

## Not in the prototype yet

- Real login and accounts, and a real backend for lessons, grades and the timetable.
- Real video files (the prototype draws an animated lesson on a canvas).
- Push notifications.
- The parent space from the kids plan.
- An Arabic version.
