import { Request, Response } from "express";
import { UserModel } from "../schemas/user.model";
import { WalletModel } from "../schemas/wallet.schema";
import { TransactionModel } from "../schemas/transaction.schema";
import getFormatDate from "../tools/formatDate";
class WalletController {


    async getWalletByIdUser(req: Request, res: Response) {

        try {
            let id = req.params.id;
            const wallet = await WalletModel.find({ user_id: id })
            res.status(200).json({ type: 'success', wallet })
        } catch (err) {
            res.status(500).json('Server error')
        }
    }

    async createWallet(req: Request, res: Response) {

        try {
            const data = req.body
            const wallet = new WalletModel({
                icon: data.icon,
                name: data.name,
                user_id: data.user_id,
                amount: data.amount
            })
            let allWallet = await WalletModel.findOne({ user_id: data.user_id})
            if (!allWallet) {
                await wallet.save()
                let Wallet = await WalletModel.findOne({ name: wallet.name, user_id: data.user_id })
                let today = new Date();
                let dateNow = getFormatDate(today)
                if (Wallet && wallet.amount > 0) {
                    let transaction = {
                        category_id: '',
                        category_name: 'Add Wallet',
                        category_icon: wallet.icon,
                        category_type: 'income',
                        date: dateNow,
                        amount: wallet.amount,
                        wallet_id: Wallet._id,
                        wallet_name: wallet.name,
                        wallet_icon: wallet.icon,
                        user_id: data.user_id,
                        note: '',
                    }
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

        try {
            const wallet = req.body;
            let idWallet = req.params.id;
            let walletFind = await WalletModel.findOne({ _id: idWallet })
            if (walletFind) {
                await WalletModel.findOneAndUpdate({ _id: idWallet }, wallet)
                const newWallet = await WalletModel.findOne({ _id: idWallet })
                if (walletFind.amount !== wallet.amount) {
                    let name;
                    let type;
                    let amount;
                    if (walletFind.amount < wallet.amount) {
                        name = 'Other Income'
                        type = 'income'
                        amount = wallet.amount - walletFind.amount
                    } else if (walletFind.amount > wallet.amount) {
                        name = 'Other Expense'
                        type = 'expense'
                        amount = walletFind.amount - wallet.amount
                    }
                    let today = new Date();
                    let dateNow = getFormatDate(today)
                    let transaction = {
                        category_id: '',
                        category_name: name,
                        category_icon: wallet.icon,
                        category_type: type,
                        date: dateNow,
                        amount: amount,
                        wallet_id: walletFind._id,
                        wallet_name: wallet.name,
                        wallet_icon: wallet.icon,
                        user_id: walletFind.user_id,
                        note: '',
                    }
                    await TransactionModel.create(transaction)
                }
                res.status(200).json({ type: 'success', message: newWallet });
            } else {
                res.status(200).json({ type: 'notexist', message: "Update wallet fail!!!" })
            }
        } catch (error) {
            res.status(500).json('Server error')

        }
    }

    async deleteWallet(req: Request, res: Response) {

        try {
            let id = req.params.id
            let wallet = await WalletModel.findById(id);
            if (!wallet) {
                res.status(200).json({ type: 'notexist', message: "No Wallet Delete" });
            } else {
                wallet?.delete();
                await TransactionModel.deleteMany({ wallet_id: id })
                res.status(200).json({ type: 'success', message: 'Delete successfully!' });
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
    }

    async getTotalMoney(req: Request, res: Response) {

        try {
            let id = req.params.id;
            const findWalletByUser = await WalletModel.find({ user_id: id })
            const total = findWalletByUser.reduce((total, item) => total = total + item.amount, 0)
            res.status(200).json({ type: 'success', total })
        } catch (err) {
            res.status(500).json('Server error')
        }
    }
}
export default new WalletController()
