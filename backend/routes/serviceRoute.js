const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { homePage } = require("../controllers/serviceController");
const router = express.Router();

router.get("/", verifyToken, homePage);

module.exports = router;
