const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.addColumn(
			'blogs',
			'createdAt',
			{
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
			},
		),

			await queryInterface.addColumn(
				'blogs',
				'updatedAt',
				{
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: DataTypes.NOW
				},
			),

			await queryInterface.addColumn(
				'users',
				'createdAt', {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
			})

		await queryInterface.addColumn(
			'users',
			'updatedAt', {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		})
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn('blogs', 'createdAt')
		await queryInterface.removeColumn('users', 'createdAt')
		await queryInterface.removeColumn('blogs', 'updatedAt')
		await queryInterface.removeColumn('users', 'updatedAt')
		// await queryInterface.dropTable('blogs')
		// await queryInterface.dropTable('users')
	},
}