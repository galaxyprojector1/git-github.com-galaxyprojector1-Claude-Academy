# Claude Academy

> Application web d'apprentissage pour maîtriser Claude Code (React + TypeScript + Vite)

## Quick Start

```bash
npm run dev      # Dev server (localhost:5173)
npm run build    # Production build
```

**Live** : https://claudeacademy-inky.vercel.app

## Architecture Rapide

```
src/
├── App.tsx              # Router: dashboard | lesson | quiz
├── constants.ts         # 8 MODULES avec contenu HTML + quiz (SOURCE PRINCIPALE)
├── types.ts             # Module, Question, AppState, ViewState
├── data/glossary.ts     # 45+ termes pour popovers (GLOSSARY)
└── components/
    ├── ModuleCard.tsx      # Carte module (status: locked/available/completed)
    ├── LessonView.tsx      # Affiche module.content + bouton quiz
    ├── QuizView.tsx        # Quiz interactif (module.quiz)
    ├── ContentRenderer.tsx # Parse HTML, gère .info-trigger → popover
    └── Icon.tsx            # Icônes SVG
```

## Fichiers Clés à Connaître

| Fichier | Rôle | Quand le lire |
|---------|------|---------------|
| `src/constants.ts` | Tout le contenu des 8 modules | Ajouter/modifier leçons |
| `src/data/glossary.ts` | Définitions des termes | Ajouter termes au glossaire |
| `src/components/ContentRenderer.tsx` | Système de popovers | Modifier l'UX des info-triggers |
| `src/App.tsx` | State management + navigation | Modifier le flow utilisateur |

## Conventions

### Info-triggers (termes cliquables)
```html
<!-- Dans constants.ts, utiliser cette syntaxe : -->
<span class="info-trigger" data-term="cli">CLI</span>

<!-- Le terme doit exister dans glossary.ts -->
```

### Structure d'un Module (constants.ts)
```typescript
{
  id: 1,
  title: "Titre du module",
  subtitle: "Description courte",
  duration: "10 min",
  status: 'available', // initial, géré par App.tsx ensuite
  content: `<h2>...</h2><p>...</p>`, // HTML
  quiz: [{ id, text, options, correctIndex, explanation }]
}
```

### Structure Glossaire (glossary.ts)
```typescript
"terme-id": {
  title: "Titre affiché",
  summary: "2-3 phrases, supporte <strong>",
  details: "Explication longue, révélée par 'En savoir plus'"
}
```

## State Management

- **localStorage** : `claude-academy-state` (completedModules, unlockedModules)
- **Déblocage** : Quiz réussi → module suivant débloqué
- **Progression** : Calculée depuis `completedModules.length / MODULES.length`

## Règles de Développement

@.claude/rules/dev.md

## Mode Professeur (Apprentissage Interactif)

@.claude/rules/pedagogie.md

## Commandes Slash Disponibles

| Commande | Action |
|----------|--------|
| `/apprendre` | Commencer/continuer une leçon |
| `/quiz` | Tester ses connaissances |
| `/progression` | Voir la progression |
| `/mise-a-jour` | Nouveautés Claude Code |
