import cloudinary from "cloudinary";
import { AppError } from "../Utilities/Utilities.js";

cloudinary.config({
  cloud_name: "dt63l0xqq",
  api_key: "736351833831431",
  api_secret: "Dm_JG-zQcAmBf0WRL4WME0PWm0U",
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
  const { buffer: bufferMainImg } = req.files.mainImg[0];

  const { buffer: bufferLogo } = req.files.logo?.[0] || {};
  const { buffer: bufferPreviewImgs } = req.files.previewImgs?.[0] || {};
  
  req.body.mainImg = await uploadToCloudinary(bufferMainImg);
  
  if (bufferLogo) {
    req.body.logo = await uploadToCloudinary(bufferLogo);
  }
  
  if (bufferPreviewImgs) {
    req.body.previewImgs = await Promise.all(
      bufferPreviewImgs.map(async (buffer) => await uploadToCloudinary(buffer))
    );
  }
  
  next();
};
