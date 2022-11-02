"use strict";
<<<<<<< HEAD
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: String,
    email: String,
    password: String
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/register', user_controller_1.default.register);
exports.userRouter.post('/verify/:id', user_controller_1.default.postVerifyUser);
>>>>>>> a3078660d7db4a651949800539a028eb075e5976
