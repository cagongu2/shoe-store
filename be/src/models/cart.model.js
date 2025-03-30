const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Cart = sequelize.define('Cart', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    size : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isPayed : {
        type: DataTypes.BOOLEAN,
        default: false,
    },


}, {
    tableName: "carts",
    timestamps: true
});

module.exports = Cart;
