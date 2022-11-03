import {Request, Response} from "express";
import {CategoryModel} from "../schemas/category.schema";

class CategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            let data = req.body
            await CategoryModel.create(data)
        }catch (err) {
            console.log(err)
        }
    }

    async getAllCategory(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            console.log(userId)
            let categories = await CategoryModel.find({ userId: userId})
            res.status(200).json({type: 'success', message: 'get categories successfully!',data:categories});
        }catch (err) {
            res.status(200).json({ type: 'error',message: err })
        }

    }
}

const categoryController = new CategoryController();
export default categoryController;