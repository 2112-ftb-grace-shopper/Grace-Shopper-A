const  client  = require('./client');
const { createUser, getUser, getUserByUsername } = require('./models/users')
const { createProduct } = require('./models/products')
const {createShoppingCart} = require('./models/shoppingCart');
const {attachProductsToProductCart, createProductCart, getCartByShopperId} = require('./models/productCart')


async function dropTables() {
  console.log('Dropping All Tables...');

    try {
      console.log("GETTING INTO TRY");
      await client.query(`
        DROP TABLE IF EXISTS product_cart;
        DROP TABLE IF EXISTS cart;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
        `);

        console.log('Finished dropping the tables!');
    } catch (error) {
      console.log('Error dropping tables!');
      throw error;
    }
}

async function createTables() {
  console.log('Starting to build tables...');

  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        model VARCHAR(255) NOT NULL,
        make VARCHAR(255) NOT NULL,
        year INTEGER,
        color VARCHAR(255) NOT NULL,
        cost INTEGER NOT NULL,
        min_city_mpg INTEGER,
        max_city_mpg INTEGER,
        min_hwy_mpg INTEGER,
        max_hwy_mpg INTEGER
      );
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        "shopperId" INTEGER REFERENCES users(id),
        "orderTotal" INTEGER,
        "itemTotal" INTEGER
      );

      CREATE TABLE product_cart(
        "productId" INTEGER REFERENCES products(id),
        "cartId" INTEGER REFERENCES cart(id)
      );
      `);
      // add id to product_cart
      // add quantity
      console.log('Finished building the tables!');
  } catch (error) {
    console.log('Error bulding tables!');
    throw error;
  }
}

const usersToCreate = [
  { username: 'Connor', password: 'alpha323', isAdmin: true },
  { username: 'Shane', password: 'tango454', isAdmin: false },
  { username: 'John', password: 'yankee560', isAdmin: true },
  { username: 'Allen', password: 'casino097', isAdmin: true },
]

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {

    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log('Starting to create products...');

    const productsToCreate = [
      { id:"JA32X8HW0CU247445",model:"Rodeo",make:"Isuzu",year:1995,color:"Crimson",min_city_mpg:10,max_city_mpg:33,min_hwy_mpg:22,max_hwy_mpg:9,cost:12096 },
      { id:"5N1AN0NU9CC188162",model:"7 Series",make:"BMW",year:2006,color:"Turquoise",min_city_mpg:28,max_city_mpg:21,min_hwy_mpg:33,max_hwy_mpg:14,cost:42159 },
      { id:"5FNRL3H22AB373906",model:"SVX",make:"Subaru",year:1996,color:"Purple",min_city_mpg:27,max_city_mpg:19,min_hwy_mpg:29,max_hwy_mpg:16,cost:6109 },
      { id:"WAUUL78E28A105837",model:"Malibu",make:"Chevrolet",year:2007,color:"Teal",min_city_mpg:23,max_city_mpg:28,min_hwy_mpg:22,max_hwy_mpg:18,cost:44962 },
      { id:"1GD21XEG2FZ577746",model:"Lancer",make:"Mitsubishi",year:2003,color:"Violet",min_city_mpg:14,max_city_mpg:32,min_hwy_mpg:31,max_hwy_mpg:29,cost:6539 },
      { id:"1VWAP7A37EC620803",model:"Maxima",make:"Nissan",year:2012,color:"Khaki",min_city_mpg:34,max_city_mpg:24,min_hwy_mpg:20,max_hwy_mpg:32,cost:46130 },
      { id:"1GYFK43868R553802",model:"QX56",make:"Infiniti",year:2012,color:"Orange",min_city_mpg:18,max_city_mpg:12,min_hwy_mpg:8,max_hwy_mpg:23,cost:44518 },
      { id:"3VW467AT4DM644036",model:"E-Series",make:"Ford",year:2004,color:"Maroon",min_city_mpg:14,max_city_mpg:31,min_hwy_mpg:9,max_hwy_mpg:8,cost:17688 },
      { id:"1FMJK1FT4FE520230",model:"Camaro",make:"Chevrolet",year:1973,color:"Orange",min_city_mpg:18,max_city_mpg:14,min_hwy_mpg:13,max_hwy_mpg:14,cost:25712 },
      { id:"WAULC58E94A755419",model:"Talon",make:"Eagle",year:1996,color:"Violet",min_city_mpg:9,max_city_mpg:14,min_hwy_mpg:11,max_hwy_mpg:29,cost:23964 },
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('products created:');
    console.log(products);
    console.log(products[3].id)

    console.log('Finished creating products!');
  } catch (error) {
    console.error('Error creating products!');
    throw error;
  }
}

async function createInitialShoppingCart() {
  try{
    console.log('starting to create a shopping cart...');
    const user = await getUserByUsername(usersToCreate[0].username);
    console.log("This is the user ===>", user)

    const shoppingCartToCreate = [
      {id: 1, shopperId: user.id, orderTotal: 123456, itemTotal: 3}
    ]

    const shoppingCarts = await Promise.all(shoppingCartToCreate.map((shoppingCart) => createShoppingCart(shoppingCart)));
    console.log("Shopping Cart Created:", shoppingCarts);


    const productsOnShoppingCartToCreate = [
      {productId: 1, cartId: shoppingCarts[0].id }
    ]
    const productsOnCart = await Promise.all(productsOnShoppingCartToCreate.map((productCart) => createProductCart(productCart)));
    console.log('products on cart ===>', productsOnCart)
    console.log('Finished creating shopping carts')
  } catch(error){
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialShoppingCart();

    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

rebuildDB()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  rebuildDB
};
