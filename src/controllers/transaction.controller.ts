import { Request, Response } from 'express';
import { TransactionModel } from "../schemas/transaction.schema";
import { WalletModel } from "../schemas/wallet.schema";
import { CategoryModel } from "../schemas/category.schema";
import dayjs from 'dayjs';
import sortDecrease from './../tools/sortArray/sortDecrease';
import getFormatDate from './../tools/formatDate';

dayjs().format()
class TransactionController {
    async postAddTransaction(req: Request, res: Response) {
        const userId = req.body.user_id
        const walletId = req.body.wallet_id;
        const categoryId = req.body.category_id;
        const walletUser = await WalletModel.findOne({ _id: walletId });
        const category = await CategoryModel.findOne({ _id: categoryId });
        try {
            if (walletId && walletUser && category && userId ) {
                let newAmount: number = 0
                if (category.type === 'expense') {
                    newAmount = walletUser.amount - req.body.amount
                } else {
                    newAmount = walletUser.amount + req.body.amount
                }
                await WalletModel.findOneAndUpdate({ _id: walletId }, { amount: newAmount })
                const transaction = ({
                    category_id: categoryId,
                    category_name: category.name,
                    category_icon: category.icon,
                    category_type: category.type,
                    date: req.body.date,
                    amount: req.body.amount,
                    wallet_id: walletId,
                    wallet_name: walletUser.name,
                    wallet_icon: walletUser.icon,
                    user_id: userId,
                    note: req.body.note,
                });
                await TransactionModel.create(transaction);
                res.status(200).json({ type: 'success', message: 'Added transaction successfully!' });
            } else {
                res.status(204).json({ type: 'error', message: 'Please Create Wallet or Category!' })
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

    async updateTransaction(req: Request, res: Response) {
        const transactionId = req.params.id;
        const transaction = await TransactionModel.findOne({ _id: transactionId });
        const walletId = req.body.wallet_id;
        const categoryId = req.body.category_id;
        const walletUser = await WalletModel.findOne({ _id: walletId });
        const category = await CategoryModel.findOne({ _id: categoryId });
        try {
            if (walletId && walletUser && category && transaction) {
                if (transaction.category_type === 'expense') {
                    let updateAmount = walletUser.amount + transaction.amount - req.body.amount
                    await WalletModel.findOneAndUpdate({ _id: walletId }, { amount: updateAmount })
                } else {
                    let updateAmount = walletUser.amount - transaction.amount + req.body.amount
                    await WalletModel.findOneAndUpdate({ _id: walletId }, { amount: updateAmount })
                }
                const newTransaction = {
                    category_id: categoryId,
                    category_name: category.name,
                    category_icon: category.icon,
                    category_type : category.type,
                    date: req.body.date,
                    amount: req.body.amount,
                    wallet_id: walletId,
                    wallet_name: walletUser.name,
                    wallet_icon: walletUser.icon,
                    user_id: transaction.user_id,
                    note: req.body.note,
                };
                await TransactionModel.findByIdAndUpdate({ _id: transactionId }, newTransaction);
                res.status(200).json({ type: 'success', message: 'Update transaction successfully!' });
            } else {
                res.status(200).json({ type: 'error', message: 'Update Error!' })
            }
        } catch (err) {
            res.status(500).json('Server error');
        }
    }

    async deleteTransaction(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const transaction = await TransactionModel.findOne({ _id: id })
            if (transaction) {
                const walletUser = await WalletModel.findOne({ _id: transaction.wallet_id });
               if(walletUser  && transaction.category_type == 'expense') {
                  const updateAmount = walletUser.amount + transaction.amount
                   await WalletModel.findOneAndUpdate({ _id: transaction.wallet_id }, { amount: updateAmount })
                   await TransactionModel.deleteOne({ _id: id })
               }else {
                   if (walletUser && transaction.category_type == 'income' && transaction.category_name !== 'Add Wallet') {
                       const updateAmount = walletUser.amount - transaction.amount
                       await WalletModel.findOneAndUpdate({ _id: transaction.wallet_id }, { amount: updateAmount })
                       await TransactionModel.deleteOne({ _id: id })
                   }else {
                       await WalletModel.findOneAndDelete({ _id:transaction.wallet_id})
                       await TransactionModel.deleteOne({ _id: id })
                       await TransactionModel.deleteMany({wallet_id : transaction.wallet_id})
                   }
               }
                res.status(200).json({ type: 'success', message: 'Delete transaction successfully!' });
            } else {
                res.status(204).json({ type: 'error', message: 'Delete Error!' })
            }
        } catch (err) {
            res.status(500).json('Server error');
        }
    }

    async findTransactionCustom(req: Request, res: Response) {
        try {
            const walletId = req.body.wallet_id;
            const startDate = req.body.start_date;
            const endDate = req.body.end_date;
            const userId = req.body.user_id;
            const transactionUser = await TransactionModel.find({ user_id: userId, wallet_id: walletId })
            const transactionTotal = await TransactionModel.find({ user_id: userId })
            const transactionCustom: any = [];

            if (!startDate && !endDate) {
                let today = new Date();
                let dateNow = getFormatDate(today)
                if (!walletId) {
                    for (let item of transactionTotal) {
                        if (Date.parse(item.date) === Date.parse(dateNow)) {
                            transactionCustom.push(item)
                        }
                    }
                    res.status(200).json({ type: 'success', data: {startDate:dateNow, endDate: dateNow, transactions: transactionCustom }})
                } else {
                    for (let item of transactionUser) {
                        if (Date.parse(item.date) === Date.parse(dateNow)) {
                            transactionCustom.push(item)
                        }
                    }
                    res.status(200).json({ type: 'success', data: {startDate:dateNow, endDate: dateNow, transactions: transactionCustom }})

                }
            } else {
                if (walletId) {
                    transactionUser.forEach(transaction => {
                        if (Date.parse(transaction.date) >= Date.parse(startDate)
                            && Date.parse(transaction.date) <= Date.parse(endDate)) {
                            transactionCustom.push(transaction);
                        }
                    })
                } else {
                    transactionTotal.forEach(transaction => {
                        if (Date.parse(transaction.date) >= Date.parse(startDate)
                            && Date.parse(transaction.date) <= Date.parse(endDate)) {
                            transactionCustom.push(transaction);
                        }
                    })
                }
                if (transactionCustom.length > 0) {
                    res.status(200).json({ type: 'success', message: 'find transaction successfully!', data: {startDate:startDate, endDate:endDate, transactions: transactionCustom}});
                } else {
                    res.status(200).json({ type: 'error', message: 'transaction not exist!' })
                }
            }
        } catch (err) {
            res.status(500).json('Server error');
        }
    }


    async getTransactionsInfoThisMonth(req: Request, res: Response) {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        let daysInThisMonth = new Date(year, month, 0).getDate();
        const userID = req.params.id;
        let transactions = await TransactionModel.find({ user_id: userID })


        try {
            if (transactions.length > 0) {
                let list: any = []
                transactions.forEach((transaction) => {

                    if (Date.parse(transaction.date) >= Date.parse(`${month}/01/${year}`) && Date.parse(transaction.date) <= Date.parse(`${month}/${daysInThisMonth}/${year}`)) {
                        list.push(transaction)
                    }
                })
                let inflow: number = 0
                let outflow: number = 0

                let newList = list.reverse()

                newList.forEach((item: any) => {
                    if (item.category_type === 'income') {
                        inflow += item.amount
                    }
                    if (item.category_type === 'expense') {
                        outflow += item.amount
                    }
                });
                res.status(200).json({
                    type: 'success', data: {
                        message: 'Get data success',
                        list: newList,
                        outflow: outflow,
                        inflow: inflow
                    }
                })
            } else {
                res.status(200).json({
                    type: 'null', data: {
                        list: [],
                        inflow: 0,
                        outflow: 0
                    }
                })
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
    }
}

const transactionController = new TransactionController();
export default transactionController;