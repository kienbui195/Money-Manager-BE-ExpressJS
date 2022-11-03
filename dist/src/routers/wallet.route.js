"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletRoute = void 0;
const express_1 = require("express");
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
exports.walletRoute = (0, express_1.Router)();
exports.walletRoute.get('/getAll', wallet_controller_1.default.getAllWallet);
exports.walletRoute.get('/getId', wallet_controller_1.default.getWalletByIdUser);
exports.walletRoute.get('/total/:id', wallet_controller_1.default.getTotalMoney);
exports.walletRoute.post('/create/:id', wallet_controller_1.default.createWallet);
exports.walletRoute.put('/update/:id', wallet_controller_1.default.updateWallet);
exports.walletRoute.delete('/delete/:id', wallet_controller_1.default.deleteWallet);
