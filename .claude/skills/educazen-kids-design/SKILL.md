---
name: educazen-kids-design
description: Use for any EducazenKids app work - designing or changing screens (HTML prototype or Figma), writing app copy in French, adding a lesson, quiz, contrôle or timetable data, choosing colors, charts or icons, exporting screens or brand assets. Loads the brand, audience, pedagogy and design-system rules of this project.
---

# EducazenKids design

EducazenKids is « L'école autrement 🌱 », an inclusive learning center in Agadir. **The app targets collège students, 14 to 16** (owner decision, 11/10/2026). This skill keeps every screen, text and asset on-brand and consistent with the prototype.

## Before you start

Read only what the task needs:

| Task | Read |
|---|---|
| A feature or behavior (video, quiz, contrôle, timetable, notifications) | `docs/product-spec-college.md` |
| Visual work: colors, type, components, charts | `docs/app-design-system.md`, then `prototype/src/app.css` |
| Copy, logo, brand questions | `docs/brand-guidelines.md` |
| A new lesson or school activity | `docs/activities-and-pedagogy.md` |
| Changing the prototype | `prototype/README.md` |
| Anything in Figma | `docs/figma-workflow.md` (MCP quota, gotchas, rebuild plan) |

## Non-negotiables

1. **Mature, not childish.** Address students with « tu », in direct, respectful French with real subject vocabulary. No emoji and no mascot in the collège UI. Praise effort; never write « Faux ».
2. **White and purple carry the UI** (owner brief), on the lavender `--app` background with a dark `--pill` for navigation and primary actions. Every other brand color has one job:
   - pink: contrôles and alerts
   - teal: success
   - gold: highlights, never text
   - plum: the center and contact
   - subject colors: the table in `app-design-system.md`
3. **Charts use the subject colors** from the brand palette, with a legend. Text in charts uses the ink tokens.
4. **Fonts:** Fredoka for titles and numbers, Quicksand for UI text, Lexend only for the reading-friendly mode. Use the `nb()` helper for French spacing and unbreakable formulas.
5. **Keep the key rule:** the quiz of a video lesson unlocks only after half of the video's seconds have actually been watched, and progress is saved right away.
6. **Inclusive by default:**
   - subtitles and speed control on videos
   - touch targets of at least 44 px
   - labels next to icons
   - the reading-friendly font and calm mode
   - no timers except the optional contrôle blanc
7. **Logo:** use `resources/brand/logo-educazenkids.png` (full) and `logo-mark.png` (head). In the prototype they are embedded from `prototype/src/logos.js`. Use them on light backgrounds only, and never recolor them. The wordmark is « Educazen » in `#A033F2` and « Kids » in `#E540B5`.

## Prototype workflow

1. Edit `prototype/src/` (`data.js` for content, `app.js` for screens and logic, `app.css` for styles).
2. Run `node build.js`, then `node test.js` (it must print ALL PASSED). Add a check to `test.js` for any new rule.
3. Copy `dist/preview.html` to `prototype/educazenkids-college.html`. Commit; a push to `main` redeploys GitHub Pages (ask before pushing).
4. Re-export the changed screens to `resources/screens/v3-college/` (Edge headless; command in `prototype/README.md`).

## Assets

New icons go in `resources/icons/<name>.svg`: 24×24, `stroke="currentColor"`, stroke width 2. Illustrations go in `resources/illustrations/`, brand files in `resources/brand/`, screen exports in `resources/screens/<version>/NN-name.png`. List every new file in `resources/README.md`.
