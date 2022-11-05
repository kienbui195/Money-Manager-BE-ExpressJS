import {Schema, model} from "mongoose";
import { IUser } from "./user.model";

export interface IWallet {
    icon : string
    name: string,
    user_id: string, 
    amount: number,
};

const walletSchema = new Schema<IWallet>({
    icon : String,
    name: String,
    user_id: String,
    amount: {
        type: Number,
        default: 0
    },

});

const WalletModel = model<IWallet>('Wallet', walletSchema);

export { WalletModel };