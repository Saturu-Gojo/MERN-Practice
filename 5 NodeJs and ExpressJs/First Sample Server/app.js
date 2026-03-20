const http = require('http');

console.log('I was here');

const requestHandler = (req, res) => {
    console.log('I was here in Handler');

    res.setHeader('Content-Type', 'text/html');
    res.write('<!DocTYPE html>');
    res.write('<html lang="en">');
    res.write('<head>');
    res.write('<title>Document</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>Welcome to first server</h1>');
    res.write('</body>');
    res.write('</html>');


    res.write(`
        <!DocTYPE html>
        <html lang="en">
        <head>
        <title>Document</title>
        </head>
        <body>
            <h1>Welcome to first server</h1>
        </body>
        </html>
    `);


    // console.log(req.url, req.method, req.headers);

    res.end('Done!');
   
}

const server = http.createServer(requestHandler);
const port = 3001
server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});

