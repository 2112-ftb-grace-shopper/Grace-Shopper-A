import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAllProducts } from "../api";
import '../style/Productpage.css';

const Productpage = (props) => {
    const {products, setProducts} = props;

    useEffect(() => {
        (async () => {
            const products = await getAllProducts();
            console.log("products", products);
            setProducts(products)
        })();
    }, []);


    return(
        <div>

            <h1>In the products Page</h1>
        {/* <div className = "productsBox">
        <h1>Take a look at our selection of cars!</h1>
 

        {
            products.map(product => {
                <div className = "content" key = {product.id}>
                    <h2> Product: {product} </h2> 
                </div>
            })
        }
        </div> */}
        <Link to= '/Navbar'>Back</Link>
        </div>
    )

} 

export default Productpage