//Core Module
const http = require('http');

//external module
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded());


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

app.use("/buy-product",(req,res,next)=>{
    console.log("Form Data Recieved");
        console.log(JSON.stringify(req.body));
        fs.writeFile('buy.txt',JSON.stringify(req.body),()=>{
    
            res.statusCode=302;
            res.setHeader('Location', '/products');   
            console.log(req.body)
            res.end();  
        });
});


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

