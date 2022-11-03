import { Request, Response } from 'express';
import { TransactionModel } from "../schemas/transaction.schema";
import {WalletModel} from "../schemas/wallet.schema";


class TransactionController {
    async postAddTransaction(req: Request, res: Response) {
        const walletId = req.body.wallet_id;
        const categoryId = req.body.category_id;
        const walletUser = await WalletModel.findById({_id: walletId});
        const category = await WalletModel.findById({_id: categoryId});
        const transaction = {

        };
        try {
            if(walletId) {
                await TransactionModel.create(transaction);
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
        console.log(userId);

        const transactions = await TransactionModel.find({ user_id: userId })
        try {
            console.log(transactions)
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