QUnit.test( "generalMusicService tests", function( assert ) {
  // Clear the playlist before testing
  musicApp.generalMusicService.clearPlaylist();

  // generalMusicService.addMusicToPlaylist tests
  musicApp.generalMusicService.addMusicToPlaylist({});
  assert.ok( 0 == musicApp.generalMusicService.getPlaylistLength(), "An empty music object should not be added to the playlist" );

  musicApp.generalMusicService.addMusicToPlaylist({apiImage:"IMAGE", title:"TITLE", artist:"ARTIST", time:"TIME"});
  assert.ok( 0 == musicApp.generalMusicService.getPlaylistLength(), "A music without URL should not be added to the playlist" );

  musicApp.generalMusicService.addMusicToPlaylist({url:"URL", title:"TITLE", artist:"ARTIST", time:"TIME"});
  assert.ok( 0 == musicApp.generalMusicService.getPlaylistLength(), "A music without IMAGE should not be added to the playlist" );

	musicApp.generalMusicService.addMusicToPlaylist({url:"URL", apiImage:"IMAGE", artist:"ARTIST", time:"TIME"});
  assert.ok( 0 == musicApp.generalMusicService.getPlaylistLength(), "A music without TITLE should not be added to the playlist" );

  musicApp.generalMusicService.addMusicToPlaylist({url:"URL", apiImage:"IMAGE", title:"TITLE", time:"TIME"});
  assert.ok( 0 == musicApp.generalMusicService.getPlaylistLength(), "A music without ARTIST should not be added to the playlist" );

  musicApp.generalMusicService.addMusicToPlaylist({url:"URL", apiImage:"IMAGE", title:"TITLE", artist:"ARTIST"});
  assert.ok( 0 == musicApp.generalMusicService.getPlaylistLength(), "A music without TIME should not be added to the playlist" );

  musicApp.generalMusicService.addMusicToPlaylist({url:"URL", apiImage:"IMAGE", title:"TITLE", artist:"ARTIST", time:"TIME"});
  assert.ok( 1 == musicApp.generalMusicService.getPlaylistLength(), "A valid music object should be added to an empty playlist" );

  musicApp.generalMusicService.addMusicToPlaylist({url:"URL", apiImage:"IMAGE2", title:"TITLE2", artist:"ARTIST2", time:"TIME2"});
  assert.ok( 1 == musicApp.generalMusicService.getPlaylistLength(), "A music with the same url as another music should not be added to the playlist" );

  musicApp.generalMusicService.addMusicToPlaylist({url:"URL2", apiImage:"IMAGE", title:"TITLE", artist:"ARTIST", time:"TIME"});
  assert.ok( 2 == musicApp.generalMusicService.getPlaylistLength(), "A valid music object with a different URL should be added to the playlist" );

  // generalMusicService.musicInPlaylist tests
  assert.ok( musicApp.generalMusicService.musicInPlaylist("URL"), "If a music is in the playlist, it should be found by this method" );

  assert.notOk( musicApp.generalMusicService.musicInPlaylist("URL3"), "If a music is not in the playlist, it should not be found by this method" );

  // generalMusicService.getPlaylist tests
  var playlist = musicApp.generalMusicService.getPlaylist("title", 1);
  assert.ok( _.isEqual(playlist[0], {url:"URL", apiImage:"IMAGE", title:"TITLE", artist:"ARTIST", time:"TIME"}), "The playlist should contain the music with url URL" );
  assert.ok( _.isEqual(playlist[1], {url:"URL2", apiImage:"IMAGE", title:"TITLE", artist:"ARTIST", time:"TIME"}), "The playlist should contain the music with url URL2" );

  // generalMusicService.removeMusicFromPlaylist tests
  musicApp.generalMusicService.removeMusicFromPlaylist("URL");
  assert.ok( 1 == musicApp.generalMusicService.getPlaylistLength(), "If a valid URL is provided, the music should be removed from the playlist" );

  musicApp.generalMusicService.removeMusicFromPlaylist("URL");
  assert.ok( 1 == musicApp.generalMusicService.getPlaylistLength(), "If an invalid URL is provided, no music should be removed from the playlist" );

  musicApp.generalMusicService.removeMusicFromPlaylist("URL2");
  assert.ok( 0 == musicApp.generalMusicService.getPlaylistLength(), "If a valid URL is provided, the music should be removed from the playlist, even if the playlist is empty afterwards." );

  musicApp.generalMusicService.clearPlaylist();

  // Sound object test
  var testSound = new Sound("http://www.pacdv.com/sounds/people_sound_effects/crowd-excited.mp3", 100, function() {});

  assert.ok( testSound.start(), "Music is playing" );
  assert.ok( $("audio").length == 1, "Music is in DOM" );

  testSound.remove();
  assert.ok( $("audio").length == 0, "Music is removed" );

  assert.notOk( testSound.start(), "Music can't be started again" );
});

QUnit.test( "napsterService tests", function( assert ) {
  // researchMusic tests
  return musicApp.napsterService.researchMusic("hello", 15).then(function (musicsFound) {
    assert.ok(musicsFound.length == 15, "A research on Napster API should return 10 musics\n" + musicsFound);

    for(var i = 0; i < musicsFound.length; i++)
    {
      var music = musicsFound[i];
      assert.ok(music.url && music.title && music.artist && music.time, "A music returned with Napster API should return a url, an apiImage, a title, an artist and a time : " + i);
    }
  });
});

QUnit.test( "itunesService tests", function( assert ) {
  // researchMusic tests
  return musicApp.itunesService.researchMusic("hello", 15).then(function (musicsFound) {
    assert.ok(musicsFound.length == 15, "A research on ITunes API should return 10 musics\n" + musicsFound);

    for(var i = 0; i < musicsFound.length; i++)
    {
      var music = musicsFound[i];
      assert.ok(music.url && music.title && music.artist && music.time, "A music returned with ITunes API should return a url, an apiImage, a title, an artist and a time : " + i);
    }
  });
});

QUnit.test( "spotifyService tests", function( assert ) {
  // researchMusic tests
  return musicApp.spotifyService.researchMusic("hello", 15).then(function (musicsFound) {
    assert.ok(musicsFound.length == 15, "A research on Spotify API should return 10 musics\n" + musicsFound);

    for(var i = 0; i < musicsFound.length; i++)
    {
      var music = musicsFound[i];
      assert.ok(music.url && music.title && music.artist && music.time, "A music returned with Spotify API should return a url, an apiImage, a title, an artist and a time : " + i);
    }
  });
});