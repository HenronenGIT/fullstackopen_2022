const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model { }
User.init({
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
	active: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	}
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'user'
})

module.exports = User