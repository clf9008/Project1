//VARIABLE DECLARATIONS
//LINKS THE HTML ELEMENTS TO VARIABLES TO BE TARGETED IN JAVASCRIPT
var searchButton = document.getElementById("search-btn");
var cityValue = document.getElementById("search-city");
var cityClear = document.getElementById("clear-history");
var cityName = document.getElementById("name-city");
var cityImage = document.getElementById("picture-city");
var cityTemperature = document.getElementById("temp-city");
var cityHumidity = document.getElementById("humidity-city");
var cityWindSpeed = document.getElementById("windspeed-city");
var cityUvIndex = document.getElementById("uv-city");
var cityHistory = document.getElementById("history-ty");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var APIKey = "11cc6738fb7101f2239490031655308f";

//FUNCTION DECLARATION
function grabWeather(cityname) {
  //USES STRING AND VALUE CONCATINATION TO SEARCH THE WEATHER API FOR THE USER'S SEARCHED CITY
  var openWeatherApiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&appid=" +
    APIKey;

  //FETCH 1 FETCHES THE OPENWEATHER API LINK
  fetch(openWeatherApiUrl)
    .then(function (response) {
      //RETURNS THE RESPONSE IN JSON FORMAT
      return response.json();
    })
    .then(function (data) {
      //TAKES THE RETURNED OBJECT AND GRABS THE CURRENT DATE AND WEATHER CONDITON ICON
      var currentDate = new Date(data.dt * 1000);
      var currentDay = currentDate.getDate();
      var currentMonth = currentDate.getMonth() + 1;
      var currentYear = currentDate.getFullYear();
      var weatherIcon = data.weather[0].icon;

      //IN THE CITYNAME VARIABLE ADDS THE CITY NAME AND CURRENT DATE VIA TEXTCONTENT
      cityName.textContent =
        data.name + " " + currentMonth + "-" + currentDay + "-" + currentYear;

      //GIVES THE WEATHER IMAGE AN ATTRIBUTE TO SHOW THE WEATHER ICON
      cityImage.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );

      //ADDS AN ALT FOR SCREENREADERS WITH THE WEATHER CONDITION DESCRIPTION
      cityImage.setAttribute("alt", data.weather[0].description);

      //ACCESSES THE TEMPERATURE VARIBLE AND ADDS THE CURRENT TEMPERATURE IN F
      cityTemperature.textContent =
        "Current Temperature: " + data.main.temp + "oF";

      //ACCESS THE HUMIDITY VARIABLE TO ADD THE CURRENT HUMIDITY AND %
      cityHumidity.textContent =
        "Current Humidity: " + data.main.humidity + "%";

      //ACCESSES THE CITYWINDSPEED VARIABLE AND ADDS THE CURRENT WINDSPEED AND MPH
      cityWindSpeed.textContent =
        "Curren Windspeed: " + data.main.speed + " M.P.H";
    });

  //DECLARES THE VARIABLES FOR LATITUDE AND LONGITUDE FROM THE OBJECT RECEIVED FROM THE OPENWEATHER API CITY SEARCH
  var uvLatitude = data.coord.lat;
  var uvLongitude = data.coord.long;

  //USES THE VARIABLES TO CONCATINATE TO THE UVAPI LINK
  var uvApiLink =
    "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
    uvLatitude +
    "&lon=" +
    uvLongitude +
    "&appid=" +
    APIKey +
    "&cnt=1";

  //FETCH 2
  fetch(uvApiLink)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //DECLARES A VARIABLE CALL UVINDEX THAT CREATES STYLIABLE ELEMENTS IN THE HTML
      var uvIndex = document.createElement("span");

      //ADDS THE TEXTCONTENT OF THE VALUE OF THE UV INDEX THAT WAS RECEIVED
      uvIndex.textContent = data[0].value;

      //CONDITIONAL IF/ELSE STATES THAT CHANGES THE COLOR OF THE UV INDEX ELEMENT DEPENDNING OF THE VALUE OF THE UV INDEX, IF THE VALUE IS HIGHER THE COLOR WILL BE RED, IF THE VALUE IS MEDIUM THE COLOR WILL BE YELLOW, AND IF THE VALUE IS LOW THEN THE COLOR WILL BE A LIGHT GREEN. THE COLOR AND VALUE WILL BE APPENDED TO THE HTML VIA THE JAVASCRIPT VARIABLE
      if (data[0].value > 8) {
        cityUvIndex.textContent = "UV Index: ";
        cityUvIndex.setAttribute("class", "badge badge-danger");
        cityUvIndex.append(cityUvIndex);
      } else if (3 < data[0].value < 8) {
        cityUvIndex.textContent = "UV Index: ";
        cityUvIndex.setAttribute("class", "badge badge-warning");
        cityUvIndex.append(cityUvIndex);
      } else if (data[0].value < 3) {
        cityUvIndex.textContent = "UV Index: ";
        cityUvIndex.setAttribute("class", "badge badge-primary");
        cityUvIndex.append(cityUvIndex);
      }
    });

  //DECLARES THE VARIABLES FOR THE ID NUMBER OF THE SEARCHED CITY AND THE URL TO ACCESS THE FIVE DAY FORECAST OF THE SEARCHED CITY VIA STRING AND VALUE CONCATINATION
  var cityIdNumber = data.id;
  var fivedayUrl =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityIdNumber +
    "&appid=" +
    APIKey;
}

