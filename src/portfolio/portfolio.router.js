import { Router } from "express";
import * as portfolio from "./portfolio.controller.js";
import { uploadMixfile } from "../../middleware/fileUpload.js";

const websiteRoute = Router();
websiteRoute
  .route("/")
  .post(
    uploadMixfile([
      { name: "mainImg", maxCount: 1 },
      { name: "previewImgs", maxCount: 3 },
      { name: "logo", maxCount: 1 },
    ]),
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
    portfolio.editWebsite
  );

export default websiteRoute;
