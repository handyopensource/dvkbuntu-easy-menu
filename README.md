# dvkbuntu easy menu

**Easy menu** est un menu ayant pour but de simplifier l'ensembles des usages classiques d'un ordinateur pour les personnes ayant des difficultés avec l'informatique. 


## Installation

Comme tout logiciel écrit en node js l'installation reste simple, il suffit de cloner ce repo et de saisir la commande :
```
npm install
```
puis pour lancer le programme :
```
npm start
```

***Logiciel requis : NodeJS et NPM***

## Compilation

Dans le cas ou vous souhaitiez compiler votre propre version de easy menu il est possible de le faire via la commandes :
```
npm run dist
```
Cette commande va compiler le programme pour votre OS
- **[windows]**
	- nsis
	- portable
- **[linux]**
	- deb
	- AppImage
	- rpm

## Structure

Actuellement le programme possède une architecture définie

- **[app]**
	- Le dossier app contient tout les élement relatif au renderer
	- **[view]** ce dossier contient les fichiers html css et js nécessaire au fonctionnement
	- **preload.js** contient toutes les fonction executable depuis le renderer.
- **[data]** dossier destiné à contenir tous les fichiers de données json pour les données statique de l'application (.json)
- **[ipcs]** ce dossier contient tous les fichiers relatif aux ipc (permet d'éviter l'encombrement du main.js
	>Tous les fichiers ipc sont appelé dans mainIpc.js et mainIpc.js est appelé dans le fichier main.js ce qui permet une structure de code plus propre et lisible.
- **main.js** coeur de l'application il contient tous les appels et paramètres de l'interface graphique, c'est le fichier exécuté lors du lancement de l'application.
