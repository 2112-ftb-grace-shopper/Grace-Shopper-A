const { client } = require('./client');
const { createUser } = require('./users')

async function dropTables() {
  console.log('Dropping All Tables...');

    try {
      await client.query(`
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS admin_users
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
      CREATE TABLE admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        adminStatus BOOLEAN DEFAULT false
      );
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        model VARCHAR(255) UNIQUE NOT NULL,
        make VARCHAR(255) UNIQUE NOT NULL,
        year INTEGER,
        color VARCHAR(255) UNIQUE NOT NULL,
        min_city_mpg INTEGER,
        max_city_mpg INTEGER,
        min_hwy_mpg INTEGER,
        max_hwy_mpg INTEGER,
      );
      `);
      console.log('Finished building the tables!');
  } catch (error) {
    console.log('Error bulding tables!');
    throw error;
  }
}

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      { username: 'Connor', password: 'alpha323' },
      { username: 'Shane', password: 'tango454' },
      { username: 'John', password: 'yankee560' },
      { username: 'Allen', password: 'casino097' },
    ]
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
      { id: "3N1CN7APXEL766737",model:"Sonata",make:"Hyundai",year:2007,color:"Pink",min_city_mpg:75,max_city_mpg:36,min_hwy_mpg:12,max_hwy_mpg:59 },
      { id: "1C4SDHCT9CC132954",model:"Expedition EL",make:"Ford",year:2009,color:"Pink",min_city_mpg:98,max_city_mpg:7,min_hwy_mpg:11,max_hwy_mpg:80 },
      { id: "1G4PP5SK6D4703294",model:"CR-V",make:"Honda",year:2007,color:"Indigo",min_city_mpg:28,max_city_mpg:17,min_hwy_mpg:29,max_hwy_mpg:2 },
      { id:"3VW4T7AT6EM514155",model:"Sunfire",make:"Pontiac",year:1996,color:"Indigo",min_city_mpg:47,max_city_mpg:74,min_hwy_mpg:61,max_hwy_mpg:70 },
      { id:"KNADH4A31B6551156",model:"Bronco II",make:"Ford",year:1985,color:"Teal",min_city_mpg:78,max_city_mpg:25,min_hwy_mpg:67,max_hwy_mpg:66 },
      { id:"WAUFFAFCXDN772690",model:"Escalade EXT",make:"Cadillac",year:2006,color:"Red",min_city_mpg:4,max_city_mpg:29,min_hwy_mpg:61,max_hwy_mpg:32 },
      { id:"YV426MDB8F2459183",model:"A3",make:"Audi",year:2010,color:"Mauv",min_city_mpg:2,max_city_mpg:10,min_hwy_mpg:15,max_hwy_mpg:84 },
      { id:"WAUEH94F67N950634",model:"RX",make:"Lexus",year:2002,color:"Teal",min_city_mpg:5,max_city_mpg:84,min_hwy_mpg:46,max_hwy_mpg:87 },
      { id:"WBAYP9C57FD001512",model:"Swift",make:"Suzuki",year:1997,color:"Blue",min_city_mpg:76,max_city_mpg:65,min_hwy_mpg:79,max_hwy_mpg:82 },
      { id:"KNADM5A35F6290945",model:"NSX",make:"Acura",year:2003,color:"Crimson",min_city_mpg:62,max_city_mpg:87,min_hwy_mpg:40,max_hwy_mpg:35 },
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('products created:');
    console.log(products);

    console.log('Finished creating products!');
  } catch (error) {
    console.error('Error creating products!');
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
