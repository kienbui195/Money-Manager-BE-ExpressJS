import {Schema, model} from "mongoose";

export interface ICategory {
    icon: string;
    name: string,
}

const categorySchema = new Schema<ICategory>({
    icon: String,
    name: String,
});

const CategoryModel = model<ICategory>('Category', categorySchema);

export { CategoryModel };