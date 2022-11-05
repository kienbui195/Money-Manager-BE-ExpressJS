"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
const walletRoute = express_1.default.Router();
walletRoute.get('/get-all-wallet/:id', wallet_controller_1.default.getWalletByIdUser);
walletRoute.get('/total/:id', wallet_controller_1.default.getTotalMoney);
walletRoute.post('/create', wallet_controller_1.default.createWallet);
walletRoute.put('/update/:id', wallet_controller_1.default.updateWallet);
walletRoute.delete('/delete/:id', wallet_controller_1.default.deleteWallet);
exports.default = walletRoute;
