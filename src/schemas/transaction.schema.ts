import {Schema, model} from "mongoose";

interface ITransaction {
    category_id: string,
    category_name: string,
    category_icon: string,
    category_type: string,
    date: string,
    beforeAmount: number,
    amount: number,
    afterAmount: number,
    wallet_id: string,
    wallet_name: string,
    wallet_icon: string,
    user_id: string,
    note: string,
}

const transactionSchema = new Schema<ITransaction>({
    category_id: String,
    category_name : String,
    category_icon: String,
    category_type: String,
    date: String,
    beforeAmount : Number,
    amount:  Number,
    afterAmount : Number,
    wallet_id: String,
    wallet_name : String,
    wallet_icon : String,
    user_id: String,
    note: String,

});

const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export { TransactionModel };