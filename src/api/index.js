const baseURL = '/api';

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

export const loginUser = async (userObject) => {
    const url = `${baseURL}/login`;
    const response = await fetch(url, {
        method: 'POST',
        header: {
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