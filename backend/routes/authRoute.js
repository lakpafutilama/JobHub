const express = require("express");
const { authenticateUser } = require("../controllers/authController");
const router = express.Router();

router.get("/", authenticateUser);

module.exports = router;
