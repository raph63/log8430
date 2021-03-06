var musicApp = musicApp || {};

/**
 * Service for all controllers
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */
musicApp.playlistService = (function($) {

  /**
   * Checks if a music is in the playlist.
   *
   * @param music     The music to check.
   * @returns         Boolean saying if the music is in the playlist.             
   */
  self.musicInPlaylist = function(url) {
    return $.get("/api/playlist/" + encodeURIComponent(url)).then(
      function() {
        return true;
      },
      function() {
        return false;
      }
    );
  }

  /**
   * Adds a music to the playlist.
   *
   * @param music     The music to add.          
   */
  self.addMusicToPlaylist = function(music) {
    return $.ajax({
      url: "/api/playlist",
      type: "POST",
      data: JSON.stringify(music),
      contentType: "application/json"
    }); 
  }

  /**
   * Returns the number of music in the playlist.
   *
   * @returns        Number of music in playlist
   */
  self.getPlaylistLength = function() {
    return self.getPlaylist("title", 1).then(function(playlist) {
      return playlist.length;
    });
  }

  /**
   * Removes a music from the playlist.
   *
   * @param url     The url of the music to remove.     
   */
  self.removeMusicFromPlaylist = function(url) {
    return $.ajax({
        url: "/api/playlist/" + encodeURIComponent(url),
        type: "DELETE"
      });
  }

  /**
   * Clears the playlist     
   */
  self.clearPlaylist = function() {
    return $.ajax({
        url: "/api/playlist",
        type: "DELETE"
      });
  }

  /**
   * Returns the playlist in alphabetical order of the title.
   *
   * @returns         The playlist in alphabetical order.             
   */
  self.getPlaylist = function(parameterToSortBy, order) {
    return $.get("/api/playlist?parameterToSortBy=" + parameterToSortBy + "&order=" + order);
  }

  return self;
})(jQuery);

/**
 * Object to play and stop music with source of the music(url), volume (0-100) and callback when music is over
 *
 * @param source      The url of the music to play.
 * @param volume      The volume of the music.
 * @param callback    Function to call when the music is over.
 * @returns           The object created.
 * @see https://stackoverflow.com/questions/11330917/how-to-play-a-mp3-using-javascript
 */
function Sound(source,volume,callback)
{
    this.source=source;
    this.volume=volume;
    var son;
    this.son=son;
    this.finish=false;
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("audio");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autoplay","true");
        document.body.appendChild(this.son);
        this.son.onended = callback;
        return true;
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
}
