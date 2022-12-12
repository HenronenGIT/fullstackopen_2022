describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			"username": 'testuser',
			"name": 'testuser',
			"password": 'testuser'
		}

		cy.request('POST', 'http://localhost:3003/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('login').click()
		cy.contains('Log in to application')
		cy.get('#username')
		cy.get('#password')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('testuser')
			cy.get('#password').type('testuser')
			cy.get('#login').click()
			cy.contains('testuser logged in')
			cy.get('#logout')
		})

		it.only('fails with wrong credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('wronguser')
			cy.get('#password').type('wronguser')
			cy.get('#login').click()
			cy.contains('Log in to application')

			// cy.get('.error').contains('Wrong username or password')
			cy.get('.error').should('contain', 'Wrong username or password')
			cy.get('.error').should('have.css', 'border-style')
		})
	})

	describe('Blog app', function () {
		const newBlog = {
			"title": "Title",
			"author": 'Author',
			"url": 'Url'
		}

		describe('When logged in', function () {
			beforeEach(function () {
				cy.contains('login').click()
				cy.get('#username').type('testuser')
				cy.get('#password').type('testuser')
				cy.get('#login').click()
			})

			it('A blog can be created and liked', function () {
				cy.contains('New Blog').click()
				cy.get('#title').type(newBlog.title)
				cy.get('#author').type(newBlog.author)
				cy.get('#url').type(newBlog.url)
				cy.get('#create-button').click()
				cy.contains(`${newBlog.title}-${newBlog.author}`)
				cy.contains(`a new blog ${newBlog.title} by ${newBlog.author} added`)

				cy.get('#view-button').click()
				cy.get('#like-button').click()
				cy.contains('likes 1')
			})
		})

	})
})  