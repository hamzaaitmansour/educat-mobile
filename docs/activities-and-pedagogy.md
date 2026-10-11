# Educazen Kids: activities and pedagogy

What the school actually does (website and Instagram, 11/10/2026), and how each item becomes an app feature. French quotes are verbatim.

> **Current app audience: collège, 14 to 16** (owner decision, 11/10/2026). The collège mapping comes first. The kids (4 to 8) mapping further down is kept for a possible kids app.

## Collège (14 to 16): what the school offers, and what the app does

| School offer | App feature (prototype) |
|---|---|
| Collège programme (CNED), subjects Maths, Physique-Chimie, SVT, Français, Anglais, Histoire-Géo | Lessons by subject with chips, a timetable per class (3e B) |
| « L'enseignement sur mesure », each child's own path (PAP) | « Ton parcours sur mesure »: resume where you stopped, progress per lesson and subject |
| Learning styles (visuel, auditif, kinesthésique, social) | Every lesson gives a video (seeing, hearing), a résumé (reading) and a quiz (doing) |
| Soutien scolaire | « Soutien scolaire · Maths » slot in the timetable, a contrôle blanc for practice |
| Atelier DYS, children with DYS, TDAH, TSA | Reading-friendly font (Lexend + spacing), calm mode, subtitles, video speed, no time pressure except the optional contrôle blanc |
| Pôle psychosocial, « Atelier méthodo » | Méthodo slot in the timetable, a Pomodoro timer, contact with the center |
| Formation codage et IA (collège) | « Atelier codage & IA » slot on Friday |
| Contrôle continu | Contrôle continu screen: upcoming contrôles with preparation %, grades vs class average, timed practice |
| Communication with families | Notifications (room changes, grades, parent-teacher meeting) |

**Rules for writing a collège lesson:**
1. A video of 8 to 15 minutes, cut into 4 or 5 chapters with titles and subtitles.
2. A résumé that fits one screen per idea: definition, formula, example, « À retenir », « Erreurs fréquentes ».
3. 3 to 5 quiz questions about the video, each with an explanation. 60 % validates.
4. The quiz unlocks after half the video has actually been watched.
5. Tag each lesson with a subject, chapter, teacher, type (`vqr`, `rq`, `r`) and the contrôle it prepares.

## Pedagogical methods (« Nos méthodes »)

| Method | Website summary | Translation into the app |
|---|---|---|
| **Montessori** | « Autonomie, sensoriel, vie pratique. » « Apprentissage par la manipulation et l'autonomie. » | Touch and drag activities (count by touching, sort, put in order). The child chooses an activity; the app doesn't impose it. |
| **Freinet** | « Coopération, expression libre. » | Free drawing, « Raconte ta journée » (voice recording), sharing with parents. |
| **Steiner** | « Imaginaire, art, rythmes naturels. » | A calm daily rhythm (welcome, then activity, then rest), stories and nature themes. |
| **Module D.I.E.C** | « Notre approche exclusive : Développement Intégré de l'Enfant. » « pédagogie moderne et art-thérapie » | The art and emotions activity family, and the emotions check-in. |

## Activities (page « Nos activités »)

| Activity | Level / rhythm | Description (verbatim) |
|---|---|---|
| Pédagogie Montessori | Maternelle · Quotidien | « Pédagogie du monde par la manipulation et l'autonomie. Matériel sensoriel, vie pratique, langage et mathématiques. » |
| Bien-être | Tout âge | « exprimer ses émotions à travers l'art créatif » |
| Éveil sensoriel | Créativité | « Découvrir le monde à travers ses cinq sens. Il favorise le développement cognitif, moteur, émotionnel et stimule la curiosité naturelle de chaque enfant. » |
| Formation codage et IA | Collège | « Développe la logique, la créativité et les compétences numériques essentielles pour les futurs métiers de demain. » |

### Complementary programmes

