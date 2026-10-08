import "./style.css";
import { getWeather, processWeatherData } from "./weather.js";


console.log("Weather App TOP — setup OK");

console.log("Clé présente ?", typeof process.env.WEBPACK_VISUAL_CROSSING_KEY !== "undefined");

const searchForm = document.getElementById("search-form");
const inputlocation = document.getElementById("location");
const toggleTemp = document.getElementById("toggle-temp");
const weatherDiv = document.getElementById("weather");
const loading = document.getElementById("loading");

let isCelsius = false;
let lastLocation;

function handleSearch(location) {
  return getWeather(location, isCelsius).then(data => { return processWeatherData(data) });
}

async function displayWeather(location, handleSearch) {
  loading.hidden = false;
  
  try {
    const searchResult = await handleSearch(location);

    const icon = document.createElement("p")
    icon.textContent = `${searchResult.icon}`

    const weatherContent = document.createElement("p")
    if(isCelsius) {
      weatherContent.textContent = `In ${searchResult.address} the actual temperature is ${searchResult.temp}°C and condition is ${searchResult.condition} the max temp is ${searchResult.tempmax}°C and the min temp is ${searchResult.tempmin}°C`
    }else {
    weatherContent.textContent = `In ${searchResult.address} the actual temperature is ${searchResult.temp}°F and condition is ${searchResult.condition} the max temp is ${searchResult.tempmax}°F and the min temp is ${searchResult.tempmin}°F`
    }

    loading.hidden = true;
    weatherDiv.appendChild(icon);
    weatherDiv.appendChild(weatherContent);
  } catch (error) {
    loading.hidden = true;
    weatherDiv.textContent = `Oups an error occurred. ${error}.`;
  }
}

searchForm.addEventListener("submit", (e) => {
  weatherDiv.textContent = "";
  displayWeather(inputlocation.value, handleSearch)
  lastLocation = inputlocation.value;
  e.preventDefault();
})

toggleTemp.addEventListener("click", () => {
  isCelsius = isCelsius ? false : true;
  weatherDiv.textContent = "";
  displayWeather(lastLocation, handleSearch)
})
