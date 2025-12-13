# Règles de Développement

## Stack Technique
- **React 19** + TypeScript
- **Vite** (bundler)
- **Tailwind CSS** (inline, pas de fichier CSS custom sauf styles dans composants)
- **Vercel** (déploiement)

## Conventions de Code

### Nommage
- Composants : `PascalCase.tsx`
- Fichiers données : `camelCase.ts`
- IDs glossaire : `kebab-case`

### Style CSS
- Utiliser les classes Tailwind
- Palette Anthropic : `claude-accent` (#D97757), `claude-bg`, `claude-text`, `claude-subtext`, `claude-border`
- Classes custom définies dans `index.html` (<style> global)

## Patterns Importants

### Ajouter un nouveau terme au glossaire
1. Ouvrir `src/data/glossary.ts`
2. Ajouter l'entrée avec `title`, `summary`, `details`
3. Dans `src/constants.ts`, utiliser `<span class="info-trigger" data-term="id">Texte</span>`

### Ajouter une question quiz
1. Dans `src/constants.ts`, trouver le module
2. Ajouter dans le tableau `quiz` : `{ id, text, options, correctIndex, explanation }`
3. L'ID doit être unique (convention : moduleId * 100 + questionNumber)

### Modifier le style des popovers
- Fichier : `src/components/ContentRenderer.tsx`
- Le composant `PopoverContent` gère l'affichage
- Animation définie dans le style inline

## Ne Pas Modifier Sans Raison
- `src/types.ts` - Types stables
- `index.html` - Tailwind config + fonts
- `vite.config.ts` - Config build
