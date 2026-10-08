import "./style.css";
import { getWeather, processWeatherData } from "./weather.js";


console.log("Weather App TOP — setup OK");

console.log("Clé présente ?", typeof process.env.WEBPACK_VISUAL_CROSSING_KEY !== "undefined");

const searchForm = document.getElementById("search-form");
const inputlocation = document.getElementById("location");
const toggleTemp = document.getElementById("toggle-temp");
const weatherDiv = document.getElementById("weather");

function handleSearch(location) {
  return getWeather(location).then(data => { return processWeatherData(data) });
}

async function displayWeather(location, handleSearch) {
  const searchResult = await handleSearch(location);
  
  const icon = document.createElement("p")
  icon.textContent = `${searchResult.icon}`

  const weatherContent = document.createElement("p")
  weatherContent.textContent = `In ${searchResult.address} the actual temperature is ${searchResult.temp} and condition ${searchResult.condition} the max temp ${searchResult.tempmax} and the min temp ${searchResult.tempmin}`

  weatherDiv.appendChild(icon);
  weatherDiv.appendChild(weatherContent);
}

searchForm.addEventListener("submit", (e) => {
  weatherDiv.textContent = "";
  displayWeather(inputlocation.value, handleSearch)
  e.preventDefault();
})
