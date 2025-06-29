 const PrintWeather = ({countryWeather, foundCountry}) => {
    if (countryWeather) {
      const icon = countryWeather.weather[0].icon;
	  console.log("icon", icon)
      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
	  console.log(iconURL);
	  return (
        <div>
			<h2>Weather in {foundCountry.capital}</h2>
          <p>
            Temperature{" "}
            {countryWeather && (countryWeather.main.temp - 273.15).toFixed(2)}{" "}
            Celsius
          </p>
          <img src={iconURL} />
          <p>Wind {countryWeather && countryWeather.wind.speed} m/s</p>
        </div>
      );
    } else return <p>No weather data returned from API</p>;
  };

  export default PrintWeather;