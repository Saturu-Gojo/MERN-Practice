const postModel = require('../models/post.models');
const generateCaption = require('../service/ai.service')
const {v4: uuidv4} = require('uuid');
const uploadFile = require('../service/storage.service');

async function createPostController(req,res){
    const file = req.file;   
    console.log(file);
    const base64Image = new Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);


    // res.json({
    //     caption,
    //     result,
    // })

    const post = await postModel.create({
        caption: caption,
        image: result.url,
        user:req.user._id

    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

module.exports ={
    createPostController
}