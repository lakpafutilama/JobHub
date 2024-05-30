const express = require("express");
const {
  registerUser,
  authenticateUser,
  deleteUser,
  editUser,
} = require("../controllers/userController");
const { signupValidator } = require("../validators/signupValidator");
const { loginValidator } = require("../validators/loginValidator");
const {
  addResume,
  updateResume,
  viewResume,
  userDetail,
} = require("../controllers/candidateController");
const multer = require("multer");
const { verifyToken } = require("../middleware/verifyToken");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", verifyToken, userDetail);

router.get("/:id", verifyToken, viewResume);

router.post("/signup", signupValidator, registerUser);

router.post("/login", loginValidator, authenticateUser);

router.put("/", verifyToken, editUser);

router.post("/resume", verifyToken, upload.single("resume"), addResume);

router.put("/resume/:id", verifyToken, updateResume);

router.delete("/:username", verifyToken, deleteUser);

module.exports = router;
