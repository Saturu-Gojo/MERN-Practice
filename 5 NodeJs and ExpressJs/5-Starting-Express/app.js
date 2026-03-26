//Core Module
const http = require('http');

//external module
const express = require('express');

const app = express();


//First middleware
app.use((req,res, next)=>{

    console.log('First Middleware', req.url, req.method);
   next();

});

app.use("/test",(req,res, next)=>{

    console.log('Second Middleware', req.url, req.method);
//    next();
    res.send('<h1>IMMORTAL CODER</h1>')

});


// const server = http.createServer(app);
const port = 3001
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});

