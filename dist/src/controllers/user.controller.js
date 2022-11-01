"use strict";
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
const bcrypt = __importStar(require("bcrypt"));
const console_1 = __importDefault(require("console"));
const mail_setup_1 = __importDefault(require("../tools/Verify Email/mail.setup"));
class User {
    constructor() {
        this.getAllUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.find();
            try {
                res.status(200).json(user);
            }
            catch (err) {
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
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_model_1.UserModel.findById({ _id: userId }, req.body);
            try {
                res.status(200).json(user);
            }
            catch (err) {
                res.status(200).json({ message: err });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console_1.default.log(req.body);
            let id = req.params.id;
            let publisher = yield user_model_1.UserModel.findById(id);
            if (!publisher) {
                res.status(404).json();
            }
            else {
                let data = req.body;
                let newUser = yield user_model_1.UserModel.findByIdAndUpdate({ _id: id }, data);
                res.status(200).json(newUser);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let user = yield user_model_1.UserModel.findById(id);
            if (!user) {
                res.status(404).json({ message: "No User Delete" });
            }
            user === null || user === void 0 ? void 0 : user.delete();
            res.status(204).json();
        });
        this.postVerifyUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let idUser = yield user_model_1.UserModel.findByIdAndUpdate({ _id: id }, { isVerify: true });
                if (idUser) {
                    res.status(200).json({ message: "Verify successfully" });
                }
            }
            catch (error) {
                console_1.default.log(error);
                res.status(404).json({ error: error });
            }
        });
    }
}
exports.default = new User();
