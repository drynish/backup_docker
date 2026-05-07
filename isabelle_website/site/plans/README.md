# Plans de mise à jour - Site Isabelle

Ce dossier centralise tous les événements et mises à jour à apporter au site web de services de formation à la conduite.

## Convention de nommage

Les fichiers sont nommés selon un format chronologique :

```
YYYYMMDD_description.md
```

- **YYYYMMDD** : Date de l'événement ou de la mise à jour (ex: 20260120)
- **description** : Titre court en minuscules, underscores pour les espaces (ex: ajouter_cours_fevrier)

### Exemples

- `20260120_ajouter_cours_fevrier.md`
- `20260215_mise_a_jour_horaires.md`
- `20260301_nouveau_moniteur.md`

## Structure d'un fichier événement

Chaque fichier Markdown suit cette structure :

```markdown
# Titre de l'événement

**Date** : YYYY-MM-DD
**Type** : [Cours | Horaires | Mise à jour | Maintenance]
**Statut** : [Planifié | En cours | Complété]

## Description

Détails de l'événement ou de la mise à jour.

## Actions à effectuer

- [ ] Action 1
- [ ] Action 2
- [ ] Action 3

## Notes

Informations supplémentaires, liens, références.
```

## Utilisation

1. **Créer un nouvel événement** : Créez un fichier `YYYYMMDD_description.md` dans ce dossier
2. **Suivre la progression** : Mettez à jour le statut et les cases à cocher au fur et à mesure
3. **Archiver** : Gardez tous les fichiers (historique des mises à jour effectuées)

## Tri chronologique

Les fichiers sont automatiquement triés par date grâce à la convention de nommage YYYYMMDD.
