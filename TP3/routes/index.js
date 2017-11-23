"use strict";

/**
 * Routes for the web pages.
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */
 
var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("research", {title: "MusicApp - Research", current: "research"});
});

router.get("/research", function(req, res) {
  res.render("research", {title: "MusicApp - Research", current: "research"});
});

router.get("/playlist", function(req, res) {
  res.render("playlist", {title: "MusicApp - Playlist", current: "playlist"});
});

module.exports = router;
