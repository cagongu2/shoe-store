const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const ProductStock = require("./productStock.model");

const Size = sequelize.define("Size", {
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
    tableName: "sizes",
    timestamps: false
});

module.exports = Size;
