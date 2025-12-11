# Module 1 : Les Bases de Claude Code

## 🎯 Objectifs
- Comprendre ce qu'est Claude Code
- Connaître les différences avec Claude.ai
- Maîtriser le lancement et l'interface de base

---

## 📚 Théorie

### Qu'est-ce que Claude Code ?

Claude Code est un **outil en ligne de commande (CLI)** qui permet à Claude d'interagir directement avec ton ordinateur :
- Lire et écrire des fichiers
- Exécuter des commandes terminal
- Naviguer dans ton code
- Utiliser des outils externes (MCP)

### Différence avec Claude.ai

| Claude.ai | Claude Code |
|-----------|-------------|
| Interface web | Terminal/CLI |
| Conversation seulement | Actions sur ton PC |
| Pas d'accès fichiers | Lit/écrit tes fichiers |
| Pas de terminal | Exécute des commandes |

### Comment ça marche ?

```
Toi → Claude Code → Claude (API) → Actions sur ton PC
```

---

## 🔧 Pratique

### Lancer Claude Code

```bash
# Lancer dans le dossier courant
claude

# Lancer dans un dossier spécifique
claude /chemin/vers/projet

# Lancer avec une question directe
claude -p "Explique ce projet"
```

### Raccourcis essentiels

| Raccourci | Action |
|-----------|--------|
| `Entrée` | Envoyer le message |
| `Shift+Entrée` | Nouvelle ligne |
| `Ctrl+C` | Annuler |
| `Esc Esc` | Interrompre Claude |
| `Tab` | Activer/désactiver thinking |
| `Shift+Tab` | Plan Mode |

---

## ✅ Quiz

1. Claude Code peut-il modifier des fichiers sur ton PC ?
2. Quelle commande lance Claude Code ?
3. Comment interrompre Claude ?

---

## ➡️ Prochaine étape
Module 2 : Memory & CLAUDE.md
