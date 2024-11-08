function handleSearhSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchFormInput");
  let cityElement = document.querySelector("mainCity");
  cityElement.innerHTML = searchInput.Value;
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearhSubmit);
