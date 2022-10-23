import database from "../db.js";
import bcrypt from 'bcryptjs';
import TokenService from "../service/token.service.js";
import AuthService from "../service/auth.service.js";


class AuthController {
	async registration(req, res) {
		try {
			const {username, email, password, firstName, lastName} = req.body;
			const user = await AuthService.registration(email, username, password, firstName, lastName);
			const {accessToken, refreshToken} = TokenService.generateToken(user);
			// Сохранение refreshToken в cookie
			res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
			res.json({accessToken});
		} catch (e) {
			res.status(400).json({message: e.message});
		}
	}

	async login(req, res) {
		try {
			const {username, email, password} = req.body;
			const user = await AuthService.login(username, email, password);
			const {accessToken, refreshToken} = TokenService.generateToken(user);
			// Сохранение refreshToken в cookie
			res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
			res.json({accessToken});
		} catch (e) {
			res.status(400).json({message: e.message});
		}
	}

	async refresh(req, res){
		const {accessToken} = req. body;


	}
}


export default new AuthController();