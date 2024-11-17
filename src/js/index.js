function refreshWeather(response) {
  let temperatureElement = document.querySelector("#mainTemp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#mainCity");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="main-temp-icon"/>`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

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

function searchCity(city) {
  let apiKey = "a3f38o45c2eb0807db7cfft853e805ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearhSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchFormInput");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "a3f38o45c2eb0807db7cfft853e805ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div>
    <div class="forecast-days">
      <div class="forecast-date">${formatDay(day.time)}</div>
      <img src="${day.condition.icon_url}" class="forecast-icon"/>
    </div>
    <div class="forecast-temps">
      <div class="forecast-temp">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="forecast-temp">${Math.round(day.temperature.minimum)}°</div>
    </div>
</div>
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearhSubmit);

searchCity("Oslo");
