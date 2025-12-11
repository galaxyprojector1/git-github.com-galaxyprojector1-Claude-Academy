---
description: Affiche ta progression dans l'apprentissage de Claude Code
---

# Suivi de Progression

Lis le fichier `progression.json` à la racine du projet et affiche la progression de l'élève.

## Instructions pour Claude

1. Lis `progression.json`
2. Affiche le tableau avec les vrais statuts :
   - `a_faire` → ⬜ À faire
   - `en_cours` → 🔄 En cours
   - `complete` → ✅ Complété

3. Calcule le niveau actuel :
   - 0-2 modules : Débutant
   - 3-4 modules : Intermédiaire
   - 5-6 modules : Avancé
   - 7-8 modules : Expert

## Format d'affichage :

```
╔═══════════════════════════════════════════════════════════════╗
║              📊 TA PROGRESSION CLAUDE CODE                    ║
╚═══════════════════════════════════════════════════════════════╝

Élève : [nom] | Début : [date] | Niveau : [niveau]

## Modules

| # | Module | Status | Quiz |
|---|--------|--------|------|
| 1 | Les Bases | [status] | [score ou -] |
| ... | ... | ... | ... |

Légende : ✅ Complété | 🔄 En cours | ⬜ À faire

## Statistiques

- Modules complétés : X/8
- Quiz réussis : X
- Dernière session : [date]

## Prochaine étape recommandée

→ [Prochain module à faire ou en cours]

Tape `/apprendre X` pour continuer !
```

## Après affichage

Propose à l'élève de :
- Continuer le module en cours
- Commencer le prochain module
- Refaire un quiz
