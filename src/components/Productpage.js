import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { getAllProducts, postProducts } from "../api/index";
import '../style/Productpage.css';

const Productpage = () => {
    const [ products, setProducts ] = useState([]);

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
        <div className = "productsBox">
        <h1>Take a look at our selection of cars!</h1>
 

        {
            products.map(products => {
               return <div className = "content" key = {products.id}>
                    <h2> Product: {products.make} </h2> 
                    <h2>Model: {products.model} </h2>
                </div>
            })
        }
        </div>
        <Link to= '/Navbar'>Back</Link>
        </div>
    )

} 

export default Productpage