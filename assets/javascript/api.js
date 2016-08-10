// ===== Create buttons
var topics = ["hey arnold", "steven universe", "animaniacs", "adventure time"];
// store the results of our jquery selectors so we don't have to call them over and over
var $imagesDiv = $("#imagesDiv");
var $buttonsDiv = $("#buttonsDiv");
var $buttonInput = $("#button-input");

//helper function for generating the url for a given topic
function generateUrl(topic){
	var url =  "http://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC";
	return url;
}

function createImage(giphyObj){

	var $image = $("<img>")
					.attr("src", giphyObj.images.fixed_height_still.url)
					.attr("data-state","still")
					.on("click",function(e){
						var $this = $(this);
						if($this.attr("data-state") == "still"){
							$this.attr("src",giphyObj.images.fixed_height.url);
							$this.attr("data-state","animate");
						}
						else {

							$this.attr("src",giphyObj.images.fixed_height_still.url);
							$this.attr("data-state","still");
						}
					});

	return $image;
}

function createButton(topic){
	var $newButton = $("<button>");
	$newButton.attr("name", topic);
	$newButton.text(topic);

	$newButton.on("click",function(e){
		// e.preventDefault();
		$.ajax({url: generateUrl(topic), method: 'GET'}).done(function(response){
			$imagesDiv.empty();
			for(var i = 0,len = response.data.length; i < len; i++){	
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
