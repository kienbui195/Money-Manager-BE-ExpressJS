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
const user_model_1 = require("../schemas/user.model");
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
}
exports.default = new UserController();
