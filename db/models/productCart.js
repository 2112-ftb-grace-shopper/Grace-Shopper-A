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

// front end displaying products to shopping cart, one at a time
// getting products to cart
// select all from product cart
// join the product cart items to the cart table
// filter by cartId
const getShoppingCart = async (cartId) => {

    try{

        const { rows: products } = await client.query(`
        SELECT product_cart.* FROM product_cart 
        JOIN products ON product_cart."productId" = products.id
        WHERE product_cart."cartId" = ${cartId}
        `)

        return products
    } catch(error){
        throw error
    }
}

const getCartByShopperId = async () => {

    try{
        const { rows: cart  } = await client.query(`
        SELECT cart."shopperId" as "cartId", product_cart.*
        FROM product_cart
        JOIN cart
        ON product_cart."cartId" = cart."shopperId"
        `, )

        const userCartWithProducts = await attachProductsToProductCart(cart)

        return userCartWithProducts
    } catch(error){
        throw error;
    }
}

module.exports = {
    getShoppingCart,
    createProductCart,
    getCartByShopperId
}