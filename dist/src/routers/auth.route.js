"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRoute = express_1.default.Router();
authRoute.post('/register', auth_controller_1.default.register);
authRoute.post('/login', auth_controller_1.default.postLogin);
authRoute.post('/verify/:id', auth_controller_1.default.verifyUser);
authRoute.post('/is-login', auth_controller_1.default.isLogin);
authRoute.post('/login-gg', auth_controller_1.default.loginWithGoogle);
exports.default = authRoute;
