import React, { useState, useEffect } from 'react';
import {  Route } from 'react-router-dom';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import Landingpage from './Landingpage';
import Searchbar from './Searchbar';
import Login from './Login';
import Registerpage from './Registerpage';
import MiscAPIpage from './MiscAPIpage';
import Productpage from './Productpage';
import Adminpage from './Adminpage';
import Shoppingcart from './Shoppingcart';
import { Router } from 'express';


const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
      <Router>
        

        <Route index element= { <Landingpage/> } />
        <Route path='Searchbar' element= {<Searchbar />} />
        <Route path='Login' element = {<Login />}/>
        <Route path='Registerpage' element = {<Registerpage /> } />
        <Route path='Productpage' element = {<Productpage />} />
        <Route path='Shoppingcart' element = {<Shoppingcart />} />
        <Route path='MiscAPIpage' element = {<MiscAPIpage />} />
        <Route path='Adminpage' element = {<Adminpage />} /> 
        <p>API Status: {APIHealth}</p> 
        
        

      </Router>
      
    </div>
  );
};

export default App;
