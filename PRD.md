# PRD - Claude Academy Web App

## Méthodologie

**IMPORTANT** : Utiliser une approche **itérative avec sub-agents** :

1. **Cycle itératif** : Build → Test → Améliore → Repeat
2. **Sub-agents spécialisés** :
   - Agent **Build** : Vérifier/fixer les erreurs
   - Agent **UI/UX** : Améliorer le design et l'interactivité
   - Agent **Test** : Valider chaque itération
3. **Objectif** : Arriver à une **version exceptionnelle**, pas juste fonctionnelle

---

## Contexte

Une app React/TypeScript générée par Gemini existe sur GitHub :
- **Repo** : `galaxyprojector1/git-github.com-galaxyprojector1-Claude-Academy`
- **Stack** : React 19 + TypeScript + Vite + TailwindCSS
- **Déploiement** : Vercel (déjà connecté au repo)

## Objectif

Finaliser l'app pour qu'elle soit **fonctionnelle et en ligne** sur Vercel.

## ⚠️ POINTS CRITIQUES

### 1. FUSION OBLIGATOIRE - Le contenu est LOCAL

#### Situation actuelle

| Source | Contenu | Qualité |
|--------|---------|---------|
| `constants.ts` (Gemini) | Contenu générique sur les LLMs | ❌ Pas le bon |
| `modules/*.md` (Local) | Vrai cours Claude Code | ✅ À utiliser |

#### Fichiers locaux à intégrer

```
c:\Users\yohann\Desktop\Claude-Academy\modules\
├── 01-bases.md         → Module 1: Les Bases de Claude Code
├── 02-memory.md        → Module 2: Memory & CLAUDE.md
├── 03-commandes.md     → Module 3: Commandes & Raccourcis
├── 04-mcp.md           → Module 4: MCP Servers
├── 05-settings.md      → Module 5: Settings & Permissions
├── 06-skills.md        → Module 6: Skills & Sub-agents
├── 07-hooks.md         → Module 7: Hooks & Automation
└── 08-best-practices.md → Module 8: Best Practices
```

#### Comment fusionner

1. **Lire chaque fichier `.md` local**
2. **Transformer le markdown en HTML** pour le champ `content` de chaque module
3. **Garder la structure de Gemini** (titres, durées, quiz) mais remplacer le `content`
4. **Adapter les quiz** au vrai contenu (si nécessaire, générer de nouvelles questions)

#### Exemple de transformation

**Avant (Gemini - générique) :**
```typescript
{
  id: 1,
  title: "Les Fondations de l'IA",
  content: `<h2>Introduction aux LLMs</h2>...`  // ❌ Contenu générique
}
```

**Après (Fusionné - vrai contenu) :**
```typescript
{
  id: 1,
  title: "Les Bases de Claude Code",
  content: `<h2>Qu'est-ce que Claude Code ?</h2>...`  // ✅ Contenu de 01-bases.md
}
```

#### Documentation supplémentaire à récupérer (optionnel)

Si le contenu des modules `.md` est incomplet, enrichir avec :

- **Memory** : <https://code.claude.com/docs/en/memory>
- **MCP** : <https://code.claude.com/docs/en/mcp>
- **Settings** : <https://code.claude.com/docs/en/settings>
- **Skills** : <https://code.claude.com/docs/en/skills>
- **Hooks** : <https://code.claude.com/docs/en/hooks>
- **Best Practices** : <https://www.anthropic.com/engineering/claude-code-best-practices>

### 2. MOBILE FIRST

L'app doit être **optimisée pour mobile en priorité**. Utiliser Playwright pour tester sur :

- **URL LIVE** : <https://claudeacademy-2v7g02nfr-galaxyprojector1s-projects.vercel.app/>

### 3. Vérification avec Playwright

```typescript
// Tester les viewports mobiles
await page.setViewportSize({ width: 375, height: 667 });  // iPhone SE
await page.setViewportSize({ width: 390, height: 844 });  // iPhone 14
await page.setViewportSize({ width: 412, height: 915 });  // Android
```

---

## État Actuel (Gemini a généré)

### Fichiers existants
```
├── index.html          # Entry point + Tailwind config
├── index.tsx           # React root
├── App.tsx             # Main app component
├── constants.ts        # 8 modules avec contenu + quiz
├── types.ts            # TypeScript interfaces
├── components/
│   ├── Icon.tsx        # Icônes SVG
│   ├── ModuleCard.tsx  # Carte module dashboard
│   ├── LessonView.tsx  # Vue leçon
│   └── QuizView.tsx    # Vue quiz
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Fonctionnalités existantes
- [x] Dashboard avec 8 modules
- [x] Vue leçon avec contenu HTML
- [x] Quiz avec questions/réponses
- [x] Design style Claude (beige, corail, épuré)
- [x] Navigation entre écrans

### Ce qui manque potentiellement
- [ ] Vérifier que le build Vite fonctionne
- [ ] Persistance progression (localStorage)
- [ ] Déverrouillage progressif des modules
- [ ] Animations/transitions
- [ ] Responsive mobile

### Points à améliorer ABSOLUMENT
- [ ] **TEXTES TROP PETITS** → Augmenter la taille des fonts (titres, paragraphes, boutons)
- [ ] **MANQUE D'INTERACTIVITÉ** → Ajouter des micro-interactions, hover effects, feedback visuel
- [ ] **EXPÉRIENCE UTILISATEUR** → Rendre l'app engageante et satisfaisante à utiliser

