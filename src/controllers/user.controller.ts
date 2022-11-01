import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";
import * as bcrypt from 'bcrypt'; 
import console from "console";
import verifyByEmail from "../tools/Verify Email/mail.setup";
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
            let userId = await UserModel.findOne({email: user.email})
            
            if(userId == null ) {
                user.password = await bcrypt.hash(user.password, 10);
                 let newuser = await UserModel.create(user);
                res.status(201).json({ userId : newuser._id, message:  "Register Successfully" });
            }
            else {
                res.status(200).json({
                    err: "User already exists"
                });
            }
        
        } catch (error) {
            console.log(error);
			res.status(500).json('Server error');
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



    postVerifyUser = async (req: Request, res: Response) => {
        let id = req.params.id
        try {
            let idUser = await UserModel.findByIdAndUpdate({_id : id},{isVerify : true})
            if(idUser) {
                res.status(200).json({message : "Verify successfully"})
            } 
        } catch (error) {
            console.log(error)
            res.status(404).json({error : error})
        }
    }
}

export default new User()