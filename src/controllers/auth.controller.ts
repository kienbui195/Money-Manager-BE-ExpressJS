const { UserModel } = require('../schemas/user.model')
import express, {Request, Response} from 'express';
import jwt from "jsonwebtoken";
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

    async postLogin(req: Request, res: Response){
        const data:any = req.body;
        const user = await UserModel.findOne({email: data.email});
        if(user){
            if(data.password === user.password){
                let payload = {
                    user_id : user["id"],
                    email : user["email"]
                }
                const token = jwt.sign(payload,'230193', {
                    expiresIn : 36000,
                })
                res.status(200)
                .cookie('jwt_token', JSON.stringify(token), {
                    httpOnly: true,
                    maxAge: 1 * 15 * 1 * 1
                  })
                .json({type: 'success', message: 'Signed in successfully!'})
            }else{
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