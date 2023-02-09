import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
			likes: 1
		})

		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}

	const handleTitleChange = (event) => {
		setNewTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setNewAuthor(event.target.value)
	}

	const handleUrlChange = (event) => {
		setNewUrl(event.target.value)
	}

	return (
		<div>
			<h2>Create new Blog</h2>

			<form onSubmit={addBlog}>
				<div>
					title:
					<input
						id='title'

						type="text"
						value={newTitle}
						onChange={handleTitleChange}
						placeholder="Title"
					></input>
				</div>

				<div>
					author:
					<input
						id='author'
						type="text"
						value={newAuthor}
						onChange={handleAuthorChange}
						placeholder="Author"
					></input>
				</div>

				<div>
					url:
					<input
						id='url'
						type="text"
						value={newUrl}
						onChange={handleUrlChange}
						placeholder="Url"
					></input>
				</div>

				<button id='create-button' type="submit">create</button>
			</form >
		</div >
	)
}

export default BlogForm