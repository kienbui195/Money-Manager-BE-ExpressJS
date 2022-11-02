import express, { Request, Response } from "express";
import authController from '../controllers/auth.controller'

const authRoute = express.Router();

authRoute.post('/register', authController.register);
authRoute.post('/login', authController.postLogin);
authRoute.post('/verify/:id', authController.verifyUser);
authRoute.get('/is-login', authController.isLogin);
authRoute.post('/login-gg', authController.loginWithGoogle);

export default authRoute;