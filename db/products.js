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

module.exports = {
    createProduct,
}