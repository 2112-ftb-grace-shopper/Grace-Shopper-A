import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../api';
import '../style/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  

  const submit = async(event)  =>  {
    const userObject = {
        username: username,
        password: password
    }
        event.preventDefault()
        if (typeof userObject != 'undefined') {
       const loggingIn = await loginUser(userObject)
            if(loggingIn){ 
            localStorage.setItem("access_token", loggingIn);
            }
            setUsername("")
            setPassword("")
            alert(`Logged in successfully!`)
            return(
                <Link to = '/'></Link>
            )
        }
    }
  
  return (
      <div>
        <form id="textinput">
            <h1>Login to Account</h1>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder='User Name'
                minLength="8"
                value={username}
                onChange={(event) => { setUsername(event.target.value) }}
                required
            >
            </input>
            <br />

            <label htmlFor="pwd">Password: </label>
            <input
                type="password"
                placeholder='Password'
                id="pwd"
                name="pwd"
                minLength="8"
                value={password}
                onChange={(event) => { setPassword(event.target.value) }}
                required
            ></input>
            <br />
        <button
            onClick={submit}>Login</button>
        <br /> 
         </form>

      <Link to="/Registerpage">
        <a>
            Don&apos;t have an account? Register here.
        </a>
    </Link>
      </div>
    
  );
}

export default Login