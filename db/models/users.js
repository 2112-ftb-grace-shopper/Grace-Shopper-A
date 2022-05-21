// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');
// function to create a user

const createUser = async ({username, password, isAdmin}) => {
  try{
      console.log("creating admin status...");

      const SALT_COUNT = 10;
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

      const { rows: [users] } = await client.query(`
      INSERT INTO users (username, password, "isAdmin")
      VALUES($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING username, id, "isAdmin";
      `, [username, password, isAdmin])

      password = hashedPassword;

      return users
  } catch(error) {
      throw error
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

// function to create a user

const getUserByUsername = async (username) => {
  try{
    const { rows: [user] } = await client.query(
      `
      SELECT * FROM users
      where username = $1;
      `, [username]
    )
    return user
  } catch (error){
    throw error;
  }
}


module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  getUser

};