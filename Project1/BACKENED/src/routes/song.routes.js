const express = require('express');
const multer = require('multer');

const router = express.Router();//creates a router
//instead of attaching everything to main 'app', attaching
//to router

const uploadFile = require('../service/storage.service');

const songModel = require('../models/song.model')

const upload = multer({storage:multer.memoryStorage()});
//don't save the incoming file on my hard drive. 
// Just catch it and keep it in the RAM (memory)


/*
title: String,
author: String,
audio : String,
mood : String,
*/

router.post('/songs', upload.single("audio"),async (req,res)=>{

    if (!req.file) {
        return res.status(400).json({ message: "Please upload an audio file using the 'audio' key." });
    }

    console.log("Body data:", req.body);
    console.log("File received:", req.file.originalname);
    const fileData = await uploadFile(req.file);
    console.log(fileData);
    const savedSong = await songModel.create({
        title : req.body.title,
        author : req.body.author,
        audio : fileData.url,
        mood: req.body.mood
    });
    res.status(201).json({
        message: 'Song created Successfully',
        song: savedSong,
    })


});


router.get('/songs', async (req,res)=>{
    const {mood} = req.query; //mood = sad
    
    const songs = await songModel.find({
        mood: mood
    })

    res.status(200).json({
        message:"Song fetched success",
        songs: songs

    })
})

module.exports = router;