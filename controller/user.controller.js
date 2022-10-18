import database from "../db.js";
class UserController {
	async getUsers(req, res) {
		try{
			// console.log("Выгрузить всех пользователей")
			const command = "SELECT * FROM users;";
			const users = await database.query(command);
			res.json(users.rows);
		} catch (e){{
			res.status(500).json(e)
		}}
	}

	async getOneUser(req, res) {
		try{
			// console.log("Выгрузить одного пользователя")
			const command = "SELECT * FROM users WHERE uid=$1;";
			const user = await database.query(command, [req.params.uid]);
			res.json(user.rows[0]);
		} catch (e){{
			res.status(500).json(e)
		}}
	}

	async changeOneUser(req, res) {
		try{
			// console.log("Выгрузить одного пользователя")
			const {uid, username, password, firstName, lastName, lastAuthDate} = req.body;
			const command = "UPDATE users SET username=$1, password=$2, first_name=$3, last_name=$4, last_auth_date=$5 WHERE uid=$6;";
			console.log([username, password, firstName, lastName, lastAuthDate, uid]);
			const user = await database.query(command, [username, password, firstName, lastName, lastAuthDate, uid]);
			res.json(user.rows[0]);
		} catch (e){{
			res.status(500).json(e)
		}}
	}
}


export default new UserController();