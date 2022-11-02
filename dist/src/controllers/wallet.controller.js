"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_schema_1 = require("../schemas/wallet.schema");
class WalletController {
    constructor() {
        this.getAlltWallet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const wallet = yield wallet_schema_1.WalletModel.find();
            try {
                res.status(200).json({ type: 'success', message: wallet });
            }
            catch (err) {
                res.status(201).json({ type: 'error', message: err });
            }
        });
        this.getWalletById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.body.id;
            const wallet = yield wallet_schema_1.WalletModel.findById({ _id: id });
            try {
                res.status(200).json({ type: 'success', message: wallet });
            }
            catch (err) {
                res.status(201).json({ type: 'error', message: err });
            }
        });
        this.createWallet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const wallet = new wallet_schema_1.WalletModel({
                icon: req.body.icon,
                name: req.body.name,
                userId: id,
                money: req.body.money
            });
            let allWallet = yield wallet_schema_1.WalletModel.findOne({ name: wallet.name });
            try {
                if (!allWallet) {
                    wallet.save();
                    res.status(200).json({ type: 'success', message: {
                            wallet: wallet,
                            message: "Create Wallet Successfully"
                        } });
                }
                else {
                    res.status(201).json({ type: 'error', message: "Wallet's all ready exits" });
                }
            }
            catch (error) {
                res.status(200).json({ type: 'error', message: error });
            }
        });
        this.updateWallet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const wallet = req.body;
            let idWallet = req.params.id;
            let walletFind = yield wallet_schema_1.WalletModel.findById(idWallet);
            try {
                if (walletFind) {
                    let newWallet = yield wallet_schema_1.WalletModel.findByIdAndUpdate({ _id: idWallet }, wallet);
                    res.status(200).json({ type: 'success', message: newWallet });
                }
                else {
                    res.status(200).json({ type: 'notexist', message: "Update wallet fail!!!" });
                }
            }
            catch (error) {
                res.status(201).json({ type: 'error', message: error });
            }
        });
        this.deleteWallet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let wallet = yield wallet_schema_1.WalletModel.findById(id);
            if (!wallet) {
                res.status(200).json({ type: 'notexist', message: "No Wallet Delete" });
            }
            else {
                wallet === null || wallet === void 0 ? void 0 : wallet.delete();
                res.status(200).json({ type: 'success', message: 'Delete successfully!' });
            }
        });
        this.getTotalMoney = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let TotalMoney = yield wallet_schema_1.WalletModel.findById(id).populate('userId', 'username').exec((err, data) => {
                if (err) {
                    res.status(401).json({ message: `Không có kết quả tìm kiếm` });
                    console.log(err);
                }
                console.log(data);
                res.status(200).json(TotalMoney);
            });
        });
    }
}
exports.default = new WalletController();
