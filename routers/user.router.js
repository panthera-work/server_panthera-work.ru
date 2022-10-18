import Router from 'express'
import userController from "../controller/user.controller.js";

const userRouter = new Router();


userRouter.post('/getAll', userController.getUsers);
userRouter.post('/get/:uid', userController.getOneUser);
userRouter.post('/changeOne', userController.changeOneUser);


export default userRouter;