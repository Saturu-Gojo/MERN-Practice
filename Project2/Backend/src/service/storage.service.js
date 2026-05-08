const { URLEndpoints } = require('@imagekit/nodejs/resources/accounts/url-endpoints.js');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.ImageKit_PUBLIC_KEY,
    privateKey: process.env.ImageKit_PRIVATE_KEY,
    urlEndpoint: process.env.ImageKit_URL


});


async function uploadFile(file, filename){
    const response = await imagekit.upload({
        file:file,
        fileName:filename,
        folder: "cohort-ai-social"
    })
    return response;
} 

module.exports = uploadFile;