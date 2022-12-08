import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Logout from './components/Logout'
import LoginForm from './components/LoginForm'
import Toglabble from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)

	const blogFormRef = useRef()

	useEffect(() => {
		blogService
			.getAll().then(blogs => {
				blogs.sort(compareLikes)
				setBlogs(blogs)
			})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const compareLikes = (a, b) => {
		if (a.likes > b.likes)
			return -1
		else if (b.likes > a.likes)
			return 1
		return 0
	}

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
		window.location.reload()
	}

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()
		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
				setTimeout(() => {
					setSuccessMessage(null)
				}, 5000)
				setBlogs(blogs.concat(returnedBlog))
			})
	}

	const addLike = (oldBlog) => {
		const changedBlog = {
			...oldBlog,
			likes: oldBlog.likes += 1
		}
		blogService
			.update(oldBlog.id, changedBlog)
			.then(() => {
				setBlogs(blogs.map(blog => blog.id !== oldBlog.id ? blog : changedBlog))
			})
	}

	const removeBlog = (removableBlog) => {
		if (window.confirm(`Remove blog ${removableBlog.title} by ${removableBlog.author}`)) {
			blogService
				.remove(removableBlog.id)
				.then(() => {
					setBlogs(blogs.filter(blog => blog.id !== removableBlog.id))
				})
		}
	}

	return (

		<div>
			<h1>Blogs</h1>
			<Notification message={errorMessage} type={1} />

			{user === null ?
				<Toglabble buttonLabel='login'>

					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleLogin={handleLogin}
					></LoginForm>
				</Toglabble>
				: <div>
					<Notification message={successMessage} type={0}></Notification>
					<Logout username={user.name} handleLogout={handleLogout} />

					<Toglabble buttonLabel='New Blog' ref={blogFormRef}>
						<BlogForm createBlog={addBlog}></BlogForm>
					</Toglabble>

					<div>
						{blogs.map(blog =>
							<Blog
								key={blog.id}
								blog={blog}
								addLike={addLike}
								removeBlog={removeBlog}
								user={user}
							/>
						)}
					</div>
				</div>
			}
		</div >
	)
}

export default App
