var musicApp = musicApp || {};

/**
 * Service for research on the 3 APIs
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */
musicApp.researchService = (function($, napsterService, itunesService, spotifyService) {
  "use strict";

  var self = {};

  /**
   * Does the research on all 3 APIs and returns the result
   *
   * @param query       The query to use with the APIs.
   * @param limit       The limit of answers requested to each API.
   * @returns           A promise with the answer from all 3 APIs.
   */
  self.doResearch = function(query, limit) {
    var napsterPromise = napsterService.researchMusic(query, limit);
    var itunesPromise = itunesService.researchMusic(query, limit);
    var spotifyPromise = spotifyService.researchMusic(query, limit);

    return napsterPromise.then(function(napsterMusics) {
      return itunesPromise.then(function(itunesMusics) {
        return spotifyPromise.then(function(spotifyMusics) {
          return {napster: napsterMusics, itunes: itunesMusics, spotify: spotifyMusics};
        });
      });
    });
  }

  return self;
})(jQuery, musicApp.napsterService, musicApp.itunesService, musicApp.spotifyService);