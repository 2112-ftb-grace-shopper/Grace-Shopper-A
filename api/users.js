const express = require('express');
const jwt = require('jsonwebtoken');
const usersRouter = express.Router();
const { getUserByUsername, createUser } = require('../db/users');
const bcrypt = require('bcrypt');  
