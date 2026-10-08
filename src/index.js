import "./style.css";
import { getWeather, processWeatherData } from "./weather.js";


console.log("Weather App TOP — setup OK");

console.log("Clé présente ?", typeof process.env.WEBPACK_VISUAL_CROSSING_KEY !== "undefined");

getWeather("Paris").then(data => console.log(data));
getWeather("Paris").then(data => console.log(processWeatherData(data)));
