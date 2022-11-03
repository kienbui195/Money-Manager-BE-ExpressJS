import {Schema, model} from "mongoose";
import {ICategory} from "./category.schema";
import {IWallet} from "./wallet.schema";

interface ITransaction {
    category: string,
    date: string,
    amount: number,
    wallet: string,
    note: string,
    userId : string
}

const transactionSchema = new Schema<ITransaction>({
    category: String,
    date: String,
    amount:  Number,
    wallet: String,
    note: String,
    userId : String,
});

const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export { TransactionModel };