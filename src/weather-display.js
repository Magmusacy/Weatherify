const weatherLocation = document.querySelector("#weather-results-location");
const weatherTemperature = document.querySelector(
  "#weather-results-temperature"
);

export const displayWeather = (data, unit) => {
  weatherLocation.textContent = data.location;
  if (unit === "celsius") {
    weatherTemperature.textContent = `${data.temp_c}°C`;
  } else {
    weatherTemperature.textContent = `${data.temp_f}°F`;
  }
};

export const displayWeatherError = () => {
  weatherLocation.textContent = "ERROR: Location couldn't be found";
  weatherTemperature.textContent = "ERROR: No weather data found";
};
