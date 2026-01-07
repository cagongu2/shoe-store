const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Order = sequelize.define(
    "Order",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending" // pending, processing, shipped, delivered, cancelled
        }
    },
    { tableName: "orders", timestamps: true }
);

module.exports = Order;