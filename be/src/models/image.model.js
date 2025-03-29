const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Image = sequelize.define("Image", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
}, {
    tableName: "images",
});

module.exports = Image;