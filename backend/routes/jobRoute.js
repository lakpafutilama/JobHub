const express = require("express");
const {
  jobList,
  addJob,
  specificJobList,
  removeJob,
  closeJob,
  changeJobDetail,
  filteredJobs,
} = require("../controllers/jobController");
const router = express.Router();

router.get("/list", jobList);

router.get("/filtered", filteredJobs);

router.get("/list/:username", specificJobList);

router.post("/", addJob);

router.put("/:id", closeJob);

router.put("/details/:id", changeJobDetail);

router.delete("/:id", removeJob);

module.exports = router;
