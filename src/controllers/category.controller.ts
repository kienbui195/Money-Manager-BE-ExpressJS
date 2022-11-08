import {Request, Response} from "express";
import {CategoryModel} from "../schemas/category.schema";

class CategoryController {
    async createCategory(req: Request, res: Response) {
        let data = req.body
        let categoty =  await CategoryModel.findOne({ name: data.name })
        try {
        if(data.user_id) {
            if(categoty?.name) {
            res.status(505).json({message : 'Name Category already exists !'});
            } else {
            await CategoryModel.create(data)
            res.status(200).json({ type: 'success', message: 'Create Category Successfully!' })
            }
        } else {
            res.status(500).json({message : 'Sever error'});
        }
        }catch (err) {
            res.status(500).json('Server error');
        }
    }
// Tim theo id user && name category , trùng id user mới cho tạo, trùng name không cho tạo, else tạo
    async getAllCategory(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            let categoryOfUser = await CategoryModel.find({ user_id: userId})
            let categories = await CategoryModel.find({ user_id: ""})
            if(categoryOfUser.length > 0 || categories.length > 0) {
                let categoryUser = categoryOfUser.concat(categories)
                res.status(200).json({type: 'success', message: 'get categories successfully!',categoryUser});
            }else {
                res.status(200).json({ type: 'error', message: "category not exits!!!" })
            }
        }catch (err) {
            res.status(200).json({ type: 'error',message: 'Server error' })
        }

    }
}

const categoryController = new CategoryController();
export default categoryController;