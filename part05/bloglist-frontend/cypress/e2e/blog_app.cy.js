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

	it('Login with wrong credentials', function () {
		cy.contains('login').click()
		cy.get('#username').type('wronguser')
		cy.get('#password').type('wronguser')
		cy.get('#login').click()
		cy.contains('Log in to application')
		cy.get('.error')
			.should('contain', 'Wrong username or password')
			.and('have.css', 'border-style', 'solid')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
		cy.get('html').should('not.contain', 'wronguser logged in')
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.request('POST', 'http://localhost:3003/api/login', {
				username: 'testuser', password: 'testuser'
			}).then(({ body }) => {
				localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
				cy.visit('http://localhost:3000')
			})
		})

		const newBlog = {
			"title": "Title",
			"author": 'Author',
			"url": 'Url'
		}

		it('succeeds with correct credentials', function () {
			cy.contains('testuser logged in')
			cy.get('#logout')
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

		it('A blog can be deleted by who made it', function () {
			cy.contains('New Blog').click()
			cy.createBlog({title: newBlog.title, author: newBlog.author, url: newBlog.url})
			cy.get('#view-button').click()
			cy.contains(`${newBlog.title}`)
			cy.get('#remove-button').click()
			cy.get('#view-button').should('not.exist')
		})

		it.only('A blog with most likes is first', function () {
			cy.contains('New Blog').click()
			cy.createBlog({title: "Most likes", author: "1st", url: "1st", likes: 42})
			cy.createBlog({title: "Second most likes", author: "2nd author", url: "2nd url", likes: 21})
			cy.createBlog({title: "3rd most likes", author: "2nd author", url: "2nd url", likes: 1})

			cy.get('.blog').eq(0).should('contain', 'Most likes')
			cy.get('.blog').eq(1).should('contain', 'Second most likes')
			cy.get('.blog').eq(2).should('contain', '3rd most likes')
		})
	})
})
