import express from "express";
import userController from "../controllers/user.controller"

const userRoute = express.Router();

userRoute.get('/info/:id', userController.getUserById);
userRoute.put('/edit-username/:id', userController.updateUsername);
userRoute.put('/change-password/:id', userController.changePassword);
userRoute.get('/profile/:id', userController.getProfile)

export default userRoute;



