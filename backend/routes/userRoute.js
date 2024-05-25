const express = require("express");
const {
  registerUser,
  authenticateUser,
  deleteUser,
  editUser,
} = require("../controllers/userController");
const { signupValidator } = require("../validators/signupValidator");
const { loginValidator } = require("../validators/loginValidator");
const {
  addResume,
  updateResume,
  viewResume,
  userDetail,
} = require("../controllers/candidateController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, userDetail);

router.get("/:id", verifyToken, viewResume);

router.post("/signup", signupValidator, registerUser);

router.post("/login", loginValidator, authenticateUser);

router.put("/", verifyToken, editUser);

router.post("/resume", addResume);

router.put("/resume/:id", updateResume);

router.delete("/:username", deleteUser);

module.exports = router;
