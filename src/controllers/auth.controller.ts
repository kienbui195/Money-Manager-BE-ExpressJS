const { UserModel } = require('../schemas/user.model')
import express, { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import verifyByEmail from "../tools/Verify Email/mail.setup";

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
            console.log(error);
            res.status(500).json('Server error');
        }
    }

    async postLogin(req: Request, res: Response) {
        try {
            const data: any = req.body;
            const user = await UserModel.findOne({ email: data.email });
            if (user) {
                if (data.password === user.password) {
                    let payload = {
                        user_id: user["id"],
                        email: user["email"]
                    }
                    const token = jwt.sign(payload, '230193', {
                        expiresIn: 36000,
                    })
                    res.status(200)
                        .cookie('jwt_token', JSON.stringify(token), {
                            httpOnly: true,
                            maxAge: 1 * 15 * 1 * 1
                        })
                        .json({
                            type: 'success', message: {
                                message: 'Signed in successfully!',
                                data: user
                            }
                        })
                } else {
                    res.status(200).json({ type: 'error', message: 'Password is not correct!' });
                }
            } else {
                res.status(200).json({
                    type: 'error',
                    message: 'Account does not exist yet!',
                });
            }
        } catch (err) {
            res.status(500).json('Server error')
        }

    }

    verifyUser = async (req: Request, res: Response) => {
            let id = req.params.id
        try {
            let idUser = await UserModel.findByIdAndUpdate({ _id: id }, { isVerify : { type : true} })
            if (idUser) {
                res.status(200).json({ type:'success',message: "Verify successfully" })
            } else {
                await UserModel.findOneAndUpdate({ _id: id }, { isVerify: true })
                res.status(200).json({ type: 'success', message: 'Verify Success' })
            }
        } catch (error) {
            res.status(500).json('Server error')
        }
    }

    async isLogin(req: Request, res: Response) {
        try {
            let authorization = req.headers.authorization;
            if (authorization) {
                let accessToken = authorization.split(' ')[1];
                if (!accessToken) {
                    res.status(200).json({ type: 'No', message: 'User is not logged in' });
                } else {
                    jwt.verify(accessToken, SECRET_KEY, (err: any, data: any) => {
                        if (err) {
                            res.status(200).json({
                                type: 'No',
                                error: err.message,
                                message: 'User is not logged in'
                            });
                        } else {
                            req.body.decoded = data;
                            res.status(200).json({
                                type: 'Yes', message: {
                                    message: 'User is logged in',
                                    data: req.body.decoded
                                }
                            })
                        }
                    });
                }
            }
        } catch (err) {
            res.status(500).json({
                message: 'Server error'
            });
        }
    }
}

const authController = new AuthController();

export default authController;