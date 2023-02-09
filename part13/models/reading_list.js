const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingList extends Model { }
ReadingList.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	blogId: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		references: { model: 'blogs', key: 'id' }
	},
	userId: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		references: { model: 'users', key: 'id' }
	},
	unread: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	},
}, {
	sequelize,
	underscored: true,
	timestamps: false,
	modelName: 'reading_list'
})


module.exports = ReadingList