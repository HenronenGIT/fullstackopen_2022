const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model { }
Session.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	is_active: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
		allowNull: false
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: "users", key: "id" },
	},
	token: {
		type: DataTypes.STRING,
		allowNull: false,
	}
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'user'
})

module.exports = Session