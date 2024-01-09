import { Router } from "express";
import * as portfolio from "./portfolio.controller.js";
import { uploadMixfile } from "../../middleware/fileUploud.js";
import { saveImg } from "../../middleware/uploudToCloud.js";
import { auth } from "../../middleware/Auth.js";
import {
  addTitle,
  deleteTitle,
  updateTitle,
} from "../../middleware/handelTitleInJson.js";

const websiteRoute = Router();
websiteRoute
  .route("/")
  .post(
    auth,

    uploadMixfile([
      { name: "previewImgs", maxCount: 3 },
      { name: "mainImg", maxCount: 1 },
      { name: "logo", maxCount: 1 },
    ]),
    saveImg,
    portfolio.addWebsite
  )
  .get(portfolio.getAllWebsites);
websiteRoute
  .route("/:id")

  .delete(auth, portfolio.deleteWebsite)
  .get(auth, portfolio.getWebsite)
  .put(
    auth,
    uploadMixfile([ 
      { name: "mainImg", maxCount: 1 },
      { name: "previewImgs", maxCount: 3 },
      { name: "logo", maxCount: 1 },
    ]),
    updateTitle,
    saveImg,

    portfolio.editWebsite
  );

export default websiteRoute;
