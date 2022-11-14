const { UserModel } = require('../schemas/user.model')
import express, { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import verifyByEmail from "../tools/Verify Email/mail.setup";
import forgotPasswordByEmail from "../tools/Verify Email/mail.forgotpassword";


export const SECRET_KEY = '190896';

class AuthController {

    async register(req: Request, res: Response) {
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
            res.status(500).json('Server error');
        }
    }

    async postLogin(req: Request, res: Response) {
        
        try {
            const data: any = req.body;
            const user = await UserModel.findOne({ email: data.email });
            if (user && user.isVerify === true) {
                if (data.password === user.password) {
                    let payload = {
                        user_id: user["id"],
                    }
                    const token = jwt.sign(payload, '230193', {
                        expiresIn: 36000,
                    })
                    res.status(200)
                        .json({
                            type: 'success', data: {
                                message: 'Signed in successfully!',
                                data: user,
                                token: token
                            }
                        })
                } else {
                    res.status(200).json({ type: 'error', message: 'Password is not correct!' });
                }
            } else {
                res.status(200).json({
                    type: 'notexist',
                    message: 'Account does not exist yet!',
                });
            }
        } catch (err) {
            res.status(500).json('Server error')
        }

    }

    async verifyUser(req: Request, res: Response) {

        try {
            let id = req.params.id
            let idUser = await UserModel.findByIdAndUpdate({ _id: id }, { isVerify: true })
            if (idUser) {
                res.status(200).json({ type: 'success', message: "Verify successfully" })
            } else {
                res.status(200).json({ type: 'error', message: 'Verify error!' });
            }
        } catch (error) {
            res.status(500).json('Server error')
        }
    }

    async isLogin(req: any, res: Response) {


        try {
            const user = await UserModel.findOne({ _id: req.body.id })
            let token = req.body["token"];
            if (token) {
                jwt.verify(token, '230193', (err: any, decoded: any) => {
                    if (err) {
                        return res.status(200).json({ type: 'No', message: 'Unauthorized' })
                    } else {
                        req.decoded = decoded;
                        res.status(200).json({
                            type: 'Yes',
                            message: 'User is Login',
                            data: {
                                username: user.username,
                                img: user.img
                            }
                        })
                    }
                })
            } else {
                return res.status(200).json({
                    type: 'error',
                    message: 'No token provided'
                })
            }

        } catch (err) {
            res.status(500).json({
                message: 'Server error'
            });
        }
    }

    async loginWithGoogle(req: Request, res: Response) {

        try {
            const data = req.body;
            const user = await UserModel.findOne({ email: data.email })
            if (user) {
                await UserModel.findOneAndUpdate({ email: data.email }, {
                    google_id: data.google_id,
                    isVerify: true,
                    username: data.username
                })
                let payload = {
                    user_id: user["id"]
                }
                const token = jwt.sign(payload, '230193', { expiresIn: 36000 })
                res.status(200)
                    .json({
                        type: 'success', data: {
                            message: 'Signed in successfully!',
                            data: user,
                            token: token
                        }
                    })
            } else {
                let newUser = new UserModel({
                    username: data.username,
                    google_id: data.google_id,
                    isVerify: true,
                    email: data.email,
                    password: '',
                })
                await newUser.save()
                let payload = {
                    user_id: newUser["id"]
                }
                const token = jwt.sign(payload, '230193', { expiresIn: 36000 })
                res.status(200)
                    .json({
                        type: 'success', data: {
                            message: 'Signed in successfully!',
                            data: newUser,
                            token: token
                        }
                    })
            }
        } catch (err) {
            res.status(500).json('Server error')
        }

    }

    async forgotPassword(req: Request, res: Response) {
        try {
            let email = req.body.email;
            console.log(email)
            let user = await UserModel.findOne({ email:email })
            if (user) {
                if(user.password !== null) {
                    const newID = user.id
                    forgotPasswordByEmail(req, res, newID)
                    res.status(200).json({ type: 'success', message: "Forgot Password Successfully" });
                }else {
                    res.status(200).json({ type: 'error', message: "You login by google" })
                }
            }
            else {
                res.status(200).json({
                    type: 'notexist',
                    message: "User already exists"
                });
            }

        } catch (error) {
            res.status(500).json('Server error');
        }
    }

}

const authController = new AuthController();

export default authController;