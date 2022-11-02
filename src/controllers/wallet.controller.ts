import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";
import { WalletModel } from "../schemas/wallet.schema";
import userController from "./user.controller";

class WalletController {
    getAlltWallet = async (req: Request, res: Response) => {
        const wallet = await WalletModel.find()
        try {
            res.status(200).json({ type: 'success', message: wallet })
        } catch (err) {
            res.status(201).json({ type: 'error', message: err })
        }
    }

    getWalletById = async (req: Request, res: Response) => {
        let id = req.body.id
        const wallet = await WalletModel.findById({ _id: id })
        try {
            res.status(200).json({ type: 'success', message: wallet })
        } catch (err) {
            res.status(201).json({ type: 'error', message: err })
        }
    }

    createWallet = async (req: Request, res: Response) => {
        let id = req.params.id
        const wallet = new WalletModel({
            icon : req.body.icon,
            name : req.body.name,
            user_email : req.params.id ,
            money : req.body.money
        })
        let allWallet = await WalletModel.findOne({ name: wallet.name })
        try {
            if(!allWallet) {
                 wallet.save()
                res.status(200).json({ type: 'success', message: {
                    wallet : wallet,
                    message : "Create Wallet Successfully"
                } });
            } else {
                res.status(201).json({type : 'error', message : "Wallet's all ready exits"})
            }
        } catch (error) {
            res.status(200).json({ type: 'error',message: error })

        }
    }

    updateWallet = async (req : Request, res : Response) => {
        const wallet = req.body;
        let idWallet = req.params.id;
        let walletFind = await WalletModel.findById(idWallet)
        try {
            if(walletFind) {
                let newWallet = await WalletModel.findByIdAndUpdate({ _id: idWallet }, wallet)
                res.status(200).json({type: 'success', message: newWallet});
            } else {
                res.status(200).json({type: 'notexist', message: "Update wallet fail!!!" })
            }
        } catch (error) {
            res.status(201).json({type: 'error', message: error})
            
        }    
    }

    deleteWallet = async (req : Request, res : Response) => {
        let id = req.params.id
        let wallet = await WalletModel.findById(id);
        if (!wallet) {
            res.status(200).json({type:'notexist', message: "No Wallet Delete" });
        } else {
            wallet?.delete();
            res.status(200).json({type: 'success', message: 'Delete successfully!'});
        }
    }

    getTotalMoney = async (req : Request, res : Response) => {
        let id = req.params.id
        let TotalMoney = await UserModel.findById(id).populate('iwallet','money').exec((err,data)=> {
            if(err){
                res.status(401).json({message : `Không có kết quả tìm kiếm` })
                console.log(err); 
            }
            console.log(data);    
            res.status(200).json(TotalMoney)  
        })
    }
}

export default new WalletController()