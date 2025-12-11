# Module 8 : Best Practices

## 🎯 Objectifs
- Workflows professionnels
- Optimiser performances
- Éviter erreurs courantes

---

## 🏆 Workflows Recommandés

### 1. Explore → Plan → Code → Commit

```
1. Explorer : comprendre le code
2. Shift+Tab : Plan Mode (lecture seule)
3. Coder : implémenter
4. Committer : vérifier puis commit
```

### 2. Test-Driven Development

```
1. Écrire tests d'abord
2. Les faire échouer
3. Claude implémente
4. Tests passent
```

### 3. Tâches parallèles

```bash
git worktree add ../feature-a -b feature-a
cd ../feature-a && claude
```

---

## ⚡ Optimisation

### Contexte

| Action | Commande |
|--------|----------|
| Réinitialiser | `/clear` |
| Compresser | `/compact` |
| Voir usage | `/context` |

### MCP

- Désactiver MCP non utilisés
- `@mcp-name` pour toggle

### CLAUDE.md

- Garder concis (< 50 lignes)
- Utiliser imports `@fichier`
- Organiser avec `.claude/rules/`

---

## ❌ Erreurs à éviter

| Erreur | Solution |
|--------|----------|
| CLAUDE.md trop long | Utiliser rules/ et imports |
| Tous MCP actifs | Désactiver non utilisés |
| Pas de Plan Mode | Shift+Tab pour explorer |
| Secrets dans CLAUDE.md | Utiliser .env et deny |

---

## 🔐 Sécurité

```json
{
  "permissions": {
    "deny": [
      "Read(.env*)",
      "Read(**/secrets/**)"
    ]
  },
  "sandbox": {
    "enabled": true
  }
}
```

---

## 📚 Ressources

| Sujet | Lien |
|-------|------|
| Best Practices | anthropic.com/engineering/claude-code-best-practices |
| Memory | code.claude.com/docs/en/memory |
| MCP | code.claude.com/docs/en/mcp |

---

## 🎉 Félicitations !

Tu as terminé tous les modules !

**Prochaine étape** : Pratique ! Utilise `/mise-a-jour` pour rester à jour.
