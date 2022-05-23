import React from 'react';
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
import '../api';
import { password } from 'pg/lib/defaults';





const App = () => {


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
      <h1>HELLO WORLD</h1>
        <>
          <Navbar />
        <Switch>
          <Route path='/searchbar'>
            <Searchbar /> 
          </Route>
          <Route path='/login'>
            <Login /> 
          </Route>
          <Route path ='/register'>
            <RegisterUser />
          </Route>
          <Route path ='/product'>
            <Productpage />
          </Route>
          <Route path='/shoppingcart'>
            <Shoppingcart />
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
