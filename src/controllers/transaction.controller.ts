import { Request, Response } from 'express';
import { TransactionModel } from "../schemas/transaction.schema";
import {WalletModel} from "../schemas/wallet.schema";
import {CategoryModel} from "../schemas/category.schema";


class TransactionController {
    async postAddTransaction(req: Request, res: Response) {
        const walletId = req.body.wallet_id;
        const categoryId = req.body.category_id;
        const walletUser = await WalletModel.findOne({_id: walletId});
        const category = await CategoryModel.findOne({_id: categoryId});
        try {
            if(walletId && walletUser && category) {
                const transaction = new TransactionModel({
                    category_id: categoryId,
                    category_name : category.name,
                    category_icon : category.icon,
                    date: req.body.date,
                    amount: req.body.amount,
                    wallet_id: walletId,
                    wallet_name : walletUser.name,
                    wallet_icon : walletUser.icon,
                    user_id: req.body.user_id,
                    note: req.body.note,
                });
                await transaction.save();

                const newAmount = walletUser.amount - req.body.amount

                await WalletModel.findOneAndUpdate({_id: walletId},{amount: newAmount})

                res.status(200).json({ type: 'success', message: 'Added transaction successfully!' });
            }else {
                res.status(200).json({ type: 'error', message: 'Please Create Wallet!' })
            }
        } catch (err) {
            res.status(500).json('Server error');
        }
    }

    async getAllTransaction(req: Request, res: Response) {
        const userId = req.params.user_id

        const transactions = await TransactionModel.find({ user_id: userId })
        try {
            if (transactions.length > 0) {
                res.status(200).json({
                    type: 'success', data: {
                        message: 'Get Data Success!',
                        data: transactions
                    }
                })
            } else {
                res.status(200).json({ type: 'notexist', message: 'Not Exist!' })
            }

        } catch (err) {
            res.status(500).json('Server error')

        }
    }



}

const transactionController = new TransactionController();
export default transactionController;