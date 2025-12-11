# Claude Academy

Plateforme d'apprentissage interactive pour maîtriser Claude Code.

**Live Demo** : [claudeacademy-inky.vercel.app](https://claudeacademy-inky.vercel.app)

## Fonctionnalités

- 8 modules progressifs (Débutant → Expert)
- Quiz interactifs pour valider les acquis
- Info-triggers avec popovers explicatifs
- Glossaire enrichi (40+ termes)
- Design inspiré Anthropic

## Démarrage rapide

```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build
```

## Structure du projet

```
Claude-Academy/
├── src/                   # Code source React
│   ├── components/        # Composants UI
│   ├── data/              # Glossaire
│   ├── App.tsx            # Composant principal
│   ├── constants.ts       # Modules & contenu
│   └── types.ts           # Types TypeScript
├── modules/               # Cours markdown (référence)
├── docs/                  # Documentation
├── .claude/               # Config Claude Code
│   └── commands/          # Commandes slash
├── index.html             # Entry point
├── vite.config.ts         # Config Vite
└── package.json
```

## Modules disponibles

| # | Module | Niveau |
|---|--------|--------|
| 1 | Les Bases | Débutant |
| 2 | Memory & CLAUDE.md | Débutant |
| 3 | Commandes & Raccourcis | Débutant |
| 4 | MCP Servers | Intermédiaire |
| 5 | Settings & Permissions | Intermédiaire |
| 6 | Skills & Sub-agents | Avancé |
| 7 | Hooks & Automation | Avancé |
| 8 | Best Practices | Expert |

## Commandes Claude Code

| Commande | Description |
|----------|-------------|
| `/apprendre` | Commencer une leçon |
| `/quiz` | Tester ses connaissances |
| `/progression` | Voir sa progression |
| `/mise-a-jour` | Nouveautés Claude Code |

## Stack technique

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Vercel (déploiement)

## Ressources

- [Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Documentation Claude Code](https://code.claude.com/docs)

---

**Version** : 2.0 | **Licence** : MIT
