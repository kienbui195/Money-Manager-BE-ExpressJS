import { Router } from "express";
import UserController from "../controllers/user.controller";
import verifyByEmail from "../tools/Verify Email/mail.setup";

export const userRouter = Router()

