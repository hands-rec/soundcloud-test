$(function(){
  SC.initialize({
  client_id: Config.client_id,
  });

  $('#btn_search').click(function(e){
    e.preventDefault();
    SC.get('/tracks', { q: $('#keyword').val(), limit: 100}, function(tracks) {
      $('#search_result').empty();
      if (0<tracks.length) {
        $('#search_result').append('<ul>');
        for (var i = 0; i < tracks.length; i++) {
          $('#search_result').find('ul').append('<li>'+tracks[i].title+'&nbsp;<a href="#'+tracks[i].id+'">Show liked users</a></li>');
        };
        $('#search_result').append('</ul>');

        $('#search_result a').click(function(){
          var $aLink = $(this);
          var track_id = $aLink.attr('href').replace('#','');
          SC.get('/tracks/'+track_id+'/favoriters', function(users){
            if (0<users.length) {
              var $li = $aLink.parent();
              $li.append('<ul>');
              for (var i = 0; i < users.length; i++) {
                $li.find('ul').append('<li>'+users[i].username+'</li>');
              };
              $li.append('</ul>')
            }
          });
        });
      }
    });
  });
});
