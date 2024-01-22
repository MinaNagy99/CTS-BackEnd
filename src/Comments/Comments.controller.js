import { AppError } from "../../Utilities/Utilities.js";
import blogModel from "../../dataBase/models/Blogs.model.js";
import commentModel from "../../dataBase/models/Comment.model.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";

const addComment = catchAsyncError(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const blog = await blogModel.findById(req.params.id);
  const comment = new commentModel(req.body);
  blog.comments.push(comment._id);
  await blog.save();
  await comment.save();

  res.status(200).send({ message: "success", data: comment });
});

const editComment = catchAsyncError(async (err, req, res, next) => {
  err && next(new AppError(err, 500));

  const { id } = req.params;
  const user = await userMod;
  // const newComment = await commentModel.findOneAndUpdate({_id:id,createdBy:}, req.body, {
  //   new: true,
  // });
  !newComment && next(new AppError("comment not Updated", 40));
  res.status(200).send({ message: "success", data: newComment });
});

const deleteComment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const result = await commentModel.findByIdAndDelete(id);
  res.status(200).send({ message: "success", data: result });
});

const getAllCommentsOfBlog = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const comments = await commentModel.find;
});

export { addComment, deleteComment, editComment };
