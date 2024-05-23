const express = require("express");
const {
  jobList,
  addJob,
  specificJobList,
  removeJob,
  closeJob,
  changeJobDetail,
  filteredJobs,
  searchJobs,
} = require("../controllers/jobController");
const { postJobValidator } = require("../validators/postJobValidator");
const { updateJobValidator } = require("../validators/updateJobValidator");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

router.use(verifyToken);

router.get("/list", jobList);

router.get("/filtered", filteredJobs);

router.get("/list/specific", specificJobList);

router.get("/search/:title", searchJobs);

router.post("/", postJobValidator, addJob);

router.put("/:id", closeJob);

router.put("/details/:id", updateJobValidator, changeJobDetail);

router.delete("/:id", removeJob);

module.exports = router;
