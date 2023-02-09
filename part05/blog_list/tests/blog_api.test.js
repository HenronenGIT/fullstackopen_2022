const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects
		.map(blog => blog.save())
	await Promise.all(promiseArray)
})

describe('Test backend routes', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('correct amount of blogs', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('blogs id has been identified', async () => {
		const response = await api.get('/api/blogs')
		response.body.forEach(blog => {
			expect(blog.id).toBeDefined()
		});
	})

	test('HTTP Post creates new blog post', async () => {
		const newBlog = {
			title: "New Title",
			author: "Autor",
			url: "www.test.com",
			likes: 12
		}

		await api.post('/api/blogs')
			.send(newBlog)
			.expect(201)

		const response = await api.get('/api/blogs')
		const blogs = response.body.map(blog => blog.title)
		expect(blogs).toContain(newBlog.title)
	})

	test('new blog is added to database', async () => {
		const newBlog = {
			title: "New Title",
			author: "Autor",
			url: "www.test.com",
			likes: 12
		}
		await api.post('/api/blogs')
			.send(newBlog)
			.expect(201)

		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

	})
})

describe('Tests for DELETE requests', () => {
	test("Delete one blog", async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAfterDelete = await helper.blogsInDb()
		expect(blogsAfterDelete).toHaveLength(blogsAtStart.length - 1)
	})
})

describe('Tests for PUT request', () => {
	test("Update one blog", async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogBeforeUpdate = blogsAtStart[0]

		const blog = {
			author: "Updated author",
			url: "Updated URL",
			likes: 100
		}
		await api.put(`/api/blogs/${blogBeforeUpdate.id}`)
			.send(blog)

		const blogsAfterUpdate = await helper.blogsInDb()
		expect(blogsAfterUpdate[0].author).toEqual(blog.author)
		expect(blogsAfterUpdate[0].url).toEqual(blog.url)
		expect(blogsAfterUpdate[0].likes).toEqual(blog.likes)
	})

	describe('when there is initially one user in db', () => {
		beforeEach(async () => {
			await User.deleteMany({})

			const passwordHash = await bcrypt.hash('sekret', 10)
			const user = new User({ username: 'root', passwordHash })

			await user.save()
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
})
