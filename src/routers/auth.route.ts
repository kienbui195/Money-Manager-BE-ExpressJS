import express, { Request, Response } from "express";
import { auth } from "../middleware/login.middleware";
import authController from '../controllers/auth.controller'

const authRouter = express.Router();

authRouter.post('/register', (req, res) => {
    authController.register(req, res).catch(() => { res.status(500).json('Server error') });
})

authRouter.post('/login', (req, res) => {
    authController.postLogin(req, res).catch(() => res.status(500).json('server error'));
}, auth);

authRouter.post('/register', (req, res) => authController.register(req, res).catch(() => res.status(500).json('Server error')))

authRouter.post('/verify/:id', (req, res) => authController.verifyUser(req, res).catch(() => res.status(500).json('Server error')))


export default authRouter;