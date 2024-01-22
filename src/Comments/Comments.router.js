import { Router } from "express";
import { auth } from "../../middleware/Auth.js";
import { addComment } from "./Comments.controller.js";

const commentRouter = Router();

commentRouter.route("/:id").post(auth, addComment);

export default commentRouter
