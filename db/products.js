const  client  = require('./client');


const createProduct = async ( { 
    model,
    make,
    year,
    color,
    cost,
    min_city_mpg,
    max_city_mpg,
    min_hwy_mpg,
    max_hwy_mpg
}) => {
    try{
        const {rows: product} = await client.query(`
        INSERT INTO products (model,
            make,
            year,
            color,
            cost,
            min_city_mpg,
            max_city_mpg,
            min_hwy_mpg,
            max_hwy_mpg)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `,[ model,
            make,
            year,
            color,
            cost,
            min_city_mpg,
            max_city_mpg,
            min_hwy_mpg,
            max_hwy_mpg])

            return product
    } catch(error){
        throw error
    }
}


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

module.exports = {
    createProduct,
}