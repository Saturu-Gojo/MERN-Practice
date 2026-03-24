const http = require('http');
const fs = require('fs');

const requestHandler = (req,res)=>{
    console.log('1 - Start of message');

    console.log('2 - Reading file Synchronously');
    const dataSync = fs.readFileSync('User-details.txt', 'utf8');

    console.log('3 - Synchronous read complete');

    console.log('4 - Reading file asynchronously');

    fs.readFile('user-details.txt', 'utf8', (err, dataAsync)=>{
        if(err)throw err;
        console.log('6- Asynchronous read complete');

    });



    console.log('5- End of Script');


    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Server is working!</h1>');
    res.write('<p>Check your terminal to see the Sync vs Async log order.</p>');
    res.end();

}





const server = http.createServer(requestHandler);

server.listen(3001, ()=>{
    console.log('Server is running on http://localhost:3001');
});

