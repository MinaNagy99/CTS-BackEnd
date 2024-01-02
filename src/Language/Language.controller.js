import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const scriptDir = __dirname;

const getArabicFile = catchAsyncError(async (req, res, next) => {
  try {
    const filePathOuter = join(scriptDir, "../../");
    const filePathInner = join(filePathOuter, "languages", "resources", "ar.json");

    const fileContent = await fs.readFile(filePathInner, "utf8");
    res.send(fileContent);
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading translations for ar:`, error);
    return null;
  }
});
const getEnglishFile = catchAsyncError(async (req, res, next) => {
  try {
    const filePathOuter = join(scriptDir, "../../");
    const filePathInner = join(filePathOuter, "languages", "resources", "en.json");

    const fileContent = await fs.readFile(filePathInner, "utf8");
    res.send(fileContent);
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading translations for en:`, error);
    return null;
  }
});

export { getArabicFile,getEnglishFile };
