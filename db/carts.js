async function getCartItemById(id){
    try {
        const {rows:[product]} = await client.query(`
        SELECT * FROM CartItem WHERE id = ($1);
        `, [id])
        return product;
    } catch (error) {
        console.error(error)
        throw error
    }

}