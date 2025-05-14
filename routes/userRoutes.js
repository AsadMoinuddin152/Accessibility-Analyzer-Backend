const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteAllUsers,
  deleteUser,
} = require("../controllers/userController");
const requrieSignIn = require("../middlewares/Auth");

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.get("/all", requrieSignIn, getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.delete("/", deleteAllUsers);

module.exports = router;
