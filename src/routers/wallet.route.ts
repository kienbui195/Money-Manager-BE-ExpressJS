import { Router } from "express";
import walletController from "../controllers/wallet.controller";

export const walletRoute = Router()

walletRoute.get('/getAll', walletController.getAllWallet);
walletRoute.get('/get-all-wallet/:id', walletController.getWalletByIdUser);
walletRoute.get('/total/:id', walletController.getTotalMoney);
walletRoute.post('/create', walletController.createWallet);
walletRoute.put('/update/:id', walletController.updateWallet);
walletRoute.delete('/delete/:id', walletController.deleteWallet);
