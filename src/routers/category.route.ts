import express from "express"
import categoryController from "../controllers/category.controller";

const categoryRoute = express.Router();

categoryRoute.post('/add-category', categoryController.createCategory);
categoryRoute.get('/get-category/:id', categoryController.getAllCategory);
categoryRoute.put('/update-categody/:id', categoryController.postUpdateCategory);
categoryRoute.delete('/delete-category/:id', categoryController.deleteCategory);

export default categoryRoute;