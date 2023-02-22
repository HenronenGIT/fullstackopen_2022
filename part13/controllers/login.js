const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { sequelize } = require('../util/db')
const User = require('../models/user')

router.post('/', async (request, response) => {
	const body = request.body
	try {
		const user = await User.findOne({
			where: {
				username: body.username
			}
		})
		const passwordCorrect = body.password === 'secret'

		if (!(user && passwordCorrect)) {
			return response.status(401).json({
				error: 'invalid username or password'
			})
		}

		const userForToken = {
			username: user.username,
			id: user.id,
		}

		const token = jwt.sign(userForToken, SECRET)

		await sequelize.transaction(async (t) => {
			await sequelize.query(
				`DELETE FROM sessions WHERE user_id = ?`, {
				replacements: [user.id]
			})
			await sequelize.query(
				`INSERT INTO sessions (user_id, token)
					VALUES (?, ?)`, {
				replacements: [user.id, token]
			})
			sequelize.query(
				'UPDATE users SET active = ? WHERE id = ?', {
				replacements: [true, user.id],
				// type: sequelize.QueryTypes.UPDATE //* Without type attribute, return value is whole Metadata
			})
		})
		response
			.status(200)
			.send({ token, username: user.username, name: user.name })

	} catch (error) {
		console.log(error)
		response.status(404).send({ message: "Error when tried to log in" })
	}
})

module.exports = router