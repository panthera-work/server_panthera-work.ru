import express from 'express';
import userRouter from "./routers/user.router.js";
import listEndpoints from 'express-list-endpoints';
import authRouter from "./routers/auth.router.js";
import cors from "cors";
const PORT = 5000;

const app = express()

app.use(express.json()); // Расшифровка json
app.use(cors())
app.use('/api/user', userRouter); // Подключение api для работы с пользователями
app.use('/api/auth', authRouter); // Подключение api для работы с авторизацией


console.log(listEndpoints(app))

app.listen(PORT, () => {
	console.log('Сервер запущен');
})