# Module 3 : Commandes & Raccourcis

## 🎯 Objectifs
- Maîtriser les commandes slash
- Connaître tous les raccourcis
- Créer ses propres commandes

---

## 📚 Commandes Intégrées

### Gestion de session

| Commande | Description |
|----------|-------------|
| `/clear` | Réinitialiser le contexte |
| `/compact` | Compresser le contexte |
| `/context` | Voir utilisation tokens |
| `/resume` | Reprendre une session |
| `/cost` | Voir les coûts |

### Configuration

| Commande | Description |
|----------|-------------|
| `/init` | Créer CLAUDE.md |
| `/memory` | Éditer la mémoire |
| `/mcp` | Gérer les serveurs MCP |
| `/model` | Changer de modèle |
| `/config` | Configuration |
| `/permissions` | Gérer permissions |

---

## ⌨️ Raccourcis Clavier

| Raccourci | Action |
|-----------|--------|
| `Entrée` | Envoyer |
| `Shift+Entrée` | Nouvelle ligne |
| `Tab` | Toggle thinking |
| `Shift+Tab` | Changer de mode |
| `Ctrl+C` | Annuler |
| `Esc Esc` | Interrompre/Rewind |
| `Ctrl+R` | Historique |
| `#` | Ajouter à mémoire |
| `@` | Mentionner fichier |

---

## 🔧 Créer ses commandes

### Emplacement
```
~/.claude/commands/      # Global (tous projets)
.claude/commands/        # Projet (partagé équipe)
```

### Structure

```markdown
---
description: Ma commande
allowed-tools: Read, Bash
---

# Instructions

Faire ceci avec $ARGUMENTS
```

---

## 🔗 Documentation
https://code.claude.com/docs/en/slash-commands

---

## ➡️ Prochaine étape
Module 4 : MCP Servers
