import React from 'react'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const BackButton = (props) => {
  const history = useHistory();

  const onClickHandler = (event) => {
    history.push('/')
  }

  return (
    <Button className="back-button" variant="outlined" size="medium" color="primary" onClick={onClickHandler}>
      <ArrowBackIosIcon />Back
    </Button>
  )
}

export default BackButton
