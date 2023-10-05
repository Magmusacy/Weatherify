export default function weather(location) {
  const getWeatherData = async () => {
    const key = "26bdff49ae6e46cfb0463609230310";
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;
    const response = await fetch(url, { mode: "cors" });
    return await response.json();
  };

  const getDataObject = async () => {
    const data = await getWeatherData();

    return {
      location: data.location.name,
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
    };
  };

  return { getDataObject };
}
