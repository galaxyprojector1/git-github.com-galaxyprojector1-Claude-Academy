---
description: Quiz interactif pour tester tes connaissances Claude Code
---

# Quiz Claude Code

L'élève veut tester ses connaissances.

## Instructions :

### 1. Demander le sujet

"Sur quel sujet veux-tu être testé ?"
- Les bases
- Memory & CLAUDE.md
- Commandes
- MCP
- Settings
- Skills
- Hooks
- Tout (quiz général)

### 2. Générer le quiz

Crée 5 questions adaptées au niveau de l'élève :

**Format des questions :**

```
### Question X/5

[Question]

A) Option A
B) Option B
C) Option C
D) Option D

Ta réponse ?
```

### 3. Types de questions variées

- QCM (choix multiple)
- Vrai/Faux
- Compléter le code
- "Que fait cette commande ?"
- "Comment ferais-tu pour... ?"

### 4. Correction

Après chaque réponse :
- ✅ Correct ! [Explication courte]
- ❌ Pas tout à fait. La bonne réponse est... [Explication]

### 5. Score final

```
## 🏆 Résultat

Score : X/5

[Message personnalisé selon le score]

### Points à revoir :
- [Sujet 1 si erreur]
- [Sujet 2 si erreur]

Tu veux refaire un quiz ou apprendre un sujet ?
```

Sujet du quiz : $ARGUMENTS
