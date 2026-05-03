const userModel = require('../models/user.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function registerController(req,res){
    const {username, password} = req.body;

    const isUser = await userModel.findOne({username});
    if(isUser){
        return res.status(400).json({
            message : "Username already taken"
        })
    }
    const user = userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message: "User registered Successfully",
        user
    })
}

async function loginController(req,res){
    const {username, password} = req.body;

    const isUser = await userModel.findOne({username});

    if(!isUser){
        res.status(400).json({
            message:"User not Found"
        })
    }

    const isPassword = await bcrypt.compare(password, isUser.password)

    if(!isPassword){
        res.status(400).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({id:isUser._id},process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message : "User logged in successfully",
        user:{
            username: isUser.username,
            id: isUser._id
        }
    })
}

module.exports = {
    registerController,
    loginController
}