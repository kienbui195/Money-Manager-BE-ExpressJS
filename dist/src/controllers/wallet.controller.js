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
<<<<<<< HEAD
const user_model_1 = require("../schemas/user.model");
const wallet_schema_1 = require("../schemas/wallet.schema");
class WalletController {
    constructor() {
        this.getAlltWallet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const wallet = yield wallet_schema_1.WalletModel.find();
            try {
                res.status(200).json({ type: 'success', message: wallet });
            }
            catch (err) {
                res.status(201).json({ type: 'error', message: err });
            }
        });
        this.getWalletById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.body.id;
            const wallet = yield wallet_schema_1.WalletModel.findById({ _id: id });
            try {
                res.status(200).json({ type: 'success', message: wallet });
            }
            catch (err) {
                res.status(201).json({ type: 'error', message: err });
            }
        });
        this.createWallet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            // let newWallet = await WalletModel.findById(id).populate('user_email','email').exec((err,data)=> {
            //     if(err){
            //         res.status(401).json({message : `Không có kết quả tìm kiếm` })
            //         console.log(err); 
            //     }
            //     console.log(data);    
            //     const wallet = new WalletModel({
            //         icon : req.body.icon,
            //         name : req.body.name,
            //         user_email : data ,
            //         money : req.body.money
            //     })
            //     wallet.save()
            //     res.status(200).json(newWallet)  
            // })
            const wallet = new wallet_schema_1.WalletModel({
                icon: req.body.icon,
                name: req.body.name,
                user_email: req.body.id,
                money: req.body.money
            });
            let allWallet = yield wallet_schema_1.WalletModel.findOne({ name: wallet.name });
            try {
                if (!allWallet) {
                    wallet.save();
                    res.status(200).json({ type: 'success', message: {
                            wallet: wallet,
                            message: "Create Wallet Successfully"
                        } });
                }
                else {
                    res.status(201).json({ type: 'error', message: "Wallet's all ready exits" });
                }
            }
            catch (error) {
                res.status(200).json({ type: 'error', message: error });
            }
        });
        this.updateWallet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const wallet = req.body;
            let idWallet = req.params.id;
            let walletFind = yield wallet_schema_1.WalletModel.findById(idWallet);
            try {
                if (walletFind) {
                    let newWallet = yield wallet_schema_1.WalletModel.findByIdAndUpdate({ _id: idWallet }, wallet);
                    res.status(200).json({ type: 'success', message: newWallet });
                }
                else {
                    res.status(200).json({ type: 'notexist', message: "Update wallet fail!!!" });
                }
            }
            catch (error) {
                res.status(201).json({ type: 'error', message: error });
            }
        });
        this.deleteWallet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let wallet = yield wallet_schema_1.WalletModel.findById(id);
            if (!wallet) {
                res.status(200).json({ type: 'notexist', message: "No Wallet Delete" });
            }
            else {
                wallet === null || wallet === void 0 ? void 0 : wallet.delete();
                res.status(200).json({ type: 'success', message: 'Delete successfully!' });
            }
        });
        this.getTotalMoney = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            let TotalMoney = yield user_model_1.UserModel.findById(id).populate('iwallet', 'money').exec((err, data) => {
                if (err) {
                    res.status(401).json({ message: `Không có kết quả tìm kiếm` });
                    console.log(err);
                }
                console.log(data);
                res.status(200).json(TotalMoney);
            });
        });
    }
}
exports.default = new WalletController();
=======
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
>>>>>>> c662950f255407e79819335c5c480037cf291f9d
