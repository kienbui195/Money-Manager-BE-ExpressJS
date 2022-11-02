import {Schema, model} from "mongoose";

interface IWallet {
    name: string,
    user_email: string, 
    amount: number,
    icon: string,
    user_id: object
};

const walletSchema = new Schema<IWallet>({
    name: String,
    user_email: String,
    amount: {
        type: Number,
        default: 0
    },
    icon: String,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const WalletModel = model<IWallet>('Wallet', walletSchema);

export { WalletModel };