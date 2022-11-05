import { Request, Response } from "express";
import { CategoryModel } from "../schemas/category.schema";
import { TransactionModel } from "../schemas/transaction.schema";
import { UserModel } from "../schemas/user.model";
import { WalletModel } from "../schemas/wallet.schema";

class UserController {

    async getUserById(req: Request, res: Response) {
        const userId = req.params.id
        const user = await UserModel.findOne({ _id: userId })
        try {
            if (user) {
                res.status(200).json({ type: 'success', message: user })
            } else {
                res.status(200).json({ type: 'error', message: 'Something Wrong!' })
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
    }


    async updateUsername(req: Request, res: Response) {
        const id = req.params.id;
        let user = await UserModel.findOne({ _id: id });
        try {
            if (user) {
                await UserModel.findOneAndUpdate({ _id: id }, { username: req.body.username });
                res.status(200).json({ type: 'success', message: 'Update success!' });
            }
            else {
                res.status(200).json({ type: 'notexist', message: "Update user fail!!!" })
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
    }

    async changePassword(req: Request, res: Response) {
        const user_id = req.params.id;
        const data = req.body
        const user = await UserModel.findOne({ _id: user_id })
        try {
            if (user) {
                if (data.old_pass == user.password) {
                    if (data.old_pass == data.new_pass) {
                        res.status(200).json({type : 'success', message: 'Your password has not changed!'})
                    } else {
                        await UserModel.findOneAndUpdate({ _id: user_id }, { password: data.new_pass })
                        res.status(200).json({ type: 'success', message: 'Change password success!' })
                    }
                    
                } else {
                    res.status(200).json({ type: 'error', message: 'Wrong old password! ' })
                }
            } else {
                res.status(200).json({ type: 'notexist', message: 'Not exist user!' })
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
    }

    async getProfile(req: Request, res: Response) {
        const userID = req.params.id;
        const wallets = await WalletModel.find({ user_id: userID });
        const transactions = await TransactionModel.find({ user_id: userID });
        const categorys = await CategoryModel.find({ user_id: userID });
        try {
            res.status(200).json({
                type: 'success',
                data: {
                    wallets: wallets.length,
                    transactions: transactions.length,
                    categorys: categorys.length
                }
            })
        } catch (err) {
            res.status(500).json('Server error')
        }

    }
}

export default new UserController()