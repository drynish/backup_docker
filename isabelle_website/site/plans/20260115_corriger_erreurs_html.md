# Corriger les erreurs HTML et accessibilité

**Date** : 2026-01-15
**Type** : Maintenance
**Statut** : Planifié

## Description

Validation et correction des erreurs HTML présentes dans `index.html`. Le site utilise Bootstrap 5.3.3 avec plusieurs classes dépréciées et problèmes de structure. Ces corrections amélioreront la validité du code, l'accessibilité et la compatibilité avec les navigateurs.

## Erreurs identifiées

1. **Classes Bootstrap dépréciées** : `mr-2`, `mr-1` → `me-2`, `me-1` (margin-end)
2. **Attribut invalide** : `<div class="navbar-brand" href="#">` (div ne doit pas avoir href)
3. **Structure invalide** : `<div class="row">` sans `.container` parent
4. **Champs sans name** : inputs du formulaire ont `id` mais pas `name` (requis pour sendmail.php)
5. **Classe dépréciée** : `sr-only` → remplacer par `visually-hidden`
6. **Imbrication incorrecte** : section contact à l'intérieur du formulaire

## Actions à effectuer

- [ ] Corriger `mr-2` → `me-2`, `mr-1` → `me-1` (ligne 20-21)
- [ ] Retirer `href="#"` de `<div class="navbar-brand">` (ligne 37)
- [ ] Remplacer `class="sr-only"` par `class="visually-hidden"` (ligne 48)
- [ ] Envelopper `<div class="row">` avec `.container-fluid` parent (ligne 67)
- [ ] Ajouter `name="nom"`, `name="email"`, `name="message"` aux inputs du formulaire
- [ ] Restructurer section contact : sortir du formulaire vers sa propre div
- [ ] Valider avec W3C HTML Validator : https://validator.w3.org/

## Notes

- Fichier cible : ../index.html (ligne 219)
- Bootstrap 5.3.3 : https://getbootstrap.com/docs/5.3/
- Impact : Meilleure accessibilité, validation HTML stricte, compatibilité formulaires
