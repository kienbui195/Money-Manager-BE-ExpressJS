import { Request, Response } from 'express';
import { TransactionModel } from "../schemas/transaction.schema";

class TransactionController {
    async postAddTransaction(req: Request, res: Response) {
        const data = req.body;
        try {
            await TransactionModel.create(data);
            res.status(200).json({ type: 'success', message: 'Added transaction successfully!' });

        } catch (err) {
            res.status(500).json('Server error');
        }
    }

    async getAllTransaction(req: Request, res: Response) {
        const userId = req.params.user_id
        const transactions = await TransactionModel.find({ user_id: userId })
        try {
            
        } catch (err) {
            
        }
    }
}

const transactionController = new TransactionController();
export default transactionController;