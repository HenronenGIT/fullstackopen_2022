# Part 1 - React

> In this section we explore different NodeJS applications that use relational databases, we will focus on using the database PostgreSQL which is the number one in the open source world.

## Tech used

<div display="inline-block">
	<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"></img>
	<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"><img>
	<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
"><img>
</div>

## What I learned

- How to make queries by using Sequelize ORM library
- How to create database models with Sequalize
```javascript
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
	timestamps: true,
	modelName: 'blog'
})
```

- How to make database migrations

```javascript
const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('blogs', {
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
			},
		})

	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('blogs')
	},
}
```