const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('reading_list', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			unread: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			blog_id: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				references: { model: 'blogs', key: 'id' }
			},
			user_id: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				references: { model: 'users', key: 'id' }
			},
		}
		)
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.removeTable('reading_list')
	},
}
