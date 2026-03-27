const fs = require('fs');
const Module = require('module');
const {URLSearchParams} = require('url');

const requestHandler = (req, res) => {
    
    if (req.url === "/products") {
        res.write();
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
