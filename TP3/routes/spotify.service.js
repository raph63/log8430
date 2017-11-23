"use strict";

/**
 * Defines a service to search music on spotify.
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
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
  /**
   * Gets all the music in spotify for the specified reasearch query.
   *
   * @param query               Words to look for in the DB of Spotify.
   * @param limit               Limit of answers to return.
   * @param callback            Fonction to callback when all the music has been found.
   * @returns {jquery.promise}  A promise that contains the products list.
   */
  researchMusic: function(query, limit, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://accounts.spotify.com/api/token", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.setRequestHeader("Authorization", "Basic MDZhNjIwYzA2NjYyNGIwMzljOGFhYmJlMDVjMmQxNDA6Njk0NDM5ZmY1NmVjNDhmMGEwMGIxYTlmMWU0ZTlmYTc=");
    xhr.onload = function() {
      var responseText = xhr.responseText;
      var accesToken = JSON.parse(responseText).access_token;
      $.ajax({
        type:'GET',
        dataType: "json",
        url: "https://api.spotify.com/v1/search?type=track&market=US&limit=" + limit*2 + "&q=" + query,
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + accesToken);
        }
      }).then(function(music) {
        callback(_getMusicObjectsFromAPIData(music, limit));
      })
    };

    xhr.send("grant_type=client_credentials");
  }
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
