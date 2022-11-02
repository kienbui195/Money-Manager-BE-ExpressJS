import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./src/routers/auth.route";
import passport from "passport";
import mongoose from "mongoose";
import cors from 'cors';
import { userRouter } from "./src/routers/user.route";
import walletRouter from './src/routers/wallet.route';
import transactionRoute from "./src/routers/transaction.route";

// dotenv.config();

const port = process.env.PORT || 3001;
const app: Express = express();

mongoose.connect('mongodb+srv://admin395:neCVCjNrS4269Yiv@casem5reactjs.8wszhbp.mongodb.net/money-manager-project', () => {
    console.log('DB Connect!');
})

app.use(cors());
app.use(express.static('src/public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/wallet', walletRouter);
app.use('/transaction', transactionRoute)

app.get('/*', (req, res) => {
    res.send(200).json({ type: 'error', message: '404 Not Found' });
})

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));