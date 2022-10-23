import Router from 'express'
import userController from "../controller/user.controller.js";

const userRouter = new Router();


userRouter.post('/getAll', userController.getUsers); // Получение всех пользователей
userRouter.get('/get/:uid', userController.getOneUser); // Получить конкретного пользователя
userRouter.put('/changeOne', userController.changeOneUser); // Изменяет информацию о пользователе
// userRouter.delete('/delete/:uid', userController.changeOneUser); // Удалаляет пользователя


export default userRouter;