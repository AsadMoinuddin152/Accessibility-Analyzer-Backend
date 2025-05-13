const sql = require("mssql");
require("dotenv").config();

const config = {
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  options: {
    encrypt: true, 
    trustServerCertificate: false, 
  },
};

async function connectToSqlDb() {
  try {
    await sql.connect(config);
    console.log("Connected to SQL Database");
  } catch (err) {
    console.error("Error connecting to SQL Database", err);
  }
}

module.exports = { connectToSqlDb, sql };