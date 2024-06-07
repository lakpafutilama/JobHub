const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = (buffer) => {
  return new Promise((resolve, reject) => {
    const upload_stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
    streamifier.createReadStream(buffer).pipe(upload_stream);
  });
};

module.exports = { upload };
