import React from 'react'
import CountryListItem from './CountryListItem'
import List from '@material-ui/core/List';

function CountriesList(props) {
  
  const {results} = props

  const renderCountries = () => {
    return results.map(country => {
      return (
        <CountryListItem countryName={country.name} alpha3Code={country.alpha3Code} key={country.name}/>
      )
    })
  }

  return (
    <List>
        {renderCountries()}
    </List>
  );
}

export default CountriesList;
