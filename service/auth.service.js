import database from "../db.js";
import bcrypt from "bcryptjs";
import UserDto from "../dtos/user.dtos.js";

class AuthService{
	commands = {
		insert_one: "INSERT INTO users (username, first_name, last_name, password) " +
			"VALUES ($1, $2, $3, $4) returning uid, username, email, isActivated;",
		getByUsernameOrEmail: "SELECT uid, email, username FROM users WHERE username=$1 OR email=$2;",

		getByUid: "SELECT * FROM users WHERE uid=$1;"

	}

	async _getUserByUid(uid){
		const user = await database.query(this.commands.getByUid, [uid]);
		if (user.rows.length){
			return user.rows[0];
		}
		throw Error("Нет пользователя с таким UID");
	}

	async _isExistUser(username, email){
		// Проверка на существование такого пользователя
		const userIsExist = await database.query(this.commands.getByUsernameOrEmail, [username, email]);
		if (userIsExist.rows.length){
			return userIsExist.rows[0];
		}
		return false;
	}


	async registration(email, username, password, firstName, lastName){

		const isExistUser = await this._isExistUser(username, email)

		if (isExistUser) {
			if (isExistUser.email === email) {
				throw Error('Данный email уже зарегистрирован');
			}
			throw Error('Данный username уже занят!');
		}

		// Валидация и сохранения пользователя
		if (password.trim() && username.trim() && firstName.trim() && lastName.trim()) {
			// Добавление пользователя
			const hashPassword = bcrypt.hashSync(password, 10);
			const user = (await database.query(this.commands.insert_one, [username, firstName, lastName, hashPassword])).rows[0];

			return new UserDto(user.uid, user.username, user.email, user.isActivated)
		} else {
			throw Error('Некоторые поля остались пустыми ...')
		}
	}


	async login(username, email, password){
		const isExistUser = await this._isExistUser(username, email)
		if (!isExistUser){
			throw Error("Пользователь с таким именем не найден!")
		}

		// Проверка пороля
		const validPassword = bcrypt.compareSync(password, isExistUser.password);

		if (!validPassword) {
			throw Error("Введено неверное имя пользователя или пароль!");
		}

		return new UserDto(isExistUser.uid, isExistUser.username, isExistUser.email, isExistUser.isActivated);
	}

	async logout(uid, refreshToken){
		const user = await this._getUserByUid(uid);

	}

}

export default new AuthService();