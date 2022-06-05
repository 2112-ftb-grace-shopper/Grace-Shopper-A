const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/models/users');
const { JWT_SECRET } = process.env;
apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  console.log("Bearer", prefix)
  const auth = req.header('Authorization');
  console.log("Auth", auth)
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    console.log("TOKEN ==>", token)
    try {
      
      const { id }  = jwt.verify(token, `${JWT_SECRET}`);
      if (id) {
        req.user = await getUserById(id);
        console.log('====requser=====', req.user)
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});
apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});
// place your routers here
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter)
const shoppingCartRouter = require('./shoppingCart');
apiRouter.use('/shoppingCart', shoppingCartRouter);
module.exports = apiRouter;