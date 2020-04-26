
$(document).ready(function(){

  // inizializzazione template handlebars
  var source = document.getElementById("movie-template").innerHTML;
  var template = Handlebars.compile(source);
  var apiKey = "3f6e955ea818a96bae170b72ce85c24d";


  // sul click del button trovo i film/le serie richieste
  $('button').click(function(){

    // reset pagina
    var pages = $(".movie_container");
    pages.html('');

    // valore input
    var movie = $("#search");
    var movieVal = movie.val();

    // input vuoto al click
    $('input').val('');

    // richiesta film e serie
    ajaxCalling("Film", apiKey, movieVal,"https://api.themoviedb.org/3/search/movie");
    ajaxCalling("Serie", apiKey, movieVal,"https://api.themoviedb.org/3/search/tv");

  });


    // entra il mouse mostro i dettagli del film
    $('body').on('mouseenter','.image', function(){
      $(this).hide();
      $(this).siblings('.display').show();
    });

    // esce il mouse ritorna il poster
    $('body').on("mouseleave", '.display', function () {
      $(this).hide();
      $(this).siblings('.image').show();
    });

    // clicco invio invece del button
    $('.input').keypress(function(enter) {
      if ( enter.which == 13 ) {
      $('button').click();
      }
    });

  // FUNZIONI-------------------------------------------------------------------

  // funzione di output
  function newOutput(objects, type){
    for(var i = 0; i < objects.length; i++){

      var watchNow = objects[i];
      var title, original_title;

      // se è un film
      if (type === "Film"){
        title = watchNow.title;
        original_title = watchNow.original_title;

      // se è una serie
      }else if (type === "Serie"){
        title = watchNow.name;
        original_title = watchNow.original_name;
      };

      // se la trama supera i 300 caratteri, si nasconde dietro le parentesi graffe
      if (watchNow.overview){
          var overview = watchNow.overview.substring (0, 350)+ '[...]';
      };

      // salviamo i dati
      context = {
        title: "Titolo: " + title,
        original_title: "Titolo originale: " + original_title,
        original_language: "Lingua: " + flag(watchNow.original_language),
        vote_average: "Media voto: " + star(watchNow.vote_average),
        overview: "Trama: " + overview,
        poster: posters(watchNow.poster_path),
        ms: type
      };

      // appendiamo tutto in html
      var html = template(context);
      $(".movie_container").append(html);

    };


  };

  // chiamata ajax
  function ajaxCalling (type, apikey, query, url){

    $.ajax({
        url: url,
        method: "GET",
        data: {
            api_key:apikey,
            language: "it-IT",
            query: query
          },
        success: function(data){
          console.log(data);
          var movie = data.results;

          newOutput(movie, type);
        },
        error: function(error){
          console.log("Error");
        }

    });
  };

  // ad ogni lingua la sua bandierina
  function flag(original_language) {
    // bandierine disponibili
    var lingue = ['es', 'it', 'en'];
    var flags;

    // se le bandierine disponibili trovano la lingua corrispondente
    if (lingue.includes(original_language)) {
      // ritorniamo la bandierina
      flags ='<img src="' + original_language + '.png">';
      return flags;
      // altrimenti ci accontentiamo del codice
    } else {
      return original_language;
    }
  };

  // arrotondiamo la media voto e trasformiamola in punti stella
  function star(vote_average){
    // arrotondiamo la media voto con valore massimo 5
    var vote = Math.floor(vote_average / 2);
    var stars = "";

      // facciamo un ciclooooo
      for (var s = 0; s <5; s++) {
        // voto stella piena altrimenti stella vuota
        if (s <= vote){
          stars += '<i class="fas fa-star"></i>';
       }else{
          stars += '<i class="far fa-star"></i>';
      }
    }
    return stars;
  };

  // mostriamo i poster film/serie
  function posters(poster_path){
    var img = "https://image.tmdb.org/t/p/w342" + poster_path;
    if(poster_path === null){
      poster = 'Immagine non disponibile';
    }else{
      poster = '<img src="' + img + '" class="poster active">';
    }
    return poster;
  };

});
