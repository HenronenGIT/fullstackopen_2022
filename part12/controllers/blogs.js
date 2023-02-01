const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
	console.log('test')
})

router.get('/api', async (req, res) => {
	res.json("Hello World!")
})

router.get('/api/blogs', async (req, res) => {
	const blogs = await Blog.findAll()
	return("Hello World")
})

// Add new blog
router.post('/api/blogs', async (req, res) => {
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
router.put('/api/blogs/:id', async (req, res) => {
	try {
		// const fetchedBlog = await Blog.findByPk(req.params.id)
		await Blog.update({likes: req.params.id})
	}
	catch(e) {
		res.status(404).end()
	}
	
	console.log(fetchedBlog)
})

module.exports = router
