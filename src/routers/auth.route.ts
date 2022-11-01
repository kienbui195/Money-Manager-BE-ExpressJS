import express, { Request, Response } from "express";
const AuthController = require('../controllers/auth.controller');

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', (req, res) => {
    authController.register(req, res).catch(()=> { res.status(500).json('Server error')});
})





export default authRouter;