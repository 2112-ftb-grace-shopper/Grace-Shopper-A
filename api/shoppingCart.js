const express = require('express');
const shoppingCartRouter = express.Router();
const { requireUser } = require('./utils');
const { getShoppingCartItemsByUser } = require('../db/shoppingCart');

routinesRouter.use((req, res, next) => {
    console.log('A request is being made to /shoppingcart');
    next();
});