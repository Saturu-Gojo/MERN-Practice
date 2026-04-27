const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

function connectDB(){
    return mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("Database Connected");
    })
    .catch((e)=>{
        console.log("Error Found!",e);
    })
}

module.exports = connectDB;

