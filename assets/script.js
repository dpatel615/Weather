//variable declaration
var clearHistory = ("#clear-history");
var currentCity = ("#current-city");
var currentWeather = ("#current-weather");
var currentTemperature = ("#temperature");
var currentHumidity = ("#humidity");
var currentWindspeed = ("#wind-speed");
var currentUVindex = ("#uv-index");
var APIKey = "12f6fcd64fa3a5df01e911c7ae5b81a2";


var searchCity = document.querySelector("#search-Button");
console.log(searchCity);
var Btn = document.querySelector("#Button");
Btn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(searchCity.value);
  cityWeather();
});
// Function to capture the city input provided by the user and create URL to make API call
function cityWeather() {
  // if(city.val() !== " ") {
  //   city = city.val();
  //   city = cityVal.charAt(0).toUpperCase() + cityVal.slice(1).toLowerCase();
  //   city.val('');
  // }
  var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity.value + "&appid=" + APIKey;
  getCoordAPI(URL);
  console.log(URL);
}

// Function to store the city name in local storage and display it buttons
function storeCity(cityVal) {
  var saveCities = JSON.parse(localStorage.getItem("saveCity"));
  if (saveCities === null) {
    var newCity = [{
      city: cityVal
    }];
    localStorage.setItem("saveCity", JSON.stringify(newCity));
    createButtons(cityVal);
  }
  else {
    var cityExit = saveCities.filter(obj => obj.city === cityVal);
    if (cityExit.lenght === 0) {
      var prevCity = saveCities;
      var newCity = {
        city: cityVal
      };
      prevCity.push(newCity);
      localStorage.setItem("saveCity", JSON.stringify(prevCity));
      createButtons(cityVal);
    }
  }
}
// Function to get the coordinates of a location
function getCoordAPI(URL) {
  var latVal;
  var logVal;
  fetch(URL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (Resp) {
      console.log(Resp);
      // for (var i = 0; i < Resp.lenght; i++) {
      //   latVal = Resp[i].lat;
      //   logVal = Resp[i].lon;
      // }
      var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + Resp.coord.lon + "&lon=" + Resp.coord.lat + "&exclude=minutely,hourly&units=imperial&appid=" + APIKey;
      console.log(weatherURL);

      getCurrWeather(weatherURL);
    });
}

// function to get the current weather
function getCurrWeather(weatherURL) {
  fetch(weatherURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function(Resp){
      console.log(Resp);
    })


}