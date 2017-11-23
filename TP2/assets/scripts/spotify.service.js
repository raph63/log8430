var musicApp = musicApp || {};

/**
 * Defines a service to search music on spotify.
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */
musicApp.spotifyService = (function($) {
  "use strict";

  var self = {};
  var musicsPromise;

  /**
   * Gets all the music in spotify for the specified reasearch query.
   *
   * @param query               Words to look for in the DB of spotify.
   * @param limit               Limit of answers to return.
   * @returns {jquery.promise}  A promise that contains the products list.
   */
  self.researchMusic = function(query, limit) {
    return $.ajax({
      type:'POST',
      dataType: "json",
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      url: "https://accounts.spotify.com/api/token",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic MDZhNjIwYzA2NjYyNGIwMzljOGFhYmJlMDVjMmQxNDA6Njk0NDM5ZmY1NmVjNDhmMGEwMGIxYTlmMWU0ZTlmYTc=");
      },
      data: "grant_type=client_credentials"
    }).then(function(dataReceived) {
      var accesToken = dataReceived.access_token;
      return $.ajax({
        type:'GET',
        dataType: "json",
        url: "https://api.spotify.com/v1/search?type=track&market=US&limit=" + limit*2 + "&q=" + query,
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + accesToken);
        }
      }).then(function(music) {
        var musicsToReturn = _getMusicObjectsFromAPIData(music, limit);
        return musicsToReturn || [];
      })
    })
  };

  /**
   * Makes music object for the database with what is important in the data received from the API.
   *
   * @param dataReceived        The data received from the API
   * @param limit               Limit of answers to return.
   * @returns {JSON}            The list of music objects created.
   */
  function _getMusicObjectsFromAPIData (dataReceived, limit) {
    if(dataReceived && dataReceived.tracks.items.length > 0)
    {
      var musics = [];
      var i =0;
      while(i < dataReceived.tracks.items.length && musics.length < limit)
      {
        var track = dataReceived.tracks.items[i];
        var url = track.preview_url;
        var title = track.name;
        var artist = track.artists[0].name;
        var time = "0:30";

        if(url != null) {
          musics.push({"url": url, "title": title, "artist": artist, "time": time});
        }
        i++;
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
