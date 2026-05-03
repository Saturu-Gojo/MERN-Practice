const express = require('express');
const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')
const router = express.Router()

const { registerController, loginController } = require('../controller/auth.controller');

//post /register
//post /login
//get user

router.post('/register', registerController)

router.post('/login', loginController);
 



module.exports=router