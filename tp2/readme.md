# Guide d'utilisateur pour app web music player tp2
> N.B. Ce guide d'utilisateur est fait pour être lu sur Github ou avec un Markdown Viewer.

## Informations importantes

### Introduction
L’objectif de ce TP2 est de mettre en pratique les connaissances que vous avez acquises lors des cours précédents. Il s’agit de choisir, de justifier et d’implanter la “meilleure” architecture pour les besoins ci-dessous et d’étudier la qualité du logiciel.

### Objectifs
Un client vous demande de créer un programme qui intègre au moins trois systèmes de streaming de musique, en utilisant les APIs disponibles.

Nous avons choisi les **3 APIs de musique en ligne** suivants:
* Itunes <img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/ITunes.png" height="25">
* Napster <img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/napster.png" height="25">
* Spotify <img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/spotify.png" height="25">

Avec cette app, nous devions remplir **3 requis**:
1. Avoir un outil de recherche de musiques indépendant de système de streaming.
2. Être capable de gérer les listes de reproduction.
3. Reproduire les musiques sélectionnées ou de la liste de reproduction (playlist).

### Requis Préléminaires
* Le navigateur web Google Chrome doit être utiliser afin de faire fonctionner cette app.
* Pour ce TP, nous n'avons pas utilise de serveur (le besoin n'y était pas - le TP3 aura un serveur par contre). <br>
  Et donc, tout au long de ce TP, nous seront directement sur les fichier locaux sur le navigateur web.

## Étapes pour faire fonctionner le TP2
**0.** Avant tout, pour être capable de voir cette app web est [d'installer une extension Chrome sur votre navigateur web](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).
  Cette extension est essentiel car nous n'utilisons pas de serveur pour ce tp. <br>
  Et donc pour faire nos requetes HTTP/ajax, nous devons utiliser cette extension.
> CORS allows web applications on one domain to make cross domain AJAX requests to another domain. It's dead simple to enable, only requiring a single response header to be sent by the server.
> Cross-origin resource sharing - is a mechanism that allows JavaScript on a web page to make XMLHttpRequests to another domain, not the domain the JavaScript originated from.

#### A. Pour faire une recherche de chanson

1. Ouvrir le fichier `Research_Page.html` avec Chrome.

2. Vous devriez arriver sur cette interface: <br>
<img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/imagesForReadMe/interfaceSearch.png" height="25">