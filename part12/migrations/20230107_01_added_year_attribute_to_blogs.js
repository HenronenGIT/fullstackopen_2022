const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.addColumn('blogs', 'year', {
			type: DataTypes.INTEGER,
			minYear: {
				min: 1991,
				msg: 'Year cannot be smaller than 1991'
			},
			maxYear: {
				max: () => new Date().getFullYear(),
				msg: 'Year cannot exceed current year.'
		}
		})
},
	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn('blogs', 'year')
	},
}