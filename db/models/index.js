const client = require('../client');

const products = require

module.exports = {
  client,
  ...require('./users'),
  ...require('./products'),
  ...require('./shoppingCart'),
  ...require('./productCart')
};
