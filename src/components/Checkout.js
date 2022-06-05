// import { InputAdornment } from "@material-ui/core";
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getAllUsers, getMyShoppingCart } from "../api";
import '../style/Checkout.css';

const Checkout = (props) => {
    // grab the users information off of props

    const {user, setUser, username, setUsername, password, setPassword, shoppingCart, setShoppingCart } = props;

    
    useEffect(() => {
        (async () => {
            const username = localStorage.getItem('Username');
            console.log('username', username)

        })();
    }, []);

    useEffect(() => {
        (async () => {
            let newCart = await getMyShoppingCart();

            // if no cart return in backend, new cart as an array in localStorage
            if(!newCart.length){
                newCart = JSON.parse(localStorage.getItem('cart'));
            }
            console.log(shoppingCart)
            setShoppingCart(newCart);
        })();
    },[]);

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        setUsername('');
        setPassword('');
        
        const userObject = {
            username: username,
            password: password
        }
    }



    // handle users information when inputting information to a form
    // compare it to the information that is in our database
    // if the information matches
    // return that we have checked out successfully
    // if not, display an error for whichever field does not match DB


    return (

        <div className="content-box">
            <h1>Checkout Page</h1>
            <form onSubmit={handleSubmit}>

            <div>
                <input type = 'text' placeholder="Email"/>
            </div>

            <div>
                <input type = 'text' placeholder="First Name"/>
            </div>

            <div>
                <input type = 'text' placeholder="Last Name"/>
            </div>

            <div>
                <input type = 'text' placeholder="Phone Number"/>
            </div>
            <span>
            {
                shoppingCart.map((item, index) => {
                    return <div className = 'content' key = {`${index}, ${item.id}`}>
                        <h2>{item.make} {item.model}</h2> 
                        <h2>Price: ${item.cost} USD</h2>
                        </div> 
                    })
                
            }
            </span>
            </form>

        </div>
    )
    }

export default Checkout;