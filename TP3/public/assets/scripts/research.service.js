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
  self.doResearch = function(query) {
    return $.get("http://localhost:8000/api/research/" + query).then(
      function(results) {
        return results;
      },
      function() {
        throw new Error("Error with music API.");
      }
    );
  }

  return self;
})(jQuery, musicApp.napsterService, musicApp.itunesService, musicApp.spotifyService);