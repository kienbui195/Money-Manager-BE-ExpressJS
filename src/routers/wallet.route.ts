import express, { Request, Response } from "express";
import walletController from "../controllers/wallet.controller";
import { auth } from "../middleware/login.middleware";

const walletRouter = express.Router();

walletRouter.post('/add-money', (req, res) => walletController.postAddMoneyToWallet(req, res).catch(err => res.status(500).json('Server error')))

export default walletRouter;
