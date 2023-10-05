import weather from "./weather-data.js";
import { displayWeather, displayWeatherError } from "./weather-display.js";

const weatherForm = document.querySelector("#weather-form");

const handleWeatherFormSubmit = (e) => {
  e.preventDefault();
  const newLocation = e.target.querySelector("#location").value;
  weather(newLocation)
    .getDataObject()
    .then((data) => {
      // add an option for fahrenheit and celsius selection
      displayWeather(data, "celsius");
    })
    .catch(() => {
      displayWeatherError();
    });
};

weatherForm.addEventListener("submit", handleWeatherFormSubmit);
