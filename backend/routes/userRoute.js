const express = require("express");
const {
  registerUser,
  authenticateUser,
  deleteUser,
  editUser,
  editPP,
} = require("../controllers/userController");
const { signupValidator } = require("../validators/signupValidator");
const { loginValidator } = require("../validators/loginValidator");
const {
  addResume,
  updateResume,
  viewResume,
  userDetail,
} = require("../controllers/candidateController");
const { verifyToken } = require("../middleware/verifyToken");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 * 1024 },
});

const router = express.Router();

router.get("/", verifyToken, userDetail);

router.get("/:user_id", verifyToken, viewResume);

router.post("/signup", signupValidator, registerUser);

router.post("/login", loginValidator, authenticateUser);

router.put("/", verifyToken, editUser);

router.put("/pic", verifyToken, upload.single("pp"), editPP);

router.post("/resume", verifyToken, upload.single("pp"), addResume);

router.put("/resume/:id", verifyToken, upload.single("pp"), updateResume);

router.delete("/:username", verifyToken, deleteUser);

module.exports = router;
