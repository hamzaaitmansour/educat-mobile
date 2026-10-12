# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

(The student app itself is a mobile app; its clickable prototype lives in `prototype/educazenkids-college.html`. This record covers the web surfaces: the families landing page and the management dashboard.)

## Stack

Static HTML/CSS/JS demo files, no framework and no backend (owner, 11/10/2026: "just a demo html", in a `prototype/web/` folder, one landing-page file and one dashboard file, more files allowed). There is no login; the landing page links straight to the dashboard.

## Users

- **Families:** parents of collège students (14 to 16) and the students themselves, in Agadir. They discover EducazenKids and its student app, then download the app or book an appointment / enrol for the 2026-2027 school year. Parents are addressed with « vous ».
- **Direction (management):** the center's directors and pedagogical coordinators. They organise everything: classes, timetable, lessons, students, announcements.
- **Teachers:**
  - add their lessons (video, résumé, quiz, exercise)
  - schedule their classes
  - follow how their students progress
  - send notifications to their classes

## Product Purpose

EducazenKids is an inclusive educational and psychosocial center in Agadir: « L'école autrement », « L'enseignement sur mesure ». The student app gives each collège student:
- video lessons whose quiz unlocks after half of the video is actually watched
- revision résumés, quizzes and contrôle continu
- notifications and a weekly emploi du temps

The management dashboard is where the direction and teachers set all of that up. Success means:
- families understand what the school and app offer, and take the next step (download or appointment)
- staff can publish a lesson, organise the week and see who is falling behind without effort

## Positioning

**Tailored teaching, not a generic school portal.** The center accompanies every child at their own pace:
- typique, DYS, TDAH, TSA and HPI profiles, with a Plan d'Accompagnement Personnalisé
- Montessori, Freinet and Steiner methods
- a multidisciplinary and psychosocial team

The app and dashboard make that individual follow-up visible. Progress counts only what the student actually watched or did, and staff see each student's path, not just grades.

## Operating Context

- **Programme:** collège (3e, CNED); subjects Maths, Physique-Chimie, SVT, Français, Anglais, Histoire-Géo.
- **Activities:** workshops (codage & IA, méthodo, art-thérapie), soutien scolaire, holiday camps.
- **Lesson types:** vidéo + résumé + quiz, résumé + quiz, résumé seul; each can carry an optional exercise (an image posted by the teacher, or questions; short answers auto-checked, written ones self-marked against a corrigé), which is the lesson's 4th step (owner, 12/10/2026).
- **Quizzes:** 60 % validates.
- **Week structure:** Monday to Saturday, classes from 08:00 to 17:15, lunch break 12:00 to 14:00, rooms (Salle 12, Labo 2, Salle info, Salle Zen…).
- **Contrôles and teachers:** contrôles are scheduled in the timetable with a coefficient. Teachers are referred to as Mme / M., except the English teacher, written « Mr » (English usage, the same in the student app, the website and the dashboard).
- **Contact:** Arabic line 06 60 68 69 93, French line 07 66 68 27 25, 1er étage immeuble Mouhib, avenue Alfarabi, Agadir 80000. Website educazenkids.com, Instagram @educazenkids.
- **Enrolment:** « Inscriptions ouvertes, rentrée 2026-2027 »; Summer Camp (3 to 14, inclusive supervision).

## Capabilities and Constraints

**Dashboard demo scope (owner):**
- lessons and quizzes (create and edit a lesson, upload a video, write the résumé, build the quiz, choose the type)
- students and notifications (each student's progress: video watched, résumé read, quiz passed; compose and send notifications)
- emploi du temps (build the weekly timetable per class)

Contrôles and grades are out of the dashboard demo for now. The demo doesn't need to make every function work; sample data is fine.

**Undecided:**
- a real backend and video hosting
- accounts and roles (the demo has no login)
- whether parents get their own space
- Arabic or bilingual pages

## Brand Commitments

- **Name:** EducazenKids (logo wordmark « EducazenKids », « Educazen » in purple, « Kids » in pink).
- **Taglines:** « L'enseignement sur mesure », « L'école autrement 🌱 ».
- **Language:** French.
- **Logo files:** `resources/brand/logo-educazenkids.png` (full) and `resources/brand/logo-mark.png` (child head with puzzle heart); raster only.
- **Owner brief for the app UI:** white and purple dominant. Brand palette and fonts are recorded in `docs/brand-guidelines.md`.
- **Tone:** warm, reassuring, concrete; never shaming a mistake.

## Evidence on Hand

- **Real copy** from the center's website, quoted verbatim in `docs/brand-guidelines.md` (section « Parent testimonials ») and `docs/activities-and-pedagogy.md`:
  - mission, vision, methods, activities, programmes
  - six parent testimonials with their attribution, for example « Ma fille a retrouvé son sourire et le plaisir d'aller à l'école », Fatima B., maman de Lina, 7 ans
  - the form promise « nous vous recontactons sous 24h »
- **The student app prototype and its 21 screen exports:** `prototype/educazenkids-college.html`, `resources/screens/v3-college/`.
- **The owner's UI reference:** `resources/references/inspiration-syllabus-app.png`.
- **Not available:**
  - photos of the center, students or staff
  - app-store listings or download links (the app is not published)
  - enrolment numbers beyond the website's « +70 familles »
  - pricing

Do not invent these.

## Product Principles

1. **Each student's own path comes first.** Every screen should help see or support one child's progress, not just averages.
2. **Count real effort.** Progress reflects what was actually watched, read or answered.
3. **Reassure families.** Plain French, concrete next steps, the center's real voice; no school-portal jargon.
4. **Make staff work light.** Publishing a lesson or changing the week should take a few steps and sensible defaults.
5. **Inclusive by default.** Readable type, clear contrast, and options that help DYS, TDAH and TSA students.

## Accessibility & Inclusion

The center serves DYS, TDAH, TSA and HPI students; the student app offers a reading-friendly font (Lexend) and a calm mode. Web surfaces should meet WCAG AA contrast, work with the keyboard, respect reduced motion, and avoid relying on color alone.
