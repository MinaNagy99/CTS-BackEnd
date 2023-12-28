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
            resolve({ url: result.url, public_id: result.public_id });
          }
        })
        .end(buffer);
    });
  }
  if (req.files?.mainImg) {
    console.log("convert main image");
    const { buffer: bufferMainImg } = req.files?.mainImg[0] || {};
    req.body.mainImg = await uploadToCloudinary(bufferMainImg);
  }

  if (req.files?.logo) {
    console.log("convert logo image");

    const { buffer: bufferLogo } = req.files.logo?.[0] || {};
    req.body.logo = await uploadToCloudinary(bufferLogo);
  }
  if (req.files?.previewImgs) {
    console.log("convert previewImgs image");

    const { buffer: bufferPreviewImgs } = req.files.previewImgs || {};
    req.body.previewImgs = await Promise.all(
      req.files.previewImgs.map(
        async (img) => await uploadToCloudinary(img.buffer)
      )
    );
  }

  next();
};
