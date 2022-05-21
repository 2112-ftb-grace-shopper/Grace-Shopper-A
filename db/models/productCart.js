const  client  = require('../client');


const createProductCart = async ( { productId, cartId }) => {
    try{
        const { rows } = await client.query(`
        INSERT into product_cart ("productId", "cartId") 
        VALUES ($1, $2)
        RETURNING *
        `, [productId, cartId])

        return rows
    } catch(error){
        throw error
    }
}

const _attachProductsToProductCart = async (product) => {
    // if there are no products, return an empty array
    if(!product.length){
        return [];
    }

    try{
        // create a new array to store product Id's
        const newArr = [];

        // loop through the products and push the productId's
        // to the new array
        for(let i = 0; i < product.length; i++){
            newArr.push(product[i].id);
        }

        // join the products and productCart tables on the newArr with productId's
        const { rows: products } = await client.query(`
        SELECT product.* FROM products 
        JOIN productCart ON productCart."productId" = product.id
        WHERE product."productId" IN (${newArr.join(',')})
        `)

        // for each product 
        product.forEach((productCart) => {
            productCart.product = product.filter((productCart) => {
            return productCart.productId === products.id
            })
        })

        return products
    } catch(error){
        throw error
    }
}

const getCartByShopperId = async (cartId) => {
    try{
        const { rows: [ cart ] } = await client.query(`
        SELECT *
        FROM product_cart
        JOIN cart
        ON productCart."cartId" = cart."shopperId"
        `)
    } catch(error){
        throw error;
    }
}

module.exports = {
    _attachProductsToProductCart
}