"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_middleware_1 = require("../middleware/login.middleware");
const AuthController = require('../controllers/auth.controller');
const authRouter = express_1.default.Router();
const authController = new AuthController();
authRouter.post('/register', (req, res) => {
    authController.register(req, res).catch(() => { res.status(500).json('Server error'); });
});
authRouter.post('/login', (req, res) => {
    authController.postLogin(req, res).catch(() => res.status(500).json('server error'));
}, login_middleware_1.auth);
exports.default = authRouter;
