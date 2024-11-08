function searchCity(city) {
  let apiKey = "a3f38o45c2eb0807db7cfft853e805ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiUrl);
}

function handleSearhSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchFormInput");
  let cityElement = document.querySelector("#mainCity");
  cityElement.innerHTML = searchInput.Value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearhSubmit);
