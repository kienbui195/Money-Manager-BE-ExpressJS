import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";

class UserController {
    async getAllUser (req: Request, res: Response) {
        const user = await UserModel.find()
        try {
            res.status(200).json({ type: 'success', message: user })
        } catch (err) {
            res.status(200).json({ type: 'error', message: err })
        }
    }

    async getUserById (req: Request, res: Response) {
        const userId = req.params.id
        const user = await UserModel.findById({ _id: userId }, req.body)
        try {
            res.status(200).json({type: 'success', message: user})
        } catch (err) {
            res.status(200).json({ type: 'error',message: err })
        }
    }


    async updateUser (req: Request, res: Response) {
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


    async deleteUser (req: Request, res: Response) {
        let id = req.params.id
        let user = await UserModel.findById(id);
        if (!user) {
            res.status(200).json({type:'notexist', message: "No User Delete" });
        }
        user?.delete();
        res.status(200).json({type: 'success', message: 'Delete successfully!'});
    }
    
}

export default new UserController()