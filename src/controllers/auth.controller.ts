const { UserModel } = require('../schemas/user.model')
import express, {Request, Response} from 'express';

class AuthController {
    async register(req: Request, res: Response){
        const data:any = req.body;
        const user = await UserModel.findOne({ email: data.email });
        if(!user){
            const newUser = {
                username: data.username,
                email: data.email,
                password: data.password
            };
            await UserModel.create(newUser);
            return res.status(200).json({type: 'success', message: 'User created successfully!'});
        }else{
            return res.status(200).json({type: 'error', message: 'User already exists!'});
        }
    }


}


module.exports = AuthController;