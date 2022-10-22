 import database from '../db.js';


class PostController{
	async create(req, res){
		const {html, title, token} = req.body;
		// Проверка токена на действительность


		// Создание поста
		const createCommand = "INSERT INTO posts (html, title) VALUES ($1, $2) returning *";
		const post = await database.query(createCommand, [html, title]);
		res.json(post.rows[0]);
	}

	async getOne(req, res){
		const {uid} = req.params;
		// Поиск нужного поста
		const command = "SELECT * FROM posts WHERE uid = $1";
		const post = await database.query(command, [uid]);
		console.log(post)
		res.json(post.rows[0]);
	}
	async getAll(req, res){
		const command = "SELECT title, uid FROM posts;";
		const posts = await database.query(command);
		res.json(posts.rows);
	}
}

export default new PostController();