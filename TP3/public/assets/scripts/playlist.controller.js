var musicApp = musicApp || {};

/**
 * Controls the playlist view.
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */
(function($, generalMusicService) {
  "use strict";

  var musicPlaying;

  /**
   * Updates the playlist view.
   *
   * @private
   */
  function _updateView() {
    generalMusicService.getPlaylist().then(function(playlist) {
      var table = $("table");
      if(!playlist || !playlist.length)
      {
        table.attr("hidden", true);
        table.parent().find("p").attr("hidden", false);
      }
      else
      {
        table.attr("hidden", false);
        table.parent().find("p").attr("hidden", true);
        var tableBody = table.find("tbody");
        tableBody.empty();

        playlist.forEach(function(music) {
          var rowElement = _createMusicElement(music);
          if(musicPlaying && rowElement.find("a.play").attr("href") == musicPlaying.source)
          {
            rowElement.find("a.play").removeClass().addClass("stop").find("i").removeClass().addClass("fa fa-stop fa-lg");;
          }

          rowElement.find("a.play").click(_playButtonClick);
          rowElement.find("a.stop").click(_stopButtonClick);

          rowElement.find("a.deleteButton").click(function() {
            var rowClicked = $(this).parents("tr");
            generalMusicService.removeMusicFromPlaylist(rowClicked.find("a").first().attr("href")).then(function() {
              if(rowClicked.has("a.stop").length)
              {
                _stopButtonClick();
              }
              _updateView();
            });
          });

          tableBody.append(rowElement);
        });
      }
    });
  }

  /**
   * Action of the play button click.
   *
   * @returns {Boolean}   Returns false to stop propagation of the click.
   * @private
   */
  function _playButtonClick() {
    _play($(this));
    return false;
  }

  /**
   * Stops the music playing at the moment and starts the new one.
   *
   * @param element       The html element of the play button pressed.
   * @private
   */
  function _play(element) {
    if (musicPlaying && !musicPlaying.finish)
    {
      _stopButtonClick();
    }

    musicPlaying = new Sound(element.attr("href"), 100, _nextSong);
    musicPlaying.start();

    element.find("i").removeClass().addClass("fa fa-stop fa-lg");
    element.removeClass("play").addClass("stop");
    element.unbind("click");
    element.click(_stopButtonClick);
  }

  /**
   * Action of the stop button click.
   *
   * @returns {Boolean}   Returns false to stop propagation of the click.
   * @private
   */
  function _stopButtonClick() {
    musicPlaying.remove();
    var stopButton = $("a.stop");
    stopButton.removeClass().addClass("play").find("i").removeClass().addClass("fa fa-play fa-lg");
    stopButton.unbind("click");
    stopButton.click(_playButtonClick);

    return false;
  }

  /**
   * Action to perform when a song is over. Simulate a stop on the current song and a play on the next. If there is no next song, stop playing music.
   *
   * @private
   */
  function _nextSong() {
    var nextSong = $("a.stop").parents("tr").next("tr").find("a.play");
    if(!nextSong.length)
    {
      _stopButtonClick();
    }
    else
    {
      _play(nextSong);
    }
  }

  /**
   * Creates a music element.
   *
   * @param music                     The music object to use.
   * @returns {*|jQuery|HTMLElement}  A jQuery element.
   * @private
   */
  function _createMusicElement(music) {
    return $("<tr>" +
      "<td><a class='play' href='" + music.url + "'><i class='fa fa-play fa-lg' aria-hidden='true'></i></a></td>" +
      "<td><img src='assets/img/" + music.apiImage + "' alt='API Logo' height='30' width='30'></td>" +
      "<td>" + music.title + "</td>" +
      "<td>" + music.artist + "</td>" +
      "<td>" + music.time + "</td>" +
      "<td><a class='deleteButton'><i class='fa fa-times fa-lg' aria-hidden='true'></i></a></td>" +
      "</tr>");
  }

  // Initialize the playlist view.
  _updateView();

})(jQuery, musicApp.generalMusicService);
