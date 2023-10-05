let tempUnit = "celsius";

export const displayWeather = (data) => {
  displayWeatherInfo(data);
  // Always use celsius to change background
  animateResults();
  changeBackground(data.temp_c);
};

export const displayWeatherError = () => {};

export const changeTempUnit = () => {
  if (tempUnit === "celsius") tempUnit = "fahrenheit";
  else tempUnit = "celsius";
};

const displayWeatherInfo = (data) => {
  weatherLocation.textContent = data.location;
  if (tempUnit === "celsius") {
    weatherTemperature.textContent = `${data.temp_c}°C`;
  } else {
    weatherTemperature.textContent = `${data.temp_f}°F`;
  }
};

const changeBackground = async (temp_c) => {
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

const animateResults = async () => {
  const timeoutTime = 300;

  new Promise((resolve) => {
    setTimeout(() => {
      weatherLocation.classList.remove("hidden");
      weatherLocation.classList.add("visible");
      resolve();
    }, timeoutTime);
  }).then(() => {
    console.log("hejs");
    setTimeout(() => {
      weatherTemperature.classList.remove("hidden");
      weatherTemperature.classList.add("visible");
    }, timeoutTime);
  });
};
