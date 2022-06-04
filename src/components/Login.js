import React, { useState, useEffect } from 'react';
import { loginUser } from "../api";
import { Link } from 'react-router-dom';
import '../style/Login.css';

const Login = (props) => {
  // const [user, setUser] = useState("");
  // const [password, setPassword] = useState("");
  const [hasTriggeredError, setHasTriggeredError ] = useState(false);
  const {isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword} = props;

  const handleLogin = async (event) => {
    console.log("Logging in...");
    event.preventDefault();
    setUsername("");
    setPassword("");

    const userObject = {
      username: username,
      password: password,
    };

  const didLoginWork = await loginUser(userObject);
  if(didLoginWork === false){
    setHasTriggeredError(true);
  } else{
    setIsLoggedIn(didLoginWork);
  }
  };

  const handleUserChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogOut = () => {
    localStorage.removeItem("cars-R-Us");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!localStorage.getItem("cars-R-Us"));
  }, []);

    // create a landing page for if login was  successful

    return (
      <>
      <div id="login" className="loginStyle">
        <form>
          <label>Username</label>
          <input
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={handleUserChange}
          ></input>

          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={handlePasswordChange}
          ></input>
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
          <button type="submit" onClick={handleLogOut}>
            Log Out
          </button>
        </form>
      </div>
    </>
  );
};
        // <form id="textinput">
        //     <h1>Login to Account</h1>
        //     <label htmlFor="username">Username: </label>
        //     <input
        //         type="text"
        //         id="username"
        //         name="username"
        //         minLength="8"
        //         value={username}
        //         onChange={(event) => { setUsername(event.target.value) }}
        //         required
        //     >
        //     </input>
        //     <br />

        //     <label htmlFor="pwd">Password: </label>
        //     <input
        //         type="password"
        //         id="pwd"
        //         name="pwd"
        //         minLength="8"
        //         value={password}
        //         onChange={(event) => { setPassword(event.target.value) }}
        //         required
        //     ></input>
        //     <br />
        // <button
        //     onClick={submit}>Login</button>
        // <br />
        // </form>

    //   <Link to="/register">
    //     <a>
    //         Don't have an account? Register here.
    //     </a>
    // </Link>
export default Login