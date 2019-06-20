var buttons = ["Dogs","Cats","Rabbits","Dragons","Lizards"]

var replace = $("#gif-image")

var gif;

var queryURL = "https://api.giphy.com/v1/gifs/search?q="

var apiKey = "&apikey=mgHf1BPpOOeQP4zSIEy7l7a9bvMqiiXL";

function createButton (){

  $("#buttons").empty();

  for(var i=0; i <buttons.length; i++){

    var createdButton = $("<button>").append(buttons[i]);

    createdButton.addClass("selectedGif");

    createdButton.attr("data-name", buttons[i]);
    
    $("#buttons").append(createdButton);

  }

}

    function addMeme() {
      
      buttons.push(gif);
      
      console.log("this is working");

      createButton();
    }

    $(document).on("click",".animation",function(){
      

        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    

    $("#buttons").on("click",".selectedGif",function(){

      event.preventDefault();

      gif = $(this).attr("data-name");

      console.log(gif);

      var URL2 = queryURL + gif + apiKey;

      $.ajax({

        url: URL2,
  
        method: "GET"
  
      }).then(function(response) {
        
        replace.empty();
  
        for(var i = 0; i<response.data.length; i++){

          var images = $("<img>").attr("src",response.data[i].images.fixed_height_still.url);
  
          images.attr("data-still",response.data[i].images.fixed_height_still.url);

          images.attr("data-animate",response.data[i].images.fixed_height.url)

          images.attr("data-state","still")

          images.addClass("animation");

          $("#gif-image").append(images);
  
        }

      });

    });

  

$("#find-gif").on("click", function(event) {

   event.preventDefault();
   
    gif = $("#gif-input").val();

    var URL = queryURL + gif + apiKey;

    addMeme();

    $.ajax({

      url: URL,

      method: "GET"

    }).then(function(response) {
      
      replace.empty();

      for(var i = 0; i<response.data.length; i++){

        var images = $("<img>").attr("src",response.data[i].images.fixed_height_still.url);
  
          images.attr("data-still",response.data[i].images.fixed_height_still.url);

          images.attr("data-animate",response.data[i].images.fixed_height.url)

          images.attr("data-state","still")

          images.addClass("animation");

          $("#gif-image").append(images);

      }

      search();

      console.log(response);
      
      console.log(response.data[1])

    });

  });

  createButton();
