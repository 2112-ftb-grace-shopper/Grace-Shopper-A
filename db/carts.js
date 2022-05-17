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

async function updateCart({ id, name, price, description, quantity }) {
    try { 
        const { rows: [product] } = await client.query(`UPDATE products
            SET name=${name},
            description=${description},
            price=${price}
            quantity=${quantity}
            WHERE id=$1
            RETURNING *;
        `, [id])
        return product;
    } catch (error) {
      return error;
    }
}

