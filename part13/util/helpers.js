const { sequelize } = require('../util/db')

const sendError = (res, status, message) => {
	res.status(status).send({ message });
};

const validToken = async (id, token) => {
	const response = await sequelize.query(`
	SELECT * FROM sessions WHERE user_id = ? AND token = ?`, {
		replacements: [id, token]
	})
	if (response.rowCount) {
		return true
	}
	return false
}


module.exports = { sendError, validToken }