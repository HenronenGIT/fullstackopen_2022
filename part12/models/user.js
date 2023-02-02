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
				isEmail: {
					args: true,
					msg: "Validation isEmail on username failed"
				}
			}
		}
	},
	// email: {
	// 	type: DataTypes.STRING,
	// 	allowNull: false,
	// 	validate: {
	// 		isEmail: {
	// 			args: true,
	// 			msg: "Validation isEmail on username failed"
	// 		}

	// 	}
	// }
}, {
	sequelize,
	underscored: true,
	modelName: 'user'
})

module.exports = User