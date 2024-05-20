const express = require("express");
// const { verifyToken } = require("../middleware/verifyToken");
const {
  jobList,
  addJob,
  specificJobList,
  removeJob,
  closeJob,
} = require("../controllers/jobController");
const router = express.Router();

router.get("/list", jobList);

router.get("/list/:username", specificJobList);

router.post("/", addJob);

router.put("/:id", closeJob);

router.delete("/:id", removeJob);

module.exports = router;
