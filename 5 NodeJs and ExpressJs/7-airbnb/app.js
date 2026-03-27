
const express = require('express');

const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser, urlencoded());

app.use((req,res, next)=>{
    console.log('Handling request for:', req.url, req.method, req.body);
   next();

});


app.get("/",(req,res, next)=>{
    res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                
                <title>Myntra</title>
            </head>
            <body>
                <h1>Welcome to First Server: IMMORTAL CODER</h1>
                <form action="/buy-product" method="POST" >
                    <input type="text" placeholder = "Enter the Product" name="productname">
                    <input type="Number" placeholder = "Enter the Price" name="Price">
                    <input type="submit">
                </form>
                
            </body>
            </html>
        `);
});



// const server = http.createServer(app);
const port = 3001
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});

