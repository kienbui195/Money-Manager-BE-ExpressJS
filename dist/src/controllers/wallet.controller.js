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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_schema_1 = require("../schemas/wallet.schema");
const transaction_schema_1 = require("../schemas/transaction.schema");
const formatDate_1 = __importDefault(require("../tools/formatDate"));
class WalletController {
    getWalletByIdUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const wallet = yield wallet_schema_1.WalletModel.find({ user_id: id });
                res.status(200).json({ type: 'success', wallet });
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
    createWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const wallet = new wallet_schema_1.WalletModel({
                    icon: data.icon,
                    name: data.name,
                    user_id: data.user_id,
                    amount: data.amount
                });
                let allWallet = yield wallet_schema_1.WalletModel.findOne({ name: wallet.name });
                if (!allWallet) {
                    yield wallet.save();
                    let Wallet = yield wallet_schema_1.WalletModel.findOne({ name: wallet.name, user_id: data.user_id });
                    let today = new Date();
                    let dateNow = (0, formatDate_1.default)(today);
                    if (Wallet && wallet.amount > 0) {
                        let transaction = {
                            category_id: '',
                            category_name: 'Add Wallet',
                            category_icon: wallet.icon,
                            category_type: 'income',
                            date: dateNow,
                            amount: wallet.amount,
                            wallet_id: Wallet._id,
                            wallet_name: wallet.name,
                            wallet_icon: wallet.icon,
                            user_id: data.user_id,
                            note: '',
                        };
                        yield transaction_schema_1.TransactionModel.create(transaction);
                    }
                    res.status(200).json({
                        type: 'success', message: {
                            wallet: wallet,
                            message: "Create Wallet Successfully"
                        }
                    });
                }
                else {
                    res.status(200).json({ type: 'error', message: "Wallet's all ready exits" });
                }
            }
            catch (error) {
                res.status(500).json('Server error');
            }
        });
    }
    updateWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = req.body;
                let idWallet = req.params.id;
                let walletFind = yield wallet_schema_1.WalletModel.findOne({ _id: idWallet });
                if (walletFind) {
                    yield wallet_schema_1.WalletModel.findOneAndUpdate({ _id: idWallet }, wallet);
                    const newWallet = yield wallet_schema_1.WalletModel.findOne({ _id: idWallet });
                    if (walletFind.amount !== wallet.amount) {
                        let name;
                        let type;
                        let amount;
                        if (walletFind.amount < wallet.amount) {
                            name = 'Other Income';
                            type = 'income';
                            amount = wallet.amount - walletFind.amount;
                        }
                        else if (walletFind.amount > wallet.amount) {
                            name = 'Other Expense';
                            type = 'expense';
                            amount = walletFind.amount - wallet.amount;
                        }
                        let today = new Date();
                        let dateNow = (0, formatDate_1.default)(today);
                        let transaction = {
                            category_id: '',
                            category_name: name,
                            category_icon: wallet.icon,
                            category_type: type,
                            date: dateNow,
                            amount: amount,
                            wallet_id: walletFind._id,
                            wallet_name: wallet.name,
                            wallet_icon: wallet.icon,
                            user_id: walletFind.user_id,
                            note: '',
                        };
                        yield transaction_schema_1.TransactionModel.create(transaction);
                    }
                    res.status(200).json({ type: 'success', message: newWallet });
                }
                else {
                    res.status(200).json({ type: 'notexist', message: "Update wallet fail!!!" });
                }
            }
            catch (error) {
                res.status(500).json('Server error');
            }
        });
    }
    deleteWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let wallet = yield wallet_schema_1.WalletModel.findById(id);
                if (!wallet) {
                    res.status(200).json({ type: 'notexist', message: "No Wallet Delete" });
                }
                else {
                    wallet === null || wallet === void 0 ? void 0 : wallet.delete();
                    yield transaction_schema_1.TransactionModel.deleteMany({ wallet_id: id });
                    res.status(200).json({ type: 'success', message: 'Delete successfully!' });
                }
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
    getTotalMoney(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const findWalletByUser = yield wallet_schema_1.WalletModel.find({ user_id: id });
                const total = findWalletByUser.reduce((total, item) => total = total + item.amount, 0);
                res.status(200).json({ type: 'success', total });
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
}
exports.default = new WalletController();
