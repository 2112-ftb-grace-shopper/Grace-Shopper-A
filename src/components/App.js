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
  const [username, setUsername] = useState("");
  const [password, setPassword]= useState("");

async function isValidJWT() {
  const token = localStorage.getItem('userToken');
  if(!token) setIsLoggedIn(false);
  
  else {
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
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> 
          </Route>
          <Route path ='/register'>
            <RegisterUser username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
          </Route>
          <Route path ='/product'>
            <Productpage allProducts={products} setProducts={setProducts} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}></Productpage>
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
