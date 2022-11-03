import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";

class UserController {

    async getUserById (req: Request, res: Response) {
        const userId = req.params.id
        const user = await UserModel.findOne({ _id: userId })
        try {
            if (user) {
                res.status(200).json({type: 'success', message: user})
            } else {
                res.status(200).json({type: 'error', message: 'Something Wrong!'})
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
    }


    async updateUser (req: Request, res: Response) {

        console.log(req.body)
        let id = req.params.id;
        let publisher = await UserModel.findById(id);
        if (!publisher) {
            let data = req.body;
            let newUser = await UserModel.findByIdAndUpdate({ _id: id }, data);
            res.status(200).json({type: 'success', message: newUser});
        }
        else {
       
            res.status(200).json({type: 'notexist', message: "Update user fail!!!" })

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