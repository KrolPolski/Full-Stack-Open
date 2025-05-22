import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import getCountriesService from "./services/getCountries.js";
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    getCountriesService.getAll().then((initialData) => {
      setAllCountries(initialData);
    });
  }, []);

  const handleSearchChange = ({value}) => {
	setSearchTerm(newSearchTerm)
  };
  return (
    <>
      {allCountries.map((country) => (
        <div key={country.cca3}>{country.name.common}</div>
      ))}
      <label>Find Countries:</label>
      <input value={searchTerm} onChange={handleSearchChange} />
    </>
  );
}

export default App;
