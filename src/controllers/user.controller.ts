import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";
import * as bcrypt from 'bcrypt'; 
class User{
    getAllUser = async (req : Request, res : Response) => {
        const user = await UserModel.find()
        try {
            res.status(200).json(user)
        } catch (err) {
            res.status(200).json({message : err})
        }
    }

    register = async(req: Request, res: Response)=>{
        try {
            let user = req.body;
            let checkUser = await UserModel.findOne({email: user.email})
            if(!checkUser) {
                user.password = await bcrypt.hash(user.password, 10);
                user = await UserModel.create(user); 
                res.status(201).json({ type: 'success', message: 'Lưu điểm thành công!' });  
            }
            else {
                res.status(200).json({
                    err: "User exited"
                });
            }
        } catch (error) {
            
        }
      
    }

    getUserById = async (req : Request, res : Response) => {
        const userId = req.params.id
        const user = await UserModel.findById({_id : userId} ,req.body)
        try {
            res.status(200).json(user)
        } catch (err) {
            res.status(200).json({message : err})
        }
    }


    updateUser =  async(req: Request, res: Response)=>{
        console.log(req.body)
        let id = req.params.id;
        let publisher = await UserModel.findById(id);
        if(!publisher) {
            res.status(404).json()
        }
        else {
            let data = req.body;
            let newUser = await UserModel.findByIdAndUpdate({_id:id}, data);
            res.status(200).json(newUser);
        }
    }


    deleteUser = async (req: Request, res: Response) => {
        let id = req.params.id
        let user = await UserModel.findById(id);
        if(!user) {
            res.status(404).json({message : "No User Delete"});
        }
        user?.delete();
        res.status(204).json();
    }

    verifyUser = async (req: Request, res: Response) => {
        let id = req.params.id
        let idUser = await UserModel.findByIdAndUpdate({_id : id},{isVerify : true})

    }
}