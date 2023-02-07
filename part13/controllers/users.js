const router = require('express').Router()

const { User } = require('../models')
const { Blog } = require('../models')

// Get all the users
router.get('/', async (req, res) => {
	const users = await User.findAll({
		include: {
			model: Blog
		}
	})
	res.json(users)
})

// Create a new user
router.post('/', async (req, res) => {
	const newUser = await User.create(req.body)
	res.status(200).json(newUser)
})

// Change user username
router.put('/:username', async (req, res) => {
	body = req.body
	console.log(body)
	console.log(req.params.username)
	const userToUpdate = await User.findOne({
		where: {
			username: req.params.username
		}
	})
	const updatedUser = await userToUpdate.update({ "username": body.username })
	res.status(200).json(updatedUser)
})

module.exports = router
