import {Schema, model} from "mongoose";

export interface ICategory {
    userId: string;
    icon: string;
    name: string,
}

const categorySchema = new Schema<ICategory>({
    userId : String,
    icon: String,
    name: String,
});

const CategoryModel = model<ICategory>('Category', categorySchema);

export { CategoryModel };