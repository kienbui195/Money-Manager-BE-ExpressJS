import express from "express";
import transactionController from "../controllers/transaction.controller"

const transactionRoute = express.Router();

transactionRoute.post('/add-transaction', transactionController.postAddTransaction)
transactionRoute.get('/get-all-transaction/:user_id', transactionController.getAllTransaction)
transactionRoute.put('/update-transaction/:id', transactionController.updateTransaction)
transactionRoute.delete('/delete-transaction/:id',transactionController.deleteTransaction)
transactionRoute.post('/get-transaction-custom',transactionController.findTransactionCustom)
transactionRoute.post('/transaction-page/:id', transactionController.getTransactionsInfoThisMonth)


export default transactionRoute;
