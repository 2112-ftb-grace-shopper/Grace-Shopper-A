const express = require('express');
const shoppingCartRouter = express.Router();
const { requireUser } = require('./utils');
const { getShoppingCartItemsByUser } = require('../db/shoppingCart');

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

routinesRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const creatorId = req.user.id;
        const { name, goal, isPublic } = req.body;
        const routine = await createRoutine({ creatorId, isPublic, name, goal });
        return res.send(routine);

    } catch ({ name, message }) {
        return next({ name, message });
    }
});