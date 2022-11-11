import {Request, Response} from "express";
import {CategoryModel} from "../schemas/category.schema";
import {TransactionModel} from "../schemas/transaction.schema";

class CategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            let data = req.body
            let category = await CategoryModel.findOne({name: data.name})
            if (data.user_id) {
                if (category?.name && category?.type === data.type) {
                    res.status(200).json({type: 'error', message: 'Name Category already exists !'});
                } else {
                    await CategoryModel.create(data)
                    res.status(200).json({type: 'success', message: 'Create Category Successfully!'})
                }
            } else {
                res.status(200).json({message: 'Sever error'});
            }
        } catch (err) {
            res.status(500).json('Server error');
        }
    }

    async getAllCategory(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            let categoryOfUser = await CategoryModel.find({user_id: userId})
            let categories = await CategoryModel.find({user_id: ""})
            if (categoryOfUser.length > 0 || categories.length > 0) {
                let categoryUser = categoryOfUser.concat(categories)
                res.status(200).json({type: 'success', message: 'get categories successfully!', categoryUser});
            } else {
                res.status(200).json({type: 'error', message: "category not exits!!!"})
            }
        } catch (err) {
            res.status(500).json({type: 'error', message: 'Server error'})
        }
    }

    async postUpdateCategory(req: Request, res: Response) {
        try {
            let category = req.body
            let categoryID = await CategoryModel.findById({_id: req.params.id})
            if (categoryID) {
                await CategoryModel.findByIdAndUpdate({_id: req.params.id}, category)
                await TransactionModel.updateMany({ category_id:req.params.id},{category_name : req.body.name,category_icon : req.body.icon})
                res.status(200).json({type: 'success', message: 'Update Category success!'});
            } else {
                res.status(500).json({type: 'error', message: 'Can not find id Category!! Please try again !'})
            }
        } catch (error) {
            res.status(500).json({type: 'error', message: 'Server error'})
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            let categoryID = await CategoryModel.findById({_id: req.params.id})
            if (categoryID) {
                await CategoryModel.findByIdAndDelete({_id: req.params.id})
                res.status(200).json({type: 'success', message: 'Delete Category success!'});
            } else {
                res.status(200).json({type: 'error', message: 'Can not find id Category!! Please try again !'})
            }
        } catch (err) {
            res.status(500).json({type: 'error', message: 'Server error'})
        }

    }

    async getCategoryByIdUser(req: Request, res: Response) {
        try {
            let userId = req.params.id;
            let categoryOfUser = await CategoryModel.find({user_id: userId})
            if (categoryOfUser) {
                res.status(200).json({type: "Success", categoryOfUser})
            } else {
                res.status(200).json({type: "Error", message: "No Category"})
            }
        } catch (err) {
            res.status(500).json({type: 'error', message: 'Server error'})
        }
    }

    async getCategoryByID(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let category = await CategoryModel.findById({_id: id})
            if (category) {
                res.status(200).json({type: "Success", category})
            } else {
                res.status(500).json({type: 'error', message: "Find error"})
            }
        } catch (error) {
            res.status(500).json({type: 'error', message: error})
        }
    }
}

const categoryController = new CategoryController();
export default categoryController;