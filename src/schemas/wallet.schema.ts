import {Schema, model} from "mongoose";
import { IUser } from "./user.model";

export interface IWallet {
    icon : string
    name: string,
    user_id: IUser, 
    amount: string,
};

const walletSchema = new Schema<IWallet>({
    icon : String,
    name: String,
    user_id: {
        type : Schema.Types.ObjectId,
        ref:'User'
    },
    amount: {
        type: String,
        default: "0"
    },

});

const WalletModel = model<IWallet>('Wallet', walletSchema);

export { WalletModel };