
const path = require('path');
const rootDir = require('../util/pathutil.js');

const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/add-home", (req,res,next)=>{
    res.sendFile(path.join(rootDir, "views","addhome.html"));
});

hostRouter.post("/add-home", (req,res,next)=>{
    console.log(req.body);
    res.sendFile(path.join(rootDir,"views","homeadded.html"));
});

module.exports = hostRouter;