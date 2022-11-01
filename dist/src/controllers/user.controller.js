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
const user_model_1 = require("../schemas/user.model");
const console_1 = __importDefault(require("console"));
<<<<<<< HEAD
const mail_setup_1 = __importDefault(require("../tools/Verify Email/mail.setup"));
=======
>>>>>>> bae55d2783d30bb2836f708ffdf05a9789af28cd
class User {
    constructor() {
        this.getAllUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.find();
            try {
                res.status(200).json({ type: 'success', message: user });
            }
            catch (err) {
<<<<<<< HEAD
                res.status(200).json({ message: err });
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                let userId = yield user_model_1.UserModel.findOne({ email: req.body.email });
                if (userId == null) {
                    user.password = yield bcrypt.hash(user.password, 10);
                    let newUser = yield user_model_1.UserModel.create(user);
                    const newID = newUser.id;
                    (0, mail_setup_1.default)(req, res, newID);
                    res.status(201).json({ userId: newUser._id, message: "Register Successfully" });
                }
                else {
                    res.status(200).json({
                        err: "User already exists"
                    });
                }
            }
            catch (error) {
                console_1.default.log(error);
                res.status(500).json('Server error');
=======
                res.status(200).json({ type: 'error', message: err });
>>>>>>> bae55d2783d30bb2836f708ffdf05a9789af28cd
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
            console_1.default.log(req.body);
            let id = req.params.id;
            let publisher = yield user_model_1.UserModel.findById(id);
            if (!publisher) {
<<<<<<< HEAD
                res.status(200).json({ message: "Update user fail!!!" });
=======
                res.status(200).json({ type: 'notexist', message: "Update user fail!!!" });
>>>>>>> bae55d2783d30bb2836f708ffdf05a9789af28cd
            }
            else {
                let data = req.body;
                let newUser = yield user_model_1.UserModel.findByIdAndUpdate({ _id: id }, data);
                res.status(200).json({ type: 'success', message: newUser });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let user = yield user_model_1.UserModel.findById(id);
            if (!user) {
                res.status(200).json({ type: 'notexist', message: "No User Delete" });
            }
            user === null || user === void 0 ? void 0 : user.delete();
<<<<<<< HEAD
            res.status(204).json();
        });
        this.postVerifyUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let idUser = yield user_model_1.UserModel.findByIdAndUpdate({ _id: id }, { isVerify: true });
                if (idUser) {
                    res.status(200).json({ message: "Verify successfully" });
                }
                else {
                    res.status(200).json({ message: "Error Verify" });
                }
            }
            catch (error) {
                console_1.default.log(error);
                res.status(404).json({ error: error });
            }
=======
            res.status(200).json({ type: 'success', message: 'Delete successfully!' });
>>>>>>> bae55d2783d30bb2836f708ffdf05a9789af28cd
        });
    }
}
exports.default = new User();
