import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoute from "./src/routers/auth.route";
import mongoose from "mongoose";
import cors from 'cors';
import  userRoute  from "./src/routers/user.route";
import walletRoute from "./src/routers/wallet.route";
import transactionRoute from "./src/routers/transaction.route";
import categoryRoute from "./src/routers/category.route"

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

app.use('/auth', authRoute);
app.use('/wallet', walletRoute);
app.use('/transaction', transactionRoute);
app.use('/category', categoryRoute);
app.use('/user', userRoute)

app.get('/*', (req, res) => {
    res.send(200).json({ type: 'error', message: '404 Not Found' });
})

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));