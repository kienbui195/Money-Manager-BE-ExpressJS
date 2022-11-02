import express, { Request, Response } from "express";
import transactionController from "../controllers/transaction.controller"

const transactionRoute = express.Router();

transactionRoute.post('/add-transaction', (req, res) =>
    transactionController.postAddTransaction(req, res)
        .catch(() =>res.status(500).json('Server error'))
)

export default transactionRoute;
