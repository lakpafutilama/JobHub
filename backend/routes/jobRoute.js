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
const { postJobValidator } = require("../validators/postJobValidator");
const { updateJobValidator } = require("../validators/updateJobValidator");
const router = express.Router();

router.get("/list", jobList);

router.get("/filtered", filteredJobs);

router.get("/list/:username", specificJobList);

router.post("/", postJobValidator, addJob);

router.put("/:id", closeJob);

router.put("/details/:id", updateJobValidator, changeJobDetail);

router.delete("/:id", removeJob);

module.exports = router;
