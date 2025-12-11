---
description: Recherche les dernières nouveautés et mises à jour de Claude Code
allowed-tools: Task, WebFetch, WebSearch, mcp__perplexity__perplexity_search, Edit
---

# Mise à Jour des Connaissances

L'élève veut connaître les dernières nouveautés de Claude Code.

## Ta mission :

### 1. Rechercher les nouveautés

Utilise perplexity ou WebSearch pour trouver :
- Les dernières mises à jour de Claude Code (changelog)
- Les nouvelles fonctionnalités annoncées
- Les changements dans la documentation officielle

Sources prioritaires :
1. https://code.claude.com/docs/
2. https://www.anthropic.com/news
3. https://www.anthropic.com/engineering
4. https://claude.com/blog

### 2. Comparer avec la documentation locale

Vérifie si les fichiers dans `docs/` sont à jour.

### 3. Résumer les nouveautés

Format de réponse :

```
## 🆕 Nouveautés Claude Code

### Dernière version : X.X.X

### Nouvelles fonctionnalités
- [Fonctionnalité 1] : Description
- [Fonctionnalité 2] : Description

### Changements importants
- [Changement 1]
- [Changement 2]

### À mettre à jour dans ta doc locale
- [ ] Fichier X à modifier
- [ ] Nouveau sujet à ajouter

### Sources
- [Lien 1]
- [Lien 2]
```

### 4. Proposer de mettre à jour

Demande à l'élève s'il veut :
- Mettre à jour les fichiers de documentation
- Apprendre les nouvelles fonctionnalités
