const express = require("express");
const {
  getApplications,
  applyJob,
  verifyApplication,
  latestApplications,
} = require("../controllers/applicationController");
const {
  postApplicationValidator,
} = require("../validators/postApplicationValidator");
const {
  verifyApplicationValidator,
} = require("../validators/verifyApplicationValidator");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.use(verifyToken);

router.get("/:type", getApplications);

router.get("/latest", latestApplications);

router.post("/", postApplicationValidator, applyJob);

router.put("/:id", verifyApplicationValidator, verifyApplication);

module.exports = router;
