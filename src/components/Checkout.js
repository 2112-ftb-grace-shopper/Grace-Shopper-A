// import { InputAdornment } from "@material-ui/core";
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getAllUsers, getMyShoppingCart } from "../api";
import '../style/Checkout.css';

const Checkout = (props) => {
    // grab the users information off of props
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')

    const [creditCard, setCreditCard] = useState('')
    const [cvv, setCvv] = useState('')

    const {user, setUser, username, setUsername, password, setPassword, shoppingCart, setShoppingCart } = props;

    
    useEffect(() => {
        (async () => {
            const username = localStorage.getItem('Username');
            console.log('username', username);

        })();
    }, []);

    let cartTotal = 0

    useEffect(() => {
        (async () => {
            let newCart = await getMyShoppingCart();

            // if no cart return in backend, new cart as an array in localStorage
            if(!newCart.length){
                newCart = JSON.parse(localStorage.getItem('cart'));
            }

 
            console.log(shoppingCart)
            setShoppingCart(newCart);
            // for(let i = 0; i < shoppingCart.length; i++) {
            //     let itemTotal = shoppingCart[0].cost
            //     console.log('itemTotal', itemTotal);
            //     return itemTotal;
            // }
        })();
    },[]);

    console.log("outside of useeffect", shoppingCart[0])

    // const handleSubmit = (event) => {
        
    //     event.preventDefault();
    //     setFirstName('');
    //     setLastName('');
    //     setEmail('');
    //     setPhoneNumber('');
    //     console.log('submitbuttonclicked')
    // }

    const handleFirstNameChange = (event) => {
        event.preventDefault()
        setFirstName(event.target.value);

            }

    const handleLastNameChange = (event) => {
         event.preventDefault()
        setLastName(event.target.value);
        }

    const handleEmailChanage = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
        }

    const handlePhoneNumberChange = (event) => {
        event.preventDefault();
        setPhoneNumber(event.target.value);
        } 

    const handleAddressChange = (event) => {
        event.preventDefault();
        setAddress(event.target.value);
    }

    const handleZipCodeChange = (event) => {
        event.preventDefault();
        setZipCode(event.target.value);
    }

        const handleSubmit = (event) => {
        
            event.preventDefault();
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setAddress('')
            setZipCode('')
            console.log('submitbuttonclicked')
            if(!firstName){
                alert('please enter a first name');
                setConfirm(false)
            }  else{
                localStorage.setItem('firstname', firstName)
            }
            if(!lastName){
                alert('Please enter a last name')
                setConfirm(false)
            }else{
                localStorage.setItem('lastname', lastName)
            }

            if(!email){
                alert('Please enter a valid email')
                setConfirm(false);
            } 

            if(!phoneNumber){
                alert('Please enter a valid phone number')
                setConfirm(false)
            } 

            if(!address){
                alert('Please enter an address')
            } else{
                localStorage.setItem('address', address)
            }

            if(!zipCode){
                alert('Please enter a zip code')
            } else{
                localStorage.setItem('zip code', zipCode)
            }
            setConfirm(true)
        }

        const handleCreditCardChange =(event) => {
            event.preventDefault();
            setCreditCard(event.target.value);
        }

        const handleCvvChange = (event) => {
            event.preventDefault();
            setCvv(event.target.value);
        }

        const handleCreditCardSubmit =(event) => {
            event.preventDefault()
            setCreditCard('');
            setCvv('');

            if(!creditCard){
                alert('Please enter a valid credit card');
            }

            if(!cvv){
                alert('Please enter a cvv value');
            }
            alert('Congratulations! Your car is on its way!')
        }


    const taxRate = (shoppingCart) => {
       // return null if no cart exists
        if(!shoppingCart){
            return null
        }
        let cartTotal = [];

         // tax rate of 8%
        let tax = 8/100
        // loop through the shoppingCart array
        for(let i = 0; i < shoppingCart.length; i++ ){
            // grab each cart
            let currItemInCart = shoppingCart[i];
            console.log(currItemInCart)
            let currItemCost = currItemInCart.cost

            let itemTax = currItemCost * tax;
            let roundedTax = itemTax.toFixed(2);

            if(itemTax){
             cartTotal.push(roundedTax);
            }
        }
        return cartTotal;
    }

    console.log('tax', taxRate(shoppingCart));

    // compare it to the information that is in our database
    // if the information matches
    // return that we have checked out successfully
    // if not, display an error for whichever field does not match DB

    // handle users information when inputting information to a form
    return (

        <div className="content-box">
            <h1>Checkout Page</h1>

        <form>
        <div className="contact-info">
            <p>Please enter your contact information below</p>
            <div>

            <div>
                <input type = 'text' placeholder="First Name" value={firstName} onChange={handleFirstNameChange}/>
            </div>

            <div>
                <input type = 'text' placeholder="Last Name" value={lastName} onChange={handleLastNameChange}/>
            </div>

                <input type = 'email' placeholder="Email" value={email} onChange={handleEmailChanage}/>
            </div>

            <div>
                <input type = 'number' placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange}/>
            </div>
            <div>
                <input type = 'text' placeholder="Address" value={address} onChange={handleAddressChange}/>
            </div>
            <div>
            <input type = 'text' placeholder="Zip Code" value={zipCode} onChange={handleZipCodeChange}/>

            </div>
        </div>

        <button type="submit" onClick={handleSubmit}>
        confirm
        </button>

        
        {confirm===true?

        <div>

            <h2>Please enter your payment information</h2>
            <p>Shipping to:</p>
            <>
            <div>
            {localStorage.getItem('firstname')} {localStorage.getItem('lastname')}
            </div>
            <div>
            {localStorage.getItem('address')} {localStorage.getItem('zip code')}
        
            </div>



            </>
            <input type='text' placeholder="Credit Card Number" value={creditCard} onChange={handleCreditCardChange}></input>

            <input type='text' placeholder="Cvv" value={cvv} onChange={handleCvvChange}></input>

            <button type="submit" onClick={handleCreditCardSubmit}>
             confirm payment
        </button>
        </div>:null}
            <span>
            {
                shoppingCart.map((item, index) => {
                    return <div className = 'content' key = {`${index}, ${item.id}`}>
                        <h2>{item.make} {item.model}</h2> 
                        <h2>Price: ${item.cost} USD</h2>
                        {/* {cartTotal += item.cost} */}
                        {/* {console.log('cartTotal', cartTotal)} */}
                        </div> 
                    },)
   
            }
             </span>
             <button>
            <Link to ='/shoppingCart'>
                Back to Cart
            </Link>
           </button>

            </form>

        </div>
    )
    }

export default Checkout;