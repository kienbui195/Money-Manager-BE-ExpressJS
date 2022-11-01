"use strict";
<<<<<<< HEAD
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/register', user_controller_1.default.register);
exports.userRouter.post('/verify/:id', user_controller_1.default.postVerifyUser);
exports.userRouter.get('/login/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Retrieve user data using the access token received 
exports.userRouter.get("/google/callback", passport_1.default.authenticate('google'), (req, res) => {
    res.send("You are authenticated");
});
=======
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
>>>>>>> bae55d2783d30bb2836f708ffdf05a9789af28cd
