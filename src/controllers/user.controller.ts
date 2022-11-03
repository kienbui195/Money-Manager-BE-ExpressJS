import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";

class UserController {

    async getUserById(req: Request, res: Response) {
        const userId = req.params.id
        const user = await UserModel.findOne({ _id: userId })
        try {
            if (user) {
                res.status(200).json({ type: 'success', message: user })
            } else {
                res.status(200).json({ type: 'error', message: 'Something Wrong!' })
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
    }


    async updateUsername(req: Request, res: Response) {
        const id = req.params.id;
        let user = await UserModel.findOne({ _id: id });
        try {
            if (user) {
                await UserModel.findOneAndUpdate({ _id: id }, {username: req.body.username});
                res.status(200).json({ type: 'success', message: 'Update success!' });
            }
            else {
                res.status(200).json({ type: 'notexist', message: "Update user fail!!!" })
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
    }
}

export default new UserController()