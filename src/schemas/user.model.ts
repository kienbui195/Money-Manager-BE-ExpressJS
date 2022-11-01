import {Schema, model} from "mongoose";

interface IUser {
    username: string,
    email: string, 
    password: string,
    isVerify: boolean,
    google_id: string
};

const userSchema = new Schema<IUser>({
    username: String,
    email: String,
    password: String,
    isVerify: {
        type: Boolean,
        default: false
    },
    google_id: String
});

const UserModel = model<IUser>('User', userSchema);

export { UserModel };