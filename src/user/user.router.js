import { Router } from "express";
import {
  login,
  register,
  signIn,
  updateUserProfile,
  userProfile,
} from "./user.controller.js";
import { auth } from "../../middleware/Auth.js";
import { validation } from "../../middleware/validation.js";
import {
  userSchemaCreate,
  userSchemaLogin,
  userSchemaUpdate,
} from "./user.validation.js";
import { uploadMixfile, uploadSingleFile } from "../../middleware/fileUploud.js";
import { saveImg } from "../../middleware/uploudToCloud.js";

const userRouter = Router();
userRouter.route("/").post(signIn);
userRouter.route("/register").post(validation(userSchemaCreate), register);
userRouter.route("/login").post(validation(userSchemaLogin), login);
userRouter.route("/profile").get(auth, userProfile);
userRouter
  .route("/updateProfile")
  .patch(auth, uploadSingleFile('avatar'),saveImg, updateUserProfile);


export default userRouter;
