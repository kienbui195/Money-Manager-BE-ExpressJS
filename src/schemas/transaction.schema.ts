import {Schema, model} from "mongoose";
import {ICategory} from "./category.schema";
import {IWallet} from "./wallet.schema";

interface ITransaction {
    category: ICategory,
    date: string,
    amount: number,
    wallet: IWallet,
    note: string,
}

const transactionSchema = new Schema<ITransaction>({
    category: {
        type : Schema.Types.ObjectId,
        ref:'Category'
    },
    date: String,
    amount:  Number,
    wallet: {
        type : Schema.Types.ObjectId,
        ref:'Wallet'
    },
    note: String,
});

const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export { TransactionModel };