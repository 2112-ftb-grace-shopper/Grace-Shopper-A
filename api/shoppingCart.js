const express = require('express');
const shoppingCartRouter = express.Router();
const { requireUser } = require('./utils');
const { getShoppingCartItemsByUser } = require('../db/models/shoppingCart');
const { default: createBreakpoints } = require('@material-ui/core/styles/createBreakpoints');
const { createProduct, getProductById, updateProduct } = require('../db');
const productsRouter = require('./products');

shoppingCartRouter.use((req, res, next) => {
    console.log('A request is being made to /shoppingcart');
    next();
});

shoppingCartRouter.get('/', requireUser, async (req, res, next) => {
    try {
        const shoppingCart = await getShoppingCartItemsByUser();
        return res.send(shoppingCart)
    } catch ({ name, message }) {
        return next({ name, message })
    }

});

shoppingCartRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { make, model, year, color } = req.body;
        const product = await createProduct({ userId, make, model, year,
        color });
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

module.exports = productsRouter