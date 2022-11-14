import express from "express";
import userController from "../controllers/user.controller"

const userRoute = express.Router();

userRoute.get('/info/:id', userController.getUserById);
userRoute.put('/edit-username/:id', userController.updateUsername);
userRoute.put('/change-password/:id', userController.changePassword);
userRoute.get('/profile/:id', userController.getProfile);
userRoute.put('/change-avatar/:id', userController.changeAva);
userRoute.put('/forgot-password/:id', userController.forgotPassword);

export default userRoute;



