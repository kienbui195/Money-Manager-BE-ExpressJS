"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_middleware_1 = require("../middleware/login.middleware");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = express_1.default.Router();
authRouter.post('/register', (req, res) => {
    auth_controller_1.default.register(req, res).catch(() => { res.status(500).json('Server error'); });
});
authRouter.post('/login', (req, res) => {
    auth_controller_1.default.postLogin(req, res).catch(() => res.status(500).json('server error'));
}, login_middleware_1.auth);
authRouter.post('/register', (req, res) => auth_controller_1.default.register(req, res).catch(() => res.status(500).json('Server error')));
authRouter.post('/verify/:id', (req, res) => auth_controller_1.default.verifyUser(req, res).catch(() => res.status(500).json('Server error')));
exports.default = authRouter;
