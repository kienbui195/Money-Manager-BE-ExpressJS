import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";
import { WalletModel } from "../schemas/wallet.schema";
import mongoose from "mongoose";

class WalletController {

    async getAllWallet(req: Request, res: Response) {
        const wallet = await WalletModel.find()
        try {
            res.status(200).json({ type: 'success', message: wallet })
        } catch (err) {
            res.status(500).json('Server')
        }
    }

    async getWalletByIdUser(req: Request, res: Response) {
        let id = req.body.id;
        
        const wallet = await WalletModel.find({"userId": new mongoose.Types.ObjectId(id)})
        console.log(wallet);
        // try {
        //     res.status(200).json({ type: 'success', message: wallet })
        // } catch (err) {
        //     res.status(500).json('Server error')
        // }
    }

    async createWallet(req: Request, res: Response) {
        const data = req.body
        let id = req.params.id
        const wallet = new WalletModel({
            icon : req.body.icon,
            name : req.body.name,
            userId : id ,
            // Lay id params
            money : req.body.money
        })
        let allWallet = await WalletModel.findOne({ name: wallet.name })
        try {
            if (!allWallet) {
                wallet.save()
                res.status(200).json({
                    type: 'success', message: {
                        wallet: wallet,
                        message: "Create Wallet Successfully"
                    }
                });
            } else {
                res.status(200).json({ type: 'error', message: "Wallet's all ready exits" })
            }
        } catch (error) {
            res.status(500).json('Server error')
        }
    }

    async updateWallet(req: Request, res: Response) {
        const wallet = req.body;
        let idWallet = req.params.id;
        let walletFind = await WalletModel.findById(idWallet)
        try {
            if (walletFind) {
                let newWallet = await WalletModel.findByIdAndUpdate({ _id: idWallet }, wallet)
                res.status(200).json({ type: 'success', message: newWallet });
            } else {
                res.status(200).json({ type: 'notexist', message: "Update wallet fail!!!" })
            }
        } catch (error) {
            res.status(500).json('Server error')

        }
    }

    async deleteWallet(req: Request, res: Response) {
        let id = req.body.id
        try {
            let wallet = await WalletModel.findById(id);
            if (!wallet) {
                res.status(200).json({ type: 'notexist', message: "No Wallet Delete" });
            } else {
                wallet?.delete();
                res.status(200).json({ type: 'success', message: 'Delete successfully!' });
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
         
    }

    async getTotalMoney (req: Request, res: Response) {
        let id = req.params.id
         await UserModel.findById(id).populate('wallet_id', 'amount').exec((err, data) => {
            if (err) {
                res.status(401).json({ message: `Không có kết quả tìm kiếm` })
                console.log(err);
            }
            console.log(data);
            res.status(200).json(data)
        })
    }
}

export default new WalletController()
