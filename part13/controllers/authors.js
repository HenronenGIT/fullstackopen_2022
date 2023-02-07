const router = require('express').Router()
const { sequelize } = require('../util/db')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
	const authors = await Blog.findAll({
		attributes: [
			'author',
			[sequelize.fn('COUNT', 'author'), 'blogCount'],
			[sequelize.fn('SUM', sequelize.col('likes')), 'totalLikes']
		],
		group: ['author']
	})

	return res.status(200).json(authors)
})

module.exports = router