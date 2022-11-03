import express from "express";
import transactionController from "../controllers/transaction.controller"

const transactionRoute = express.Router();

transactionRoute.post('/add-transaction', transactionController.postAddTransaction)
transactionRoute.get('/get-all-transaction/:user_id', transactionController.getAllTransaction)



export default transactionRoute;