---

## Tâches pour l'Agent

### 1. Vérifier et fixer le build
```bash
npm install
npm run build
```
- Corriger les erreurs TypeScript si nécessaire
- S'assurer que Vercel peut build le projet

### 2. Ajouter la persistance (localStorage)
- Sauvegarder la progression de l'utilisateur
- Structure suggérée :
```typescript
interface UserProgress {
  completedModules: number[];
  quizScores: Record<number, number>;
  currentModule: number;
}
```
- Charger au démarrage, sauvegarder après chaque quiz

### 3. Système de déverrouillage
- Module 1 : toujours disponible
- Modules 2-8 : déverrouillés quand le précédent est complété (quiz réussi ≥ 50%)

### 4. Responsive
- S'assurer que l'app fonctionne sur mobile
- Grid modules : 1 colonne mobile, 2 tablette, 3-4 desktop

### 5. UI/UX - Tailles et Lisibilité

- **Titres** : Minimum `text-3xl` (30px) pour h1, `text-2xl` pour h2
- **Paragraphes** : Minimum `text-lg` (18px), `leading-relaxed`
- **Boutons** : Grands, cliquables facilement (`py-4 px-8 text-lg`)
- **Espacement** : Généreux, aéré (`space-y-6`, `gap-8`)

### 6. Interactivité et Micro-interactions

- **Hover effects** : Scale, shadow, color transitions sur tous les éléments cliquables
- **Animations d'entrée** : Fade-in, slide-up au chargement des pages
- **Feedback quiz** : Confetti ou animation de succès quand bonne réponse
- **Progress bar animée** : Smooth transition quand progression change
- **Boutons** : État pressed, ripple effect
- **Cards modules** : Effet "lift" au hover (`hover:scale-105 hover:shadow-xl`)

### 7. Polish final

- Transitions douces entre les vues (300ms ease)
- État de chargement avec skeleton ou spinner
- Message de félicitations avec animation à la fin
- Sons optionnels (click, success, unlock)

---

## Contraintes Techniques

| Élément | Valeur |
|---------|--------|
| Framework | React 19 |
| Build | Vite |
| CSS | TailwindCSS (CDN) |
| Déploiement | Vercel (auto-deploy sur push main) |
| Données | localStorage (pas de backend) |

---

## Design (déjà défini)

Couleurs Claude :
```javascript
claude: {
  bg: '#FDFBF9',       // Fond beige clair
  surface: '#FFFFFF',   // Cards
  border: '#E5E0D8',    // Bordures
  text: '#3F3E3B',      // Texte principal
  subtext: '#8A8881',   // Texte secondaire
  accent: '#D97757',    // Orange/corail (CTA)
  warm: '#F4EBE4',      // Fond chaud
  success: '#5B8C5A'    // Vert succès
}
```

---

## Critères de Succès

1. ✅ `npm run build` passe sans erreur
2. ✅ App déployée et accessible sur Vercel
3. ✅ Progression sauvegardée entre sessions
4. ✅ Modules se déverrouillent progressivement
5. ✅ Fonctionne sur mobile

---

## URLs

- **GitHub** : https://github.com/galaxyprojector1/git-github.com-galaxyprojector1-Claude-Academy
- **Vercel** : (URL générée après deploy)

---

## Notes

Le contenu des modules dans `constants.ts` est générique (LLMs, prompts).
**Ne pas modifier le contenu** - focus uniquement sur le code fonctionnel.

---

## Cycle Itératif (OBLIGATOIRE)

L'agent doit suivre ce processus :

```
┌─────────────────────────────────────────────────────────────┐
│                    CYCLE D'AMÉLIORATION                     │
└─────────────────────────────────────────────────────────────┘

     ┌──────────┐
     │ ITÉRATION│
     │    1     │
     └────┬─────┘
          │
          ▼
   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
   │   BUILD     │────▶│    TEST     │────▶│  AMÉLIORE   │
   │  (Sub-agent)│     │ (Sub-agent) │     │ (Sub-agent) │
   └─────────────┘     └─────────────┘     └──────┬──────┘
                                                  │
          ┌───────────────────────────────────────┘
          │
          ▼
     ┌──────────┐
     │ ITÉRATION│
     │    2     │──────▶ ... jusqu'à version EXCEPTIONNELLE
     └──────────┘
```

### Itération 1 : Build + Fusion

- [ ] Fixer le build Vite
- [ ] Fusionner le vrai contenu des modules `.md`
- [ ] Vérifier que l'app se lance

### Itération 2 : Mobile + Fonctionnalités

- [ ] Tester avec Playwright sur mobile
- [ ] Fixer les problèmes responsive
- [ ] Ajouter localStorage + déverrouillage modules

### Itération 3 : Polish + Tests Finaux

- [ ] Agrandir textes, améliorer UI
- [ ] Ajouter interactivité (hover, animations)
- [ ] Test final Playwright sur 3 viewports

---

## Définition de "DONE"

L'app est terminée quand :

1. ✅ Déployée sur Vercel et accessible
2. ✅ Tous les modules navigables
3. ✅ Quiz fonctionnels avec scoring
4. ✅ Progression sauvegardée (refresh = données conservées)
5. ✅ Textes lisibles (grands, aérés)
6. ✅ Interactivité satisfaisante (hover, animations)
7. ✅ Fonctionne parfaitement sur mobile
8. ✅ Expérience utilisateur engageante
