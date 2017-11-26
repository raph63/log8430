# Guide d'utilisateur pour app web music player TP3
> N.B. Ce guide d'utilisateur est fait pour être lu sur Github ou avec un Markdown Viewer.

## Informations importantes

### Auteurs
Travail soumis par:
* Benjamin Cotton, `1734287`
* Louis-Charles Hamelin, `1742949`
* Raphael Christian-Roy, `1743344`


### Introduction
L’objectif de ce TP3 est de mettre en pratique les connaissances que vous avez acquises lors des cours précédents. Suite au TP2, l’objectif de ce TP est la conception d’une architecture logicielle orientée service migrée à partir de l’architecture logicielle du TP2 précédent. Une étude comparative des deux architectures sera établie et argumentée dans ce TP.

### Objectifs
Afin d’offir plus de maintenabilité et d’interoperabilité du système, un client souhaite migrer l’architecture logicielle étudiee lors du TP2 vers l’architecture orientées services. Le client souhaite favoriser la réeutilisation du code de projet initial et identifier le plus de services réeutilisables tout en maintenant les mêmes requis de l’application du TP2:

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
* Vous pouvez utiliser le code dans cette archive ou encore le downloader et le visionner [sur notre Github](https://github.com/raph63/log8430).

## Fonctionnement WebApp music player TP2
**0.** Avant tout, pour être capable de voir cette app web est [d'installer une extension Chrome sur votre navigateur web](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).
  Cette extension est essentiel car nous n'utilisons pas de serveur pour ce tp. <br>
  Et donc pour faire nos requetes HTTP/ajax, nous devons utiliser cette extension.
> CORS allows web applications on one domain to make cross domain AJAX requests to another domain. It's dead simple to enable, only requiring a single response header to be sent by the server.
> Cross-origin resource sharing - is a mechanism that allows JavaScript on a web page to make XMLHttpRequests to another domain, not the domain the JavaScript originated from.

Une fois installé, et enable, l'icone de l'extension devrait ressembler à ca: <img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/imagesForReadMe/corsExtEnable.png" height="50">
> N.B. Assurez vous que dans l'extension, que dans `intercepted URLs or URL patterns` il y a au moins `*://*/*`.
#### A. Pour faire une recherche de chanson

1. Ouvrir le fichier `Research_Page.html` avec Chrome.

2. Vous devriez arriver sur cette interface de recherche: <br>
<img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/imagesForReadMe/interfaceSearch.png" height="500">

3. Ecrire le titre de la chanson voulue dans le champ de recherche au haut de la page <br>
  Vous remarquerez que la recherche s'effectue sur les 3 système de streaming en ligne simmultanément. Vous devriez arriver à cette partie de l'interface:
<img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/imagesForReadMe/interfaceSearchHello.png" height="500">

> Vous venez donc de complèter une recherche de chanson. Passez au prochaines étapes pour `Ajouter à la playlist` et pour `Faire jouer la chanson`

#### B. Pour faire ajouter une chanson à la playlist
> N.B. pour être capable de faire les étapes suivantes, vous devez avoir fait les étapes de recherche plus haut.

4. À partir de l'interface présenté à l'étape 3, pour ajouter une chanson à la playlist, il faut clicker sur le petit `+` à gauche du titre de la chanson <br>
  Vous devriez être donc rendu avec une interface comme celle-ci et un :ballot_box_with_check: à gauche du titre de la chanson:
<img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/imagesForReadMe/interfaceAjoutPlaylist.png" height="500">

Lorsque vous allez dans l'onglet playlist de l'app, vous devriez maintenant voir la chanson ajoutée plus haut. Comme le présente l'interface ci-dessous: <br>
<img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/imagesForReadMe/interfacePlaylist.png" height="500">

> Vous venez donc de complèter un `Ajout de chanson à la playlist`. Passez au prochaines étapes pour `Faire jouer la chanson`.

#### C. Pour faire jouer la chanson
> N.B. pour être capable de faire les étapes suivantes, vous devez avoir fait les étapes de recherche & d'ajout à la playlist plus haut.

5. Lorsque vous êtes rendu sur l'onglet Playlist et que la chanson voulue y est (comme présenté plus haut), pour faire jouer la chanson, vous n'avez qu'à clicker sur le boutton :arrow_forward: <br>
  Vous devriez être donc rendu avec une interface comme celle-ci:
<img src="https://github.com/raph63/log8430/blob/master/TP2/assets/img/imagesForReadMe/interfacePlayMusic.png" witdh="100%">

Pour faire `stop` à la chanson il suffit que de clicker sur le boutton stop :black_small_square:

#### D. Pour enlever un chanson de la playlist

6. Clicker sur le `x` à droite complètement de la chanson dans l'onglet playlist.


#### Autres fonctionnalités intéressantes

* Dans l'onglet playlist, vous pouvez trier les chansons par titre de chanson.
* Vous remarquerez, qu'avec plusieurs chansons dans la playlist, elles joueront toutes les unes à la suites des autres.








