import {Schema, model} from "mongoose";

export interface IUser {
    username: string,
    img: string,
    email: string, 
    password: string,
    isVerify: boolean,
    google_id: string,
    wallet_id: string,
};

const userSchema = new Schema<IUser>({
    img: String,
    username: String,
    email: String,
    password: String,
    isVerify: {
        type: Boolean,
        default: false
    },
    google_id: String,
    wallet_id : String,
},{ timestamps: true });

const UserModel = model<IUser>('User', userSchema);

export { UserModel };