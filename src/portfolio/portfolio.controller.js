import { AppError } from "../../Utilities/Utilities.js";
import websiteModal from "../../dataBase/models/website.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";

export const addWebsite = catchAsyncError(async (req, res, next) => {
  req.body.mainImg = req.files.mainImg[0].filename;
  req.body.logo = req.files.logo[0].filename;
  req.body.previewImgs = req.files.previewImgs.map((i) => i.filename);

  let result = await websiteModal.create(req.body);
  !result && next(new AppError("can't create website"));
  result && res.send({ message: "success", result });
});

export const editWebsite = catchAsyncError(async (req, res, next) => {
  let {id} = req.params;
  console.log(req.files);
  req.body.mainImg = req.files.mainImg[0].filename;
  req.body.logo = req.files.logo[0].filename;
  req.body.previewImgs = req.files.previewImgs.map((i) => i.filename);
  console.log(req.body);
  let result = await websiteModal.findByIdAndUpdate(id,req.body,{new:true});
  !result && next(new AppError('not updated',402))
  res.status(200).send({message:'success',data:result});
});


export const deleteWebsite = catchAsyncError(async (req, res) => {
  const {id} =req.params
  await websiteModal.findByIdAndDelete(id)
  res.status(200).send({message:'success'})
})


export const getAllWebsites = catchAsyncError(async(req,res,next) => {
    let result = await websiteModal.find()
    res.status(200).send({message:'success',data:result})
})

export const getWebsite = catchAsyncError(async(req, res, next) => {
  let result = await websiteModal.findById(req.params.id)
  !result && next( new AppError('not found the website',401) );
  res.status(200).send({message:'success',data:result})
})
