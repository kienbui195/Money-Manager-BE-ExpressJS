import {Request, Response} from "express";
import {CategoryModel} from "../schemas/category.schema";

class CategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            let data = req.body
            await CategoryModel.create(data)
            res.status(200).json({ type: 'success', message: 'Create Category Succesfully!' })
        }catch (err) {
            res.status(500).json('Server error');
        }
    }

    async getAllCategory(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            let categoryOfUser = await CategoryModel.find({ user_id: userId})
            let categories = await CategoryModel.find({ user_id: ""})
            if(categoryOfUser.length > 0 || categories.length > 0) {
                let categoryUser = categoryOfUser.concat(categories)
                res.status(200).json({type: 'success', message: 'get categories successfully!',categoryUser});
            }
        }catch (err) {
            res.status(200).json({ type: 'error',message: err })
        }

    }
}

const categoryController = new CategoryController();
export default categoryController;