import Client from 'pg';

const client = new Client.Pool({
	user: 'panthera',
	password: 'panthera4321P',
	host: 'localhost',
	port: 5432,
	database: 'panthera-work'
})
client.connect()

export default client;