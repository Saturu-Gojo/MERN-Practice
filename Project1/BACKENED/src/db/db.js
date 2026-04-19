const dns = require('dns');

// Force Node.js to use Google DNS for all lookups in this process
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');


function connectDB(){
    return mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}
module.exports = connectDB;
