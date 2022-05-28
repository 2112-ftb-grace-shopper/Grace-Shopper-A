const baseURL = '/api';

export const registerNewUser = async (userObject) => {
    console.log("error catching")
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
    console.log(json);

    localStorage.setItem('cars-R-Us', json.token)

    return json;
}

export const loginUser = async (userObject) => {
    const token = localStorage.getItem('cars-R-Us', json.token);
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

    const json = await response.json();
    console.log(json);
    localStorage.setItem('cars-R-Us', json.token)
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

export const postProducts = async (model,
    make,
    year,
    color,
    cost,
    min_city_mpg,
    max_city_mpg,
    min_hwy_mpg,
    max_hwy_mpg) => {
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

    export const getMyShoppingCart = async (username) => {
        const token = localStorage.getItem('User Token');
        let response;
        console.log('username ==>', username)
        try{

            response = await fetch(`${baseURL}/users/${username}/shoppingCart`, {
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

