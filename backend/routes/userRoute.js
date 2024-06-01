const express = require("express");
const path = require("path");
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

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({
  storage: storage,
});

const router = express.Router();

router.get("/", verifyToken, userDetail);

router.get("/:id", verifyToken, viewResume);

router.post("/signup", signupValidator, registerUser);

router.post("/login", loginValidator, authenticateUser);

router.put("/", verifyToken, editUser);

router.put("/pic", verifyToken, uploader.single("file"), (req, res, next) => {
  try {
    editPP(req, res);
  } catch (error) {
    console.log("here");
  }
});

router.post("/resume", verifyToken, addResume);

router.put("/resume/:id", verifyToken, updateResume);

router.delete("/:username", verifyToken, deleteUser);

module.exports = router;
