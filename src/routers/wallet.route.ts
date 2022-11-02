import express, { Request, Response } from "express";
import walletController from "../controllers/wallet.controller";
import { auth } from "../middleware/login.middleware";

const walletRouter = express.Router();

walletRouter.put('/edit-money/:id', walletController.postAddMoneyToWallet)

export default walletRouter;
