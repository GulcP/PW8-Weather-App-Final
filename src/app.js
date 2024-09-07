function displayCurrentTemp(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let currentTemperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector(
    "#current-temperature-description"
  );
  let humidityElement = document.querySelector("#current-temperature-humidity");
  let windElement = document.querySelector("#current-temperature-wind");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#current-temperature-icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = currentTemperature;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value.trim().toLowerCase();

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=ca4bof60fdf24464tc7e37793a25dcc2&units=metric`;

  axios.get(apiUrl).then(displayCurrentTemp);
}

let searchForm = document.querySelector("#search-form");
console.log(searchForm);
searchForm.addEventListener("submit", search);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=ca4bof60fdf24464tc7e37793a25dcc2&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
                <div class="weather-forecast-icon">🌤</div>
                <div class="weather-forecast-temperatures">
                    <div class="weather-forecast-temperature"> <strong></strong> </div>
                    <div class="weather-forecast-temperature"></div>
                </div>
                `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
