const baseURL = 'http://localhost:3000/';

export const registerNewUser = async (userObject) => {
    const url = `${baseURL}/register`;
    const response = await fetch(url, {
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

    let response;

    try{
        response = await fetch(`${baseUrl}/products`, {
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