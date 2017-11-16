var musicApp = musicApp || {};

/**
 * Defines a service to search music on napster.
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */
musicApp.napsterService = (function($) {
  "use strict";

  var self = {};
  var musicsPromise;

  /**
   * Gets all the music in napster for the specified reasearch query.
   *
   * @param query               Words to look for in the DB of Napster.
   * @param limit               Limit of answers to return.
   * @returns {jquery.promise}  A promise that contains the products list.
   */
  self.researchMusic = function(query, limit) {
    musicsPromise = $.get("https://itunes.apple.com/search?entity=song&attribute=songTerm&term=" + query + "&limit=" + limit);
    return musicsPromise.then(function(musics) {
      var musicsToReturn = getMusicObjectsFromAPIData(musics);
      return musicsToReturn || [];
    });
  };

  /**
   * Makes music object for the database with what is important in the data received from the API.
   *
   * @param dataReceived        The data received from the API
   * @param limit               Limit of answers to return.
   * @returns {JSON}            The list of music objects created.
   */
  function getMusicObjectsFromAPIData (dataReceived) {
    if(dataReceived && dataReceived.meta.returnedCount > 0)
    {
      var musics = [];
      for(var i = 0; i < dataReceived.meta.returnedCount; i++)
      {
        var track = dataReceived.search.data.tracks[i];
        var url = track.previewURL;
        var title = track.name;
        var artist = track.artistName;
        var time = "0:30";

        musics.push({"track": track, "url": url, "title": title, "artist": artist, "time": time});
      }

      return musics;
    }
    else
    {
      return [];
    }
  }

  return self;
})(jQuery);
