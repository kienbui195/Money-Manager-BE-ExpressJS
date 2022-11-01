const { UserModel } = require('../schemas/user.model')
import express, {Request, Response} from 'express';
import jwt from "jsonwebtoken";
import verifyByEmail from "../tools/Verify Email/mail.setup";

class AuthController {
    register = async (req: Request, res: Response) => {
        try {
            let user = req.body;
            let userId = await UserModel.findOne({ email: req.body.email })

            if (userId == null) {
                let newUser = await UserModel.create(user);
                const newID = newUser.id
                verifyByEmail(req, res, newID)
                res.status(201).json({ type: 'success', message: "Register Successfully" });
            }
            else {
                res.status(200).json({
                    type: 'exist',
                    message: "User already exists"
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json('Server error');
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

    postVerifyUser = async (req: Request, res: Response) => {
        let id = req.params.id
        try {
            let idUser = await UserModel.findByIdAndUpdate({ _id: id }, { isVerify: true })
            if (idUser) {
                res.status(200).json({ type:'success',message: "Verify successfully" })
            } else {
                res.status(200).json({ type: 'error', message: "Error Verify" })

            }
        } catch (error) {
            res.status(200).json({ type: 'error' , message: error })
        }
    }

}

const authController = new AuthController();

export default authController;