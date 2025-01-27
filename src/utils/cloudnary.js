const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
});

const uploadCloud = async (filePath) => {
    try {
        if (!filePath) {
            console.log('No file path provided');
            return null;
        }
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        });
        console.log('File uploaded successfully', response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(filePath); // delete the file from the server
        console.log(error);
        return null;
        
    }
};

module.exports = uploadCloud;
