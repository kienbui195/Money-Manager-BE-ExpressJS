import {Schema, model} from "mongoose";
import {ICategory} from "./category.schema";
import {IWallet} from "./wallet.schema";

interface ITransaction {
    category: ICategory,
    amount: number,
    wallet_id: string,
    user_id: string,
    note: string,
    date: string
}

const transactionSchema = new Schema<ITransaction>({
    category: {
        type : Schema.Types.ObjectId,
        ref:'Category'
    },
    amount:  Number,
    wallet_id: String,
    user_id: String,
    note: String,
    date: String
});

const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export { TransactionModel };