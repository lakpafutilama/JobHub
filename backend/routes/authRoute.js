const express = require("express");
const {
  registerUser,
  authenticateUser,
  deleteUser,
  accessUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/dashboard", accessUser);

router.post("/signup", registerUser);

router.post("/login", authenticateUser);

router.delete("/:username", deleteUser);

module.exports = router;
