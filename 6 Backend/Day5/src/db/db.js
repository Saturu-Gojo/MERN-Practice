
const dns = require('dns');

// Force Node.js to use Google DNS for all lookups in this process
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

//server Database se kaise connect hoga ye ham db.js 
// file mai likhenge

function connectToDB(){
    // Replace your current mongoose.connect line with this style:
    mongoose.connect("mongodb+srv://saturugojo043_db_user:PY3bgXT9NFKT9SLg@cluster0.cwpea1s.mongodb.net/cohort")
    .then(()=>{
        console.log("connected to DB")
    })
    .catch((err)=>{
        console.log(err);
    })

}


module.exports = connectToDB;
