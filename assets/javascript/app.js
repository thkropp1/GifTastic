// Initial array of famous people
      var famousPeople = ["James Dean", "Clint Eastwood", "Marilyn Monroe", "Elvis Presley"];

      // displayPeopleInfo function re-renders the HTML to display the appropriate content
      function displayPeopleInfo() {

        var person = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific person button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
           var results = response.data;

           // Deleting the previous person's images prior to adding new images
           // (this is necessary otherwise you will have repeat images from the previous person)
           $("#gifs-appear-here").empty();

           for (var i = 0; i < 10; i++) {
             var gifDiv = $("<div>");

             var rating = results[i].rating; // get ratings

             var p = $("<h4>").text("Rating: " + rating);

             var personImage = $("<img>"); // get image
             personImage.attr("src", results[i].images.fixed_height_still.url);
             console.log("PersonImage-src: " + personImage.attr("src"));

             // Still image
             personImage.attr("data-still", results[i].images.fixed_height_still.url);
             console.log("PersonImage-data-still: " + personImage.attr("data-still"));

             // Animated image
             personImage.attr("data-animate", results[i].images.fixed_height.url);
             console.log("PersonImage-data-animate: " + personImage.attr("data-animate"));

             // Data-state(initial = still)
             personImage.attr("data-state", "still");
             console.log("PersonImage-data-state: " + personImage.attr("data-state"));

             // Class = "gif"
             personImage.addClass("gif");
             console.log("PersonImage-class: " + personImage.attr("class"));
        
             // Append attributes to gifDiv
             gifDiv.append(p);
             gifDiv.append(personImage);
             gifDiv.css('float', 'left'); // display the images horizontally across the page

             // Add the chosen person's images
             $("#gifs-appear-here").prepend(gifDiv);
          }         
        }); 
      } // displayPeopleInfo


      $(document).on("click", ".gif", function() { //if clicking on .gif image

            console.log("I got in gif function!");
            var state = $(this).attr("data-state");

            console.log(this);

            if (state === "still") { // change image to animate if it was still before
              var animated = $(this).attr("data-animate");
              $(this).attr("src", animated);
              $(this).attr("data-state", "animate");

            } else if (state === "animate") { // change image to still if it was animate before
              var still = $(this).attr("data-still");
              $(this).attr("src", still);
              $(this).attr("data-state", "still");
            }   
      }); // .gif



      // Function for displaying people data
      function renderButtons() {

        // Deleting the famousPeople buttons prior to adding new famousPeople
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of famousPeople
        for (var i = 0; i < famousPeople.length; i++) {

          // Then dynamically generate buttons for each person in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button><h4>");
          // Adding a class of person to our button
          a.addClass("person");
          // Adding a data-attribute
          a.attr("data-name", famousPeople[i]);
          // Providing the initial button text
          a.text(famousPeople[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }


      // This function handles events where a person button is clicked
      $("#add-person").on("click", function(event) {

        // This line prevents the page from refreshing when a user hits "enter".
        event.preventDefault(); // 
        
        // This line grabs the input from the textbox
        var person = $("#person-input").val().trim();
        console.log(person);
        // Clear out the current input for the next input
        $("#person-input").empty();
  
        if (person === "") { // If no input and user presses the Submit buton
            alert("Please enter a name.");
        } else if (famousPeople.indexOf(person) === -1) { // If the person has never been added
            // Adding person from the textbox to our famousPeople array
            famousPeople.push(person);
            // Calling renderButtons which handles the processing of our famousPeople array
            renderButtons(); 
        } else {  // If user already entered the same name
            alert("You have already added '" + person +"'. Please try again.");
        }
      });

      // Adding a click event listener to all elements with a class of "person"
      $(document).on("click", ".person", displayPeopleInfo);

      // Calling the renderButtons function to display the initial buttons
      renderButtons();