const fs = require('fs');
const Module = require('module');
const {URLSearchParams} = require('url');

const requestHandler = (req, res) => {
    console.log('Handling request for:', req.url);

    res.setHeader('Content-Type', 'text/html');

    // Use req.url to check where the user is going
    if (req.url === "/") {
        res.write(`
           <!DOCTYPE html>
            <html lang="en">
            <head>
                
                <title>Myntra</title>
            </head>
            <body>
                <h1>Welcome to First Server</h1>
                <form action="/buy-product" method = "POST">
                    <input type="text" placeholder = "Enter the Product" name="productname">
                    <input type="Number" placeholder = "Enter the Price" name="Price">
                    <input type="submit">
                </form>
                
            </body>
            </html>
        `);
                // Always call end() to tell the browser you're finished sending data
        res.end();
    } else if (req.url === "/products") {
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head><title>Products</title></head>
            <body>
                <h1>Product list will appear here.</h1>
            </body>
            </html>
        `);
                // Always call end() to tell the browser you're finished sending data
        res.end();
    }else if(req.url === "/buy-product" ){
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
            fs.writeFile('buy.txt',JSON.stringify(bodyJson),()=>{

                res.statusCode=302;
                res.setHeader('Location', '/products');   
                console.log(bodyJson)
                res.end();  
            });
        });
        
        // res.statusCode=302;
        // res.setHeader('Location', '/products');
        

    }else {
        res.statusCode=404;
        // Handle 404 - Page Not Found
        res.write('<h1>404: Page Not Found</h1>');
        // Always call end() to tell the browser you're finished sending data
        res.end();
    }
}

    

module.exports = requestHandler;
