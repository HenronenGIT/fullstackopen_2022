const router = require('express').Router()

const { Blog, User } = require('../models')
const { Op } = require('sequelize')

const tokenExtractor = require('../middlewares/tokenExtractor')
// const sequelize = require('sequelize')
const { sequelize } = require('../util/db')


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

// Get all the blogs
router.get('/', async (req, res) => {
	let where = {}

	if (req.query.search) {
		where = {
			[Op.or]: [
				{ title: { [Op.substring]: req.query.search.toLocaleLowerCase() } },
				{ author: { [Op.substring]: req.query.search.toLocaleLowerCase() } }
			]
		}
	}

	const blogs = await Blog.findAll({
		order: [
			["likes", "DESC"]
		],

		include: {
			model: User,
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		},
		where
	})

	return res.status(200).json(blogs)
})

// Add new blog
router.post('/', tokenExtractor, async (req, res) => {
	try {
		const id = req.decodedToken.id
		const user = await User.findByPk(id)
		if (!user.active) {
			res.status(401).send({ message: "User is not logged in" })
		}
		if (!validToken(id, req.token)) {
			res.status(401).send({ message: "User is missing a token." })
		}
		else {
			const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
			res.status(202).json(blog)
		}
	} catch (error) {
		console.log(error)
		res.status(401).json(error)
	}
})

// Deleting one blog
router.delete('/:id', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	const deletedBlog = await Blog.destroy({
		where: {
			userId: user.id,
			id: req.params.id
		}
	})
	return res.status(204).json(deletedBlog)
})

// Updating likes of the single blog
router.put('/:id', async (req, res) => {
	body = req.body

	const blogToUpdate = await Blog.findByPk(req.params.id);
	const updatedBlog = await blogToUpdate.update({
		likes: body.likes
	})
	console.log(`Blog with the id ${req.params.id} has been updated`)
	return res.status(200).send(updatedBlog)
})

module.exports = router