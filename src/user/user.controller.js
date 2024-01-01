import { AppError } from "../../Utilities/Utilities.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signIn = catchAsyncError(async (req, res, next) => {
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


