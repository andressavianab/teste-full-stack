const { Sequelize } = require("sequelize");
require('dotenv').config()

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

const authenticateDb = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unnable to connect to the database:", error);
  }
};

module.exports = { authenticateDb, connection };
