var musicApp = musicApp || {};

/**
 * Controls the research view.
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */
(function($, napsterService, itunesService, spotifyService, generalMusicService) {
  "use strict";

  /**
   * Updates the 3 tables of the research.
   *
   * @param napsterMusics    List of music objects received from napster API.
   * @param itunesMusics     List of music objects received from itunes API.
   * @param spotifyMusics    List of music objects received from spotify API
   * @private
   */
  function _updateViews(napsterMusics, itunesMusics, spotifyMusics) {
    _updateView("napsterTable", napsterMusics);
    _updateView("itunesTable", itunesMusics);
    _updateView("spotifyTable", spotifyMusics);
  }

    /**
   * Updates the view of one API table
   *
   * @param tableName        The name of the table to modify in the html.
   * @param elementsToAdd    Music objects to add to the table.
   * @private
   */
  function _updateView(tableName, elementsToAdd) {
    var table = $("#" + tableName);
    if(!elementsToAdd || !elementsToAdd.length)
    {
      table.attr("hidden", true);
      table.parent().find("p").attr("hidden", false);
    }
    else
    {
      console.log(elementsToAdd);
      table.attr("hidden", false);
      table.parent().find("p").attr("hidden", true);
      var tableBody = table.find("tbody");
      tableBody.empty();

      elementsToAdd.forEach(function(music) {
        if(generalMusicService.musicInPlaylist(music.url))
        {
          var rowElement = _createMusicElement(music, "fa-check");
          rowElement.find("a").addClass("inPlaylist").removeAttr("href");
        }
        else
        {
          var rowElement = _createMusicElement(music, "fa-plus");

          rowElement.find("a").click(function() {
            $(this).unbind();

            var url = $(this).attr("href");
            var title = $(this).parents("tr").find(".musicTitle").first().text();
            var artist = $(this).parents("tr").find(".musicArtist").first().text();
            var time = $(this).parents("tr").find(".musicTime").first().text();

            var apiTable = $(this).parents("table").attr("id");
            var apiImage = "";
            if(apiTable == "napsterTable")
            {
              apiImage = "napster.png";
            }
            else if (apiTable == "itunesTable")
            {
              apiImage = "ITunes.png";
            }
            else
            {
              apiImage = "spotify.png";
            }

            var music = {"url": url, "title": title, "artist": artist, "time": time, "apiImage": apiImage};
            generalMusicService.addMusicToPlaylist(music);

            $(this).find("i").removeClass().addClass("fa fa-check fa-lg");
            $(this).addClass("inPlaylist").removeAttr("href");

            return false;
          });
        }

        tableBody.append(rowElement);
      });
    }
  }

  /**
   * Creates a music element with a music object.
   *
   * @param music                     The music object to use.
   * @returns {*|jQuery|HTMLElement}  A jQuery element.
   * @private
   */
  function _createMusicElement(music, symbol) {
    return $("<tr>" +
      "<td><a href='" + music.url + "'><i class='fa " + symbol + " fa-lg' aria-hidden='true'></i></a></td>" +
      "<td class='musicTitle'>" + music.title + "</td>" +
      "<td class='musicArtist'>" + music.artist + "</td>" +
      "<td class='musicTime'>" + music.time + "</td>" +
      "</tr>");
  }

  /**
   * Does the research on all 3 APIs and updates the view.
   *
   * @param query       The query to use with the APIs.
   * @param query       The limit of answers requested to each API.
   * @private
   */
  function _doResearch(query, limit) {
    if(query || query != "")
    {
      console.log(query + limit)
      var napsterPromise = napsterService.researchMusic(query, limit);
      var itunesPromise = itunesService.researchMusic(query, limit);
      var spotifyPromise = spotifyService.researchMusic(query, limit);

      napsterPromise.done(function(napsterMusics) {
        itunesPromise.done(function(itunesMusics) {
          spotifyPromise.done(function(spotifyMusics) {
            _updateViews(napsterMusics, itunesMusics, spotifyMusics);
          });
        });
      });
    }
  }

  // Initialize the research view.
  _updateViews();

  // Click actions on the "Enter" key press and the search button
  $("#searchButton").click(function() {
    var query = $("#searchBar").val();
    _doResearch(query, 10);
  });

  $("#searchBar").keyup(function(e) {
    if (e.keyCode == 13)
    {
      var query = $("#searchBar").val();
      _doResearch(query, 10);
    }
  });

})(jQuery, musicApp.napsterService, musicApp.itunesService, musicApp.napsterService, musicApp.generalMusicService);
