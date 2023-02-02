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
// router.get('/', async (req, res) => {
// 	const blogs = await Blog.findAll()
// 	return res.status(200).json(blogs)
// })

// // Add new blog
// router.post('/', async (req, res) => {
// 	const blog = await Blog.create(req.body)
// 	res.status(202).json(blog)
// })

// // Deleting one blog
// router.delete('/:id', async (req, res) => {
// 	const deletedRows = await Blog.destroy({
// 		where: {
// 			id: req.params.id
// 		}
// 	})
// 	return res.status(204).json({ "deletedRows": deletedRows })
// })

// // Updating likes of the single blog
// router.put('/:id', async (req, res) => {
// 	body = req.body

// 	const blogToUpdate = await Blog.findByPk(req.params.id);
// 	const updatedBlog = await blogToUpdate.update({
// 		likes: body.likes
// 	})
// 	console.log(`Blog with the id ${req.params.id} has been updated`)
// 	return res.status(200).send(updatedBlog)
// })

module.exports = router
