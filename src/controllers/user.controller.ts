import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";
import console from "console";
class User {
    getAllUser = async (req: Request, res: Response) => {
        const user = await UserModel.find()
        try {
            res.status(200).json({ type: 'success', message: user })
        } catch (err) {
            res.status(200).json({ type: 'error', message: err })
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
    
}

export default new User()