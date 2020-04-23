
$(document).ready(function(){

  var pages = $(".movie");
  var source = document.getElementById("movie-template").innerHTML;
  var template = Handlebars.compile(source);

  $('button').click(function(){


    pages.html('');

    var movie = $("#search");
    var movieVal = movie.val();

      $.ajax({
          url: "https://api.themoviedb.org/3/search/movie",
          method: "GET",
          data: {
              api_key:"3f6e955ea818a96bae170b72ce85c24d",
              language: "it-IT",
              query: movieVal
            },
          success: function(data){
            console.log(data);
            var movie = data.results;

            newOutput(movie, "Film")
          },
          error: function(error){
            console.log("Error");
          }

      });

      $.ajax({
          url: "https://api.themoviedb.org/3/search/tv",
          method: "GET",
          data: {
              api_key:"3f6e955ea818a96bae170b72ce85c24d",
              language: "it-IT",
              query: movieVal
            },
          success: function(data){
            console.log(data);

            var series = data.results;
            newOutput(series, "Serie")

          },
          error: function(error){
            console.log("Error");
          }

      });

    });

    // funzioni-----------------------------------------------------------------

    function newOutput(objects, type){
      for(var i = 0; i < objects.length; i++){

        var watchNow = objects[i];
        var title, original_title;

        if (type === "Film"){

          title = watchNow.title;
          original_title = watchNow.original_title;

        }else if (type === "Serie"){

          title = watchNow.name;
          original_title = watchNow.original_name;
        };


        context = {
          title: "Titolo: " + title,
          original_title: "Titolo originale: " + original_title,
          original_language: "Lingua: " + flag(watchNow.original_language),
          vote_average: "Media voto: " + star(watchNow.vote_average),
          poster: posters(watchNow.poster_path),
          ms: type
        };

        var html = template(context);
        $("body").append(html);

      };
    };


    function flag(original_language) {

      var lingue = ['es', 'it', 'en'];
      var flags;

      if (lingue.includes(original_language)) {

        flags ='<img src="' + original_language + '.png">';
        return flags;

      } else {
        return original_language;
      }
    };


    function star(vote_average){

      var vote = Math.floor(vote_average / 2);
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


      function posters(poster_path){

        var img = "https://image.tmdb.org/t/p/w154" + poster_path;

        if(poster_path === null){
          poster = "No image";
        }else{
          poster = '<img src="' + img + '" class="poster">';
        }
        return poster;

    };





});
