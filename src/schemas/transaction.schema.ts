import {Schema, model} from "mongoose";

interface ITransaction {
    category: string,
    date: string,
    amount: number,
    wallet_id: string,
    user_id: string,
    note: string,
}

const transactionSchema = new Schema<ITransaction>({
    category: String,
    date: String,
    amount:  Number,
    wallet_id: String,
    user_id: String,
    note: String,

});

const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export { TransactionModel };