import express, { Request, Response } from "express";
import transactionController from "../controllers/transaction.controller"

const transactionRoute = express.Router();

transactionRoute.post('/add-transaction', transactionController.postAddTransaction)


export default transactionRoute;
