// core module

const path = require('path');

const express = require('express');

const storeRouter = express.Router();

storeRouter.get("/",(req,res,next)=>{
    res.sendFile(path.join( __dirname,"views", "home.html"))

});

module.exports = storeRouter;