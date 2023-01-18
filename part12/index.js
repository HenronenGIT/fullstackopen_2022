require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL)

app.use(express.json())

class Blog extends Model { }
Blog.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	author: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	url: {
		type: DataTypes.TEXT
	},
	title: {
		type: DataTypes.TEXT
	},
	likes: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
}, {
	sequelize,
	underscored: true,
	timestamps: false,
	modelName: 'blog'
})

// Fetch all blogs
app.get('/api/blogs', async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})

// Add new blog
app.post('/api/blogs', async (req, res) => {
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
app.delete('/api/blogs/:id', async (req, res) => {
	const deletedRows = await Blog.destroy({
		where: {
			id: req.params.id
		}
	})
	res.json({ deletedRows: deletedRows })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
