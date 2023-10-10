import weather from "./weather-data.js";
import {
  displayWeather,
  displayWeatherError,
  changeTempUnit,
  changeBackground,
  displayFormInfo,
  displayWeatherUnit,
} from "./weather-display.js";

const weatherForm = document.querySelector("#weather-form");
const unitSelection = document.querySelector("#unit-selection");
let weatherData;
displayWeatherUnit();

const handleWeatherFormSubmit = (e) => {
  e.preventDefault();
  const newLocation = e.target.querySelector("#location").value;
  weather(newLocation)
    .getDataObject()
    .then((data) => {
      weatherData = data;
      displayWeather(data);
      // Always use today's average celsius temp to change background
      changeBackground(data[0].avgtemp_c);
      displayFormInfo(data);
    })
    .catch(() => {
      displayWeatherError();
    });
};

const handleChangingTempUnit = (e) => {
  changeTempUnit();
  displayWeatherUnit();
  if (document.querySelector(".forecast")) {
    displayWeather(weatherData);
  }
};

weatherForm.addEventListener("submit", handleWeatherFormSubmit);
unitSelection.addEventListener("click", handleChangingTempUnit);
