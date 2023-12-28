import { Router } from "express";
import * as portfolio from "./portfolio.controller.js";
import { uploadMixfile } from "../../middleware/fileUploud.js";
import { saveImg } from "../../middleware/uploudToCloud.js";
import { auth } from "../../middleware/Auth.js";

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
  .delete(portfolio.deleteWebsite)
  .get(portfolio.getWebsite)
  .put(
    uploadMixfile([
      { name: "mainImg", maxCount: 1 },
      { name: "previewImgs", maxCount: 3 },
      { name: "logo", maxCount: 1 },
    ]),
    saveImg ,
    portfolio.editWebsite
  );

export default websiteRoute;
