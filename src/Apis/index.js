import axios from 'axios';

 
const getCountries = async () => {

 const url = 'https://restcountries.eu/rest/v2/all'
  const response = await axios.get(url)
  return response.data
};

const getCountryDetails = async (alpha3Code) => {
  const url = `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
  const response = await axios.get(url)
  return response.data
}

const searchCountriesByName = async (searchPhrase) => {
  const url = `https://restcountries.eu/rest/v2/name/${searchPhrase}`
  const response = await axios.get(url)
  return response.data
}

const Api = {
  getCountries,
  getCountryDetails,
  searchCountriesByName
}
export default Api