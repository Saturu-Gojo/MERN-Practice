//Core Module
const http = require('http');

//Local Module
const requestHandler = require('./requestHandler');


const server = http.createServer(requestHandler);
const port = 3001
server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});

