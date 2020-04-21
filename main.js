
$(document).ready(function(){

$('button').click(function(){

  var movie = $("#search");
  var movieVal = movie.val();

  $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      dataType: "json",
      data: {
          api_key:"3f6e955ea818a96bae170b72ce85c24d",
          language: "it-IT",
          query: movieVal,
        },
      success: function(data){
        console.log(data);

        var source = document.getElementById("movie-template").innerHTML;
        var template = Handlebars.compile(source);

        var movie = data.results;

        for (var i = 0; i<movie.length; i++ ){

          var movieNow = movie[i]
          context = {
            title: "Titolo: " + movieNow.title,
            original_title: "Titolo originale: " + movieNow.original_title,
            original_language: "Lingua: " + movieNow.original_language,
            vote_average: "Media voto: " + movieNow.vote_average

          };
          var html = template(context);
          $("body").append(html);
        }



      },
      error: function(error){
        console.log("Error");
      }

    });

  });

});
