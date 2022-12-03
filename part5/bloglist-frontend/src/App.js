import React from 'react'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong username or password')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.clear()
		window.location.reload();
	}

	const addBlog = (event) => {
		event.preventDefault()

		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl
		}

		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added`)
				setTimeout(() => {
					setSuccessMessage(null)
				}, 5000);
				setBlogs(blogs.concat(returnedBlog))
				setNewTitle('')
				setNewAuthor('')
				setNewUrl('')
			})
	}

	const loginForm = () => (
		<div>
			<h1>Log in to application</h1>

			<form onSubmit={handleLogin}>

				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
					<div>
						<button type="submit">login</button>
					</div>
				</div>
			</form>
		</div>
	)

	const blogForm = () => (
		<div>
			<Notification message={successMessage} type={0}></Notification>
			<div>
				{user.name} logged in
				<button onClick={handleLogout} >logout</button>
			</div>
			<h2>Create new Blog</h2>
			<form onSubmit={addBlog}>
				<div>
					title:
					<input
						type="text"
						value={newTitle}
						name="Title"
						onChange={({ target }) => setNewTitle(target.value)}
					></input>
				</div>

				<div>
					author:
					<input
						type="text"
						value={newAuthor}
						name="Author"
						onChange={({ target }) => setNewAuthor(target.value)}
					></input>
				</div>

				<div>
					url:
					<input
						type="text"
						value={newUrl}
						name="Url"
						onChange={({ target }) => setNewUrl(target.value)}
					></input>
				</div>
				<button type="submit">create</button>
			</form >

			<div>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		</div >
	)

	return (
		<div>
			<h1>blogs</h1>
			<Notification message={errorMessage} type={1}></Notification>

			{user === null ?
				loginForm() :
				blogForm()}
		</div>
	)
}

export default App
