import React from 'react'
import NavBar from './NavBar'
import Countries from './Countries'
import CountryDetail from './CountryDetail'
import Footer from './Footer'
import Store from '../Store'
import NotFound from './NotFound'
import ServerError from './ServerError'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Store>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Countries />
          </Route>
          <Route path="/detail/:countryCode">
            <CountryDetail />
          </Route>
          <Route path="/error">
            <ServerError />
          </Route>
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>      
    </Store>
  );
}

export default App;
