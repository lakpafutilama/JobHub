const { resPattern } = require("../handler/responseHandler");
const {
  postResume,
  changeResume,
  getResume,
} = require("../services/candidateService");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

async function viewResume(req, res, next) {
  try {
    const file = await getResume(req.params.id);
    res.json(resPattern(file || {}, res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

async function addResume(req, res, next) {
  try {
    upload.single("resume");
    const { summary } = req.body;
    const resume = req.file;
    console.log(resume);

    if (!summary || !resume) {
      return res
        .status(400)
        .json({ message: "Summary and resume are required" });
    }

    await postResume({ summary, resumePath: resume.path });

    res.json({ message: "Added", status: res.statusCode });
  } catch (err) {
    next(err.message);
  }
}

async function userDetail(req, res, next) {
  try {
    res.json(resPattern(global._user, res.statusCode));
  } catch (err) {
    next(err);
  }
}

async function updateResume(req, res, next) {
  try {
    await changeResume(req.params.id, req.body);
    res.json(resPattern("Updated", res.statusCode));
  } catch (err) {
    next(err.message);
  }
}

module.exports = { viewResume, userDetail, addResume, updateResume };
