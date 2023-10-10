import weather from "./weather-data.js";
import {
  displayWeather,
  displayWeatherError,
  changeTempUnit,
  changeBackground,
  displayFormInfo,
} from "./weather-display.js";

const weatherForm = document.querySelector("#weather-form");

const handleWeatherFormSubmit = (e) => {
  e.preventDefault();
  const newLocation = e.target.querySelector("#location").value;
  weather(newLocation)
    .getDataObject()
    .then((data) => {
      // add an option for fahrenheit and celsius selection
      displayWeather(data);
      // Always use today's average celsius temp to change background
      changeBackground(data[0].avgtemp_c);
      displayFormInfo(data);
    })
    .catch(() => {
      displayWeatherError();
    });
};

const handleChangingTempUnit = () => {
  changeTempUnit();
};

weatherForm.addEventListener("submit", handleWeatherFormSubmit);