//DECLARES A FUNCTION IN GLOBAL MEMORY THAT WILL SAVE THE USER'S SEARCHED CITY HISTORY
function saveSearchHistory() {
  cityHistory.textContent = "";

  //CREATES A FOR LOOP FOR EACH OF THE FIVE DAY FORECAST ELEMENTS IN THE HTML
  for (let index = 0; index < searchHistory.length; index++) {
    //DECLARES A VARIABLE TO CREATE INPUT ELEMENTS IN THE HTML
    var historyContent = document.createElement("input");

    //SETS THE ATTIBUTE OF THE ELEMENTS TO TEXT
    historyContent.setAttribute("type", "text");

    //GIVE THE ELEMENT S A CLASS WITH A BOLD FONT WEIGHT AND A BLUE COLOR
    historyContent.setAttribute("class", "font-weight-bold btn btn-primary");

    //ADDS THE ATTRIBUTE VALUE OF THE SEARCH HISTORY INDEX
    historyContent.setAttribute("value", searchHistory[index]);

    //ADDS AND EVENT LISTENER TO EACH OF THE SAVED CITY LISTS AND IF THE USER CLICKS THEN RUN THE VALUE THROUGH THE GET WEATHER FUNCTION
    historyContent.addEventListener("click", function () {
      getWeather(searchHistory[index]);
    });

    //APPEND THE NEW ELEMENTS TO THE TARGETED ELEMENT IN THE HTML VIA THE JAVASCRIPT VARIABLE
    cityHistory.append(historyContent);
  }
}

//DECLARE A FUNCTION IN GLOBAL MEMORY THAT CONVERTS THE GIVEN KELVIN UNITS FOR TEMPERATURE TO F FOR THE USER FAHRENHEIT
function convert(temp) {
  return Math.floor((temp - 273.15) * 1.8 + 32);
}

//EVENTS

//ADDS AND EVENT LISTENER TO THE SEARCH BUTTON
searchButton.addEventListener("click", function (event) {
  //PREVENTS THE DEFAULT RELOAD OF THE CLICK FUNCTION
  event.preventDefault();

  //CREATES A VARIBLE TO STORE THE CITY VALUE
  var searchInput = cityValue.value;
  console.log(cityValue.value);

  //RUNS THE CITY VALUE THROUGH THE GET WEATHER FUNCTION AS AN ARGUMENT
  getWeather(cityValue.value);
  searchHistory.push(searchInput);
  //ADDS THE CITY TO LOCAL STORAGE VIA JSON
  localStorage.setItem("search", JSON.stringify(searchHistory));
  //RUNS THE SAVE HISTORY FUNCTION TO SAVE THE USER'S SEARCH CITIES
  saveSearchHistory();
});

//ADDS A CLEAR CITY EVENT LISTENER FOR THE USER TO CLEAR THEIR SEARCHED CITIES IF DESIRED
clearCity.addEventListener("click", function () {
  //SETS THE SEARCH HISTORY ARRAY TO EMPTY IF THE USER DESIRES TO CLEAR THE SEARCHED CITIES
  searchHistory = [];

  //RUN THE SAVE HISTORY FUNCTION TO START LISTENING AGAIN FOR THE USERS SEARCH CITIES TO SAVE INTO LOCAL STORAGE
  saveSearchHistory();
});
