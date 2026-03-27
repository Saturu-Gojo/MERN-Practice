//Core Module
const http = require('http');

//external module
const express = require('express');
const fs = require('fs');



const app = express();


//First middleware
app.use((req,res, next)=>{
    console.log('Handling request for:', req.url, req.method);
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

app.use("/buy-product",(req,res,next)=>{
    console.log("Form Data Recieved");
    const arr = [];
    req.on('data',(chunk)=>{
        console.log(chunk);
        arr.push(chunk);
    });
    req.on('end',()=>{
        const parseBody = Buffer.concat(arr).toString();
                // console.log(parseBody);
        const URLParam = new URLSearchParams(parseBody);
        const bodyJson = {};
                //[["productname","racket"],["Price","5000"]]
        for(const [key,value] of URLParam.entries()){
            bodyJson[key]=value;
        }
        fs.writeFile('buy.json',JSON.stringify(bodyJson),()=>{
    
            res.statusCode=302;
            res.setHeader('Location', '/products');   
            console.log(bodyJson)
            res.end();  
        });
    });
})

app.get("/products", (req,res,next)=>{
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head><title>Products</title></head>
            <body>
                <h1>Product list will appear here.</h1>
                <p>See the product in buy.txt</p>
            </body>
            </html>
        `)
});

app.use((req,res,next)=>{
  
    res.statusCode=404;
        // Handle 404 - Page Not Found
        res.write('<h1>404: Page Not Found</h1>');
        // Always call end() to tell the browser you're finished sending data
        res.end();
})


// const server = http.createServer(app);
const port = 3001
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});

