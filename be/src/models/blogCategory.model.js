const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const BlogCategory = sequelize.define("BlogCategory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "blog_categories",
    timestamps: true
});

module.exports = BlogCategory;
