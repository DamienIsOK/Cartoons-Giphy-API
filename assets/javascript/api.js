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

// Craete a funciton that creates a new button that takes in 'topic' as an argument
function createButton(topic){
	// Create a variable that is a jQuery object that creates a new button
	var $newButton = $("<button>");
	// Add the attribute 'name' to the button and make the name 'topic'
	$newButton.attr("name", topic);
	// Fill in the body of the button with the text of the topic
	$newButton.text(topic);

	$newButton.on("click",function(e){
		// e.preventDefault();
		$.ajax({url: generateUrl(topic), method: 'GET'}).done(function(response){
			$imagesDiv.empty();
			for(var i = 0,len = response.data.length; i < len; i++){	
				$imagesDiv.append(getRating(response.data[i]));
				$imagesDiv.append(createImage(response.data[i]));
			}
		});
		return false;
	})

	return $newButton;
}

$("#imagesForm").submit(function(e){
	// e.preventDefault();
	var newTopic = $buttonInput.val();
	var button = createButton(newTopic);
	$buttonsDiv.append(button);
	return false;	
});

function generateInitialButtons(){
	for(var i = 0, len = topics.length; i < len; i++){
		$buttonsDiv.append(createButton(topics[i]));
	}
}

generateInitialButtons();
