const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Product = require("./product.model");
const Size = require("./size.model");
const Color = require("./color.model");

const ProductStock = sequelize.define(
  "ProductStock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sizes",
        key: "id",
      },
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "colors",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "product_stock",
    timestamps: false,
  }
);

module.exports = ProductStock;
