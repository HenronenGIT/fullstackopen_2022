const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('sessions', {
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
		})

		down: async ({ context: queryInterface }) => {
			await queryInterface.dropTable("sessions");
		}
	}
};	