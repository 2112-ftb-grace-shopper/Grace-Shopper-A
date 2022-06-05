import React, { useState } from 'react';
import { registerNewUser } from '../api';
import { Link } from 'react-router-dom';
import '../style/Registerpage.css';

const RegisterUser = (props) => {
    const { username, setUsername, password, setPassword } = props;

    const handleRegisterClick = async (event) => {
        event.preventDefault();


        console.log("Creating a new user...");
        const userObject = {
            username: username,
            password: password
        };
        console.log('userObject', userObject)

        // these need to useState VVVV
        let firstPassword = document.querySelector('.password').value,
            confirmPassword = document.querySelector('.confirm_password').value;
          
            if (firstPassword == "") {
                alert("Password field cannot be empty");
                return false;
            } 
            
            if (firstPassword != confirmPassword) {
                alert("Passwords did not match, please try again!");
                return false
            }
            
            console.log('hitting here too!!!!!!!')
            const newUser = await registerNewUser(userObject);
            alert(newUser.message)
        
            setUsername("");
            setPassword("");

            document.querySelector('.confirm_password').value='';
    };

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }



    return (
        <>
        <div>
            <h1>Register New User</h1>
        </div>

        <form>
            <input type="text" placeholder="User Name" value={username} onChange={handleUserChange}  />
            <input type="password" className="password" placeholder="Password" id="password" value={password}
             onChange={handlePasswordChange}/>

            <input type="password" className="confirm_password" placeholder="Re-Enter Password" id="confirm-password"
            />
             
            <button onClick={handleRegisterClick}>Register!</button>  
        </form>
      </>    
    );
        // <Link to ='/Navbar'>Back</Link>

};

export default RegisterUser