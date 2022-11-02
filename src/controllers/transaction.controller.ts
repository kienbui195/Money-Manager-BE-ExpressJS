import { Request, Response } from 'express';
import { TransactionModel} from "../schemas/transaction.schema";

class TransactionController{

    async postAddTransaction(req: Request, res: Response){
        const data = req.body;
        await TransactionModel.create(data);
        res.status(200).json({type: 'success', message: 'Added transaction successfully!'});
    }
}

const transactionController = new TransactionController();
export default transactionController;