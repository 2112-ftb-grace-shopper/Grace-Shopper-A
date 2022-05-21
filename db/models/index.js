const client = require('./client');
const models = require('./models');

const products = require

module.exports = {
  client,
  ...models,
  ...require('./users'),
  ...require('./products'),
  ...require('./shoppingCart'),
  ...require('./carts')
};
