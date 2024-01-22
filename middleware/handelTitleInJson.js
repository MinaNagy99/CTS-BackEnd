import { catchAsyncError } from "./catchAsyncError.js";
import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import websiteModal from "../dataBase/models/website.model.js";

const readeFileJson = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const scriptDir = __dirname;
  const filePathAR = join(scriptDir, `../languages/resources/ar.json`);
  const filePathEN = join(scriptDir, `../languages/resources/en.json`);

  const fileContentAR = JSON.parse(await fs.readFile(filePathAR, "utf8"));
  const fileContentEn = JSON.parse(await fs.readFile(filePathEN, "utf8"));
  return { fileContentAR, fileContentEn, filePathAR, filePathEN };
};
const { fileContentAR, fileContentEn, filePathAR, filePathEN } =
await readeFileJson();

export const addTitle = catchAsyncError(async (req, res, next) => {
  const { fileContentAR, fileContentEn, filePathAR, filePathEN } =
    await readeFileJson();
  const { title, titleInArabic } = req.body;
  fileContentAR[title] = titleInArabic;
  fileContentEn[title] = title;

  await fs.writeFile(filePathAR, JSON.stringify(fileContentAR));
  await fs.writeFile(filePathEN, JSON.stringify(fileContentEn));
  next();
});
export const addToJsonFile = catchAsyncError(async (key, valueInEN, valueInAR) => {
 
  fileContentAR[key] = valueInAR;
  fileContentEn[key] = valueInEN;
  await fs.writeFile(filePathAR, JSON.stringify(fileContentAR));
  await fs.writeFile(filePathEN, JSON.stringify(fileContentEn));
  return { message: "success" };
})
export const writeToJsonFile = catchAsyncError(async (req, res, next) => {
  const { title, titleInArabic } = req.body;

 
   await addToJsonFile(title, title, titleInArabic);
    next();

  
});
export const deleteFromJsonFile = async (key) => {
  delete fileContentAR[key];
  delete fileContentEn[key];
  await fs.writeFile(filePathAR, JSON.stringify(fileContentAR));
  await fs.writeFile(filePathEN, JSON.stringify(fileContentEn));
};
export const updatedFromJsonFile = async (key, value, fileType) => {
  if (fileType == "ar") {
    delete fileContentAR[key];
    fileContentAR[key] = value;
    await fs.writeFile(filePathAR, JSON.stringify(fileContentAR));
  }
  if (fileType == "en") {
    delete fileContentEn[key];
    fileContentEn[key] = value;
    await fs.writeFile(filePathEN, JSON.stringify(fileContentEn));
  }
};

export const updateTitle = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title: newTitle, titleInArabic: newTitleInArabic } = req.body;
  const { title: oldTitle } = await websiteModal.findById(id);
  if (newTitle && !newTitleInArabic) {
    delete fileContentEn[oldTitle];

    fileContentEn[newTitle] = newTitle;
    fileContentAR[newTitle] = fileContentAR[oldTitle];
    let deleted = false;

    for (const key in fileContentAR) {
      if (!deleted && fileContentAR[key] === fileContentAR[oldTitle]) {
        delete fileContentAR[key];
        deleted = true; // Set the flag to true after deleting the first match
      }
    }
  }
  if (newTitleInArabic && !newTitle) {
    console.log("update just title in arabic");
    fileContentAR[oldTitle] = newTitleInArabic;
  }
  if (newTitle && newTitleInArabic) {
    console.log("update both of title ");
    delete fileContentAR[oldTitle];
    delete fileContentEn[oldTitle];
    fileContentAR[newTitle] = newTitleInArabic;
    fileContentEn[newTitle] = newTitle;
  }
  await fs.writeFile(filePathAR, JSON.stringify(fileContentAR));
  await fs.writeFile(filePathEN, JSON.stringify(fileContentEn));
  next();
});
export const deleteTitle = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title: oldTitle } = await websiteModal.findById(id);
  console.log(oldTitle);
  delete fileContentAR[oldTitle];
  delete fileContentEn[oldTitle];
  await fs.writeFile(filePathAR, JSON.stringify(fileContentAR));
  await fs.writeFile(filePathEN, JSON.stringify(fileContentEn));
  next();
});
