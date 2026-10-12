# EducazenKids app: design system

The **current design is v3 « Collège »** (14 to 16 year olds, 11/10/2026). The source of truth is `prototype/src/app.css` (tokens on `:root`) and `prototype/src/data.js` (subject colors). The kids versions (v1 Figma, v2 plan) are archived at the bottom.

## Direction

- **Mature, calm and clear:** a soft lavender background, white and pastel cards, large display titles, and a dark pill for navigation and primary actions.
- It follows the reference `resources/references/inspiration-syllabus-app.png`, recolored in the EducazenKids palette.
- White and purple stay dominant (owner brief). Every other brand color has one job.

## Layout

- **Frame:** phone, 390×844.
- **Gutters:** 24 px side gutters, so the content width is 342.
- **Status bar:** 46 px. It gets a frosted background once the content scrolls.
- **Bottom bar:** floating, 24 px from the bottom, 54 px buttons. Only the active button shows its label.
- **Screen bottom padding:** 128 px, so content can scroll clear of the bar.
- **Radii:** 12 / 18 / 26, with 30–34 for hero cards. Pills are 999.
- **Touch targets:** at least 44 px. Answer options are full-width 56 px.

## Color tokens (`app.css`)

| Token | Hex | Use |
|---|---|---|
| `--stage` | `#E8E2F0` | Background around the phone (prototype only) |
| `--app` | `#F3EFF8` | App background (pearl lavender) |
| `--surface` | `#FFFFFF` | Cards |
| `--ink` | `#1F1A2B` | Text |
| `--ink-2` | `#5B536B` | Secondary text |
| `--ink-3` | `#8C859C` | Labels |
| `--line` | `#E4DDEC` | Hairlines |
| `--pill` | `#241C33` | Nav pill, selected day and chip, primary buttons |
| `--brand` | `#9333EA` | Brand purple: links, focus, video progress |
| `--brand-deep` | `#6B21A8` | Link text |
| `--brand-soft` | `#F1E7FD` | Brand tint |
| `--pink` | `#D9368F` | Contrôles, badges, the « now » line |
| `--pink-soft` | `#FCE7F2` | Tint for the above |
| `--teal` | `#088D84` | Success: steps done, correct answer, « enregistré » |
| `--teal-soft` | `#DCF3EF` | Tint for the above |
| `--gold` | `#F2AB19` | The 50 % mark on the seek bar, highlights |
| `--coral` | `#E8506F` | Wrong answer, warnings |
| `--plum` | `#BC4384` | Center and contact (logo head color) |

**Wordmark:** « Educazen » in `#A033F2`, « Kids » in `#E540B5` (the logo colors).

## Subject colors (charts, cards, timetable)

