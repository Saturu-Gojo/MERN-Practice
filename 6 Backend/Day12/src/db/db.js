const dns = require('dns');

dns.setServers(['8.8.8.8','8.8.4.4']);

const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("Database Connected");
    })
    .catch((err)=>{
        console.log("Error Found",err);
    })
}

module.exports = connectDB;