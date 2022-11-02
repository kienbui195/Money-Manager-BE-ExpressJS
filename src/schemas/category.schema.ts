import {Schema, model} from "mongoose";

interface ICategory {
    icon: string;
    name: string,
}

const categorySchema = new Schema<ICategory>({
    icon: String,
    name: String,
});

const CategoryModel = model<ICategory>('Transaction', categorySchema);

export { CategoryModel };