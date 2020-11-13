//VARIABLE DECLARATION
//DECLARE VARIABLES IN JAVASCRIPT TO LINK TO THE HTML
var cityInput = document.getElementById("city-value");
var clearCity = document.getElementById("clear-history");
var searchBtn = document.getElementById("search-button");
var cityName = document.getElementById("city-name");
var cityPic = document.getElementById("current-pic");
var cityTemp = document.getElementById("city-temperature");
var cityHumidity = document.getElementById("city-humidity");
var cityWindSpeed = document.getElementById("city-windspeed");
var cityUV = document.getElementById("city-UV");
var cityHistory = document.getElementById("history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var APIKey = "11cc6738fb7101f2239490031655308f";
var APIKey2 = "OkhKOiAdwFCcdo0j28t9g73szM8dRq0O";
var video = document.getElementById("live-webcam");
var webcamImage = document.getElementById("webcam-image");
var webcamCityName = document.getElementById("webcam-city-name");
var webcamLocationName = document.getElementById("webcam-location-name");

//FUNCTION DECLARATION
//FUNCTION TO REACH OPENWEATHER API
function getWeather(name) {
  //USES CONCATINATION TO PULL THE USER'S SEARCHED CITY ALONG WITH THE API KEY
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=" +
    APIKey;

  //FETCH THE API URL AND RETURNS THE RESPONSE IN JSON FORM
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentDate = new Date(data.dt * 1000);

      //GETS THE WEATHER RETURN OBJECT TO GRAB THE CURREN DAY, MONTH, YEAR
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();

      //ADDED THE DATE RECEIVED TO THE LINK HTML THROUGH THE JAVASCRIPT VARIABLE
      cityName.textContent =
        data.name + "    " + (month + "/" + day + "/" + year);

      //SETS THE ATTRIBUTE OF THE CITY NAME TO A BOLDED FONT
      cityName.setAttribute("class", "font-weight-bold");

      //GRAB WEATHER ICON FROM THE RETURNED API OBJECT
      var weatherImage = data.weather[0].icon;

      //SETS THE ATTIBUTE OF THE CITY PICTURE WITH THE LINK AND THE WEATHER IMAGE VARIABLE
      cityPic.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherImage + "@2x.png"
      );

      //ADDS THE ATTRIBUTE WITH AN ALT FOR SCREEN READERS
      cityPic.setAttribute("alt", data.weather[0].description);

      //ADDED THE TEMPERATURE, HUMIDITY AND WINDSPEED TO THE HTML
      cityTemp.textContent = "Temperature: " + convert(data.main.temp) + " F";
      cityHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      cityWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " M.P.H";

      //VARIBLES TO LINK TO THE LATITUDE AND LONGITUDE FOR THE RETURNED OBJECT FROM THE WEATHER API
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;

      //ASSIGNS THE API URL WITH THE LATITUDE, LONGITUDE AND APIKEY
      var UVUrl =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIKey +
        "&cnt=1";

      //FETCHERS THE UV URL
      fetch(UVUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //CREATES A NEW ELEMENT FOR THE UV INDEX ELEMENT
          var UVIndex = document.createElement("span");

          UVIndex.textContent = data[0].value;

          //CREATES A FOR LOOP THAT WILL SET THE ATTIBUTE OF THE UV ELEMENT DEPENDING ON THE VALUE OF THE RETURNED INDEX
          if (data[0].value > 8) {
            cityUV.textContent = "UV Index: ";
            cityUV.setAttribute("class", "badge badge-danger");
            cityUV.append(UVIndex);
          } else if (5 < data[0].value < 8) {
            cityUV.textContent = "UV Index: ";
            cityUV.setAttribute("class", "badge badge-warning");
            cityUV.append(UVIndex);
          } else if (data[0].value < 5) {
            cityUV.textContent = "UV Index: ";
            cityUV.setAttribute("class", "badge badge-primary");
            cityUV.append(UVIndex);
          }
        });

      //STORESE THE CITY DATA AND USES IT TO STORE IN THE FORECAST URL
      var cityIdValue = data.id;
      var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityIdValue +
        "&appid=" +
        APIKey;

      //FETCHES THE FORECARE URL AND RETURNS THE OBJECT IN JSON
      fetch(forecastURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //STORES ATTACHED ELEMENTS TO A VARIABLE IN JAVASCRIPT
          var forecastElements = document.getElementsByClassName("forecast");

          //CREATES A FOR TO CREATE A NEW ELEMENT FOR EACH RETURNED DATE IN THE FORECAST
          for (let index = 0; index < forecastElements.length; index++) {
            forecastElements[index].textContent = "";

            var forecastIndex = index * 8 + 4;

            var foreCastDate = new Date(data.list[forecastIndex].dt * 1000);
            console.log(foreCastDate);
            var foreCastDay = foreCastDate.getDate();
            var foreCastMonth = foreCastDate.getMonth() + 1;
            var foreCastYear = foreCastDate.getFullYear();
            var addForecastDate = document.createElement("p");
            addForecastDate.setAttribute("class", "mt-3 mb-0 forecast-date");
            addForecastDate.textContent =
              foreCastMonth + "/" + foreCastDay + "/" + foreCastYear;
            forecastElements[index].append(foreCastDate);

            //CREATS THE WEATHER IMAGE TO LINK TO THE WEATHER ICON FROM THE RETURNED OBJECT FROM THE API
            var forecastWeatherImage = document.createElement("img");

            //SETS THE IMAGE WITH THE ATTIRBUTE OF THE LINKED OPENWEATHER API LINK
            forecastWeatherImage.setAttribute(
              "src",
              "https://openweathermap.org/img/wn/" +
                data.list[forecastIndex].weather[0].icon +
                "@2x.png"
            );

            //APPENDS THE WEATHER IMAGE TO THE HTML
            forecastElements[index].append(forecastWeatherImage);

            //CREATES A NEW H4 TAG FOR THE TEMPERATURE OF THE FIVE DAY FORECAST
            var forecastTemp = document.createElement("h4");
            forecastTemp.textContent =
              "Temperature: " +
              convert(data.list[forecastIndex].main.temp) +
              " F";
            forecastElements[index].append(forecastTemp);

            //CREATES A NEW PARAGRAPH TAG FOR THE HUMIDITY PARAGRAPH
            var forecastHumidity = document.createElement("p");
            forecastHumidity.textContent =
              "Humidity: " + data.list[forecastIndex].main.humidity + "%";
            forecastElements[index].append(forecastHumidity);
          }
        });
    });
}

