import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";
import { WalletModel } from "../schemas/wallet.schema";
import {TransactionModel} from "../schemas/transaction.schema";
class WalletController {

    async getWalletByIdUser(req: Request, res: Response) {
        let id = req.params.id;
        const wallet = await WalletModel.find({user_id :  id })
        try {
            res.status(200).json({ type: 'success', wallet })
        } catch (err) {
            res.status(500).json('Server error')
        }
    }

    async createWallet(req: Request, res: Response) {
        const data = req.body
        const wallet = new WalletModel({
            icon : data.icon,
            name : data.name,
            user_id: data.user_id,
            // Lay id params
            amount : data.amount
        })
        let allWallet = await WalletModel.findOne({ name: wallet.name })
        try {
            if (!allWallet) {
                wallet.save()
                let Wallet = await WalletModel.findOne({ name: wallet.name})
                let dateNow = new Date().getDate()
                let monthNow = new Date().getMonth()
                let year = new Date().getFullYear()
                if (Wallet) {
                    let transaction = {
                        category_id: '',
                        category_name: '',
                        category_icon: '',
                        category_type: 'income',
                        date: `${monthNow+1}/${dateNow}/${year}`,
                        amount: wallet.amount,
                        wallet_id: Wallet._id,
                        wallet_name: wallet.name,
                        wallet_icon: wallet.icon,
                        user_id: data.user_id,
                        note:'',
                        beforeAmount: 0,
                        afterAmount: wallet.amount,
                    }
                    console.log(111)
                    await TransactionModel.create(transaction)
                }
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
        
        let walletFind = await WalletModel.findOne({ _id: idWallet })
        try {
            if (walletFind) {
                await WalletModel.findOneAndUpdate({ _id: idWallet }, wallet)
                const newWallet = await WalletModel.findOne({_id : idWallet})
                res.status(200).json({ type: 'success', message: newWallet });
            } else {
                res.status(200).json({ type: 'notexist', message: "Update wallet fail!!!" })
            }
        } catch (error) {
            res.status(500).json('Server error')

        }
    }

    async deleteWallet(req: Request, res: Response) {
        let id = req.params.id
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
        let id = req.params.id;
        const findWalletByUser = await WalletModel.find({user_id :  id })
        try {
           const total = findWalletByUser.reduce((total,item) => total = total +item.amount, 0 )
            res.status(200).json({ type: 'success', total })
        } catch (err) {
            res.status(500).json('Server error')
        }
    }
}
export default new WalletController()
