import { Router } from "express";
import User from "../controllers/user.controller";

export const userRouter = Router()

userRouter.post('/register', User.register )
userRouter.post('/verify/:id', User.postVerifyUser )