const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");


const Address = sequelize.define(
    "Address",
    {
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { tableName: "addresses", timestamps: true }
);

module.exports = Address;