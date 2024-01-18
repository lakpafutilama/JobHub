const express = require("express");
const {
  registerUser,
  authenticateUser,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", authenticateUser);

module.exports = router;
