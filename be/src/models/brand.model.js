const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Brand = sequelize.define(
  "Brand",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "brands",
    timestamps: false, 
  }
);

module.exports = Brand;
