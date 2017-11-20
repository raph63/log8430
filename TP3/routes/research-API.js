"use strict";

/**
 * API for research.
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */

 /* ------------------------------ Global variables ------------------------------ */

var express = require("express");
var router = express.Router();
var napsterService = require('./napster.service');
var itunesService = require('./itunes.service');
var spotifyService = require('./spotify.service');

/* ------------------------------ Functions ------------------------------ */

/**
 * Returns the answers of the 3 APIs for a selected query in a JSON. {napster: [], itunes: [], spotify: []}
 *
 * @param req         The request received.
 * @param res         The result to return.
 */
function _getMusics(req, res) {
  if(!req.params.query || req.param.query == "")
  {
    res.sendStatus(400);
  }

  var napsterPromise = napsterService.researchMusic(req.params.query, 10);
  var itunesPromise = itunesService.researchMusic(req.params.query, 10);

  napsterPromise.done(function(napsterMusics) {
    itunesPromise.done(function(itunesMusics) {
      spotifyService.researchMusic(req.params.query, 10, function(spotifyMusics) {
        res.send({napster: napsterMusics, itunes: itunesMusics, spotify: spotifyMusics});
      });
    });
  });
}

/* ------------------------------ Routes ------------------------------ */

router.route("/:query")
  .get(function(req, res) {
    _getMusics(req, res);
  })

module.exports = router;
