const express = require('express');
const jwt = require('jsonwebtoken');
const usersRouter = express.Router();
const { getUserByUsername, createUser, getAllUsers, getUser } = require('../db/models/users');
const { getShoppingCartItemsByUser } = require('../db/models/shoppingCart')
const bcrypt = require('bcrypt');  
const { user } = require('pg/lib/defaults');

usersRouter.use((req, res, next) => {
    console.log('A request is being made to /users');
    next();
});

usersRouter.get('/', async (req, res, next) => {
    try{
        console.log("IN THE TRY")
        const allUsers = await getAllUsers();

        console.log("getting all users", allUsers)

        res.send(allUsers);
    } catch(error) {
        next(error);
    }
});

usersRouter.post('/register', async (req, res, next) => {

    try {
        console.log("IN THE TRY")
        const { username, password } = req.body;
        console.log('===hitting here===', req.body);
        const newUser = await createUser({username,password});
        console.log('=====newUSER=====', newUser)
        const _user = await getUserByUsername(username);
        console.log("=====PW ===", password)
        console.log('_USER==>', _user)
        console.log("AGAIN IN TRY")
        if (_user === newUser) {
            return next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        }
        if (password.length < 8) {
            return next({
                name: 'PasswordTooShort',
                message: 'Password length is less than 8 characters'
            });
        }

        console.log('the username =>', username)
        console.log("newUser ===>", newUser, newUser.id)
        const token = jwt.sign({
            id: newUser.id,
            username
        }, `${process.env.JWT_SECRET}`,
        {expiresIn: '1week'});
        console.log('token =>', token)
        console.log("Catching error")

        console.log('=====NEW USER=====', newUser);
        return res.send({
            user: newUser,
            message: "You're signed up!",
            token: token
        })
    } catch (error) {
        return next(error);
    }
});

usersRouter.post('/login', async (req, res, next) => {

    try {
        const { id, username, password } = req.body;
        console.log('reqbody',req.body)
        if (username.length === 0 || password.length === 0) {
            console.log("Inside no PW");
            return next(console.error());
        }

        const user = await getUser( username, password );
        console.log('USER ==>', user)
        if (!user) {
            return next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            })
        }
        const token = jwt.sign(user, process.env.JWT_SECRET);
        process.env.token = token;

        return res.send({
            user: user,
            message: "You're logged in!",
            token: token
        })

    } catch (error) {
        next(error);
    }
})

usersRouter.get('/', async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth) {
        return next({
            name: 'AuthorizationMissingError',
            message: 'Authorization is missing from request'
        });
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);

            if (id) {
                const user = await getUserById(id);
                return res.send(user);
            }
        } catch ({ name, message }) {
            return next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }

})

// usersRouter.get('/:username/shoppingCart', async (req, res, next) => {
//     try{
//         console.log('In this route!!')
//         const username = req.params.username;
//         console.log("USERNAME", username)
//         const shoppingCart = await getShoppingCartItemsByUser({username});
//         return res.send(shoppingCart)

//     } catch (error) {
//         return next (error)
//     }
// })


module.exports = usersRouter;