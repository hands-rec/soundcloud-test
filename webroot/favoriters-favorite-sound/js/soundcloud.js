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
    SC.get('/tracks', { q: $('#keyword').val(), limit: 10}, function(tracks) {
      $('#search_result').empty();
      if (0<tracks.length) {
        $('#search_result').append('<ul>');
        for (var i = 0; i < tracks.length; i++) {
          $('#search_result').find('ul').append('<li>'+tracks[i].title+'&nbsp;<a href="#'+tracks[i].id+'">Show similar sounds</a></li>');
        };
        $('#search_result').append('</ul>');

        $('#search_result a').click(function(){
          var $aLink = $(this);
          var track_id = $aLink.attr('href').replace('#','');
          SC.get('/tracks/'+track_id+'/favoriters', {limit:10 }, function(users){
            var $li = $aLink.parent();
            $li.append('<ul>');
            for (var i = 0; i < users.length; i++) {
              var track_list = [];
              SC.get('/users/'+users[i].id+'/favorites/', {limit:10}, function(tracks){
                for (var i = 0; i < tracks.length; i++) {
                  track_list.push(tracks[i]);
                  $li.find('ul').append('<li>'+ tracks[i].title+'&nbsp;<a href="#'+tracks[i].id+'">Play</a></li>');
                  $li.find('ul a[href="#'+tracks[i].id+'"]').click(function(){
                    var track_no = $(this).attr('href').replace('#','');
                    SC.stream('/tracks/'+track_no, function(sound){
                      soundManager.stopAll();
                      sound.play();
                    });
                  });
                };
              });
            };
            $li.append('</ul>');
          });
        });
      }
    });
  });
}); 