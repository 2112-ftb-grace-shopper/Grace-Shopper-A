const express = require('./express')
const productsRouter = express.Router();
const { createProducts, getAllProducts, getProductsById} = require('../db/products');


productsRouter.use((req, res, next) => {
    console.log("making a request to /products");

    next();
});

productsRouter.get('/', async (req, res, next) => {
    try{
        const allProducts = await getAllProducts();

        res.send(allProducts);
    } catch({name, message}) {
        next({name, message});
    }
});

productsRouter.post('/', async (req, res, next) => {
    const { 
        model,
        make,
        year,
        color,
        cost,
        min_city_mpg,
        max_city_mpg,
        min_hwy_mpg,
        max_hwy_mpg } = req.body;
        
        try{
            const products = await createProducts({ 
                model,
                make,
                year,
                color,
                cost,
                min_city_mpg,
                max_city_mpg,
                min_hwy_mpg,
                max_hwy_mpg
            })
            res.send(products);
        } catch({name, message}) {
            next( {name, message })
        }
}); 



