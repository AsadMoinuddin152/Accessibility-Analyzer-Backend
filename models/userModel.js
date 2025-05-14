const { sql } = require("../config/sql");

const createTable = async () => {
  try {
    const pool = await sql.connect();
    await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
        CREATE TABLE users (
          id INT PRIMARY KEY IDENTITY,
          name NVARCHAR(100) NOT NULL,
          email NVARCHAR(100) UNIQUE NOT NULL,
          phone NVARCHAR(15) UNIQUE NOT NULL,
          hashed_password NVARCHAR(255) NOT NULL,
          created_at DATETIME DEFAULT GETDATE(),
          updated_at DATETIME DEFAULT GETDATE()
        )
      `);
    console.log("User table is ready");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

createTable();

module.exports = { createTable };
