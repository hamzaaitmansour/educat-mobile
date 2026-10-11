---
name: EducazenKids web
description: The student app's lavender world, printed onto a school notebook for families and quieted into a follow-up inbox for staff.
colors:
  brand: "#9333EA"
  brand-deep: "#6B21A8"
  brand-ink: "#5A1B91"
  brand-soft: "#F1E7FD"
  desk: "#7B15A6"
  logo-purple: "#A033F2"
  logo-pink: "#E540B5"
  pink: "#D9368F"
  pink-ink: "#A0175F"
  pink-soft: "#FCE7F2"
  teal: "#088D84"
  teal-ink: "#05625C"
  teal-soft: "#DCF3EF"
  gold: "#F2AB19"
  gold-ink: "#8A5B00"
  gold-soft: "#FFF2D4"
  coral: "#E8506F"
  coral-soft: "#FDE6EB"
  danger-ink: "#B3123C"
  plum: "#BC4384"
  plum-soft: "#F7E3EE"
  svt: "#2E9D68"
  svt-soft: "#E0F4E9"
  amber: "#E39A0B"
  lavender: "#F3EFF8"
  lavender-2: "#EAE4F2"
  lavender-3: "#DDD4EA"
  sidebar: "#ECE7F3"
  surface-hover: "#FAF8FC"
  paper: "#FFFFFF"
  ink: "#1F1A2B"
  ink-2: "#554D66"
  ink-3: "#6C657D"
  line: "#E2DAEC"
  line-soft: "#F1ECF6"
  line-hover: "#C9BCE0"
  pill: "#241C33"
  pill-hover: "#3A2E52"
  device: "#1C1526"
  seyes-fine: "#EEE8F8"
  seyes-strong: "#D9CDF1"
  seyes-margin: "#E9A3CF"
typography:
  display:
    fontFamily: "Fredoka, Quicksand, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 4.1vw, 3.55rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fredoka, Quicksand, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3vw, 2.6rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  page-title:
    fontFamily: "Fredoka, Quicksand, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  wordmark:
    fontFamily: "Fredoka, Quicksand, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.005em"
  title:
    fontFamily: "Quicksand, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.35
  body-notebook:
    fontFamily: "Quicksand, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: "32px"
  body:
    fontFamily: "Quicksand, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.45
  label:
    fontFamily: "Quicksand, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
  hand:
    fontFamily: "Caveat, Segoe Print, cursive"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  stamp:
    fontFamily: "Quicksand, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0.08em"
rounded:
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  panel: "14px"
  phone: "44px"
  pill: "999px"
spacing:
  seyes-fine: "8px"
  seyes-row: "32px"
  gutter: "clamp(16px, 4vw, 48px)"
  panel: "16px"
  panel-gap: "18px"
  notebook-margin: "168px"
  sidebar: "248px"
components:
  button-ink:
    backgroundColor: "{colors.pill}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 22px"
  button-ink-hover:
    backgroundColor: "{colors.pill-hover}"
  button-ink-lg:
    height: "56px"
    padding: "0 28px"
  button-primary:
    backgroundColor: "{colors.pill}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    height: "38px"
    padding: "0 14px"
  button-primary-hover:
    backgroundColor: "{colors.pill-hover}"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "38px"
    padding: "0 14px"
  button-ghost-hover:
    textColor: "{colors.brand-ink}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    height: "38px"
  button-quiet-hover:
    backgroundColor: "{colors.lavender-2}"
    textColor: "{colors.ink}"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.danger-ink}"
    rounded: "{rounded.md}"
  button-danger-hover:
    backgroundColor: "{colors.coral-soft}"
  nav-item:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0 10px"
  nav-item-active:
    backgroundColor: "{colors.pill}"
    textColor: "{colors.paper}"
  segmented-active:
    backgroundColor: "{colors.pill}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    height: "32px"
  filter-pill:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    height: "30px"
    padding: "0 11px"
  filter-pill-active:
    backgroundColor: "{colors.pill}"
    textColor: "{colors.paper}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "38px"
    padding: "0 12px"
  input-fill-line:
    backgroundColor: "transparent"
    textColor: "{colors.brand-ink}"
    rounded: "0"
    height: "44px"
    padding: "6px 2px"
  chip-urgent:
    backgroundColor: "{colors.pink-soft}"
    textColor: "{colors.pink-ink}"
    rounded: "{rounded.pill}"
    height: "22px"
    padding: "0 8px"
  chip-todo:
    backgroundColor: "{colors.gold-soft}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.pill}"
    height: "22px"
    padding: "0 8px"
  chip-info:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.pill}"
    height: "22px"
    padding: "0 8px"
  chip-done:
    backgroundColor: "{colors.teal-soft}"
    textColor: "{colors.teal-ink}"
    rounded: "{rounded.pill}"
    height: "22px"
    padding: "0 8px"
  tag-profile:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.xs}"
    height: "20px"
    padding: "0 7px"
  panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.panel}"
  notebook-sheet:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.sm}"
  desk:
    backgroundColor: "{colors.desk}"
  toast:
    backgroundColor: "{colors.pill}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "12px 14px 12px 16px"
