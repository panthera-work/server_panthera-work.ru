import Router from 'express'
import PostController from "../controller/post.controller.js";

const postRouter = new Router();

postRouter.post('/create', PostController.create);
postRouter.get('/get', PostController.getAll);
postRouter.get('/get/:uid', PostController.getOne);
// postRouter.put('/put/:uid', );
// postRouter.delete('/delete/:uid', );


export default postRouter;