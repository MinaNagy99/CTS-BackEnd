import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
export const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (email == "info@cts.com" && password == "Eng-Kamel@123") {
    const token = jwt.sign(
      { email, password, role: "admin" },
      process.env.KEY_JWT
    );
    res.status(200).send({ message: "success", data: token });
  }
});
