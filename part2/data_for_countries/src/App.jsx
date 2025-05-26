import { useState, useEffect } from "react";
import axios from "axios";
import getCountriesService from "./services/getCountries.js";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [matchCountries, setMatchCountries] = useState([]);
  const [foundCountry, setFoundCountry] = useState(null);
  const [countryWeather, setCountryWeather] = useState(null);
  useEffect(() => {
    getCountriesService.getAll().then((initialData) => {
      setAllCountries(initialData);
    });
  }, []);
  let newSearchTerm = "";
  const handleSearchChange = (event) => {
    newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const filtered = allCountries.filter((country) => {
      const lowerCountryName = country.name.common.toLowerCase();
      const lowerSearch = newSearchTerm.toLowerCase();
      return lowerCountryName.includes(lowerSearch);
    });
    setMatchCountries(filtered);
    if (filtered.length > 1 && foundCountry) {
      setFoundCountry(null);
    }
  };
  useEffect(() => {
    if (matchCountries.length == 1) {
      let latitude, longitude;
      let weather;
      getCountriesService
        .getCountry(matchCountries[0].name.common)
        .then((countryData) => {
          setFoundCountry(countryData);
          [latitude, longitude] = countryData.capitalInfo.latlng;
          console.log(countryData);
          console.log(latitude, longitude);
          getCountriesService
            .getWeather(latitude, longitude)
            .then((weatherData) => {
              setCountryWeather(weatherData);
              console.log(weatherData);
            });
        });

      //then(getCountriesService.getWeather(foundCountry.capitalInfo.latlng[0], foundCountry.capitalInfo.latlng[1]));
    }
  }, [matchCountries]);
  const linkCountry = (countryname) => {
    console.log(countryname);
    getCountriesService
      .getCountry(countryname)
      .then((countryData) => setFoundCountry(countryData));
  };
  const PrintWeather = () => {
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
  const PrintCountries = () => {
    if (matchCountries.length > 10)
      return <div>Too many matches, specify another filter</div>;
    else if (foundCountry) {
      return (
        <div>
          <h1>{foundCountry.name.common}</h1>
          <p>Capital: {foundCountry.capital}</p>
          <p>Area: {foundCountry.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(foundCountry.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <div>
            <img
              style={{ border: "1px solid black" }}
              src={foundCountry.flags.png}
              alt={foundCountry.flags.alt}
            />
          </div>
          <PrintWeather />
        </div>
      );
    } else
      return matchCountries.map((country) => (
        <div key={country.cca3}>
          {country.name.common}{" "}
          <button onClick={() => linkCountry(country.name.common)}>Show</button>
        </div>
      ));
  };
  return (
    <>
      <label>Find Countries:</label>
      <input value={searchTerm} onChange={handleSearchChange} />
      <PrintCountries />
    </>
  );
}

export default App;
