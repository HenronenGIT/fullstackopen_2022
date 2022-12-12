import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
	const blogstyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [visible, setVisible] = useState(false)
	const [buttonVisible, setButtonVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const hideWhenNotOwned = { display: buttonVisible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const applyRules = () => {
		setVisible(!visible)
		if (user.username === blog.user.username) {
			setButtonVisible(!buttonVisible)
		}
	}

	return (
		<div style={blogstyle}>

			<div style={hideWhenVisible} className='blog'>
				{blog.title + '-' + blog.author}
				<button id='view-button' onClick={applyRules}>view</button>
			</div>

			<div style={showWhenVisible} className='extendedBlog'>
				{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button> <br />
				{blog.url}<br />
				likes {blog.likes}<button id='like-button' onClick={() => addLike(blog)}>like</button><br />
				{blog.user.username}<br />
				<button onClick={() => removeBlog(blog)} style={hideWhenNotOwned}>remove</button>
			</div>
		</div>
	)
}

export default Blog