import { catchAsyncError } from "./catchAsyncError.js";
import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
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
const addTitle = catchAsyncError(async (req, res, next) => {
  const { title, titleInArabic } = req.body;
  const filePathAR = filePathFunction("ar");
  const filePathEN = filePathFunction("en");
  if (titleInArabic) {
    const fileContentAR = await fs.readFile(filePathAR, "utf8");
    const dataInAr = JSON.parse(fileContentAR);
    dataInAr[title] = titleInArabic;
    await fs.writeFile(filePathAR, JSON.stringify(dataInAr));
  }

  //================================================================
  if (title) {
    const fileContentEn = await fs.readFile(filePathEN, "utf8");
    const dataInEN = JSON.parse(fileContentEn);
    dataInEN[title] = title;
    await fs.writeFile(filePathEN, JSON.stringify(dataInEN));
  }

  next();
});

export default addTitle;
