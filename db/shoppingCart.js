const client = require('../client')



const getShoppingCartItemsByUser = async (id) => {
    try{
        const { rows: [shopperId] } = await client.query(
            `
            SELECT * FROM cart 
            WHERE id=$1;
        `, [id])

        return shopperId;
    } catch(error) {
        throw error
    }
}



const addProductsToCart = async ( {productId, shopperId, total } ) => {
    try{

        const { rows: [product] } = await client.query(
            `
            INSERT INTO cart("productId, "shopperId", total)
            VALUES($1, $2, $3, $4)
            RETURNING *
            `, [productId, shopperId, total])

            return product

    } catch(error){
        throw error
    }
}


const destroyShoppingCartItem = async (id) => {
    try{
        const {rows: [product] } = await client.query(
            `
            DELETE FROM cart
            WHERE "productId"=$1
            RETURNING *
            `,[id]
        ) 

        return product
    } catch(error){
        throw error
    }
}

module.exports = {
    getShoppingCartItemsByUser,
    addProductsToCart,
    destroyShoppingCartItem
}