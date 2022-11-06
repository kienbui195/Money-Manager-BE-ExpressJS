import {Schema, model} from "mongoose";

export interface ICategory {
    user_id: string,
    icon: string,
    name: string,
    type: string
}

const categorySchema = new Schema<ICategory>({
    user_id : String,
    icon: String,
    name: String,
    type: String
});

const CategoryModel = model<ICategory>('Category', categorySchema);

export { CategoryModel };