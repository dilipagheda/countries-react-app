import React, {useEffect, useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import SearchBar from "material-ui-search-bar"
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CountriesList from  './CountriesList'
import {Context} from '../Store'
import {getCurrentPage} from '../utilities'
import Apis from '../Apis'
import Constants from '../constants'
import '../styles/Countries.scss'

function Countries() {
  const [showLoader, setShowLoader] = useState(false)
  const [disableNext, setDisableNext] = useState(false)
  const [disablePrevious, setDisablePrevious] = useState(false)
  const [message, setMessage] = useState("")
  const [state, dispatch] = useContext(Context);
  const [redirectToError, setRedirectToError] = useState(false)

  const performSearch = async () => {
    if(state.searchPhrase.length === 0)
    {
      dispatch({type:'SET_COUNTRIES', payload:[]})  
      return
    }
    try
    {
      setShowLoader(true)
      const countries = await Apis.searchCountriesByName(state.searchPhrase)
      dispatch({type:'SET_COUNTRIES', payload:countries})
    }catch
    {
      dispatch({type:'SET_COUNTRIES', payload:[]})
    }finally
    {
      setShowLoader(false)
    }
  }

  useEffect(() => {
    if(state.results.length === 0)
    {
      setMessage("Sorry! No records found!")
    }
    else
    {
      setMessage("")
      if(state.results.length <= 10)
      {
        setDisablePrevious(true)
        setDisableNext(true)
      }
      else{
        state.currentPageNumber === 1? setDisablePrevious(true) : setDisablePrevious(false)
        state.currentPageNumber >= state.totalPages? setDisableNext(true): setDisableNext(false)
      }
    }

  }, [state.results.length, state.currentPageNumber, state.totalPages])

  useEffect(() => {
      if(state.results.length === 0 && state.searchPhrase.length === 0)
      {
        setMessage("")
        setShowLoader(true)
        const fetchData = async ()=> {
          try{
            const countries = await Apis.getCountries()
            dispatch({type:'SET_COUNTRIES', payload:countries})
            setShowLoader(false)
          }catch(error)
          {
            setRedirectToError(true)
          }
        }
        fetchData()
      }
  },[state.results, state.searchPhrase, dispatch])  


  const renderCountries = () => {
    if(showLoader)
    {
      return (
        <div className="loader-indicator">
          <CircularProgress color="inherit" size={40}/>
        </div>
      )
    }else
    {
        return (
          <div className="countries">
            <CountriesList results={getCurrentPage(state.results, state.currentPageNumber, Constants.PAGE_SIZE)}/>
          </div>
        )
      }
  }

  const onCancelSearchHandler = () => {
    dispatch({type:'SET_SEARCH_PHRASE', payload:""})
    dispatch({type:'SET_COUNTRIES', payload:[]})
  }

  const onChangeHandler = (newValue) => {
    dispatch({type:'SET_SEARCH_PHRASE', payload:newValue})
  }

  const onRequestSearchHandler = () => {
    performSearch()
  }

  const nextPageHandler = () => {
    const nextPageNumber = state.currentPageNumber  + 1
    dispatch({type:'SET_CURRENT_PAGE_NUMBER', payload:nextPageNumber})
  }

  const previousPageHandler = () => {
    const previousPageNumber = state.currentPageNumber  - 1
    dispatch({type:'SET_CURRENT_PAGE_NUMBER', payload:previousPageNumber})  
  }

  const onSearchButtonClickHandler = () => {
    performSearch()
  }

  return (
    redirectToError ? 
    <Redirect to="/error" />
    : <div className="countries-container">
      <Paper className="countries-inner-container" elevation={3}>
        <div className="search-bar-container">
          <SearchBar
            className="search-bar"
            placeholder="type in search phrase"
            value={state.searchPhrase}
            onChange={onChangeHandler}
            onRequestSearch={onRequestSearchHandler}
            onCancelSearch={onCancelSearchHandler}
          />
        <Button className="search-button" variant="contained" color="primary" onClick={onSearchButtonClickHandler}>
          Search
        </Button>
        </div>
        { renderCountries() }
        { message ? 
          <div className="message">{message}</div>
          : <div className="pagination-container">
            <Button variant="outlined" color="primary" onClick={previousPageHandler} disabled={disablePrevious ? true: false}>
              Previous
            </Button>
            <div className="page-numbers">{state.currentPageNumber} / {state.totalPages}</div>
            <Button variant="outlined" color="primary" onClick={nextPageHandler} disabled={disableNext ? true: false}>
              Next
            </Button>
          </div>      
        }
      </Paper>
    </div>
  );
}

export default Countries;
