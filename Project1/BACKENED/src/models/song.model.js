const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title:String,
    author:String,
    audio:String,
    mood:String,
})



const song = mongoose.model('song', songSchema);

module.exports = song;



//51:54