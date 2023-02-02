const router = require('express').Router()

// const { response } = require('express')
const { Blog } = require('../models')

// Get all the blogs
router.get('/', async (req, res) => {
	const blogs = await Blog.findAll()
	return res.status(200).json(blogs)
})

// Add new blog
router.post('/', async (req, res) => {
	const blog = await Blog.create(req.body)
	res.status(202).json(blog)
})

// Deleting one blog
router.delete('/:id', async (req, res) => {
	const deletedRows = await Blog.destroy({
		where: {
			id: req.params.id
		}
	})
	return res.status(204).json({ "deletedRows": deletedRows })
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
