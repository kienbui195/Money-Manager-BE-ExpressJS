"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
;
const userSchema = new mongoose_1.Schema({
    id: String
});
const UserModel = (0, mongoose_1.model)('Verify', userSchema);
exports.UserModel = UserModel;
