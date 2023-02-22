require('dotenv').config()

module.exports = {
	DATABASE_URL: process.env.DATABASE_URL,
	DB_PASSWORD:process.env.DB_PASSWORD,
	PORT: process.env.PORT || 3001,
	SECRET: 'secret'
}