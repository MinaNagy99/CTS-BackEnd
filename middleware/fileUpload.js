import multer from "multer";
import { AppError } from "../Utilities/Utilities.js";

const option = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("image only", 400), false);
    }
  }

  return multer({ storage, fileFilter });
};

export const uploadSingleFile = (fieldName, folderName) =>
  option(folderName).single(fieldName);

export const uploadMixfile = (arrayOfFields) =>
  option().fields(arrayOfFields);
