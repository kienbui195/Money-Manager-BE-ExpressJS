import {Schema, model} from "mongoose";
import { IWallet } from "./wallet.schema";

export interface IUser {
    username: string,
    email: string, 
    password: string,
    isVerify: boolean,
    google_id: string,
    wallet_id: IWallet,
};

const userSchema = new Schema<IUser>({
    username: String,
    email: String,
    password: String,
    isVerify: {
        type: Boolean,
        default: false
    },
    google_id: String,
    wallet_id : {
        type : Schema.Types.ObjectId,
        ref : 'Wallet'
    },
});

const UserModel = model<IUser>('User', userSchema);

export { UserModel };