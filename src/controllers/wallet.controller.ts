import { Request, Response } from 'express';
import { WalletModel } from '../schemas/wallet.schema';

class WalletController {
    async postAddMoneyToWallet(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await WalletModel.findOneAndUpdate({ _id: id }, { amount: req.body.amount });
            res.status(200).json({ type: 'success', message: 'Update Successfully!' });
        } catch (err) {
            res.status(500).json('Server error');
        }
    }
}

const walletController = new WalletController();

export default walletController;