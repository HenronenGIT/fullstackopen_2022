import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('renders title and author', () => {

	const user = {
		username: 'henri',
	}

	const blog = {
		title: 'Title',
		author: 'Author',
		url: 'www.url.com',
		likes: 42,
		user: user
	}

	const mockHandler = jest.fn()

	const { container } = render((<Blog
		key={blog.id}
		blog={blog}
		addLike={mockHandler}
		removeBlog={mockHandler}
		user={user} />))

	const div = container.querySelector('.blog')
	const extended = container.querySelector('.extendedBlog')

	expect(div).toHaveTextContent(blog.title)
	expect(div).toHaveTextContent(blog.author)
	expect(extended).toBeUndefined
})

test('does not render url and likes', async () => {

	const user = {
		username: 'henri',
	}

	const blog = {
		title: 'Title',
		author: 'Author',
		url: 'www.url.com',
		likes: 42,
		user: user
	}

	const mockHandler = jest.fn()

	const { container } = render((<Blog
		key={blog.id}
		blog={blog}
		addLike={mockHandler}
		removeBlog={mockHandler}
		user={user} />))

	const url = screen.queryByText(blog.url)
	const likes = screen.queryByText(blog.likes)

	expect(url).toBeNull()
	expect(likes).toBeNull()

	const div = container.querySelector('.blog')

	expect(div).toHaveTextContent(blog.title)
	expect(div).toHaveTextContent(blog.author)
})

test('clicking the view button shows url and likes', async () => {

	const user = {
		username: 'henri',
	}

	const blog = {
		title: 'Title',
		author: 'Author',
		url: 'www.url.com',
		likes: 42,
		user: user
	}

	const mockHandler = jest.fn()

	const { container } = render((<Blog
		key={blog.id}
		blog={blog}
		addLike={mockHandler}
		removeBlog={mockHandler}
		user={user} />))

	const mock_user = userEvent.setup()
	const button = screen.getByText('view')
	await mock_user.click(button)

	const div = container.querySelector('.extendedBlog')
	expect(div).toHaveTextContent(blog.url)
	expect(div).toHaveTextContent(blog.likes)
})

test('clicking the like button is working', async () => {

	const user = {
		username: 'henri',
	}

	const blog = {
		title: 'Title',
		author: 'Author',
		url: 'www.url.com',
		likes: 42,
		user: user
	}

	const mockHandler = jest.fn()

	render((<Blog
		key={blog.id}
		blog={blog}
		addLike={mockHandler}
		removeBlog={mockHandler}
		user={user} />))

	const mock_user = userEvent.setup()
	const viewButton = screen.getByText('view')
	await mock_user.click(viewButton)

	const likeButton = screen.getByText('like')
	await mock_user.click(likeButton)
	await mock_user.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})

test('new blog form', async () => {

	const user = {
		username: 'henri',
	}

	const blog = {
		title: 'Title',
		author: 'Author',
		url: 'www.url.com',
		likes: 42,
		user: user
	}

	const mockHandler = jest.fn()

	render(
		(<BlogForm
			createBlog={mockHandler}
		/>)
	)
})