"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
;
const userSchema = new mongoose_1.Schema({
    username: String,
    email: String,
    password: String,
    isVerify: {
        type: Boolean,
        default: false
    },
    google_id: String,
    iwallet: {
        type: mongoose_1.Schema.Types.ObjectId,
        refs: 'Wallet'
    }
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.UserModel = UserModel;
