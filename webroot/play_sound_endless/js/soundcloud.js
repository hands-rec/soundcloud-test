$(function(){
  SC.initialize({
  client_id: Config.client_id,
  });

  var $player = $("#player");
  $player.find("#stop").click(function(e) {
    e.preventDefault();
    soundManager.stopAll();
  });

  $('#btn_search').click(function(e){
    e.preventDefault();
    SC.get('/tracks', { q: $('#keyword').val()}, function(tracks) {
      $('#search_result').empty();
      if (0<tracks.length) {
        $('#search_result').append('<ul>');
        for (var i = 0; i < tracks.length; i++) {
          $('#search_result').find('ul').append('<li>'+tracks[i].title+'&nbsp;<a href="#'+tracks[i].id+'">Play</a></li>');
        };
        $('#search_result').append('</ul>');

        $('#search_result a').click(function(){
          var track_no = $(this).attr('href').replace('#','');
          SC.stream('/tracks/'+track_no, 
            {
              onfinish : function (){
                alert('finish');
              }
            }, function(sound){
            soundManager.stopAll();
            sound.play();
          });
        });
      }
    });
  });
}); 