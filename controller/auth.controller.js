import database from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const generateAccessToken = (uid) => {
	const payload = {
		uid: uid
	}
	return jwt.sign(payload, "hnadaobnnbldQLNLSKLGJJlkjlsngsn", {expiresIn: "24h"});
}

class AuthController {
	async registration(req, res) {
		try {
			const {username, password, firstName, lastName} = req.body;
			// Проверка на существование такого пользователя
			const isExistsCommand = "SELECT uid FROM users WHERE username=$1"
			const userIsExist = await database.query(isExistsCommand, [username]);
			if (userIsExist.rows.length) {
				res.status(400).json({message: "Данный username уже занят!"});
			}
			if (password.trim() && username.trim() && firstName.trim() && lastName.trim()) {
				// Добавление пользователя
				const command = "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4);";
				const hashPassword = bcrypt.hashSync(password, 10);
				const user = await database.query(command, [username, firstName, lastName, hashPassword]);
				const token = generateAccessToken(user.uid);
				res.json({token:token});
				return
			} else {
				res.status(400).json({message: 'Некоторые поля остались пустыми ...'});
			}

		} catch (e) {
			console.log(e);
		}
	}

	async login(req, res) {
		try {
			const {username, password} = req.body;

			// Проверка на существование пользователя
			const isExistsCommand = "SELECT * FROM users WHERE username=$1"
			const userIsExist = (await database.query(isExistsCommand, [username])).rows;

			if (!userIsExist.length) {
				res.status(400).json({message: "Ошибка в имени пользователя или пороле!"});
				return
			}


			// Проверка пороля
			const validPassword = bcrypt.compareSync(password, userIsExist[0].password);

			if (!validPassword) {
				res.status(400).json({message: "Ошибка в имени пользователя или пороле!"});
				return
			}

			// Генерируем и отправляем токен
			const token = generateAccessToken(userIsExist[0].uid);
			res.json({token:token});


		} catch (e) {
			console.log(e);
		}
	}

}


export default new AuthController();