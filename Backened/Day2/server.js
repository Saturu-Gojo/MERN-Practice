const express = require('express');



const app = express();//server created


// req.body
// req.params
// req.query
// req.headers & req.cookies
//res.send(), res.json(), res.redirect(), res.sendFile(), res.status()


app.get('/home',(req,res)=>{
    res.send("Welcome Sakshi Mishra");
});

app.get('/about',(req,res)=>{
    res.send("Welcome to About Page");
});


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
