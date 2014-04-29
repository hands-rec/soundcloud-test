$(function(){
  SC.initialize({
  client_id: Config.client_id,
  });

  SC.stream("/tracks/293", function(sound){
    sound.play();
  });  
});