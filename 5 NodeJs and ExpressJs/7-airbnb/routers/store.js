// core module

const path = require('path');

const rootDir = require('../util/pathutil');

const express = require('express');

const storeRouter = express.Router();

storeRouter.get("/",(req,res,next)=>{
    res.sendFile(path.join(rootDir,"views", "home.html"))

});

module.exports = storeRouter;