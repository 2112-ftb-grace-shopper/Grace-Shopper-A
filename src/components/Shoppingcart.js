
   
import React, {useEffect, useState } from "react";
import { getMyShoppingCart } from "../api";
import { Link } from "react-router-dom";
import '../style/Shoppingcart.css';



const Shoppingcart = (props) => {
    const {shoppingCart, setShoppingCart } = props;

    useEffect(() => {
        (async () => {
            const shoppingCarts = await getMyShoppingCart();
            console.log(shoppingCarts)
            setShoppingCart(shoppingCarts);
        })();
    },[]);

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
               <h1>Here are your shopping cart items!</h1>
                       {
                    shoppingCart.map(shoppingCart => {
                        return <div className = 'content' key = {shoppingCart.id}>
                            <h2>Shopping Cart: {shoppingCart.shopperId}</h2> 
                            <h2>Order total: {shoppingCart.orderTotal}</h2>
                            </div>
                    })
                }
           </div>
           } 
        </div>
    )
}

export default Shoppingcart