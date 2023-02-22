const router = require('express').Router()

const { Blog, User } = require('../models')
const { Op } = require('sequelize')

const tokenExtractor = require('../middlewares/tokenExtractor')
const { sendError, validToken } = require('../util/helpers')

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
		const { decodedToken, token, body } = req
		const { id } = decodedToken

		const user = await User.findByPk(id)
		if (!user.active) {
			sendError(res, 401, "User is not logged in")
		} if (!validToken(id, token)) {
			sendError(res, 401, "User is missing a token.")
		} else {
			const blog = await Blog.create({ ...body, userId: user.id, date: new Date() })
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