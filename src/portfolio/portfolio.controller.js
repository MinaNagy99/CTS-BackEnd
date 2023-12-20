import { AppError } from "../../Utilities/Utilities.js";
import websiteModal from "../../dataBase/models/website.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";

export const addWebsite = catchAsyncError(async (req, res, next) => {
  let result = await websiteModal.create(req.body);
  !result && next(new AppError("don't create the website"));
  res.send({ message: "success", data: result });
});

export const editWebsite = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  
  let result = await websiteModal.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new AppError("not updated", 402));
  res.status(200).send({ message: "success", data: result });
});

export const deleteWebsite = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  await websiteModal.findByIdAndDelete(id);
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
