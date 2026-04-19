var ImageKit = require("imagekit");//imporing the imagekit module
var mongoose = require('mongoose');
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});//creating a new instance of the imagekit 
// class and passing the public key,
//  private key and url endpoint as parameters






function uploadFile(file){
    return new Promise((resolve,reject)=>{
        imagekit.upload({
            file:file.buffer,//Form-data, binary data of 
            // image or file to be uploaded

            fileName: new mongoose.Types.ObjectId().toString(),
            //Name assigned to the file being uploaded

            folder:"cohort-audio"
        },(error,result)=>{
            if(error){
                reject(error);//kuch galt hua toh error bhej do
            }else{
                resolve(result);//sab sahi hai toh result de do

            }
        })
    })
}


module.exports = uploadFile;