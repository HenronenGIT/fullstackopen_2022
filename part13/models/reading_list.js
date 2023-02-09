// const { Model, DataTypes } = require('sequelize')

// const { sequelize } = require('../util/db')

// class ReadingList extends Model { }
// ReadingList.init({
// 	id: {
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true
// 	},
// 	blogId: {
// 		type: DataTypes.INTEGER,
// 		allowNull: false,
// 		references: { model: 'blogs', key: 'id' }
// 	},
// 	userId: {
// 		type: DataTypes.INTEGER,
// 		allowNull: false,
// 		references: { model: 'users', key: 'id' }
// 	},
// 	unread: {
// 		type: DataTypes.BOOLEAN,
// 		defaultValue: true
// 	},
// }, {
// 	sequelize,
// 	underscored: true,
// 	timestamps: false,
// 	modelName: 'reading_list'
// })


// module.exports = ReadingList
const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class ReadingList extends Model { }

ReadingList.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "users", key: "id" },
		},
		blogId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "blogs", key: "id" },
		},
		unread: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: "reading_list",
	}
);

module.exports = ReadingList;