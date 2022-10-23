import Router from 'express'
import PostController from "../controller/post.controller.js";

const postRouter = new Router();

postRouter.post('/create', PostController.create); // создает пост
postRouter.get('/get', PostController.getAll); // Получает все посты
postRouter.get('/get/:uid', PostController.getOne); // Получает конктретный пост
// postRouter.put('/put/:uid', ); // Изменяет конкретный пост
// postRouter.delete('/delete/:uid', ); // Удаляет конкретный пост


export default postRouter;