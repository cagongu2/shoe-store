const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const ProductStock = require("./productStock.model");
const Brand = require("./brand.model");
const Category = require("./category.model");

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    hot: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    sale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "products",
    timestamps: true
});

module.exports = Product;