| Subject | Color | Tint |
|---|---|---|
| Mathématiques | `#9333EA` | `#F1E7FD` |
| Physique-Chimie | `#088D84` | `#DCF3EF` |
| SVT | `#2E9D68` | `#E0F4E9` |
| Français | `#D9368F` | `#FCE7F2` |
| Anglais | `#E39A0B` | `#FFF2D4` |
| Histoire-Géo | `#E8506F` | `#FDE6EB` |
| Ateliers (codage, méthodo, soutien) | `#BC4384` | `#F7E3EE` |
| Perso (student's own slots) | `#6B5B7B` | `#EEEAF3` |

All of these come from the logo and website palette. Use the color for bars, dots and icons, and the tint for card backgrounds. Text stays `--ink`; never put text in gold.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display: titles, numbers, timetable times | **Fredoka** 500 | Shared with the website. 34 px screen titles, 26 px section heroes, 18 px card titles. |
| Body and UI | **Quicksand** 500 / 600 / 700 | The website's body font. 14 px base, 12–13 px labels. |
| Reading-friendly mode | **Lexend** | Turned on in Paramètres, with extra letter and word spacing. |

**Typography rules:**
- French spacing: a non-breaking space before `; : ? !` and inside formulas, so « f(x) = 2x + 1 » never breaks. This is the `nb()` helper.
- Eyebrows are uppercase 12 px, letter-spaced 0.08em.

## Components (prototype class names)

| Component | Class | Notes |
|---|---|---|
| Bottom bar | `.nav` | 3 entries, active pill with label |
| Icon button | `.iconbtn` | 44 px white circle, optional `.badge` |
| Chips | `.chip` | Subject filters, with a color dot; `.on` is the dark pill |
| Segmented control | `.seg` | Lesson tabs, Jour/Semaine, timer modes |
| Feature card | `.feature` | « Reprendre » card: pastel, spheres (`.art`), stats panel with arrow button |
| Lesson row | `.lesson-row` | Tinted row: icon square, title, type, progress ring |
| Video player | `.player` | Canvas, seek bar with watched segments and a 50 % mark, controls |
| Progress dock | `.progress-dock` + `.progbtn` | The button that fills toward 50 %, then becomes « Passer le quiz » |
| Steps | `.step` | Vidéo vue à 50 % / Résumé lu / Quiz réussi / Exercice fait (when the lesson has an exercise); `.done` is teal |
| Résumé card | `.rcard` | Plus `.formula`, `.retenir` (dark), `.warn` (coral) |
| Quiz option | `.opt` | States `.sel`, `.right`, `.wrong` |
| Timetable card | `.ev` | `.exam` and `.perso` variants, a live progress bar, KPIs for a contrôle |
| Free slot | `.free` | Striped « Pause déjeuner » / « Temps libre » |
| Week grid | `.weekgrid` | 6 days × 8h–18h |
| Bottom sheet | `.sheet` | Class details, add-slot form |
| Tool tile | `.tile` | 2-column grid; `.wide` for timetable and contact |
| Grade bars | `.gradechart` | Bar in the subject color plus a class-average tick |
| Stacked chart | `svg.chart` | Minutes per day stacked by subject |
| Toast | `.toast` | Top of the phone, dark |
| Login wall | `.login`, `.wall`, `.wrow`, `.w` | « Le mur des cours »: 10 rows of the year's formulas and dates in Fredoka (20 to 40 px), each in its subject color mixed 22 % into `--app`, drifting in alternating directions (130 to 170 s a loop). `.w.lit` takes the full subject color; `.wall.ok` lights every entry. The drift stops in calm mode, with reduced motion and while the code field has focus |
| Login card | `.login-card` | White, 32 px radius, soft offset shadow, no hairline; placed between two rows of the wall (top 21.1 %). The line under « Se connecter » (`.login-slot`) holds the help text at rest and the error in its place, at a fixed height, so the card never grows; `.done` keeps the same height for the greeting |
| Code field | `.codebox`, `.cell` | A fixed plum-ink « EZK » chip, then 2 + 4 cells (32×46, Fredoka 24) over one transparent input; focus draws the violet ring and a caret in the next cell; `.bad` is the coral ring |
| Demo hint | `.login-demo` | Frosted pill at the bottom of the login (prototype only) |
| Exercise figure | `.fig`, `.fig-thumb`, `.xthumb` | The teacher's image, drawn as SVG by `prototype/web/assets/figures.js` (shared with the dashboard): ink `#1F1A2B`, labels `#5B536B`, grid `#ECE6F3`, the subject color for the line or marks. `.fig` is a white panel ringed in the subject tint with « Image postée par … » and « Agrandir »; `.fig-thumb` is borderless inside the Exercice tab; `.xthumb` is the 58 px square in lists |
| Exercise question | `.xq` | White card: numbered square (`.xn`, subject tint; teal when right, gold when à revoir), the question, the answer field `.xin` (46 px, or a textarea that grows with its text), « Vérifier » |
| Answer feedback | `.xmsg`, `.xcorr`, `.xself` | `.xmsg` coral wash for a second try; `.xcorr` lavender corrigé, `.ok` teal wash, `.review` gold wash with the expected answer; `.xself` two equal ghost buttons « J'ai réussi » / « À revoir », colored only after the tap |
| Exercise result | `.xtally` | One 48 px tile per question (teal check or gold replay), then the « À revoir » corrections and the lesson's step chips |
| Exercise row | `.exo-row` | List row with a thumbnail or the list-checks icon, format, questions, time, « Étape de la leçon » or « Entraînement », a teal « Fait · n/n réussies » line once done, and a chevron |

**Icons:** Lucide style, 24 grid, stroke 2, drawn inline in `app.js` (`ICONS`). The 15 earlier icons are also in `resources/icons/`.

## Screens

29 states are exported in `resources/screens/v3-college/`:

| # | Screen |
|---|---|
| 01 | Connexion (« le mur des cours », empty code) |
| 02 | Accueil |
| 03–04 | Vidéo, quiz locked and unlocked |
| 05 | Résumé |
| 06 | Résumé + quiz lesson |
| 07–08 | Quiz correction and result |
| 09–10 | Emploi du temps, day and week |
| 11 | Contrôle sheet |
| 12 | Add slot |
| 13 | Outils |
| 14 | Contrôle continu |
| 15 | Contrôle blanc |
| 16 | Notifications |
| 17 | Progression |
| 18 | Fiches |
| 19 | Minuteur |
| 20 | Paramètres |
| 21 | Contact |
| 22–24 | Connexion: code being typed, unknown code, code recognised |
| 25 | Lesson, Exercice tab |
| 26 | Exercise with an image |
| 27 | Exercise, corrigé to compare |
| 28 | Exercise finished |
| 29 | Exercices (Outils) |

Behavior is specified in `docs/product-spec-college.md`.

## Archive: kids versions (4 to 8 years)

- **v1:** the Figma file https://www.figma.com/design/tkv3OMPotEwYwq9XPLDOl0, screenshots in `resources/screens/v1-english/`. English text, purple `#7C3AED` family, owl mascot (`resources/illustrations/`), Fredoka + Nunito, chunky 3D buttons.
- **v2:** the planned French kids rebrand, never applied. It is superseded by the collège direction; its token values are still in `resources/design-tokens.json`.
