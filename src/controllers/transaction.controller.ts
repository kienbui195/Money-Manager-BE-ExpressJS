import {Request, Response} from 'express';
import {TransactionModel} from "../schemas/transaction.schema";
import {WalletModel} from "../schemas/wallet.schema";
import {CategoryModel} from "../schemas/category.schema";


class TransactionController {

    async postAddTransaction(req: Request, res: Response) {
        const walletId = req.body.wallet_id;
        const categoryId = req.body.category_id;
        const walletUser = await WalletModel.findOne({_id: walletId});
        const category = await CategoryModel.findOne({_id: categoryId});
        try {
            if (walletId && walletUser && category) {
                const beforeAmount = walletUser.amount
                const newAmount = walletUser.amount - req.body.amount
                await WalletModel.findOneAndUpdate({_id: walletId}, {amount: newAmount})
                const transaction = new TransactionModel({
                    category_id: categoryId,
                    category_name: category.name,
                    category_icon: category.icon,
                    date: req.body.date,
                    amount: req.body.amount,
                    wallet_id: walletId,
                    wallet_name: walletUser.name,
                    wallet_icon: walletUser.icon,
                    user_id: req.body.user_id,
                    note: req.body.note,
                    beforeAmount: beforeAmount,
                    afterAmount: newAmount,
                });
                await transaction.save();
                res.status(200).json({type: 'success', message: 'Added transaction successfully!'});
            } else {
                res.status(200).json({type: 'error', message: 'Please Create Wallet or Category!'})
            }
        } catch (err) {
            res.status(500).json('Server error');
        }
    }

    async getAllTransaction(req: Request, res: Response) {
        const userId = req.params.user_id

        const transactions = await TransactionModel.find({user_id: userId})
        try {
            if (transactions.length > 0) {
                res.status(200).json({
                    type: 'success', data: {
                        message: 'Get Data Success!',
                        data: transactions
                    }
                })
            } else {
                res.status(200).json({type: 'notexist', message: 'Not Exist!'})
            }

        } catch (err) {
            res.status(500).json('Server error')

        }
    }

    async updateTransaction(req: Request, res: Response) {
        const transactionId = req.params.id;
        const transaction = await TransactionModel.findOne({_id: transactionId});
        const walletId =  req.body.wallet_id;
        const categoryId =  req.body.category_id;
        const walletUser = await WalletModel.findOne({_id: walletId});
        const category = await CategoryModel.findOne({_id: categoryId});
        try {
            if(walletId && walletUser && category && transaction) {
                const oldAmount = transaction.amount;
                const updateAmount = walletUser.amount + oldAmount
                await WalletModel.findOneAndUpdate({_id: walletId},{amount: updateAmount})
                const walletUserNew = await WalletModel.findOne({_id: walletId});
                if(walletUserNew) {
                    const afterAmount = walletUserNew.amount - req.body.amount
                    await WalletModel.findOneAndUpdate({_id: walletId},{amount: afterAmount})
                    const beforeAmount = walletUserNew.amount
                    const newTransaction = {
                        category_id: categoryId,
                        category_name : category.name,
                        category_icon : category.icon,
                        date: req.body.date,
                        amount: req.body.amount,
                        wallet_id: walletId,
                        wallet_name : walletUser.name,
                        wallet_icon : walletUser.icon,
                        user_id:  req.body.user_id,
                        note: req.body.note,
                        beforeAmount:beforeAmount,
                        afterAmount:afterAmount,
                    };
                    await TransactionModel.findByIdAndUpdate({_id:transactionId},newTransaction);
                }
                res.status(200).json({ type: 'success', message: 'Update transaction successfully!' });
            }else {
                res.status(200).json({ type: 'error', message: 'Update Error!' })
            }
        } catch (err) {
            res.status(500).json('Server error');
        }
    }



}

const transactionController = new TransactionController();
export default transactionController;