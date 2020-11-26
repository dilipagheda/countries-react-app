import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import BackButton from './BackButton'
import CircularProgress from '@material-ui/core/CircularProgress';
import Apis from '../Apis'
import NumberFormat from 'react-number-format';
import '../styles/CountryDetail.scss'

function CountryDetail() {
  let { countryCode } = useParams()
  const [showLoader, setShowLoader] = useState(false)
  const [countryDetails, setCountryDetails] = useState({})
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(()=>{
    const fetchData = async () => {
      try{
        setShowLoader(true)
        const response = await Apis.getCountryDetails(countryCode)
  
        setCountryDetails({
          name: response.name,
          flag: response.flag,
          population: response.population,
          demonym: response.demonym
        })
        setShowLoader(false)
      }catch(error)
      {
        console.log(error)
      }
    }
    fetchData()
    
  },[countryCode])

  const onImageLoadHandler = () => {
    setIsImageLoaded(true)
  }
  return (
    showLoader ?
      <div className="progress-indicator">
        <CircularProgress color="inherit" size={40}/>
      </div>
      :
      <div className="top-container">
        <div>
          <BackButton />
        </div>
        <Paper className="country-detail-container" elevation={3}>
          <div className={`country-flag ${isImageLoaded ? 'show-image':'hide-image'}`}>
            <img src={countryDetails.flag} alt={`flag of ${countryDetails.name}`} onLoad={onImageLoadHandler}/>
          </div>
          <div className="country-name">{countryDetails.name}</div>
          
          <div className="country-additional-info">
            <div className="row-item">
              <span className="label">Population</span>
              <span>
                <NumberFormat value={countryDetails.population} displayType={'text'} thousandSeparator={true}/>
              </span>
            </div>
            <div className="row-item">
              <span className="label">Demonym</span>
              <span>{countryDetails.demonym}</span>
            </div>
          </div>
        </Paper>
      </div>
  );
}

export default CountryDetail;