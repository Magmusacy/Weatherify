export default function weather(location) {
  const getWeatherData = async () => {
    const key = "26bdff49ae6e46cfb0463609230310";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=3`;
    const response = await fetch(url, { mode: "cors" });
    return await response.json();
  };

  // Parses the data to get only the required properties
  const parseDataObject = (data) => {
    const forecastDays = [];
    data.forecast.forecastday.forEach((day, i) => {
      const forecastObject = {
        date: day.date,
        location: data.location.name,
        avgtemp_c: day.day.avgtemp_c,
        avgtemp_f: day.day.avgtemp_f,
        maxtemp_c: day.day.maxtemp_c,
        maxtemp_f: day.day.maxtemp_f,
        mintemp_c: day.day.mintemp_c,
        mintemp_f: day.day.mintemp_f,
      };

      forecastObject.hours = [];

      day.hour.forEach((hour) => {
        forecastObject.hours.push({
          temp_c: hour.temp_c,
          temp_f: hour.temp_f,
          time: hour.time,
        });
      });

      forecastDays.push(forecastObject);
    });

    return forecastDays;
  };

  const getDataObject = async () => {
    const data = await getWeatherData();
    return parseDataObject(data);
  };

  return { getDataObject };
}
