import {Schema, model} from "mongoose";

interface IWallet {
    name: string,
    user_email: string, 
    amount: number,
};

const walletSchema = new Schema<IWallet>({
    name: String,
    user_email: String,
    amount: {
        type: Number,
        default: 0
    }
});

const WalletModel = model<IWallet>('Wallet', walletSchema);

export { WalletModel };