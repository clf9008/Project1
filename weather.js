//VARIABLE DECLARATIONS
var searchBtn = document.getElementById("search-button");
var searchInput = document.getElementById("search-form");
var cityName = document.getElementById("city-name");
var cityTemp = document.getElementById("city-temp");
var cityHumidity = document.getElementById("city-humidity");
var cityWind = document.getElementById("city-wind");
var cityUv = document.getElementById("city-uv");

//FUNCTION DECLARATION
function getParams() {
  var searchParamsArr = document.location.search.split("&");

  var query = searchParamsArr[0].split("=").pop();
  var format = searchParamsArr[1].split("=").pop();

  searchApi(query, format);
}

function printResults(resultObj) {
  console.log(resultObj);

  var resultCard = document.createElement("div");
  resultCard.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");

  var resultBody = document.createElement("div");
  resultBody.classList.add("card-body");
  resultCard.append(resultBody);

  var titleEl = document.createElement("h3");
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement("p");
  bodyContentEl.innerHTML =
    "<strong>Date:</strong> " + resultObj.date + "<br/>";

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      "<strong>Subjects:</strong> " + resultObj.subject.join(", ") + "<br/>";
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Subjects:</strong> No subject for this entry.";
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      "<strong>Description:</strong> " + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Description:</strong>  No description for this entry.";
  }

  var linkButtonEl = document.createElement("a");
  linkButtonEl.textContent = "Read More";
  linkButtonEl.setAttribute("href", resultObj.url);
  linkButtonEl.classList.add("btn", "btn-dark");

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

function searchedCity(name) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=11cc6738fb7101f2239490031655308f&units=imperial";

  fetch(requestUrl)
    .then(function () {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var cityVal = data["name"];
      var tempVal = data.main.temp;
      var windVal = data["wind"];
      var uvVal = data["uv"];

      cityName.textContent = cityVal;
      cityTemp.textContent = tempValue;
      cityWind.textContent = windValue;
      CityUv.textContent = uvValue;
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;
  var formatInputVal = document.querySelector("#format-input").value;

  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }

  searchApi(searchInputVal, formatInputVal);
}

searchBtn.addEventListener("click", function (event) {
  console.log(event);
});

//EVENTS
