
   
import React, {useEffect, useState } from "react";
import { getAllProducts, getMyShoppingCart, postProductToShoppingCart, postProducts } from "../api";
import { Link } from "react-router-dom";
import '../style/Shoppingcart.css';



const Shoppingcart = (props) => {
    const {shoppingCart, setShoppingCart } = props;
    const {product, setProduct} = props;
    const [ productId, setProductId] = useState(0);
    // const [model, setModel] = useState('');
    // const [make, setMake ] = useState('');
    // const [year, setYear] = useState(0);
    // const [color, setColor] = useState('')
    // const [cost, setCost ] = useState(0);
    // const [min_city_mpg, setMin_City_Mpg] = useState(0);
    // const [max_city_mpg, setMax_City_Mpg] = useState(0);
    // const [min_hwy_mpg, setMin_Hwy_Mpg] = useState(0);
    // const [max_hwy_mpg, setMax_Hwy_Mpg] = useState(0);

    useEffect(() => {
        (async () => {
            const shoppingCart = await getMyShoppingCart();
            console.log(shoppingCart)
            setShoppingCart(shoppingCart);
        })();
    },[]);

    // const addToCart = (productId) => {
    //     if(productId) {
    //         shoppingCart.add(productId)
    //     }
    // }

    


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