import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  const request = axios.get(baseUrl + 'all')
  return request.then(response => response.data)
}

const getCountry = (countryName) => {
  const countryUrl = baseUrl + 'name/' + countryName
  const request = axios.get(countryUrl)
  return request.then(response => response.data)
}

const getWeather = (latitude, longitude) =>
{	
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
	const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
	console.log(weatherURL);
	const request = axios.get(weatherURL)
	return request.then(response => response.data)
}

export default { getAll, getCountry, getWeather}