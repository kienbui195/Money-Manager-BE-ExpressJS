"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = express_1.default.Router();
authRouter.post('/register', auth_controller_1.default.register);
authRouter.post('/login', auth_controller_1.default.postLogin);
authRouter.post('/verify/:id', auth_controller_1.default.verifyUser);
authRouter.get('/is-login', auth_controller_1.default.isLogin);
exports.default = authRouter;
