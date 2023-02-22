const Session = require("../models/session")

const User = require('../models/user')

const alreadyActiveSession = async (req, res, next) => {
	const { username, name, password } = req.body
	console.log("username", username)
	const user = await User.findOne({
		where: {
			username: username
		}
	})
	if (user.active == true) {
		res.status(403).json({'error': 'Session already active for this user'})
	}
	req.userId = user.id
	next()
}

module.exports = alreadyActiveSession