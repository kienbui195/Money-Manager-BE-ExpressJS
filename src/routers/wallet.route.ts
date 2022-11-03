import express from "express";
import walletController from "../controllers/wallet.controller";

const walletRoute = express.Router()

walletRoute.get('/get-all-wallet/:id', walletController.getWalletByIdUser);
walletRoute.get('/total/:id', walletController.getTotalMoney);
walletRoute.post('/create', walletController.createWallet);
walletRoute.put('/update/:id', walletController.updateWallet);
walletRoute.delete('/delete/:id', walletController.deleteWallet);

export default walletRoute;