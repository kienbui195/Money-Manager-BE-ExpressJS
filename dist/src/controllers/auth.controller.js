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
const { UserModel } = require('../schemas/user.model');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_setup_1 = __importDefault(require("../tools/Verify Email/mail.setup"));
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                let userId = yield UserModel.findOne({ email: req.body.email });
                if (userId == null) {
                    let newUser = yield UserModel.create(user);
                    const newID = newUser.id;
                    (0, mail_setup_1.default)(req, res, newID);
                    res.status(201).json({ type: 'success', message: "Register Successfully" });
                }
                else {
                    res.status(200).json({
                        type: 'exist',
                        message: "User already exists"
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json('Server error');
            }
        });
        this.postVerifyUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let idUser = yield UserModel.findByIdAndUpdate({ _id: id }, { isVerify: true });
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
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = yield UserModel.findOne({ email: data.email });
            if (user) {
                if (data.password === user.password) {
                    let payload = {
                        user_id: user["id"],
                        email: user["email"]
                    };
                    const token = jsonwebtoken_1.default.sign(payload, '230193', {
                        expiresIn: 36000,
                    });
                    res.status(200)
                        .cookie('jwt_token', JSON.stringify(token), {
                        httpOnly: true,
                        maxAge: 1 * 15 * 1 * 1
                    })
                        .json({
                        type: 'success', message: {
                            message: 'Signed in successfully!',
                            data: user
                        }
                    });
                }
                else {
                    res.status(200).json({ type: 'error', message: 'Password is not correct!' });
                }
            }
            else {
                res.status(200).json({
                    type: 'error',
                    message: 'Account does not exist yet!',
                });
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;
