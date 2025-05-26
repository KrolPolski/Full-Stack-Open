import { useState, useEffect } from "react";
import axios from "axios";
import getCountriesService from "./services/getCountries.js";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [matchCountries, setMatchCountries] = useState([]);
  const [foundCountry, setFoundCountry] = useState(null);

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
      getCountriesService
        .getCountry(matchCountries[0].name.common)
        .then((countryData) => {
          setFoundCountry(countryData);
        });
    }
  }, [matchCountries]);
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
        </div>
      );
    } else
      return matchCountries.map((country) => (
        <div key={country.cca3}>{country.name.common}</div>
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
