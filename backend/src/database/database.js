const { Sequelize } = require('sequelize');

const connection = new Sequelize('beersapp','root','root123',{
    host: 'localhost',
    dialect: 'mysql'
});

const authenticate = async () => {
    try {
      await connection.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.log("Unnable to connect to the database:", error);
    }
};

module.exports = { authenticate, connection };