const baseURL = '/api';

export const registerNewUser = async (userObject) => {
    const url = `${baseURL}/users`;
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
    const url = `${baseURL}/users`;
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

export const getProducts = async () => {
    const url = `${baseURL}/products`;
    const response = await fetch(url, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(console.error);

  return response
};