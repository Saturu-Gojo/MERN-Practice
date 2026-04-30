const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');

//post /register req.body

router.post('/register',async (req,res)=>{
    const {username, password} = req.body;
    const isUser = await userModel.findOne({
        username
    })
    if(isUser){
        return res.status(409).json({
            message:"username taken"
        })
    }  
    const user = await userModel.create({
        username, password
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET);

    res.cookie("chacha",token);

    res.status(201).json({
        message : "user register succefully",
        user
    })

})

router.get('/user', async (req,res)=>{

    const token = req.cookies.chacha;

    if(!token){
        res.status(401).json({
            message : "Unauthorized User: token not found"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = userModel.findOne({
            _id:decoded.id
        })
        return res.status(200).json({
            message: "User data fetched successfully"
        })
    }catch(err){
        res.status(401).json({
            message : "Unauthorized invalid token"
        })
    }
    
})

router.post('/login', async (req,res)=>{
    const {username,password} = req.body;

    const user = await userModel.findOne({username});

    if(!user){
        return res.status(404).json({
            message : "Username doesn't exist"
        })
    }
    const isPassword = user.password===password
    if(!isPassword){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

    res.cookie("chacha",token,{
        expires: new Date(Date.now() + 1000*60*60*24*7),
    })
    res.status(200).json({
        message: "user loggedin successfully",
        user
    })
})

router.get('/logout', (req,res)=>{
    res.clearCookie("chacha")

    res.status(200).json({
        message: "User loggout Successfully"
    })
})


module.exports = router;