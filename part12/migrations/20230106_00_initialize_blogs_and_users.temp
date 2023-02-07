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
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: '[name] cannot be empty'
					},
				}
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: '[username] cannot be empty'
					},
					isEmail: {
						args: true,
						msg: "Validation isEmail on username failed"
					}
				}
			},
		})
		await queryInterface.addColumn('blogs', 'user_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' },
		})
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('blogs')
		await queryInterface.dropTable('users')
	},
}