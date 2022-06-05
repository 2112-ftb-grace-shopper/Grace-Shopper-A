
import React, {useEffect, useInsertionEffect, useState } from "react";
import { getAllProducts, getMyShoppingCart, postProductToShoppingCart, postProducts } from "../api";
import { Link } from "react-router-dom";
import '../style/Shoppingcart.css';



const Shoppingcart = (props) => {
    const {shoppingCart, setShoppingCart } = props;
    const {product, setProduct} = props;


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


    const username = localStorage.getItem('Username');

    const taxRate = (num) => {
        if(!num) {
            return null;
        } else {
            let tax = num * (8/100);

        return tax
    }
    }

    console.log('tax', taxRate(10));


    // const addProductToLoggedInCart = async () => {
    //     const product = await getAllProducts();

    //     // new cart state with products inside
    //     const newCart = [ ...shoppingCart, product ];

    //     setShoppingCart(newCart)
    // }

    // need to be able to add the product that is on localStorage or logged in user to shoppingCart object


        console.log('SHOPPING CART ===>', shoppingCart);
    return (

        <div className="shoppingcart">
           {shoppingCart.length===0? 
           <div>
           <h1>Sorry, there is nothing in your cart!</h1>
        
           <button>
            <Link to ='/product'>
                Check out some of our cars!
            </Link>
           </button>
           </div>
           :
           <div>
               <h1>Hello {username} please review the items in your cart</h1>
                       {
                    shoppingCart.map((item, index) => {
                        return <div className = 'content' key = {`${index}, ${item.id}`}>
                            <h2>{item.make} {item.model}</h2> 
                            <h2>Price: ${item.cost} USD</h2>
                            </div>
                            
                    })
                    
                }
            <span>
                <button>
                    <Link to ='/checkout'>
                    Proceed to checkout
            </Link>
            </button>
            <p>Or </p>
            <button>
            <Link to ='/product'>
                Continue Shopping
            </Link>
           </button>
            </span>

           </div>
           } 
        </div>
    )
}

export default Shoppingcart