# Destination Travel Webcam Application

This application searches for a given location and it will display the current weather, the forecast for the next five days, and pull up a live image from a webcam closests to the location that was searched. For instance, if the user choses Paris, France; the application will display a live shot from Paris France via the Windy webcam API and detail the current conditions as well as the future forecast for the city as well through the OpenWeather API. 

## Application Description

A user searches for a Destination Vacation location (such as Hawai, Paris, or Fiji) in the search function. The application will use API Server calls to retrieve data from the OpenWeather API Server which will display the current and future conditions for said location, and the Windy API Server will display a live image from a webcam closests to the destination that was searched for by the user. The application will save any stored searches and allow the user to go between previous searches or to clear all searches if they would like. There is a webcam page that displays webcams from certain destination vacations so a user can see other destination locations at any time. 

### 
[Image of Deployed Application](placeholder link)
[Destination Travel Webcam Application](https://clf9008.github.io/Project1/)

#### Outside Resources Used
- [Windy API](https://api.windy.com/)
- [OpenWeather API](https://openweathermap.org/api)
- JavaScript
- Jquery
- CSS
-Bootstrap

##### Challenges and Oppurtunities for Improvement

The biggest challenge we faced with development of this application was getting the retrieved data from the OpenWeather API server to be used in our search function of the Windy API server for the webcam image. We had issues getting the coordinates off the object that was being passed to the argument, but with some tweaking, we finally were able to pull that information and use it in our Windy Webcam search. In addition to this, we had issues getting the live image from the Windy API server to display on our initial launch. With some minor code tweaking, we were able to get the image to display for the closest webcam to the searched location. 

Other oppurtunities for improvements can come from our Windy API server. In a future iteration of the applicaiton, we would like to have a page dedicated to the webcams that shows certain images from select destination vacation locations. In addition to this, we would also like to add a Allergy Index and Running Conditions index to our weather side of the application to give a better look at the current conditions for a searched location.

