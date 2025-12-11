# Module 7 : Hooks & Automation

## 🎯 Objectifs
- Comprendre les hooks
- Automatiser des actions
- Créer des workflows

---

## 📚 Qu'est-ce qu'un Hook ?

Code qui s'exécute **automatiquement** avant/après une action.

### Types

| Hook | Quand | Peut bloquer |
|------|-------|--------------|
| `PreToolUse` | Avant outil | Oui |
| `PostToolUse` | Après outil | Non |
| `SessionStart` | Début session | Non |

---

## 🔧 Configuration

Dans `settings.json`:

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

## ⚡ Exemples utiles

### Auto-format après édition

```json
{
  "hooks": {
    "PostToolUse": {
      "Edit": "prettier --write"
    }
  }
}
```

### Lint avant commit

```json
{
  "hooks": {
    "PreToolUse": {
      "Bash(git commit:*)": "npm run lint"
    }
  }
}
```

---

## ⚠️ Bonnes pratiques

- Hooks rapides (pas de process longs)
- Gérer les erreurs
- Tester avant production

---

## 🔗 Documentation
https://code.claude.com/docs/en/hooks

---

## ➡️ Prochaine étape
Module 8 : Best Practices
