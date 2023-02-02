const router = require('express').Router()

const { response } = require('express')
const { Blog } = require('../models')

router.get('/', async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})

// Add new blog
router.post('/', async (req, res) => {
	try {
		console.log(req.body)
		const blog = await Blog.create(req.body)
		res.json(blog)
	}
	catch (e) {
		return res.status(400).json({ error })
	}
})

// Deleting one blog
router.delete('/api/blogs/:id', async (req, res) => {
	const deletedRows = await Blog.destroy({
		where: {
			id: req.params.id
		}
	})
	res.json({ deletedRows: deletedRows })
})

// Updating likes
router.put('/:id', async (req, res) => {
	body = req.body

	try {
		const blogToUpdate = await Blog.findByPk(req.params.id);
		const updatedBlog = await blogToUpdate.update({
			likes: body.likes
		})
		console.log(`Blog with the id ${req.params.id} has been updated`)
		return res.status(200).send(updatedBlog)
	} catch (e) {
		console.log(`Blog with id [${req.params.id}] not found`)
		res.status(404).end()
	}

	// const blogToUpdate = await Blog.findByPk(req.params.id);
	// if (!blogToUpdate) {
	// 	console.error(`Blog with id ${req.params.id} not found.`);
	// 	res.status(404).end()
	// }
	// const updatedBlog = await blogToUpdate.update({
	// 	likes: body.likes
	// })
	// console.log(`Blog with the id ${req.params.id} has been updated`)
	// res.status(200).end()
})

module.exports = router
