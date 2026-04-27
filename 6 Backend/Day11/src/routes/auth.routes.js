const express = require('express');
const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken');

const router = express.Router();

// POST /register 
// POST /login 
// GET /user 
// GET /logout

// POST /auth/register 
// POST /auth/login 
// GET /auth/user 
// GET /auth/logout


router.post('/register', async (req,res)=>{
     const {username, password} = req.body;

     const user = await userModel.create({
        username, password
     })
     const token = jwt.sign({
        id:user._id,
       
     },process.env.JWT_SECRET);

     res.cookie("token", token);

     res.status(201).json({
        message : "Account created successfully",
        user
     })

})


router.post('/login', async (req,res)=>{
    const {username, password} = req.body;
// findOne database se username aur password lekr aata hai userModel ka
    const user = await userModel.findOne({
        username:username
    });

    if(!user){
        res.status(401).json({
            message : "Invalid Username"
        })
    }
    const isPassword = password === user.password
    if(!isPassword){
        return res.status(401).json({
            message : "Invalis Password"
        })
    }
    res.status(200).json({
        message : "Authentication Complete"
    })
})

router.get('/user', async(req,res)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            message : "Unauthorized Access"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userModel.findOne({
            _id:decoded.id
        }).select("-password -__v");

        res.status(200).json({
            message: "User data fetched successfully",
            user
        })



    }catch(err){
        return res.status(401).json({
            message: "Unauthorized - Invalid token"
        })
    }

   

    
})

module.exports = router;