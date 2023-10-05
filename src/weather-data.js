export default function weather(location) {
  const getWeatherData = async () => {
    const key = "26bdff49ae6e46cfb0463609230310";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=3`;
    const response = await fetch(url, { mode: "cors" });
    return await response.json();
  };

  const parseDataObject = (data) => {
    const forecastObject = {};
    data.forecast.forecastday.forEach((day) => {
      const dayInfo = day.date;
      forecastObject[dayInfo] = {
        avgtemp_c: day.day.avgtemp_c,
        avgtemp_f: day.day.avgtemp_f,
        maxtemp_c: day.day.maxtemp_c,
        maxtemp_f: day.day.maxtemp_c,
        mintemp_c: day.day.mintemp_c,
        maxtemp_c: day.day.maxtemp_c,
      };

      forecastObject[dayInfo].hours = [];

      day.hour.forEach((hour) => {
        forecastObject[dayInfo].hours.push({
          temp_c: hour.temp_c,
          temp_f: hour.temp_f,
          time: hour.time,
        });
      });
    });

    return forecastObject;
  };

  const getDataObject = async () => {
    const data = await getWeatherData();
    console.log(parseDataObject(data));
    return parseDataObject(data);
  };

  return { getDataObject };
}
