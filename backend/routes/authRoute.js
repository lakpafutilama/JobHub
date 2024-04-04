const express = require("express");
const {
  registerUser,
  authenticateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", authenticateUser);

router.delete("/:username", deleteUser);

module.exports = router;
