//variable entered into global memory to append the HTML document with a 'search form'
var searchFormEl = document.querySelector('#search-form');
//funciton to handle the input of the search form 
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//variables entered into global memory that appends HTML document with result text, result content, and the search form
var resultText = document.querySelector('#result-text');
var resultContent = document.querySelector('#result-content');
var searchForm = document.querySelector('#search-form');

//entering the API key into global memory as a constant 
const APIKey = "OkhKOiAdwFCcdo0j28t9g73szM8dRq0O"
//funtion to get the value entered into the search input and run the 'get API
function getSearchParams() {
    // Get the search params out of the URL (i.e. 'Paris, France') 
    var searchParamsArr = document.location.search
  
    // Get the query and format values
    var query = searchParamsArr[0].split('=').pop();
    var format = searchParamsArr[1].split('=').pop();
  
    getWebcamAPI(query, format);
  }

  function printResults(resultObj) {
    console.log(resultObj);
  
    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  
    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);
  
    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;
  
    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
      '<strong>Date:</strong> ' + resultObj.date + '<br/>';
  
    if (resultObj.subject) {
      bodyContentEl.innerHTML +=
        '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Subjects:</strong> No subject for this entry.';
    }
  
    if (resultObj.description) {
      bodyContentEl.innerHTML +=
        '<strong>Description:</strong> ' + resultObj.description[0];
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Description:</strong>  No description for this entry.';
    }
  
    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Read More';
    linkButtonEl.setAttribute('href', resultObj.url);
    linkButtonEl.classList.add('btn', 'btn-dark');
  
    resultBody.append(titleEl, bodyContentEl, linkButtonEl);
  
    resultContentEl.append(resultCard);
  }
  



  //function to search the API for the content entered into the search query 
function getWebcamAPI (query, format) {
    
    let locQueryUrl = "OkhKOiAdwFCcdo0j28t9g73szM8dRq0O" + cityName + "&appid=" + APIKey;
    
    if (format) {
      locQueryUrl = "OkhKOiAdwFCcdo0j28t9g73szM8dRq0O" + format + '/?fo=json';
    }
  
    locQueryUrl = locQueryUrl + '&q=' + query;
  
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        resultTextEl.textContent = locRes.search.query;
  
        console.log(locRes);
  
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

//   function handleSearchFormSubmit(event) {
//     event.preventDefault();
  
//     var searchInputVal = document.querySelector('#search-input').value;
//     var formatInputVal = document.querySelector('#format-input').value;
  
//     if (!searchInputVal) {
//       console.error('You need a search input value!');
//       return;
//     }
  
//     searchApi(searchInputVal, formatInputVal);
//   }
  
//   searchFormEl.addEventListener('submit', handleSearchFormSubmit);
  
//   getSearchParams();
  
