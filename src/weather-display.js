const locationField = document.querySelector("#location-name");
let tempUnit = "celsius";

export const displayWeather = (data) => {
  // Remove any pre-existing weather cards
  clearWeatherCards();
  displayWeatherCards(data);
  displayFormInfo(data);
};

export const displayFormInfo = (data) => {
  locationField.textContent = `Location: ${data[0].location}`;
};

export const displayWeatherError = () => {
  locationField.textContent = `ERROR: Location not found`;
  clearWeatherCards();
};

export const changeTempUnit = () => {
  if (tempUnit === "celsius") tempUnit = "fahrenheit";
  else tempUnit = "celsius";
};

export const displayWeatherUnit = () => {
  const unitSelection = document.querySelector("#unit-selection");
  console.log(unitSelection);
  if (tempUnit === "celsius") {
    unitSelection.textContent = "Change to Fahrenheit";
  } else {
    unitSelection.textContent = "Change to Celsius";
  }
};

const clearWeatherCards = () => {
  const weatherCards = document.querySelectorAll(".forecast");
  weatherCards.forEach((card) => card.remove());
};

const displayWeatherCards = (data) => {
  data.forEach((day) => {
    createForecastCard(day);
  });
};

const createForecastCard = (data) => {
  const mainElement = document.querySelector("main");
  const tempUnitShort = tempUnit === "celsius" ? "c" : "f";
  mainElement.insertAdjacentHTML(
    "beforeend",
    `      
    <div class="forecast">
      <div class="summary">
        <div id="date-info" class="date-info">${data.date}</div>
        <div class="temperatures">
          Temperatures:
          <div class="min-temp">Min: ${data["mintemp_" + tempUnitShort]} ${
            tempUnitShort == "c" ? "°C" : "°F"
          }</div>
          <div class="max-temp">Max: ${data["maxtemp_" + tempUnitShort]} ${
            tempUnitShort == "c" ? "°C" : "°F"
          }</div>
          <div class="avg-temp">Avg: ${data["avgtemp_" + tempUnitShort]} ${
            tempUnitShort == "c" ? "°C" : "°F"
          }</div>
        </div>
      </div>
      <div id="hours-region-${data.date}" class="hours">
      </div>
    </div>
  `
  );

  const hoursRegion = document.querySelector(`#hours-region-${data.date}`);
  data.hours.forEach((hour) => {
    hoursRegion.insertAdjacentHTML(
      "beforeend",
      `
      <div class="hour-card">
        <div class="hour">Hour: ${hour.time.split(" ").at(-1)}</div>
        <div class="temperature">Temp: ${hour["temp_" + tempUnitShort]} ${
          tempUnitShort == "c" ? "°C" : "°F"
        }</div>
      </div>
    `
    );
  });
};

export const changeBackground = async (temp_c) => {
  console.log(temp_c);
  const weatherState = getWeatherState(temp_c);
  const giphyKey = "pPGSOO8l3rw2kVYw4X9cMkoWOqPFXVA8";
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${weatherState}`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  document.body.style.backgroundImage = `url(${data.data.images.original.url})`;
};

const getWeatherState = (temp_c) => {
  if (temp_c > 25) return "hot+temperature+outside";
  else if (temp_c > 15) return "warm+temperature+outside";
  else if (temp_c > -5) return "cold+temperature+outside";
  else return "freezing+temperature+outside";
};
