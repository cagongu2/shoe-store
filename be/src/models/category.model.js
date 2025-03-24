const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "categories",
});

module.exports = Category;