# DOCUMENTATION COMPLÈTE CLAUDE CODE

**Compilée depuis la documentation officielle : https://code.claude.com/docs**
**Dernière mise à jour : 2025-12-10**

---

## TABLE DES MATIÈRES

1. Overview & Getting Started
2. Memory Management (CLAUDE.md)
3. Settings & Configuration
4. MCP (Model Context Protocol)
5. Slash Commands
6. Agent Skills
7. Sub-agents
8. Hooks & Automation
9. Common Workflows
10. Costs & Token Management
11. Troubleshooting
12. CLI Reference
13. Interactive Mode
14. Plugins
15. Permissions & IAM

---

## 1. OVERVIEW & GETTING STARTED

### Qu'est-ce que Claude Code ?

Claude Code est l'outil de codage agentique d'Anthropic qui vit dans ton terminal :
- Construire des fonctionnalités à partir de descriptions en anglais/français
- Débugger et corriger automatiquement
- Naviguer dans n'importe quel codebase
- Automatiser les tâches répétitives

### Installation

**Native (Recommandé):**

macOS/Linux/WSL:
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:
```powershell
irm https://claude.ai/install.ps1 | iex
```

NPM (Node.js 18+):
```bash
npm install -g @anthropic-ai/claude-code
```

### Premiers pas

```bash
cd /chemin/vers/projet
claude

> qu'est-ce que ce projet fait ?
> où est le point d'entrée principal ?
> explique la structure des dossiers
```

### Modèles disponibles

- **Sonnet 4.5** (défaut) - Le plus récent
- **Opus 4.5** - Le plus capable pour raisonnement complexe
- **Haiku 4.5** - Rapide, efficace
- **Extended thinking** - Raisonnement profond (Tab pour activer)

---

## 2. MEMORY MANAGEMENT (CLAUDE.md)

### Hiérarchie des fichiers mémoire (priorité)

1. **Enterprise Policy** (`/Library/Application Support/ClaudeCode/CLAUDE.md`)
2. **Project Memory** (`./.claude/CLAUDE.md` ou `./CLAUDE.md`)
3. **Project Rules** (`./.claude/rules/*.md`)
4. **User Memory** (`~/.claude/CLAUDE.md`)
5. **Local Project Memory** (`./CLAUDE.local.md`) - gitignored

### Format CLAUDE.md

```markdown
# Instructions Projet

## Code Style
- TypeScript avec mode strict
- async/await, pas de callbacks
- Indentation 2 espaces

## Commandes
- `npm run dev` - Serveur dev
- `npm run test` - Tests
- `npm run build` - Production
```

### Imports

```markdown
@README pour overview
@docs/architecture.md pour détails
@~/.claude/mes-regles.md pour perso
```

### Règles conditionnelles

Dans `.claude/rules/api-rules.md`:
```markdown
---
paths: src/api/**/*.ts
---

# Règles API
- Valider tous les inputs
- Retourner erreurs structurées
```

### Raccourci rapide

```
# Tape # au début pour ajouter à la mémoire
# Toujours utiliser TypeScript
```

---

## 3. SETTINGS & CONFIGURATION

### Fichiers settings

1. **Enterprise** : `/Library/Application Support/ClaudeCode/managed-settings.json`
2. **Command-line** : Arguments temporaires
3. **Local project** : `./.claude/settings.local.json`
4. **Project** : `./.claude/settings.json`
5. **User** : `~/.claude/settings.json`

### Structure settings.json

```json
{
  "permissions": {
    "allow": ["Bash(npm run:*)"],
    "deny": ["Read(.env)"],
    "ask": ["Bash(git push:*)"]
  },
  "env": {
    "NODE_ENV": "development"
  },
  "model": "claude-sonnet-4-5-20250929",
  "sandbox": {
    "enabled": true
  }
}
```

### Modes de permission

| Mode | Comportement |
|------|--------------|
| `default` | Demande permission |
| `acceptEdits` | Auto-approuve éditions |
| `plan` | Lecture seule |
| `bypassPermissions` | Ignore tout |

---

## 4. MCP (Model Context Protocol)

### Installation MCP

```bash
# HTTP (distant)
claude mcp add --transport http github https://api.github.com/mcp

# stdio (local)
claude mcp add --transport stdio my-tool -- npx my-server
```

### Scopes

```bash
claude mcp add --scope local <name> <url>   # Projet privé
claude mcp add --scope project <name> <url> # Partagé (.mcp.json)
claude mcp add --scope user <name> <url>    # Tous projets
```

