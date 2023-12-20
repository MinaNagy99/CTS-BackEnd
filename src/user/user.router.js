import { Router } from "express";
import { signIn } from "./user.controller.js";


const userRouter = Router()
userRouter.route('/').post(signIn)


export default userRouter