//Current date
function formattedDate(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let fullDateFormatted = `${currentDay} ${currentDate} ${currentMonth} ${currentYear} ${currentHour}:${currentMinute}`;

  return fullDateFormatted;
}

//Search city

function search(city) {
  let apiKey = "9a24724f0b63770692652be5b580b59b";
  let units = "metric";
  let endPointUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiWeatherUrl = `${endPointUrl}?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiWeatherUrl).then(showWeather);
}
function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

//Use current location

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9a24724f0b63770692652be5b580b59b";
  let units = "metric";
  let EndPointUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiWeatherUrl = `${EndPointUrl}?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

  axios.get(apiWeatherUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

//Weather details

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-desc").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#current-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = response.data.wind.speed;
}

//Current date
let changeDate = document.querySelector("#current-date");
changeDate.innerHTML = formattedDate(new Date());

//Search city

search("London");

let selectedCityEnter = document.querySelector("#search-city");
selectedCityEnter.addEventListener("submit", enterCity);

let selectedCityClick = document.querySelector("#search-button");
selectedCityClick.addEventListener("click", enterCity);

//Use current location

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
