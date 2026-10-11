---
version: 1
slug: "prototype-web-dashboard-html"
primary_target: "prototype/web/dashboard.html"
related_targets: []
---

Scope: `prototype/web/dashboard.html`, the manager dashboard. Visitor mode: Operate.

Audience: the centre's direction and teachers.
Job:
- see who is falling behind before a contrôle, and relaunch them
- complete or publish lessons (video, résumé, quiz)
- organise the weekly timetable per class
- send notifications to a class or a student
Proof: sample data that matches the student app (3e B, Mme Benali, « Fonctions affines », Labo 2…).
Constraints:
- a demo with no login and no backend
- contrôles and grades are out of scope
- reached from the landing page's manager icon, with a link back

Chosen: follow-up inbox. Memorable moment: acting on an alert sends the notification, resolves the row with an undo, and the count drops.
Unresolved:
- real roles and permissions
- video hosting
- whether parents get a space

## Direction contract

THESIS: The dashboard opens on today's follow-up: what needs attention, ranked, each with its one-click action, under today's timetable. It refuses the KPI-tiles-and-charts admin home.

OWN-WORLD:
- The student app's world, quieter: lavender ground, white working surfaces, a cooler lavender-grey sidebar, plum-ink for active navigation and primary buttons.
- Subject colours only as data (timetable blocks, progress). Pink for urgent, teal for done.
- Quicksand for all UI; Fredoka only for the wordmark and page titles. Restrained colour strategy.

STORY: A coordinator or teacher arrives in the morning, sees who has not watched half of today's contrôle video, relaunches them, completes a lesson's missing quiz and announces a room change. Then they manage lessons, students and the week from the side navigation.

FIRST VIEWPORT:
- Sidebar: logo, Suivi, Leçons, Élèves, Emploi du temps, Notifications, the Direction / Mme Benali role switch.
- Top: today's timetable strip across rooms, 08:00 to 18:00, with a « now » line.
- Below left: the ranked alert list (6 to 8 rows: urgency, context, action button). Right: the detail pane for the selected alert, with its students and a prefilled notification.

FORM: Follow-up inbox, position 4 of 7 on the ranked surface list, seed key a01d3518. Signature interaction: « Relancer » sends the notification, the row resolves with an undo, and the open count drops.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
