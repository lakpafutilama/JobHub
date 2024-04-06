const express = require("express");
const {
  registerUser,
  authenticateUser,
  deleteUser,
} = require("../controllers/userController");
const { signupValidator } = require("../validators/signupValidator");
const { loginValidator } = require("../validators/loginValidator");
const router = express.Router();

router.post("/signup", signupValidator, registerUser);

router.post("/login", loginValidator, authenticateUser);

router.delete("/:username", deleteUser);

module.exports = router;
