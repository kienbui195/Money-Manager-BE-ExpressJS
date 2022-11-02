"use strict";
<<<<<<< HEAD
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
=======
>>>>>>> a3078660d7db4a651949800539a028eb075e5976
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
<<<<<<< HEAD
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../schemas/user.model");
const bcrypt = __importStar(require("bcrypt"));
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../schemas/user.model");
const console_1 = __importDefault(require("console"));
const mail_setup_1 = __importDefault(require("../tools/Verify Email/mail.setup"));
>>>>>>> a3078660d7db4a651949800539a028eb075e5976
class User {
    constructor() {
        this.getAllUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.find();
            try {
<<<<<<< HEAD
                res.status(200).json(user);
            }
            catch (err) {
                res.status(200).json({ message: err });
=======
                res.status(200).json({ type: 'success', message: user });
            }
            catch (err) {
                res.status(200).json({ type: 'error', message: err });
>>>>>>> a3078660d7db4a651949800539a028eb075e5976
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
<<<<<<< HEAD
                let checkUser = yield user_model_1.UserModel.findOne({ email: user.email });
                if (!checkUser) {
                    user.password = yield bcrypt.hash(user.password, 10);
                    user = yield user_model_1.UserModel.create(user);
                    res.status(201).json({ type: 'success', message: 'Lưu điểm thành công!' });
                }
                else {
                    res.status(200).json({
                        err: "User exited"
=======
                let userId = yield user_model_1.UserModel.findOne({ email: req.body.email });
                if (userId == null) {
                    let newUser = yield user_model_1.UserModel.create(user);
                    const newID = newUser.id;
                    (0, mail_setup_1.default)(req, res, newID);
                    res.status(201).json({ type: 'success', message: "Register Successfully" });
                }
                else {
                    res.status(200).json({
                        type: 'exist',
                        message: "User already exists"
>>>>>>> a3078660d7db4a651949800539a028eb075e5976
                    });
                }
            }
            catch (error) {
<<<<<<< HEAD
=======
                console_1.default.log(error);
                res.status(500).json('Server error');
>>>>>>> a3078660d7db4a651949800539a028eb075e5976
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_model_1.UserModel.findById({ _id: userId }, req.body);
            try {
<<<<<<< HEAD
                res.status(200).json(user);
            }
            catch (err) {
                res.status(200).json({ message: err });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let id = req.params.id;
            let publisher = yield user_model_1.UserModel.findById(id);
            if (!publisher) {
                res.status(404).json();
=======
                res.status(200).json({ type: 'success', message: user });
            }
            catch (err) {
                res.status(200).json({ type: 'error', message: err });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console_1.default.log(req.body);
            let id = req.params.id;
            let publisher = yield user_model_1.UserModel.findById(id);
            if (!publisher) {
                res.status(200).json({ type: 'notexist', message: "Update user fail!!!" });
>>>>>>> a3078660d7db4a651949800539a028eb075e5976
            }
            else {
                let data = req.body;
                let newUser = yield user_model_1.UserModel.findByIdAndUpdate({ _id: id }, data);
<<<<<<< HEAD
                res.status(200).json(newUser);
=======
                res.status(200).json({ type: 'success', message: newUser });
>>>>>>> a3078660d7db4a651949800539a028eb075e5976
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let user = yield user_model_1.UserModel.findById(id);
            if (!user) {
<<<<<<< HEAD
                res.status(404).json({ message: "No User Delete" });
            }
            user === null || user === void 0 ? void 0 : user.delete();
            res.status(204).json();
        });
        this.verifyUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let idUser = yield user_model_1.UserModel.findByIdAndUpdate({ _id: id }, { isVerify: true });
        });
    }
}
=======
                res.status(200).json({ type: 'notexist', message: "No User Delete" });
            }
            user === null || user === void 0 ? void 0 : user.delete();
            res.status(200).json({ type: 'success', message: 'Delete successfully!' });
        });
        this.postVerifyUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let idUser = yield user_model_1.UserModel.findByIdAndUpdate({ _id: id }, { isVerify: true });
                if (idUser) {
                    res.status(200).json({ type: 'success', message: "Verify successfully" });
                }
                else {
                    res.status(200).json({ type: 'error', message: "Error Verify" });
                }
            }
            catch (error) {
                res.status(200).json({ type: 'error', message: error });
            }
        });
    }
}
exports.default = new User();
>>>>>>> a3078660d7db4a651949800539a028eb075e5976
