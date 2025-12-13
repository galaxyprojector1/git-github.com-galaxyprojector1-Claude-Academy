# Contexte Actuel de Claude Academy

> Ce fichier résume le contenu existant pour référence rapide.
> Mis à jour : 2025-12-13

## Modules Existants (8 total)

### Module 1 - Les Bases (Débutant)
**Contenu** : Qu'est-ce que Claude Code, différences avec Claude.ai, lancer Claude, raccourcis essentiels
**Quiz** : 3 questions (différence CLI/web, commande lancement, interrompre Claude)
**Termes utilisés** : cli, terminal, mcp

### Module 2 - Memory & CLAUDE.md (Débutant)
**Contenu** : Fichiers mémoire, hiérarchie priorité, CLAUDE.local.md, imports @, commandes /init /memory
**Quiz** : 3 questions (priorité fichiers, ajout note #, commande /init)
**Termes utilisés** : markdown, claude-md, claude-local-md, gitignore

### Module 3 - Commandes & Raccourcis (Débutant)
**Contenu** : Slash commands (/clear, /compact, /context), raccourcis clavier, commandes custom
**Quiz** : 3 questions (/compact, emplacement commands global, Tab)
**Termes utilisés** : clear, compact, tokens, slash-commands

### Module 4 - MCP Servers (Intermédiaire)
**Contenu** : Protocol MCP, types transport (stdio/http), scopes (user/project/local), config manuelle
**Quiz** : 3 questions (signification MCP, scope global, toggle @)
**Termes utilisés** : mcp-protocol, stdio, http-transport, scope-user

### Module 5 - Settings & Permissions (Intermédiaire)
**Contenu** : Hiérarchie settings, permissions allow/deny/ask, patterns sécurité, sandbox
**Quiz** : 3 questions (deny, priorité settings.local, fichiers .env)
**Termes utilisés** : permissions, sandbox, allow-deny-ask

### Module 6 - Skills & Sub-agents (Avancé)
**Contenu** : Skills vs Commandes, structure SKILL.md, sub-agents, agents intégrés (Explore, Plan)
**Quiz** : 3 questions (différence skill/command, emplacement SKILL.md, Explore agent)
**Termes utilisés** : skills, subagents, explore-agent, haiku-model

### Module 7 - Hooks & Automation (Avancé)
**Contenu** : Types hooks (Pre/PostToolUse, SessionStart), configuration, exemples (prettier, lint)
**Quiz** : 3 questions (PreToolUse bloque, PostToolUse pour format, hooks rapides)
**Termes utilisés** : hooks, pre-tool-use, post-tool-use, matcher

### Module 8 - Best Practices (Expert)
**Contenu** : Workflow EPCC, TDD, git worktrees, gestion contexte, optimisation, sécurité
**Quiz** : 3 questions (workflow EPCC, CLAUDE.md concis, worktrees)
**Termes utilisés** : worktrees, context-management, compact

---

## Glossaire - Termes Existants (45 entrées)

### Module 1 - Bases
`cli`, `terminal`, `mcp`, `thinking-mode`, `plan-mode`, `extended-thinking`, `sonnet`, `opus`, `haiku`

### Module 2 - Memory
`claude-md`, `claude-local-md`, `markdown`, `gitignore`, `imports-at`, `rules`, `memory-hierarchy`

### Module 3 - Commandes
`slash-commands`, `compact`, `clear`, `context`, `tokens`, `custom-commands`, `arguments`

### Module 4 - MCP
`mcp-protocol`, `stdio`, `http-transport`, `scope-user`, `scope-project`, `mcp-servers`

### Module 5 - Settings
`permissions`, `sandbox`, `allow-deny-ask`, `settings-json`, `enterprise-policy`

### Module 6 - Skills
`skills`, `skill-vs-command`, `subagents`, `explore-agent`, `plan-agent`, `haiku-model`

### Module 7 - Hooks
`hooks`, `pre-tool-use`, `post-tool-use`, `session-start`, `matcher`, `automation`

### Module 8 - Best Practices
`worktrees`, `context-management`, `tdd`, `workflow-epcc`

### Termes Généraux (Bonus)
`agent`, `codebase`, `debugging`, `refactoring`, `api`, `version-control`

---

## Stats Actuelles

- **Modules** : 8 complets
- **Questions quiz** : 24 (3 par module)
- **Termes glossaire** : 45+
- **Composants React** : 5 (App, ModuleCard, LessonView, QuizView, ContentRenderer, Icon)

## Idées d'Amélioration (Backlog)

- [ ] Mode sombre
- [ ] Export progression PDF
- [ ] Recherche dans le glossaire
- [ ] Animations entre modules
- [ ] Badge de complétion
- [ ] Timer pour les quiz
