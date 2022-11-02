import express, { Request, Response } from "express";
import authController from '../controllers/auth.controller'

const authRouter = express.Router();

authRouter.post('/register', authController.register)

authRouter.post('/login', authController.postLogin);

authRouter.post('/verify/:id', authController.verifyUser)

authRouter.get('/is-login', authController.isLogin)

export default authRouter;