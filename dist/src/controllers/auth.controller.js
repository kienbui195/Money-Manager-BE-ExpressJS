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
exports.SECRET_KEY = void 0;
const { UserModel } = require('../schemas/user.model');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_setup_1 = __importDefault(require("../tools/Verify Email/mail.setup"));
exports.SECRET_KEY = '190896';
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield UserModel.findOne({ email: data.email });
                if (user && user.isVerify === true) {
                    if (data.password === user.password) {
                        let payload = {
                            user_id: user["id"],
                        };
                        const token = jsonwebtoken_1.default.sign(payload, '230193', {
                            expiresIn: 36000,
                        });
                        res.status(200)
                            .json({
                            type: 'success', data: {
                                message: 'Signed in successfully!',
                                data: user,
                                token: token
                            }
                        });
                    }
                    else {
                        res.status(200).json({ type: 'error', message: 'Password is not correct!' });
                    }
                }
                else {
                    res.status(200).json({
                        type: 'notexist',
                        message: 'Account does not exist yet!',
                    });
                }
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let idUser = yield UserModel.findByIdAndUpdate({ _id: id }, { isVerify: true });
                if (idUser) {
                    res.status(200).json({ type: 'success', message: "Verify successfully" });
                }
                else {
                    yield UserModel.findOneAndUpdate({ _id: id }, { isVerify: true });
                    res.status(200).json({ type: 'success', message: 'Verify Success' });
                }
            }
            catch (error) {
                res.status(500).json('Server error');
            }
        });
    }
    isLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel.findOne({ _id: req.body.id });
                let token = req.body["token"];
                if (token) {
                    jsonwebtoken_1.default.verify(token, '230193', (err, decoded) => {
                        if (err) {
                            return res.status(200).json({ type: 'No', message: 'Unauthorized' });
                        }
                        else {
                            req.decoded = decoded;
                            res.status(200).json({
                                type: 'Yes',
                                message: 'User is Login',
                                data: user.username
                            });
                        }
                    });
                }
                else {
                    return res.status(200).json({
                        type: 'error',
                        message: 'No token provided'
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    message: 'Server error'
                });
            }
        });
    }
    loginWithGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield UserModel.findOne({ email: data.email });
                if (user) {
                    yield UserModel.findOneAndUpdate({ email: data.email }, {
                        google_id: data.google_id,
                        isVerify: true,
                        username: data.username
                    });
                    let payload = {
                        user_id: user["id"]
                    };
                    const token = jsonwebtoken_1.default.sign(payload, '230193', { expiresIn: 36000 });
                    res.status(200)
                        .json({
                        type: 'success', data: {
                            message: 'Signed in successfully!',
                            data: user,
                            token: token
                        }
                    });
                }
                else {
                    let newUser = new UserModel({
                        username: data.username,
                        google_id: data.google_id,
                        isVerify: true,
                        email: data.email,
                        password: '',
                    });
                    yield newUser.save();
                    let payload = {
                        user_id: newUser["id"]
                    };
                    const token = jsonwebtoken_1.default.sign(payload, '230193', { expiresIn: 36000 });
                    res.status(200)
                        .json({
                        type: 'success', data: {
                            message: 'Signed in successfully!',
                            data: newUser,
                            token: token
                        }
                    });
                }
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;
