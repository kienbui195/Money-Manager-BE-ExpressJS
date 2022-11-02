"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletRoute = void 0;
const express_1 = require("express");
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
exports.walletRoute = (0, express_1.Router)();
exports.walletRoute.get('/getAll', wallet_controller_1.default.getAllWallet);
exports.walletRoute.get('/getId/:id', wallet_controller_1.default.getWalletById);
exports.walletRoute.get('/total/:id', wallet_controller_1.default.getTotalMoney);
exports.walletRoute.post('/create/:id', wallet_controller_1.default.createWallet);
exports.walletRoute.post('/update/:id', wallet_controller_1.default.updateWallet);
exports.walletRoute.delete('/delete/:id', wallet_controller_1.default.deleteWallet);
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
const walletRouter = express_1.default.Router();
walletRouter.put('/edit-money/:id', wallet_controller_1.default.postAddMoneyToWallet);
exports.default = walletRouter;
>>>>>>> c662950f255407e79819335c5c480037cf291f9d
>>>>>>> 689d9ef15099845c119290cf027c166608bc8aab
=======
>>>>>>> cce7cb5affe79c8ef6f750ada73598b55623c948
