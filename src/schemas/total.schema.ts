import {Schema, model} from "mongoose";

export interface ITotal {
total : Number
};

const TotalSchema = new Schema<ITotal>({
    total : {
        type: Number,
        default: 0
    }
});

const TotalModel = model<ITotal>('Wallet', TotalSchema);

export { TotalModel };