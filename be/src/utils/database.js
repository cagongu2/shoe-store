const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: 'localhost',
        dialect: "mysql",
        logging: console.log,
    }
);

sequelize.authenticate()
    .then(() => console.log("MySQL Connected!"))
    .catch(err => console.error("Connection Error:", err));

module.exports = sequelize;
