const baseURL = '/api';

export const getAllUsers = async () => {
    try{
        let response = await fetch(`${baseURL}/users`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const returnedUsers = await response.json()
        return returnedUsers;
    } catch(error){
        console.log("Error getting all users")
        throw error;
    }
}

export const registerNewUser = async (userObject) => {
    
    console.log("userObject", userObject)
    const response = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: userObject.username,
            password: userObject.password
        }),
    });
    const json = await response.json();
    const user = json.user
    
    console.log('JSON', json);
    console.log('USER==>', user)
    console.log('userObject', userObject)

    localStorage.setItem('userToken', json.token);
    localStorage.setItem('Username', user.username);
    localStorage.setItem('userId', user.id);

    return json;
}

export const loginUser = async (userObject) => {
    console.log('userobject ==>', userObject)
    const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: userObject.username,
            password: userObject.password
        }),
    });
    console.log('userObject', userObject)
    console.log('RESPONSE', response)

    const json = await response.json();
    const user = json.user
    
    console.log('JSON', json);
    console.log('JSON USER==>', user)
    console.log('userObject', userObject)

    if(!user){
        return false
    } else {
        localStorage.setItem('userToken', json.token);
        localStorage.setItem('Username', user.username);
        localStorage.setItem('userId', user.id);  
    }
    return user;
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
            // if logged in return json response
            if(token){
            response = await fetch(`${baseURL}/shoppingCart`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const json = await response.json()
            console.log('JSONCART ==>', json)
            return json
        } else {
            // non logged in users saved to local storage
           const notLoggedInCart = localStorage.getItem('cart');
           // un-stringifies
           return JSON.parse(notLoggedInCart)        }
    
        } catch(error) {
            console.log('Error getting shopping cart');
            throw error;
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