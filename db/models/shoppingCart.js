const client = require('../client')

const createShoppingCart = async({ productId, shopperId, total }) => {
    try{
        const {rows: [ cart ] } = await client.query(`
        INSERT INTO cart("productId", "shopperId", orderTotal, itemTotal)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [productId, shopperId, orderTotal, itemTotal] )

        return cart;
    } catch(error){
        throw error;
    }
}

const getShoppingCartItemsByUser = async (id) => {
    try{
        const { rows: [shopperId] } = await client.query(
            `
            SELECT * FROM cart 
            WHERE "shopperid"=$1;
        `, [id])

        return shopperId;
    } catch(error) {
        throw error
    }
}


const attachProductsToCart = async (product) => {
    // check if there is a product, if not, return an empty array
   if(!product.length){
       return [];
   }

   // create an empty array to store the product id's
   const newArray = [];
   // loop through the array
   for(let i = 0; i < product.length; i++){
       // push the products id into the newArray
       newArray.push(product[i].id);
   }
    try{
        const {rows: products} = await client.query(`
        SELECT product.* FROM products 
        JOIN cart ON cart."productId" = product.id
        WHERE product."productId" IN (${newArray.join(',')})
        `, [products])

        return product;
    } catch(error){
        throw error
    }
}

async function updateCart({ id, orderTotal, itemTotal }) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
     try{
         if(setString.length < 0 ) return undefined 
         
         const { rows: [newShoppingCart] } = await client.query(`
         UPDATE products
         SET ${setString}
         WHERE id=${fields.id}
         RETURNING *;
         `, Object.values(fields))
         return newShoppingCart;
     } catch(error){
         throw error
     }
}

async function getCartItemById(id){
    try {
        const {rows:[product]} = await client.query(`
        SELECT * FROM cart WHERE id = ($1);
        `, [id])
        return product;
    } catch (error) {
        console.error(error)
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
            `,[id]) 

        return product
    } catch(error){
        throw error
    }
}


module.exports = {
    getShoppingCartItemsByUser,
    createShoppingCart,
    attachProductsToCart,
    updateCart,
    getCartItemById,
    destroyShoppingCartItem
}