const client = require('./client');
const bcrypt = require('bcrypt');

const createAdminUser = async ({username, password, isAdmin}) => {
    try{
        console.log("creating admin status...");

        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

        const { rows: [admin_users] } = await client.query(`
        INSERT INTO admin_users (username, password, "isAdmin")
        VALUES($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING username, id, "isAdmin";
        `, [username, password, isAdmin])

        password = hashedPassword;
    
        return admin_users
    } catch(error) {
        throw error
    }
}

module.exports = {
    createAdminUser
}