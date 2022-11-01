import { Router } from "express";
import User from "../controllers/user.controller";
import verifyByEmail from "../tools/Verify Email/mail.setup";

export const userRouter = Router()

