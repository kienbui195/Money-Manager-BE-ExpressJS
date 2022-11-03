import {Schema, model} from "mongoose";

interface ITransaction {
    category: string,
    amount: number,
    wallet_id: string,
    user_id: string,
    note: string,
    date: string
}

const transactionSchema = new Schema<ITransaction>({
    category: String,
    amount:  Number,
    wallet_id: String,
    user_id: String,
    note: String,
    date: String
});

const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export { TransactionModel };