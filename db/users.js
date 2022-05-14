// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');
// hello
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



async function getUser({username, password}) {
  try {
      const {rows: [user]} = await client.query(`
    SELECT * FROM users WHERE username = ($1);
    `, [username])

      if (password !== user.password) {
          return null
      }
      console.log(user)
      delete user.password

      return user;

  } catch (error) {
      console.error(error)
      throw(error)
  }
}


async function getUserById(id) {
  try {
      const {rows: [user]} = await client.query(`
          SELECT * FROM users WHERE id = ($1);
      `, [id])
   
      delete user.password;
      return user
  } catch (error) {
      console.error(error)
      throw error
  }

}




async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}

module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserById,
  getUser
  
};