const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Blog = sequelize.define("Blog", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        defaultValue: "Admin"
    },
    viewed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tags: {
        type: DataTypes.JSON, // Store tags as ["tag1", "tag2"]
        allowNull: true
    }
}, {
    tableName: "blogs",
    timestamps: true
});

module.exports = Blog;
