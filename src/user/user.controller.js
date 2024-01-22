import { AppError } from "../../Utilities/Utilities.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../../dataBase/models/UserModel.js";
import { removeImage } from "../../middleware/deleteImg.js";
dotenv.config();
const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(process.env.EMAIL);
  if (email == process.env.EMAIL && password == process.env.PASSWORD) {
    const token = jwt.sign(
      { email, password, role: "admin" },
      process.env.KEY_JWT
    );
    res.status(200).send({ message: "success", data: token });
  } else {
    next(new AppError("incorrect email or password"));
  }
});

const register = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const oldUser = await userModel.findOne({ email });
  if (oldUser) return next(new AppError("user already exists", 400));
  const user = await userModel.create(req.body);
  user.token = await user.generateToken();
  console.log(user.token);
  res.status(200).send({ message: "success", data: user });
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return next(new AppError("user not found", 400));
  if (!(await user.comparePassword(password))) {
    return next(new AppError("incorrect email or password"));
  }
  const token = await user.generateToken();
  res.status(200).send({ message: "success", data: user, token });
});

const userProfile = catchAsyncError(async (req, res, next) => {
  if (!req.user) return next(new AppError(" user not fount ", 401));
  res.status(200).send({ message: "success", data: req.user });
});

const updateUserProfile = catchAsyncError(async (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = await userModel.findByIdAndUpdate(_id, req.body);
  removeImage(avatar.public_id);
  res.status(200).send({ message: "success" });
});


export { signIn, register, login, userProfile, updateUserProfile };
