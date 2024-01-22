import cloudinary from "cloudinary";
import { AppError } from "../Utilities/Utilities.js";

cloudinary.config({
  cloud_name: "dt63l0xqq",
  api_key: "736351833831431",
  api_secret: "Dm_JG-zQcAmBf0WRL4WME0PWm0U",
});
export const saveImg = async (req, res, next) => {
  function uploadToCloudinary(buffer, folderName) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ folder: folderName }, (error, result) => {
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

  async function handleFileUpload(fileKey, folderName) {
    if (req.files?.[fileKey]) {
      const { buffer } = req.files[fileKey][0];

      req.body[fileKey] = await uploadToCloudinary(buffer, folderName);
    }
    if (req.file) {
      req.body[fileKey] = await uploadToCloudinary(req.file.buffer, folderName);
    }
  }
  let folderName = req.baseUrl.split("");
  folderName.shift();
  folderName.push("s");
  folderName = folderName.join("");
  if (req.files) {
    for (const file in req.files) {
      if (Object.keys(req.files[file]).length > 1) {
        req.files[file].map(async (fi) => {
          await handleFileUpload(file, folderName);
        });
      } else {
        await handleFileUpload(file, folderName);
      }
    }
  }
  if (req.file) {
    console.log(req.file);
    await handleFileUpload(req.file?.fieldname, folderName);
  }

  next();
};
