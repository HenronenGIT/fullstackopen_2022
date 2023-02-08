const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model { }
ReadingList.init({
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
}, {
	sequelize,
	underscored: true,
	timestamps: false,
	modelName: 'reading_list'
})

module.exports = ReadingList