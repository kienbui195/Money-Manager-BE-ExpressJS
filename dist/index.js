"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import dotenv from "dotenv";
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = __importDefault(require("./src/routers/auth.route"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./src/routers/user.route");
// dotenv.config();
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb+srv://admin395:neCVCjNrS4269Yiv@casem5reactjs.8wszhbp.mongodb.net/money-manager-project', () => {
    console.log('DB Connect!');
});
app.use((0, cors_1.default)());
app.use(express_1.default.static('src/public'));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', user_route_1.userRouter);
app.use('/auth', auth_route_1.default);
app.get('/*', (req, res) => {
    res.send(200).json({ type: 'error', message: '404 Not Found' });
});
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
