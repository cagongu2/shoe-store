const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const ProductStock = require("../models/productStock.model");

const Color = sequelize.define("Color", {
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
    tableName: "colors",
    timestamps: false
});

module.exports = Color;
