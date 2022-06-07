import React, { useState, useEffect } from 'react';
import {  Route, Switch, NavLink, Link } from 'react-router-dom';
import '../style/App.css';
import Navbar from './Navbar';
import Login from './Login';
import RegisterUser from './RegisterUser';
import MiscAPIpage from './MiscAPIpage';
import Productpage from './Productpage';
import Adminpage from './Adminpage';
import Shoppingcart from './Shoppingcart';
import Checkout from './Checkout';
import Home from './Home';
import { testAuthentication } from '../api';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const[shoppingCart, setShoppingCart] = useState([]);
  const [ products, setProducts ] = useState([])
  const [username, setUsername] = useState("");
  const [password, setPassword]= useState("");
  const [user, setUser] = useState([]);

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
               <span>
                 <h1 class="techone">Welcome to</h1>
                 </span>
                 <span>
                   <h1 class="techtwo"> Cars-R-Us!</h1>
                 </span>
        <div className='nav-bar'>
          <Navbar isLoggedIn={isLoggedIn} loggedInUsername={loggedInUsername} />
        <Switch>
          <Route path='/' exact={true}>
            <Home />
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

        </Switch>
        </div>

        </div>
        <p>If you are a user, please login and browse our wares!</p>
        <p>If not, please use the Register form in our navigation bar 
          to create your profile and get started!</p>
        <Route path='/checkout'>
        <Checkout user={user} setUser={setUser} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart}/>
        </Route>


 
    </div>

  );
};

export default App;
