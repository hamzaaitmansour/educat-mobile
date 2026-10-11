# Figma workflow

## File and account

- **File:** « Kids Learning App – Demo », https://www.figma.com/design/tkv3OMPotEwYwq9XPLDOl0
- **Pages:** « App demo » (`0:1`) holds the screens and prototype; « Components » (`2:2`) holds the component sheet `4:3`.
- **Content:** the **kids v1** (English, ages 4 to 8). It does not contain the collège design yet.
- **Account:** the Figma MCP is logged in as « travail hamza » (hamzatravail00@gmail.com), team « travail hamza's team », plan key `team::1393022420034807097`.

## The Starter-plan limit

On the Starter plan the Figma MCP allows **20 tool calls per month**: `use_figma`, screenshots, metadata and uploads. Only `create_new_file`, `whoami` and `add_code_connect_map` are exempt. All 20 were used on 11/10/2026, so the collège design was built as an HTML prototype instead (`prototype/`).

There are three ways to bring it into Figma:
1. **Upgrade to Professional with a Full seat** (200 calls per day). Rebuild the screens with the plan below, about 12 calls.
2. **Wait for the monthly reset.** Budget carefully: one call per screen group, screenshots inside the write call.
3. **Import the HTML.** A web-to-Figma plugin such as « html.to.design » can import `prototype/educazenkids-college.html` or the published link, without MCP calls. The result is editable layers but not components; clean it up by hand.

## Plan: rebuild the collège design in Figma (when calls are available)

1. **Tokens:** a « Color » collection from `docs/app-design-system.md` (core tokens plus the 8 subject colors and tints), and « Spacing & radius ».
2. **Text styles:** Fredoka 500 (34 / 26 / 18) and Quicksand 500, 600, 700 (14 / 13 / 12). Load `Quicksand` with `listAvailableFontsAsync` first.
3. **Components:**
   - Nav (Active = Cours / Emploi du temps / Outils)
   - Chip (On / Off)
   - Segmented control
   - Lesson row
   - Progress button (Locked with fill % / Ready)
   - Step chip
   - Quiz option (Default / Selected / Right / Wrong)
   - Timetable card (Cours / Contrôle / Perso / Live)
   - Free slot
   - Tool tile
   - Bottom sheet
4. **Logo components:** upload `resources/brand/logo-educazenkids.png` and `logo-mark.png` with `upload_assets`, then make them `Brand/Logo` and `Brand/Logo mark`.
5. **Screens:** the 21 states in `resources/screens/v3-college/`, built 3 or 4 per call on a new page « Collège ». Use the PNG exports as the visual reference.
6. **Prototype links:** the same flows as the HTML prototype (`docs/product-spec-college.md`).

## Gotchas (learned on v1)

- Load the `figma-use` skill, plus `figma-generate-design` for screens, before any `use_figma` call. Without the Figma plugin, they are MCP resources (`skill://figma/...`).
- **Page context:** the current page does not reset between calls, so always call `await figma.setCurrentPageAsync(page)` first. A failed call is rolled back whole.
- **Nested instances:** resizing a layer inside a nested instance is silently ignored. Expose a variant instead, as the Progress bar `Value` does.
- **Emoji:** they render blank on the first `screenshot()`. Take a throwaway shot at `scale: 0.01` first.
- **Clipping:** `figma.createAutoLayout()` frames clip by default, which gives child shadows hard edges. Set `clipsContent = false` on inner frames.
- **Async setters:** use `setTextStyleIdAsync` and `setEffectStyleIdAsync`.
- **Images:** the Plugin API can't fetch URLs. Use `upload_assets`, or reuse an `imageHash`.
