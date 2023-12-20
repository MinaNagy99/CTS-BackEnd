import { AppError } from "../Utilities/Utilities.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
export const auth = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) return next(new AppError("token nor provider", 401));

  jwt.verify(token, process.env.KEY_JWT, function (err, decoded) {
    if (err) return next(new AppError(err.message));

    if (
      decoded.email == "info@cts.com" &&
      decoded.password == "Eng-Kamel@123" &&
      decoded.role == "admin"
    ) {
      next();
    } else {
      next(new AppError("incorrect email or password", 401));
    }
  });
});
