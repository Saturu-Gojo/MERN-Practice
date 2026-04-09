const express = require('express');
const connectToDB = require('./src/db/db');


//server database se connect  krne ka action 
// server.js file mai

connectToDB();
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.post('/notes',(req,res)=>{
    const {title,content} = req.body;
    console.log(title,content);
    console.log(req.body);
    res.json({
        message:"Notes added successfully"
    })
})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})
