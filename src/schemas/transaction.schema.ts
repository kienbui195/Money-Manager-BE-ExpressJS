import {Schema, model} from "mongoose";
import {ICategory} from "./category.schema";
import {IWallet} from "./wallet.schema";

interface ITransaction {
    category: ICategory,
    date: string,
    amount: number,
    wallet_id: string,
    user_id: string,
    note: string,
}

const transactionSchema = new Schema<ITransaction>({
    category: {
        type : Schema.Types.ObjectId,
        ref:'Category'
    },
    date: String,
    amount:  Number,
    wallet_id: String,
    user_id: String,
    note: String,
});

const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export { TransactionModel };