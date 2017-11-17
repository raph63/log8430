"use strict";

/**
 * API for playlist management.
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */

/* ------------------------------ Global variables ------------------------------ */

var express = require("express");
var router = express.Router();

/* ------------------------------ Functions ------------------------------ */

/**
 * Returns all the musics in the playlist linked to this session.
 *
 * @param req         The request received.
 * @param res         The result to return.
 */
function getPlaylist(req, res) {
  var playlist = req.session.playlist;
  if(playlist) {
  	playlist = playlist.sort(function(a, b) {
      var nameA = a[req.query.parameterToSortBy].toLowerCase();
      var nameB = b[req.query.parameterToSortBy].toLowerCase();
      if (nameA > nameB) {
        return 1 * parseInt(req.query.order);
      } else if (nameA < nameB) {
        return -1 * parseInt(req.query.order);
      }
      return 0;
  	});
  }

  res.send(playlist || []);
}

/**
 * Adds the music specified to the playlist.
 *
 * @param req         The request received.
 * @param res         The result to return.
 */
function addMusicToPlaylist(req, res) {
  var playlist = req.session.playlist;
  if(!playlist)
  {
    req.session.playlist = [];
    playlist = req.session.playlist;
  }

  var musicAdded = req.body;
  var musicInPlaylist = playlist.find(o => o.url == musicAdded.url);
  if(!musicInPlaylist && musicAdded.url && musicAdded.apiImage && musicAdded.title && musicAdded.artist && musicAdded.time)
  {
    playlist.push(musicAdded);
    res.sendStatus(201);
  }
  else
  {
    res.sendStatus(400);
  }
}

/**
 * Deletes all the playlist
 *
 * @param req         The request received.
 * @param res         The result to return.
 */
function deleteAllMusicsFromPlaylist(req, res) {
  req.session.playlist = [];
  res.sendStatus(204);
}

/**
 * Returns the specified music from the playlist (if it exists)
 *
 * @param req         The request received.
 * @param res         The result to return.
 */
function getMusic(req, res) {
  var playlist = req.session.playlist;
  var musicInPlaylist;
  if (playlist)
  {
    musicInPlaylist = playlist.find(o => o.url == req.params.url);
  }

  if (musicInPlaylist)
  {
    res.send(musicInPlaylist);
  }
  else
  {
    res.sendStatus(404);
  }
}

/**
 * Delete the specified music from the playlist (if it exists).
 *
 * @param req         The request received.
 * @param res         The result to return.
 */
function deleteMusicFromPlaylist(req, res) {
  var playlist = req.session.playlist;
  var musicInPlaylist;
  if (playlist)
  {
    musicInPlaylist = playlist.find(o => o.url == req.params.url);
  }

  if (musicInPlaylist)
  {
    var index = playlist.indexOf(musicInPlaylist);
    playlist.splice(index, 1);
    res.sendStatus(204);
  }
  else
  {
    res.sendStatus(404);
  }
}

/* ------------------------------ Routes ------------------------------ */

router.route("/")
  .get(function(req, res) {
    getPlaylist(req, res);
  })
  .post(function(req, res) {
    addMusicToPlaylist(req, res);
  })
  .delete(function(req, res) {
    deleteAllMusicsFromPlaylist(req, res);
  })

router.route("/:url")
.get(function(req, res) {
    getMusic(req, res);
  })
  .delete(function(req, res) {
    deleteMusicFromPlaylist(req, res);
  })

module.exports = router;
