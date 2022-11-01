"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_middleware_1 = require("../middleware/login.middleware");
<<<<<<< HEAD
const AuthController = require('../controllers/auth.controller');
=======
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
>>>>>>> ecafb75a09c5292ef2b151fc419a1d058141107f
const authRouter = express_1.default.Router();
authRouter.post('/register', (req, res) => {
    auth_controller_1.default.register(req, res).catch(() => { res.status(500).json('Server error'); });
});
authRouter.post('/login', (req, res) => {
<<<<<<< HEAD
    authController.postLogin(req, res).catch(() => res.status(500).json('server error'));
=======
    auth_controller_1.default.postLogin(req, res).catch(() => res.status(500).json('server error'));
>>>>>>> ecafb75a09c5292ef2b151fc419a1d058141107f
}, login_middleware_1.auth);
exports.default = authRouter;
