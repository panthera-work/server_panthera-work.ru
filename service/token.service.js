import jwt from "jsonwebtoken";
class TokenService{
	generateToken(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
		return {
			accessToken, refreshToken
		}
	}
	async saveToken(userId, refreshToken){
		// Запрос на проверку есть ли такой токен в БД
		// Если есть Update если нет insert
	}
}

export default new TokenService();


