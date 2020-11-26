import React from 'react'
import { useHistory } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function CountryListItem(props) {
  const history = useHistory();

  const {countryName, alpha3Code} = props

  const onClickHandler = () => {
    history.push(`/detail/${alpha3Code}`)
  }

  return (
      <ListItem button onClick={onClickHandler}>
        <ListItemText primary={countryName} />
      </ListItem>
  );
}

export default CountryListItem;
