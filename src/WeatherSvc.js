const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedData = async (city, units = "metric") => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${units}`;

  const data = await fetch(url)
    .then((res) => res.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_max, temp_min, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
    rain,
  } = data;
  const { description, icon } = weather[0];
  const isRain = rain ? true : false;
  // const isRain=true
  return {
    temp,
    temp_min,
    temp_max,
    feels_like,
    pressure,
    humidity,
    speed,
    country,
    name,
    isRain,
    description,
    iconURL: makeIconURL(icon),
  };
};
export { getFormattedData };
