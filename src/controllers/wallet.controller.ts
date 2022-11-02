import { Request, Response } from 'express';
import { WalletModel } from '../schemas/wallet.schema';

class WalletController {
    async postAddMoneyToWallet (req: Request, res: Response) {
        try {
            const data = req.body;
            const wallet = await WalletModel.findOne({ _id: data.id })
            if (wallet) {
                let newAmount = wallet.amount + data.amount;
                await WalletModel.findOneAndUpdate({ _id: data.id },{amount: newAmount});
                res.status(200).json({ type: 'success', message: 'Update Successfully!' })
            } else {
                res.status(200).json({type: 'notexist', message: 'Not Exist The Wallet!'})
            }
        } catch (err) {
            res.status(500).json('Server error')
        }
    }
}

const walletController = new WalletController();

export default walletController;