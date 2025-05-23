import { useState, useEffect } from "react";
import axios from "axios";
//mport "./App.css";
import getCountriesService from "./services/getCountries.js";
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [matchCountries, setMatchCountries] = useState ([]);
  const [foundCountry, setFoundCountry] = useState(null);

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
      //console.log("lowerCountryName: ", lowerCountryName, "lowerSearch: ", lowerSearch)
     //console.log(lowerCountryName.startsWith(lowerSearch));
      return lowerCountryName.includes(lowerSearch)});
        setMatchCountries(filtered);
    }
    useEffect(() => {
      if (matchCountries.length == 1){
        getCountriesService.getCountry(matchCountries[0].name.common).then((countryData) => {
        setFoundCountry(countryData);
      });}
    }, [matchCountries]);
  const PrintCountries = () => {
    if (matchCountries.length > 10)
      return(<div>Too many matches, specify another filter</div>)
    else if (foundCountry)
    {  
      console.log(foundCountry);
    return (<div><h1>{foundCountry.name.common}</h1>
            <p>Capital: {foundCountry.capital}</p>
            <p>Area: {foundCountry.area}</p>
            <h2>Languages</h2>
            {Object.values(foundCountry.languages)}
    </div>)
    //return (<div>One country found</div>)
  }
    else
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
