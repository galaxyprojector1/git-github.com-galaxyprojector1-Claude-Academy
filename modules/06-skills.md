# Module 6 : Skills & Sub-agents

## 🎯 Objectifs
- Différence Skills vs Commandes
- Créer des Skills
- Configurer des Sub-agents

---

## 📚 Skills vs Commandes

| Aspect | Command | Skill |
|--------|---------|-------|
| Invocation | `/nom` manuel | Automatique |
| Fichier | `commands/nom.md` | `skills/nom/SKILL.md` |
| Déclencheur | L'utilisateur | Claude détecte |

---

## 🔧 Créer un Skill

### Structure

```
.claude/skills/pdf-processing/
├── SKILL.md
└── scripts/
```

### SKILL.md

```yaml
---
name: pdf-processing
description: Traite les PDF. Utiliser quand .pdf mentionné.
allowed-tools: Read, Bash
---

# PDF Processing

## Instructions
1. Lire le PDF
2. Extraire le contenu
3. Retourner résultats
```

---

## 🤖 Sub-agents

### Créer via /agents

```
/agents
```

### Ou fichier `.claude/agents/reviewer.md`

```yaml
---
name: code-reviewer
description: Expert code review
tools: Read, Grep, Glob
model: sonnet
---

Tu es un reviewer senior...
```

### Subagents intégrés

| Agent | Usage |
|-------|-------|
| `Explore` | Explorer codebase (Haiku) |
| `Plan` | Planifier tâches |

---

## 🔗 Documentation
- https://code.claude.com/docs/en/skills
- https://code.claude.com/docs/en/sub-agents

---

## ➡️ Prochaine étape
Module 7 : Hooks & Automation
