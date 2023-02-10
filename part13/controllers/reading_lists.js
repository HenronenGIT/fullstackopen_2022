const router = require('express').Router()

const { ReadingList } = require('../models')
const tokenExtractor = require("../middlewares/tokenExtractor")

router.post('/', async (req, res) => {
	try {
		const { userId, blogId } = req.body

		const readingList = await ReadingList.create({
			userId,
			blogId,
		})
		res.status(200).json(readingList)
	}
	catch (error) {
		res.send(error).end()
	}
})

router.put('/:id', tokenExtractor, async (req, res) => {
	const { id } = req.params
	const { unread } = req.body
	try {
		const blogToUpdate = await ReadingList.findOne(
			{
				where: {
					blog_id: id
				}
			})
		const updatedBlog = await blogToUpdate.update({
			unread: unread
		})
		res.send(updatedBlog)
	} catch (error) {
		res.status(404)
			.json({ 'error': `Cannot find blog with an id of ${id}` })
			.end();
	}
})

module.exports = router
