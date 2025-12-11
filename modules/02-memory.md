# Module 2 : Memory & CLAUDE.md

## 🎯 Objectifs
- Comprendre le système de mémoire
- Créer et utiliser CLAUDE.md
- Maîtriser la hiérarchie des fichiers

---

## 📚 Théorie

### Types de fichiers mémoire

| Fichier | Emplacement | Usage |
|---------|-------------|-------|
| `CLAUDE.md` | Racine projet | Instructions partagées |
| `CLAUDE.local.md` | Racine projet | Instructions perso |
| `~/.claude/CLAUDE.md` | Home | Instructions globales |
| `.claude/rules/*.md` | Projet | Règles modulaires |

### Hiérarchie (priorité haute → basse)

```
CLAUDE.local.md → CLAUDE.md → rules/ → ~/.claude/CLAUDE.md
```

### Exemple de CLAUDE.md

```markdown
# Mon Projet

## Préférences
- Langue : Français
- Style : Concis

## Commandes
- npm run dev : Développement
- npm run build : Production
```

---

## 🔧 Pratique

### Commandes utiles

```bash
/init          # Créer CLAUDE.md
/memory        # Éditer la mémoire
#ma note       # Ajouter rapidement une note
```

### Imports

```markdown
@docs/architecture.md
@.claude/rules/style.md
```

---

## 🔗 Documentation
https://code.claude.com/docs/en/memory

---

## ➡️ Prochaine étape
Module 3 : Commandes & Raccourcis
