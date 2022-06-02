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
  const [ products, setProducts ] = useState([])

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

  return (
    <div className="app-container">
      <div id='header'>
      <h1>Welcome to Cars-R-Us!</h1>


        <div className='nav-bar'>
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
            <Productpage products={products} setProducts={setProducts}></Productpage>
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
        </div>
        </div>
    </div>

  );
};

export default App;
