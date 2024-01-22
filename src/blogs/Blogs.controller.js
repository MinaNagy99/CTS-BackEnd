import slugify from "slugify";
import { AppError } from "../../Utilities/Utilities.js";
import blogModel from "../../dataBase/models/Blogs.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { removeImage } from "../../middleware/deleteImg.js";
import { addToJsonFile } from "../../middleware/handelTitleInJson.js";

const getAllBlogs = catchAsyncError(async (req, res, next) => {
  const result = await blogModel.find();
  !result && next(new AppError("can not find blog"));
  res.status(200).send({ message: "success", data: result });
});
const addBlog = catchAsyncError(async (req, res, next) => {
  const title = req.body.title;
  req.body.createdBy = req.user._id
  req.body.slug = slugify(title);
  const result = new blogModel(req.body);
  await result.save()

  !result && next(new AppError("Unable to create the blog"));
  res.send({ message: "success", data: result });
});

const editBlog = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  const { title, titleInArabic } = req.body;
  await addToJsonFile(title, title, titleInArabic);
  delete req.body.titleInArabic; // Delete titleInArabic property

  const result = await blogModel.findByIdAndUpdate(id, req.body);
  const { mainImg, images } = result;
  if (req.body.mainImg) {
    removeImage(mainImg.public_id);
  }

  if (req.body.images) {
    images.map((img) => {
      removeImage(img.public_id);
    });
  }

  !result && next(new AppError("not updated", 402));
  res.status(200).send({ message: "success", data: result });
});

const deleteBlog = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const result = await blogModel.findByIdAndDelete(id);
  !result && next(new AppError("can't delete blog", 404));
  const { mainImg, images } = result;
  const imagesIds = images.map((img) => {
    return img.public_id;
  });
  removeImage(mainImg.public_id, ...imagesIds);
  !result && next(new AppError("not updated"));
  res.status(200).send({ message: "success", data: result });
});

const removeAllBlogs = catchAsyncError(async(req,res,next) => {
  const result =  await blogModel.deleteMany()
  res.status(200).send({ message: "success", data:result });
})

export { deleteBlog, getAllBlogs, editBlog, addBlog ,removeAllBlogs};
