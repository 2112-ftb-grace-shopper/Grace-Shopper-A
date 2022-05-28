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
        <div>
            <div className="shopping-cart-content">
                {
                    shoppingCart.map(shoppingCart => {
                        return <div className = 'content' key = {shoppingCart.id}>
                            <h2>Shopping Cart: {shoppingCart.shopperId}</h2> 
                            <h2>Order total: {shoppingCart.orderTotal}</h2>
                            </div>
                    })
                }
            </div>
        <Link to='/Navbar'> Back </Link>
        </div>
    )
}

export default Shoppingcart