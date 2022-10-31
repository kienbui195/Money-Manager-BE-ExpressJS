import { model, Schema } from "mongoose"


export interface IUser {
    username?: string;
    email?: string;
    password?: string
    
}

const userSchema = new Schema<IUser>({
    username: String,
    email: String,
    password: String
});

const User = model<IUser>('User', userSchema);
export {User}