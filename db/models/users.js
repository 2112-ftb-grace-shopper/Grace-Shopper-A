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
      INSERT INTO users (username, password)
      VALUES($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING username, id, "isAdmin";
      `, [username, password])

      password = hashedPassword;

      return users;
  } catch(error) {
      throw error
  }
}

const getAllUsers = async () => {
  try{
      console.log('AM I IN THIS USERS TRY')
      const { rows: users } = await client.query(`
      SELECT * 
      FROM users
      `)

      console.log("these are our users", users)

      return users
  } catch(error){
      throw error
  }
}


// async function getUser({username, password}) {
//   try {
//       const {rows: [user]} = await client.query(`
//     SELECT * FROM users WHERE username = ($1);
//     `, [username])

//       console.log('This is the username', username)
//       console.log("This is the password", password)
//       if (password !== user.password) {
//           return null
//       }
//       console.log("This is the user", user)
//       delete user.password

//       return user;

//   } catch (error) {
//       console.error(error)
//       throw(error)
//   }
// }

// function to get a user by their username and verified Id
const getUser = async ( username, password ) => {
  console.log('username', username)
  console.log('password ==>', password)
 
	try {
		const user = await getUserByUsername(username);
    console.log("this is the user function:", user)
		const hashedPassword = user.password;
		const verifyPassword = await bcrypt.compare(password, hashedPassword);
    console.log('PW', password);
    console.log('HPW', hashedPassword);
    console.log('verifiedPW', verifyPassword)

		if (verifyPassword) {
			delete user.password;
      console.log('User after deleted password', user)
			return user;
		} 
	} catch (error) {
		throw error;
	}
};

// async function getUser( username, password ) {
//   try {
//       const user = await getUserByUsername(username);
//       if(!user) return;
//       const hashedPassword = user.password;
//       const passwordsMatch = await bcrypt.compare(password, hashedPassword);
//       if (passwordsMatch) {
//           const { rows: [selectedUser] } = await client.query(`
//           SELECT *
//           FROM users
//           WHERE username=$1 and password=$2;
//           `, [username, hashedPassword]);
//           delete selectedUser.password;
//           return selectedUser;
//       } 
//   } catch (error) {
//       throw error;
//   }
// }


const getUserById = async (id) => {
	const { rows: [ user ] } = await client.query(
		`
    SELECT * FROM users 
    where id = $1`,
		[ id ]
	);

	return user;
};

// async function getUserById(id) {
//   try {
//       const {rows: [user]} = await client.query(`
//           SELECT * FROM users WHERE id = ($1);
//       `, [id])
   
//       delete user.password;
//       return user
//   } catch (error) {
//       console.error(error)
//       throw error
//   }

// }

// async function getAllUsers() {
//   /* this adapter should fetch a list of users from your db */
//   try{
//     const { rows [ user ]}
//   }
// }

// function to create a user

const getUserByUsername = async (username) => {
  try{
    console.log('username:', username)
    const { rows: [user] } = await client.query(
      `
      SELECT * FROM users
      where username = $1;
      `, [username]
    )
    console.log(user)
    return user
  } catch (error){
    throw error;
  }
}


module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getUser,
  getAllUsers
};