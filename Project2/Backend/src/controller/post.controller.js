const postModel = require('../models/post.models');
const generateCaption = require('../service/ai.service')

async function createPostController(req,res){
    const file = req.file;   
    console.log(file);
    const base64Image = new Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64Image);

    res.json({
        caption
    })
}

module.exports ={
    createPostController
}