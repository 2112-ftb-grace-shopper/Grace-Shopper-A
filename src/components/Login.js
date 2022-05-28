import React, { useState, useEffect } from 'react';
import { loginUser } from "../api";
import { Link } from 'react-router-dom';
import '../style/Login.css';

const Login = (props) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const {setIsLoggedIn} = props;

  const handleLogin = (event) => {
    console.log("Logging in...");
    const registerInfo = {
      user: user,
      password: password,
    };

    loginUser(registerInfo);

    setUser("");
    setPassword("");
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogOut = () => {
    localStorage.removeItem("fitness_tracker_JWT");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("fitness_tracker_JWT"));
  }, []);
  
    return (
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

      <Link to="/register">
        <a>
            Don't have an account? Register here.
        </a>
    </Link>

    
  );
}

export default Login