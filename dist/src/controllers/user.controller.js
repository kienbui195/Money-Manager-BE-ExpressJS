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
    constructor() {
        this.getAllUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.find();
            try {
                res.status(200).json({ type: 'success', message: user });
            }
            catch (err) {
                res.status(200).json({ type: 'error', message: err });
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_model_1.UserModel.findById({ _id: userId }, req.body);
            try {
                res.status(200).json({ type: 'success', message: user });
            }
            catch (err) {
                res.status(200).json({ type: 'error', message: err });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let id = req.params.id;
            let publisher = yield user_model_1.UserModel.findById(id);
            if (!publisher) {
                let data = req.body;
                let newUser = yield user_model_1.UserModel.findByIdAndUpdate({ _id: id }, data);
                res.status(200).json({ type: 'success', message: newUser });
            }
            else {
                res.status(200).json({ type: 'notexist', message: "Update user fail!!!" });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let user = yield user_model_1.UserModel.findById(id);
            if (!user) {
                res.status(200).json({ type: 'notexist', message: "No User Delete" });
            }
            user === null || user === void 0 ? void 0 : user.delete();
            res.status(200).json({ type: 'success', message: 'Delete successfully!' });
        });
    }
}
exports.default = new UserController();
