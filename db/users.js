// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

// function to create a user

const createUser = async ({username, password}) => {
  try{
    console.log('creating the user...');

    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {rows: [user] } = await client.query(
      `
      INSERT INTO users (username, password)
      VALUES($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING username, id;
      `, [username, password]
    )

    password = hashedPassword;

    return user;
  } catch(error) {
    throw error;
  }
}




async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}


module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  
};