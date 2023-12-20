import multer from "multer";
import { AppError } from "../Utilities/Utilities.js";

const option = () => {

  const inMemoryStorage = multer.memoryStorage();

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("image only", 400), false);
    }
  }

  return multer({ storage:inMemoryStorage, fileFilter });
};

export const uploadSingleFile = (fieldName, folderName) =>
  option(folderName).single(fieldName);

export const uploadMixfile = (arrayOfFields, folderName) =>
  option(folderName).fields(arrayOfFields);
