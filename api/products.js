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

productsRouter.patch('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { model, make, year, color, cost, min_city_mpg, max_city_mpg, min_hwy_mpg, max_hwy_mpg} = req.body;
    const updateFields = {
        id: productId
    };
    
    if(model) {
        updateFields.model = model
    }

    if(make) {
        updateFields.make = make;
    }

    if(year) {
        updateFields = year;
    }

    if(color){
        updateFields = color;
    }
    
    if(cost){
        updateFields = cost;
    }
     
    if(min_city_mpg){
        updateFields = min_city_mpg;
    }

    if(max_city_mpg){
        updateFields = max_city_mpg;
    }

    if(min_hwy_mpg){
        updateFields = min_hwy_mpg;
    }

    if(max_hwy_mpg){
        updateFields = max_hwy_mpg
    }

    try{
        const originalProduct = await getProductsById(productId)

        if(originalProduct) {
            const updatedProduct = await updatedProduct(updateFields);

            res.send(updatedProduct)
        } else {
            next({
                name: "UnauthorizedProductError",
                message: "There is no product to update"
            });
        }
    } catch ({name, message }){
        next({
            name, message
        });
    }
});









