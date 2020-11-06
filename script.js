// function createLocationSearched(LocationSearched) {
//   $("#location-list").empty(); //list will load empty upon document loading 
// //declaring a variable for local memory that will take locations searched for and make them an object that will be stored as a list
//   var keys = Object.keys(LocationSearched);
//   for (var i = 0; i < keys.length; i++) {
//     var locationEntry = $("<button>"); //declaring a variable for local memory for city list entry that functions as a button when clicked 
//     locationEntry.addClass("list-group-item list-group-item-action");
//   //declaring a variable for local memory that will lowercase the object entered into local memory 
//     var splitStr = keys[i].toLowerCase().split(" ");
//     //for loop to uppercase any location in the object array that may need it 
//     for (var j = 0; j < splitStr.length; j++) {
//       splitStr[j] =
//         splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
//     }
//   //declaring a variable for local memory that displays the city's with proper capitalization 
//     var titleCasedLocation = splitStr.join(" ");
//    locationEntry.text(titleCasedLocation);
//   //apending the inner html document to list and city that is in the city-list stored in local storeage
//     $("#location-list").append(locationEntry);
//   }
// }
var WindyAPIKey= "OkhKOiAdwFCcdo0j28t9g73szM8dRq0O"

function getWebcam(cityInput) {
  searchHistory(cityInput);
latitude = weather.coord.lat;
longitude = weather.coord.lon;

var queryURL =
"https://api.windy.com/api/webcams/api/webcams/v2/list/nearby={lat},{lng},{radius}" +
name +
"&lat=" +
latitude +
"&lon=" +
longitude;
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(funciton (data) {
    var localWebcam = name(cityInput);

    $("#live-webcam").text("Live Look: ");
    $("#live-webcam").append(localWebcam.text(localWebcam[0].value));
}

// //fetch method that will que URL to 'get' webcam for given location
// $.ajax({
// url: queryURL,
// method: "GET",
// request: {
//   "x-windy-key": "OkhKOiAdwFCcdo0j28t9g73szM8dRq0O"
// //Once we 'get' the data, store the retrieved data inside of an object called "localWebcam"
// }.then(function(localWebcam) {
// console.log(localwebcam);
// //entering a variable into local memory that will display the closest webcam of a searched location
// var localWebcam = $("<button>");
// //append the html document with the data stored in the object localWebcam
// $("#live-webcam").text("Live Look: ");
// $("#live-webcam").append(localWebcam.text(localWebcam[0].value));
// })})
