const express = require('express');
const shoppingCartRouter = express.Router();
const { requireUser } = require('./utils');
const { getShoppingCartItemsByUser } = require('../db/models/shoppingCart');
const { default: createBreakpoints } = require('@material-ui/core/styles/createBreakpoints');
const { createProduct, getProductById, updateProduct } = require('../db');

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
        const { make, model, year, color, isAdmin } = req.body;
        const routine = await createProduct({ userId, isAdmin, make, model, year,
        color });
        return res.send(product);

    } catch (error) {
        return next(error);
    }
});

shoppingCartRouter.patch('/:productId', requireUser, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { make, model, year, color, isAdmin } = req.body;
        const product = await getProductById(productId);

        if (req.user.id !== product.userId) {
            return next({
                name: 'AdminError',
                message: 'User is not owner of this Admin'
            })
        }
        
        const updateProduct = await updateProduct({ id: productId, isAdmin, make, model,
        year, color })
        return res.send(updateProduct)

    } catch (error) {
        return next(error)
    }
})