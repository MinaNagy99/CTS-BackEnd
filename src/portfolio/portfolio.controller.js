import { AppError } from "../../Utilities/Utilities.js";
import websiteModal from "../../dataBase/models/website.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { removeImage } from "../../middleware/deleteImg.js";
import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const scriptDir = __dirname;
export const addWebsite = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const filePathOuter = join(scriptDir, "../../");
  const filePathInner = join(
    filePathOuter,
    "languages",
    "resources",
    "ar.json"
  );
  const { title, titleInArabic } = req.body;
  await fs.writeFile(
    filePathInner,
    JSON.stringify({ title: titleInArabic }, null, 2),
    "utf8"
  );
  let result = await websiteModal.create(req.body);
  !result && next(new AppError("don't create the website"));
  res.send({ message: "success", data: result });
});

export const editWebsite = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;

  let result = await websiteModal.findByIdAndUpdate(id, req.body);
  const { mainImg, logo, previewImgs } = result;
  if (req.body.mainImg) {
    removeImage(mainImg.public_id);
  }
  if (req.body.logo) {
    removeImage(logo.public_id);
  }
  if (req.body.previewImgs) {
    previewImgs.map((img) => {
      removeImage(img.public_id);
    });
  }

  !result && next(new AppError("not updated", 402));
  res.status(200).send({ message: "success", data: result });
});

export const deleteWebsite = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { mainImg, logo, previewImgs } = await websiteModal.findByIdAndDelete(
    id
  );
  const previewImgsIds = previewImgs.map((img) => {
    return img.public_id;
  });
  removeImage(mainImg.public_id, logo.public_id, ...previewImgsIds);

  res.status(200).send({ message: "success" });
});

export const getAllWebsites = catchAsyncError(async (req, res, next) => {
  let result = await websiteModal.find();
  res.status(200).send({ message: "success", data: result });
});

export const getWebsite = catchAsyncError(async (req, res, next) => {
  let result = await websiteModal.findById(req.params.id);
  !result && next(new AppError("not found the website", 401));
  res.status(200).send({ message: "success", data: result });
});
