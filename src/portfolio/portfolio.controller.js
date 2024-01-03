import { log } from "console";
import { AppError } from "../../Utilities/Utilities.js";
import websiteModal from "../../dataBase/models/website.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { removeImage } from "../../middleware/deleteImg.js";
import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { json } from "express";

const filePathFunction = (fileName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const scriptDir = __dirname;
  const filePath = join(
    scriptDir,
    `../../languages/resources/${fileName}.json`
  );
  return filePath;
};

export const addWebsite = catchAsyncError(async (req, res, next) => {
  const { title, titleInArabic } = req.body;
  const filePathAR = filePathFunction("ar");
  const filePathEN = filePathFunction("en");
  console.log(filePathAR);
  // console.log(filePathAR);
  // let existingData;

  const fileContentAR = await fs.readFile(filePathAR, "utf8");
  const dataInAr = JSON.parse(fileContentAR);
  dataInAr[title] = titleInArabic;
  await fs.writeFile(filePathAR, JSON.stringify(dataInAr));
  //================================================================
  const fileContentEn = await fs.readFile(filePathEN, "utf8");
  const dataInEN = JSON.parse(fileContentEn);
  dataInEN[title] = title;
  await fs.writeFile(filePathEN, JSON.stringify(dataInEN));

  let result = await websiteModal.create(req.body);
  !result && next(new AppError("Unable to create the website"));

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
