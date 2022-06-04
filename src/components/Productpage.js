import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { getAllProducts, postProducts } from "../api/index";
import '../style/Productpage.css';
import { getMyShoppingCart } from "../api/index";
// import Card from '@material-ui/core/Card'
// import { CardContent } from '@material-ui/core'

import firstCar from '../assets/images/1.png';
import secondCar from '../assets/images/2.png';
import thirdCar from '../assets/images/3.jpeg';
import fourthCar from '../assets/images/4.jpeg';
import fifthCar from '../assets/images/5.jpeg';
import sixthCar from '../assets/images/6.jpeg';
import seventhCar from '../assets/images/7.png';
import eighthCar from '../assets/images/8.jpeg';
import ninethCar from '../assets/images/9.png';
import tenthCar from '../assets/images/10.png';

const Productpage = (props) => {
    const { products, setProducts } = props;
    // const [ productId, setProductId] = useState(0);
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
            let products = await getAllProducts();
            products[0].car = firstCar;
            products[1].car = secondCar;
            products[2].car = thirdCar;
            products[3].car = fourthCar;
            products[4].car = fifthCar;
            products[5].car = sixthCar;
            products[6].car = seventhCar;
            products[7].car = eighthCar;
            products[8].car = ninethCar;
            products[9].car = tenthCar;
            setProducts(products)
        })();
    }, []);


    const handleAddToCartButton = async (event) => {
        event.preventDefault();
        let userId = localStorage.getItem('userId')
        console.log('user', userId);
        const shoppingCart = await getMyShoppingCart()
        console.log('PRODUCTSHOPPINGCART', shoppingCart);

        shoppingCart.push(products)
        localStorage.setItem('cart', JSON.stringify(shoppingCart));

        // either store logged in user
        
    }
    //     const newProduct = await postProducts( model, make, year, color, cost, min_city_mpg, max_city_mpg, min_hwy_mpg, max_hwy_mpg )
    
    //     const model = newProduct.model;
    //     const make = newProduct.make;
    //     const year = newProduct.year;
    //     const color = newProduct.color;
    //     const cost = newProduct.cost;
    //     const min_city_mpg = newProduct.min_city_mpg;
    //     const max_city_mpg = newProduct.max_city_mpg;
    //     const min_hwy_mpg = newProduct.min_hwy_mpg;
    //     const max_hwy_mpg = newProduct.max_hwy_mpg;

    //     setModel(model);
    //     setMake(make);
    //     setYear(year);
    //     setColor(color);
    //     setCost(cost);
    //     setMin_City_Mpg(min_city_mpg);
    //     setMax_City_Mpg(max_city_mpg);
    //     setMin_Hwy_Mpg(min_hwy_mpg);
    //     setMax_Hwy_Mpg(max_hwy_mpg);


    return(
        <div>
            <h1>In the products Page</h1>
        <div className = "productsBox">
        <h1>Take a look at our selection of cars!</h1>
 

        {
            products.map(products => {
               return <div className = "content" key = {products.id}>
                    <div className="column">
                      <div>

                    <h2>Product: {products.make} </h2> 
                    <h2>Model: {products.model} </h2>
                    <h2>Make: {products.make}</h2>
                    <h3>Year: {products.year}</h3>
                    <h3>Cost: ${products.cost}</h3>
                    <button onClick={(event) => {handleAddToCartButton(event)}}>Add to cart</button>

                    </div>
                    
                    <div className="car-image">
                      <img src={products.car} width="200" height="200"/>
                      
                    </div>
 
                    </div>

                </div>
            })
        }
        </div>
        <Link to= '/Navbar'>Back</Link>
        </div>
    )

} 

export default Productpage