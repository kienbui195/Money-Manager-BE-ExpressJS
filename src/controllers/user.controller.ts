import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";
import console from "console";
import verifyByEmail from "../tools/Verify Email/mail.setup";
class User {
    getAllUser = async (req: Request, res: Response) => {
        const user = await UserModel.find()
        try {
            res.status(200).json({ type: 'success', message: user })
        } catch (err) {
            res.status(200).json({ type: 'error', message: err })
        }
    }

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

    getUserById = async (req: Request, res: Response) => {
        const userId = req.params.id
        const user = await UserModel.findById({ _id: userId }, req.body)
        try {
            res.status(200).json({type: 'success', message: user})
        } catch (err) {
            res.status(200).json({ type: 'error',message: err })
        }
    }


    updateUser = async (req: Request, res: Response) => {
        console.log(req.body)
        let id = req.params.id;
        let publisher = await UserModel.findById(id);
        if (!publisher) {
            res.status(200).json({type: 'notexist', message: "Update user fail!!!" })
        }
        else {
            let data = req.body;
            let newUser = await UserModel.findByIdAndUpdate({ _id: id }, data);
            res.status(200).json({type: 'success', message: newUser});
        }
    }


    deleteUser = async (req: Request, res: Response) => {
        let id = req.params.id
        let user = await UserModel.findById(id);
        if (!user) {
            res.status(200).json({type:'notexist', message: "No User Delete" });
        }
        user?.delete();
        res.status(200).json({type: 'success', message: 'Delete successfully!'});
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

export default new User()