function webcam(name) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=" +
    APIKey;

  var requestKey =
    "https://api.windy.com/api/webcams/v2/api/webcams/v2/" +
    +"?key=your_API_key" +
    APIKey2;
  //fetch request to get the data from the windy server and return the data in json form
  fetch(requestKey);

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.coord.lat;
      var long = data.coord.lon;

      var queryURL = `https://api.windy.com/api/webcams/v2/list/nearby=${lat},${long},20?show=webcams:location,image`;
      //Added headers: with the api and content-type
      fetch(queryURL, {
        headers: {
          "x-windy-key": "OkhKOiAdwFCcdo0j28t9g73szM8dRq0O",
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          webcamImage.setAttribute(
            "src",
            data.result.webcams[0].image.current.preview
          );
          webcamCityName.textContent =
            data.result.webcams[0].location.city +
            ", " +
            data.result.webcams[0].location.country;

          webcamLocationName.textContent = data.result.webcams[0].title;
        })
        .catch(function (error) {
          console.log(error);
        });
    });
}

//FUNCTION TO SAVE THE SEARCH HISTORY OF THE USER'S INPUT
function saveSearchHistory() {
  cityHistory.textContent = "";
  for (let index = 0; index < searchHistory.length; index++) {
    var historyContent = document.createElement("input");
    historyContent.setAttribute("type", "text");
    historyContent.setAttribute(
      "class",
      "font-weight-bold btn btn-warning m-1 col-md-12"
    );
    historyContent.setAttribute("value", searchHistory[index]);
    historyContent.addEventListener("click", function () {
      getWeather(searchHistory[index]);
      webcams(searchHistory[index]);
    });
    cityHistory.append(historyContent);
  }
}

//DECLARES A FUNCTION TO CONVERT THE TEMPERATURE OF KELVIN TO DEGREES F
function convert(temp) {
  return Math.floor((temp - 273.15) * 1.8 + 32);
}

//EVENTS
//ADDS AN EVENT LISTENER TO THE SEARCH BUTTON AND STORES THE VALUE INTO LOCAL STORAGE
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var searchInput = cityInput.value;
  console.log(cityInput.value);
  getWeather(cityInput.value);
  webcam(cityInput.value);
  searchHistory.push(searchInput);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  saveSearchHistory();
});

//ADDS AND EVENT LISTENER TO THE CLEAR CITY BUTTON
clearCity.addEventListener("click", function () {
  searchHistory = [];
  saveSearchHistory();
});

//FUNCTION TO START SAVING THE SEARCH HISTORY AFTER THE CLEAR CITY FUNCTION HAS BEEN RUN
saveSearchHistory();
if (searchHistory.length > 0) {
  getWeather(searchHistory[searchHistory.length - 1]);
}
