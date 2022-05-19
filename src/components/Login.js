import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Login.css';

const Login = () => {
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

      <Link to="/Registerpage">
        <a>
            Don&apos;t have an account? Register here.
        </a>
    </Link>

    
  );
}

export default Login