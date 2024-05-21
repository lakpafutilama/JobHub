const express = require("express");
const {
  getApplications,
  applyJob,
  verifyApplication,
  latestApplications,
} = require("../controllers/applicationController");

const router = express.Router();

router.get("/:type/:id", getApplications);

router.get("/latest", latestApplications);

router.post("/", applyJob);

router.put("/:id", verifyApplication);

module.exports = router;
