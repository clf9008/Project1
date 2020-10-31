//VARIABLE DECLARATIONS
var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");

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

function searchApi(query) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=11cc6738fb7101f2239490031655308f&units=imperial";

  fetch(requestUrl).then(function (response) {
    if (!response.ok) {
      throw response.json();
    }

    return response.json();

    "#city-name".textContent = reponse.name;
    "#city-temperature".textContent = response.main.temp;
    "#city humidity".textContent = response.main.humidity;
    "#city-UV".textContent = response.main.uv;
  });

  console.log(printResults);
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

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

getParams();

//EVENTS
