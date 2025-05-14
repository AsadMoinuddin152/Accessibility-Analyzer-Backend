const argon2 = require("argon2");
const { sql } = require("../config/sql");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("phone", sql.NVarChar, phone)
      .query("SELECT * FROM users WHERE email = @email OR phone = @phone");

    if (result.recordset.length > 0) {
      return res.status(400).json({ message: "Email or phone already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("phone", sql.NVarChar, phone)
      .input("hashed_password", sql.NVarChar, hashedPassword)
      .query(
        "INSERT INTO users (name, email, phone, hashed_password) VALUES (@name, @email, @phone, @hashed_password)"
      );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM users WHERE email = @email");

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordValid = await argon2.verify(user.hashed_password, password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role || "user",
      },
      process.env.JWT_SECRET, // Ensure this is set in your environment variables
      { expiresIn: "1h" } // Adjust the expiration time as necessary
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required" });
  }

  try {
    const pool = await sql.connect();
    const userCheck = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM users WHERE email = @email");

    if (userCheck.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await argon2.hash(newPassword);

    await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("hashed_password", sql.NVarChar, hashedPassword).query(`
          UPDATE users
          SET hashed_password = @hashed_password, updated_at = GETDATE()
          WHERE email = @email
        `);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .query("SELECT id, name, email, phone FROM users");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT id, name, email, phone FROM users WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const pool = await sql.connect();
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("phone", sql.NVarChar, phone).query(`
          UPDATE users
          SET name = @name, email = @email, phone = @phone, updated_at = GETDATE()
          WHERE id = @id
        `);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect();
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM users WHERE id = @id");

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    const pool = await sql.connect();
    await pool.request().query("DELETE FROM users");

    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    console.error("Delete all users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
