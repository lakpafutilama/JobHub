const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const {
  homePage,
  jobList,
  addJob,
  specificJobList,
} = require("../controllers/jobController");
const router = express.Router();

// router.get("/", verifyToken, homePage);

router.get("/list", jobList);

router.get("/list/:username", specificJobList);

router.post("/", addJob);

module.exports = router;
