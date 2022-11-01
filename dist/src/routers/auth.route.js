"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController = require('../controllers/auth.controller');
const authRouter = express_1.default.Router();
const authController = new AuthController();
authRouter.post('/register', (req, res) => {
    authController.register(req, res).catch(() => { res.status(500).json('Server error'); });
});
exports.default = authRouter;
