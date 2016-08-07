// ===== Create buttons

var topics = ["hey arnold", "steven universe", "animaniacs", "adventure time"];
var $name = $(this).attr("data-name");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=dc6zaTOxFJmzC";
var search;

function buttonsCreate(){

$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

		$("#buttonsDiv").empty();
		
		for (var i = 0; i < topics.length; i++) { // Loop through Topics array
			var button = $("<button>");
			button.attr("name", topics[i]); // Give name attr to button element
			button.text(topics[i]); // Assign text to each button
			$("#buttonsDiv").append(button); // Append buttons to div
			console.log(button); // Log buttons, just to check
		}

	})
}


function imagesCreate(){

$.ajax({url: queryURL, method: 'GET'}).done(function(response){

	var rating = response.data[0].rating;
	var image = $("<img>").attr("src", response.data[0].images.original); 
	console.log(image);

	console.log("Rated: " + rating);
	$("#imagesDiv").append("<p>" + "Rated: " + rating + "</p>");
	$("#imagesDiv").append(image);
	
	})
}

// ===== Call functions

buttonsCreate();
imagesCreate();

