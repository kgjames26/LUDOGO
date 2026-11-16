# Signal — le catalogue Ludogo

Page unique, installable (PWA), qui réunit les **jeux** et les **applications** de l'éditeur **Ludogo**.
Ouverture animée avec le logo Ludogo, plein écran au premier geste (ou en mode installé), puis deux sections : Jeux et Applications.
Chaque carte a une image principale, jusqu'à trois captures, une description et un bouton pour ouvrir le projet.

Site statique, **sans étape de build** : Vercel sert directement le dossier `public/` (voir `vercel.json`).

## Modifier le catalogue

Tout est dans `public/catalog.js` : nom, version, type, adresse, description, étiquettes et captures de chaque projet.
Les captures sont dans `public/shots/` (WebP 1280×720). La première de la liste est l'image principale.
Après un changement visible, incrémenter `VERSION` dans `public/sw.js` pour que les appareils déjà installés se mettent à jour.

## Fichiers

| Fichier | Rôle |
|---|---|
| `public/index.html`, `home.css`, `home.js` | La page, son style et son comportement |
| `public/catalog.js` | La liste des jeux et applications |
| `public/logo.js`, `logo-ludogo.svg` | Le logo Ludogo (tracés vectoriels dessinés à la main) |
| `public/manifest.webmanifest`, `sw.js`, `icons/` | Installation PWA et mode hors ligne |
| `public/fonts/` | Police Poppins (sous-ensemble latin) |

## Tester en local

```bash
cd public && python3 -m http.server 8200
```
