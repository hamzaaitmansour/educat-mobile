# EducazenKids: student app, families site and staff dashboard

**EducazenKids** is an inclusive educational and psychosocial center in Agadir, Morocco. Tagline « L'enseignement sur mesure »; Instagram bio « L'école autrement 🌱 ». It supports typique, DYS, TDAH, TSA and HPI students with Montessori, Freinet and Steiner methods and art therapy.

**Audience since 11/10/2026: collège students, 14 to 16** (3e, CNED programme). The owner asked for « a little mature ». A first kids version (4 to 8) is archived.

There is no production code yet. Everything is a **clickable prototype**, published on **GitHub Pages** at https://hamzaaitmansour.github.io/educat-mobile/ from the repo https://github.com/hamzaaitmansour/educat-mobile (set up on 11/10/2026 at the user's request; the earlier claude.ai artifact link was deleted the same day):

| Prototype | File | Notes |
|---|---|---|
| Entry page | `prototype/index.html` | What the Pages URL opens: one card per prototype |
| Student app | `prototype/educazenkids-college.html` | Mobile app |
| Families website | `prototype/web/landing-page.html` | Start here; `prototype/web/index.html` redirects to it |
| Staff dashboard | `prototype/web/dashboard.html` | Reached from the landing page's « Espace équipe » icon, no login |

**For any design, copy, lesson, asset or prototype work, use the project skill `educazen-kids-design`** (`.claude/skills/educazen-kids-design/SKILL.md`). Web surfaces were designed with the **impeccable** skill: product record in `PRODUCT.md`, direction contracts in `.impeccable/surfaces/`.

## Map

```
CLAUDE.md
README.md                     GitHub front page: live URL, entry points, how deploys work
.github/workflows/pages.yml   GitHub Pages deploy: builds and tests the student app, publishes prototype/ without src/
.gitignore, .gitattributes    ignore src/dist and OS files; LF line endings, binary types
PRODUCT.md                    impeccable product record (users, purpose, constraints, brand commitments)
DESIGN.md                     impeccable design record of the web world (tokens, rules, components); sidecar .impeccable/design.json
.impeccable/                  impeccable working files: surface briefs (direction contracts), decision payloads, review captures
.claude/skills/educazen-kids-design/SKILL.md   rules + where to look
docs/
  product-spec-college.md    features and rules of the collège app (video, 50 % quiz unlock, résumés, contrôle continu, notifications, emploi du temps, Outils)
  app-design-system.md       collège tokens, subject colors, fonts, components, screens (+ archived kids versions)
  brand-guidelines.md        identity, story, values, tone, logo and website colors, fonts, logo rules, sources
  activities-and-pedagogy.md school offer → app features (collège first, then kids)
  figma-workflow.md          Figma file/account, MCP quota, plan to rebuild the collège design in Figma, gotchas
prototype/
  index.html                 entry page of the published site (links the three prototypes)
  educazenkids-college.html  student app prototype (open in a browser)
  README.md                  how the prototypes work, build/test/export commands
  src/                       student app source: page.html, app.css, data.js, app.js, logos.js, build.js, test.js, export-extra.js
  web/                       families landing page + staff dashboard (static HTML/CSS/JS, fonts self-hosted, works offline)
resources/
  README.md                  inventory
  brand/                     logo JPEG + transparent PNGs (full, mark)
  references/                inspiration-syllabus-app.png (the owner's UI reference)
  screens/v3-college/        21 PNG exports of the student app (regenerated 11/10, styled)
  screens/v1-english/        archived kids Figma screens
  icons/, illustrations/     SVG icons, owl mascot (kids)
  design-tokens.json         kids v2 token set (archived; collège tokens live in prototype/src/app.css)
```

## Key facts

- **Brand colors:** logo purple `#A033F2`, pink `#F24CC3`, plum `#BC4384`. The website also uses magenta `#BC066B`, teal `#088D84` and gold `#F2AB19`.
- **UI:**
  - white and purple dominate, on a lavender background, with a dark plum-ink pill for navigation and primary actions
  - one brand color per subject, charts included
- **Fonts:** Fredoka (display) and Quicksand (body), both from the website. Lexend is the reading-friendly option; Caveat handles handwriting on the families site.
- **Language:** French. Use « tu » for students and « vous » for parents and staff. No emoji in the collège UI.
- **Student app login:** a personal student code only (demo EZK-3B-4821), on « le mur des cours », the year's formulas lighting up as the code is typed (impeccable, 12/10/2026).
- **Student app navigation:** Cours · Emploi du temps · Outils (exercices, contrôle continu, notifications, progression, fiches, minuteur, paramètres, contact).
- **Exercises (12/10/2026):** a lesson can carry an Exercice (an image posted by the teacher, or questions); short answers are auto-checked, written ones are self-marked against the corrigé; it is the lesson's 4th step. Teachers add it in the dashboard's lesson editor (« Ajouter un exercice »).
- **Families site:** « carnet de liaison » world:
  - Seyès-ruled notebook pages on a purple desk
  - a live demo of the 50 % quiz rule
  - the parents' signature that books an appointment
- **Staff dashboard:** « follow-up inbox »:
  - today's timetable strip and ranked alerts with one-click actions and undo
  - lessons (editor with type, video, résumé, quiz builder, optional exercise with image or questions, phone preview)
  - students, emploi du temps (clash warnings), notifications
  - a Direction / Mme Benali role switch

## Status (11/10/2026)

- **Hosting:** GitHub Pages, deployed by `.github/workflows/pages.yml` on every push to `main` (public repo `hamzaaitmansour/educat-mobile`). In the repo settings, Pages → Source must be « GitHub Actions ».
- **Student app prototype v3:** built and tested (`node test.js`: 65 checks since 12/10: login, exercises, 4th lesson step).
- **Families site + staff dashboard:** built with impeccable (decision page: carnet de liaison, follow-up inbox).
  - The independent finish review gave **ship** on both pages after two fix rounds.
  - Interaction-tested in headless Edge (15 scenario checks).
  - The design record is `DESIGN.md` + `.impeccable/design.json` (tokens, named rules, components).
  - Web tokens (`prototype/web/assets/base.css`) use slightly darker inks than the student app (`ink-3` #6C657D for AA contrast).
- **Figma** (https://www.figma.com/design/tkv3OMPotEwYwq9XPLDOl0) still holds only the kids v1. The Starter plan's **20 MCP calls a month** were used up on 11/10. See `docs/figma-workflow.md` for the options.

## Open decisions for the owner

- French only, or French + Arabic.
- Real video hosting, accounts, roles and a backend (the prototypes use sample data).
- A parent space, and whether the kids app is still wanted.
- A vector logo (SVG or AI) for exports.
- Real photos of the centre for the families site.

## Rules

- The machine-wide rules in `C:\Users\hamza\.claude\CLAUDE.md` apply: never push, and never touch a PR, without asking first.
- This folder is a git repository. `main` deploys to GitHub Pages on push: commit locally, then ask before pushing.
- **Publishing:** GitHub Pages only, through the workflow. No other online copies (claude.ai artifacts, other hosts) unless asked.
- Every new asset (icon, illustration, export, token, prototype build) goes into `resources/` or `prototype/` and is listed in `resources/README.md` or `prototype/README.md`.
