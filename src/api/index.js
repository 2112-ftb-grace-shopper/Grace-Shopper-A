// import { token } from "morgan";

const baseURL = '/api';

export const registerNewUser = async (userObject) => {
    
    console.log("userObject", userObject)
    const response = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: userObject.user,
            password: userObject.password
        }),
    });
    const json = await response.json();
    console.log('JSON', json);
    console.log('userObject', userObject)

    localStorage.setItem('userToken', json.token)
    localStorage.setItem('Username', userObject.user);
    localStorage.setItem('userId', userObject.id)

    return json;
}

export const loginUser = async (userObject) => {
    const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: userObject.user,
            password: userObject.password
        }),
    });
    console.log('userObject', userObject)
    console.log('RESPONSE', response)

    const json = await response.json();
    console.log('json', json);

    localStorage.setItem('userToken', json.token)
    localStorage.setItem('Username', userObject.user);
    localStorage.setItem('userId', userObject.id)

    return json;
}

export const testAuthentication = async (token) => {
    const url = `${baseURL}/users/me`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(console.error);

    return response;
}

export const getAllProducts = async () => {
    try{
        let response = await fetch(`${baseURL}/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const returnedProducts = await response.json()
        return returnedProducts;
    } catch(error){
        console.log("Error getting all products")
        throw error;
    }
}

export const postProducts = async (model,make,year,color,cost,min_city_mpg,max_city_mpg, min_hwy_mpg,max_hwy_mpg) => {
        const token = localStorage.getItem('UserToken');
        let response;
        try{
            response  = await fetch(`${baseURL}/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    make: make,
                    model: model,
                    year: year, 
                    color: color,
                    cost: cost,
                    min_city_mpg: min_city_mpg,
                    max_city_mpg: max_city_mpg,
                    min_hwy_mpg: min_hwy_mpg,
                    max_hwy_mpg: max_hwy_mpg
                })
            })
            const postedProducts = await response.json();
            console.log("These are the products to post", postedProducts)
            return postedProducts;
        
        } catch(error){

        }
    }

    export const getMyShoppingCart = async () => {
        const token = localStorage.getItem('userToken');
        console.log('TOKEN FE ==>', token)
        const username = localStorage.getItem('Username');
        let response;
        console.log('username ==>', username)
        try{

            response = await fetch(`${baseURL}/shoppingCart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const json = await response.json()
            return json;
    
        } catch(error) {
            console.log('Error getting shopping cart');
            throw error
        }
    }

    export const updateProduct = async (productId, make, model, cost) => {
        let response;
        try{
            response = await fetch(`${baseURL}/products${productId}`,{
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    {make: make, model: model, cost: cost}
                )
            })
            const updatedProduct = await response.json();
            return updatedProduct;
        } catch(error){
            console.log("error updating product")
            throw error
        }
    }

    export const postProductToShoppingCart = async (cartId, productId) => {
        const token = localStorage.getItem('UserToken');
        let response;
        try{
            response = await fetch(`${baseURL}/${cartId}/shoppingCart`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer" + token
                },
                body: JSON.stringify(
                    {cartId, productId}
                )
            })
            const postedProductsToShoppingCart = await response.json();
            return postedProductsToShoppingCart;
        } catch(error){
            console.log("Error posting product to shopping cart!")
            throw error
        }
    }