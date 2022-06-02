const express = require('express');
const shoppingCartRouter = express.Router();
const { requireUser } = require('./utils');
const { getShoppingCartItemsByUser } = require('../db/models/shoppingCart');
const { default: createBreakpoints } = require('@material-ui/core/styles/createBreakpoints');
// const { createProduct, getProductById, updateProduct, getUserByUsername, attachProductsToProductCart } = require('../db');
const productsRouter = require('./products');
const {attachProductsToProductCart} = require('../db/models/productCart')

shoppingCartRouter.use((req, res, next) => {
    console.log('A request is being made to /shoppingcart');
    next();
});

shoppingCartRouter.get('/', requireUser, async (req, res, next) => {
    try {
        // console.log('require', requ)
        const user = req.user;
        const id = user.id
        console.log('userID', id)
        console.log('in this try')
        // get attachProductToProductCart should be called here instead. That is our cart function
        const shoppingCart = await getShoppingCartItemsByUser(id);
        console.log("shoppingCart ==>", shoppingCart)
        return res.send(shoppingCart)
    } catch ( error ) {
        return next(error)
    }
});

shoppingCartRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const shopperId = req.user.id;
        const { orderTotal, itemTotal } = req.body;
        const shoppingCart = await shoppingCart({ shopperId, orderTotal, itemTotal });
        console.log(shoppingCart)
        return res.send(shoppingCart);

    } catch (error) {
        return next(error);
    }
}); 

shoppingCartRouter.patch('/:shoppingCartId', requireUser, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { make, model, year, color } = req.body;
        const product = await getShoppingCartItemsByUser(productId);

        if (req.user.id !== product.userId) {
            return next({
                name: 'AdminError',
                message: 'User is not owner of this Admin'
            })
        }
        
        const updateCart = await updateCart({ id: productId, make, model,
        year, color })
        return res.send(updateCart)

    } catch (error) {
        return next(error)
    }
});

shoppingCartRouter.delete('/:shoppingCartId', requireUser, async (req, res, next) => {
    try {
            const { productId } = req.params;
            const product = await getProductById(productId)

            if (req.user.id !== product.productId) {
                return next({
                    name: 'OwnerError',
                    message: 'User is not owner of cart'
                })
            }
        
            await destroyShoppingCartItem(productId);
            product.success = true;
            return res.send(shoppingCart)
    } catch (error) {
        return next(error)
    }
});

// shoppingCartRouter.post('/:cartId/shoppingCart', async (req, res, next) => {
//     const cartId = req.params;

//     try{
//         const productOnShoppingCart = await attachProductsToProductCart(cartId);

//         res.send(productOnShoppingCart);
//     } catch (error){
//         throw error;
//     }
// })

module.exports = shoppingCartRouter