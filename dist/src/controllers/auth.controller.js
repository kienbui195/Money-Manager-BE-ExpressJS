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
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = yield UserModel.findOne({ email: data.email });
            if (!user) {
                const newUser = {
                    username: data.username,
                    email: data.email,
                    password: data.password
                };
                yield UserModel.create(newUser);
                return res.status(200).json({ type: 'success', message: 'User created successfully!' });
            }
            else {
                return res.status(200).json({ type: 'error', message: 'User already exists!' });
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
                        maxAge: 60 * 60 * 24 * 7
                    })
                        .json({ type: 'success', message: 'Signed in successfully!' });
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
module.exports = AuthController;
