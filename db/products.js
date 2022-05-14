
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




async function updateProduct ({id, name, description, price}) {
    try {
        const fields = {};
        if (name) {
            fields.name = name
        }
        if (description) {
            fields.description = description
        }
        if (id){
            fields.id = id
        }
        if (price){
            fields.price = price
        }
        const setString = Object.keys(fields).map(

            (key, index) => `"${key}"=$${index + 2
                }`
        ).join(', ');
        const { rows: [product] } = await client.query(`
          UPDATE products
          SET name=${name},
          description=${description},
          price=${price}
          WHERE id=$1
          RETURNING *;
        `, [id, ...Object.values(fields)])



        return product;
    } catch (error) {
        throw error;
    }

} 

}

