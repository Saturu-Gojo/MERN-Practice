const dns = require('dns');
const { default: mongoose } = require('mongoose');

dns.setServers(['8.8.8.8' , '8.8.4.4']);

function connectDB(){
    return new mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("Database Connected");
    })
    .catch((e)=>{
        console.log("Error Found! Can't Connect to DB");
    })

}

module.exports = connectDB;