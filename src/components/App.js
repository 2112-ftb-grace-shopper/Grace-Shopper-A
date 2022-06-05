import React, { useState, useEffect } from 'react';
import {  Route, Switch, NavLink } from 'react-router-dom';
import '../style/App.css';
import Navbar from './Navbar';
import Searchbar from './Searchbar';
import Login from './Login';
import RegisterUser from './RegisterUser';
import MiscAPIpage from './MiscAPIpage';
import Productpage from './Productpage';
import Adminpage from './Adminpage';
import Shoppingcart from './Shoppingcart';
import { testAuthentication } from '../api';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const[shoppingCart, setShoppingCart] = useState([]);

async function isValidJWT() {
  const token = localStorage.getItem('cars-R-Us_JWT');
  if(!token) setIsLoggedIn(false);
  else {
      const isValid = await testAuthentication(token);
      setLoggedInUsername(isValid.username);
      setIsLoggedIn(true);
  }
}

useEffect(() => {
  isValidJWT();
}, []);

  // const [APIHealth, setAPIHealth] = useState('');

  // useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    // const getAPIStatus = async () => {
    //   const { healthy } = await getAPIHealth();
    //   setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    // };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
  //   getAPIStatus();
  // }, []);

  return (
    <div className="app-container">
        <>
          <Navbar isLoggedIn={isLoggedIn} loggedInUsername={loggedInUsername} />
        <Switch>
          <Route path='/searchbar'>
            <Searchbar  /> 
          </Route>
          <Route path='/login'>
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> 
          </Route>
          <Route path ='/register'>
            <RegisterUser />
          </Route>
          <Route path ='/product'>
            <Productpage/>
          </Route>
          <Route path='/shoppingcart'>
            <Shoppingcart shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>
          </Route>
          <Route path='/miscAPIpage'>
            <MiscAPIpage />
          </Route>
          <Route path='/adminpage'>
            <Adminpage /> 
          </Route>
        </Switch>
        </>
        {/* <p>API Status: {APIHealth}</p>  */}
        
    </div>
  );
};

export default App;
