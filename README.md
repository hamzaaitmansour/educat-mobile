# EducazenKids prototypes

Clickable prototypes for **EducazenKids**, an inclusive educational centre in Agadir: the families website, the collège student app and the staff dashboard. Sample data, no backend, no login.

**Live:** https://hamzaaitmansour.github.io/educat-mobile/

| Prototype | Online | Source |
|---|---|---|
| Entry page | `/` | `prototype/index.html` |
| Families website | `/web/landing-page.html` | `prototype/web/` |
| Staff dashboard | `/web/dashboard.html` | `prototype/web/` |
| Student app | `/educazenkids-college.html` | `prototype/src/` (built file at `prototype/educazenkids-college.html`) |

## Deploying

`.github/workflows/pages.yml` runs on every push to `main`: it builds and tests the student app (`node build.js`, `node test.js`), then publishes `prototype/` (without `src/` and `README.md`) to GitHub Pages. In the repository settings, **Pages → Source** must be set to **GitHub Actions**.

## Documentation

- `CLAUDE.md`: project overview, map, status, rules
- `PRODUCT.md`, `DESIGN.md`: product record and design record of the web surfaces
- `docs/`: product spec, app design system, brand guidelines, pedagogy, Figma workflow
- `prototype/README.md`: how the prototypes work, build and test commands
- `resources/README.md`: brand files, icons, screen exports
