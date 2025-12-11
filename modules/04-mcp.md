# Module 4 : MCP Servers

## 🎯 Objectifs
- Comprendre MCP
- Configurer des serveurs
- Gérer les scopes

---

## 📚 Qu'est-ce que MCP ?

**Model Context Protocol** = connecter Claude à des outils externes.

Exemples : GitHub, Supabase, Perplexity, Vercel, Slack...

### Types de transport

| Type | Description |
|------|-------------|
| `stdio` | Commande locale |
| `http` | API distante |

### Scopes

| Scope | Fichier | Usage |
|-------|---------|-------|
| User | `~/.claude.json` | Tous projets |
| Project | `.mcp.json` | Partagé équipe |
| Local | `settings.local.json` | Perso projet |

---

## 🔧 Pratique

### Ajouter un MCP

```bash
# Global
claude mcp add --scope user github

# Projet
claude mcp add --scope project supabase
```

### Gérer

```bash
/mcp                    # Liste
@github                 # Toggle on/off
claude mcp remove nom   # Supprimer
```

### Configuration manuelle

Dans `~/.claude.json`:
```json
{
  "mcpServers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ton_token"
      }
    }
  }
}
```

---

## ⚡ Optimisation

- Désactiver MCP non utilisés = plus rapide
- `@mcp-name` pour toggle rapidement

---

## 🔗 Documentation
https://code.claude.com/docs/en/mcp

---

## ➡️ Prochaine étape
Module 5 : Settings & Permissions
