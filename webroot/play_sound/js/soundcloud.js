$(function(){
  SC.initialize({
  client_id: Config.client_id,
  });

  $('#btn_play').click(function(){
    SC.stream("/tracks/293", function(sound){
      sound.play();
      $('#btn_pause').click(function(){
        sound.pause();
      });
    });
  });
});