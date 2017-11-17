var musicApp = musicApp || {};

/**
 * Service for all controllers
 *
 * @author Benjamin Cotton
 * @author Raphael Christian-Roy
 * @author Louis-Charles Hamelin
 */
musicApp.generalMusicService = (function($) {

  var playlist = [];

  /**
   * Checks if a music is in the playlist.
   *
   * @param music     The music to check.
   * @returns         Boolean saying if the music is in the playlist.             
   */
  self.musicInPlaylist = function(url) {
    return playlist.some(item => item.url === url);
  }

  /**
   * Adds a music to the playlist.
   *
   * @param music     The music to add.          
   */
  self.addMusicToPlaylist = function(music) {
    if(!playlist.some(item => item.url === music.url))
    {
      playlist.push(music);
      _updateLocalStorage();
    }
  }

  /**
   * Removes a music from the playlist.
   *
   * @param url     The url of the music to remove.     
   */
  self.removeMusicFromPlaylist = function(url) {
    if(playlist.some(item => item.url === url))
    {
      var index = playlist.findIndex(item => item.url === url);
      playlist.splice(index, 1);
      _updateLocalStorage();
    }
  }

  /**
   * Returns the playlist in alphabetical order of the title.
   *
   * @returns         The playlist in alphabetical order.             
   */
  self.getPlaylist = function(parameterToSortBy, order) {
    return playlist.sort(function(a, b) {
      var nameA = a[parameterToSortBy].toLowerCase();
      var nameB = b[parameterToSortBy].toLowerCase();
      if (nameA > nameB) {
        return 1 * order;
      } else if (nameA < nameB) {
        return -1 * order;
      }
      return 0;
    });;
  }

  /**
   * Updates the playlist in the local storage.
   *
   * @private
   */
  function _updateLocalStorage() {
    localStorage["playlist"] = JSON.stringify(playlist);
  }

  // Initializes the playlist.
  if (localStorage["playlist"]) {
    playlist = JSON.parse(localStorage["playlist"]);
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
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("audio");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autoplay","true");
        document.body.appendChild(this.son);

        this.son.onended = callback;
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume)
    {
        this.finish=false;
        this.volume=volume;
    }
}