- **Soutien scolaire:** « Cours individuels ou en petit groupe avec enseignants spécialisés. »
- **Bilan psycho-éducatif:** « Évaluation complète pour comprendre les besoins de votre enfant. »
- **Atelier DYS:** « Ateliers ciblés pour dyslexie, dyscalculie, dysorthographie. »
- **Coaching parental:** « Accompagnement et formation pour les parents. »
- **Stages vacances:** « Stages thématiques durant les vacances scolaires. »
- **Module D.I.E.C:** see above.

### Summer Camp 2026

- **Who and when:** ages 3 to 14, 29 June to 29 July, in 5 weeks you can choose from. Groups are capped at 20 children, with « Encadrement inclusif (HPI/TDAH/DYS) ».
- **Activities:** « Arts créatifs, art oratoire, théâtre, peinture, musique, danse et expression artistique ».
- **Themes:** Art & Peinture (Créativité), Sport & Jeux (Énergie), Apprentissage ludique.

## Instagram themes

- **Personalised path:** « Chaque enfant son propre parcours. Identifier ses difficultés, c'est lui donner les bonnes clés pour avancer. »
- **Learning styles:** « Tous les enfants n'apprennent pas de la même manière ! » The four styles are **visuel, auditif, kinesthésique, social**.
- **Soft skills:** communication, esprit critique, collaboration, autonomie, persévérance, confiance.
- **Maternelle:** jeu, exploration, découverte, éveil, socialisation, autonomie, gentillesse.
- **Subjects:** Français, Mathématiques, Sciences.
- **Slogans:** « Plus qu'une école, un tremplin pour leur avenir ! », « LES GRANDS RÊVENT ICI ».

## Child profiles the app must support

| Profile | What helps in the app |
|---|---|
| Typique | The default experience. |
| DYS (dyslexie, dyscalculie, dysorthographie) | A reading-friendly font, more spacing, audio for every instruction, manipulation instead of written answers. |
| TDAH | Short sessions (5 min) with breaks, one task per screen, immediate feedback. |
| TSA | Calm mode (fewer animations and sounds), a predictable routine, no time pressure. |
| HPI | Optional harder levels, open-ended challenges. |

## From the brand to the app

| Brand item | App feature | Status in Figma |
|---|---|---|
| Montessori: manipulation, mathematics | Counting activity (« Combien de pommes ? ») with a « touch each apple » hint | v1 screen « Lesson »; French copy planned in v2 |
| Éveil sensoriel (5 sens) | Activity family « Mes 5 sens » (sounds, colors, textures in photos) | v2 Home card |
| Bien-être, art-thérapie (D.I.E.C) | **Emotions check-in** (« Comment te sens-tu aujourd'hui ? ») and « Dessine ce que tu ressens » | v2 new screen |
| Inclusion: DYS, TDAH, TSA | **Espace parents** adaptations: police lecture facile, consignes audio, séances courtes, mode calme | v2 new screen |
| PAP (personalised plan) | A child profile with an active PAP, goals tuned per child | v2 Espace parents |
| Soft skills | « Ses super-pouvoirs »: autonomie, confiance, persévérance | v2 Espace parents |
| Learning styles | Every activity offers to listen (auditif), see (visuel), touch (kinesthésique) and play together (social) | Rule for all activities |
| Coaching parental | Tip cards and the next appointment with the center | v2 Espace parents |
| Français, Maths, Sciences | Activity families « Lettres », « Nombres », « Nature & sciences » | Lettres and Nombres in v2 Home; Sciences is an idea |
| Freinet: free expression | « Raconte ta journée » voice note | Idea |
| Summer camp, seasons | Seasonal events and badges | Idea |
| Coding and AI (collège) | Out of scope for ages 4 to 8; maybe « premiers pas en logique » later | Idea |

## Rules for writing an activity

1. 5 minutes at most, and one skill per activity.
2. Every instruction is **read aloud** (speaker button) and shown with a picture.
3. Use manipulation before writing: touch, drag, sort.
4. Give feedback right away and gently. After 3 tries, show the answer with an explanation.
5. Reward effort (stars, badges) and never show a red « Faux ».
6. Tag each activity with a subject (Français, Maths, Sciences, Bien-être, Éveil), an age band, a method, and the learning styles it uses.
