const express = require('express');
//middleware 
// - req modifies kr skte hai
// - response send kr skte hai 

const router = express.Router();

router.use((req,res,next)=>{
    console.log("this middleware is between router and api");
    next();
})

router.get('/',(req,res)=>{
    res.json({
        message: "Welcome to server"
    })
})

module.exports = router;