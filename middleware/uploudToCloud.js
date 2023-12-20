import cloudinary from "cloudinary";
import { AppError } from "../Utilities/Utilities.js";

cloudinary.config({ 
  cloud_name: 'dt63l0xqq', 
  api_key: '736351833831431', 
  api_secret: 'Dm_JG-zQcAmBf0WRL4WME0PWm0U' 
});
export const saveImg = async (req, res, next) => {
  function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ folder: "websites" }, (error, result) => {
          if (error) {
            reject(
              new AppError(
                `Error uploading to Cloudinary: ${error.message}`,
                500
              )
            );
          } else {
            resolve(result.url);
          }
        })
        .end(buffer);
    });
  }


    const bufferMainImg = req.files.mainImg[0].buffer;
    const bufferLogo = req.files.logo[0].buffer;
    const bufferPreviewImgs = req.files.previewImgs.map((img) => img.buffer);
    req.body.mainImg = await uploadToCloudinary(bufferMainImg);

    req.body.logo = await uploadToCloudinary(bufferLogo);
    req.body.previewImgs = await Promise.all(
      bufferPreviewImgs.map(async (buffer) => {
        return await uploadToCloudinary(buffer);
      })
    );
    next();
  
};
