# Module 5 : Settings & Permissions

## 🎯 Objectifs
- Configurer settings.json
- Gérer les permissions
- Sécuriser son environnement

---

## 📚 Fichiers de configuration

### Hiérarchie (priorité haute → basse)

1. Command-line (flags)
2. `.claude/settings.local.json` (perso)
3. `.claude/settings.json` (équipe)
4. `~/.claude/settings.json` (global)

### Structure

```json
{
  "permissions": {
    "allow": ["Bash(npm run:*)"],
    "deny": ["Read(.env)"],
    "ask": ["Bash(git push:*)"]
  },
  "model": "claude-sonnet-4-5-20250929",
  "sandbox": {
    "enabled": true
  }
}
```

---

## 🔐 Permissions

| Type | Description |
|------|-------------|
| `allow` | Toujours autoriser |
| `deny` | Toujours refuser |
| `ask` | Demander confirmation |

### Patterns courants

```json
{
  "deny": [
    "Read(.env*)",
    "Read(**/secrets/**)",
    "Bash(rm -rf:*)"
  ]
}
```

---

## 🛡️ Sandbox

```json
{
  "sandbox": {
    "enabled": true,
    "excludedCommands": ["git"]
  }
}
```

---

## 🔗 Documentation
https://code.claude.com/docs/en/settings

---

## ➡️ Prochaine étape
Module 6 : Skills & Sub-agents
