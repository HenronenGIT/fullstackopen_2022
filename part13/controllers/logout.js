const router = require('express').Router()

const { sequelize } = require('../util/db')

const { sendError, validToken } = require('../util/helpers')
const tokenExtractor = require('../middlewares/tokenExtractor')

router.delete('/', tokenExtractor, async (req, res) => {
	try {
		const { decodedToken, token } = req

		//TODO transaction
		await sequelize.transaction(async (t) => {
			if (validToken(decodedToken.id, token)) {
				await sequelize.query('UPDATE users SET active = ? WHERE id = ?', {
					replacements: [false, decodedToken.id]
				})
				await sequelize.query(
					'DELETE FROM sessions WHERE user_id = ?', {
					replacements: [decodedToken.id]
				})
			}
		})
		res.sendStatus(200)
	}
	catch (error) {
		sendError(res, 401, "Something went wrong when tried to logout.")
	}
})

module.exports = router
