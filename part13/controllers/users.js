const router = require('express').Router()
const { QueryTypes } = require('sequelize')
const { sequelize } = require('../util/db')
const { User, Blog, ReadingList } = require('../models')

// Get all the users
router.get('/', async (req, res) => {
	const users = await User.findAll({
		include: {
			model: Blog
		}
	})
	res.json(users)
})

// GET one user
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	let where = {}

	if (req.query.unread) {
		where = {
			unread: req.query.unread
		}
	}

	const user = await User.findByPk(
		id,
		{
			include: [
				{
					model: Blog, as: "blogs",
					attributes: { exclude: ['createdAt', 'updatedAt'] },
				},
				{
					model: Blog, as: "readings",
					through: {
						attributes: ["id", "unread"], as: "readinglists",
						where
					},
				},
			],
		});
	if (user) {
		res.json(user);
	} else {
		res.status(404).end();
	}
});

// Create a new user
router.post('/', async (req, res) => {
	const newUser = await User.create(req.body)
	res.status(200).json(newUser)
})

// Change user username
router.put('/:username', async (req, res) => {
	body = req.body
	const userToUpdate = await User.findOne({
		where: {
			username: req.params.username
		}
	})
	const updatedUser = await userToUpdate.update({ "username": body.username })
	res.status(200).json(updatedUser)
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params
	const deletedRows = await User.destroy({
		where: {
			id: id
		}
	})
	res.status(200).json(deletedRows)
})

module.exports = router
