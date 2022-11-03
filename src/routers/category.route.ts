import express from "express"
import categoryController from "../controllers/category.controller";

const categoryRoute = express.Router();

categoryRoute.post('/add-category', categoryController.createCategory);
categoryRoute.get('/get-category', categoryController.getAllCategory);

export default categoryRoute;