// ===== Create buttons

var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $name + "&limit=10&api_key=dc6zaTOxFJmzC";
var topics = ["hey arnold", "steven universe", "animaniacs", "adventure time"];
var $newImages = $("<div class='newImageClass'>");
var $name = $(this).attr("data-name");
var search;

function buttonsCreate(){

$.ajax({url: queryURL, method: 'GET'}).done(function(response){

		$("#buttonsDiv").empty();
		
		for (var i = 0; i < topics.length; i++) { // Loop through Topics array
			var button = $("<button class='newButtons'>");
			button.attr("data-name", topics[i]); // Give name attr to button element
			button.text(topics[i]); // Assign text to each button
			$("#buttonsDiv").append(button); // Append buttons to div
			console.log(button.text()); // Log button names, just to check
		} 

	})
}


function imagesCreate(){

$.ajax({url: queryURL, method: 'GET'}).done(function(response){

		var $rating = $(this).attr("value", response.data[0].rating); // Set rating name to that in the API
		var $image = $("<img>").attr("src", response.data[0].images.original.url); // Set image src to that in the API

		$("button").click(function(){
			$("#imagesDiv").append("<p>" + "Rated: " + $rating + "</p>");
			$("#imagesDiv").append($image);
			console.log($rating);
		})
	
	})
}

// ===== Call functions

buttonsCreate();
imagesCreate();
$(document).on('click', '.newButtons', imagesCreate);

