import { AppError } from "../Utilities/Utilities.js";
import userModel from "../dataBase/models/UserModel.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt, { decode } from "jsonwebtoken";
export const auth = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("token nor provider", 401));
  console.log(process.env.JWT_SECRET);
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) return next(new AppError(err.message));
    console.log(decode);
    const { id } = decoded;
    const user = await userModel.findById(id).select('-password');
    if (!user) return next(new AppError("user not authorized", 401));

    req.user = user;
    next();
  });
});