### Configuration .mcp.json

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.github.com/mcp/"
    },
    "database": {
      "type": "stdio",
      "command": "python",
      "args": ["server.py"],
      "env": {
        "DB_URL": "${DB_URL:-postgresql://localhost/default}"
      }
    }
  }
}
```

---

## 5. SLASH COMMANDS

### Commandes intégrées essentielles

| Commande | Description |
|----------|-------------|
| `/clear` | Réinitialiser contexte |
| `/compact` | Compresser contexte |
| `/context` | Voir utilisation tokens |
| `/cost` | Voir coûts |
| `/memory` | Éditer CLAUDE.md |
| `/mcp` | Gérer serveurs MCP |
| `/model` | Changer modèle |
| `/help` | Aide |

### Créer commandes personnalisées

Emplacement:
- Projet : `.claude/commands/ma-commande.md`
- Global : `~/.claude/commands/ma-commande.md`

```markdown
---
description: Ma description
allowed-tools: Bash, Read
---

# Instructions

Faire ceci avec $ARGUMENTS
```

---

## 6. AGENT SKILLS

### Différence Skills vs Commands

| Aspect | Command | Skill |
|--------|---------|-------|
| Invocation | `/nom` (manuel) | Automatique |
| Fichier | `commands/nom.md` | `skills/nom/SKILL.md` |

### Créer un Skill

```
.claude/skills/pdf-processing/
├── SKILL.md
└── scripts/
```

```yaml
---
name: pdf-processing
description: Traite les PDF. Utiliser quand fichiers .pdf mentionnés.
allowed-tools: Read, Bash
---

# PDF Processing

## Instructions
...
```

---

## 7. SUB-AGENTS

### Créer un subagent

Via `/agents` ou fichier `.claude/agents/reviewer.md`:

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

- **Plan** : Mode plan, lecture seule
- **Explore** : Exploration rapide (Haiku)
- **General-purpose** : Tâches complexes

---

## 8. HOOKS & AUTOMATION

### Types de hooks

| Event | Quand | Peut bloquer |
|-------|-------|--------------|
| `PreToolUse` | Avant outil | Oui |
| `PostToolUse` | Après outil | Non |
| `SessionStart` | Début session | Non |

### Configuration

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$file_path\""
          }
        ]
      }
    ]
  }
}
```

---

## 9. COMMON WORKFLOWS

### Explorer → Planifier → Coder → Commit

```
1. Explorer : comprendre le code
2. Shift+Tab : Plan Mode
3. Coder : implémenter
4. Committer : vérifier et commit
```

### Git Worktrees (tâches parallèles)

```bash
git worktree add ../feature-a -b feature-a
cd ../feature-a && claude
```

### Références fichiers

```
> Explique @src/utils/auth.js
> Qu'est-ce qu'il y a dans @src/components ?
```

---

## 10. COSTS & TOKEN MANAGEMENT

### Vérifier coûts

```
/cost
```

### Réduire utilisation

```
/compact           # Compresser
/clear            # Réinitialiser
```

### Estimations

- Moyenne : $6/dev/jour
- 90% des users : < $12/jour

---

## 11. TROUBLESHOOTING

### Problèmes courants

**Reset complet:**
```bash
rm ~/.claude.json
rm -rf ~/.claude/
rm -rf .claude/
```

**Performance:**
- Utiliser `/compact`
- Redémarrer entre tâches
- Installer ripgrep système

---

## 12. CLI REFERENCE

### Commandes essentielles

```bash
claude                          # Interactif
claude -p "query"              # Non-interactif
claude -c                      # Continuer session
claude --model opus            # Choisir modèle
claude --permission-mode plan  # Mode plan
claude --debug                 # Debug
```

---

## 13. INTERACTIVE MODE

### Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Ctrl+C` | Annuler |
| `Tab` | Toggle thinking |
| `Shift+Tab` | Toggle mode |
| `Esc Esc` | Rewind |
| `Ctrl+R` | Historique |
| `#` | Ajouter mémoire |
| `@` | Référencer fichier |

### Vim mode

```
/vim
```

---

## 14. PLUGINS

### Structure plugin

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
├── agents/
├── skills/
└── hooks/
```

### Installer plugin

```
/plugin install nom@marketplace
/plugin enable nom
```

---

## 15. PERMISSIONS & IAM

### Configuration permissions

```json
{
  "permissions": {
    "allow": ["Bash(npm run:*)"],
    "deny": ["Read(.env*)", "Bash(rm -rf:*)"],
    "ask": ["Bash(git push:*)"]
  }
}
```

### Patterns

```
Bash(npm run test:*)     # npm run test*
Read(src/**)             # Tout dans src/
mcp__github              # Tous outils GitHub
```

---

## QUICK REFERENCE

### Commandes fréquentes

```bash
claude              # Démarrer
/cost              # Voir coûts
/memory            # Éditer mémoire
/compact           # Compresser
/clear             # Réinitialiser
/help              # Aide
```

### Raccourcis

```
Ctrl+C     Annuler
Tab        Toggle thinking
Shift+Tab  Toggle modes
Esc Esc    Rewind
#          Ajouter mémoire
@          Référencer fichier
```

### Structure fichiers

```
~/.claude/
├── CLAUDE.md
├── settings.json
├── commands/
├── agents/
├── skills/
└── rules/

.claude/
├── CLAUDE.md
├── settings.json
├── commands/
└── rules/
```

---

**Source officielle** : https://code.claude.com/docs
