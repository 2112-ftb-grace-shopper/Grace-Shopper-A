
   
import React, {useEffect, useInsertionEffect, useState } from "react";
import { getAllProducts, getMyShoppingCart, postProductToShoppingCart, postProducts } from "../api";
import { Link } from "react-router-dom";
import '../style/Shoppingcart.css';



const Shoppingcart = (props) => {
    const {shoppingCart, setShoppingCart } = props;
    const {product, setProduct} = props;
    const [ productId, setProductId] = useState(0);


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
               <h1>Here are your shopping cart items!</h1>
                       {
                    shoppingCart.map((item, index) => {
                        return <div className = 'content' key = {`${index}, ${item.id}`}>
                            <h2>Shopping Cart: {item.shopperId}</h2> 
                            <h2>Order total: {item.orderTotal}</h2>
                            </div>
                    })
                }
           </div>
           } 
        </div>
    )
}

export default Shoppingcart