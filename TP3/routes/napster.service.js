"use strict";

/**
 * Defines a service to search music on napster.
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */
var musicsPromise;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);

module.exports = {
  /**
   * Gets all the music in napster for the specified reasearch query.
   *
   * @param query               Words to look for in the DB of Napster.
   * @param limit               Limit of answers to return.
   * @returns {jquery.promise}  A promise that contains the products list.
   */
  researchMusic: function(query, limit) {
    musicsPromise = $.get("http://api.napster.com/v2.2/search/verbose?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&type=track&query=" + query + "&per_type_limit=" + limit);
    return musicsPromise.then(function(musics) {
      var musicsToReturn = _getMusicObjectsFromAPIData(musics);
      return musicsToReturn || [];
    });
  }
};


/**
 * Makes music object for the database with what is important in the data received from the API.
 *
 * @param dataReceived        The data received from the API
 * @returns {JSON}            The list of music objects created.
 */
function _getMusicObjectsFromAPIData (dataReceived) {
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

      musics.push({"url": url, "title": title, "artist": artist, "time": time});
    }

    return musics;
  }
  else
  {
    return [];
  }
}
