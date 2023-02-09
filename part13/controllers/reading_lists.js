const router = require('express').Router()

const { ReadingList } = require('../models')

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

module.exports = router
