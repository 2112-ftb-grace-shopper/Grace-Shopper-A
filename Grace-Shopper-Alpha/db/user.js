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
