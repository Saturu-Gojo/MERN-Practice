//core module
const path = require('path');


//external module
const express = require('express');

const fs = require('fs');
const bodyParser = require('body-parser');

//Local Modeule
const hostRouter = require('./routers/hostRouter');
const storeRouter = require('./routers/store');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(storeRouter);
app.use("/host",hostRouter);


app.use((req,res, next)=>{
    res.statusCode=404;
    res.sendFile(path.join(__dirname, "views","404.html"));
});



// const server = http.createServer(app);
const port = 3001
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});

