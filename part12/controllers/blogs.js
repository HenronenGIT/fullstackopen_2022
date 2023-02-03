const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User } = require('../models')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')


// Get all the blogs
router.get('/', async (req, res) => {
	const where = {}

	if (req.query.search) {
		where.title = {
			[Op.substring]: req.query.search.toLocaleLowerCase()
		}
	}

	const blogs = await Blog.findAll({

		include: {
			model: User,
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		},
		where
	})

	return res.status(200).json(blogs)
})

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {
			console.log(authorization.substring(7))
			console.log(SECRET)
			req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
		} catch (error) {
			console.log(error)
			return res.status(401).json({ error: 'token invalid' })
		}
	} else {
		return res.status(401).json({ error: 'token missing' })
	}
	next()
}

// Add new blog
router.post('/', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	const blog = await Blog.create({ ...req.body, userId: user.id, date: new Date() })
	res.status(202).json(blog)
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