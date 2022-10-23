import Client from 'pg';
import {config} from "dotenv";

// Подгружаем конфиг
config();


const client = new Client.Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME
})
client.connect()

export default client;