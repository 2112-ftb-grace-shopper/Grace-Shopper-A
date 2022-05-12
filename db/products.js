async function getProductById(id){
    try {
        const {rows:[product]} = await client.query(`
        SELECT * FROM products WHERE id = ($1);
        `, [id])
        return product;
    } catch (error) {
        console.error(error)
        throw error
    }

}