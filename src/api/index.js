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

