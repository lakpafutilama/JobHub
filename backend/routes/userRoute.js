const express = require("express");
const {
  registerUser,
  authenticateUser,
  deleteUser,
} = require("../controllers/userController");
const { signupValidator } = require("../validators/signupValidator");
const { loginValidator } = require("../validators/loginValidator");
const {
  addResume,
  updateResume,
} = require("../controllers/candidateController");
const router = express.Router();

router.post("/signup", signupValidator, registerUser);

router.post("/login", loginValidator, authenticateUser);

router.post("/resume", addResume);

router.put("/resume/:id", updateResume);

router.delete("/:username", deleteUser);

module.exports = router;
