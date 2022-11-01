import express, { Request, Response } from "express";
const AuthController = require('../controllers/auth.controller');

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', (req, res) => {
    authController.register(req, res).catch(()=> { res.status(500).json('Server error')});
})

authRouter.post('/login', (req, res) => {
    authController.postLogin(req, res).catch(() => res.status(500).json('server error'));
});



export default authRouter;