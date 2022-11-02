import { Router } from "express";

import User from "../controllers/user.controller";
import walletController from "../controllers/wallet.controller";

export const walletRoute = Router()



walletRouter.put('/edit-money/:id', walletController.postAddMoneyToWallet)


walletRoute.get('/getAll', walletController.getAlltWallet);
walletRoute.get('/getId/:id', walletController.getWalletById);
walletRoute.get('/total/:id', walletController.getTotalMoney);
walletRoute.post('/create/:id', walletController.createWallet);
walletRoute.post('/update/:id', walletController.updateWallet);
walletRoute.delete('/delete/:id', walletController.deleteWallet);
