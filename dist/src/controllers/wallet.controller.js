"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_schema_1 = require("../schemas/wallet.schema");
class WalletController {
    postAddMoneyToWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield wallet_schema_1.WalletModel.findOneAndUpdate({ _id: id }, { amount: req.body.amount });
                res.status(200).json({ type: 'success', message: 'Update Successfully!' });
            }
            catch (err) {
                res.status(500).json('Server error');
            }
        });
    }
}
const walletController = new WalletController();
exports.default = walletController;
