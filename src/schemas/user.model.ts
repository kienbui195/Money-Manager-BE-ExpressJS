import {Schema, model} from "mongoose";

interface IUser {
    username: string,
    email: string, 
    password: string,
    isVerify: boolean,
};

const userSchema = new Schema<IUser>({
    username: String,
    email: String,
    password: String,
    isVerify: {
        type: Boolean,
        default: false
    }
});

const UserModel = model<IUser>('User', userSchema);

export { UserModel };