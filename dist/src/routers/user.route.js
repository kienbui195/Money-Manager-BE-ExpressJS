"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRoute = express_1.default.Router();
userRoute.get('/info/:id', user_controller_1.default.getUserById);
userRoute.put('/edit-username/:id', user_controller_1.default.updateUsername);
exports.default = userRoute;
