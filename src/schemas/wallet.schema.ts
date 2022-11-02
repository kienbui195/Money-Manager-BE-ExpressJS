import {Schema, model} from "mongoose";
import { IUser } from "./user.model";

export interface IWallet {
    icon : string
    name: string,
    user_email: IUser, 
    money: number,
};

const walletSchema = new Schema<IWallet>({
    icon : String,
    name: String,
    user_email: {
        type : Schema.Types.ObjectId,
        ref:'User'
    },
    money: {
        type: Number,
        default: 0
    },

});

const WalletModel = model<IWallet>('Wallet', walletSchema);

export { WalletModel };