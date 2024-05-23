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
  viewResume,
} = require("../controllers/candidateController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.get("/:id", verifyToken, viewResume);

router.post("/signup", signupValidator, registerUser);

router.post("/login", loginValidator, authenticateUser);

router.post("/resume", addResume);

router.put("/resume/:id", updateResume);

router.delete("/:username", deleteUser);

module.exports = router;
