import Router from 'express'
import authController from "../controller/auth.controller.js";

const authRouter = new Router();


authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);


export default authRouter;