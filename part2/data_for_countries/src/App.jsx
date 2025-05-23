import { useState, useEffect } from "react";
import axios from "axios";
//mport "./App.css";
import getCountriesService from "./services/getCountries.js";
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [matchCountries, setMatchCountries] = useState ([]);

  useEffect(() => {
    getCountriesService.getAll().then((initialData) => {
      setAllCountries(initialData);
    });
  }, []);
  let newSearchTerm = ""
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm)
    const filtered = allCountries.filter(country => {
      const lowerCountryName = country.name.common.toLowerCase();
      const lowerSearch = newSearchTerm.toLowerCase();
      console.log("lowerCountryName: ", lowerCountryName, "lowerSearch: ", lowerSearch)
      console.log(lowerCountryName.startsWith(lowerSearch));
      return lowerCountryName.startsWith(lowerSearch)});
      setMatchCountries(filtered);
    }
  const PrintCountries = () => {
    return matchCountries.map((country) => (
        <div key={country.cca3}>{country.name.common}</div>
      ))
  }
  return (
    <>
      <label>Find Countries:</label>
      <input value={searchTerm} onChange={handleSearchChange} />
      <PrintCountries/>
    </>
  );
};

export default App;
