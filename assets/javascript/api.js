
// Any questions I have are in the comments below on lines 69, 74, 77 and 111. They are preceeded by ***
// Create an array of topics that will be used to fill in the text of my buttons as well as search Giphy's api
var topics = ["hey arnold", "steven universe", "animaniacs", "adventure time"];

// Store the results of our jquery selectors so we don't have to call them over and over
var $imagesDiv = $("#imagesDiv");
var $buttonsDiv = $("#buttonsDiv");
var $buttonInput = $("#button-input");

//Add a function for generating the url for a given topic
function generateUrl(topic){
	var url =  "http://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC";
	return url;
}

// a function that takes in giphyObj that will create the image we want to use
function createImage(giphyObj){
	// Create a variable that creates a new image via jQuery
	var $image = $("<img>")
					// Add an img src that is the url of the still image to be displayed
					.attr("src", giphyObj.images.fixed_height_still.url)
					// Add an img state called "still"
					.attr("data-state","still")
					// Add an event listener that runs when you click the button
					.on("click",function(e){
						// created a variable for '.this' so it doesn't need to be written over and over
						var $this = $(this);
						// if else statement that says if this item is still...
						if($this.attr("data-state") == "still"){
							// ...then change the url to the animated image...
							$this.attr("src",giphyObj.images.fixed_height.url);
							/// ... and then change the state to 'animate' since the animate image is now visible
							$this.attr("data-state","animate");
						}
						// ...otherwise...
						else {
							// ... change the image to be still...
							$this.attr("src",giphyObj.images.fixed_height_still.url);
							// ... and switch the state to be 'still' as well
							$this.attr("data-state","still");
						}
					});
	// return $image so it can be used outside of this function
	return $image;
}


function getRating(giphyObj){
	var rating = $("<p>" + "Rated: " + giphyObj.rating + "</p>");
	return rating;
}

// Create a funciton that creates a new button that takes in 'topic' as an argument
function createButton(topic){
	// Create a variable that is a jQuery object that creates a new button
	var $newButton = $("<button>");
	// Add the attribute 'name' to the button and make the name 'topic'
	$newButton.attr("name", topic);
	// Fill in the body of the button with the text of the topic
	$newButton.text(topic);

	// Add an event listener to the $newButton jQuery object created on line 55
	$newButton.on("click",function(e){
		// Call the ajax method, create an object with the following key/value pairs
		// url as one key and the generateUrl function result as the value
		// method as a second key and 'GET' as the second value
		// Once that is complete, run a function that takes response as an argument
		// *** I'M STILL NOT REALLY SURE HOW LINE 68 REALLY WORKS ***
		$.ajax({url: generateUrl(topic), method: 'GET'}).done(function(response){
			// empty out the imagesDiv so there are not duplicate buttons
			$imagesDiv.empty();
			// A For Loop that increments i so long as it is less than the length of our response
			// *** I DON'T UNDERSTAND WHAT IS OUR RESPONSE ***
			for(var i = 0; i < response.data.length; i++){
				// Append the result of our getRating function to the imagesDiv
				// *** UNABLE TO GET RATINGS FROM FORM IMAGES TO APPEAR
				$imagesDiv.append(getRating(response.data[i]));
				// Append the result of our createImage function to the imagesDiv
				$imagesDiv.append(createImage(response.data[i]));
			}
		});
		// Prevent page from reloading when button is clicked
		return false;
	})
	// Return $newButton so I can use it outside of this function
	return $newButton;
}

// Add a function on the submit button
$("#imagesForm").submit(function(e){
	// When submitted, take the input value and create a new variable called newTopic
	var newTopic = $buttonInput.val();
	// Create a new variable called button that returns the result of the createButton function with newTopic as an argument
	var button = createButton(newTopic);
	// Append the new button to the buttonsDiv
	$buttonsDiv.append(button);
	// Prevent page from reloading when button is clicked
	return false;	
});

// This function creates the initial buttons from the topics array
function generateInitialButtons(){
	// For Loop that increments so long as i is less than the length of my array
	for(var i = 0; i < topics.length; i++){
		// append the the results of the createButtons function with an argument of topics to the buttonsDiv
		$buttonsDiv.append(createButton(topics[i]));
	}
}
// Call the generateInitialButtons function
// *** WHEN DOES ONE NEED TO NOT CALL A FUNCTION? I DIDN'T CALL ANY OF THE OTHERS ***
generateInitialButtons();