---

# Design System: EducazenKids web

## Overview

**Creative North Star: "The Liaison Notebook"**

One world, two registers. The world is the student app's: a pearl-lavender ground, a dark plum-ink pill for every action, brand purple for focus and the centre's ink, Kids pink, teal and gold as status, Fredoka for printed titles and Quicksand for everything read or operated. Both web surfaces load the same tokens from `prototype/web/assets/base.css` and the same self-hosted fonts, so a parent who clicks « Espace équipe » lands in the same material, only quieter.

The Persuade register (the families' landing page) is the carnet de liaison itself: white Seyès-ruled sheets lying on a saturated purple desk, a pink margin line, the centre's notes and the parents' signature written in Caveat, rubber stamps, and a steel paperclip holding a phone that shows a real app screen. Paper objects tilt a little, carry their own small shadows, and the running text sits on the ruling. The page reads as dated entries in the margin, each proving one feature, and closes on a signature line that becomes the appointment request.

The Operate register (the staff dashboard) is the same paper with the handwriting taken out: a lavender ground, flat white panels ringed by a hairline, a cooler lavender-grey sidebar, plum-ink only for the active navigation item and primary buttons. Colour carries data and nothing else: subject colours on timetable blocks and progress bars, pink for urgent, gold for to-do, teal for done. Density is high (14px base), nothing tilts, nothing is ruled.

**Key Characteristics:**
- Lavender ground, white working surface, plum-ink pill for action; brand purple is never a button fill.
- Every status colour comes as a pair: a soft tint ground with its own dark ink for text.
- Fredoka prints titles, Quicksand speaks, Caveat writes, and Caveat lives on the Persuade surface only.
- Notebook materials (Seyès ruling, margin line, stamps, paperclip, tilt) belong to the Persuade register; the Operate register is flat and square to the grid.
- The real app screens, framed in a dark phone, are the only imagery.

## Colors

A white-and-purple world (the owner's brief) with one dark ink for action and small, paired status colours.

### Primary
- **Brand Violet** (#9333EA): focus rings, the text caret, input focus borders, icons beside contact lines and buttons, link hover, Maths in the subject data. Never a button fill.
- **Notebook Ink Violet** (#6B21A8): the centre's handwriting (salutation, signature, margin dates), link text, the dashboard avatar.
- **Deep Violet Ink** (#5A1B91): text on violet tints (info chips, profile tags, rule callouts), the parent's typed answers on the fill-in lines.
- **Violet Wash** (#F1E7FD): the tint behind info chips, profile tags, icon tiles and the lesson-rule callout.
- **Desk Purple** (#7B15A6): the landing page's committed colour, the desk under the first spread and under the signature sheet. Not used on the dashboard.
- **Logo Purple** (#A033F2) and **Logo Pink** (#E540B5): the two halves of the « EducazenKids » wordmark, nowhere else.

### Secondary
- **Kids Pink** (#D9368F) / **Pink Ink** (#A0175F) / **Pink Wash** (#FCE7F2): urgent and contrôle. The saturated pink marks dots, the « now » line, low progress fills and the nav count; Pink Ink is the text colour (on its wash, and for the centre's handwritten notes on paper).
- **Done Teal** (#088D84) / **Teal Ink** (#05625C) / **Teal Wash** (#DCF3EF): done, resolved, published, the correct quiz answer (radio accent), the « Demande reçue » stamp and the unlocked quiz button.
- **Marker Gold** (#F2AB19) / **Gold Ink** (#8A5B00) / **Gold Wash** (#FFF2D4): to-do and « à relire ». Gold Ink draws the 50 % tick on every progress bar on the dashboard; Marker Gold draws it on the dark unlock demo.
- **Coral** (#E8506F) / **Coral Wash** (#FDE6EB): the invalid-field ring, Histoire-Géo in subject data, and the danger button's hover ground.
- **Error Red** (#B3123C): error messages and the danger button's text, on both surfaces.

### Tertiary
Subject colours are data, used as a dot, a bar fill or an icon, with the tint as the block's ground: Maths uses Brand Violet on Violet Wash, Physique-Chimie Done Teal on Teal Wash, Français Kids Pink on Pink Wash, Histoire-Géo Coral on Coral Wash, plus:
- **SVT Green** (#2E9D68) on **SVT Wash** (#E0F4E9).
- **Anglais Amber** (#E39A0B) on Gold Wash.
- **Atelier Plum** (#BC4384) on **Plum Wash** (#F7E3EE): workshops, méthodo, soutien.

### Neutral
- **Pearl Lavender** (#F3EFF8): the page ground on both surfaces, the selected inbox row, quiet filter pills.
- **Lavender Mist** (#EAE4F2): quiet-button hover, selected tab, draft status, neutral tags, empty progress track.
- **Lavender Shadow** (#DDD4EA): scrollbar thumbs.
- **Sidebar Lavender** (#ECE7F3): the dashboard sidebar, cooler than the ground.
- **Hover Lavender** (#FAF8FC): row hover, week-grid columns, the checked lesson-type card, the empty drop zone.
- **Paper** (#FFFFFF): notebook pages and dashboard panels.
- **Plum Ink** (#1F1A2B): body text and headlines.
- **Plum Grey** (#554D66): secondary text, paragraphs on paper, unselected nav items.
- **Plum Mute** (#6C657D): labels, table heads, timestamps, cites.
- **Hairline** (#E2DAEC): borders and rings on panels, inputs, the top bar and the footer.
- **Faint Hairline** (#F1ECF6): row dividers inside tables and lists.
- **Hover Hairline** (#C9BCE0): input and choice-card ring on hover, the dashed drop-zone border.
- **Plum-Ink Pill** (#241C33) / **Pill Hover** (#3A2E52): every primary button, active nav item, pressed segment and filter, the toast, the unlock demo panel.
- **Device Black** (#1C1526): the phone body around app screens.
- **Seyès Fine** (#EEE8F8), **Seyès Strong** (#D9CDF1), **Margin Pink** (#E9A3CF): the notebook ruling (8px fine lines, 32px strong lines, one vertical margin line); Seyès Strong also draws the fill-in lines, table rules and dashed entry separators on paper.

### Named Rules
**The Plum-Ink Pill Rule.** Every primary action, active nav item and pressed control is the plum-ink pill (#241C33). Brand Violet marks focus, links and icons; it never fills a button.

**The Wash-and-Ink Rule.** A status or category colour reaches text only as its dark ink on its own wash (pink-ink on pink-soft, gold-ink on gold-soft, teal-ink on teal-soft, brand-ink on brand-soft). The saturated mid-tone draws dots, bars, ticks and rings.

**The Colour Is Data Rule.** On the Operate surface, subject colours appear only on timetable blocks, dots, progress fills and notification icons. Chrome (sidebar, panels, buttons, headers) stays lavender, white and plum-ink.

**The Purple Desk Rule.** The saturated Desk Purple belongs to the Persuade surface, under the opening spread and the signature sheet. The Operate surface has no saturated ground.

## Typography

**Display Font:** Fredoka (with Quicksand, system-ui)
**Body Font:** Quicksand (with system-ui, -apple-system, Segoe UI)
**Hand Font:** Caveat (with Segoe Print, cursive)

All three are self-hosted (`assets/fonts.local.css`, latin and latin-ext subsets, `font-display: swap`). Body text is Quicksand 500 everywhere; 600 for secondary detail, 700 for labels, buttons and row titles.

**Character:** Fredoka's rounded print gives the titles the app's friendly confidence; Quicksand keeps reading and operating calm and legible; Caveat is the centre's pen, the one human hand on the page.

### Hierarchy
- **Display** (Fredoka 500, clamp(2.4rem, 4.1vw, 3.55rem), 1.04, -0.02em): the landing's opening headline only, broken into fixed lines from 1000px.
- **Headline** (Fredoka 500, clamp(1.9rem, 3vw, 2.6rem), 1.08, -0.015em, balanced, max 18ch): each notebook entry's title; the signature sheet's title runs slightly larger (clamp(2rem, 3.2vw, 2.75rem)).
- **Page Title** (Fredoka 500, 1.625rem, 1.1, -0.01em): the dashboard view title (« Suivi du jour », « Leçons »), followed by a Plum Mute date or scope line.
- **Wordmark** (Fredoka 600, 1.375rem on the landing, 1.1875rem in the sidebar): « Educazen » in Logo Purple, « Kids » in Logo Pink.
- **Title** (Quicksand 700, 1.125rem, 1.3 to 1.35): the dashboard detail pane, student file and empty-state titles. Dashboard section heads use Quicksand 700 at 0.9375rem.
- **Body Notebook** (Quicksand 500, 1.0625rem, 32px line, max 52ch): paragraphs on ruled paper; the lede runs 1.125rem on the same 32px line, max 34ch.
- **Body** (Quicksand 500, 14px base, 1.45 for paragraphs): the whole dashboard. Row titles 0.9375rem 700; context lines 0.8125rem 600 in Plum Mute.
- **Label** (Quicksand 700, 0.75rem): dashboard field labels and table heads; chips, axis ticks and the « now » tag drop to 0.6875rem. Landing field labels run 0.875rem 700 in Plum Grey.
- **Hand** (Caveat 600, 1.5rem, 1.3): the centre's margin notes with their drawn arrows. The same face runs 2rem for the salutation, 1.625rem for margin dates, 1.6rem for the parents' quotes, 2.6rem 700 for the signature line.
- **Stamp** (Quicksand 700, 0.8125rem, 1.15, 0.08em, uppercase): rubber stamps only (« Rentrée 2026-2027 », « Demande reçue »).

### Named Rules
**The Three Hands Rule.** Fredoka prints, Quicksand speaks, Caveat writes. Caveat carries only the centre's voice and the parents' signature, on the Persuade surface; the dashboard never uses it.

**The Ruled Line Rule.** On Seyès paper, running text uses a 32px line height so each line sits on a strong rule.

**The Stamp-Only Capitals Rule.** Uppercase with wide tracking appears only inside a bordered, rotated rubber stamp. Section labels, kickers and table heads stay in sentence case.

## Layout

**Persuade (landing).** A sticky translucent top bar (Pearl Lavender at 0.92 with a 12px blur, hairline below) over full-bleed bands, with side gutters of clamp(16px, 4vw, 48px). The first band is the desk: an open two-page spread, max 1140px wide, each page at least 640px tall, tilted -0.6deg. Below it, the journal is one long ruled sheet (max 1140px) built on a three-column grid: a 168px margin column holding the handwritten date and subject, the entry text, and a 0.8fr proof column (a clipped phone or a sticky note), with a 48px column gap and 72px vertical padding per entry; entries are separated by a dashed Seyès Strong rule. The signature sheet repeats the margin grid on a second desk band. The footer is four columns on lavender.

Responsive: at 1080px the top-bar links hide, the margin narrows to 120px and the proof drops under the text. At 760px the spread stacks into one column and stops tilting, the margin narrows to 34px, the date turns vertical in the margin, form rows go single-column and the submit button goes full width. At 480px the header CTA shortens to « Rendez-vous ».

**Operate (dashboard).** A 248px sticky sidebar (full viewport height) beside the main column, which pads 22px 28px 40px and stacks panels with an 18px gap. Today's view is a full-width timetable strip (a 56px lane label plus a 08:00 to 18:00 track) above an inbox split of 1.25fr alerts and a minmax(320px, 1fr) detail pane. Other views use a list plus a 340px (380px for notifications, 320px for the editor's phone preview) side panel; the week grid is a 48px hour column plus six day columns, 520px tall. Panels pad 16px; panel heads 14px 16px.

Responsive: at 1180px every split collapses to one column and sticky side panes become static. At 860px the sidebar becomes a 264px off-canvas drawer opened from a menu button, the main column pads 16px, form rows go single-column, and the timetable strip and week grid scroll horizontally instead of squeezing.

## Elevation & Depth

The two registers treat depth oppositely. On the Persuade surface paper has weight: sheets carry a stacked page edge and a long purple-tinted drop, and the objects laid on them (phone, sticky note, paperclip, notification card) each cast a small shadow of their own. On the Operate surface everything at rest is flat; panels, inputs and chips are outlined by a hairline ring drawn with box-shadow, and real shadows appear only on layers that float (the toast, the open drawer, the preview phone).

### Shadow Vocabulary
- **Spread on the desk** (`box-shadow: 0 2px 0 #E6DEF2, 0 4px 0 #D6CBE8, 0 30px 60px -18px rgba(20, 6, 40, 0.55), 0 12px 24px -12px rgba(20, 6, 40, 0.4)`): the opening spread; the signature sheet uses the first three layers.
- **Journal sheet** (`box-shadow: 0 1px 0 #E6DEF2, 0 3px 0 #D6CBE8, 0 24px 48px -24px rgba(40, 20, 70, 0.35)`): the long ruled sheet on the lavender ground.
- **Ink lift** (`box-shadow: 0 6px 18px -8px rgba(36, 28, 51, 0.7)`): under the landing's ink pill buttons.
- **Phone** (`box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 28px 40px -16px rgba(30, 10, 50, 0.45), 0 8px 16px -8px rgba(30, 10, 50, 0.35)`): the clipped phones; the dashboard's preview phone uses `0 24px 40px -24px rgba(36, 28, 51, 0.6)`.
- **Sticky note** (`box-shadow: 0 14px 22px -16px rgba(60, 40, 0, 0.45)`): the yellow note on the journal.
- **Card on paper** (`box-shadow: 0 0 0 1.5px var(--line), 0 12px 24px -18px rgba(40, 20, 70, 0.4)`): the notification card written into an entry.
- **Hairline ring** (`box-shadow: 0 0 0 1px var(--line)`, inset for controls): every dashboard panel, input, ghost button, chip and search field. Hover moves the ring to #C9BCE0 or Brand Violet.
- **Focus glow** (`box-shadow: inset 0 0 0 1.5px var(--brand), 0 0 0 3px rgba(147, 51, 234, 0.16)`): dashboard fields and the search box (which takes the 1.5px ring only).
- **Toast** (`box-shadow: 0 16px 32px -12px rgba(36, 28, 51, 0.6)`) and **Drawer** (`box-shadow: 0 0 40px rgba(36, 28, 51, 0.25)`): the only lifted layers on the dashboard.

### Named Rules
**The Paper Has Weight Rule.** On the Persuade surface, a sheet shows its stacked page edge (one and two pixels of lavender paper below it) and every object laid on paper casts its own small shadow. The page edge belongs to notebook sheets; it is never a card or button shadow.

**The Hairline Ring Rule.** On the Operate surface, surfaces at rest are flat white with a 1px hairline ring. A drop shadow means the layer floats above the page.

## Shapes

Soft but not bubbly. The radius ladder is 6px (tags, captions, the sticky note, lunch bands), 8px (notebook sheets, segmented buttons, tabs, week blocks), 10px (dashboard buttons, nav items, inputs, callouts), 12px (alert rows, the toast, choice cards, icon tiles, the confirmation note), 14px (dashboard panels) and fully round pills for the landing's buttons, chips, status labels and filter pills. Phones are 44px (34px screen) on the landing and 36px (28px screen) in the dashboard preview. Avatars and dots are circles.

On paper, lines do the work of boxes: fill-in fields are a 2px underline in Seyès Strong, the résumé field is ruled every 32px, the signature is written over a 2px ink line, and the methods table is ruled like the notebook. Stamps are a 3px bordered rectangle (10px radius) rotated off-axis, with a soft mask so the ink looks pressed.

### Named Rules
**The Tilt Belongs to Paper Rule.** Rotation is a Persuade device and stays small: the spread -0.6deg, phones 1.6 to 2.4deg, handwritten notes 2 to 6deg, the signature -2deg, stamps 8 to 9deg. Below 760px the spread straightens. Nothing on the dashboard rotates.

## Components

### Buttons
Confident dark pills on paper; compact rounded keys in the inbox.
- **Shape:** fully round on the landing (999px); gently rounded on the dashboard (10px).
- **Ink pill (landing):** Plum-Ink Pill ground, white Quicksand 700, 48px tall with 22px sides (56px and 28px for the large call to action), with the ink lift shadow. Hover moves to Pill Hover and lifts 1px; active returns to rest.
- **Text link with arrow (landing):** Notebook Ink Violet, 700, the arrow slides 3px right on hover.
- **Primary (dashboard):** Plum-Ink Pill ground, white 700 at 0.875rem, 38px tall (32px small), 17px leading icon. Hover to Pill Hover.
- **Ghost:** Paper with a 1px hairline ring, Plum Ink text; hover turns the ring Brand Violet and the text Deep Violet Ink. Used for info-level alert actions, « Annuler » and secondary choices.
- **Quiet:** transparent, Plum Grey; hover fills Lavender Mist. **Danger:** transparent, Error Red text; hover fills Coral Wash.
- **Busy / disabled:** 0.6 opacity with a progress cursor; while sending, a 14px spinner ring and « Envoi… » replace the label.

### Chips
- **Level chips** (inbox): pill, 22px, 0.6875rem 700. Urgent is Pink Ink on Pink Wash, à faire Gold Ink on Gold Wash, info Deep Violet Ink on Violet Wash, traité Teal Ink on Teal Wash.
- **Lesson status:** the same pairs at 24px (Brouillon on Lavender Mist, À relire gold, Publiée teal, Programmée violet).
- **Profile tags** (DYS, TDAH, TSA, HPI): 20px, 6px radius, Violet Wash; « Typique » stays neutral on Lavender Mist. On the landing the same profiles are pills on Violet Wash.
- **Filter pills:** 30px pills on Pearl Lavender, pressed state is the plum-ink pill; the role switch and the student-app tabs use the same pressed pill inside a 3px-padded tray.
- **Recipient chips:** 26px white pills with a hairline ring and a round 18px remove button.

### Cards / Containers
- **Notebook sheet (Persuade):** Paper with Seyès ruling (8px fine, 32px strong, vertical fine lines every 32px) and the pink margin line, 8px radius, the page-edge shadow.
- **Panel (Operate):** Paper, 14px radius, hairline ring, a 14px 16px head divided by a hairline; content pads 16px. No drop shadow.
- **Sticky note:** a yellow note tilted 1.6deg holding handwritten text on the landing (#FFF6C9 ground, #4A3A00 ink); the dashboard's teacher note is flat (#FFF8DB ground, #5A4500 ink, 10px radius).
- **Callouts:** 10 to 12px radius washes: the lesson rule on Violet Wash, warnings on Gold Wash, the confirmation on Teal Wash.

### Inputs / Fields
Two dialects of one field.
- **Fill-in line (Persuade):** no box, a 2px Seyès Strong underline, the answer in Deep Violet Ink 700 at 1.0625rem; the textarea is ruled every 32px; selects carry a violet chevron. Hover turns the underline Brand Violet; focus thickens it with a second 2px violet line (the textarea takes a 2px violet outline instead). Invalid turns it Coral.
- **Ringed field (Operate):** Paper, 10px radius, inset 1px hairline, 38px tall (textareas 76 to 84px), 600 weight. Hover moves the ring to Hover Hairline; focus draws the violet focus glow; invalid draws a Coral ring with a 0.75rem Error Red message below. Labels sit above in Label type.
- **Choice cards:** radio inputs dressed as 12px-radius cards; checked shows a 2px plum-ink ring on Hover Lavender; keyboard focus draws a 3px violet outline.

### Navigation
- **Landing top bar:** sticky, translucent lavender with blur; logo mark and wordmark, section links in Plum Grey 700 with a Margin Pink underline on hover, the « Espace équipe » ringed pill (icon in Brand Violet) and the ink pill call to action.
- **Dashboard sidebar:** Sidebar Lavender, 40px items with 19px line icons in Plum Grey; hover fills white at 0.7; the current page is the plum-ink pill. The open-alert count is a 20px pill beside « Suivi » (white on the active item, with Pink Ink text). The role switch sits above the nav; the demo note, the signed-in person and « Retour au site » sit at the foot. Below 860px it becomes a drawer.

### Signature line (Persuade)
The parents' signature closes the page. As the parent types a name, it is written on the line in Caveat 700 at 2.6rem in Notebook Ink Violet over a 2px ink line; on submit the signature draws in left to right (a 1.1s clip-path reveal) and a teal « Demande reçue » stamp lands 0.9s later, scaling down from 1.4 while it rotates -9deg.

### Unlock demo (Persuade)
A dark plum-ink panel (18px radius) reproducing the app's player: a formula screen, a seek track with watched segments, a gold 50 % tick, and a full-width quiz button that fills with the app's violet-to-pink progress gradient as real watching accumulates, then turns teal when half the video has been seen. Skipping ahead does not count.

### Clipped phone (Persuade)
A real app screen inside a Device Black phone, tilted, held to the page by a steel-gradient SVG paperclip, with a handwritten Pink Ink note and drawn arrow beside it.

### Timetable blocks (Operate)
Blocks on a lane or week column, 7 to 8px radius, the subject wash as ground with a 7px subject dot before the label; contrôles use Pink Wash with a pink dot; in a teacher's view, other teachers' classes dim to 0.35. Hover rings the block in its subject colour; the selected block takes a 2px plum-ink ring. A 2px Kids Pink « now » line carries its time in a small pink tag; lunch is a pale lavender band.

### Progress bar (Operate)
A 6px Lavender Mist track filled in the subject colour (Kids Pink when a student is below 50 %), with a 2px Gold Ink tick at 50 %, the threshold that unlocks a quiz.

### Alert row and undo toast (Operate)
The inbox row is the dashboard's signature: a level chip, a 0.9375rem 700 title, a Plum Mute context line, and exactly one action button (primary for urgent and à faire, ghost for info). Acting on it resolves the row in place: a teal check ticks in, the row flashes Teal Wash and settles back (0.9s), the sidebar count bumps, and a plum-ink toast rises from the bottom with « Annuler » for about five seconds.

## Do's and Don'ts

### Do:
- **Do** load `assets/base.css` first on every web surface and use its custom properties; add surface rules in a surface stylesheet.
- **Do** make every primary action and active state the plum-ink pill (#241C33), hovering to #3A2E52.
- **Do** set status and category text as ink on wash (pink-ink on pink-soft, gold-ink on gold-soft, teal-ink on teal-soft, brand-ink on brand-soft).
- **Do** keep notebook text on the 32px Seyès line and lay new Persuade content out on the margin grid (date in the margin, text, proof).
- **Do** show the student app through its real screen exports in a Device Black phone; they are the only imagery.
- **Do** draw the 50 % threshold as a gold tick wherever video progress appears.
- **Do** give dashboard actions an immediate in-place result and an undo, as the alert row does.
- **Do** keep keyboard focus visible: a 3px Brand Violet outline offset 3px, or the violet focus glow on fields.
- **Do** honour reduced motion: the base stylesheet collapses every animation and transition.

### Don't:
- **Don't** fill a button with Brand Violet (#9333EA) or put a saturated desk ground on the dashboard.
- **Don't** use Caveat on the dashboard, for UI labels, or for running body text.
- **Don't** put white text on Kids Pink (#D9368F) or Done Teal (#088D84) at body or label sizes; both measure about 4.1 to 4.3:1 against white. Use the ink-on-wash pair.
- **Don't** use uppercase tracked text outside a rubber stamp.
- **Don't** put subject colours on chrome; they mark data only.
- **Don't** use the stacked page-edge shadow on cards or buttons, or tilt anything on the dashboard.
- **Don't** add Seyès ruling, stamps or paperclips to the Operate surface.
