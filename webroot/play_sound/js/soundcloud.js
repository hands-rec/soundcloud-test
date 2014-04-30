$(function(){
  SC.initialize({
  client_id: Config.client_id,
  });

  var track_id = '293';
  $('#btn_play').click(function(){
    SC.stream("/tracks/"+track_id, function(sound){
      sound.play();
      $('#btn_pause').click(function(){
        sound.pause();
      });
    });
  });
});