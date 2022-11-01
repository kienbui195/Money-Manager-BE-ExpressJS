const { UserModel } = require('../schemas/user.model')
import express, { Request, Response } from 'express';

class AuthController {
    async register(req: Request, res: Response) {
        const data: any = req.body;
        const user = await UserModel.findOne({ email: data.email });
        if (!user) {
            const newUser = {
                username: data.username,
                email: data.email,
                password: data.password
            };
            await UserModel.create(newUser);
            return res.status(200).json({ type: 'success', message: 'User created successfully!' });
        } else {
            return res.status(200).json({ type: 'error', message: 'User already exists!' });
        }
    }

    async postLogin(req: Request, res: Response) {
        const data: any = req.body;
        const user = await UserModel.findOne({ email: data.email });
        if (user) {
            if (data.password === user.password) {
                res.status(200).json({ type: 'success', message: 'Signed in successfully!' });
            } else {
                res.status(200).json({ type: 'error', message: 'Password is not correct!' });
            }
        } else {
            res.status(200).json({
                type: 'error',
                message: 'Account does not exist yet!',
            });
        }
    }

    

}

const authController = new AuthController();

export default authController;