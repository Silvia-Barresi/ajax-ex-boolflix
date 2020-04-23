
$(document).ready(function(){

  $('button').click(function(){

    var pages = $(".movie");
    pages.html('');

    var movie = $("#search");
    var movieVal = movie.val();

    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie",
        method: "GET",
        dataType: "json",
        data: {
            api_key:"3f6e955ea818a96bae170b72ce85c24d",
            language: "it-IT",
            query: movieVal
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
              original_language: "Lingua: " + flag(movieNow.original_language),
              vote_average: "Media voto: " + star(movieNow.vote_average)
            };

            var html = template(context);
            $("body").append(html);
          }

        },
        error: function(error){
          console.log("Error");
        }

    });

    $.ajax({
        url: "https://api.themoviedb.org/3/search/tv",
        method: "GET",
        dataType: "json",
        data: {
            api_key:"3f6e955ea818a96bae170b72ce85c24d",
            language: "it-IT",
            query: movieVal
          },
        success: function(data){
          console.log(data);

          var source = document.getElementById("movie-template").innerHTML;
          var template = Handlebars.compile(source);

          var series = data.results;

          for (var i = 0; i<series.length; i++ ){

            var seriesNow = series[i]
            context = {
              title: "Titolo: " + seriesNow.name,
              original_title: "Titolo originale: " + seriesNow.original_name,
              original_language: "Lingua: " + flag(seriesNow.original_language),
              vote_average: "Media voto: " + star(seriesNow.vote_average)
            };

            var html = template(context);
            $("body").append(html);

          }

        },
        error: function(error){
          console.log("Error");
        }

    });

          function flag(original_language) {

          var lingue = ['es', 'it', 'en'];
          var flags;

          if (lingue.includes(original_language)) {

            flags = '<img src=" '+ original_language +' .png">';
            return flags;

          } else {
            return original_language;
          }
        };


        function star(vote_average){
          var vote = Math.floor(vote_average / 2);
          console.log(vote);
          var stars = "";
          for (var s = 0; s <5; s++) {
            if (s <= vote){
              stars += '<i class="fas fa-star"></i>';
           }else{
              stars += '<i class="far fa-star"></i>';
          }
        }
        return stars;
      };


  });

});
