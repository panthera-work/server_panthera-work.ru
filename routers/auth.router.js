import Router from 'express'
import authController from "../controller/auth.controller.js";

const authRouter = new Router();


authRouter.post('/registration', authController.registration); // {firstName, lastName, username, password, email}
authRouter.post('/login', authController.login); // {email: '', username: '', password: ''}
// authRouter.post('/logout', ); // разлогирование


export default authRouter;