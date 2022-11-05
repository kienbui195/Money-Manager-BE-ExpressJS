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
const category_schema_1 = require("../schemas/category.schema");
const transaction_schema_1 = require("../schemas/transaction.schema");
const user_model_1 = require("../schemas/user.model");
const wallet_schema_1 = require("../schemas/wallet.schema");
class UserController {
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_model_1.UserModel.findOne({ _id: userId });
            try {
                if (user) {
                    res.status(200).json({ type: 'success', message: user });
                }
                else {
                    res.status(200).json({ type: 'error', message: 'Something Wrong!' });
                }
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
    updateUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let user = yield user_model_1.UserModel.findOne({ _id: id });
            try {
                if (user) {
                    yield user_model_1.UserModel.findOneAndUpdate({ _id: id }, { username: req.body.username });
                    res.status(200).json({ type: 'success', message: 'Update success!' });
                }
                else {
                    res.status(200).json({ type: 'notexist', message: "Update user fail!!!" });
                }
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.params.id;
            const data = req.body;
            const user = yield user_model_1.UserModel.findOne({ _id: user_id });
            try {
                if (user) {
                    if (data.old_pass == user.password) {
                        yield user_model_1.UserModel.findOneAndUpdate({ _id: user_id }, { password: data.new_pass });
                        res.status(200).json({ type: 'success', message: 'Change password success!' });
                    }
                    else {
                        res.status(200).json({ type: 'error', message: 'Wrong old password! ' });
                    }
                }
                else {
                    res.status(200).json({ type: 'notexist', message: 'Not exist user!' });
                }
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = req.params.id;
            const wallets = yield wallet_schema_1.WalletModel.find({ user_id: userID });
            const transactions = yield transaction_schema_1.TransactionModel.find({ user_id: userID });
            const categorys = yield category_schema_1.CategoryModel.find({ user_id: userID });
            try {
                res.status(200).json({
                    type: 'success',
                    data: {
                        wallets: wallets.length,
                        transactions: transactions.length,
                        categorys: categorys.length
                    }
                });
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
}
exports.default = new UserController();
